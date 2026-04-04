import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};

const BLOCKED_EXTENSIONS = ['.exe', '.bat', '.cmd', '.sh', '.msi', '.dll'];
const MAX_FILES = 10;
const MAX_TOTAL_SIZE = 4 * 1024 * 1024;

function getExtension(name: string): string {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i).toLowerCase() : '';
}

interface FilePayload {
  name: string;
  type: string;
  data: string;
}

// Rate limiting: max 5 requests per IP per 60 seconds
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

const ALLOWED_ORIGINS = [
  'https://east-meridian.com',
  'https://www.east-meridian.com',
];

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin ?? '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function validateFiles(files: FilePayload[]): string | null {
  if (files.length > MAX_FILES) return `Максимум ${MAX_FILES} файлов`;

  for (const f of files) {
    if (BLOCKED_EXTENSIONS.includes(getExtension(f.name))) {
      return `Запрещённое расширение: ${getExtension(f.name)}`;
    }
  }

  const totalSize = files.reduce((sum, f) => sum + Buffer.from(f.data, 'base64').length, 0);
  if (totalSize > MAX_TOTAL_SIZE) return 'Общий размер файлов превышает лимит 4 МБ';

  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Слишком много заявок. Попробуйте через минуту.' });
  }

  const { name, telegram, email, message, files } = req.body ?? {};

  if (!name || !message) {
    return res.status(400).json({ error: 'Поля "Имя" и "Сообщение" обязательны' });
  }

  if (!telegram && !email) {
    return res.status(400).json({ error: 'Укажите хотя бы один способ связи: Telegram или Email' });
  }

  const fileList: FilePayload[] = Array.isArray(files) ? files : [];
  if (fileList.length > 0) {
    const fileErr = validateFiles(fileList);
    if (fileErr) return res.status(400).json({ error: fileErr });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
  }

  // 1. Send text message
  const lines = [
    '📩 Новая заявка с сайта',
    '',
    `👤 Имя: ${name}`,
    telegram ? `✈️ Telegram: ${telegram}` : '',
    email ? `📧 Email: ${email}` : '',
    `\n💬 Сообщение:\n${message}`,
    fileList.length > 0 ? `\n📎 Файлов: ${fileList.length}` : '',
  ].filter(Boolean);

  const tgRes = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: lines.join('\n') }),
    },
  );

  if (!tgRes.ok) {
    const err = await tgRes.text();
    console.error('Telegram sendMessage error:', err);
    return res.status(502).json({ error: 'Не удалось отправить сообщение' });
  }

  // 2. Send each file as a separate document
  for (const f of fileList) {
    const buffer = Buffer.from(f.data, 'base64');
    const blob = new Blob([buffer], { type: f.type });

    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('document', blob, f.name);
    form.append('caption', `📎 Файл к заявке от ${name}`);

    const docRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendDocument`,
      { method: 'POST', body: form },
    );

    if (!docRes.ok) {
      console.error(`Telegram sendDocument error (${f.name}):`, await docRes.text());
    }
  }

  return res.status(200).json({ ok: true });
}

import type { VercelRequest, VercelResponse } from '@vercel/node';

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, telegram, email, message } = req.body ?? {};

  if (!name || !message) {
    return res.status(400).json({ error: 'Поля "Имя" и "Сообщение" обязательны' });
  }

  if (!telegram && !email) {
    return res.status(400).json({ error: 'Укажите хотя бы один способ связи: Telegram или Email' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
  }

  const lines = [
    '📩 Новая заявка с сайта',
    '',
    `👤 Имя: ${name}`,
    telegram ? `✈️ Telegram: ${telegram}` : '',
    email ? `📧 Email: ${email}` : '',
    `\n💬 Сообщение:\n${message}`,
  ].filter(Boolean);

  const text = lines.join('\n');

  const tgRes = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    },
  );

  if (!tgRes.ok) {
    const err = await tgRes.text();
    console.error('Telegram API error:', err);
    return res.status(502).json({ error: 'Не удалось отправить сообщение' });
  }

  return res.status(200).json({ ok: true });
}

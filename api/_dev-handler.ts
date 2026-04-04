/**
 * Dev-only adapter: runs the send-lead handler inside the Vite dev server
 * so you don't need `vercel dev` during local development.
 *
 * This file is NOT deployed — Vercel uses api/send-lead.ts directly.
 */
import type { IncomingMessage, ServerResponse } from 'http';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

dotenvConfig({ path: resolve(import.meta.dirname, '..', '.env') });

function parseBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => chunks.push(c));
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  if (!req.url?.startsWith('/api/send-lead')) return false;

  const body = req.method === 'POST' ? await parseBody(req) : {};

  const { default: handler } = await import('./send-lead.js') as {
    default: (req: VercelRequest, res: VercelResponse) => Promise<unknown>;
  };

  let statusCode = 200;
  const headers: Record<string, string> = {};

  const vercelRes = {
    setHeader(k: string, v: string) { headers[k] = v; return vercelRes; },
    status(code: number) { statusCode = code; return vercelRes; },
    json(data: unknown) {
      res.writeHead(statusCode, { ...headers, 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    },
    end() {
      res.writeHead(statusCode, headers);
      res.end();
    },
  } as unknown as VercelResponse;

  const vercelReq = { method: req.method, body, headers: req.headers } as unknown as VercelRequest;

  await handler(vercelReq, vercelRes);
  return true;
}

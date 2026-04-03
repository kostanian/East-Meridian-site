/**
 * Dev-only adapter: runs the send-lead handler inside the Vite dev server
 * so you don't need `vercel dev` during local development.
 *
 * This file is NOT deployed — Vercel uses api/send-lead.ts directly.
 */
import type { IncomingMessage, ServerResponse } from 'http';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

dotenvConfig({ path: resolve(import.meta.dirname, '..', '.env') });

// Minimal shims that satisfy what our handler uses from VercelRequest/VercelResponse
function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c));
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

  // Dynamically import the handler so it picks up env from .env
  const { default: handler } = await import('./send-lead.js');

  // Build a minimal adapter matching what our handler uses
  const vercelRes: any = {
    statusCode: 200,
    _headers: {} as Record<string, string>,
    setHeader(k: string, v: string) { this._headers[k] = v; return this; },
    status(code: number) { this.statusCode = code; return this; },
    json(data: any) {
      res.writeHead(this.statusCode, { ...this._headers, 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    },
    end() {
      res.writeHead(this.statusCode, this._headers);
      res.end();
    },
  };

  const vercelReq: any = { method: req.method, body, headers: req.headers };

  await handler(vercelReq, vercelRes);
  return true;
}

import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && ({
      name: 'api-dev-server',
      configureServer(server: ViteDevServer) {
        server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
          if (req.url?.startsWith('/api/')) {
            try {
              const { handleApiRequest } = await server.ssrLoadModule(
                path.resolve(__dirname, 'api/_dev-handler.ts')
              );
              const handled = await handleApiRequest(req, res);
              if (handled) return;
            } catch (e) {
              console.error('[api-dev]', e);
            }
          }
          next();
        });
      },
    } satisfies Plugin),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

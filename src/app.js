const express = require('express');
const os = require('os');

function createApp() {
  const app = express();

  app.get('/', (_req, res) => {
    const hostname = os.hostname();
    const nodeVersion = process.version;
    const timestamp = new Date().toISOString();

    res.status(200).type('html').send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hola Mundo | Práctica Entrega Continua</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #0f172a;
      --card: #1e293b;
      --border: #334155;
      --text: #f8fafc;
      --muted: #94a3b8;
      --accent: #38bdf8;
      --success: #22c55e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: radial-gradient(circle at top, #1e293b 0%, var(--bg) 60%);
      color: var(--text);
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
    }
    main {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 40px 36px;
      max-width: 560px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(34, 197, 94, 0.14);
      color: #86efac;
      border: 1px solid rgba(34, 197, 94, 0.35);
      border-radius: 999px;
      padding: 6px 14px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--success);
    }
    h1 {
      font-size: 2.5rem;
      line-height: 1.15;
      margin-bottom: 12px;
      background: linear-gradient(90deg, #f8fafc, var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.subtitle {
      color: var(--muted);
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    .meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
      text-align: left;
      margin-bottom: 24px;
    }
    .meta-item {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 14px;
    }
    .meta-label {
      display: block;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--muted);
      margin-bottom: 4px;
    }
    .meta-value {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.9rem;
      color: var(--text);
      word-break: break-all;
    }
    a.health-link {
      color: var(--accent);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
    }
    a.health-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <main>
    <div class="badge"><span class="dot"></span>Contenedor Docker activo</div>
    <h1>¡Hola Mundo!</h1>
    <p class="subtitle">
      Aplicación web creada con Node.js y Express para la <strong>Práctica de Entrega Continua</strong> (ciclo DevOps con Docker, GitHub Actions y Render).
    </p>
    <section class="meta">
      <div class="meta-item">
        <span class="meta-label">Runtime</span>
        <span class="meta-value">Node.js ${nodeVersion}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Host / Contenedor</span>
        <span class="meta-value">${hostname}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Timestamp UTC</span>
        <span class="meta-value">${timestamp}</span>
      </div>
    </section>
    <a class="health-link" href="/health">Ver estado JSON (/health) →</a>
  </main>
</body>
</html>`);
  });

  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      app: 'pract-entrega-continua',
      node: process.version,
      hostname: os.hostname(),
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}

module.exports = { createApp };

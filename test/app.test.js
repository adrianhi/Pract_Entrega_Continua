const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');

describe('Práctica Entrega Continua - App Web Hola Mundo', () => {
  let server;
  let baseUrl;

  before(async () => {
    const app = createApp();
    await new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const { port } = server.address();
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it('GET / responde 200 con página HTML de Hola Mundo', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') || '', /text\/html/);

    const body = await res.text();
    assert.match(body, /Hola Mundo/i);
  });

  it('GET /health responde 200 con JSON de estado ok', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') || '', /application\/json/);

    const data = await res.json();
    assert.equal(data.status, 'ok');
    assert.equal(data.app, 'pract-entrega-continua');
    assert.ok(data.timestamp);
  });
});

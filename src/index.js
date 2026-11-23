const { createApp } = require('./app');

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const app = createApp();
const server = app.listen(PORT, HOST, () => {
  console.log(`Servidor Hola Mundo escuchando en http://${HOST}:${PORT}`);
});

function shutdown(signal) {
  console.log(`Recibida señal ${signal}, cerrando servidor...`);
  server.close(() => {
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

# Práctica Entrega Continua — App Web Hola Mundo con Docker, GitHub Actions y Render

Aplicación web **"Hola Mundo"** desarrollada con **Node.js + Express**, contenerizada con **Docker**, publicada automáticamente en **Docker Hub** mediante **GitHub Actions** y desplegada en producción en **Render.com**.

## Imagen en Docker Hub

- **URL de Docker Hub:** https://hub.docker.com/r/adrianhidalgo23/pract-entrega-continua
- **Imagen:** `adrianhidalgo23/pract-entrega-continua:latest`

## Pipeline CI/CD (GitHub Actions)

El workflow [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) se ejecuta en cada `push` a `main` (o manualmente desde la pestaña **Actions**) y realiza tres pasos:

1. **Pruebas (`test`):** Instala dependencias con `npm ci` y ejecuta `npm test`.
2. **Build & Push (`build-and-push`):** Construye la imagen Docker (`linux/amd64`) y la publica en Docker Hub con las etiquetas `latest` y `<commit-sha>`.
3. **Despliegue (`deploy-render`):** Dispara el despliegue automático en **Render.com** mediante `POST https://api.render.com/v1/services/<RENDER_SERVICE_ID>/deploys`.

### Secrets requeridos en GitHub (`Settings → Secrets and variables → Actions`)

| Secret               | Descripción                                                      |
| -------------------- | ---------------------------------------------------------------- |
| `DOCKERHUB_USERNAME` | Usuario de Docker Hub (`adrianhidalgo23`)                        |
| `DOCKERHUB_TOKEN`    | Personal Access Token de Docker Hub con permisos *Read & Write*  |
| `RENDER_API_KEY`     | API Key de cuenta en Render.com                                  |
| `RENDER_SERVICE_ID`  | ID del Web Service en Render (`srv-...`)                         |

## Requisitos locales

- [Node.js 22+](https://nodejs.org/) (para ejecución local)
- [Docker](https://www.docker.com/) (para construir o ejecutar el contenedor)

## Ejecución local

```bash
npm install
npm test
npm start
```

Luego abre `http://localhost:3000` en tu navegador (o consulta `http://localhost:3000/health`).

## Uso con Docker

### Construir la imagen localmente

```bash
docker build -t adrianhidalgo23/pract-entrega-continua:latest -t adrianhidalgo23/pract-entrega-continua:1.0.0 .
```

### Ejecutar el contenedor

```bash
docker run --rm --name pract-entrega-continua -p 3000:3000 adrianhidalgo23/pract-entrega-continua:latest
```

### Descargar y ejecutar desde Docker Hub

```bash
docker pull adrianhidalgo23/pract-entrega-continua:latest
docker run --rm -p 3000:3000 adrianhidalgo23/pract-entrega-continua:latest
```

## Endpoints

| Ruta      | Método | Descripción                                          |
| --------- | ------ | ---------------------------------------------------- |
| `/`       | `GET`  | Página web HTML **"¡Hola Mundo!"** con datos runtime |
| `/health` | `GET`  | Estado del servicio en formato JSON                  |

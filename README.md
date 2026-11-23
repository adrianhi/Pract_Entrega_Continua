# Práctica Entrega Continua — App Web Hola Mundo con Docker

Aplicación web **"Hola Mundo"** desarrollada con **Node.js + Express**, contenerizada con **Docker** y publicada en **Docker Hub** como parte del ciclo de DevOps.

## Imagen en Docker Hub

- **URL de Docker Hub:** https://hub.docker.com/r/adrianhidalgo23/pract-entrega-continua
- **Imagen:** `adrianhidalgo23/pract-entrega-continua:latest`

## Requisitos

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
docker run -d --name pract-entrega-continua -p 3000:3000 adrianhidalgo23/pract-entrega-continua:latest
```

### Descargar y ejecutar desde Docker Hub

```bash
docker pull adrianhidalgo23/pract-entrega-continua:latest
docker run -p 3000:3000 adrianhidalgo23/pract-entrega-continua:latest
```

## Endpoints

| Ruta      | Método | Descripción                                          |
| --------- | ------ | ---------------------------------------------------- |
| `/`       | `GET`  | Página web HTML **"¡Hola Mundo!"** con datos runtime |
| `/health` | `GET`  | Estado del servicio en formato JSON                  |

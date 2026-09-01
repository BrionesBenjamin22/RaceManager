# MTB Rescue Platform

Plataforma integral para la gestión de emergencias y asistencia en competiciones de ciclismo MTB y trail. El sistema permite asociar corredores mediante tokens QR únicos, reportar incidentes con precisión geográfica y calcular la proximidad del personal de asistencia usando análisis geoespacial nativo.

## Características principales

- Escaneo QR y registro de incidencias con identificación automática del corredor.
- Modo offline-first para la web pública con cola de sincronización cuando hay conectividad.
- Motor geoespacial con PostgreSQL + PostGIS para calcular posiciones y puntos kilométricos sobre el recorrido.
- Asignación inteligente de operarios más cercanos al incidente.
- Dashboard en tiempo real con alertas por Server-Sent Events (SSE).

## Stack tecnológico

- Frontend / PWA: Next.js, React, TailwindCSS.
- Backend: NestJS + TypeScript.
- Base de datos: PostgreSQL + PostGIS.
- ORM: Prisma.
- Infraestructura: Docker Compose.
- Observabilidad: OpenTelemetry SDK, OTLP y OpenTelemetry Collector.

## Estructura del proyecto

```text
/
├── backend/               # API y lógica de negocio (NestJS)
├── frontend/              # Aplicación web y PWA pública (Next.js)
├── .codex/
│   └── agents/            # Agentes especialistas de proyecto para Codex
├── docs/                  # Documentación funcional y técnica del proyecto
│   ├── tasks/             # Estado de tareas y entregables
│   ├── 01-product-definition.md
│   └── current-task.md
├── observability/         # Configuración neutral del OpenTelemetry Collector
├── docker-compose.yml     # Orquestación local de PostgreSQL + PostGIS
├── README.md              # Documento principal del proyecto
└── .gitignore
```

## Requisitos previos

- Node.js 18 o superior
- Docker Desktop o Docker Engine
- pnpm, npm o yarn

## Instalación y despliegue local

### 1. Levantar la base de datos

```bash
docker compose up -d
```

Este comando inicia PostGIS y el Collector OTEL en los puertos `4317` (gRPC) y `4318` (HTTP/protobuf).

### 2. Instalar dependencias del backend

```bash
cd backend
pnpm install
```

Asegúrate de crear `backend/.env` desde `backend/.env.example`. La configuración local exporta trazas y métricas a `http://localhost:4318`.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mtbrescue?schema=public"
```

### 3. Iniciar el backend

```bash
cd backend
pnpm run start:dev
```

### 4. Iniciar el frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

## Observabilidad y experiencia operativa

La arquitectura, el catálogo inicial de señales RED, el formato de logs y el contrato de errores se documentan en [`docs/02-observability-and-feedback.md`](docs/02-observability-and-feedback.md). OpenTelemetry mantiene la instrumentación desacoplada del proveedor; el Collector local usa un exportador de depuración hasta elegir almacenamiento y paneles.

## Desarrollo impulsado por IA

Este proyecto está pensado para desarrollarse con apoyo de agentes de inteligencia artificial. La carpeta `docs/` actúa como contexto operativo y memoria de proyecto.

- Orquestador: coordina tareas y actualiza la documentación del proyecto.
- Agentes especialistas: backend, frontend, geoespacial, QA y seguridad.

## Estado actual

- Infraestructura base completada.
- Backend y frontend inicializados.
- Configuración de base de datos PostGIS activa.
- Prisma inicializado y en preparación para la capa de persistencia del MVP.
- Base OTEL/OTLP y logs JSON estructurados disponibles desde el inicio.

## Nota legal

Desarrollo privado y propietario. Todos los derechos reservados.

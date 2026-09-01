# MTB Rescue Backend

API NestJS responsable del dominio, persistencia Prisma/PostGIS, permisos, auditoría, historial y eventos SSE.

## Desarrollo local

Desde la raíz, inicia PostGIS y el Collector:

```bash
docker compose up -d
```

Después configura y ejecuta el backend:

```bash
cd backend
cp .env.example .env
pnpm install
pnpm run start:dev
```

Comandos de calidad: `pnpm run lint`, `pnpm run build`, `pnpm run test`, `pnpm run test:e2e` y `pnpm run test:cov`.

## Organización

El código vive en `src/`; cada dominio debe separar controller, DTOs, service, persistencia, permisos e historial. `src/observability/` contiene instrumentación transversal y no debe incorporar reglas de negocio. Los modelos Prisma viven en `prisma/` y los E2E en `test/`.

## Errores y estado

Cada error público debe incluir un `code` estable, `message` seguro y contextual, `requestId` y, cuando corresponda, `action` y `state`. No expongas stack traces, SQL, secretos ni PII. El estado HTTP conserva su semántica: `401` autenticación, `403` permisos, `404` recurso no visible, `409` conflicto y `422` regla de negocio o entrada no procesable.

Los endpoints documentan estados de proceso, resultados parciales, reintentos y degradaciones para que el frontend pueda mostrar feedback inmediato y accionable.

## Observabilidad

`src/instrumentation.ts` inicia OpenTelemetry antes de NestJS y exporta trazas y métricas por OTLP. El logger nativo emite JSON de una línea. El interceptor global añade `request_id`, ruta normalizada, estado, duración y contexto de traza sin registrar query strings ni payloads.

Usa `OTEL_SDK_DISABLED=true` solo para desactivar telemetría explícitamente. La configuración completa, campos permitidos y catálogo RED están en [`../docs/02-observability-and-feedback.md`](../docs/02-observability-and-feedback.md).

# Observabilidad, Estado y Feedback

## Decisión arquitectónica

MTB Rescue adopta OpenTelemetry SDK para Node.js, exportación OTLP y un OpenTelemetry Collector local. La instrumentación permanece neutral respecto del proveedor. El Collector inicial usa `debug`; incorporar almacenamiento, paneles o alertas requiere una decisión posterior, sin cambiar la instrumentación de dominio.

Los logs se escriben como JSON de una línea a stdout; el Collector queda preparado para recibir logs OTLP cuando la señal estable del SDK se adopte. Trazas y métricas se exportan por OTLP/HTTP a `http://localhost:4318`. Una falla del Collector no debe interrumpir operaciones de negocio.

## Catálogo mínimo de señales

| Señal | Nombre o evento | Atributos permitidos | Objetivo |
| --- | --- | --- | --- |
| Métrica | `http.server.request.duration` | método, ruta normalizada, estado, `error.type` | Duración RED y tasa por conteo |
| Métrica | `http.server.active_requests` | método | Saturación inmediata |
| Traza | span HTTP servidor | método, ruta normalizada, estado | Recorrido de una solicitud |
| Traza | Prisma/PostgreSQL y llamadas externas | operación y sistema, nunca SQL con valores | Dependencias y cuellos de botella |
| Log | `http.server.request.completed` | estado, duración, `request_id`, `trace_id`, `span_id` | Correlación y diagnóstico |

La tasa de errores se deriva de estados fallidos y `error.type`. No uses IDs de usuario, dorsal, token QR, URL concreta, teléfono o texto libre como etiquetas de métricas. Cada módulo nuevo documenta señales de negocio solo si conducen a una acción operativa.

## Formato de logs

Campos base: timestamp UTC, severidad, `service.name`, versión, entorno, `event.name`, módulo y mensaje. Para HTTP agrega método, ruta parametrizada, estado y duración. Incluye identificadores de correlación cuando estén disponibles. No registres credenciales, cabeceras de autorización, cuerpos completos, coordenadas precisas ni PII. Los errores internos pueden conservar detalle en telemetría protegida, pero la respuesta pública nunca expone stack, SQL o infraestructura.

## Contrato de error objetivo

```json
{
  "statusCode": 409,
  "code": "INCIDENT_ALREADY_RESOLVED",
  "message": "El incidente ya fue resuelto y no admite nuevas asignaciones.",
  "action": "Actualice el detalle para consultar su estado actual.",
  "state": { "incident": "RESOLVED" },
  "requestId": "01J..."
}
```

`code` gobierna la lógica del cliente; el texto puede evolucionar. `message` explica el contexto, `action` propone recuperación y `state` informa el resultado cuando sea relevante. Los endpoints deben documentar sus códigos y estados posibles.

## Experiencia y accesibilidad

Frontend informa carga, progreso, éxito, vacío, error, reintento, desconexión y sincronización offline. El feedback debe ser oportuno, específico y persistir el tiempo necesario para comprenderlo. Se aplican las diez heurísticas de Nielsen y accesibilidad básica: teclado, foco, etiquetas, contraste, regiones vivas para cambios asíncronos y alternativas no basadas solo en color.

## Operación local y expansión

1. Ejecuta `docker compose up -d`.
2. Crea `backend/.env` desde `.env.example`.
3. Inicia el backend y verifica el Collector con `docker compose logs otel-collector`.
4. Antes de producción, reemplaza `debug` por exportadores OTLP hacia el proveedor elegido, define retención, muestreo, paneles RED, alertas y objetivos de servicio.

La validación debe cubrir correlación, redacción de datos, métricas de rutas de baja cardinalidad y continuidad del negocio cuando OTLP no esté disponible.

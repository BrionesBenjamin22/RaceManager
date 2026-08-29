# MTB Rescue - Documento de Alcance y Arquitectura (MVP)

## 1. Objetivo Técnico del Sistema

Construir una plataforma web web/PWA para carreras de ciclismo (MTB/Trail) que permita registrar corredores, circuitos y operarios. Ante el escaneo del QR de un dorsal, el sistema debe reportar un incidente capturando automáticamente la ubicación GPS offline/online.
El sistema determinará en qué punto kilométrico del circuito ocurrió el incidente, identificará a los operarios más cercanos y notificará en tiempo real al coordinador de carrera. _El sistema NO realizará tracking continuo en este MVP._

## 2. Refinamientos Críticos (Edge Cases)

- **Conectividad Intermitente:** La página pública del QR debe funcionar como PWA. Si no hay señal al escanear, el formulario se carga desde la caché, permite redactar el reporte y queda en cola ("Esperando conexión") para enviarse en cuanto recupere red celular.
- **Eficiencia Geoespacial:** Se utilizará PostGIS nativo (`ST_LineLocatePoint` y `ST_Distance`) para calcular la distancia acumulada y proximidad. El backend solo orquesta las consultas.
- **Comunicación en Tiempo Real:** Se utilizará **Server-Sent Events (SSE)** en lugar de WebSockets para las alertas del dashboard, por su simplicidad, reconexión automática y naturaleza unidireccional (Server -> Client).

## 3. Actores

| Actor             | Responsabilidad                                                             |
| :---------------- | :-------------------------------------------------------------------------- |
| **Administrador** | Configuración general del sistema, carga de GPX y carreras.                 |
| **Coordinador**   | Monitorea el dashboard y toma decisiones ante incidentes.                   |
| **Operario**      | Personal en terreno ubicado en puntos específicos del circuito.             |
| **Corredor**      | Participante asociado a un dorsal y a un QR único (token aleatorio).        |
| **Reportante**    | Quien escanea el QR. Puede ser el propio corredor, público u otro ciclista. |

## 4. Entidades Principales

- **Race (Carrera):** `id`, `nombre`, `fecha`, `estado` (BORRADOR, ACTIVA, FINALIZADA), `gpxFile`, `recorridoGeometry`, `distanciaTotal`.
- **Participant (Corredor):** `id`, `raceId`, `dorsal`, `nombre`, `apellido`, `dni`, `telefono`, `qrToken` (Ej: `/emergency/7b82ba42...`).
- **Operator (Operario):** `id`, `raceId`, `nombre`, `telefono`, `positionKm`, `latitude`, `longitude`.
- **Incident (Incidente):** `id`, `participantId`, `raceId`, `motivo`, `descripcion`, `latitude`, `longitude`, `accuracy`, `positionKm`, `status` (NUEVO, EN_ATENCION, RESUELTO).

## 5. Flujo Crítico (La Unidad de Valor)

1. **Escaneo QR:** Lectura de URL pública con token único.
2. **Identificación:** El sistema asocia el token al Corredor.
3. **Reporte:** Selección de motivo (Caída, Mecánico, etc.) + Geolocalización del navegador.
4. **Cálculo PostGIS:** Proyección de coordenadas GPS sobre el trazado GPX -> Obtención de Punto Kilométrico (Ej: Km 24.7).
5. **Asignación:** Búsqueda de los 3 operarios más próximos.
6. **Alerta SSE:** Notificación push visual y sonora al Dashboard del Coordinador.

## 6. Stack Tecnológico

- **Frontend / Dashboard:** Next.js (React), MapLibre/Leaflet, TailwindCSS.
- **Frontend PWA (QR):** Next.js (Service Workers para offline capability).
- **Backend:** NestJS (Node.js).
- **Base de Datos:** PostgreSQL + PostGIS.
- **ORM:** Prisma o TypeORM.
- **Infraestructura Local:** Docker Compose.

## 7. Plan de Ejecución (Sprints)

- **Sprint 1 - Infra y Dominio:** Docker, NestJS, Next.js, Auth, y CRUD básico (Prisma/TypeORM).
- **Sprint 2 - Motor Geoespacial:** Parseo GPX, guardado en PostGIS, y renderizado del mapa.
- **Sprint 3 - Actores:** CRUD Corredores, Generación QR, CRUD Operarios en mapa.
- **Sprint 4 - Flujo de Emergencia:** PWA pública, Geolocation API, cálculos PostGIS, y alertas SSE.

## 8. Reglas para los Agentes IA

- **Prohibida la sobreingeniería:** No usar microservicios, Kafka, Redis ni K8s.
- **Pipeline de Trabajo:** PLAN -> IMPLEMENT -> TEST -> REVIEW -> DOCUMENT -> NEXT TASK.
- **Testing:** Todo código funcional debe tener tests (Unitarios para reglas de negocio, E2E para el flujo crítico).

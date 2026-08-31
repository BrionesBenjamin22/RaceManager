# TAREA 03 - Configuración de Base de Datos y ORM

**Estado:** En progreso
**Responsable:** Orchestrator Agent / Backend Agent / Geospatial Agent

### Descripción
Configurar la conexión a la base de datos PostgreSQL/PostGIS en el Backend y establecer las bases del ORM. Esto incluye:
- Levantar el contenedor de la base de datos.
- Instalar y configurar Prisma ORM en el proyecto NestJS (`/backend`).
- Configurar la extensión PostGIS nativamente para que el sistema la reconozca.
- Validar la conexión con la base de datos y dejar el esquema base del dominio.

### Progreso actual
- Se ha levantado el contenedor de PostGIS correctamente.
- Se ha instalado Prisma en el backend.
- Se está preparando el esquema del dominio y el servicio de acceso a la base de datos.

### Siguientes Pasos
- Crear el esquema base de Prisma.
- Ejecutar la sincronización / migración inicial.
- Validar la salud de la conexión desde la API.

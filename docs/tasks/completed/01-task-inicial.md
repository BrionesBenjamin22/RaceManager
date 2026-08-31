# TAREA 01 - Definición Granular del Equipo de Especialistas

**Estado:** Completada
**Responsable:** Orchestrator Agent

### Resumen

Los perfiles se migraron a agentes de proyecto compatibles con Codex en `.codex/agents/`. Cada archivo TOML declara `name`, `description` y `developer_instructions`:

- **Backend Agent** (`backend.toml`): modularización, inyección de dependencias, validación Zero Trust y REST/SSE.
- **Frontend Agent** (`frontend.toml`): Next.js/Tailwind, componentes aislados y enfoque PWA/offline-first con sincronización diferida.
- **Geospatial Agent** (`geospatial.toml`): procesamiento GPX y cálculos espaciales delegados a PostGIS.
- **QA & Testing Agent** (`qa_testing.toml`): pruebas unitarias, integración, E2E y casos negativos.
- **Security & Performance Agent** (`security_performance.toml`): auditoría de SQL injection, abuso, PII, índices GIST y carga diferida de mapas.

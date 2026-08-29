# TAREA 01 - Definición Granular del Equipo de Especialistas

**Estado:** Completada
**Responsable:** Orchestrator Agent

### Resumen
Se han actualizado y ampliado los perfiles de los agentes en `docs/agents/` incorporando altos estándares de ingeniería:
- **Backend Agent** (`backend.md`): Fuerte modularización, Inyección de Dependencias, regla Zero Trust (DTOs/class-validator) y REST/SSE.
- **Frontend Agent** (`frontend.md`): Next.js/Tailwind, componentes aislados y enfoque estricto PWA / Offline-First con sincronización en segundo plano.
- **Geospatial Agent** (`geospatial.md`): Procesamiento GPX y delegación total del cálculo matemático/espacial nativamente a PostGIS.
- **QA & Testing Agent** (`qa-testing.md`): Cobertura unitaria/integración y evaluación obligatoria de Edge Cases (GPX corruptos, red inestable, spam QR).
- **Security & Performance Agent** (`security-performance.md`): Blindaje anti SQL Injection, Rate Limiting, protección de PII, índices GIST y lazy loading de mapas.

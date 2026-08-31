# Enrutamiento de skills por agente

Las skills complementan las instrucciones del proyecto; no amplían el alcance ni autorizan cambios externos, dependencias, commits o modificaciones de áreas sensibles. Cada agente carga solo las skills relevantes a su tarea y las referencias indicadas por su `SKILL.md`.

| Trabajo | Skill | Agente principal | Apoyo o revisión |
| --- | --- | --- | --- |
| Contratos REST, endpoints, DTOs, permisos, errores, paginación e idempotencia | `api-design-principles` | `backend` | `orquestador`, `qa_testing`, `security_performance`, `geospatial` si cambia un contrato espacial |
| Vistas, formularios, detalles, dashboard, responsive, accesibilidad y estados offline | `interface-design` | `frontend` | `orquestador`, `qa_testing` |
| Data fetching, Server Components, bundles, hidratación, renders, PWA y mapas pesados | `vercel-react-best-practices` | `frontend` | `orquestador`, `security_performance`, `qa_testing` |
| Calidad estructural del diff, cohesión, complejidad, abstracciones y límites | `thermo-nuclear-code-quality-review` | `orquestador` durante `VERIFY` | Auto-revisión de `backend`, `frontend` y `geospatial`; apoyo de `qa_testing` |
| Commits y pull requests | `project-git-workflow` | `orquestador` | Especialistas solo proponen mensajes; no ejecutan Git |

## Reglas de coordinación

- `orquestador` debe nombrar en cada delegación las skills que el especialista necesita y evitar cargar las demás.
- `backend` usa `api-design-principles` cuando el cambio sea visible para consumidores o afecte seguridad y resiliencia del endpoint.
- `frontend` usa `interface-design` para flujos o componentes de producto y añade `vercel-react-best-practices` cuando exista lógica React/Next.js o riesgo de rendimiento.
- `geospatial` usa `api-design-principles` únicamente al definir o modificar payloads, errores o respuestas espaciales.
- `qa_testing` usa las skills correspondientes como fuente de invariantes para diseñar casos; no prueba recomendaciones irrelevantes al cambio.
- `security_performance` consulta `api-design-principles` para superficies HTTP y `vercel-react-best-practices` para rendimiento frontend, manteniendo su modo de solo lectura.
- `backend`, `frontend` y `geospatial` aplican `thermo-nuclear-code-quality-review` como auto-revisión del diff antes de entregar cambios funcionales; no editan durante esa revisión.
- `orquestador` realiza una revisión independiente con `thermo-nuclear-code-quality-review` durante `VERIFY` para cambios funcionales relevantes. Puede omitirla en documentación, archivos generados o configuración trivial sin riesgo.
- La revisión de calidad no sustituye tests, revisión funcional, seguridad, rendimiento ni validación de contratos.
- Ningún agente ejecuta commits. El agente principal aplica `project-git-workflow`, presenta archivos y mensaje exacto, y espera aprobación explícita.

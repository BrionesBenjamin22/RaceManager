# MTB Rescue Frontend

PWA Next.js para reportes públicos, operación de carrera y seguimiento de incidentes.

## Desarrollo local

```bash
pnpm install
pnpm run dev
```

Usa `pnpm run lint` y `pnpm run build` antes de entregar cambios. Las rutas, vistas y estilos están en `src/app/`; los recursos estáticos viven en `public/`.

## Estado y feedback

Toda interacción asíncrona debe mostrar un estado comprensible: carga, éxito, vacío, error, operación offline, sincronización pendiente o degradación. Después de crear, vuelve al home con `successMessage`; después de editar, vuelve al detalle. Un formulario de edición envía solo diferencias reales y agrupa altas y bajas relacionales.

Los errores usan el `code` del backend para comportamiento y presentan `message` más `action` en lenguaje claro. Nunca muestres stack traces ni sustituyas un error contextual por “algo salió mal”. Conserva el `requestId` para soporte sin exponer información sensible.

## UX y accesibilidad

Aplica las heurísticas de Nielsen: visibilidad del estado, correspondencia con el dominio, control del usuario, consistencia, prevención, reconocimiento, eficiencia, minimalismo, recuperación y ayuda. Mantén foco visible, navegación por teclado, etiquetas asociadas, anuncios accesibles para estados dinámicos, contraste suficiente y diseño responsive. No uses solo color para comunicar estado.

Los homes muestran hasta 9 elementos y los historiales 3 por página. Las decisiones compartidas y el contrato de errores están en [`../docs/02-observability-and-feedback.md`](../docs/02-observability-and-feedback.md).

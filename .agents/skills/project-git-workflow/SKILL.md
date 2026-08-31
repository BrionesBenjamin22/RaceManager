---
name: project-git-workflow
description: Estandariza los commits y las descripciones de pull requests de este proyecto. Usar al terminar tareas que modifican el repositorio, al proponer o ejecutar commits y al redactar o crear una pull request.
---

# Flujo Git del proyecto

## Commits al terminar una tarea

Después de implementar y validar una tarea:

1. Revisar el estado y las diferencias del repositorio. Distinguir los cambios de la tarea de cualquier modificación previa o ajena del usuario.
2. Dividir el trabajo en commits atómicos cuando existan módulos o propósitos independientes. No incluir archivos no relacionados.
3. Proponer cada commit con su mensaje exacto y la lista de archivos que incluirá.
4. Pedir aprobación explícita al usuario antes de ejecutar cualquier `git add` o `git commit`. La aprobación general de la tarea no sustituye esta aprobación.
5. Tras recibirla, preparar únicamente los archivos aprobados, revisar el diff staged y crear los commits correspondientes. Si el contenido cambió de forma material respecto de la propuesta, detenerse y solicitar una nueva aprobación.

No hacer `commit --amend`, rebase, push ni publicar una pull request salvo que el usuario lo solicite expresamente. Si el usuario no aprueba los commits, entregar los mensajes propuestos sin ejecutarlos.

## Formato de commits

Usar:

```text
tipo(scope): descripción breve
```

- El tipo es obligatorio. Usar `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `build`, `ci`, `chore`, `style` o `revert` según el propósito real.
- Usar un scope breve que identifique el módulo o área afectada. Omitirlo solo cuando ningún scope aporte claridad, respetando entonces `tipo: descripción breve`.
- Redactar la descripción en español, en minúscula, concreta y sin punto final.
- Describir el resultado del cambio, no el proceso seguido.
- No mezclar cambios funcionales independientes en un mismo commit.
- No usar emojis.

Ejemplos:

```text
feat(investigadores): agrega historial paginado en el detalle
fix(auth): valida permisos antes de actualizar usuarios
docs(backend): documenta contratos del módulo de proyectos
```

## Pull requests

Cuando se solicite preparar una pull request, usar un título con el mismo formato de los commits y redactar un cuerpo autónomo, explicativo y sin emojis. Debe poder comprenderlo un desarrollador que no haya participado en la tarea.

Incluir solo las secciones que aporten información:

```markdown
## Resumen
Qué cambia y cuál es el resultado observable.

## Contexto
Problema o necesidad que origina el cambio.

## Cambios realizados
- Cambios funcionales y técnicos relevantes.
- Contratos, endpoints, modelos o vistas afectados.

## Validación
- Pruebas automáticas ejecutadas y resultado.
- Comprobaciones manuales realizadas.

## Impacto y consideraciones
- Compatibilidad, riesgos conocidos o decisiones relevantes.
- Migraciones, variables de entorno o pasos de despliegue, cuando apliquen.
```

No afirmar que una prueba fue ejecutada si no lo fue. Explicar siglas o decisiones específicas del dominio cuando sean necesarias para entender el cambio. Si una sección no aplica, omitirla o indicarlo brevemente sin rellenar contenido genérico.

Preparar el texto de la pull request como borrador por defecto. Crear o publicar la pull request únicamente si el usuario lo pide y autoriza la operación externa correspondiente.

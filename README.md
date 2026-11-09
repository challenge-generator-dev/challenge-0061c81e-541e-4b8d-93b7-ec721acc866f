# Implementación de operaciones CRUD en bases de datos

En el dominio de la banca, necesitas construir operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en bases de datos SQL y NoSQL para gestionar la información de clientes. Las operaciones deben ser robustas y manejar casos borde como nombres duplicados y datos inválidos. La razón de negocio es mantener un registro preciso y actualizado de los clientes para ofrecer servicios personalizados.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 6 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Crear operaciones CRUD en base de datos SQL

**Objetivo:** Implementar operaciones básicas de CRUD en una base de datos SQL para gestionar información de clientes.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Define la estructura de la tabla para almacenar información de clientes.
- Implementa las operaciones CRUD utilizando DDL y DML.
- Maneja casos borde como nombres duplicados y datos inválidos.

**Entregable:** Operaciones CRUD funcionales en una base de datos SQL para clientes.

<details>
<summary>Pistas de conocimiento</summary>

- Usa IntelliJ IDEA Debugger para depurar y probar las operaciones.

</details>

### Fase 2: Crear operaciones CRUD en base de datos NoSQL

**Objetivo:** Implementar operaciones básicas de CRUD en una base de datos NoSQL para gestionar información de clientes.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Define la estructura del documento para almacenar información de clientes.
- Implementa las operaciones CRUD utilizando el lenguaje de consulta apropiado.
- Maneja casos borde como nombres duplicados y datos inválidos.

**Entregable:** Operaciones CRUD funcionales en una base de datos NoSQL para clientes.

<details>
<summary>Pistas de conocimiento</summary>

- Usa IntelliJ IDEA Debugger para depurar y probar las operaciones.

</details>

### Fase 3: Comparación y optimización de operaciones CRUD

**Objetivo:** Comparar las implementaciones de CRUD en bases de datos SQL y NoSQL, y optimizar las operaciones para mejorar el rendimiento y la eficiencia.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Compara las implementaciones de CRUD en bases de datos SQL y NoSQL.
- Identifica áreas de mejora y optimiza las operaciones.
- Evalúa el rendimiento y la eficiencia de las operaciones optimizadas.

**Entregable:** Informe comparativo y optimizado de las operaciones CRUD en bases de datos SQL y NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Usa IntelliJ IDEA Debugger para depurar y probar las operaciones optimizadas.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en el manejo de datos?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en el contexto de la gestión de clientes en una banca?
- **comoSeUsa**: ¿Cómo se utilizan las operaciones CRUD en bases de datos SQL y NoSQL?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización de operaciones CRUD en bases de datos SQL y NoSQL?

## Criterios de Evaluacion

- Implementación correcta de operaciones CRUD en base de datos SQL.
- Implementación correcta de operaciones CRUD en base de datos NoSQL.
- Manejo adecuado de casos borde en ambas implementaciones.
- Comparación efectiva de las implementaciones de CRUD en SQL y NoSQL.
- Optimización adecuada de las operaciones CRUD para mejorar el rendimiento y la eficiencia.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /clients`
  - `GET /clients`
  - `GET /clients/:id`
  - `PUT /clients/:id`
  - `DELETE /clients/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*

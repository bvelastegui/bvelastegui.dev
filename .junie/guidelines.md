# Development Guidelines for bvelastegui.dev

## 1. Introducción
Este documento proporciona los lineamientos y las mejores prácticas a seguir para el desarrollo del proyecto. El objetivo es mantener un código consistente, limpio y mantenible.

## 2. Stack Tecnológico
El proyecto está construido sobre las siguientes tecnologías:
- **Framework**: [Astro.js](https://astro.build/)
- **Gestor de Paquetes**: [pnpm](https://pnpm.io/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Formateador de Código**: [Prettier](https://prettier.io/)

## 3. Gestión de Dependencias
Todas las dependencias del proyecto deben ser gestionadas a través de . `pnpm`
- **Instalar dependencias (después de clonar el repo):**
``` bash
    pnpm install
```
- **Añadir una nueva dependencia:**
``` bash
    pnpm add nombre-del-paquete
```
- **Añadir una nueva dependencia de desarrollo:**
``` bash
    pnpm add -D nombre-del-paquete
```
## 4. Scripts Principales
Los siguientes comandos son los más comunes para el desarrollo:
- **Iniciar el servidor de desarrollo:**
``` bash
    pnpm dev
```
- **Construir el proyecto para producción:**
``` bash
    pnpm build
```
- **Previsualizar el build de producción localmente:**
``` bash
    pnpm preview
```
## 5. Estructura de Carpetas
Se debe seguir la estructura de carpetas estándar de Astro para una mejor organización:
- `src/`: Contiene todo el código fuente.
- `src/components/`: Para componentes de Astro/UI reutilizables.
- `src/layouts/`: Para las plantillas de diseño de las páginas.
- `src/pages/`: Para las rutas y páginas del sitio.
- `src/styles/`: Para los estilos globales (ej. `globals.css`).
- `public/`: Para los archivos estáticos que no se procesan (imágenes, fuentes, etc.).

## 6. Estilos con Tailwind CSS
Utilizamos Tailwind CSS v4 para todos los estilos.
- La integración se realiza a través del plugin configurado en . `@tailwindcss/vite``astro.config.mjs`
- Con **Tailwind CSS v4**, la configuración se define directamente en tu archivo CSS principal (por ejemplo, `src/styles/globals.css`) utilizando la regla `@theme` para extender el sistema de diseño de Tailwind.
- Aplica las clases de utilidad directamente en tu HTML o en los componentes . `.astro`
- Para estilos base o capas personalizadas de Tailwind, modifica el archivo CSS principal del proyecto (ej. `src/styles/globals.css`).

## 7. Calidad y Formato del Código
Para asegurar un estilo de código uniforme en todo el proyecto, utilizamos **Prettier**.
- La configuración de Prettier ya está definida en el proyecto e incluye plugins para Astro y Tailwind CSS.
- Antes de hacer un commit, asegúrate de formatear tu código ejecutando:
``` bash
   pnpm exec prettier . --write 
```
_(Este comando se puede añadir en para ejecutar `prettier --write .`)`package.json`_
## 8. Exclusiones
- **Tests**: Conforme a los requerimientos actuales, la creación de tests unitarios o de integración está fuera del alcance de este proyecto.

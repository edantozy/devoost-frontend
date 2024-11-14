# Devoost Frontend

Este es el repositorio del frontend de la prueba técnica de Devoost, desarrollado con **React**, **TypeScript** y **Vite**.

Este proyecto sigue las instrucciones siguientes:

<!-- Crear un sistema en Laravel con frontend en VueJS o React y TailwindCss
El sistema debe permitir hacer login, registrar un nuevo usuario y recuperar la contraseña.
El sistema debe tener una vista de lista de Ordenes
Al dar click sobre cada orden se puede ver el detalle de la orden: Cliente (catalogo), datos generales de la orden (fecha, numero, etc) y el listado de productos (catalogo)
El sistema puede crear o cancelar ordenes pero no puede eliminar.
El sistema puede agregar, editar, eliminar items a la orden y el subtotal debe ir cambiando sin refrescar la página. -->

- Crear un sistema en Laravel con frontend en VueJS o React y TailwindCss.
- El sistema debe permitir hacer login, registrar un nuevo usuario y recuperar la contraseña.
- El sistema debe tener una vista de lista de Órdenes.
- Al dar click sobre cada orden se puede ver el detalle de la orden: Cliente (catalogo), datos generales de la orden (fecha, numero, etc) y el listado de productos (catalogo).
- El sistema puede crear o cancelar ordenes pero no puede eliminar.
- El sistema puede agregar, editar, eliminar items a la orden y el subtotal debe ir cambiando sin refrescar la página.

## Tecnologías Utilizadas

- **React**: Librería de JavaScript para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Vite**: Herramienta de desarrollo rápida para aplicaciones modernas.
- **Redux Toolkit**: Para la gestión del estado global.
- **React Query**: Para la gestión y sincronización de datos asincrónicos.
- **React Hook Form**: Para el manejo de formularios.
- **React Toastify**: Para notificaciones.
- **Font Awesome**: Iconos.
- **Tailwind CSS**: Para estilos de diseño.

## Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** (v14 o superior)
- **npm** o **yarn**

## Configuración del Entorno

1. Copia el archivo `.env.example` y renómbralo a `.env`.
2. Dentro del archivo `.env`, configura el valor de `VITE_API_URL`:

   ```env
   VITE_API_URL=tu_url_de_api
   ```

## Scripts Disponibles

En el archivo `package.json`, se definen los siguientes scripts:

- `dev`: Ejecuta el proyecto en modo de desarrollo usando Vite.
- `build`: Realiza la construcción del proyecto usando `tsc` y Vite.
- `lint`: Ejecuta ESLint para analizar el código en busca de errores.
- `preview`: Sirve la versión construida en local para previsualización.

Para ejecutar estos comandos, utiliza:

```bash
npm run <nombre_del_script>
```

o, si prefieres `yarn`:

```bash
yarn <nombre_del_script>
```

## Instalación y Ejecución

1. Clona este repositorio.

2. Instala las dependencias:

   ```bash
   npm install
   # o, si prefieres yarn
   yarn install
   ```

3. Configura el archivo `.env` como se indica en la sección de configuración del entorno.

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Construcción para Producción

Para construir el proyecto en modo de producción:

```bash
npm run build
```

El resultado se guardará en la carpeta `dist`.

## Linting

Para revisar el código con ESLint, ejecuta:

```bash
npm run lint
```

## Licencia

Este proyecto está licenciado bajo la licencia MIT.
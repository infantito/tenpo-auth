# React Auth Challenge

Esta aplicación implementa un sistema de autenticación con React y TypeScript, incluyendo rutas protegidas y visualización eficiente de grandes conjuntos de datos.

## Características

- Sistema de autenticación con login/logout
- Arquitectura de rutas públicas y privadas
- Visualización eficiente de 2000 elementos usando virtualización
- Diseño completamente responsivo (móvil y escritorio)
- Configuración de Axios con interceptores para manejo de token
- Almacenamiento del token en sesión (sessionStorage)

## Tecnologías utilizadas

- React 18.3+
- TypeScript
- React Router Dom
- Axios
- React Window (virtualización)
- TailwindCSS
- Lucide React (iconos)

## Cómo ejecutar el proyecto

### Requisitos previos

- Node.js 16+
- npm o yarn

### Instalación

1. Clona este repositorio
```bash
git clone https://github.com/tu-usuario/react-auth-challenge.git
cd react-auth-challenge
```

2. Instala las dependencias
```bash
npm install
# o
yarn
```

3. Inicia el servidor de desarrollo
```bash
npm run dev
# o
yarn dev
```

4. Abre tu navegador en `http://localhost:5173`

## Arquitectura de la aplicación

### Estructura de directorios

```
src/
  ├── components/      # Componentes reutilizables
  ├── context/         # Contextos de React, incluido AuthContext
  ├── hooks/           # Custom hooks
  ├── pages/           # Páginas principales
  ├── services/        # Servicios de API
  ├── types/           # Definiciones de tipos TypeScript
  ├── App.tsx          # Componente principal
  └── main.tsx         # Punto de entrada
```

### Contexto de autenticación

La aplicación utiliza el Context API de React para manejar el estado de autenticación. El token se almacena en sessionStorage para persistir entre recargas de página pero se limpia al cerrar el navegador.

### Rutas protegidas

Se implementan componentes `ProtectedRoute` y `PublicRoute` para controlar el acceso a las rutas basado en el estado de autenticación.

### Optimización de la lista

Para mostrar eficientemente 2000 elementos, se utiliza:

1. Virtualización con React Window: Solo renderiza los elementos visibles en la ventana del usuario.
2. Lazy loading para imágenes
3. Diseño responsivo que ajusta el número de columnas según el ancho de la pantalla

## Mejoras teóricas propuestas

Para optimizar las llamadas al backend:

1. **Paginación**: Implementar paginación del lado del servidor y cliente para cargar datos incrementalmente.
2. **Caché**: Añadir un sistema de caché con tiempo de expiración para reducir peticiones redundantes.
3. **Campos selectivos**: Solicitar solo los campos necesarios para reducir el tamaño de respuesta.
4. **Compresión**: Habilitar compresión en las respuestas HTTP.
5. **Lazy loading de módulos**: Separar código por rutas para reducir el tamaño inicial de la aplicación.
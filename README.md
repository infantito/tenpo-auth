# React Auth Challenge

This application implements an authentication system with React and TypeScript, including protected routes and efficient visualization of large data sets.

![Login!](https://raw.githubusercontent.com/infantito/tenpo-auth/refs/heads/main/src/assets/tenpo-auth.png)

![Dashboard!](https://raw.githubusercontent.com/infantito/tenpo-auth/refs/heads/main/src/assets/tenpo-home.png)

## Features

- Authentication system with login/logout
- Architecture for public and private routes
- Efficient visualization of 2000 items using virtualization
- Fully responsive design (mobile and desktop)
- Axios configuration with interceptors for token handling
- Token storage in session (sessionStorage)

## Technologies used

- React 19.1.0
- TypeScript ~5.8.3
- React Router Dom 6.22.3
- Axios 1.9.0
- React Window 1.8.11 (virtualization)
- TailwindCSS 3.4.1
- Lucide React 0.511.0 (icons)
- Vite 6.3.5

## How to run the project

### Prerequisites

- Node.js 20+
- npm

### Installation

1. Clone this repository

```bash
git clone git@github.com:infantito/tenpo-auth.git
cd tenpo-auth
```

1. Install dependencies

```bash
npm ci
```

1. Start the development server

```bash
npm run start
# or
yarn dev
```

1. Open your browser at `http://localhost:5173`

## Application architecture

### Directory structure

```markdown
src/
  ├── assets/          # Static files (images, fonts, etc.)
  ├── components/      # Reusable components
  ├── constants/       # Constants and configurations
  ├── containers/      # Layout or general design components
  ├── context/         # React contexts, including AuthContext
  ├── hooks/           # Custom hooks
  ├── pages/           # Main pages
  ├── routes/          # Route and navigation definitions
  ├── services/        # API services
  ├── types/           # TypeScript type definitions
  ├── utils/           # Utility functions and helpers
  ├── app.tsx          # Main component
  └── main.tsx         # Entry point
```

### Authentication context

The application uses React's Context API to manage authentication state. The token is stored in sessionStorage to persist between page reloads but is cleared when the browser is closed.

### Protected routes

`ProtectedRoute` and `PublicRoute` components are implemented to control access to routes based on authentication state.

### List optimization

To efficiently display 2000 items, the following are used:

1. Virtualization with React Window: Only renders the items visible in the user's viewport.
2. Lazy loading for images
3. Responsive design that adjusts the number of columns according to screen width

## Proposed theoretical improvements

To optimize backend calls:

1. **Pagination**: Implement server-side and client-side pagination to load data incrementally.
2. **Cache**: Add a cache system with expiration time to reduce redundant requests.
3. **Selective fields**: Request only the necessary fields to reduce response size.
4. **Compression**: Enable compression in HTTP responses.
5. **Module lazy loading**: Split code by routes to reduce the initial application size.

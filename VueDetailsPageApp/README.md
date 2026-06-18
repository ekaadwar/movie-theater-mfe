# Vue Details Page App

A Vue 3 version of the Details Page micro frontend using Vite, TypeScript, Tailwind CSS, Vue Router, and Pinia.

## Run standalone

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3003/details/1
```

The backend server must be available at:

```txt
http://localhost:5555
```

## Build

```bash
npm run build
npm run preview
```

## Module Federation

This app exposes:

```txt
vue_details/DetailsPage
vue_details/mount
```

Vite preview exposes the remote entry at:

```txt
http://localhost:3003/assets/remoteEntry.js
```

For a React host, use `vue_details/mount` and mount it inside a React wrapper component. A Vue SFC cannot be rendered directly by React.lazy.

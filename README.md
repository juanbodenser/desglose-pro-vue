# Inventario Cocina - Vue.js

Aplicación de inventario de cocina reescrita en Vue 3 con Vite, Vue Router y Pinia.

## Características

- Gestión de partidas y recetas
- Cálculo de desglose de ingredientes basado en peso
- Historial de cálculos guardados en localStorage
- Resumen total de ingredientes acumulados
- Recetario completo
- Soporte para modo oscuro

## Stack Tecnológico

- **Vue 3** - Framework JavaScript
- **Vite** - Build tool y dev server
- **Vue Router** - Enrutamiento
- **Pinia** - Gestión de estado global
- **Composition API** - Lógica de componentes

## Estructura del Proyecto

```
desglose-pro-vue/
├── public/
│   └── data/
│       └── recetas.json
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Card.vue
│   │   └── Tabla.vue
│   ├── views/          # Páginas principales
│   │   ├── PartidasView.vue
│   │   ├── RecetasView.vue
│   │   ├── CalculoView.vue
│   │   ├── RecetarioView.vue
│   │   └── ResumenView.vue
│   ├── stores/         # Pinia stores
│   │   └── recetasStore.js
│   ├── router/         # Configuración de rutas
│   │   └── index.js
│   ├── services/       # Lógica de negocio
│   │   ├── calculos.js
│   │   ├── storage.js
│   │   └── recetasService.js
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Instalación

1. Navega al directorio del proyecto:
```bash
cd desglose-pro-vue
```

2. Instala las dependencias:
```bash
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Build

Para crear una versión de producción:
```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## Preview

Para previsualizar la versión de producción:
```bash
npm run preview
```

## Rutas

- `/` - Lista de partidas
- `/partida/:partida` - Recetas de una partida
- `/partida/:partida/receta/:receta` - Cálculo de ingredientes
- `/recetario` - Recetario completo
- `/resumen` - Resumen de totales acumulados

## Datos

Los datos de recetas se cargan desde `public/data/recetas.json`. Puedes editar este archivo para agregar o modificar recetas.

## Historial

Los cálculos se guardan en `localStorage` bajo la clave `inventarioCalculos`.

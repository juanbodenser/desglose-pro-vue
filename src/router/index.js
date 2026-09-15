import { createRouter, createWebHistory } from 'vue-router'

// Manejar redirección del 404.html para GitHub Pages
const isGitHubPages = window.location.hostname === 'juanbodenser.github.io'
const router = createRouter({
  history: createWebHistory('/desglose-pro-vue/'),
  routes: [
    {
      path: '/',
      name: 'partidas',
      component: () => import('../views/PartidasView.vue')
    },
    {
      path: '/partida/:partida',
      name: 'recetas',
      component: () => import('../views/RecetasView.vue'),
      props: true
    },
    {
      path: '/partida/:partida/receta/:receta',
      name: 'calculo',
      component: () => import('../views/CalculoView.vue'),
      props: true
    },
    {
      path: '/recetario',
      name: 'recetario',
      component: () => import('../views/RecetarioView.vue')
    },
    {
      path: '/resumen',
      name: 'resumen',
      component: () => import('../views/ResumenView.vue')
    }
  ]
})

// Manejar redirección desde 404.html para GitHub Pages
if (isGitHubPages) {
  const path = window.location.search.match(/[?&]p=([^&]+)/)
  if (path) {
    router.replace(path[1])
  }
}

export default router

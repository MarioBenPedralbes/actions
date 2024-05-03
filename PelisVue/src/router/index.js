import { createRouter, createWebHistory } from 'vue-router'
import buscador from '../components/BuscadorPelis.vue'
import favoritas from '../components/PelisFavoritas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/PelisVue/vue/buscador',
      name: 'buscador',
      component: buscador
    },
    {
      path: '/PelisVue/vue/favoritas',
      name: 'favoritas',
      component: favoritas
    }
  ]
})

export default router

import { defineStore } from 'pinia'
import { cargarRecetas } from '../services/recetasService.js'

export const useRecetasStore = defineStore('recetas', {
  state: () => ({
    data: {},
    currentPartida: null,
    currentReceta: null,
    loading: false,
    error: null
  }),
  actions: {
    async cargarDatos() {
      this.loading = true
      this.error = null
      try {
        this.data = await cargarRecetas()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    setPartida(partida) {
      this.currentPartida = partida
    },
    setReceta(receta) {
      this.currentReceta = receta
    },
    clearSelection() {
      this.currentPartida = null
      this.currentReceta = null
    }
  }
})

<template>
  <div class="recetas-view">
    <button class="back-btn" @click="goBack">
      <span class="back-icon">←</span>
      <span>Volver a partidas</span>
    </button>
    
    <div class="page-header">
      <h1>{{ partida }}</h1>
      <p class="subtitle">{{ recetas?.length || 0 }} recetas disponibles</p>
    </div>
    
    <div v-if="recetas" class="cards-container">
      <Card 
        v-for="receta in recetas" 
        :key="receta.nombre"
        @click="goToCalculo(receta)"
      >
        <div class="receta-card">
          <span class="receta-name">{{ receta.nombre }}</span>
          <span class="receta-yield">Rendimiento: {{ receta.ingredientes?.rendimiento || '?' }}g</span>
        </div>
      </Card>
    </div>
    
    <div v-else class="empty-state">
      <div class="empty-icon">📭</div>
      <p>No hay recetas en esta partida</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRecetasStore } from '../stores/recetasStore.js'
import Card from '../components/Card.vue'

const router = useRouter()
const route = useRoute()
const recetasStore = useRecetasStore()

const partida = computed(() => route.params.partida)
const recetas = computed(() => recetasStore.data[partida.value])

function goBack() {
  router.push({ name: 'partidas' })
}

function goToCalculo(receta) {
  router.push({ 
    name: 'calculo', 
    params: { 
      partida: partida.value, 
      receta: receta.nombre 
    }
  })
}
</script>

<style scoped>
.recetas-view {
  max-width: 1200px;
  margin: 0 auto;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  margin-bottom: 24px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--surface-variant);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  font-family: inherit;
}

.back-btn:hover {
  background: var(--border);
  transform: translateX(-2px);
}

.back-icon {
  font-size: 16px;
}

.page-header {
  margin-bottom: 32px;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.receta-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.receta-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.receta-yield {
  font-size: 14px;
  color: var(--text-secondary);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 16px;
  margin: 0;
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>

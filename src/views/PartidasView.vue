<template>
  <div class="partidas-view">
    <div class="page-header">
      <h1>Partidas</h1>
      <p class="subtitle">Selecciona una partida para ver sus recetas</p>
    </div>
    
    <div v-if="recetasStore.loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Cargando recetas...</p>
    </div>
    
    <div v-else-if="recetasStore.error" class="error-state">
      <div class="error-icon">⚠️</div>
      <p>{{ recetasStore.error }}</p>
    </div>
    
    <div v-else>
      <div class="cards-container">
        <Card 
          v-for="partida in Object.keys(recetasStore.data)" 
          :key="partida"
          @click="goToRecetas(partida)"
        >
          <div class="partida-card">
            <span class="partida-name">{{ partida }}</span>
            <span class="partida-count">{{ recetasStore.data[partida].length }} recetas</span>
          </div>
        </Card>
      </div>
      
      <div class="actions-section">
        <h2 class="actions-title">Acciones rápidas</h2>
        <div class="buttons-grid">
          <button class="action-btn primary" @click="goToRecetario">
            <span class="btn-icon">📖</span>
            <span>Ver Recetario Completo</span>
          </button>
          <button class="action-btn secondary" @click="goToResumen">
            <span class="btn-icon">📊</span>
            <span>Ver Resumen Totales</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRecetasStore } from '../stores/recetasStore.js'
import Card from '../components/Card.vue'

const router = useRouter()
const recetasStore = useRecetasStore()

onMounted(() => {
  if (Object.keys(recetasStore.data).length === 0) {
    recetasStore.cargarDatos()
  }
})

function goToRecetas(partida) {
  router.push({ name: 'recetas', params: { partida } })
}

function goToRecetario() {
  router.push({ name: 'recetario' })
}

function goToResumen() {
  router.push({ name: 'resumen' })
}
</script>

<style scoped>
.partidas-view {
  max-width: 1200px;
  margin: 0 auto;
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

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.loading-state p,
.error-state p {
  color: var(--text-secondary);
  font-size: 16px;
  margin: 0;
}

.error-state p {
  color: var(--danger);
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.partida-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.partida-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.partida-count {
  font-size: 14px;
  color: var(--text-secondary);
}

.actions-section {
  background: var(--surface-variant);
  border-radius: var(--radius-lg);
  padding: 32px;
  border: 1px solid var(--border);
}

.actions-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.action-btn.primary {
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow-md);
}

.action-btn.primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.action-btn.secondary {
  background: var(--surface);
  color: var(--text-primary);
  border: 2px solid var(--border);
}

.action-btn.secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 20px;
  line-height: 1;
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }

  .buttons-grid {
    grid-template-columns: 1fr;
  }

  .actions-section {
    padding: 24px;
  }
}
</style>

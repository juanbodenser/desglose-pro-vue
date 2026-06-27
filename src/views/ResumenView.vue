<template>
  <div class="resumen-view">
    <button class="back-btn" @click="goBack">
      <span class="back-icon">←</span>
      <span>Volver a partidas</span>
    </button>
    
    <div class="page-header">
      <h1>Resumen Totales</h1>
      <p class="subtitle">Suma acumulada de ingredientes de todas las bandejas pesadas</p>
    </div>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Cargando resumen...</p>
    </div>
    
    <div v-else-if="Object.keys(totales).length === 0" class="empty-state">
      <div class="empty-icon">📊</div>
      <h3>No hay cálculos guardados</h3>
      <p>Realiza algunos cálculos para ver el resumen acumulado</p>
    </div>
    
    <div v-else class="content-section">
      <div class="summary-card">
        <div class="summary-header">
          <span class="summary-icon">📈</span>
          <div>
            <h2>Totales acumulados</h2>
            <p class="summary-subtitle">{{ Object.keys(totales).length }} ingredientes diferentes</p>
          </div>
        </div>
        <Tabla :data="totales" />
      </div>
      
      <div class="danger-zone">
        <h3>Zona de peligro</h3>
        <p class="danger-text">Esta acción eliminará permanentemente todo el historial de cálculos</p>
        <button class="clear-btn" @click="limpiarHistorial">
          <span class="btn-icon">🗑️</span>
          <span>Limpiar todo el historial</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { obtenerResumenTotales, limpiarHistorial as clearStorage } from '../services/storage.js'
import Tabla from '../components/Tabla.vue'

const router = useRouter()
const totales = ref({})
const loading = ref(true)

onMounted(() => {
  totales.value = obtenerResumenTotales()
  loading.value = false
})

function goBack() {
  router.push({ name: 'partidas' })
}

function limpiarHistorial() {
  if (confirm('¿Estás seguro de que quieres borrar todo el historial de cálculos? Esta acción no se puede deshacer.')) {
    clearStorage()
    totales.value = obtenerResumenTotales()
  }
}
</script>

<style scoped>
.resumen-view {
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

.loading-state {
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

.loading-state p {
  color: var(--text-secondary);
  font-size: 16px;
  margin: 0;
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

.empty-state h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 16px;
  margin: 0;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.summary-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.summary-icon {
  font-size: 40px;
}

.summary-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.summary-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.danger-zone {
  background: var(--surface);
  border: 2px solid var(--danger);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.danger-zone h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--danger);
  margin: 0 0 8px 0;
}

.danger-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  border: 2px solid var(--danger);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--danger);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.clear-btn:hover {
  background: var(--danger);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-icon {
  font-size: 18px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }

  .summary-card {
    padding: 24px;
  }

  .summary-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .danger-zone {
    padding: 20px;
  }
}
</style>

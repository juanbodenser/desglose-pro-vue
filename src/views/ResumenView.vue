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
        <button class="print-btn" @click="imprimir">
          <span class="btn-icon">🖨️</span>
          <span>Imprimir</span>
        </button>
      </div>
      
      <div class="sueltos-card">
        <div class="sueltos-header">
          <span class="sueltos-icon">➕</span>
          <h3>Agregar ingrediente suelto</h3>
        </div>
        <div class="sueltos-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nombre del ingrediente</label>
              <input 
                v-model="nuevoSueto.nombre" 
                type="text" 
                placeholder="Ej: Biberones de aceite"
                class="form-input"
              >
            </div>
            <div class="form-group">
              <label class="form-label">Cantidad (g)</label>
              <input 
                v-model.number="nuevoSueto.gramos" 
                type="number" 
                placeholder="Ej: 500"
                min="0"
                step="0.1"
                class="form-input"
              >
            </div>
          </div>
          <button class="add-sueto-btn" @click="agregarSueto" :disabled="!nuevoSueto.nombre || !nuevoSueto.gramos">
            <span class="btn-icon">➕</span>
            <span>Agregar</span>
          </button>
        </div>
        
        <div v-if="Object.keys(ingredientesSueltos).length > 0" class="sueltos-list">
          <h4>Ingredientes sueltos agregados</h4>
          <div class="sueltos-items">
            <div v-for="(gramos, nombre) in ingredientesSueltos" :key="nombre" class="sueltos-item">
              <span class="sueltos-name">{{ nombre }}</span>
              <span class="sueltos-amount">{{ gramos }}g</span>
            </div>
          </div>
        </div>
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
import { obtenerResumenTotales, limpiarHistorial as clearStorage, guardarIngredienteSueto, obtenerIngredientesSueltos } from '../services/storage.js'
import Tabla from '../components/Tabla.vue'

const router = useRouter()
const totales = ref({})
const loading = ref(true)
const nuevoSueto = ref({ nombre: '', gramos: '' })
const ingredientesSueltos = ref({})

onMounted(() => {
  totales.value = obtenerResumenTotales()
  ingredientesSueltos.value = obtenerIngredientesSueltos()
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

function imprimir() {
  window.print()
}

function agregarSueto() {
  if (nuevoSueto.value.nombre && nuevoSueto.value.gramos) {
    guardarIngredienteSueto(nuevoSueto.value.nombre, nuevoSueto.value.gramos)
    ingredientesSueltos.value = obtenerIngredientesSueltos()
    totales.value = obtenerResumenTotales()
    nuevoSueto.value = { nombre: '', gramos: '' }
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

.print-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: var(--radius-md);
  background: var(--primary);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  margin-top: 24px;
}

.print-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
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

.sueltos-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}

.sueltos-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.sueltos-icon {
  font-size: 28px;
}

.sueltos-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.sueltos-form {
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.form-input {
  padding: 12px 16px;
  font-size: 14px;
  font-family: inherit;
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-variant);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--surface);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.add-sueto-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: var(--radius-md);
  background: var(--primary);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.add-sueto-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.add-sueto-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.sueltos-list {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.sueltos-list h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 16px 0;
}

.sueltos-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sueltos-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--surface-variant);
  border-radius: var(--radius-md);
}

.sueltos-name {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}

.sueltos-amount {
  font-size: 14px;
  color: var(--primary);
  font-weight: 600;
  font-family: 'Inter', monospace;
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

  .sueltos-card {
    padding: 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media print {
  .back-btn,
  .print-btn,
  .danger-zone,
  .summary-icon,
  .sueltos-card {
    display: none !important;
  }

  .resumen-view {
    max-width: none;
    margin: 0;
  }

  .page-header {
    margin-bottom: 16px;
  }

  .summary-card {
    border: none;
    box-shadow: none;
    padding: 0;
  }

  .summary-header {
    border-bottom: 2px solid #000;
  }

  h1,
  h2,
  .summary-subtitle {
    color: #000;
  }

  ::v-deep table {
    border-collapse: collapse;
    width: 100%;
  }

  ::v-deep th,
  ::v-deep td {
    border: 1px solid #000;
    padding: 8px;
  }
}
</style>

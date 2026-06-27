<template>
  <div class="calculo-view">
    <button class="back-btn" @click="goBack">
      <span class="back-icon">←</span>
      <span>Volver a recetas</span>
    </button>
    
    <div class="page-header">
      <div class="breadcrumb">
        <span class="breadcrumb-item">{{ partida }}</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item current">{{ receta }}</span>
      </div>
      <h1>Calcular Desglose</h1>
      <p class="subtitle">Introduce el peso actual de la bandeja para calcular los ingredientes</p>
    </div>
    
    <div class="content-grid">
      <div class="form-section">
        <div class="form-card">
          <div class="form-header">
            <span class="form-icon">⚖️</span>
            <h2>Datos de pesada</h2>
          </div>
          
          <div class="form-group">
            <label for="peso" class="form-label">Peso de la bandeja (gramos)</label>
            <div class="input-wrapper">
              <input 
                id="peso"
                v-model.number="peso" 
                type="number" 
                placeholder="Ej: 2340" 
                min="0" 
                step="0.1"
                class="peso-input"
                @keyup.enter="calcular"
              >
              <span class="input-suffix">g</span>
            </div>
            <p class="form-hint">Introduce el peso total de la bandeja con la preparación</p>
          </div>
          
          <button class="calcular-btn" @click="calcular" :disabled="!peso || peso <= 0">
            <span class="btn-icon">🧮</span>
            <span>Calcular y Guardar</span>
          </button>
          
          <div v-if="error" class="error-message">
            <span class="error-icon">⚠️</span>
            <span>{{ error }}</span>
          </div>
        </div>
      </div>
      
      <div v-if="resultado" class="result-section">
        <div class="result-card">
          <div class="result-header">
            <span class="result-icon">✅</span>
            <div>
              <h2>Resultado del cálculo</h2>
              <p class="result-subtitle">Peso base: {{ recetaData?.ingredientes?.rendimiento || '?' }}g → Peso actual: {{ peso }}g</p>
            </div>
          </div>
          
          <Tabla :data="resultado" />
          
          <div class="success-banner">
            <span class="success-icon">💾</span>
            <span>Cálculo guardado en el historial</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRecetasStore } from '../stores/recetasStore.js'
import { calcularDesglose } from '../services/calculos.js'
import { guardarCalculo } from '../services/storage.js'
import Tabla from '../components/Tabla.vue'

const router = useRouter()
const route = useRoute()
const recetasStore = useRecetasStore()

const partida = route.params.partida
const receta = route.params.receta
const peso = ref('')
const resultado = ref(null)
const error = ref('')

const recetaData = computed(() => {
  return recetasStore.data[partida]?.find(r => r.nombre === receta)
})

function calcular() {
  error.value = ''
  resultado.value = null
  
  if (!peso.value || peso.value <= 0) {
    error.value = 'Introduce un peso válido mayor que 0'
    return
  }
  
  if (!recetaData.value) {
    error.value = 'Receta no encontrada'
    return
  }
  
  resultado.value = calcularDesglose(peso.value, recetaData.value.ingredientes)
  guardarCalculo(partida, receta, peso.value, resultado.value)
}

function goBack() {
  router.push({ name: 'recetas', params: { partida } })
}
</script>

<style scoped>
.calculo-view {
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

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
}

.breadcrumb-item {
  color: var(--text-secondary);
}

.breadcrumb-item.current {
  color: var(--primary);
  font-weight: 500;
}

.breadcrumb-separator {
  color: var(--text-muted);
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

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 900px) {
  .content-grid {
    grid-template-columns: 400px 1fr;
  }
}

.form-section {
  position: sticky;
  top: 80px;
  align-self: start;
}

.form-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.form-icon {
  font-size: 28px;
}

.form-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.peso-input {
  width: 100%;
  padding: 14px 48px 14px 16px;
  font-size: 16px;
  font-family: inherit;
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-variant);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.peso-input:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--surface);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.peso-input::placeholder {
  color: var(--text-muted);
}

.input-suffix {
  position: absolute;
  right: 16px;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.form-hint {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 8px 0 0 0;
}

.calcular-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: var(--radius-md);
  background: var(--primary);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  box-shadow: var(--shadow-md);
}

.calcular-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.calcular-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 18px;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius-md);
  color: var(--danger);
  font-size: 14px;
}

.error-icon {
  font-size: 16px;
}

.result-section {
  align-self: start;
}

.result-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.result-icon {
  font-size: 28px;
}

.result-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.result-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.success-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 12px 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: var(--radius-md);
  color: var(--success);
  font-size: 14px;
  font-weight: 500;
}

.success-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }

  .form-card,
  .result-card {
    padding: 24px;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .form-section {
    position: static;
  }
}
</style>

<template>
  <div class="recetario-view">
    <button class="back-btn" @click="goBack">
      <span class="back-icon">←</span>
      <span>Volver a partidas</span>
    </button>
    
    <div class="page-header">
      <h1>Recetario Completo</h1>
      <p class="subtitle">Todas las recetas de todas las partidas</p>
    </div>
    
    <div v-if="recetasStore.loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Cargando recetario...</p>
    </div>
    
    <div v-else>
      <div v-for="(recetas, partida) in recetasStore.data" :key="partida" class="partida-section">
        <div class="partida-header">
          <h2>{{ partida }}</h2>
          <span class="receta-count">{{ recetas.length }} recetas</span>
        </div>
        
        <div class="recetas-list">
          <div v-for="receta in recetas" :key="receta.nombre" class="receta-card">
            <div class="receta-header" @click="toggleReceta(receta.nombre)">
              <div class="receta-info">
                <h3 class="receta-nombre">{{ receta.nombre }}</h3>
                <span class="receta-rendimiento">Rendimiento: {{ receta.ingredientes?.rendimiento || '?' }}g</span>
              </div>
              <span class="toggle-icon">{{ expandedRecetas[receta.nombre] ? '▼' : '▶' }}</span>
            </div>
            
            <div v-if="expandedRecetas[receta.nombre]" class="ingredientes-section">
              <div class="multiplier-section">
                <label class="multiplier-label">Multiplicador:</label>
                <input 
                  v-model.number="multiplicadores[receta.nombre]" 
                  type="number" 
                  min="0.1" 
                  step="0.1" 
                  placeholder="1"
                  class="multiplier-input"
                >
                <span class="multiplier-hint">x</span>
              </div>
              
              <h4>Ingredientes</h4>
              <table class="ingredientes-table">
                <thead>
                  <tr>
                    <th>Ingrediente</th>
                    <th>Base (g)</th>
                    <th v-if="multiplicadores[receta.nombre] && multiplicadores[receta.nombre] !== 1">Multiplicado (g)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cant, ing) in receta.ingredientes" :key="ing">
                    <td v-if="ing !== 'rendimiento'">{{ ing }}</td>
                    <td v-if="ing !== 'rendimiento'" class="value-cell">{{ cant }}</td>
                    <td v-if="ing !== 'rendimiento' && multiplicadores[receta.nombre] && multiplicadores[receta.nombre] !== 1" class="value-cell multiplied">
                      {{ (cant * (multiplicadores[receta.nombre] || 1)).toFixed(1) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRecetasStore } from '../stores/recetasStore.js'

const router = useRouter()
const recetasStore = useRecetasStore()
const expandedRecetas = ref({})
const multiplicadores = ref({})

function goBack() {
  router.push({ name: 'partidas' })
}

function toggleReceta(recetaNombre) {
  expandedRecetas.value[recetaNombre] = !expandedRecetas.value[recetaNombre]
}
</script>

<style scoped>
.recetario-view {
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
  margin-bottom: 40px;
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

.partida-section {
  margin-bottom: 48px;
}

.partida-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--border);
}

h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.receta-count {
  font-size: 14px;
  color: var(--text-secondary);
  background: var(--surface-variant);
  padding: 4px 12px;
  border-radius: var(--radius-sm);
}

.recetas-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.receta-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease;
}

.receta-card:hover {
  box-shadow: var(--shadow-md);
}

.receta-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 8px 0;
  transition: background 0.2s ease;
}

.receta-header:hover {
  background: var(--surface-variant);
  padding: 8px 12px;
  margin: 0 -12px 20px -12px;
  border-radius: var(--radius-md);
}

.receta-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.receta-nombre {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.receta-rendimiento {
  font-size: 14px;
  color: var(--text-secondary);
}

.toggle-icon {
  font-size: 12px;
  color: var(--text-secondary);
  transition: transform 0.2s ease;
  margin-left: 12px;
}

.ingredientes-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.multiplier-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--surface-variant);
  border-radius: var(--radius-md);
}

.multiplier-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
}

.multiplier-input {
  width: 80px;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.multiplier-input:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--surface);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.multiplier-hint {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.ingredientes-section h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 12px 0;
}

.ingredientes-table {
  width: 100%;
  border-collapse: collapse;
}

.ingredientes-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  background: var(--surface-variant);
  border-bottom: 1px solid var(--border);
}

.ingredientes-table td {
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
}

.ingredientes-table tr:last-child td {
  border-bottom: none;
}

.value-cell {
  text-align: right;
  font-weight: 500;
  font-family: 'Inter', monospace;
  color: var(--primary);
}

.value-cell.multiplied {
  color: var(--success);
  font-weight: 600;
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }

  .partida-header {
    flex-wrap: wrap;
  }

  .receta-card {
    padding: 20px;
  }

  .ingredientes-table th,
  .ingredientes-table td {
    padding: 10px 12px;
    font-size: 13px;
  }
}
</style>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Ingrediente</th>
          <th>Gramos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gramos, ingrediente) in data" :key="ingrediente">
          <td>{{ ingrediente }}</td>
          <td class="value-cell">{{ formatNumber(gramos) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})

function formatNumber(value) {
  if (typeof value === 'number') {
    return value.toFixed(2).replace(/\.00$/, '')
  }
  return value
}
</script>

<style scoped>
.table-container {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--surface-variant);
  border-bottom: 1px solid var(--border);
}

th {
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background 0.15s ease;
}

tbody tr:last-child {
  border-bottom: none;
}

tbody tr:hover {
  background: var(--surface-variant);
}

td {
  padding: 16px 20px;
  text-align: left;
  font-size: 15px;
  color: var(--text-primary);
}

.value-cell {
  text-align: right;
  font-weight: 500;
  font-family: 'Inter', monospace;
  color: var(--primary);
}

@media (max-width: 768px) {
  th, td {
    padding: 12px 16px;
    font-size: 14px;
  }
}
</style>

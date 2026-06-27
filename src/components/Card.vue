<template>
  <div class="card" @click="$emit('click')">
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--primary);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.card:hover::before {
  opacity: 1;
}

.card:active {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.card-content {
  position: relative;
  z-index: 1;
}
</style>

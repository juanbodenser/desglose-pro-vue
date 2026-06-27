const STORAGE_KEY = "inventarioCalculos";

export function guardarCalculo(partida, recetaNombre, peso, resultado) {
  let historial = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
  historial.push({
    id: Date.now(),
    fecha: new Date().toISOString(),
    partida,
    receta: recetaNombre,
    pesoIngresado: peso,
    ingredientes: resultado
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
}

export function obtenerHistorial() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function limpiarHistorial() {
  localStorage.removeItem(STORAGE_KEY);
}

export function obtenerResumenTotales() {
  const historial = obtenerHistorial();
  const totales = {};

  historial.forEach(registro => {
    Object.entries(registro.ingredientes).forEach(([ingrediente, gramos]) => {
      if (!totales[ingrediente]) totales[ingrediente] = 0;
      totales[ingrediente] += gramos;
    });
  });

  return totales;
}

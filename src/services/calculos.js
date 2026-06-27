export function calcularDesglose(peso, ingredientes) {
  const rendimiento = ingredientes.rendimiento || 1;
  const ratio = peso / rendimiento;
  const result = {};

  for (const key in ingredientes) {
    if (key !== "rendimiento") {
      result[key] = Math.round(ingredientes[key] * ratio * 100) / 100;
    }
  }
  return result;
}

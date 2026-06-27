export let data = {};

export async function cargarRecetas() {
  try {
    const basePath = import.meta.env.BASE_URL || '/';
    const res = await fetch(`${basePath}data/recetas.json`);
    if (!res.ok) throw new Error("No se pudo cargar recetas.json");
    data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    alert("Error cargando las recetas. Revisa que exista public/data/recetas.json");
  }
}

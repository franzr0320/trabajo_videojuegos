document.addEventListener("DOMContentLoaded", async () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    console.error("No se recibió ID en la URL");
    return;
  }

  const res = await fetch(`http://localhost:3000/api/videojuegos-base/${id}`);
  const data = await res.json();

  document.getElementById("titulo-videojuego").textContent = data.titulo;
  document.getElementById("anio-videojuego").textContent = `(${data.anio})`;
  document.getElementById("imagen-videojuego").src = data.portada;
  document.getElementById("genero-videojuego").textContent = data.genero;
  document.getElementById("historia-videojuego").textContent = data.historia_principal;
  document.getElementById("descripcion-videojuego").textContent = data.descripcion;

});
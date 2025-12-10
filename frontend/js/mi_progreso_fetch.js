const userId = localStorage.getItem("userId");
const url = `http://localhost:3000/api/progreso/${userId}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("Progreso del usuario:", data);

    const contenedor = document.getElementById("contenedor-progreso");
    contenedor.innerHTML = "";

    if (!data || data.length === 0) {
      contenedor.innerHTML = "<p>No registraste ningún progreso aún.</p>";
      return;
    }

    data.forEach(item => {
      const caja = `
      <div class="box-progreso">
        <article class="media">
          <div class="media-left">
            <figure class="image is-50x50">
              <img src="${item.portada}" alt="Imagen" />                        
            </figure>
          </div>

          <div class="media-content">
            <div class="content">
              <p>
                <strong>${item.titulo}</strong> <small>(${item.anio})</small> 
                <br /> <span class="texto-carta-progreso estado">Estado: ${item.estado_actual}</span>
                <br /> <span class="texto-carta-progreso plataforma">Plataforma: ${item.plataforma}</span>
                <br /> <span class="texto-carta-progreso tiempo_jugado">Tiempo jugado: ${item.tiempo_acumulado} hs</span>
                <br /> <span class="texto-carta-progreso dificultad">Dificultad: ${item.dificultad}</span>
                <br /> <span class="texto-carta-progreso porcentaje">Avance: ${item.porcentaje}%</span>
              </p>
            </div>
          </div>
        </article>

        <div class="div-barra-progreso">
          <progress class="progress is-warning" value="${item.tiempo_acumulado}" max="${item.tiempo_demora}"></progress>
        </div>
      </div>
      `;

      contenedor.innerHTML += caja;
    });
  })
  .catch(error => {
    console.error("Error cargando progreso:", error);
    alert("No se pudo cargar el progreso del usuario.");
  });
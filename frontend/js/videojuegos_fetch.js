const videojuegosBackendURL = "http://localhost:3000/api/videojuegos-base";
const contenedor = document.querySelector(".contenedor-cajas");
const searchInput = document.querySelector("#searchBar");

let videojuegosBase = [];

fetch(videojuegosBackendURL).then(function(response) {
  return response.json();
})
  .then(function(data) {
    videojuegosBase = data; 
    renderVideojuegos(videojuegosBase);
  });

function renderVideojuegos(lista) {
  contenedor.innerHTML = ""; 

  lista.forEach(function(v) {
    const html = `
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img src="${v.portada}" alt="${v.titulo}">
            </figure>
          </div>

          <div class="media-content">
            <div class="content">
              <p>
                <strong>${v.titulo}</strong>
                <small>(${v.anio})</small><br>
                <span class="genre">Género: ${v.genero}</span><br>
                ${v.descripcion}<br><br>
                <b>Historia principal</b>
              </p>
              <span class="tag is-info is-light">
                Tiempo estimado: ${v.historia_principal} horas
              </span>
            </div>

            <div class="boton-añadir abrir-modal-añadir">
              <button class="button is-primary is-small">+ Añadir</button>
            </div>
          </div>
        </article>
      </div>
    `;

    contenedor.innerHTML += html;
  });
}

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const texto = searchInput.value.toLowerCase();

    const filtrados = videojuegosBase.filter(function(v) {
      return (
        v.titulo.toLowerCase().includes(texto) ||
        v.genero.toLowerCase().includes(texto) ||
        v.descripcion.toLowerCase().includes(texto)
      );
    });

    renderVideojuegos(filtrados);
  });
}
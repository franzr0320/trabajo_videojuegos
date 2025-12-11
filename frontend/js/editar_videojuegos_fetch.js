const usuarioID = localStorage.getItem("userId");
const misVideojuegosURL = `http://localhost:3000/api/videojuegos-usuario/${usuarioID}`;
const contenedor = document.querySelector(".contenedor-cajas");

fetch(misVideojuegosURL).then(function(response) {
  return response.json();
})
.then(function(data) {
  console.log("Mis videojuegos:", data);

  data.forEach(function(v) {
    const html = `
      <div class="box" data-id="${v.id}">
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
              <button class="button is-primary is-small">Editar</button>
            </div>

            <div class="boton-eliminar">
              <button class="button is-primary is-small">Eliminar</button>
            </div>

          </div>

        </article>
      </div>
    `;

    contenedor.innerHTML += html;
  });
})

.catch(function(err) {
  console.error("Error al cargar mis videojuegos:", err);
});


document.addEventListener("click", function (event) {
  
  if (event.target.textContent === "Editar") {


    const card = event.target.closest(".box");

    const idVideojuego = card.getAttribute("data-id");

    // abro el modal de editar
    const modalModificar = document.getElementById("modal-modificar");
    modalModificar.classList.add("is-active");

    // asigno el id al botón guardar dentro del modal
    const botonGuardar = modalModificar.querySelector(".button.is-link.requiere-login");
    botonGuardar.dataset.id = idVideojuego;

  }

  if (event.target.textContent === "Eliminar") {

    const card = event.target.closest(".box");

    const idVideojuego = card.getAttribute("data-id");

    if (!confirm("¿Seguro que quieres eliminar este videojuego?")) return;

    fetch(`http://localhost:3000/api/videojuegos-usuario/${usuarioID}/${idVideojuego}`, {
    method: "DELETE"
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
    console.log("Eliminado:", data);

    // saco la tarjeta de la página
    card.remove();
    })
    .catch(function(err) {
    console.error("Error:", err);
    });
  }
});
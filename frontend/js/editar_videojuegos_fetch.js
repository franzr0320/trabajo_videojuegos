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
  
  // si el botón dice "Editar"
  if (event.target.textContent === "Editar") {

    // agarro la tarjeta del videojuego
    const card = event.target.closest(".box");

    // saco el id del videojuego
    const idVideojuego = card.getAttribute("data-id");

    // abro el modal de editar
    const modalModificar = document.getElementById("modal-modificar");
    modalModificar.classList.add("is-active");

    // asigno el id al botón guardar dentro del modal
    const botonGuardar = modalModificar.querySelector(".button.is-link.requiere-login");
    botonGuardar.dataset.id = idVideojuego;

    // Rellenar inputs con datos actuales
    document.getElementById("edit-titulo").value =
    card.querySelector("strong").textContent;

    document.getElementById("edit-genero").value =
      card.querySelector(".genre").textContent.replace("Género: ", "");

    document.getElementById("edit-anio").value =
      card.querySelector("small").textContent.replace("(", "").replace(")", "");

    document.getElementById("edit-imagen").value =
      card.querySelector("img").getAttribute("src");

    document.getElementById("edit-historia").value =
      card.querySelector(".tag").textContent
        .replace("Tiempo estimado: ", "")
        .replace(" horas", "");
  }

  // si el botón dice "Eliminar"
  if (event.target.textContent === "Eliminar") {

    // agarro la tarjeta del videojuego
    const card = event.target.closest(".box");

    // saco el id del videojuego
    const idVideojuego = card.getAttribute("data-id");

    // confirmación simple
    if (!confirm("¿Seguro que quieres eliminar este videojuego?")) return;

    // hago el delete al backend
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
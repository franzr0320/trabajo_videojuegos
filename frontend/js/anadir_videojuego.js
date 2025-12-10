document.getElementById("anadir_videojuego-container").innerHTML = `
<div class="modal" id="modal-añadir">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">AÑADIR VIDEOJUEGO</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->                 
      <div class="field">
        <label class="label">Plataforma</label>
        <div class="control2">
          <div class="select">
            <select id="select-plataforma">
              <option>Selecciona</option>
              <option>PC</option>
              <option>PlayStation 5</option>
              <option>PlayStation 4</option>
              <option>PlayStation 3</option>
              <option>Xbox Series X/S</option>
              <option>Xbox One</option>
              <option>Nintendo Switch</option>
              <option>Nintendo Switch OLED</option>
              <option>Nintendo Wii U</option>
              <option>Nintendo Wii</option>
              <option>Steam Deck</option>
              <option>Android</option>
              <option>iOS</option>
              <option>Mac</option>
              <option>Linux</option>
              <option>Cloud Gaming (GeForce Now)</option>
              <option>Cloud Gaming (Xbox Cloud)</option>
              <option>Cloud Gaming (PlayStation Plus)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Estado Actual</label>
        <div class="control2">
          <div class="select">
            <select id="select-estado">
              <option>Selecciona</option>
              <option>Jugando</option>                                    
              <option>En pausa</option>
              <option>Abandonado</option>    
              <option>Completado</option>                            
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Tiempo acumulado Hrs</label>
        <div class="control">
          <input class="input is-success" id="input-tiempo" placeholder="Ej: 12">
        </div>
      </div>

      <div class="field">
        <label class="label">Dificultad</label>
        <div class="control2">
          <div class="select">
            <select id="select-dificultad">
              <option>Selecciona</option>
              <option>Fácil</option>
              <option>Normal</option>
              <option>Difícil</option>
              <option>Realista</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link requiere-login" id="btn-guardar" data-id="">Guardar</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" id="btn-cancelar">Cancelar</button>
        </div>
      </div>

    </section>
  </div>
</div>
`;

// MODAL AÑADIR VIDEOJUEGO //
const modalAñadir = document.getElementById("modal-añadir");
const botonCerrar = modalAñadir.querySelector(".delete");
const fondoModal = modalAñadir.querySelector(".modal-background");
const botonGuardar = document.getElementById("btn-guardar");

// ABRIR MODAL Y PASAR ID DEL VIDEOJUEGO
document.addEventListener("click", function (event) {
  const contenedor = event.target.closest(".abrir-modal-añadir");
  if (contenedor) {
    const boton = contenedor.querySelector("button");
    if (boton) {
      const idVideojuego = boton.dataset.id;
      botonGuardar.dataset.id = idVideojuego;
      modalAñadir.classList.add("is-active");
    }
  }
});

// CERRAR MODAL
botonCerrar.onclick = () => modalAñadir.classList.remove("is-active");
fondoModal.onclick = () => modalAñadir.classList.remove("is-active");
document.getElementById("btn-cancelar").onclick = () => modalAñadir.classList.remove("is-active");

botonGuardar.addEventListener("click", function () {

  const usuarioID = localStorage.getItem("userId");
  const videojuegoID = botonGuardar.dataset.id;

  const plataforma = document.getElementById("select-plataforma").value;
  const estado = document.getElementById("select-estado").value;
  const tiempo = document.getElementById("input-tiempo").value;
  const dificultad = document.getElementById("select-dificultad").value;

  const nuevoProgreso = {
    usuario_id: usuarioID, 
    videojuego_id: videojuegoID,
    tipo_videojuego: "base",
    plataforma: plataforma,
    estado_actual: estado,
    tiempo_acumulado: tiempo,
    dificultad: dificultad
  };


  fetch("http://localhost:3000/api/progreso", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoProgreso)
  })
    .then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok) {
          alert("Error: " + data.error);
          return;
        }
        console.log("Progreso añadido:", data);
        alert("Progreso añadido correctamente!");
        modalAñadir.classList.remove("is-active");
      });
    })
    .catch(function (err) {
      console.error("Error al añadir progreso:", err);
      alert("Hubo un problema al caragr el progreso.");
    });

});
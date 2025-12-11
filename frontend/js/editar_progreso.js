document.getElementById("editar-progreso-container").innerHTML = `
<div class="modal" id="modal-editar-progreso">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">EDITAR PROGRESO</p>
      <button class="delete" aria-label="close"></button>
    </header>

    <section class="modal-card-body">
      
      <div class="field">
        <label class="label">Plataforma</label>
        <div class="control2">
          <div class="select">
            <select id="edit-plataforma">
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
        <label class="label">Estado actual</label>
        <div class="control2">
          <div class="select">
            <select id="edit-estado">
              <option>Jugando</option>                                    
              <option>En pausa</option>
              <option>Abandonado</option>    
              <option>Completado</option> 
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Tiempo acumulado (horas)</label>
        <div class="control2">
          <input class="input" id="edit-tiempo">
        </div>
      </div>

      <div class="field">
        <label class="label">Dificultad</label>
        <div class="control2">
          <div class="select">
            <select id="edit-dificultad">
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
          <button id="btn-guardar-progreso" class="button is-link requiere-login">Guardar</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" id="btn-cancelar-progreso">Cancelar</button>
        </div>
      </div>

    </section>
  </div>
</div>
`;

// CERRAR MODAL
const modalProgreso = document.getElementById("modal-editar-progreso");
const cerrarModal = modalProgreso.querySelector(".delete");
const fondo = modalProgreso.querySelector(".modal-background");

cerrarModal.onclick = () => modalProgreso.classList.remove("is-active");
fondo.onclick = () => modalProgreso.classList.remove("is-active");
document.getElementById("btn-cancelar-progreso").onclick = () =>
  modalProgreso.classList.remove("is-active");

// Abrir modal
document.addEventListener("click", function (event) {
  const btn = event.target.closest(".abrir-modal-añadir");
  if (!btn) return;

  const progresoId = btn.dataset.id;
  const card = btn.closest(".box-progreso");

  document.querySelector("#edit-plataforma").value =
    card.querySelector(".plataforma").textContent.replace("Plataforma: ", "");

  document.querySelector("#edit-estado").value =
    card.querySelector(".estado").textContent.replace("Estado: ", "");

  document.querySelector("#edit-tiempo").value =
    card
      .querySelector(".tiempo_jugado")
      .textContent.replace("Tiempo jugado: ", "")
      .replace(" horas", "");

  document.querySelector("#edit-dificultad").value =
    card.querySelector(".dificultad").textContent.replace("Dificultad: ", "");

  document.querySelector("#btn-guardar-progreso").dataset.id = progresoId;

  modalProgreso.classList.add("is-active");
});


document.getElementById("btn-guardar-progreso").addEventListener("click", function () {
  const progresoId = this.dataset.id;
  const userId = localStorage.getItem("userId");

  const actualizado = {
    plataforma: document.querySelector("#edit-plataforma").value,
    estado_actual: document.querySelector("#edit-estado").value,
    tiempo_acumulado: document.querySelector("#edit-tiempo").value,
    dificultad: document.querySelector("#edit-dificultad").value
  };

  fetch(`http://localhost:3000/api/progreso/${userId}/${progresoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(actualizado)
  })
    .then(response => response.json())
    .then(data => {
      alert("¡Progreso actualizado correctamente!");
      modalProgreso.classList.remove("is-active");

      setTimeout(() => {
        location.reload();
      }, 150);
    })
    .catch(err => {
      console.error("Error al actualizar progreso:", err);
      alert("Hubo un problema al actualizar el progreso.");
    });
});
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
            <select>
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
            <select>
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
          <input class="input is-success" type="text" placeholder="Ej: 12">
        </div>
      </div>

      <div class="field">
        <label class="label">Dificultad</label>
        <div class="control2">
          <div class="select">
            <select>
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
          <button class="button is-link requiere-login">Guardar</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancelar</button>
        </div>
      </div>

    </section>
  </div>
</div>
`;

// MODAL AÑADIR VIDEOJUEGO //
const modalAñadir = document.getElementById('modal-añadir');
const botonCerrar = modalAñadir.querySelector('.delete');
const fondoModal = modalAñadir.querySelector('.modal-background');

document.addEventListener("click", function (event) {
  if (event.target.closest(".abrir-modal-añadir")) {
    modalAñadir.classList.add("is-active");
  }
});

// CERRAR MODAL //
botonCerrar.onclick = () => modalAñadir.classList.remove('is-active');
fondoModal.onclick = () => modalAñadir.classList.remove('is-active');
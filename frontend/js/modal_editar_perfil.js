document.getElementById("editar_perfil-container").innerHTML = `
<div class="modal" id="modal-editar">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">EDITAR PERFIL</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->                 
    
      <div class="field">
        <label class="label">USUARIO A EDITAR O ELIMINAR</label>
        <div class="control2">
          <div class="select">
            <select>
              <option>user1</option>
              <option>user2</option>
              <option>user3</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">NOMBRE</label>
        <div class="control">
          <input class="input is-success" type="text">
        </div>
      </div>

      <div class="field">
        <label class="label">NOMBRE DE USUARIO</label>
        <div class="control">
          <input class="input is-success" type="text">
        </div>
      </div>
    
      <div class="field">
        <label class="label">CONTRASEÑA</label>
        <div class="control">
          <input class="input is-success" type="text>
        </div>
      </div>
      
      <div class="field">
        <label class="label">EMAIL</label>
        <div class="control">
          <input class="input is-success" type="text">
        </div>
      </div>

      <div class="field">
        <label class="label">PAÍS</label>
        <div class="control">
          <input class="input is-success" type="text">
        </div>
      </div>

      <div class="field">
      <label class="label">GÉNERO</label>
        <div class="control2">
          <div class="select">
            <select>
              <option>Selecciona</option>
              <option>Hombre</option>
              <option>Mujer</option>
              <option>Prefiero no decirlo</option>
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
        <div class="control">
          <button class="button is-link requiere-login">Eliminar</button>
        </div>
      </div>

    </section>
  </div>
</div>
`;

// MODAL EDITAR/ELIMINAR PERFIL //
const modalEditar = document.getElementById('modal-editar');
const botonesAbrirEditar = document.querySelectorAll('.abrir-modal-editar');
const botonCerrarEditar = modalEditar.querySelector('.delete');
const fondoModalEditar = modalEditar.querySelector('.modal-background');

botonesAbrirEditar.forEach(boton => {
boton.onclick = () => modalEditar.classList.add('is-active');
});

botonCerrarEditar.onclick = () => modalEditar.classList.remove('is-active');
fondoModalEditar.onclick = () => modalEditar.classList.remove('is-active');
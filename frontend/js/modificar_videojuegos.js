document.getElementById("modificar_videojuego-container").innerHTML = `
<div class="modal" id="modal-modificar">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">EDITAR VIDEOJUEGO</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
      <div class="field">
        <label class="label"> Título del Videojuego</label>
        <div class="control">
          <input class="input" type="text" id="edit-titulo">
        </div>
      </div>

      <div class="field">
        <label class="label">Género</label>
        <div class="control">
          <input class="input" type="text" id="edit-genero">
        </div>
      </div>

      <div class="field">
        <label class="label">Año de lanzamiento</label>
        <div class="control">
          <input class="input" id="edit-anio">
        </div>
      </div>

      <div class="field">
        <label class="label">Breve descripción</label>
        <div class="control">
          <input class="input" id="edit-descripcion" type="text" placeholder=" máximo 107 caracteres ">
        </div>
      </div>

      <div class="field">
        <label class="label">Tiempo para completarlo</label>
        <div class="control">
          <input class="input" id="edit-tiempo"placeholder="12">
        </div>
      </div>

      <div class="field">
        <label class="label">Imagen Portada Link </label>
        <div class="control">
          <input class="input" id="edit-imagen"type="text" placeholder="https://example.com/imagen.jpg">
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button id="btn-guardar-editar" class="button is-link requiere-login">Guardar</button>        </div>
        <div class="control">
          <button class="button is-link is-light">Cancelar</button>
        </div>
      </div>

    </section>
  </div>
</div>
`;
// MODAL AÑADIR VIDEOJUEGO //
const modalModificar = document.getElementById('modal-modificar');
const botonesAbrir = document.querySelectorAll('.abrir-modal-modificar');
const botonCerrar = modalModificar.querySelector('.delete');
const fondoModal = modalModificar.querySelector('.modal-background');

botonesAbrir.forEach(boton => {
boton.onclick = () => modalModificar.classList.add('is-active');
});

botonCerrar.onclick = () => modalModificar.classList.remove('is-active');
fondoModal.onclick = () => modalModificar.classList.remove('is-active');


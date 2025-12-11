document.getElementById("anadir_videojuego_usuario-container").innerHTML = `
<div class="modal" id="modal-añadir-usuario">
  <div class="modal-background"></div>
  <div class="modal-card">

    <header class="modal-card-head">
      <p class="modal-card-title">AÑADIR PROGRESO (VIDEOJUEGO USUARIO)</p>
      <button class="delete" aria-label="close"></button>
    </header>

    <section class="modal-card-body">

      <div class="field">
        <label class="label">Plataforma</label>
        <div class="control">
          <div class="select">
            <select id="usuario-plataforma">
              <option>PC</option>
              <option>PlayStation 5</option>
              <option>PlayStation 4</option>
              <option>Xbox Series X/S</option>
              <option>Nintendo Switch</option>
              <option>iOS</option>
              <option>Android</option>
              <option>Mac</option>
              <option>Linux</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Estado</label>
        <div class="control">
          <div class="select">
            <select id="usuario-estado">
              <option>Jugando</option>
              <option>En pausa</option>
              <option>Abandonado</option>
              <option>Completado</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Tiempo acumulado (hrs)</label>
        <div class="control">
          <input class="input" id="usuario-tiempo" type="number" min="0" placeholder="Ej: 5">
        </div>
      </div>

      <div class="field">
        <label class="label">Dificultad</label>
        <div class="control">
          <div class="select">
            <select id="usuario-dificultad">
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
          <button class="button is-link" id="usuario-btn-guardar" data-id="" data-tipo="usuario">
            Guardar Progreso
          </button>
        </div>

        <div class="control">
          <button class="button is-light" id="usuario-btn-cancelar">Cancelar</button>
        </div>
      </div>

    </section>
  </div>
</div>
`;



// MODAL USUARIO
const modalUsuario = document.getElementById("modal-añadir-usuario");
const fondoModalUsuario = modalUsuario.querySelector(".modal-background");
const cerrarUsuario = modalUsuario.querySelector(".delete");
const botonGuardarUsuario = document.getElementById("usuario-btn-guardar");

// ABRIR MODAL DESDE BOTÓN +AÑADIR
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".abrir-modal-añadir-usuario");
  if (btn) {
    const idJuego = btn.dataset.id;

    botonGuardarUsuario.dataset.id = idJuego;
    botonGuardarUsuario.dataset.tipo = "usuario"; 

    modalUsuario.classList.add("is-active");
  }
});

// CERRAR MODAL
cerrarUsuario.onclick = () => modalUsuario.classList.remove("is-active");
fondoModalUsuario.onclick = () => modalUsuario.classList.remove("is-active");
document.getElementById("usuario-btn-cancelar").onclick = () =>
  modalUsuario.classList.remove("is-active");


// GUARDAR PROGRESO VIDEOJUEGO USUARIO
botonGuardarUsuario.addEventListener("click", async () => {
  const usuarioID = localStorage.getItem("userId");
  const videojuegoID = botonGuardarUsuario.dataset.id;
  const tipo = botonGuardarUsuario.dataset.tipo; // siempre "usuario"

  const plataforma = document.getElementById("usuario-plataforma").value;
  const estado = document.getElementById("usuario-estado").value;
  const tiempo = document.getElementById("usuario-tiempo").value;
  const dificultad = document.getElementById("usuario-dificultad").value;

  // Validación
  if (tiempo.trim() === "" || Number(tiempo) < 0 || !Number.isInteger(Number(tiempo))) {
    alert("Tiempo acumulado debe ser un número entero válido.");
    return;
  }

  const nuevoProgreso = {
    usuario_id: usuarioID,
    videojuego_id: videojuegoID,
    tipo_videojuego: tipo,
    plataforma,
    estado_actual: estado,
    tiempo_acumulado: tiempo,
    dificultad
  };

  try {
    const res = await fetch("http://localhost:3000/api/progreso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProgreso)
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error: " + data.error);
      return;
    }

    alert("Progreso añadido correctamente (videojuego usuario)");
    modalUsuario.classList.remove("is-active");
  } catch (err) {
    console.error(err);
    alert("Hubo un problema al añadir el progreso");
  }
});
document.getElementById("modal-container").innerHTML = `
<!-- MODAL DE REGISTRO -->
<div class="modal" id="modal-register">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">REGISTRO</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
      <div class="field">
        <label class="label">Nombre</label>
        <div class="control">
          <input class="input is-success" id="reg-nombre" type="text" placeholder="Ingrese su nombre">
        </div>
      </div>
          
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-success" id="reg-username" type="text" placeholder="Ingrese un nombre de usuario">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>
          
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-success" id="reg-email" type="email" placeholder="videogames@email.com">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Contraseña</label>
        <p class="control has-icons-left">
          <input class="input is-success" id="reg-contrasena" type="password"> placeholder="Contraseña">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
          
      <div class="field">
        <label class="label">Género</label>
        <div class="control2">
          <div class="select">
            <select id="reg-genero">
              <option>Selecciona</option>
              <option>Hombre</option>
              <option>Mujer</option>
              <option>Prefiero no decirlo</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">País</label>
        <div class="control2">
          <div class="select">
            <select id="reg-pais">>
              <option>Selecciona</option>
              <option>Argentina</option>
              <option>Brasil</option>
              <option>Chile</option>
              <option>Paraguay</option>
              <option>Perú</option>
              <option>Brasil</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="field">
        <div class="control">
          <label class="checkbox">
          <input type="checkbox">
          Acepto los  <a class="enlace" href="#">términos y condiciones</a>
          </label>
        </div>
      </div>
      
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" id="btn-registrar" >Guardar</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancelar</button>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- MODAL DE LOGIN -->
<div class="modal" id="modal-login">
<div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">IDENTIFICATE</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email o Username">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Contraseña">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
    </section>
    <!-- Content ... -->
    <footer class="modal-card-foot">
      <div class="buttons">
        <button class="button is-success" id="boton-login-modal">Iniciar Sesión</button>
      </div>
    </footer>
  </div>
</div>
`;

// Modal de LOGIN
const modalLogin = document.getElementById('modal-login');
const abrirLogin = document.getElementById('abrir-modal-login');
const cerrarLogin = modalLogin.querySelector('.delete');
const fondoLogin = modalLogin.querySelector('.modal-background');

abrirLogin.onclick = function() {
  modalLogin.classList.add('is-active');
};

cerrarLogin.onclick = function() {
  modalLogin.classList.remove('is-active');
};

fondoLogin.onclick = function() {
  modalLogin.classList.remove('is-active');
};

// Modal de REGISTRO
const modalRegister = document.getElementById('modal-register');
const abrirRegister = document.getElementById('abrir-modal-register');
const cerrarRegister = modalRegister.querySelector('.delete');
const fondoRegister = modalRegister.querySelector('.modal-background');

abrirRegister.onclick = function() {
  modalRegister.classList.add('is-active');
};

cerrarRegister.onclick = function() {
  modalRegister.classList.remove('is-active');
};

fondoRegister.onclick = function() {
  modalRegister.classList.remove('is-active');
};

// Fetch para registro

const botonRegistrar = document.getElementById("btn-registrar");

botonRegistrar.addEventListener("click", function () {
  
  const nombre = document.getElementById("reg-nombre").value;
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const contrasena = document.getElementById("reg-contrasena").value;
  const genero = document.getElementById("reg-genero").value;
  const pais = document.getElementById("reg-pais").value;

  const nuevoUsuario = {
    nombre: nombre,
    username: username,
    email: email,
    contrasena: contrasena,
    genero: genero,
    pais: pais
  };

  fetch("http://localhost:3000/api/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoUsuario)
  })
  .then(function(res) {
    if (!res.ok) {
      alert("Error al registrar usuario");
      return null;
    }
    return res.json();
  })
  .then(function(data) {

    if (!data) return;  
    
    console.log("Usuario registrado:", data);
    alert("Registro exitoso");
    modalRegister.classList.remove("is-active");
  })
  .catch(function(error) {
    console.error("Error en el servidor:", error);
    alert("Error en el servidor");
  });
});
document.getElementById("navbar-container").innerHTML = `
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item2" href="./home.html">
      <span class="has-text-weight-bold is-size-5">*NOMBRE APP*</span>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div class="field has-addons">
    <div class="control">
      <input class="input-busqueda" type="text" placeholder="Busca tu videojuego...">
    </div>
    <div class="control">
      <button class="button is-info">Buscar</button>
    </div>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">Progreso</a>
      <a class="navbar-item" href="./crear_videojuego.html">Sumá tu juego</a>
    </div>

    <div class="navbar-end">
      <a class="navbar-item" id="abrir-modal-register">Regístrate</a>
      <a class="navbar-item" id="abrir-modal-login">Iniciar sesión</a>
    </div>
  </div>
</nav>
`;
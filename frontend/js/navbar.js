let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

document.getElementById("navbar-container").innerHTML = `
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    <a class="navbar-item2" href="./home.html">
      <span class="has-text-weight-bold is-size-5">*NOMBRE APP*</span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item " href="./videojuegos.html">Videojuegos</a>
      <a class="navbar-item requiere-login">Progreso</a>
      <a class="navbar-item requiere-login" href="./crear_videojuego.html">Sumá tu juego</a>
    </div>

    <div class="navbar-end" id="navbar-auth"></div>
  </div>
</nav>
`;

// Render dinámico según si está logueado o no
function renderNavbarAuth() {
  const authDiv = document.getElementById("navbar-auth");

  if (isLoggedIn) {
    authDiv.innerHTML = `
      <a class="navbar-item" href="./perfil.html">Perfil</a>
      <a class="navbar-item" id="cerrar-sesion">Cerrar sesión</a>
    `;
  } 
  
  else {
    authDiv.innerHTML = `
      <a class="navbar-item" id="abrir-modal-register">Regístrate</a>
      <a class="navbar-item" id="abrir-modal-login">Iniciar sesión</a>
    `;
  }
}

// Hace que el botón cerrar sesión isLoggedIn = false y el botón iniciar sesión isLoggedIn = True //
document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "cerrar-sesion") {
    event.preventDefault();
    isLoggedIn = false;
    localStorage.setItem("isLoggedIn", "false");
    renderNavbarAuth();
  }

  if (event.target && event.target.id === "boton-login-modal") {
  event.preventDefault();
  isLoggedIn = true;
  localStorage.setItem("isLoggedIn", "true");
  renderNavbarAuth();
  }
});

renderNavbarAuth();

// Bloquea botones que requieren el Login //
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("requiere-login") && !isLoggedIn) {
    event.preventDefault(); 
    alert("Es necesario Iniciar sesión");
  }
});

// Menu Hamburguesa //
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.getElementById(burger.dataset.target);

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
});



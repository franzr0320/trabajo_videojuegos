const botonLogin = document.getElementById("boton-login-modal");

botonLogin.addEventListener("click", function () {

  const usuario = document.getElementById("login-user").value;
  const contrasena = document.getElementById("login-pass").value;

  const datosLogin = {
    usuario: usuario,
    contrasena: contrasena
  };

  fetch("http://localhost:3000/api/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datosLogin)
  })
  .then(function(res) {
    if (!res.ok) {
      alert("Usuario o contraseña incorrectos");
      return null;
    }
    return res.json();
  })
  .then(function(data) {

    if (!data) return;

    console.log("Sesión iniciada:", data);
    alert("Inicio de sesión exitoso");
    
    modalLogin.classList.remove("is-active");

    // Guardamos ID del usuario logueado
    localStorage.setItem("usuarioID", data.id);

    localStorage.setItem("isLoggedIn", "true");

    // Actualizamos la navbar, páginas, etc.
    location.reload();
  })
  .catch(function(error) {
    console.error("Error en el servidor:", error);
    alert("Error en el servidor");
  });
});
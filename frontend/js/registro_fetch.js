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

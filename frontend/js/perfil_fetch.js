document.addEventListener("DOMContentLoaded", async function () {

    const usuarioId = localStorage.getItem("usuario_id");
  
    if (!usuarioId) {
      console.error("No hay usuario logueado");
      return;
    }
  
    try {
  
  
      const response = await fetch(`http://localhost:3000/api/usuarios/${usuarioId}`);
      const data = await response.json();
  
      console.log("Usuario logueado:", data);
  
      document.getElementById("perfil-nombre").textContent = data.nombre;
      document.getElementById("perfil-username").textContent = data.username;

      document.getElementById("perfil-password").textContent =
        data.contrasena || data.contraseña || "";
  
      document.getElementById("perfil-email").textContent = data.email;
      document.getElementById("perfil-pais").textContent = data.pais;
      document.getElementById("perfil-genero").textContent = data.genero;
  
    } catch (error) {
      console.error("Error cargando datos del usuario:", error);
    }
  });
document.addEventListener("DOMContentLoaded", async function () {

    // 1️⃣ Obtener el ID del usuario logueado desde localStorage
    const usuarioId = localStorage.getItem("usuario_id");
  
    if (!usuarioId) {
      console.error("No hay usuario logueado");
      return;
    }
  
    try {
  
      // 2️⃣ Hacer fetch al backend para obtener los datos del usuario
      const response = await fetch(`http://localhost:3000/api/usuarios/${usuarioId}`);
      const data = await response.json();
  
      console.log("Usuario logueado:", data);
  
      // 3️⃣ Colocar los datos en el HTML
      document.getElementById("perfil-nombre").textContent = data.nombre;
      document.getElementById("perfil-username").textContent = data.username;
  
      // Manejo por si tu backend usa 'contrasena' o 'contraseña'
      document.getElementById("perfil-password").textContent =
        data.contrasena || data.contraseña || "";
  
      document.getElementById("perfil-email").textContent = data.email;
      document.getElementById("perfil-pais").textContent = data.pais;
      document.getElementById("perfil-genero").textContent = data.genero;
  
    } catch (error) {
      console.error("Error cargando datos del usuario:", error);
    }
  });
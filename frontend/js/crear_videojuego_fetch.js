const botonCrear = document.querySelector("#btnCrearVideojuego");

if (botonCrear) {
  botonCrear.addEventListener("click", function () {

    const titulo = document.querySelector("#titulo-input").value;
    const genero = document.querySelector("#genero-input").value;
    const anio = document.querySelector("#anio-input").value;
    const descripcion = document.querySelector("#descripcion-input").value;
    const portada = document.querySelector("#portada-input").value;
    const historia = document.querySelector("#historia-input").value;

    const userId = localStorage.getItem("userId");

    const nuevoVideojuego = {
      usuario_id: userId,
      titulo: titulo,
      genero: genero,
      anio: anio,
      descripcion: descripcion,
      portada: portada,
      historia_principal: historia
    };

    fetch("http://localhost:3000/api/videojuegos-usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoVideojuego)
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok) {
            alert("Error: " + data.error);
            return;
          }

          console.log("Videojuego creado:", data);
          alert("¡Videojuego añadido correctamente!");
        });
      })
      .catch(function (error) {
        console.error("Error al crear videojuego:", error);
        alert("Hubo un problema al crear el videojuego");
      });

  });
}
const botonGuardar = document.querySelector("#btn-guardar");

if (botonGuardar) {
  botonGuardar.addEventListener("click", function () {

    const userId = localStorage.getItem("userId");
    const videojuegoID = botonGuardar.dataset.id;

    const plataforma = document.querySelector("#select-plataforma").value;
    const estado = document.querySelector("#select-estado").value;
    const tiempo = document.querySelector("#input-tiempo").value;
    const dificultad = document.querySelector("#select-dificultad").value;

    const nuevoProgreso = {
      usuario_id: userId,
      videojuego_id: videojuegoID,
      tipo_videojuego: "base",
      plataforma: plataforma,
      estado_actual: estado,
      tiempo_acumulado: tiempo,
      dificultad: dificultad
    };

    fetch("http://localhost:3000/api/progreso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProgreso)
    })
      .then(function (response) {
        return response.json().then(function (data) {

          if (!response.ok) {
            alert("Error: " + data.error);
            return;
          }

          console.log("Progreso añadido:", data);
          alert("¡Progreso añadido correctamente!");

        });
      })
      .catch(function (error) {
        console.error("Error al añadir progreso:", error);
        alert("Hubo un problema al añadir el progreso");
      });

  });
}
document.getElementById("activar-edicion").addEventListener("click", function () {
    const botones = document.querySelectorAll(".boton-editar-videojuego, .boton-eliminar");

    botones.forEach((div) => {
      if (div.style.display === "none") {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    });
});
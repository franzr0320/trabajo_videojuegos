**Mi-nombre**
Una página web que muestre el avance y progreso de los juegos que tienes vinculado.
El usuario puede vincular videojuegos o eliminar juegos que haya vinculado.
El usuario administrador puede añadir o eliminar juegos.

ENTIDADES:
- USUARIO:
	id
	username
	contrasenia
	avatar
	correo
	fecha_de_creacion
	pais
	genero
- VIDEOJUEGOS:
	id
	titulo
	genero
	desarrollador (epic games, ubisoft)
	descripcion
	plataforma(playstation, xbox, pc)
	playtime (tiempo duracion para completar)
- PROGRESO:
	id
	id_user (foreign key)
	id_videojuego (foreign key)
	porcentaje_de_avance
	estado (en progreso, completado)
	dificultad (facil, dificil)

PAGINAS:
- NAVBAR:
	searchbar, iniciar sesion, registrarse, hyperlink al home.
- HOME:
	 mensaje de bienvenida, juegos mas populares del momento
- PERFIL:
	datos del usuario, boton para modificar datos, boton para eliminar usuario, que muestre los primeros 4 juegos con mas progreso del usuario. 
- VIDEOJUEGOS:
	datos del videojuego, boton para vincular/desvincular videojuego.
- PROGRESO:
	Muestra los datos del progreso de todos los juegos vinculados por el usuario
- AÑADIR VIDEOJUEGO (admin)
	añadir videojuego a la base de datos

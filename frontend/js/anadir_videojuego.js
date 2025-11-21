const modalAñadir = document.getElementById('modal-añadir');
const botonesAbrir = document.querySelectorAll('.abrir-modal-añadir');
const botonCerrar = modalAñadir.querySelector('.delete');
const fondoModal = modalAñadir.querySelector('.modal-background');

botonesAbrir.forEach(boton => {
boton.onclick = () => modalAñadir.classList.add('is-active');
});

botonCerrar.onclick = () => modalAñadir.classList.remove('is-active');
fondoModal.onclick = () => modalAñadir.classList.remove('is-active');

// Modal de LOGIN
const modalLogin = document.getElementById('modal-login');
const abrirLogin = document.getElementById('abrir-modal-login');
const cerrarLogin = modalLogin.querySelector('.delete');
const fondoLogin = modalLogin.querySelector('.modal-background');

abrirLogin.onclick = function() {
  modalLogin.classList.add('is-active');
};

cerrarLogin.onclick = function() {
  modalLogin.classList.remove('is-active');
};

fondoLogin.onclick = function() {
  modalLogin.classList.remove('is-active');
};

// Modal de REGISTRO
const modalRegister = document.getElementById('modal-register');
const abrirRegister = document.getElementById('abrir-modal-register');
const cerrarRegister = modalRegister.querySelector('.delete');
const fondoRegister = modalRegister.querySelector('.modal-background');

abrirRegister.onclick = function() {
  modalRegister.classList.add('is-active');
};

cerrarRegister.onclick = function() {
  modalRegister.classList.remove('is-active');
};

fondoRegister.onclick = function() {
  modalRegister.classList.remove('is-active');
};
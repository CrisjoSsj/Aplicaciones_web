// Usuario y contraseña hardcodeados para demo
const USUARIO_VALIDO = 'admin';
const PASSWORD_VALIDO = '1234';

document.getElementById('formLogin').addEventListener('submit', function(e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value.trim();
  const password = document.getElementById('password').value.trim();

  if(usuario === USUARIO_VALIDO && password === PASSWORD_VALIDO) {
    localStorage.setItem('usuario', usuario);
    window.location.href = 'index.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});

/*document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#loginForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = form.usuario.value.trim();
    const contraseña = form.contraseña.value.trim();

    if (!usuario) {
      alert('Ingrese su usuario');
      return;
    }
    if (!contraseña) {
      alert('Ingrese su contraseña');
      return;
    }

    // Simulación de login
    if (usuario === 'admin' && contraseña === '1234') {
      alert('Inicio de sesión exitoso');
      // Aquí redireccionar a home.html o dashboard
      window.location.href = 'home.html';
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });
});*/
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#loginForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = form.usuario.value.trim();
    const contraseña = form.contraseña.value.trim();

    if (!usuario) {
      alert('Ingrese su usuario');
      return;
    }
    if (!contraseña) {
      alert('Ingrese su contraseña');
      return;
    }

    // Validación de credenciales
    if (usuario === 'admin' && contraseña === '1234') {
      alert('Inicio de sesión exitoso');
      localStorage.setItem('usuario', usuario); // Guardar usuario
      window.location.href = 'home.html'; // Redirige a home
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const btnCerrar = document.getElementById('cerrarSesion');
    if(btnCerrar) {
      btnCerrar.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
      });
    }
  });
  
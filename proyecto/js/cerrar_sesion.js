// js/cerrar_sesion.js

function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = 'inicio_sesion.html';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const btnCerrar = document.getElementById('cerrarSesion');
    if (btnCerrar) {
      btnCerrar.addEventListener('click', function (e) {
        e.preventDefault();
        cerrarSesion();
      });
    }
  });
  
// Verificar si el usuario está autenticado
document.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario');
    if(!usuario) {
      window.location.href = 'login.html';
    }
  });
  
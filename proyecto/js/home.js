// home.js

// Función para obtener registros almacenados en localStorage
function obtenerRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  return registros;
}

// Función para contar registros ingresados hoy
function contarRegistrosHoy(registros) {
  const hoy = new Date().toISOString().slice(0, 10);
  return registros.filter(reg => reg.fecha && reg.fecha.startsWith(hoy)).length;
}

// Función para obtener alertas
function obtenerAlertas() {
  return JSON.parse(localStorage.getItem('alertas'))?.length || 0;
}

// Función para mostrar datos en la interfaz
function mostrarDatos() {
  const usuario = localStorage.getItem('usuario');

  // Si no hay sesión activa, redirige a login
  if (!usuario) {
    window.location.href = 'inicio_sesion.html';
    return;
  }

  const usuarioSpan = document.querySelector('.bienvenida span');
  const registros = obtenerRegistros();
  const totalVehiculos = registros.length;
  const registrosHoy = contarRegistrosHoy(registros);
  const alertas = obtenerAlertas();

  usuarioSpan.textContent = usuario;

  const cajas = document.querySelectorAll('.contenedor-cajas .caja p strong');
  if (cajas.length >= 3) {
    cajas[0].textContent = totalVehiculos;
    cajas[1].textContent = registrosHoy;
    cajas[2].textContent = alertas;
  }
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('usuario');
  window.location.href = 'inicio_sesion.html';
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  mostrarDatos();

  const btnCerrar = document.getElementById('cerrarSesion');
  if (btnCerrar) {
    btnCerrar.addEventListener('click', cerrarSesion);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const usuario = localStorage.getItem('usuario');
  document.getElementById('usuarioNombre').textContent = usuario;

  const vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
  const registros = JSON.parse(localStorage.getItem('entradasSalidas')) || [];

  document.getElementById('cantidadVehiculos').textContent = vehiculos.length;

  // Determinar estado de cada vehículo
  const estadoVehiculos = {};
  vehiculos.forEach(v => {
    const ultimo = [...registros].reverse().find(r => r.placa === v.placa);
    estadoVehiculos[v.placa] = (ultimo && !ultimo.fechaSalida) ? 'Adentro' : 'Afuera';
  });

  const cantidadDentro = Object.values(estadoVehiculos).filter(estado => estado === 'Adentro').length;
  const cantidadFuera = vehiculos.length - cantidadDentro;

  document.getElementById('cantidadDentro').textContent = cantidadDentro;
  document.getElementById('cantidadFuera').textContent = cantidadFuera;

  // Botón cerrar sesión
  document.getElementById('cerrarSesion').addEventListener('click', () => {
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
  });
});

export function getUsuarioActual() {
  return localStorage.getItem('usuario') || 'Usuario';
}

export function getDashboardData() {
  const vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
  const registros = JSON.parse(localStorage.getItem('entradasSalidas')) || [];
  const cantidadVehiculos = vehiculos.length;

  // Determinar estado de cada vehículo
  const estadoVehiculos = {};
  vehiculos.forEach(v => {
    const ultimo = [...registros].reverse().find(r => r.placa === v.placa);
    estadoVehiculos[v.placa] = (ultimo && !ultimo.fechaSalida) ? 'Adentro' : 'Afuera';
  });

  const cantidadDentro = Object.values(estadoVehiculos).filter(estado => estado === 'Adentro').length;
  const cantidadFuera = cantidadVehiculos - cantidadDentro;

  return {
    cantidadVehiculos,
    cantidadDentro,
    cantidadFuera
  };
}
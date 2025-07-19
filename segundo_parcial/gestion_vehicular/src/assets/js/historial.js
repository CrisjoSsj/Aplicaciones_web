// src/components/historialLogic.js

// Obtiene el historial de vehículos del localStorage.
export function obtenerHistorial() {
  const historialJSON = localStorage.getItem("vehiculos");
  return historialJSON ? JSON.parse(historialJSON) : [];
}

// Filtra el historial por placa y tipo de usuario.
export function filtrarHistorial(historial, placaFiltro, tipoUsuarioFiltro) {
  placaFiltro = placaFiltro.trim().toLowerCase();
  return historial.filter((item) => {
    const coincidePlaca = item.placa.toLowerCase().includes(placaFiltro);
    const coincideTipoUsuario =
      tipoUsuarioFiltro === "" || item.tipoUsuario === tipoUsuarioFiltro;
    return coincidePlaca && coincideTipoUsuario;
  });
}
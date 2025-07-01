// Obtener datos del localStorage o devolver arreglo vacío
function obtenerHistorial() {
  const historialJSON = localStorage.getItem('vehiculos');
  return historialJSON ? JSON.parse(historialJSON) : [];
}

// Guardar datos en localStorage
function guardarHistorial(historial) {
  localStorage.setItem('vehiculos', JSON.stringify(historial));
}

// Referencias a DOM
const tablaBody = document.querySelector('#tablaHistorial tbody');
const inputBuscarPlaca = document.getElementById('buscarPlaca');
const selectTipoUsuario = document.getElementById('filtrarTipoUsuario');

// Función para mostrar la tabla
function mostrarTabla(datos) {
  tablaBody.innerHTML = '';

  if (datos.length === 0) {
    tablaBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No se encontraron registros.</td></tr>`;
    return;
  }

  datos.forEach(item => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${item.placa}</td>
      <td>${item.nombre}</td>
      <td>${item.tipoUsuario}</td>
      <td>${item.tipoVehiculo}</td>
      <td>${item.marca}</td>
    `;
    tablaBody.appendChild(fila);
  });
}

// Filtrar datos según inputs
function filtrarDatos() {
  const historial = obtenerHistorial();
  const placaFiltro = inputBuscarPlaca.value.trim().toLowerCase();
  const tipoUsuarioFiltro = selectTipoUsuario.value;

  const datosFiltrados = historial.filter(item => {
    const coincidePlaca = item.placa.toLowerCase().includes(placaFiltro);
    const coincideTipoUsuario = tipoUsuarioFiltro === '' || item.tipoUsuario === tipoUsuarioFiltro;
    return coincidePlaca && coincideTipoUsuario;
  });

  mostrarTabla(datosFiltrados);
}

// Eventos para filtro dinámico
inputBuscarPlaca.addEventListener('input', filtrarDatos);
selectTipoUsuario.addEventListener('change', filtrarDatos);

// Al cargar la página, mostrar datos (si no hay, muestra vacío)
document.addEventListener('DOMContentLoaded', () => {
  filtrarDatos();
});

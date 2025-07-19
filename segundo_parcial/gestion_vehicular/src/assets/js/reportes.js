import * as XLSX from 'xlsx';

export function obtenerDatos() {
  const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
  const registros = JSON.parse(localStorage.getItem("entradasSalidas")) || [];

  return registros.map(registro => {
    const vehiculo = vehiculos.find(v => v.placa === registro.placa) || {};
    return {
      placa: registro.placa,
      marca: vehiculo.marca || "",
      nombre: vehiculo.nombre || "",
      tipoUsuario: vehiculo.tipoUsuario || "",
      tipoVehiculo: vehiculo.tipoVehiculo || "",
      fechaEntrada: registro.fechaEntrada,
      fechaSalida: registro.fechaSalida
    };
  });
}

export function filtrarDatos({ tipoUsuario, tipoVehiculo, estado, fechaInicio, fechaFin }) {
  const datos = obtenerDatos();

  return datos.filter(item => {
    const matchUsuario = tipoUsuario === "todos" || item.tipoUsuario === tipoUsuario;
    const matchVehiculo = tipoVehiculo === "todos" || item.tipoVehiculo === tipoVehiculo;

    const entradaDate = item.fechaEntrada ? new Date(item.fechaEntrada) : null;

    let matchEstado = true;
    if (estado === "dentro") {
      matchEstado = item.fechaSalida === null;
    } else if (estado === "fuera") {
      matchEstado = item.fechaSalida !== null;
    }

    let matchFecha = true;
    if (fechaInicio && fechaFin && entradaDate) {
      const desde = new Date(fechaInicio);
      const hasta = new Date(fechaFin);
      matchFecha = entradaDate >= desde && entradaDate <= hasta;
    }

    return matchUsuario && matchVehiculo && matchEstado && matchFecha;
  });
}

export function crearTablaHTML(datos) {
  if (datos.length === 0) {
    return '<p>No se encontraron registros con esos filtros.</p>';
  }

  let html = `<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
    <thead style="background-color: #004080; color: white;">
      <tr>
        <th>Placa</th>
        <th>Marca</th>
        <th>Dueño</th>
        <th>Tipo Usuario</th>
        <th>Tipo Vehículo</th>
        <th>Fecha Entrada</th>
        <th>Fecha Salida</th>
      </tr>
    </thead>
    <tbody>`;

  datos.forEach(item => {
    html += `<tr>
      <td>${item.placa}</td>
      <td>${item.marca}</td>
      <td>${item.nombre}</td>
      <td>${item.tipoUsuario}</td>
      <td>${item.tipoVehiculo}</td>
      <td>${item.fechaEntrada || "---"}</td>
      <td>${item.fechaSalida || "---"}</td>
    </tr>`;
  });

  html += '</tbody></table>';
  return html;
}

export function exportarExcel(datos) {
  if (datos.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }
  const ws = XLSX.utils.json_to_sheet(datos);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reporte");
  XLSX.writeFile(wb, "reporte_vehiculos.xlsx");
}
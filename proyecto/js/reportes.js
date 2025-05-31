// Obtener todos los registros guardados
function obtenerRegistros() {
    var registros = localStorage.getItem('registros');
    if (registros) {
      return JSON.parse(registros);
    } else {
      return [];
    }
  }
  
  // Filtrar registros por fecha desde, fecha hasta, tipo de vehículo y tipo de usuario
  function filtrarRegistros(registros, fechaDesde, fechaHasta, tipoVehiculo, tipoUsuario) {
    var resultado = [];
  
    for (var i = 0; i < registros.length; i++) {
      var reg = registros[i];
  
      var fechaRegistro = reg.fecha ? reg.fecha.split('T')[0] : '';
      
      var dentroRangoFecha = true;
      if (fechaDesde !== '' && fechaRegistro < fechaDesde) {
        dentroRangoFecha = false;
      }
      if (fechaHasta !== '' && fechaRegistro > fechaHasta) {
        dentroRangoFecha = false;
      }
  
      var coincideTipoVehiculo = (tipoVehiculo === 'todos') || (reg.tipo_vehiculo && reg.tipo_vehiculo.toLowerCase() === tipoVehiculo.toLowerCase());
      var coincideTipoUsuario = (tipoUsuario === 'todos') || (reg.tipo_usuario && reg.tipo_usuario.toLowerCase() === tipoUsuario.toLowerCase());
  
      if (dentroRangoFecha && coincideTipoVehiculo && coincideTipoUsuario) {
        resultado.push(reg);
      }
    }
  
    return resultado;
  }
  
  // Mostrar resultados en una tabla simple
  function mostrarResultados(registros) {
    var contenedor = document.querySelector('.resultado-reportes');
    contenedor.innerHTML = '';
  
    if (registros.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center; color:#666;">No se encontraron registros.</p>';
      return;
    }
  
    var tabla = document.createElement('table');
    tabla.border = '1';
    var encabezado = document.createElement('tr');
    encabezado.innerHTML = '<th>Nombre</th><th>Placa</th><th>Fecha</th><th>Tipo Vehículo</th><th>Tipo Usuario</th>';
    tabla.appendChild(encabezado);
  
    for (var i = 0; i < registros.length; i++) {
      var fila = document.createElement('tr');
      var r = registros[i];
  
      var fechaFormateada = formatearFecha(r.fecha);
  
      fila.innerHTML = '<td>' + (r.nombre || 'Desconocido') + '</td>' +
                       '<td>' + r.placa + '</td>' +
                       '<td>' + fechaFormateada + '</td>' +
                       '<td>' + r.tipo_vehiculo + '</td>' +
                       '<td>' + (r.tipo_usuario || 'Desconocido') + '</td>';
  
      tabla.appendChild(fila);
    }
  
    contenedor.appendChild(tabla);
  }
  
  // Función simple para formatear fecha DD/MM/AAAA
  function formatearFecha(fechaISO) {
    if (!fechaISO) return 'Sin fecha';
  
    var partes = fechaISO.split('T')[0].split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }
  
  // Al enviar el formulario de filtros
  function aplicarFiltros() {
    var fechaDesde = document.getElementById('fecha_desde').value;
    var fechaHasta = document.getElementById('fecha_hasta').value;
    var tipoVehiculo = document.getElementById('tipo_vehiculo').value;
    var tipoUsuario = document.getElementById('tipo_usuario').value;
  
    var registros = obtenerRegistros();
    var filtrados = filtrarRegistros(registros, fechaDesde, fechaHasta, tipoVehiculo, tipoUsuario);
    mostrarResultados(filtrados);
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    mostrarResultados(obtenerRegistros());
  
    document.querySelector('.filtros').addEventListener('submit', function (e) {
      e.preventDefault();
      aplicarFiltros();
    });
  });
  
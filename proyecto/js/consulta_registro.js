// Obtener los registros guardados en localStorage
function obtenerRegistros() {
    var registros = localStorage.getItem('registros');
    if (registros) {
      return JSON.parse(registros);
    } else {
      return [];
    }
  }
  
  // Filtrar registros por placa, fecha y tipo
  function filtrarRegistros(registros, placa, fecha, tipo_vehiculo) {
    var resultado = [];
  
    for (var i = 0; i < registros.length; i++) {
      var registro = registros[i];
  
      var coincidePlaca = placa === '' || registro.placa.toLowerCase().indexOf(placa.toLowerCase()) !== -1;
      var coincideFecha = fecha === '' || (registro.fecha && registro.fecha.indexOf(fecha) === 0);
      var coincideTipo = tipo_vehiculo === 'todos' || (registro.tipo_vehiculo && registro.tipo_vehiculo.toLowerCase() === tipo.toLowerCase());
  
      if (coincidePlaca && coincideFecha && coincideTipo) {
        resultado.push(registro);
      }
    }
  
    return resultado;
  }
  
  // Mostrar resultados en la tabla
  function mostrarResultados(registros) {
    var cuerpoTabla = document.querySelector('tbody');
    cuerpoTabla.innerHTML = '';
  
    if (registros.length === 0) {
      var fila = document.createElement('tr');
      fila.innerHTML = '<td colspan="5">No se encontraron registros.</td>';
      cuerpoTabla.appendChild(fila);
      return;
    }
  
    for (var i = 0; i < registros.length; i++) {
      var registro = registros[i];
      var fila = document.createElement('tr');
  
      var nombre = registro.nombre ? registro.nombre : 'Desconocido';
      var fechaFormateada = formatearFecha(registro.fecha);
  
      fila.innerHTML = 
        '<td>' + nombre + '</td>' +
        '<td>' + registro.placa + '</td>' +
        '<td>' + fechaFormateada + '</td>' +
        '<td>' + registro.tipo_vehiculo + '</td>' +
        '<td><button onclick="verDetalles(\'' + registro.placa + '\')">Ver</button></td>';
  
      cuerpoTabla.appendChild(fila);
    }
  }
  
  // Cambiar formato de fecha a DD/MM/AAAA
  function formatearFecha(fechaISO) {
    if (!fechaISO) {
      return 'Sin fecha';
    }
  
    var partes = fechaISO.split('T')[0].split('-');
    var año = partes[0];
    var mes = partes[1];
    var dia = partes[2];
  
    return dia + '/' + mes + '/' + año;
  }
  
  // Mostrar detalles al hacer clic
  function verDetalles(placa) {
    alert('Detalles del vehículo con placa: ' + placa);
  }
  
  // Filtrar y mostrar registros cuando cambian los filtros o se envía el formulario
  function aplicarFiltros() {
    var placa = document.getElementById('placa').value;
    var fecha = document.getElementById('fecha').value;
    var tipo = document.getElementById('tipo_usuario').value;
  
    var registros = obtenerRegistros();
    var filtrados = filtrarRegistros(registros, placa, fecha, tipo);
    mostrarResultados(filtrados);
  }
  
  // Código que se ejecuta cuando la página carga
  document.addEventListener('DOMContentLoaded', function () {
    mostrarResultados(obtenerRegistros());
  
    document.getElementById('placa').addEventListener('input', aplicarFiltros);
    document.getElementById('fecha').addEventListener('change', aplicarFiltros);
    document.getElementById('tipo_usuario').addEventListener('change', aplicarFiltros);
  
    var formulario = document.querySelector('.filtros');
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();
      aplicarFiltros();
    });
  });
  
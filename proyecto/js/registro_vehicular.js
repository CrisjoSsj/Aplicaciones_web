// js/registro_vehicular.js

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.form-registro');
  
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Obtener valores del formulario
      const nombre = document.getElementById('nombre').value.trim();
      const cedula = document.getElementById('cedula').value.trim();
      const tipo_usuario = document.getElementById('tipo_usuario').value;
      const placa = document.getElementById('placa').value.trim().toUpperCase();
      const tipo_vehiculo = document.getElementById('tipo_vehiculo').value;
      const fecha_hora = document.getElementById('fecha_hora').value;
      const observaciones = document.getElementById('observaciones').value.trim();
  
      // Validaciones adicionales (opcionales)
      if (!nombre || !cedula || !tipo_usuario || !placa || !tipo_vehiculo || !fecha_hora) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
      }
  
      if (!/^\d{10}$/.test(cedula)) {
        alert('La cédula debe tener 10 dígitos.');
        return;
      }
  
      // Crear el registro
      const registro = {
        nombre,
        cedula,
        tipo_usuario,
        placa,
        tipo_vehiculo,
        fecha: fecha_hora,
        observaciones
      };
  
      // Guardar en localStorage
      const registros = JSON.parse(localStorage.getItem('registros')) || [];
      registros.push(registro);
      localStorage.setItem('registros', JSON.stringify(registros));
  
      alert('Ingreso registrado exitosamente.');
      formulario.reset();
    });
  });
  
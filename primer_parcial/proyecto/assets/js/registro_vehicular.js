document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRegistroVehiculo");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const vehiculo = {
        nombre: form.nombre.value.trim(),
        cedula: form.cedula.value.trim(),
        placa: form.placa.value.trim().toUpperCase(),
        marca: form.marca.value.trim(),
        color: form.color.value.trim(),
        tipoUsuario: form.tipoUsuario.value,
        tipoVehiculo: form.tipoVehiculo.value
      };
  
      if (!validarCedula(vehiculo.cedula)) {
        alert("Cédula inválida.");
        return;
      }
  
      if (vehiculo.placa.length < 6) {
        alert("La placa debe tener al menos 6 caracteres.");
        return;
      }
  
      const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
  
      if (vehiculos.find(v => v.placa === vehiculo.placa)) {
        alert("Ya existe un vehículo registrado con esa placa.");
        return;
      }
  
      vehiculos.push(vehiculo);
      localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
      alert("Vehículo registrado correctamente.");
      form.reset();
    });
  
    function validarCedula(cedula) {
      if (!/^\d{10}$/.test(cedula)) return false;
  
      const digitos = cedula.split("").map(Number);
      const provincia = parseInt(cedula.substring(0, 2));
      if (provincia < 1 || provincia > 24) return false;
  
      const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
      let suma = 0;
  
      for (let i = 0; i < 9; i++) {
        let valor = digitos[i] * coeficientes[i];
        if (valor > 9) valor -= 9;
        suma += valor;
      }
  
      const digitoVerificador = (10 - (suma % 10)) % 10;
      return digitoVerificador === digitos[9];
    }
  });
  
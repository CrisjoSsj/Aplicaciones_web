document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistroVehiculo");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const placa = document.getElementById("placa").value.trim().toUpperCase();
    const marca = document.getElementById("marca").value.trim();
    const color = document.getElementById("color").value.trim();
    const tipoUsuario = document.getElementById("tipoUsuario").value;
    const tipoVehiculo = document.getElementById("tipoVehiculo").value;

    // Validaciones básicas de campos vacíos y longitudes
    if (!nombre || nombre.length < 3) {
      alert("El nombre del propietario es obligatorio y debe ser valido.");
      return;
    }

    if (!validarCedula(cedula)) {
      alert("La cédula no es válida. Debe tener 10 dígitos y ser un número válido en Ecuador.");
      return;
    }

    if (!validarPlaca(placa)) {
      alert("La placa no es válida (ejemplo: ABC1234).");
      return;
    }

    if (!marca || marca.length < 3) {
      alert("La marca es obligatoria.");
      return;
    }

    if (!color || color.length < 3) {
      alert("El color es obligatorio .");
      return;
    }

    if (!tipoUsuario) {
      alert("Seleccione un tipo de usuario.");
      return;
    }

    if (!tipoVehiculo) {
      alert("Seleccione un tipo de vehículo.");
      return;
    }

    alert("✅ Vehículo registrado correctamente.");
  });

  // Validación básica para cédula ecuatoriana
  function validarCedula(ced) {
    if (!/^\d{10}$/.test(ced)) return false;

    const digitos = ced.split("").map(Number);
    const provincia = parseInt(ced.substring(0, 2));
    if (provincia < 1 || provincia > 24) return false;

    let suma = 0;
    for (let i = 0; i < 9; i++) {
      let val = digitos[i];
      if (i % 2 === 0) {
        val *= 2;
        if (val > 9) val -= 9;
      }
      suma += val;
    }
    const lastDigit = (10 - (suma % 10)) % 10;
    return lastDigit === digitos[9];
  }

  // Validar placa: 3 letras + 3 o 4 números
  function validarPlaca(placa) {
    return /^[A-Z]{3}\d{3,4}$/.test(placa);
  }
});

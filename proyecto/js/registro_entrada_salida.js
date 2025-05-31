document.addEventListener("DOMContentLoaded", () => {
  const buscarBtn = document.getElementById("buscarBtn");
  const placaInput = document.getElementById("placa");
  const infoVehiculoDiv = document.getElementById("infoVehiculo");
  const nombreSpan = document.getElementById("nombreVehiculo");
  const placaSpan = document.getElementById("placaVehiculo");
  const tipoRegistroSelect = document.getElementById("tipoRegistro");
  const registrarBtn = infoVehiculoDiv.querySelector("button");

  let vehiculoEncontrado = null;

  buscarBtn.addEventListener("click", () => {
    const placa = placaInput.value.trim().toUpperCase();
    if (placa === "") {
      alert("Por favor ingrese la placa.");
      return;
    }

    const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
    const vehiculo = vehiculos.find(v => v.placa.toUpperCase() === placa);

    if (vehiculo) {
      vehiculoEncontrado = vehiculo;
      nombreSpan.textContent = vehiculo.nombre;
      placaSpan.textContent = vehiculo.placa;
      infoVehiculoDiv.style.display = "block";

      const registros = JSON.parse(localStorage.getItem("entradasSalidas")) || [];

      // Buscar el último registro sin fechaSalida
      const ultimoRegistroSinSalida = [...registros].reverse().find(r => r.placa.toUpperCase() === placa && r.fechaSalida === null);

      if (ultimoRegistroSinSalida) {
        // Está dentro, solo permitir registrar salida
        tipoRegistroSelect.innerHTML = `<option value="salida">Salida</option>`;
        tipoRegistroSelect.value = "salida";
      } else {
        // No está dentro, permitir registrar entrada
        tipoRegistroSelect.innerHTML = `<option value="entrada">Entrada</option>`;
        tipoRegistroSelect.value = "entrada";
      }
    } else {
      alert("Vehículo no encontrado. Por favor registre primero el vehículo.");
      infoVehiculoDiv.style.display = "none";
      vehiculoEncontrado = null;
    }
  });

  registrarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const tipo = tipoRegistroSelect.value;
    if (!vehiculoEncontrado || tipo === "") {
      alert("Debe seleccionar un tipo de registro.");
      return;
    }

    const registros = JSON.parse(localStorage.getItem("entradasSalidas")) || [];
    const placa = vehiculoEncontrado.placa.toUpperCase();

    if (tipo === "entrada") {
      // Validar que no hay entrada sin salida previa
      const existeEntradaSinSalida = registros.some(r => r.placa.toUpperCase() === placa && r.fechaSalida === null);
      if (existeEntradaSinSalida) {
        alert("Este vehículo ya está dentro. Debe registrar salida antes de una nueva entrada.");
        return;
      }

      // Crear nuevo registro con entrada y salida null
      const nuevoRegistro = {
        nombre: vehiculoEncontrado.nombre,
        placa: vehiculoEncontrado.placa,
        fechaEntrada: new Date().toLocaleString(),
        fechaSalida: null
      };

      registros.push(nuevoRegistro);
      localStorage.setItem("entradasSalidas", JSON.stringify(registros));
      alert("Registro de ENTRADA exitoso.");
    } else if (tipo === "salida") {
      // Buscar último registro sin salida para actualizar
      const indexRegistro = registros.findIndex(r => r.placa.toUpperCase() === placa && r.fechaSalida === null);
      if (indexRegistro === -1) {
        alert("No se encontró una entrada pendiente para registrar la salida.");
        return;
      }

      registros[indexRegistro].fechaSalida = new Date().toLocaleString();
      localStorage.setItem("entradasSalidas", JSON.stringify(registros));
      alert("Registro de SALIDA exitoso.");
    }

    // Limpiar formulario
    tipoRegistroSelect.value = "";
    placaInput.value = "";
    infoVehiculoDiv.style.display = "none";
    vehiculoEncontrado = null;
  });
});

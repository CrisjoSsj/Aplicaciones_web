// src/components/registroVehicularLogic.js

export function validarCedula(cedula) {
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

export function registrarVehiculo(vehiculo) {
  if (!validarCedula(vehiculo.cedula)) {
    return { ok: false, mensaje: "Cédula inválida." };
  }

  if (vehiculo.placa.length < 6) {
    return { ok: false, mensaje: "La placa debe tener al menos 6 caracteres." };
  }

  const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

  if (vehiculos.find(v => v.placa === vehiculo.placa)) {
    return { ok: false, mensaje: "Ya existe un vehículo registrado con esa placa." };
  }

  vehiculos.push(vehiculo);
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
  return { ok: true, mensaje: "Vehículo registrado correctamente." };
}
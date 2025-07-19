// src/components/registroEntradaLogic.js

export function buscarVehiculoPorPlaca(placa) {
  const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
  return vehiculos.find(v => v.placa.toUpperCase() === placa) || null;
}

export function getTipoRegistroPermitido(placa) {
  const registros = JSON.parse(localStorage.getItem("entradasSalidas")) || [];
  // Buscar el último registro sin fechaSalida
  const ultimoRegistroSinSalida = [...registros].reverse().find(
    r => r.placa.toUpperCase() === placa.toUpperCase() && r.fechaSalida === null
  );
  if (ultimoRegistroSinSalida) {
    // Está dentro, solo permitir registrar salida
    return 'salida';
  } else {
    // No está dentro, permitir registrar entrada
    return 'entrada';
  }
}

export function registrarEntradaSalida(vehiculo, tipo) {
  const registros = JSON.parse(localStorage.getItem("entradasSalidas")) || [];
  const placa = vehiculo.placa.toUpperCase();

  if (tipo === "entrada") {
    // Validar que no hay entrada sin salida previa
    const existeEntradaSinSalida = registros.some(
      r => r.placa.toUpperCase() === placa && r.fechaSalida === null
    );
    if (existeEntradaSinSalida) {
      return { ok: false, mensaje: "Este vehículo ya está dentro. Debe registrar salida antes de una nueva entrada." };
    }

    // Crear nuevo registro con entrada y salida null
    const nuevoRegistro = {
      nombre: vehiculo.nombre,
      placa: vehiculo.placa,
      fechaEntrada: new Date().toLocaleString(),
      fechaSalida: null
    };

    registros.push(nuevoRegistro);
    localStorage.setItem("entradasSalidas", JSON.stringify(registros));
    return { ok: true, mensaje: "Registro de ENTRADA exitoso." };
  } else if (tipo === "salida") {
    // Buscar último registro sin salida para actualizar
    const indexRegistro = registros.findIndex(
      r => r.placa.toUpperCase() === placa && r.fechaSalida === null
    );
    if (indexRegistro === -1) {
      return { ok: false, mensaje: "No se encontró una entrada pendiente para registrar la salida." };
    }

    registros[indexRegistro].fechaSalida = new Date().toLocaleString();
    localStorage.setItem("entradasSalidas", JSON.stringify(registros));
    return { ok: true, mensaje: "Registro de SALIDA exitoso." };
  }
  return { ok: false, mensaje: "Tipo de registro inválido." };
}
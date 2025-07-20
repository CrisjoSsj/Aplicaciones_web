import React, { useState } from 'react';
import '../assets/css/registro.css';
import NavMenu from './NavMenu';

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

function RegistroVehicular() {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    placa: '',
    marca: '',
    color: '',
    tipoUsuario: '',
    tipoVehiculo: '',
  });

  const [errors, setErrors] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }

    if (!formData.cedula.trim()) {
      nuevosErrores.cedula = 'La cédula es requerida';
    } else if (!validarCedula(formData.cedula)) {
      nuevosErrores.cedula = 'Cédula inválida';
    }

    if (!formData.placa.trim()) {
      nuevosErrores.placa = 'La placa es requerida';
    } else if (formData.placa.length < 6) {
      nuevosErrores.placa = 'La placa debe tener al menos 6 caracteres';
    }

    if (!formData.marca.trim()) {
      nuevosErrores.marca = 'La marca es requerida';
    }

    if (!formData.color.trim()) {
      nuevosErrores.color = 'El color es requerido';
    }

    if (!formData.tipoUsuario) {
      nuevosErrores.tipoUsuario = 'Seleccione el tipo de usuario';
    }

    if (!formData.tipoVehiculo) {
      nuevosErrores.tipoVehiculo = 'Seleccione el tipo de vehículo';
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const vehiculo = {
      nombre: formData.nombre.trim(),
      cedula: formData.cedula.trim(),
      placa: formData.placa.trim().toUpperCase(),
      marca: formData.marca.trim(),
      color: formData.color.trim(),
      tipoUsuario: formData.tipoUsuario,
      tipoVehiculo: formData.tipoVehiculo,
      fechaRegistro: new Date().toISOString()
    };

    const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

    if (vehiculos.find(v => v.placa === vehiculo.placa)) {
      setErrors({ placa: 'Ya existe un vehículo registrado con esa placa' });
      return;
    }

    vehiculos.push(vehiculo);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    
    // Mostrar mensaje de éxito
    alert("Vehículo registrado correctamente.");

    // Limpiar formulario
    setFormData({
      nombre: '',
      cedula: '',
      placa: '',
      marca: '',
      color: '',
      tipoUsuario: '',
      tipoVehiculo: '',
    });
    setErrors({});
  };

  return (
    <div className="registro-container">
      <NavMenu currentPage="registro-vehicular" />

      <main>
        <h2>Registro de Vehículo Nuevo</h2>
        
        <div className="form-container">
          <form onSubmit={manejarSubmit} autoComplete="off">
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="nombre" className="required">Nombre del propietario</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={manejarCambio}
                  className={errors.nombre ? 'invalid' : ''}
                  placeholder="Ingrese el nombre completo"
                />
                {errors.nombre && <div className="error-message">{errors.nombre}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="cedula" className="required">Cédula</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  value={formData.cedula}
                  onChange={manejarCambio}
                  className={errors.cedula ? 'invalid' : ''}
                  placeholder="Ingrese la cédula (10 dígitos)"
                  maxLength="10"
                />
                {errors.cedula && <div className="error-message">{errors.cedula}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="placa" className="required">Placa del vehículo</label>
                <input
                  type="text"
                  id="placa"
                  name="placa"
                  value={formData.placa}
                  onChange={manejarCambio}
                  className={errors.placa ? 'invalid' : ''}
                  placeholder="Ingrese la placa"
                />
                {errors.placa && <div className="error-message">{errors.placa}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="marca" className="required">Marca</label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={manejarCambio}
                  className={errors.marca ? 'invalid' : ''}
                  placeholder="Ingrese la marca"
                />
                {errors.marca && <div className="error-message">{errors.marca}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="color" className="required">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={manejarCambio}
                  className={errors.color ? 'invalid' : ''}
                  placeholder="Ingrese el color"
                />
                {errors.color && <div className="error-message">{errors.color}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="tipoUsuario" className="required">Tipo de Usuario</label>
                <select
                  id="tipoUsuario"
                  name="tipoUsuario"
                  value={formData.tipoUsuario}
                  onChange={manejarCambio}
                  className={errors.tipoUsuario ? 'invalid' : ''}
                >
                  <option value="">Seleccione el tipo de usuario</option>
                  <option value="Docente">Docente</option>
                  <option value="Administrativo">Administración</option>
                  <option value="Estudiante">Estudiante</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.tipoUsuario && <div className="error-message">{errors.tipoUsuario}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="tipoVehiculo" className="required">Tipo de Vehículo</label>
                <select
                  id="tipoVehiculo"
                  name="tipoVehiculo"
                  value={formData.tipoVehiculo}
                  onChange={manejarCambio}
                  className={errors.tipoVehiculo ? 'invalid' : ''}
                >
                  <option value="">Seleccione el tipo de vehículo</option>
                  <option value="Carro">Carro</option>
                  <option value="Moto">Moto</option>
                  <option value="Camion">Camión</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.tipoVehiculo && <div className="error-message">{errors.tipoVehiculo}</div>}
              </div>
            </div>

            <button type="submit">Registrar Vehículo</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default RegistroVehicular;
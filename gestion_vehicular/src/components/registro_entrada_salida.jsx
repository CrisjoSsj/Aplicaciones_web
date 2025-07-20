import React, { useState } from 'react';
import '../assets/css/entrada_salida.css';
import { buscarVehiculoPorPlaca, getTipoRegistroPermitido, registrarEntradaSalida } from '../assets/js/registro_entrada_salida';
import NavMenu from './NavMenu';

function RegistroEntrada() {
  const [placa, setPlaca] = useState('');
  const [vehiculoEncontrado, setVehiculoEncontrado] = useState(null);
  const [tipoRegistro, setTipoRegistro] = useState('');
  const [selectOpciones, setSelectOpciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const buscarVehiculo = () => {
    if (!placa.trim()) {
      setErrors({ placa: 'Ingrese una placa para buscar' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simular búsqueda
    setTimeout(() => {
      const vehiculo = buscarVehiculoPorPlaca(placa.trim().toUpperCase());
      if (vehiculo) {
        setVehiculoEncontrado(vehiculo);
        const tipo = getTipoRegistroPermitido(vehiculo.placa);
        setTipoRegistro(tipo);
        setSelectOpciones(tipo === 'entrada'
          ? [{ value: 'entrada', label: 'Entrada' }]
          : [{ value: 'salida', label: 'Salida' }]
        );
      } else {
        setErrors({ general: 'Vehículo no encontrado. Por favor registre primero el vehículo.' });
        setVehiculoEncontrado(null);
        setTipoRegistro('');
        setSelectOpciones([]);
      }
      setIsLoading(false);
    }, 500);
  };

  const manejarRegistro = (e) => {
    e.preventDefault();
    if (!vehiculoEncontrado || !tipoRegistro) {
      setErrors({ tipoRegistro: 'Debe seleccionar un tipo de registro.' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simular registro
    setTimeout(() => {
      const resultado = registrarEntradaSalida(vehiculoEncontrado, tipoRegistro);
      
      if (resultado.ok) {
        alert(resultado.mensaje);
        setVehiculoEncontrado(null);
        setTipoRegistro('');
        setSelectOpciones([]);
        setPlaca('');
      } else {
        setErrors({ general: resultado.mensaje });
      }
      setIsLoading(false);
    }, 500);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'placa') {
      setPlaca(value);
    } else if (name === 'tipoRegistro') {
      setTipoRegistro(value);
    }
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name] || errors.general) {
      setErrors({});
    }
  };

  return (
    <div className="entrada-salida-container">
      <NavMenu currentPage="registro-entrada-salida" />

      <main>
        <h2>Registrar Entrada o Salida de Vehículo</h2>

        <div className="form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-field">
              <label htmlFor="placa" className="required">Placa del vehículo</label>
              <input
                type="text"
                id="placa"
                name="placa"
                placeholder="Ingrese la placa del vehículo"
                value={placa}
                onChange={manejarCambio}
                className={errors.placa ? 'invalid' : ''}
                required
                disabled={isLoading}
              />
              {errors.placa && <div className="error-message">{errors.placa}</div>}
            </div>

            <button 
              type="button" 
              onClick={buscarVehiculo}
              disabled={isLoading || !placa.trim()}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? 'Buscando...' : 'Buscar Vehículo'}
            </button>
          </form>

          {errors.general && (
            <div className="error-message" style={{ marginTop: '1rem', textAlign: 'center' }}>
              {errors.general}
            </div>
          )}

          {vehiculoEncontrado && (
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <h3>Información del Vehículo</h3>
              
              <div style={{ 
                background: 'var(--secondary-color)', 
                padding: '1.5rem', 
                borderRadius: '8px',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-color)'
              }}>
                <p style={{ color: 'white' }}><strong>Nombre:</strong> <span>{vehiculoEncontrado.nombre}</span></p>
                <p style={{ color: 'white' }}><strong>Placa:</strong> <span>{vehiculoEncontrado.placa}</span></p>
                <p style={{ color: 'white' }}><strong>Marca:</strong> <span>{vehiculoEncontrado.marca}</span></p>
                <p style={{ color: 'white' }}><strong>Color:</strong> <span>{vehiculoEncontrado.color}</span></p>
                <p style={{ color: 'white' }}><strong>Tipo de Usuario:</strong> <span>{vehiculoEncontrado.tipoUsuario}</span></p>
                <p style={{ color: 'white' }}><strong>Tipo de Vehículo:</strong> <span>{vehiculoEncontrado.tipoVehiculo}</span></p>
              </div>

              <form onSubmit={manejarRegistro}>
                <div className="form-field">
                  <label htmlFor="tipoRegistro" className="required">Tipo de Registro</label>
                  <select
                    id="tipoRegistro"
                    name="tipoRegistro"
                    value={tipoRegistro}
                    onChange={manejarCambio}
                    className={errors.tipoRegistro ? 'invalid' : ''}
                    required
                    disabled={isLoading}
                  >
                    <option value="">Seleccione el tipo de registro</option>
                    {selectOpciones.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.tipoRegistro && <div className="error-message">{errors.tipoRegistro}</div>}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || !tipoRegistro}
                  className={isLoading ? 'loading' : ''}
                >
                  {isLoading ? 'Registrando...' : 'Registrar'}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default RegistroEntrada;
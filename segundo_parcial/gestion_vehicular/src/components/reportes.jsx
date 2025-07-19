import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/reportes.css';
import NavMenu from './NavMenu';

function Reportes() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState('todos');
  const [tipoUsuario, setTipoUsuario] = useState('todos');
  const [tipoVehiculo, setTipoVehiculo] = useState('todos');
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Obtener datos guardados en localStorage
  function obtenerDatos() {
    const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
    const registros = JSON.parse(localStorage.getItem("entradasSalidas")) || [];

    return registros.map(registro => {
      const vehiculo = vehiculos.find(v => v.placa === registro.placa) || {};
      return {
        placa: registro.placa,
        marca: vehiculo.marca || "",
        nombre: vehiculo.nombre || "",
        tipoUsuario: vehiculo.tipoUsuario || "",
        tipoVehiculo: vehiculo.tipoVehiculo || "",
        color: vehiculo.color || "",
        fechaEntrada: registro.fechaEntrada,
        fechaSalida: registro.fechaSalida
      };
    });
  }

  // Filtrar datos según los select y fechas
  const filtrarDatos = useCallback(() => {
    const datos = obtenerDatos();

    const filtrados = datos.filter(item => {
      const matchUsuario = tipoUsuario === "todos" || item.tipoUsuario === tipoUsuario;
      const matchVehiculo = tipoVehiculo === "todos" || item.tipoVehiculo === tipoVehiculo;

      const entradaDate = item.fechaEntrada ? new Date(item.fechaEntrada) : null;

      let matchEstado = true;
      if (estado === "dentro") {
        matchEstado = item.fechaSalida === null;
      } else if (estado === "fuera") {
        matchEstado = item.fechaSalida !== null;
      }

      let matchFecha = true;
      if (fechaInicio && fechaFin && entradaDate) {
        const desde = new Date(fechaInicio);
        const hasta = new Date(fechaFin);
        matchFecha = entradaDate >= desde && entradaDate <= hasta;
      }

      return matchUsuario && matchVehiculo && matchEstado && matchFecha;
    });

    setDatosFiltrados(filtrados);
  }, [tipoUsuario, tipoVehiculo, estado, fechaInicio, fechaFin]);

  // Exportar a CSV
  function exportarCSV() {
    if (datosFiltrados.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const headers = ['Placa', 'Marca', 'Propietario', 'Tipo Usuario', 'Tipo Vehículo', 'Color', 'Fecha Entrada', 'Fecha Salida'];
    const csvContent = [
      headers.join(','),
      ...datosFiltrados.map(item => [
        item.placa,
        item.marca,
        item.nombre,
        item.tipoUsuario,
        item.tipoVehiculo,
        item.color,
        item.fechaEntrada || '',
        item.fechaSalida || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_vehiculos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fechaInicio':
        setFechaInicio(value);
        break;
      case 'fechaFin':
        setFechaFin(value);
        break;
      case 'estado':
        setEstado(value);
        break;
      case 'tipoUsuario':
        setTipoUsuario(value);
        break;
      case 'tipoVehiculo':
        setTipoVehiculo(value);
        break;
      default:
        break;
    }
  };



  // Actualizar resultados al cambiar filtros
  useEffect(() => {
    const cargarDatos = () => {
      try {
        filtrarDatos();
      } catch (error) {
        console.error('Error al cargar reportes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Simular carga de datos
    setTimeout(cargarDatos, 500);
  }, [filtrarDatos]);

  if (isLoading) {
    return (
      <div className="reportes-container">
        <NavMenu currentPage="reportes" />
        <main>
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando reportes...</p>
          </div>
        </main>
      </div>
    );
  }

  const datosCompletos = obtenerDatos();
  const vehiculosDentro = datosCompletos.filter(item => item.fechaSalida === null).length;
  const vehiculosFuera = datosCompletos.filter(item => item.fechaSalida !== null).length;

  return (
    <div className="reportes-container">
      <NavMenu currentPage="reportes" />

      <main>
        <h2>Reportes Vehiculares</h2>

        {/* Estadísticas */}
        <div className="estadisticas">
          <div className="estadistica-card">
            <h4>Total de Registros</h4>
            <p className="valor">{datosCompletos.length}</p>
          </div>
          <div className="estadistica-card">
            <h4>Vehículos Dentro</h4>
            <p className="valor">{vehiculosDentro}</p>
          </div>
          <div className="estadistica-card">
            <h4>Vehículos Fuera</h4>
            <p className="valor">{vehiculosFuera}</p>
          </div>
          <div className="estadistica-card">
            <h4>Resultados Filtrados</h4>
            <p className="valor">{datosFiltrados.length}</p>
          </div>
        </div>

        <section>
          <h3>Filtros de Reporte</h3>
          <div className="filtros">
            <div className="filtro-grupo">
              <label htmlFor="fechaInicio">Fecha desde</label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={fechaInicio}
                onChange={manejarCambio}
              />
            </div>

            <div className="filtro-grupo">
              <label htmlFor="fechaFin">Fecha hasta</label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={fechaFin}
                onChange={manejarCambio}
              />
            </div>

            <div className="filtro-grupo">
              <label htmlFor="filtroEstado">Estado</label>
              <select
                id="filtroEstado"
                name="estado"
                value={estado}
                onChange={manejarCambio}
              >
                <option value="todos">Todos los estados</option>
                <option value="dentro">Aún dentro</option>
                <option value="fuera">Ya salieron</option>
              </select>
            </div>

            <div className="filtro-grupo">
              <label htmlFor="filtroTipoUsuario">Tipo de Usuario</label>
              <select
                id="filtroTipoUsuario"
                name="tipoUsuario"
                value={tipoUsuario}
                onChange={manejarCambio}
              >
                <option value="todos">Todos los usuarios</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Docente">Docente</option>
                <option value="Administrativo">Administrativo</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="filtro-grupo">
              <label htmlFor="filtroTipoVehiculo">Tipo de Vehículo</label>
              <select
                id="filtroTipoVehiculo"
                name="tipoVehiculo"
                value={tipoVehiculo}
                onChange={manejarCambio}
              >
                <option value="todos">Todos los vehículos</option>
                <option value="Carro">Carro</option>
                <option value="Moto">Moto</option>
                <option value="Camion">Camión</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="filtro-grupo">
              <label>&nbsp;</label>
              <button onClick={exportarCSV} disabled={datosFiltrados.length === 0}>
                Exportar CSV
              </button>
            </div>
          </div>
        </section>

        <section>
          <h3>Resultados del Reporte ({datosFiltrados.length} registros)</h3>
          
          <div className="table-container">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Marca</th>
                    <th>Propietario</th>
                    <th>Tipo Usuario</th>
                    <th>Tipo Vehículo</th>
                    <th>Color</th>
                    <th>Fecha Entrada</th>
                    <th>Fecha Salida</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {datosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: "center", padding: "2rem" }}>
                        <p style={{ color: "var(--text-light)", fontSize: "1.1rem" }}>
                          {datosCompletos.length === 0 
                            ? "No hay registros de entrada/salida aún." 
                            : "No se encontraron registros con los filtros aplicados."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    datosFiltrados.map((item, idx) => (
                      <tr key={idx} className={item.fechaSalida ? 'salida' : 'entrada'}>
                        <td><strong>{item.placa}</strong></td>
                        <td>{item.marca}</td>
                        <td>{item.nombre}</td>
                        <td>
                          <span style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            backgroundColor: 
                              item.tipoUsuario === 'Estudiante' ? '#e3f2fd' :
                              item.tipoUsuario === 'Docente' ? '#f3e5f5' :
                              item.tipoUsuario === 'Administrativo' ? '#e8f5e8' : '#fff3e0',
                            color: 
                              item.tipoUsuario === 'Estudiante' ? '#1976d2' :
                              item.tipoUsuario === 'Docente' ? '#7b1fa2' :
                              item.tipoUsuario === 'Administrativo' ? '#388e3c' : '#f57c00'
                          }}>
                            {item.tipoUsuario}
                          </span>
                        </td>
                        <td>{item.tipoVehiculo}</td>
                        <td>{item.color}</td>
                        <td>
                          {item.fechaEntrada 
                            ? new Date(item.fechaEntrada).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'N/A'
                          }
                        </td>
                        <td>
                          {item.fechaSalida 
                            ? new Date(item.fechaSalida).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : '---'
                          }
                        </td>
                        <td>
                          <span style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            backgroundColor: item.fechaSalida ? '#ffebee' : '#e8f5e8',
                            color: item.fechaSalida ? '#c62828' : '#2e7d32'
                          }}>
                            {item.fechaSalida ? 'Fuera' : 'Dentro'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Reportes;
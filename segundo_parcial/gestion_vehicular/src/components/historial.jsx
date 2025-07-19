import React, { useState, useEffect } from "react";
import "../assets/css/reportes.css";
import { obtenerHistorial, filtrarHistorial } from "../assets/js/historial";
import NavMenu from './NavMenu';

function Historial() {
  const [historial, setHistorial] = useState([]);
  const [buscarPlaca, setBuscarPlaca] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarHistorial = () => {
      try {
        const datos = obtenerHistorial();
        setHistorial(datos);
      } catch (error) {
        console.error('Error al cargar historial:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Simular carga de datos
    setTimeout(cargarHistorial, 500);
  }, []);

  const datosFiltrados = filtrarHistorial(historial, buscarPlaca, tipoUsuario);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'buscarPlaca') {
      setBuscarPlaca(value);
    } else if (name === 'tipoUsuario') {
      setTipoUsuario(value);
    }
  };

  if (isLoading) {
    return (
      <div className="reportes-container">
        <NavMenu currentPage="historial" />
        <main>
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando historial...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="reportes-container">
      <NavMenu currentPage="historial" />

      <main>
        <h2>Historial de Vehículos Registrados</h2>

        {/* Estadísticas */}
        <div className="estadisticas">
          <div className="estadistica-card">
            <h4>Total de Vehículos</h4>
            <p className="valor">{historial.length}</p>
          </div>
          <div className="estadistica-card">
            <h4>Estudiantes</h4>
            <p className="valor">{historial.filter(v => v.tipoUsuario === 'Estudiante').length}</p>
          </div>
          <div className="estadistica-card">
            <h4>Docentes</h4>
            <p className="valor">{historial.filter(v => v.tipoUsuario === 'Docente').length}</p>
          </div>
          <div className="estadistica-card">
            <h4>Administrativos</h4>
            <p className="valor">{historial.filter(v => v.tipoUsuario === 'Administrativo').length}</p>
          </div>
        </div>

        <section>
          <h3>Filtros de Búsqueda</h3>
          <div className="filtros">
            <div className="filtro-grupo">
              <label htmlFor="buscarPlaca">Buscar por placa</label>
              <input
                type="text"
                id="buscarPlaca"
                name="buscarPlaca"
                placeholder="Ej: ABC123"
                value={buscarPlaca}
                onChange={manejarCambio}
              />
            </div>

            <div className="filtro-grupo">
              <label htmlFor="filtrarTipoUsuario">Filtrar por tipo de usuario</label>
              <select
                id="filtrarTipoUsuario"
                name="tipoUsuario"
                value={tipoUsuario}
                onChange={manejarCambio}
              >
                <option value="">Todos los usuarios</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Docente">Docente</option>
                <option value="Administrativo">Administrativo</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="filtro-grupo">
              <label>&nbsp;</label>
              <button 
                onClick={() => {
                  setBuscarPlaca("");
                  setTipoUsuario("");
                }}
                className="secondary"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </section>

        <section>
          <h3>Historial de Vehículos ({datosFiltrados.length} registros)</h3>
          
          <div className="table-container">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Propietario</th>
                    <th>Tipo de Usuario</th>
                    <th>Tipo de Vehículo</th>
                    <th>Marca</th>
                    <th>Color</th>
                    <th>Fecha de Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {datosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                        <p style={{ color: "var(--text-light)", fontSize: "1.1rem" }}>
                          {historial.length === 0 
                            ? "No hay vehículos registrados aún." 
                            : "No se encontraron registros con los filtros aplicados."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    datosFiltrados.map((item, idx) => (
                      <tr key={idx}>
                        <td><strong>{item.placa}</strong></td>
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
                        <td>{item.marca}</td>
                        <td>{item.color}</td>
                        <td>
                          {item.fechaRegistro 
                            ? new Date(item.fechaRegistro).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'N/A'
                          }
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

export default Historial;
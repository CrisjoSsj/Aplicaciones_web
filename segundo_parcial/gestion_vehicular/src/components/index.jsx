import React, { useEffect, useState } from 'react';
import '../assets/css/style.css';
import { getDashboardData, getUsuarioActual } from '../assets/js/index';
import NavMenu from './NavMenu';

function Index() {
  const [usuario, setUsuario] = useState('');
  const [cantidadVehiculos, setCantidadVehiculos] = useState(0);
  const [cantidadDentro, setCantidadDentro] = useState(0);
  const [cantidadFuera, setCantidadFuera] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = () => {
      try {
        setUsuario(getUsuarioActual());
        const dashboard = getDashboardData();
        setCantidadVehiculos(dashboard.cantidadVehiculos);
        setCantidadDentro(dashboard.cantidadDentro);
        setCantidadFuera(dashboard.cantidadFuera);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Simular carga de datos
    setTimeout(cargarDatos, 500);
  }, []);



  if (isLoading) {
    return (
      <div className="login-container">
        <NavMenu currentPage="index" />
        <main>
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="login-container">
      <NavMenu currentPage="index" />

      <main className="main-content">
        <div className="bienvenida">
          <h1>Bienvenido</h1>
          <span>Usuario: {usuario}</span>
        </div>

        <section className="dashboard-cards">
          <div className="card">
            <img src="/img/car_registrado.png" alt="Vehículos Registrados" />
            <h3>Vehículos Registrados</h3>
            <p>{cantidadVehiculos}</p>
          </div>

          <div className="card">
            <img src="/img/car_lock.png" alt="Vehículos Dentro" />
            <h3>Vehículos Dentro</h3>
            <p>{cantidadDentro}</p>
          </div>

          <div className="card">
            <img src="/img/car.png" alt="Vehículos Fuera" />
            <h3>Vehículos Fuera</h3>
            <p>{cantidadFuera}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Index;
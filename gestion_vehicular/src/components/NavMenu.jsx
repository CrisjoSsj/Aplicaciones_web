import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavMenu({ currentPage }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function alternarMenu() {
    setMenuAbierto(!menuAbierto);
  }

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  }

  return (
    <header>
      <img src="/img/logo_uleam.png" alt="Logo ULEAM" className="logo" />
      
      {/* Botón hamburguesa para móviles */}
      <button 
        className={`hamburger ${menuAbierto ? 'active' : ''}`}
        onClick={alternarMenu}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navegación */}
      <nav className={`nav-menu ${menuAbierto ? 'active' : ''}`}>
        <Link to="/index" className={currentPage === 'index' ? 'active' : ''} onClick={cerrarMenu}>
          Inicio
        </Link>
        <Link to="/registro-vehicular" className={currentPage === 'registro-vehicular' ? 'active' : ''} onClick={cerrarMenu}>
          Registrar Vehículo
        </Link>
        <Link to="/registro-entrada-salida" className={currentPage === 'registro-entrada-salida' ? 'active' : ''} onClick={cerrarMenu}>
          Registrar Entrada/Salida
        </Link>
        <Link to="/historial" className={currentPage === 'historial' ? 'active' : ''} onClick={cerrarMenu}>
          Historial Registros
        </Link>
        <Link to="/reportes" className={currentPage === 'reportes' ? 'active' : ''} onClick={cerrarMenu}>
          Reportes
        </Link>
        <Link to="/login" id="cerrarSesion" onClick={cerrarSesion}>
          Cerrar Sesión
        </Link>
      </nav>

      {/* Overlay para cerrar menú al tocar fuera */}
      {menuAbierto && (
        <div className="nav-overlay" onClick={cerrarMenu}></div>
      )}
    </header>
  );
}

export default NavMenu; 
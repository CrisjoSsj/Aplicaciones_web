// src/components/Login.jsx
import React, { useState } from 'react';
import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import { validarLogin } from "../assets/js/auth";

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Simular validación asíncrona
    setTimeout(() => {
      if (validarLogin(usuario, password)) {
        localStorage.setItem('usuario', usuario);
        navigate('/index');
      } else {
        setErrors({ general: 'Usuario o contraseña incorrectos' });
      }
      setIsLoading(false);
    }, 1000);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'usuario') {
      setUsuario(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name] || errors.general) {
      setErrors({});
    }
  };

  return (
    <div className="login-container">
      <header>
        <img src="/img/logo_uleam.png" alt="Logo ULEAM" />
      </header>

      <main>
        <h1 className="titulo">Iniciar Sesión</h1>

        <div className="box_login">
          <img
            src="/img/logo_uleam.png"
            alt="Logo ULEAM"
            className="logo"
          />

          <form onSubmit={manejarSubmit}>
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={usuario}
              onChange={manejarCambio}
              className={errors.usuario ? 'error' : ''}
              placeholder="Ingrese su usuario"
              required
              disabled={isLoading}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={manejarCambio}
              className={errors.password ? 'error' : ''}
              placeholder="Ingrese su contraseña"
              required
              disabled={isLoading}
            />

            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? 'Iniciando sesión...' : 'Entrar'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;

// src/utils/auth.js

// --- LOGIN VALIDATION LOGIC ---
const USUARIO_VALIDO = "admin";
const PASSWORD_VALIDO = "1234";

/**
 * Valida si las credenciales son correctas.
 * @param {string} usuario
 * @param {string} password
 * @returns {boolean}
 */
export function validarLogin(usuario, password) {
  return (
    usuario.trim() === USUARIO_VALIDO &&
    password.trim() === PASSWORD_VALIDO
  );
}

// --- AUTH SESSION LOGIC ---

/**
 * Guarda el usuario en sesión.
 * @param {string} usuario
 */
export function iniciarSesion(usuario) {
  localStorage.setItem("usuario", usuario);
}

/**
 * Borra la sesión del usuario.
 */
export function cerrarSesion() {
  localStorage.removeItem("usuario");
}

/**
 * Devuelve el usuario actual o null si no está logueado.
 * @returns {string|null}
 */
export function obtenerUsuario() {
  return localStorage.getItem("usuario");
}

/**
 * Verifica si hay sesión activa.
 * @returns {boolean}
 */
export function sesionActiva() {
  return !!localStorage.getItem("usuario");
}

/**
 * Protege una página. Si no hay sesión, redirige a /login.
 * @param {function} navigate - Función de navegación (ej: useNavigate de React Router)
 */
export function protegerPagina(navigate) {
  if (!sesionActiva()) {
    navigate("/login");
  }
}
# 🚗 Sistema de Gestión Vehicular - ULEAM

## 📋 Descripción

Sistema web moderno para la gestión de vehículos en la Universidad Laica Eloy Alfaro de Manabí (ULEAM). Permite el registro, control de entrada/salida y generación de reportes de vehículos de estudiantes, docentes y personal administrativo.

## ✨ Características Principales

### 🎨 **Diseño Moderno y Responsivo**
- **Layout completamente renovado** con CSS moderno
- **Sistema de variables CSS** para consistencia visual
- **Diseño responsive** que se adapta a móviles, tablets y desktop
- **Tema claro/oscuro** automático según preferencias del sistema
- **Animaciones suaves** y transiciones elegantes

### 🔐 **Sistema de Autenticación**
- Login seguro con validación de credenciales
- Gestión de sesiones con localStorage
- Protección de rutas

### 📊 **Dashboard Interactivo**
- Estadísticas en tiempo real
- Cards animadas con información clave
- Indicadores visuales de estado

### 🚙 **Gestión de Vehículos**
- Registro completo de vehículos con validación
- Validación de cédula ecuatoriana
- Control de duplicados por placa
- Información detallada: propietario, marca, color, tipo

### ⏰ **Control de Entrada/Salida**
- Registro de entrada y salida de vehículos
- Búsqueda rápida por placa
- Validación de estados (dentro/fuera)
- Información detallada del vehículo

### 📈 **Reportes Avanzados**
- Filtros múltiples por fecha, usuario, tipo de vehículo
- Estadísticas visuales
- Exportación a CSV
- Tablas responsivas con ordenamiento

### 📚 **Historial Completo**
- Vista de todos los vehículos registrados
- Filtros por tipo de usuario y placa
- Estadísticas por categoría
- Información detallada con fechas

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **Estilos**: CSS3 con variables CSS
- **Almacenamiento**: localStorage
- **Validaciones**: JavaScript nativo
- **Responsive**: CSS Grid + Flexbox

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Entrar al directorio
cd gestion_vehicular

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Acceso
- **URL**: http://localhost:5173
- **Usuario demo**: admin
- **Contraseña demo**: admin123

## 📱 Características Responsive

### Desktop (1200px+)
- Layout de 3 columnas en dashboard
- Navegación horizontal completa
- Tablas con todas las columnas visibles

### Tablet (768px - 1199px)
- Layout de 2 columnas en dashboard
- Navegación adaptativa
- Tablas con scroll horizontal

### Móvil (320px - 767px)
- Layout de 1 columna
- Navegación vertical
- Tablas optimizadas para móvil

## 🎨 Sistema de Diseño

### Colores Principales
- **Primario**: #ec3237 (Rojo ULEAM)
- **Secundario**: #444444 (Gris oscuro)
- **Fondo**: #f0f2f5 (Gris claro)
- **Superficie**: #ffffff (Blanco)

### Tipografía
- **Familia**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Tamaños**: Escala modular 0.875rem - 2.5rem
- **Pesos**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Espaciado
- **Base**: 0.25rem (4px)
- **Escala**: 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem

## 🔧 Estructura del Proyecto

```
gestion_vehicular/
├── src/
│   ├── components/          # Componentes React
│   │   ├── index.jsx       # Dashboard principal
│   │   ├── login.jsx       # Página de login
│   │   ├── registro_vehicular.jsx
│   │   ├── registro_entrada_salida.jsx
│   │   ├── historial.jsx
│   │   └── reportes.jsx
│   ├── assets/
│   │   ├── css/            # Estilos específicos
│   │   │   ├── style.css   # Dashboard
│   │   │   ├── login.css   # Login
│   │   │   ├── registro.css
│   │   │   ├── entrada_salida.css
│   │   │   └── reportes.css
│   │   └── js/             # Lógica de negocio
│   ├── App.css             # Estilos globales
│   ├── index.css           # Reset y variables CSS
│   └── main.jsx
├── public/
│   └── img/                # Imágenes y logos
└── package.json
```

## 📊 Funcionalidades por Módulo

### 🔐 Login
- Validación de credenciales
- Estados de carga
- Manejo de errores
- Diseño centrado y moderno

### 🏠 Dashboard
- Estadísticas en tiempo real
- Cards animadas
- Navegación principal
- Información del usuario

### 📝 Registro Vehicular
- Formulario completo con validación
- Validación de cédula ecuatoriana
- Prevención de duplicados
- Feedback visual de errores

### ⏰ Entrada/Salida
- Búsqueda por placa
- Información detallada del vehículo
- Control de estados
- Validación de operaciones

### 📚 Historial
- Lista completa de vehículos
- Filtros avanzados
- Estadísticas por categoría
- Información detallada

### 📈 Reportes
- Filtros múltiples
- Exportación a CSV
- Estadísticas visuales
- Tablas responsivas

## 🎯 Mejoras Implementadas

### ✅ CSS Moderno
- Variables CSS para consistencia
- Sistema de diseño unificado
- Responsive design completo
- Animaciones y transiciones

### ✅ UX/UI Mejorada
- Feedback visual en formularios
- Estados de carga
- Mensajes de error claros
- Navegación intuitiva

### ✅ Funcionalidad
- Validaciones robustas
- Manejo de errores
- Estados de carga
- Exportación de datos

### ✅ Performance
- Código optimizado
- Lazy loading de componentes
- CSS eficiente
- JavaScript moderno

## 🔮 Próximas Mejoras

- [ ] Base de datos real (MySQL/PostgreSQL)
- [ ] Autenticación con JWT
- [ ] API REST completa
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] PWA (Progressive Web App)
- [ ] Reportes en PDF
- [ ] Dashboard con gráficos
- [ ] Sistema de roles y permisos

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Contacto

- **Universidad**: Universidad Laica Eloy Alfaro de Manabí (ULEAM)
- **Proyecto**: Sistema de Gestión Vehicular
- **Versión**: 2.0.0
- **Fecha**: 2024

---

**Desarrollado con ❤️ para la ULEAM**

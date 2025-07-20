import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './components/index';
import Historial from './components/historial';
import Login from './components/login';
import RegistroVehicular from './components/registro_vehicular';
import RegistroEntrada from './components/registro_entrada_salida';
import Reportes from './components/reportes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<Index />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro-vehicular" element={<RegistroVehicular />} />
        <Route path="/registro-entrada-salida" element={<RegistroEntrada />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </Router>
  );
}

export default App;

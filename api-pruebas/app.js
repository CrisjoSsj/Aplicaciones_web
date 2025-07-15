const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

let productos = [{ id: 1, nombre: 'Laptop' }];

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req, res) => {
  const nuevo = { id: productos.length + 1, nombre: req.body.nombre };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

module.exports = app;

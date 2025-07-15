const lista = document.getElementById('lista-productos');
const input = document.getElementById('nombre');

function cargarProductos() {
  fetch('/productos')
    .then(res => res.json())
    .then(data => {
      lista.innerHTML = '';
      data.forEach(prod => {
        const li = document.createElement('li');
        li.textContent = `${prod.id}: ${prod.nombre}`;
        lista.appendChild(li);
      });
    });
}

function agregarProducto() {
  const nombre = input.value.trim();
  if (!nombre) return alert('Ingrese un nombre');

  fetch('/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  })
    .then(res => res.json())
    .then(data => {
      input.value = '';
      cargarProductos();
    });
}

// Cargar productos al iniciar
cargarProductos();

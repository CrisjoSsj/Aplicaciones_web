const request = require('supertest');
const app = require('./app');

describe('Pruebas de la API /productos', () => {
  it('GET /productos debe retornar un array', async () => {
    const res = await request(app).get('/productos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /productos debe agregar un producto', async () => {
    const res = await request(app)
      .post('/productos')
      .send({ nombre: 'Tablet' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe('Tablet');
  });
});

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productModel = require('../models/productModel'); // Ajusta la ruta a tu modelo de producto
const getCategoryProduct = require('../controller/product/getCategoryProductOne'); // Ajusta la ruta según tu estructura de carpetas

const app = express();
app.use(bodyParser.json());
app.get('/categorias', getCategoryProduct);

describe('GET /categorias', () => {
  // Caso de prueba: Obtener categorías de productos correctamente
  it('debería obtener las categorías de productos', async () => {
    // Datos simulados para productos en diferentes categorías
    const products = [
      { productName: 'Producto A', category: 'Categoría A' },
      { productName: 'Producto B', category: 'Categoría B' },
      { productName: 'Producto C', category: 'Categoría C' },
    ];

    // Mock productModel.distinct para devolver las categorías simuladas
    productModel.distinct = jest.fn().mockResolvedValue(['Categoría A', 'Categoría B', 'Categoría C']);

    // Mock productModel.findOne para devolver un producto por cada categoría
    productModel.findOne = jest.fn().mockImplementation((query) => {
      const category = query.category;
      return Promise.resolve(products.find(p => p.category === category));
    });

    // Realiza una solicitud de prueba
    const response = await request(app).get('/categorias');

    // Verificaciones
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe('categorias traidas');
    expect(response.body.data.length).toBe(3); // Verifica que se devuelvan tres productos, uno por cada categoría
  });

  // Caso de prueba: Manejo de errores si ocurre algún problema
  it('debería manejar los errores', async () => {
    // Mock productModel.distinct para simular un error
    productModel.distinct = jest.fn().mockRejectedValue(new Error('Error en la base de datos'));

    // Realiza una solicitud de prueba
    const response = await request(app).get('/categorias');

    // Verificaciones
    expect(response.status).toBe(500); // Puedes ajustar el código de estado según tu manejo de errores
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('Error en la base de datos');
  });
  
  it('debería manejar los errores de validación', async () => {
    // Mock productModel.distinct para simular un error de validación (ValidationError)
    productModel.distinct = jest.fn().mockRejectedValue({ name: 'ValidationError', message: 'Error de validación' });

    // Realiza una solicitud de prueba
    const response = await request(app).get('/categorias');

    // Verificaciones
    expect(response.status).toBe(400); // Código de estado 400 para errores de validación
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('Error de validación');
  });
});
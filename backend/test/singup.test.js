// userSignUpController.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // Asegúrate de importar bcrypt
const userSignUpController = require('../controller/user/userSignUp'); // Ajusta la ruta según tu estructura de carpetas
const userModel = require('../models/userModel'); // Ajusta la ruta a tu userModel

const app = express();
app.use(bodyParser.json());
app.post('/signup', userSignUpController);

describe('POST /signup', () => {
  it('Debería crear un nuevo usuario', async () => {
    // Datos simulados para la solicitud
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    // Mock userModel.findOne para que devuelva null (usuario no existe)
    userModel.findOne = jest.fn().mockResolvedValue(null);

    // Mock bcrypt.hashSync para que devuelva una contraseña hash
    bcrypt.hashSync = jest.fn().mockReturnValue('hashedPassword');

    // Mock userModel.save para que devuelva el usuario guardado
    userModel.prototype.save = jest.fn().mockResolvedValue(userData);

    // Realiza una solicitud de prueba
    const response = await request(app).post('/signup').send(userData);

    // Verificaciones
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(userData.email);
  });

  it('debería devolver un error si el correo electrónico ya existe', async () => {
    // Mock userModel.findOne para que devuelva un usuario existente
    userModel.findOne = jest.fn().mockResolvedValue({ email: 'existing@example.com' });

    // Realiza una solicitud de prueba
    const response = await request(app).post('/signup').send({
      name: 'John Doe',
      email: 'existing@example.com',
      password: 'password123',
    });

    // Verificaciones
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('usuario ya existente');
  });

  // Caso de prueba: Falta el nombre
  it('debería devolver un error si falta el nombre', async () => {
    const userData1 = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app).post('/signup').send(userData1);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('por favor ingrese un nombre');
  });

  // Caso de prueba: Falta la contraseña
  it('should return an error if password is missing', async () => {
    const userData = {
      name: 'John Doe',
      email: 'test@example.com',
    };

    const response = await request(app).post('/signup').send(userData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('por favor ingrese una contraseña');
  });

  // Caso de prueba: Falta el correo electrónico
  it('debería devolver un error si falta el correo electrónico', async () => {
    const userData = {
      name: 'John Doe',
      password: 'password123',
    };

    const response = await request(app).post('/signup').send(userData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('por favor ingrese un correo');
  });

  // Caso de prueba: Error al generar el hash de la contraseña
  it('debería manejar el error si falla el hash de contraseña', async () => {
    userModel.findOne = jest.fn().mockResolvedValue(null);
    bcrypt.hashSync = jest.fn().mockImplementation(() => {
      throw new Error('Something is wrong');
    });

    const userData = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app).post('/signup').send(userData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('Something is wrong');
  });
});
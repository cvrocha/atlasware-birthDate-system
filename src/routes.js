const { Router } = require('express');
const authController = require('./controllers/Auth');
const employeeController = require('./controllers/Employee');

const authMiddleware = require('./middlewares/Auth');

const routes = Router();

routes.post('/login', authController.index);
routes.post('/register', authController.store);

routes.get('/employee', authMiddleware, employeeController.index);
routes.post('/employee', authMiddleware, employeeController.store);

module.exports = routes;

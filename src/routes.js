const { Router } = require('express');
const authController = require('./controllers/Auth');
const employeeController = require('./controllers/Employee');
const birthDateController = require('./controllers/BirthDate');

const authMiddleware = require('./middlewares/Auth');

const routes = Router();

routes.post('/login', authController.index);
routes.post('/register', authController.store);

routes.get('/employee', authMiddleware, employeeController.index);
routes.post('/employee', authMiddleware, employeeController.store);
routes.get('/employee/:id', authMiddleware, employeeController.show);
routes.put('/employee/:id', authMiddleware, employeeController.edit);
routes.delete('/employee/:id', authMiddleware, employeeController.destroy);
// Aniversariantes
routes.get('/birthdate', authMiddleware, birthDateController.index);

module.exports = routes;

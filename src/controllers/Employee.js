const db = require('../models');

const Employee = db.employee;

const EmployeeController = {
  async index(req, res) {
    await Employee.findAll().then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      res.status(500).send({ message: err.message || 'Algo de errado aconteceu, tente novamente' });
    });
  },
  async store(req, res) {
    const {
      firstName, lastName, email, phone, comments, birthDate,
    } = req.body;

    if (!firstName || !lastName || !birthDate) {
      res.status(400).send({ message: 'Atributos obrigatorios não podem estar em branco' });
    }

    Employee.create({
      firstName, lastName, email, phone, comments, birthDate,
    }).then((data) => {
      res.status(201).send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Algo de errado aconteceu',
      });
    });
  },
};

module.exports = EmployeeController;

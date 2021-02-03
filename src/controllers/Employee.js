/* eslint-disable eqeqeq */
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
  async show(req, res) {
    const { id } = req.params;
    await Employee.findByPk(id).then((data) => {
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

    await Employee.create({
      firstName, lastName, email, phone, comments, birthDate,
    }).then((data) => {
      res.status(201).send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Algo de errado aconteceu',
      });
    });
  },
  async edit(req, res) {
    const {
      firstName, lastName, birthDate,
    } = req.body;
    const { id } = req.params;

    if (!firstName || !lastName || !birthDate) {
      res.status(400).send({ message: 'Atributos obrigatorios não podem estar em branco' });
    }
    await Employee.update(req.body, {
      where: { id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          message: 'Empregado alterado com sucesso',
        });
      } else {
        res.send({
          message: `Não foi possivel encontrar o id=${id}.`,
        });
      }
    });
  },
  async destroy(req, res) {
    const { id } = req.params;
    await Employee.destroy({
      where: { id },
    }).then((data) => {
      if (data == 1) {
        res.status(204).send({
          message: 'Funcionario deletado com successo!',
        });
      } else {
        res.status(404).send({
          message: `Não foi possivel localizar o funcionario com id = ${id}.`,
        });
      }
    }).catch((err) => {
      res.status(500).send({ message: err.message || 'Algo de errado aconteceu, tente novamente' });
    });
  },
};

module.exports = EmployeeController;

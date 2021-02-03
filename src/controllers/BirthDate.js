/* eslint-disable eqeqeq */
const moment = require('moment');
const db = require('../models');

const Employee = db.employee;

const BirthDateController = {
  async index(req, res) {
    await Employee.findAll({
      where: {
        birthDate: {
          $eq: moment().toDate(),
        },
      },
    }).then((data) => {
      res.status(200).send(data);
    }).catch((err) => {
      res.status(500).send({ message: err.message || 'Algo de errado aconteceu, tente novamente' });
    });
  },
};

module.exports = BirthDateController;

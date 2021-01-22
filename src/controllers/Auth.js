const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const JWT = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
const ConfigDatabase = require('../config/database');

const connection = new Sequelize(ConfigDatabase);

const Auth = {
  async index(req, res) {
    const { email, password } = req.body;

    const [user] = await connection.query(
      'select id, email, password from users where email=$email',
      {
        type: QueryTypes.SELECT,
        bind: { email },
      },
    );

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas!' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Credenciais inválidas!' });
    }

    const token = JWT.sign({ id: user.id }, process.env.APP_SECRET, {
      expiresIn: '24h',
    });

    return res.status(200).json({ id: user.id, token });
  },

  // show(req, res) {},
  async store(req, res) {
    const { name, email, password } = req.body;
    const newPassword = bcrypt.hashSync(password, 10);
    const now = new Date();
    const [idUser, err] = await connection.query(
      'INSERT INTO users (name, email, password, createdAt, updatedAt) VALUES ($name, $email, $password, $createdAt, $updatedAt)',
      {
        bind: {
          name,
          email,
          password: newPassword,
          createdAt: now,
          updatedAt: now,
        },
        raw: true,
      },
    );

    if (!err) {
      return res
        .status(400)
        .json({ details: 'Usuario não criado, tente novamente!' });
    }

    return res.status(201).json({ id: idUser, name, email });
  },
  // update(req, res) {},
  // delele(req, res) {},
};

module.exports = Auth;

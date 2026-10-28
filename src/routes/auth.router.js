const express = require('express');
const { registerUser } = require('../controllers/auth.controller');

const routerAuth = express.Router();

routerAuth.post('/register', registerUser);

module.exports = routerAuth;

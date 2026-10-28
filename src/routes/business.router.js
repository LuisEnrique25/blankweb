const express = require('express');
const { getBusinesses, getBusinessById } = require('../controllers/business.controller');

const routerBusiness = express.Router();

routerBusiness.route('/')
    .get(getBusinesses);

routerBusiness.route('/:id')
    .get(getBusinessById);

module.exports = routerBusiness;
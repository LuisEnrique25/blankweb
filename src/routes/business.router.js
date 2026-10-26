const express = require('express');
const { getBusinesses } = require('../controllers/business.controller');

const routerBusiness = express.Router();

routerBusiness.route('/')
    .get(getBusinesses);

module.exports = routerBusiness;
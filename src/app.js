const express = require('express');
const routerBusiness = require('./routes/business.router');
const errorMiddleware = require('./middlewares/error.middleware');
const routerAuth = require('./routes/auth.router');
const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'BlankWeb Api is running'
    });
});

//  routes
app.use('/api/businesses', routerBusiness);
app.use('/api/auth', routerAuth)


//middlewares despues de rutas!
app.use(errorMiddleware);

module.exports = app; 

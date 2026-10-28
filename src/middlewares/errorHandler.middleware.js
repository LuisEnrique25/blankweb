const errorHandler = (error, _req, res, _next) => {
    // Errores de validación 
    if (error.name === 'SequelizeValidationError') {
        const errObj = {};

        error.errors.forEach((err) => {
            errObj[err.path] = err.message;
        });

        return res.status(400).json({
            status: 'error',
            message: 'Error de validación',
            errors: errObj
        });
    }

    // Errores de claves foráneas 
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({
            status: 'error',
            message: 'La referencia a un registro relacionado no es válida'
        });
    }

    // Errores de restricciones UNIQUE de Sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
        const errObj = {};

        error.errors.forEach((err) => {
            errObj[err.path] = err.message;
        });

        return res.status(409).json({
            status: 'error',
            message: 'Ya existe un registro con esos datos',
            errors: errObj
        });
    }

    // Error general
    console.error(error);

    return res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor'
    });
};

module.exports = errorHandler;

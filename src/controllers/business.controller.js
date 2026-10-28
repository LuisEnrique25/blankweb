
const { Business } = require('../models');
const catchError = require('../utils/catchError');

const getBusinesses = catchError(async (req, res) => {
    const where = {
        website: null
    };

    if (req.query.category) {
        where.category = req.query.category;
    }

    const page = req.query.page === undefined
        ? 1
        : Number(req.query.page);

    const limit = req.query.limit === undefined
        ? 10
        : Number(req.query.limit);

    if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({
            status: 'error',
            message: 'El parámetro page debe ser un entero positivo'
        });
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        return res.status(400).json({
            status: 'error',
            message: 'El parámetro limit debe ser un entero entre 1 y 100'
        });
    }

    const offset = (page - 1) * limit;

    const { count, rows: businesses } =
        await Business.findAndCountAll({
            where,
            limit,
            offset,
            order: [['id', 'ASC']]
        });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
        status: 'success',
        results: businesses.length,
        pagination: {
            totalResults: count,
            totalPages,
            currentPage: page,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        },
        data: {
            businesses
        }
    });
});

const getBusinessById = catchError(async (req, res) => {
    const { id } = req.params;

    const business = await Business.findByPk(id);

    if (!business) {
        return res.status(404).json({
            status: 'error',
            message: 'Negocio no encontrado'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            business
        }
    });
});


module.exports = {
    getBusinesses,
    getBusinessById
};

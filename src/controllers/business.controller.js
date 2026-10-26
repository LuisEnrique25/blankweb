
const { Business } = require('../models');
const catchError = require('../utils/catchError');


const getBusinesses = catchError(async (req, res) => {
    const businesses = await Business.findAll({
        where: {
            website: null
        }
    });

    return res.status(200).json({
        status: 'success',
        results: businesses.length,
        data: {
            businesses
        }
    });
});


module.exports = {
    getBusinesses
};

const bcrypt = require('bcryptjs');
const { User } = require('../models');
const catchError = require('../utils/catchError');

const registerUser = catchError(async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Validar campos obligatorios
    if (
        typeof name !== 'string' ||
        !name.trim() ||
        typeof email !== 'string' ||
        !email.trim() ||
        typeof password !== 'string' ||
        !password
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'Nombre, correo y contraseña son obligatorios'
        });
    }

    // 2. Validar longitud mínima de contraseña
    if (password.length < 8) {
        return res.status(400).json({
            status: 'error',
            message: 'La contraseña debe tener al menos 8 caracteres'
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 3. Comprobar si el correo ya existe
    const existingUser = await User.findOne({
        where: { email: normalizedEmail }
    });

    if (existingUser) {
        return res.status(409).json({
            status: 'error',
            message: 'Este correo ya está registrado'
        });
    }

    // 4. Generar el hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 12);

    // 5. Crear el usuario
    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: 'user'
    });

    // 6. Responder sin exponer passwordHash
    return res.status(201).json({
        status: 'success',
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    });
});

module.exports = {
    registerUser
};

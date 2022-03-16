const { request } = require("express");
const { response } = require("express");
const jwt = require('jsonwebtoken');

const revalidarJWT = (req = request, res = response, next) => {

    //Es un estandar que si son jwt personalizados que se escribran en los headers 'x-token'.
    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({

            ok: false,
            mensaje: 'No hay token en la peticion.'
        });
    }

    try {

        const { uid, nombre } = jwt.verify(

            token,
            process.env.PALABRA_SECRETA_JWT
        );

        req.uid = uid;
        req.nombre = nombre;

    } catch (error) {

        return res.status(400).json({

            ok: false,
            mensaje: 'Token no valido.'
        });
    }

    next();
}

module.exports = {

    revalidarJWT
}
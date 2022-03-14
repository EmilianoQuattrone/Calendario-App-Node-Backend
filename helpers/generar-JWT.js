const jwt = require('jsonwebtoken');

const generarJWT = (uid, nombre) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, nombre };

        jwt.sign(payload, process.env.PALABRA_SECRETA_JWT, {

            expiresIn: '2h'

        }, (err, token) => {

            if (err) {

                console.log(err);
                reject('No se puedo generar el token.');
            }

            resolve(token);
        });
    });
}

module.exports = {

    generarJWT
}
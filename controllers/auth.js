const { response } = require("express");
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-JWT");

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {

            return res.status(400).json({

                ok: false,
                mensaje: `El ${usuario.email} ya existe.`
            });
        }

        usuario = new Usuario(req.body);

        //Encriptar contraseña antes de guardala en db.
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT.
        const token = await generarJWT(usuario.id, usuario.nombre);

        res.status(201).json({

            ok: true,
            //La propiedad id viene de mongo.
            uid: usuario.id,
            nombre: usuario.nombre,
            token,
            mensaje: `Se creo el usuario ${usuario.email} correctamente.`
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({

            ok: false,
            mensaje: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {

            return res.status(400).json({

                ok: false,
                mensaje: 'El usuario con ese email no existe.'
            });
        }

        //Confirmar las contraseñas
        const validarPassword = bcrypt.compareSync(password, usuario.password);

        if (!validarPassword) {

            return res.status(400).json({

                ok: false,
                mensaje: 'La contraseña es incorrecta.'
            });
        }

        //Generar JWT.
        const token = await generarJWT(usuario.id, usuario.nombre);

        res.status(200).json({

            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({

            ok: false,
            mensaje: 'Por favor hable con el administrador.'
        });
    }
}

const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const nombre = req.nombre;

    //Generar una nuevo jwt.
    const token = await generarJWT(uid, nombre);

    res.status(200).json({

        ok: true,
        mensaje: 'renew',
        uid,
        nombre,
        token
    });
}

module.exports = {

    crearUsuario,
    loginUsuario,
    revalidarToken
}
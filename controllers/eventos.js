const { response } = require("express");
const Evento = require('../models/Eventos');

const getEventos = async (req, res = response) => {

    const evento = await Evento.find().populate('user', 'nombre');

    try {

        res.status(200).json({

            ok: true,
            mensaje: 'Obtener eventos.',
            evento
        });

    } catch (error) {

        console.log(error);

        res.status(400).json({

            ok: false,
            mensaje: 'No hay eventos que mostra.'
        });
    }
}

const crearEvento = async (req, res = response) => {

    // const { title, notes, start, end } = req.body;

    const evento = new Evento(req.body);

    try {

        //Viene del modelo evento (mongo).
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(200).json({

            ok: true,
            eventoGuardado,
            mensaje: 'El evento fue creado.'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({

            ok: false,
            mensaje: 'Hable con el administrador.'
        });
    }
}

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    //Esto viene del token.
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {

            return res.status(404).json({

                ok: false,
                mensaje: 'Evento no existe.'
            });

        }

        if (evento.user.toString() !== uid) {

            return res.status(401).json({

                ok: false,
                mensaje: 'No eres la persona que creo este evento, no puedes modificarlo.'
            });
        }

        const nuevoEvento = {

            //Propiedades de postman body: title, notes, start, end.
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(200).json({

            ok: true,
            mensaje: 'Evento actualizado.',
            eventoActualizado
        });

        //Es error que por que el formate del id de mongo supera los 12 bytes.
    } catch (error) {

        console.log(error);

        res.status(400).json({

            ok: false,
            mensaje: 'Hable con el administrador.'
        });
    }
}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    //Esto viene del token.
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!eventoId) {

            return res.status(400).json({

                ok: false,
                mensaje: 'Evento no existe.'
            });
        }

        if (evento.user.toString() !== uid) {

            return res.status(401).json({

                ok: false,
                mensaje: 'No eres la persona que creo este evento, no puedes eliminarlo.'
            });
        }

        const eliminarEvento = await Evento.findByIdAndDelete(eventoId);

        res.status(200).json({

            ok: true,
            mensaje: 'Evento eliminado.',
            eliminarEvento
        });

        //Es error que por que el formate del id de mongo supera los 12 bytes.
    } catch (error) {

        console.log(error);

        res.status(500).json({

            ok: false,
            mensaje: 'Hable con el administrador.'
        });
    }
}

module.exports = {

    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
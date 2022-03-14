const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {

        type: String,
        required: true
    },

    notes: {

        type: String
    },

    start: {

        type: Date,
        required: true
    },

    end: {

        type: Date,
        required: true
    },

    //Relacion con la entidad de usuario de mi base de datos.
    user: {

        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

/*
En el objeto de postman aparece dos propiedades "__v: 0" y ":id: asdasd4213asd",
a continuacion vamos a eliminar estas propiedades de postman.
*/

EventoSchema.method('toJSON', function () {

    const { __v, _id, ...object } = this.toObject();
    //Voy hacer un reemplazo
    object.id = _id;
    return object; //Ver los cambios en postman (visual).
});


module.exports = model('Evento', EventoSchema);
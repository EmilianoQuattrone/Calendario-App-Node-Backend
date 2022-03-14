const mongoose = require('mongoose');

const mongoDb = async () => {

    //Lo hago de esta manera por que en .env (no se el porque) no lee la cadena de conexion.
    const urlMongoDb = 'mongodb+srv://calendario-app:0arUndBBwvKeyi9Z@cluster0.ywi6a.mongodb.net/calendarioApp';

    try {

        await mongoose.connect(urlMongoDb);

        console.log('Base de datos conectada');

    } catch (error) {

        console.log(error);
        throw new Error('Error a la hora de inicializar base de datos.');
    }
}

module.exports = {

    mongoDb
}
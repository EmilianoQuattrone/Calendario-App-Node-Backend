const express = require('express');
const { mongoDb } = require('./database/confing');
const app = express();
const cors = require('cors');
require('dotenv').config();

//Base de datos.
mongoDb();

//CORS
app.use(cors());

//Esto es para levantar el directorio publico.
app.use(express.static('public'));

//Lectura y parceo del Body (Postman).
app.use(express.json());

//Rutas (auth, crear, login, renew(token)). CRUD = Eventos (front).
app.use('/api/auth', require('./routes/auth'));
app.use('/api/eventos', require('./routes/eventos'));

app.listen(process.env.PORT, () => {

    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});
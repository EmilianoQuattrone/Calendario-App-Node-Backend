const moment = require('moment');

const isDate = (value) => {

    // console.log(value) imprime todo lo que viene en la req.body ( title, start, end, path , location: body etc).
    if (!value) {

        return false
    }

    const fecha = moment(value);

    if (fecha.isValid()) {

        return true;

    } else {

        return false;
    }
}

module.exports = isDate;
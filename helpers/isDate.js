const moment = require('moment');

const isDate = (value, { req, location, path }) => {

    if (!value) {
        return false;
    }

    const fecha = moment(value)
    return (fecha) ? true : false;

}

module.exports = {
    isDate
}
const connection = require('../config/db')

class Localidad {
    constructor(data) {
        this.idLocalidad = data.idLocalidad;
        this.descripcionlocalidad = data.descripcionlocalidad;
        this.codigoPostal = data.codigoPostal;
        this.idProvincia = data.idProvincia;
    }

    /* static async getAllByCodigoPostal(codigoPostal) {
        let queryStr = 'SELECT * FROM `localidad` WHERE `CodigoPostal` = ?';
        let rows, fields;
        [rows, fields] = await pool.query(
            queryStr,
            [codigoPostal],
        );
        return rows;
    } */

    static async getAllByProvincia(idProvincia) {
        let queryStr = 'SELECT * FROM `localidad` WHERE `idProvincia` = ? ORDER BY descripcionlocalidad';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [idProvincia],
        );
        return rows;
    }

    static async findById(id) {
        let queryStr = 'SELECT * FROM `localidad` WHERE `idLocalidad` = ?';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [id],
        );
        if (rows.length > 0) {
            return new Localidad(rows[0]);
        }
    }
}

module.exports = Localidad

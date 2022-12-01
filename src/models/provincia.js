const connection = require('../config/db')

class Provincia {
    constructor(data) {
        this.idProvincia = data.idProvincia;
        this.descripcionProvincia = data.descripcionProvincia;
    }

    static async getAll() {
        let queryStr = 'SELECT * FROM `provincia`';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [],
        );
        return rows;
    }

    static async findById(id) {
        let queryStr = 'SELECT * FROM `provincia` WHERE `idProvincia` = ? ORDER BY descripcionProvincia';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [id],
        );
        if (rows.length > 0) {
            return new Provincia(rows[0]);
        }
    }
    
}

module.exports = Provincia

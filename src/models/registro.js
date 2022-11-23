const connection = require('../config/db')

class Registro {
    constructor(data) {
        this.id = data.id;
        this.usuario = data.usuario;
        this.email = data.email;
        this.password = data.password;
    }
    async create() {
        let queryStr = 'INSERT INTO `usuario` (`usuario`, `email`, `password`) VALUES (?,?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [this.usuario, this.email, this.password],
        );
        return result.insertId;
    }
}


module.exports = Registro;

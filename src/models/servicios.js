const connection = require('../config/db')


class Servicio {
    constructor(data) {
        this.Id_servicio_servicio = data.Id_servicio;
        this.fill(data);
    }

    fill(data) {
        this.Tipo = data?.Tipo;
    }

    static async getAll() {
        let queryStr = 'SELECT * FROM `servicio`';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [],
        );
        return rows;
    }

    static async find(id) {
        let queryStr = 'SELECT * FROM `servicio` WHERE `Id_servicio` = ?';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [id],
        );
        if (rows.length > 0) {
            return new Servicio(rows[0]);
        }
        return;
    }

    async delete() {
        if (this.Id_servicio == 0) {
            return false;
        } else {
            let queryStr = 'DELETE FROM `servicio` WHERE `Id_servicio` = ?';
            let result, fields;
            [result, fields] = await connection.query(
                queryStr,
                [this.Id_servicio],
            );
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
    }

    async save() {
        if (this.Id_servicio == undefined || this.Id_servicio == 0) {
            return this.create();
        } else {
            let queryStr = 'UPDATE `servicio` SET `Tipo` = ? WHERE `Id_servicio` = ?';
            let result, fields;
            [result, fields] = await connection.query(
                queryStr,
                [this.Tipo, this.Id_servicio],
            );
            this.Id_servicio = result.insertId;
            return this;
        }
    }

    async create() {
        let queryStr = 'INSERT INTO `servicio` (`Tipo`) VALUES (?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [this.Tipo],
        );
        this.Id_servicio = result.insertId;
        return this;
    }

    // static async createStatic(user) {
    //     let queryStr = 'INSERT INTO `servicio` (`email`, `password`) VALUES (?,?)';
    //     let result, fields;
    //     [result, fields] = await connection.query(
    //         queryStr,
    //         [user.email, user.password],
    //     );
    //     user.id = result.insertId;
    //     return user;
    // }
}

module.exports = Servicio;

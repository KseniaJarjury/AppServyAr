const connection = require('../config/db')


class Servicio {
    constructor(data) {
        this.id_servicio_servicio = data.id_servicio;
        this.fill(data);
    }

    fill(data) {
        this.tipo = data?.tipo;
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
        let queryStr = 'SELECT * FROM `servicio` WHERE `id_servicio` = ?';
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
            let queryStr = 'DELETE FROM `servicio` WHERE `id_servicio` = ?';
            let result, fields;
            [result, fields] = await connection.query(
                queryStr,
                [this.id_servicio],
            );
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
    }

    async save() {
        if (this.id_servicio == undefined || this.id_servicio == 0) {
            return this.create();
        } else {
            let queryStr = 'UPDATE `servicio` SET `tipo` = ? WHERE `id_servicio` = ?';
            let result, fields;
            [result, fields] = await connection.query(
                queryStr,
                [this.tipo, this.id_servicio],
            );
            this.id_servicio = result.insertId;
            return this;
        }
    }

    async create() {
        let queryStr = 'INSERT INTO `servicio` (`tipo`) VALUES (?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [this.tipo],
        );
        this.id_servicio = result.insertId;
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

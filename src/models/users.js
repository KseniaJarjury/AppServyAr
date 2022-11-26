const connection = require('../config/db')

const {
    hashPassword,
    checkPassword,
} = require('../config/hash');

class User {
    constructor(data) {
        this.id = data.id;
        this.fill(data);
    }

    fill(data) {
        this.email = data?.email;
        this.password = hashPassword(data?.password);
        this.usuario = data?.usuario;
        this.id = data?.id;
    }

    static async checkLogin(data) {
        let usuario = data.usuario;
        let password = data.password;
        if (usuario && password) {
            let queryStr = 'SELECT * FROM `usuario` WHERE `usuario` = ?';
            let rows, fields;
            [rows, fields] = await connection.query(
                queryStr,
                [usuario],
            );
            if (rows.length > 0) {
                if (checkPassword(password, rows[0].password)) {
                    return new User(rows[0]);
                }
            }

        }
        return;
    }

    static async getAll() {
        let queryStr = 'SELECT * FROM `usuario`';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [],
        );
        return rows;
    }

    static async find(id) {
        let queryStr = 'SELECT * FROM `usuario` WHERE `id` = ?';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [id],
        );
        if (rows.length > 0) {
            return new User(rows[0]);
        }
        return;
    }

    async delete() {
        if (this.id == 0) {
            return false;
        } else {
            let queryStr = 'DELETE FROM `usuario` WHERE `id` = ?';
            let result, fields;
            [result, fields] = await connection.query(
                queryStr,
                [this.id],
            );
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
    }

    async save() {
        if (this.id == 0) {
            return this.create();
        } else {
            let queryStr = 'UPDATE `usuario` SET `email` = ?, `password` = ? WHERE `id` = ?';
            let result, fields;
            [result, fields] = await connection.query(
                queryStr,
                [this.email, this.password, this.id],
            );
            this.id = result.insertId;
            return this;
        }
    }

    async create() {
        let queryStr = 'INSERT INTO `usuario` (`usuario`, `email`, `password`) VALUES (?,?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [this.usuario,this.email, this.password],
        );
        this.id = result.insertId;
        return this;
    }

    static async createStatic(user) {
        let queryStr = 'INSERT INTO `usuario` (`email`, `password`) VALUES (?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [user.usuario,user.email, user.password],
        );
        user.id = result.insertId;
        return user;
    }
}

module.exports = User;

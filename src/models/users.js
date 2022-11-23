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
        this.password = data?.password;
    }

    static async checkLogin(data) {
        let email = data.email;
        let password = data.password;
        if (email && password) {
            let queryStr = 'SELECT * FROM `users` WHERE `email` = ?';
            let rows, fields;
            [rows, fields] = await connection.query(
                queryStr,
                [email],
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
        let queryStr = 'SELECT * FROM `users`';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [],
        );
        return rows;
    }

    static async find(id) {
        let queryStr = 'SELECT * FROM `users` WHERE `id` = ?';
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
            let queryStr = 'DELETE FROM `users` WHERE `id` = ?';
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
            let queryStr = 'UPDATE `users` SET `email` = ?, `password` = ? WHERE `id` = ?';
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
        let queryStr = 'INSERT INTO `users` (`email`, `password`) VALUES (?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [this.email, this.password],
        );
        this.id = result.insertId;
        return this;
    }

    static async createStatic(user) {
        let queryStr = 'INSERT INTO `users` (`email`, `password`) VALUES (?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [user.email, user.password],
        );
        user.id = result.insertId;
        return user;
    }
}

module.exports = User;

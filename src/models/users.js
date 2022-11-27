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
        this.rol = data?.rol;
        this.urlFoto = data?.urlFoto;
        this.foto = data?.foto;
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
        let queryStr = 'INSERT INTO `usuario` (`usuario`, `email`, `password`, `rol`) VALUES (?,?,?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [this.usuario,this.email, this.password,"cliente"],
        );
        this.id = result.insertId;
        return this;
    }

    static async createWithGoogle(user) {
        let queryStr = 'INSERT INTO `usuario` (`usuario`,`email`, `password`, `urlFoto`, `rol`) VALUES (?,?,?,?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [user.usuario,user.email, user.password, user.urlFoto,"cliente"],
        );
        user.id = result.insertId;
        return user;
    }

    static async findByEmail(email) {
        let queryStr = 'SELECT * FROM `usuario` WHERE `Email` = ?';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [email],
        );
        if (rows.length > 0) {
            return new User(rows[0]);
        }
        return;
    }

    static async updateRol(rol,id){
        let queryStr = 'UPDATE `usuario` SET `rol` = ? WHERE `id` = ?';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [rol, id],
        );
        this.id = result.insertId;
        return this;
    }

    static async saveImg(id,img){
        let queryStr = 'UPDATE `usuario` SET `img` = ? WHERE `id` = ?';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [img, id],
        );
        this.id = result.insertId;
        return this;
    }

}

module.exports = User;

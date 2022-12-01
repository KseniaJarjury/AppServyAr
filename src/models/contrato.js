const connection = require('../config/db')


class Contrato {
    constructor(data) {
        this.id_propuesta = data.id_propuesta;
        this.id_estado = data.id_estado;
        this.fill(data);
    }

    fill(data) {
        this.id_oferente_p = data?.id_oferente_p;
    }

    fill(data) {
        this.id_cliente_p = data?.id_cliente_p;
    }

    fill(data) {
        this.fecha_inicio = data?.fecha_inicio;

    }

    fill(data) {
        
        this.fecha_fin = data?.fecha_fin;
        
    }

    fill(data) {
        this.monto_a_abonar = data?.monto_a_abonar;
    }

    

    fill(data) {
        this.estado_tipo = data?.estado_tipo;
    }


    static async getAll() {
        let queryStr = 'SELECT *  FROM `propuesta` LEFT JOIN `propuesta_estado` ON propuesta.id_propuesta = propuesta_estado.idPropuestaE LEFT JOIN `estado` ON propuesta_estado.idPropuestaE = estado.id_estado'
                let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [],
        );
        return rows;
    }

    static async find(id) {
        let queryStr = 'SELECT * FROM `propuesta` WHERE `Id_propuesta` = ?';
        let rows, fields;
        [rows, fields] = await connection.query(
            queryStr,
            [id],
        );
        if (rows.length > 0) {
            return new Propuesta(rows[0]);
        }
        return;
    }

    async delete() {
        if (this.Id_propuesta == 0) {
            return false;
        } else {
            let queryStr = 'DELETE FROM `propuesta` WHERE `Id_propuesta` = ?';
            let result, fields;
            [result, fields] = await connection.query(
                queryStr,
                [this.Id_propuesta],
            );
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
    }

    async save() {
        if (this.Id_propuesta == undefined || this.Id_propuesta == 0) {
            return this.create();
        } else {
            let queryStr = 'UPDATE `propuesta` SET `Fecha_Inicio` = ? WHERE `Id_propuesta` = ?';
            let result, fields;
            [result, fields] = await connection.query(
                queryStr,
                [this.Fecha_Inicio, this.Id_propuesta],
            );
            this.Id_propuesta = result.insertId;
            return this;
        }
    }

    async create() {
        let queryStr = 'INSERT INTO `propuesta` (`Fecha_Inicio`) VALUES (?,?)';
        let result, fields;
        [result, fields] = await connection.query(
            queryStr,
            [this.Fecha_Inicio],
        );
        this.Id_propuesta = result.insertId;
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

module.exports = Contrato;

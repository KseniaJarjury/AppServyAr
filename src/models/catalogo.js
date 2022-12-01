const connection = require('../config/db')
const moment = require('moment')

const Localidad = require('./localidad');
const Provincia = require('./provincia');

class Catalogo {
    constructor(data) {
        this.idcatalogo = data.idcatalogo;
        this.id_oferente_cat = data.id_oferente_cat;
        this.id_tipo_serv = data.id_tipo_serv;
        this.titulo = data.titulo;
        this.fecha_apertura = data.fecha_apertura ?? moment().format("YYYY-MM-DD");
        this.descripcion = data.descripcion;
        this.ruta_foto1 = data.ruta_foto1;
        this.ruta_foto2 = data.ruta_foto2;
        this.ruta_foto3 = data.ruta_foto3;
        this.ruta_foto4 = data.ruta_foto4;
        this.ruta_foto5 = data.ruta_foto5;
    }

    async save(connectionFrom) {

        let queryStr = 'INSERT INTO `catalogo` (`id_oferente_cat`, `id_tipo_serv`,`titulo`, `fecha_apertura`, `descripcion`, `ruta_foto1`, `ruta_foto2`, `ruta_foto3`, `ruta_foto4`, `ruta_foto5`) VALUES (?,?,?,NOW(),?,?,?,?,?,?)';
        let result, fields;
        [result, fields] = await connectionFrom.query(
            queryStr,
            [this.id_oferente_cat, this.id_tipo_serv, this.titulo, this.fecha_apertura, this.descripcion, this.ruta_foto1, this.ruta_foto2, this.ruta_foto3, this.ruta_foto4, this.ruta_foto5, moment(this.fecha).format("YYYY-MM-DD")],
        );
        this.Id = result.insertId;
        return this;

    }

}

module.exports = Catalogo

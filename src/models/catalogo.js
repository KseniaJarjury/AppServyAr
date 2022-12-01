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

    static async getAll(tipo = 1, titulo = "", palabrasClaves = "", fechaDesde="", fechaHasta="", provincia="", localidad="", conRecompensa="") {
        let queryStr = 'SELECT P.*, DU.*, L.Descripcion AS DescripcionLocalidad, PR.Descripcion AS DescripcionProvincia, FP.* FROM `publicaciones` P INNER JOIN `datosubicacion` DU ON P.Id = DU.IdPublicacion INNER JOIN `localidad` L ON DU.IdLocalidad = L.IdLocalidad INNER JOIN `provincia` PR ON L.IdProvincia = PR.IdProvincia INNER JOIN `fotospublicacion` FP ON P.Id = FP.IdPublicacion WHERE P.FechaDeBaja IS NULL AND P.IdTipoPublicacion = ?';
        let queryArray=[tipo]
        
        if(titulo != ""){
            queryStr += ' AND P.Titulo LIKE ?';
            queryArray.push(`%${titulo}%`)
        }

        if(palabrasClaves != ""){
            queryStr += ' AND P.PalabrasClaves LIKE ?';
            queryArray.push(`%${palabrasClaves}%`)
        }

        if(fechaDesde != ""){
            queryStr += ' AND P.Fecha >= ?';
            queryArray.push(fechaDesde)
        }

        if(fechaHasta != ""){
            queryStr += ' AND P.Fecha <= ?';
            queryArray.push(fechaHasta)
        }

        if(provincia != ""){
            queryStr += ' AND L.IdProvincia = ?';
            queryArray.push(provincia)
        }

        if(localidad != ""){
            queryStr += ' AND DU.IdLocalidad = ?';
            queryArray.push(localidad)
        }

        if(conRecompensa != ""){
            queryStr += ' AND P.OfreceRecompensa LIKE ?';
            queryArray.push(conRecompensa)
        }
        
        let rows, fields;
        [rows, fields] = await pool.query(
            queryStr,
            queryArray,
        );

        return mapearPublicaciones(rows)
    }

    static async getAllByUser(idUsuario, tipo) {
        let queryStr = 'SELECT P.*, DU.*, L.Descripcion AS DescripcionLocalidad, PR.Descripcion AS DescripcionProvincia, FP.* FROM `publicaciones` P INNER JOIN `datosubicacion` DU ON P.Id = DU.IdPublicacion INNER JOIN `localidad` L ON DU.IdLocalidad = L.IdLocalidad INNER JOIN `provincia` PR ON L.IdProvincia = PR.IdProvincia INNER JOIN `fotospublicacion` FP ON P.Id = FP.IdPublicacion WHERE P.FechaDeBaja IS NULL AND P.IdUsuario = ? AND P.IdTipoPublicacion = ?';
        let rows, fields;
        [rows, fields] = await pool.query(
            queryStr,
            [idUsuario, tipo],
        );

        return mapearPublicaciones(rows)
    }

    static async getById(idPublicacion) {
        let queryStr = 'SELECT P.*, DU.*, L.Descripcion AS DescripcionLocalidad, PR.Descripcion AS DescripcionProvincia, FP.*, PS.IdPregunta, PS.Descripcion AS DescripcionPregunta, RS.IdRespuesta, RS.Descripcion AS DescripcionRespuesta, RS.Correcta FROM `publicaciones` P INNER JOIN `datosubicacion` DU ON P.Id = DU.IdPublicacion INNER JOIN `localidad` L ON DU.IdLocalidad = L.IdLocalidad INNER JOIN `provincia` PR ON L.IdProvincia = PR.IdProvincia INNER JOIN `fotospublicacion` FP ON P.Id = FP.IdPublicacion LEFT JOIN `preguntaseguridad` PS ON P.Id = PS.IdPublicacion LEFT JOIN `respuestaseguridad` RS ON PS.IdPregunta = RS.IdPregunta WHERE P.FechaDeBaja IS NULL AND P.Id = ?';
        let rows, fields;
        [rows, fields] = await pool.query(
            queryStr,
            [idPublicacion],
        );

        //Si existe me va a devolver una lista de una sola posicion
        let resultado = mapearPublicaciones(rows)
        if(resultado.length > 0){
            let publicacion=resultado[0]

            return publicacion
        }else{
            return null
        }
    }

    async delete(){
        let queryStr = 'UPDATE `publicaciones` SET FechaDeBaja = now() WHERE FechaDeBaja IS NULL AND Id = ?';
        let rows, fields;
        [rows, fields] = await pool.query(
            queryStr,
            [this.Id],
        );
    }

    async finalizar(){
        let queryStr = 'UPDATE `publicaciones` SET Resuelta = 1 WHERE FechaDeBaja IS NULL AND Resuelta = 0 AND Id = ?';
        let rows, fields;
        [rows, fields] = await pool.query(
            queryStr,
            [this.Id],
        );
    }
}

module.exports = Catalogo


create table usuario(
	id int not null auto_increment,
	primary key (id_usuario) ,
	usuario varchar(100) not null,
	password varchar(100) not null,
	email varchar(100) not null,
	tel varchar(20) not null,
	ruta_foto varchar(500) not null,
	dni bigint not null,
	apellido varchar(100) not null,
	nombre varchar(100) not null,
	calle varchar(100) not null,
	numeral_calle int,
	cp int not null,
	provincia varchar(100)not null
);



create table denuncia(
	id_denuncia int not null auto_increment primary key,
    id_denunciante int not null,
	foreign key (id_denunciante)  references usuario(id_usuario),
    id_denunciado int not null,
	foreign key (id_denunciado) references usuario(id_usuario),
	descripcion varchar(500) not null
);




create table mensaje(
	id_mensaje int not null auto_increment primary key,
	id_origen int not null ,
	foreign key (id_origen) references usuario(id_usuario),
	id_destino int not null ,
    foreign key (id_destino) references usuario(id_usuario),
	descripcion varchar(1000) not null
);




create table oferente(
	id_oferente int not null auto_increment primary key,
	id_usuario_ofer int not null ,
    foreign key(id_usuario_ofer)  references usuario(id_usuario),
	tel_alter varchar(15) not  null
);



create table cliente(
	id_cliente int not null auto_increment primary key,
	id_usuario_client int not null,
    foreign key (id_usuario_client) references usuario(id_usuario)
);



create table servicio(
	id_servicio int not null auto_increment primary key,
	tipo varchar(70) not null
);



create table oferente_servicio(
	id_oferente_o_s int not null ,
    foreign key (id_oferente_o_s) references oferente(id_oferente),
	id_servicio_o_s int not null ,
    foreign key (id_servicio_o_s) references servicio(id_servicio),
	primary key(id_oferente_o_s, id_servicio_o_s)
);



create table catalogo_cabecera(
	id_cabecera int not null auto_increment primary key,
	id_oferente_cat int not null ,
    foreign key (id_oferente_cat) references oferente(id_oferente),
	fecha_apertura date not null
);



create table catalogo_detalle(
	id_detalle int not null auto_increment,
	id_cabecera_det int not null ,
    foreign key (id_cabecera_det) references catalogo_cabecera(id_cabecera),
	id_tipo_serv int not null,
	foreign key (id_tipo_serv) references servicio(id_servicio),
	descripcion varchar(800) not null,
	ruta_foto1 varchar(100),
	ruta_foto2 varchar(100),
	ruta_foto3 varchar(100),
	ruta_foto4 varchar(100),
	ruta_foto5 varchar(100),
	primary key(id_detalle, id_cabecera_det)
);


create table propuesta(
	id_propuesta int not null auto_increment primary key,
	id_oferente_p int not null ,
    foreign key (id_oferente_p) references oferente(id_oferente),
	id_cliente_p int not null ,
    foreign key (id_cliente_p) references cliente(id_cliente),
	fecha_inicio date not null,
	fecha_fin date not null,
	monto_a_abonar double not null
);



create table estado(
	id_estado int not null auto_increment primary key,
	tipo varchar(100) not null
);



create table propuesta_estado(
	idPropuestaE int not null ,
    foreign key (idPropuestaE) references propuesta(id_propuesta),
	id_estado_p_e int not null ,
    foreign key (idPropuestaE) references estado(id_estado),
	fecha date not null,
	primary key(idPropuestaE, id_estado_p_e)
);


/**DML**/

insert into usuario(usuario, password, 
					email, tel, ruta_foto, dni, apellido, nombre, calle, numeral_calle, cp, provincia) 
					values
					('user@1', 'admin1234', 'usuario1@gmail.com', '4245-6589', 'C:TPLAB2022FOTOSuser1.jpg', 10010010, 'Perez', 'Juan', 'LNAlem', 2560, 1890, 'Buenos Aires'),
					('user@2', 'admin1234', 'usuario2@gmail.com', '4780-0089', 'C:TPLAB2022FOTOSuser2.jpg', 20020002, 'Martinez', 'Jose', 'Azcuenaga', 1002, 1550, 'Caba'),
					('user@3', 'admin1234', 'usuario3@gmail.com', '4444-4444', 'C:TPLAB2022FOTOSuser3.jpg', 30000030, 'Marx', 'Carlos', 'Talcahuano', 102, 18000, 'Caba'),
					('user@4', 'admin1234', 'usuario6@gmail.com', '4222-0002', 'C:TPLAB2022FOTOSuser6.jpg', 70004007 , 'Simpson', 'Homero Jimeno', 'Av SiermpreViva', 1, 5620, 'Springfield'),
					('user@5', 'admin1234', 'usuario3@gmail.com', '4444-4444', 'C:TPLAB2022FOTOSuser3.jpg', 30000030, 'Marx', 'Carlos', 'Talcahuano', 102, 18000, 'Caba'),
					('user@6', 'admin1234', 'usuario6@gmail.com', '4222-0002', 'C:TPLAB2022FOTOSuser6.jpg', 70004007 , 'Simpson', 'Homero Jimeno', 'Av SiermpreViva', 1, 5620, 'Springfield');



insert into oferente(id_usuario_ofer, tel_alter) values
		(1,'5555-5555'),
		(2,'9999-9999'),
		(3,'4545-5454');



insert into cliente(id_usuario_client) values
		(4),
		(5),
		(6);



insert into servicio(tipo) values
		('Abogado/a'),
		('Albañil'),
		('Arquitecto/a'),
		('Belleza'),
		('Bienestar'),
		('Carpintero/a'),
		('Cocinero/a'),
		('Cuidador/ra de mascotas'),
		('Electricista');



insert into estado(tipo) values
		('Aceptado'),
		('Rechazado'),
		('Cancelado');




insert into catalogo_cabecera(id_oferente_cat, fecha_apertura) values
			(1, '2022-2-23'),
			(2, '2022-5-5');



insert into catalogo_detalle(id_cabecera_det, id_tipo_serv, descripcion ) values
			(1, 1, 'Soy el abogado mas bueno, contratame!!!!!!'),
			(2, 3, 'Soy el mejor arquitecto de la galaxia y contratame!!!');



insert into propuesta(id_oferente_p, id_cliente_p, fecha_inicio, fecha_fin, monto_a_abonar) values
					 (1, 1, '2022-05-12', '2022-07-07', 16456),
					 (2, 1, '2022-05-12', '2022-06-30', 15000),
					 (3, 2, '2022-08-08', '2023-01-19', 150000);



insert into propuesta_estado(idPropuestaE, id_estado_p_e, fecha) values
					  (1, 2, '2022-11-11'),
					  (2, 1, '2022-11-13');
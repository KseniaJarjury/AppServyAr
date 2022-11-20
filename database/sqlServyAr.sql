

create table Usuario(
	Id_usuario int not null auto_increment,
	primary key (Id_usuario) ,
	Nombre_usuario varchar(100) not null,
	Pass_usuario varchar(100) not null,
	Email varchar(100) not null,
	Tel varchar(20) not null,
	Ruta_foto varchar(500) not null,
	Dni bigint not null,
	Apellido varchar(100) not null,
	Nombre varchar(100) not null,
	Calle varchar(100) not null,
	Numeral_calle int,
	Cp int not null,
	Provincia varchar(100)not null
);



create table Denuncia(
	Id_denuncia int not null auto_increment primary key,
    Id_denunciante int not null,
	foreign key (Id_denunciante)  references Usuario(Id_usuario),
    Id_denunciado int not null,
	foreign key (Id_denunciado) references Usuario(Id_usuario),
	Descripcion varchar(500) not null
);




create table Mensaje(
	Id_mensaje int not null auto_increment primary key,
	Id_origen int not null ,
	foreign key (Id_origen) references Usuario(Id_usuario),
	Id_destino int not null ,
    foreign key (Id_destino) references Usuario(Id_usuario),
	Descripcion varchar(1000) not null
);




create table Oferente(
	Id_oferente int not null auto_increment primary key,
	Id_usuario_ofer int not null ,
    foreign key(Id_usuario_ofer)  references Usuario(Id_usuario),
	Tel_alter varchar(15) not  null
);



create table Cliente(
	Id_cliente int not null auto_increment primary key,
	Id_usuario_client int not null,
    foreign key (Id_usuario_client) references Usuario(Id_usuario)
);



create table Servicio(
	Id_servicio int not null auto_increment primary key,
	Tipo varchar(70) not null
);



create table Oferente_servicio(
	Id_oferente_o_s int not null ,
    foreign key (Id_oferente_o_s) references Oferente(Id_oferente),
	Id_servicio_o_s int not null ,
    foreign key (Id_servicio_o_s) references Servicio(Id_servicio),
	primary key(Id_oferente_o_s, Id_servicio_o_s)
);



create table Catalogo_cabecera(
	Id_cabecera int not null auto_increment primary key,
	Id_oferente_cat int not null ,
    foreign key (Id_oferente_cat) references Oferente(Id_oferente),
	Fecha_apertura date not null
);



create table Catalogo_detalle(
	Id_detalle int not null auto_increment,
	Id_cabecera_det int not null ,
    foreign key (Id_cabecera_det) references Catalogo_cabecera(Id_cabecera),
	Id_tipo_serv int not null,
	foreign key (Id_tipo_serv) references  Servicio(Id_servicio),
	Descripcion varchar(800) not null,
	Ruta_foto1 varchar(100),
	Ruta_foto2 varchar(100),
	Ruta_foto3 varchar(100),
	Ruta_foto4 varchar(100),
	Ruta_foto5 varchar(100),
	primary key(Id_detalle, Id_cabecera_det)
);


create table Propuesta(
	Id_propuesta int not null auto_increment primary key,
	Id_oferente_p int not null ,
    foreign key (Id_oferente_p) references Oferente(Id_oferente),
	Id_cliente_p int not null ,
    foreign key (Id_cliente_p) references Cliente(Id_cliente),
	Fecha_inicio date not null,
	Fecha_fin date not null,
	Monto_a_abonar double not null,
	Puntaje double
);



create table Estado(
	Id_estado int not null auto_increment primary key,
	Tipo varchar(100) not null
);



create table Propuesta_estado(
	Id_propuesta_p_e int not null ,
    foreign key (Id_propuesta_p_e) references Propuesta(Id_propuesta),
	Id_estado_p_e int not null ,
    foreign key (Id_estado_p_e) references Estado(Id_estado),
	Fecha date not null,
	primary key(Id_propuesta_p_E, Id_estado_p_e)
);


/**DML**/

insert into Usuario(Nombre_usuario, Pass_usuario, 
					Email, Tel, Ruta_foto, Dni, Apellido, Nombre, Calle, Numeral_calle, Cp, Provincia) 
					values
					('user@1', 'admin1234', 'usuario1@gmail.com', '4245-6589', 'C:TPLAB2022FOTOSuser1.jpg', 10010010, 'Perez', 'Juan', 'LNAlem', 2560, 1890, 'Buenos Aires'),
					('user@1', 'admin1234', 'usuario1@gmail.com', '4245-6589', 'C:TPLAB2022FOTOSuser1.jpg', 10010010, 'Perez', 'Juan', 'LNAlem', 2560, 1890, 'Buenos Aires'),
					('user@1', 'admin1234', 'usuario1@gmail.com', '4245-6589', 'C:TPLAB2022FOTOSuser1.jpg', 10010010, 'Perez', 'Juan', 'LNAlem', 2560, 1890, 'Buenos Aires'),
					('user@2', 'admin5689', 'usuario2@gmail.com', '4780-0089', 'C:TPLAB2022FOTOSuser2.jpg', 20020002, 'Martinez', 'Jos�', 'Azcuenaga', 1002, 1550, 'Caba'),
					('user@3', 'admin1001', 'usuario3@gmail.com', '4444-4444', 'C:TPLAB2022FOTOSuser3.jpg', 30000030, 'Marx', 'Carlos', 'Talcahuano', 102, 18000, 'Caba'),
					('user@4', 'admin1111', 'usuario4@gmail.com', '4200-2002', 'C:TPLAB2022FOTOSuser4.jpg', 40004004, 'Garc�a', 'Jerem�as', 'San Jos�', 6548, 1001, 'Caba'),
					('user@5', 'admin2222', 'usuario5@gmail.com', '4111-6589', 'C:TPLAB2022FOTOSuser5.jpg', 50005005, 'Plant', 'Robert', 'Av San Mart�n', 1245, 2222, 'caba'),
					('user@6', 'admin0000', 'usuario6@gmail.com', '4222-0002', 'C:TPLAB2022FOTOSuser6.jpg', 70004007 , 'Simpson', 'Homero Jimeno', 'Av SiermpreViva', 1, 5620, 'Springfield');



insert into Oferente(Id_usuario_ofer, Tel_alter) values
		(1,'5555-5555'),
		(2,'9999-9999'),
		(3,'4545-5454');



insert into Cliente(Id_usuario_client) values
		(4),
		(5),
		(6);



insert into Servicio(Tipo) values
		('Abogado/a'),
		('Albañil'),
		('Arquitecto/a'),
		('Belleza'),
		('Bienestar'),
		('Carpintero/a'),
		('Cocinero/a'),
		('Cuidador/ra de mascotas'),
		('Electricista');



insert into Estado(Tipo) values
		('Aceptado'),
		('Rechazado'),
		('Cancelado');




insert into Catalogo_cabecera(Id_oferente_cat, Fecha_apertura) values
			(1, '2022-2-23'),
			(2, '2022-5-5');



insert into Catalogo_detalle(Id_cabecera_det, Id_tipo_serv, Descripcion ) values
			(1, 1, 'Soy el abogado m�s abogado de todos, contratame!!!!!!'),
			(2, 3, 'Soy el mejor arquitecto de la galaxia y contratame!!!');



insert into Propuesta(Id_oferente_p, Id_cliente_p, Fecha_inicio, Fecha_fin, Monto_a_abonar, Puntaje) values
					 (1, 1, '2022-05-12', '2022-07-07', 16456, 0),
					 (2, 1, '2022-05-12', '2022-06-30', 15000, 0),
					 (3, 2, '2022-08-08', '2023-01-19', 150000, 0);



insert into Propuesta_estado(Id_propuesta_p_e, Id_estado_p_e, Fecha) values
					  (1, 2, '2022-11-11'),
					  (2, 1, '2022-11-13');
drop database dbmarisa;
create database dbMarisa;

use dbMarisa;

create table Person( #persona
idPerson int auto_increment primary key not null,
name varchar(50) not null,
lastName varchar(50) not null,
motherLastName varchar(50) not null,
cell varchar(15) null,
city varchar(20) null,
address varchar(100)null,
dateRegister datetime not null
);

create table User( #usuarios
idUser  int auto_increment primary key not null,
email varchar(50) not null unique,
password varchar(255)not null,
idPerson int not null,
foreign key (idPerson) references Person(idPerson) on delete cascade

);


create table Rol( #roles
idRol int auto_increment primary key not null,
nameRol varchar(20) not null default 'Cliente',
idUser int not null,
foreign key (idUser) references User(idUser) on delete cascade
);
create table Customer( #cliente
idCustumer int auto_increment primary key not null,
idPerson int not null,
foreign key (idPerson) references Person(idPerson)
);

create table Orderr( #pedido
idOrder int auto_increment primary key not null,
state tinyint not null default 0,
dateOrderHour  datetime,
idCustumer int not null,
foreign key (idCustumer) references Customer(idCustumer)
);



create table Category(
idCategory int auto_increment primary key not null,
nameCategory varchar(50)
);
create table Product(
idProduct int auto_increment primary key not null,
nameProduct varchar(100) not null,
modelProduct varchar(100) not null,
description varchar(255)not null,
image varchar(255) not null,
amount int check(amount > 0),
price decimal not null,
date datetime not null,
size varchar(10)null,
color varchar(20)null,
outstanding tinyint not null default 0,
idCategory int not null,
foreign key(idCategory) references Category(idCategory)
);

create table ProductDetail(
idProductDetail int auto_increment primary key not null,
idProduct int not null,
idOrder int not null,
amount  int not null,
total decimal not null,
foreign key (idOrder) references Orderr(idOrder),
foreign key (idProduct) references Product(idProduct)
);



create table InformationCompany(
idInformationCompany int not null auto_increment primary key,
mission varchar(255) null,
vision varchar(255) null

);

//triggerss

 delimiter //
CREATE TRIGGER ActualizarDetalleVenta AFTER INSERT ON productdetail
FOR EACH ROW
begin
	set @cantidad = new.amount;
    set @idProdcuto=new.idProduct;
    UPDATE product SET amount = amount - @cantidad
    WHERE idProduct =  @idProdcuto;

end; //
delimiter ;


#vistas
create view VerifyUser as select Person.idPerson,Person.name, Person.motherLastName,User.email, User.password, Rol.nameRol from Person inner join User on Person.idPerson=User.idPerson inner join Rol on User.idUser=Rol.idUser;
create view FeaturedProduct as select * from Product where outstanding = 1;
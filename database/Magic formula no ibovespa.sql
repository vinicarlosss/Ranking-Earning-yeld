begin;
create schema formula_magica;
use formula_magica;

create table Empresa(
	ticker varchar(10) not null,
    nome_empresa varchar(45),
	ebit decimal not null,
    valor_mercado decimal not null,
    divida_liquida decimal not null,
    primary key(ticker));

create table ranking(
	ticker varchar(10) not null,
	earning_yeld double not null,
	primary key(ticker));



alter table ranking

add foreign key(ticker) references Empresa(ticker) ON UPDATE cascade on delete cascade;

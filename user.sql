drop database if exists discordv2;
create database discordv2;

use discordv2;

create table user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100),
  password VARCHAR(95),
  pseudo VARCHAR(95) NULL,
  bio VARCHAR(500) NULL,
  image_path text NULL,
);
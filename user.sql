drop database if exists discordv2;
create database discordv2;

use discordv2;

create table user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100),
  password VARCHAR(95)
);
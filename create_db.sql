CREATE DATABASE recipebook;
USE recipebook;
CREATE TABLE newuser (id INT AUTO_INCREMENT,firstname VARCHAR(50),lastname VARCHAR(50),email VARCHAR(100),username VARCHAR(100),hashedpassword VARCHAR(100),PRIMARY KEY(id));
CREATE TABLE nutridata (id INT AUTO_INCREMENT,username VARCHAR(100),foodprod VARCHAR(50),typicalvalue DECIMAL(5,2) unsigned, unit VARCHAR(100),carbs DECIMAL(5,2) unsigned,
fat DECIMAL(5,2) unsigned, protein DECIMAL(5,2) unsigned, salt DECIMAL(5,2) unsigned, Sugar DECIMAL(5,2) unsigned, PRIMARY KEY(id));
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';
GRANT ALL PRIVILEGES ON myBookshop.* TO 'appuser'@'localhost';

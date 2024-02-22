Para que este proyecto funcione tienes que crear con PHPmyAdmin en tu base de datos SQL o tecnología similar los siguientes comandos: 

create database misc;
GRANT ALL ON misc.* TO 'mike'@'localhost' IDENTIFIED BY 'Michael';
GRANT ALL ON misc.* TO 'mike'@'127.0.0.1' IDENTIFIED BY 'Michael';




//===============VERSION 3 ===================================

PARA LA VERSION 3 DEL CRUD QUE INCLUYE TECNOLOGIAS PHP, SQL, JAVASCRIPT y JQUERY se debe añadir los siguiente comandos SQL en tu base de datos: 

CREATE TABLE Position (
  position_id INTEGER NOT NULL AUTO_INCREMENT,
  profile_id INTEGER,
  rank INTEGER,
  year INTEGER,
  description TEXT,
  PRIMARY KEY(position_id),
  CONSTRAINT position_ibfk_1
    FOREIGN KEY (profile_id)
    REFERENCES Profile (profile_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

//================ VERSION 4.0 =============================

PARA LA VERSION 4 HAY QUE HACER LA SIGUIENTE CONFIGURACIÓN EN TU BASE DE DATOS

CREATE TABLE Institution (
  institution_id INTEGER NOT NULL KEY AUTO_INCREMENT,
  name VARCHAR(255),
  UNIQUE(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE Education (
  profile_id INTEGER,
  institution_id INTEGER,
  rank INTEGER,
  year INTEGER,
  CONSTRAINT education_ibfk_1
    FOREIGN KEY (profile_id)
    REFERENCES Profile (profile_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT education_ibfk_2
    FOREIGN KEY (institution_id)
    REFERENCES Institution (institution_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY(profile_id, institution_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
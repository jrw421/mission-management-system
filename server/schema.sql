DROP DATABASE IF EXISTS mission_management;

CREATE DATABASE mission_management;

USE mission_management;

CREATE TABLE superhero_villian (
  id int NOT NULL AUTO_INCREMENT,
  name TEXT,
  slug TEXT,
  alignment TEXT,
  image TEXT,
  rawJSON TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE superhero_powerstats (
  superhero_id INT NOT NULL AUTO_INCREMENT,
  intelligence VARCHAR(50),
  strength VARCHAR(50),
  speed VARCHAR(50),
  durability VARCHAR(50),
  power VARCHAR(50),
  combat VARCHAR(50),
  PRIMARY KEY (superhero_id),
  FOREIGN KEY (superhero_id) REFERENCES superhero_villian(id)
);


CREATE TABLE villian_powerstats (
  villian_id INT NOT NULL AUTO_INCREMENT,
  intelligence VARCHAR(50),
  strength VARCHAR(50),
  speed VARCHAR(50),
  durability VARCHAR(50),
  power VARCHAR(50),
  combat VARCHAR(50),
  PRIMARY KEY (villian_id),
  FOREIGN KEY (villian_id) REFERENCES superhero_villian(id)
);

/**

The tables below are structured so as to organize the data in as clean a way as possible. 
Given the time constraints, I opted to send the remaining data as a JSONstore in the table.
Given more resources and time, I believe the best course of action would be to populate the tables 
below with the data from the JSON.

*/

-- CREATE TABLE superhero (
--   id int NOT NULL AUTO_INCREMENT,
--   name TEXT,
--   slug TEXT,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE superhero_appearance (
--   superhero_id INT,
--   id INT,
--   gender TEXT,
--   race TEXT,
--   eyeColor TEXT,
--   hairColor TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (superhero_id) REFERENCES superhero(id)
-- );

-- CREATE TABLE superhero_appearance_height (
--   superhero_appearance_id INT,
--   id INT,
--   value TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (superhero_appearance_id) REFERENCES superhero_appearance(id)
-- );

-- CREATE TABLE superhero_appearance_weight (
--   superhero_appearance_id INT,
--   id INT,
--   value TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (superhero_appearance_id) REFERENCES superhero_appearance(id)
-- );

-- CREATE TABLE superhero_biography (
--   superhero_id INT,
--   id INT,
--   fullName TEXT,
--   alterEgos TEXT,
--   placeOfBirth TEXT,
--   firstAppearance TIMESTAMP,
--   publisher TEXT,
--   alignment TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (superhero_id) REFERENCES superhero(id)
-- );

-- CREATE TABLE superhero_biography_aliases (
--   superhero_biography_id INT,
--   id INT,
--   value TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (superhero_biography_id) REFERENCES superhero_biography(id)
-- );

-- CREATE TABLE superhero_work (
--   superhero_id INT,
--   id INT,
--   occupation TEXT,
--   base TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (superhero_id) REFERENCES superhero(id)
-- );

-- CREATE TABLE superhero_connections (
--   superhero_id INT,
--   id INT,
--   groupAffiliation TEXT,
--   relatives TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (superhero_id) REFERENCES superhero(id)
-- );

-- CREATE TABLE superhero_images (
--   superhero_id INT,
--   id INT,
--   xs TEXT,
--   sm TEXT,
--   md TEXT,
--   lg TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (superhero_id) REFERENCES superhero(id)
-- );

-- CREATE TABLE villian (
--   id int NOT NULL AUTO_INCREMENT,
--   name TEXT,
--   slug TEXT,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE villian_appearance (
--   villian_id INT,
--   id INT,
--   gender TEXT,
--   race TEXT,
--   eyeColor TEXT,
--   hairColor TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (villian_id) REFERENCES villian(id)
-- );

-- CREATE TABLE villian_appearance_height (
--   villian_appearance_id INT,
--   id INT,
--   value TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (villian_appearance_id) REFERENCES villian_appearance(id)
-- );

-- CREATE TABLE villian_appearance_weight (
--   villian_appearance_id INT,
--   id INT,
--   value TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (villian_appearance_id) REFERENCES villian_appearance(id)
-- );

-- CREATE TABLE villian_biography (
--   villian_id INT,
--   id INT,
--   fullName TEXT,
--   alterEgos TEXT,
--   placeOfBirth TEXT,
--   firstAppearance TEXT,
--   publisher TEXT,
--   alignment TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (villian_id) REFERENCES villian(id)
-- );

-- CREATE TABLE villian_biography_aliases (
--   villian_biography_id INT,
--   id INT,
--   value TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (villian_biography_id) REFERENCES villian_biography(id)
-- );

-- CREATE TABLE villian_work (
--   villian_id INT,
--   id INT,
--   occupation TEXT,
--   base TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (villian_id) REFERENCES villian(id)
-- );

-- CREATE TABLE villian_connections (
--   villian_id INT,
--   id INT,
--   groupAffiliation TEXT,
--   relatives TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (villian_id) REFERENCES villian(id)
-- );

-- CREATE TABLE villian_images (
--   villian_id INT,
--   id INT,
--   xs TEXT,
--   sm TEXT,
--   md TEXT,
--   lg TEXT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (villian_id) REFERENCES villian(id)
-- );

/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/

CREATE TABLE IF NOT EXISTS `whitecode`.`company`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL, 
    `email` VARCHAR(255) NOT NULL,
    `fantasy_name` VARCHAR(255) NOT NULL, 
    `social_name` VARCHAR(255) NOT NULL, 
    `cnpj` VARCHAR(255) NOT NULL, 
    `plan` VARCHAR(255) NOT NULL,
    `admin_user` INT NOT NULL
);
CREATE TABLE IF NOT EXISTS `whitecode`.`types_persons`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `whitecode`.`person`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `telephone` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `document` VARCHAR(25) NOT NULL UNIQUE,
    `document_type` ENUM('cpf','cnpj') DEFAULT 'cpf',
    `type_person` VARCHAR(255) NOT NULL,
    `token_forgoutpassowrd` VARCHAR(255),
    `datetoken_forgoutpassowd` DATETIME,
    `create_at` DATETIME DEFAULT current_timestamp()
);

CREATE TABLE IF NOT EXISTS `whitecode`.`address`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `street` VARCHAR(255) NOT NULL,
    `number` VARCHAR(10) NOT NULL,
    `neighborhood` VARCHAR(255) NOT NULL,
    `city`VARCHAR(255) NOT NULL DEFAULT 'Cariacica',
    `state`VARCHAR(255) NOT NULL DEFAULT 'Espirito Santo',
    `country` VARCHAR(255) NOT NULL DEFAULT 'Brasil',
    `person_id` INT NOT NULL,
    `create_at` DATETIME DEFAULT current_timestamp(),
    FOREIGN KEY (`person_id`) REFERENCES `person`(`id`)
);

CREATE TABLE IF NOT EXISTS `whitecode`.`computer`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `person_id` INT NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `marking` VARCHAR(255) NOT NULL,
    `serial_number` VARCHAR(255) NOT NULL,
    `type` ENUM('PC', 'SMARTPHONE', 'NOTEBOOK', 'TABLE', 'ALL IN ONE') DEFAULT 'PC',
    `delete` ENUM('0','1') DEFAULT '0',
    `create_at` DATETIME DEFAULT current_timestamp(),
    FOREIGN KEY (`person_id`) REFERENCES `person`(`id`)
);

CREATE TABLE IF NOT EXISTS `whitecode`.`parts`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `computer_id`INT NOT NULL,
    `person_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `amount` INT NOT NULL,
    `description` TEXT NOT NULL , 
    `create_at` DATETIME DEFAULT current_timestamp(),
    FOREIGN KEY (`computer_id`) REFERENCES `computer`(`id`),
    FOREIGN KEY (`person_id`) REFERENCES `person`(`id`)
);

CREATE TABLE IF NOT EXISTS `whitecode`.`support`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(255) NOT NULL UNIQUE,
    `computer_id`INT NOT NULL,
    `person_id` INT NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('Em processo', 'Aguardando Resposta', 'Finalizado', 'Aguardando Peça', 'Em Curso') DEFAULT 'Em Processo',
    `create_at` DATETIME DEFAULT current_timestamp(),
    FOREIGN KEY (`computer_id`) REFERENCES `computer`(`id`),
    FOREIGN KEY (`person_id`) REFERENCES `person`(`id`)
);

CREATE TABLE IF NOT EXISTS `whitecode`.`attendance`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `protocol` VARCHAR(255) NOT NULL UNIQUE,
    `person_id` INT NOT NULL,
    `description` TEXT NOT NULL,
    `create_at` DATETIME DEFAULT CURRENT_TIMESTAMP(),
    FOREIGN KEY (`person_id`) REFERENCES `person`(`id`)
);


CREATE TABLE IF NOT EXISTS `whitecode`.`token_person`(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `token` VARCHAR(255) NOT NULL,
    `date_token` DATETIME
);

CREATE TABLE IF NOT EXISTS `whitecode`.`person_token` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `token` VARCHAR(255) NOT NULL UNIQUE,
    `valid` DATETIME NOT NULL,
    `person_id` INT,
    FOREIGN KEY (person_id) REFERENCES person(id)
);
ALTER TABLE `whitecode`.`person_token` 
CHANGE COLUMN `valid` `valid` BIGINT NOT NULL ;

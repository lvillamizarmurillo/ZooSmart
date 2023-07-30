CREATE DATABASE IF NOT EXISTS ZooSmart;

USE ZooSmart;

CREATE TABLE IF NOT EXISTS users(
    user_id INT(10) UNSIGNED NOT NULL PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    numero VARCHAR(20),
    password VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS animales(
    animal_id INT(10) UNSIGNED NOT NULL PRIMARY KEY,
    nombre VARCHAR(50),
    especie VARCHAR(50),
    edad INT(3),
    estado BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS publicaciones(
    post_id INT(10) UNSIGNED NOT NULL PRIMARY KEY,
    user_id INT(10) UNSIGNED, FOREIGN KEY (user_id) REFERENCES users(user_id),
    titulo VARCHAR(255),
    descripcion TEXT,
    imagen_ruta VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL,
    animal_id INT(10) UNSIGNED UNIQUE, FOREIGN KEY (animal_id) REFERENCES animales(animal_id)
);

CREATE TABLE IF NOT EXISTS me_gusta(
    like_id INT(10) UNSIGNED NOT NULL PRIMARY KEY,
    post_id INT(10) UNSIGNED, FOREIGN KEY (post_id) REFERENCES publicaciones(post_id),
    estado BOOLEAN NOT NULL,
    fecha_like TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS pais(
    pais_id INT(10) UNSIGNED NOT NULL PRIMARY KEY,
    post_id INT(10) UNSIGNED, FOREIGN KEY (post_id) REFERENCES publicaciones(post_id),
    nombre_pais VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS ciudad(
    ciudad_id INT(10) UNSIGNED NOT NULL PRIMARY KEY,
    pais_id INT(10) UNSIGNED, FOREIGN KEY (pais_id) REFERENCES pais(pais_id),
    nombre_pais VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS mensajes(
    mensajes_id INT(10) UNSIGNED NOT NULL PRIMARY KEY,
    enviado_id INT(10) UNSIGNED, FOREIGN KEY (enviado_id) REFERENCES users(user_id),
    recibido_id INT(10) UNSIGNED, FOREIGN KEY (recibido_id) REFERENCES users(user_id),
    contenido TEXT,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contactos(
    contacto_id INT(10) UNSIGNED NOT NULL PRIMARY KEY,
    user_id INT(10) UNSIGNED, FOREIGN KEY (user_id) REFERENCES users(user_id),
    contact_user_id INT(10) UNSIGNED, FOREIGN KEY (contact_user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS perfil(
    perfil_id INT(10) UNSIGNED NOT NULL PRIMARY KEY,
    user_id INT(10) UNSIGNED, FOREIGN KEY (user_id) REFERENCES users(user_id),
    biografia TEXT
);

INSERT INTO users (user_id, nombre, email, numero, password) VALUES
(1, 'Gabriel', 'colombiano@gmail.com', '321564561', 'password1'),
(2, 'J.K.', 'juan.perez@example.com', '31285548841', 'password2'),
(3, 'Stephen', 'maria.gomez@example.com', '32165198', 'password3'),
(4, 'Isabel', 'chileno@gmail.com', '312561518', 'password4'),
(5, 'Haruki', 'japonés@gmail.com', '3218484815', 'password5'),
(6, 'Jane', 'pedro.lopez@example.com', '3181891511', 'password6'),
(7, 'Ernest', 'estadounidense@gmail.com', '31518915157', 'password7'),
(8, 'Mario', 'peruano@gmail.com', '3181123115', 'password8'),
(9, 'Emily', 'britanico@gmail.com', '31812652894', 'password9'),
(10, 'Leo', 'ruso@gmail.com', '23156181515', 'password10');

INSERT INTO animales (animal_id, nombre, especie, edad, estado) VALUES
(1,'perro', 'canino', '12', true),
(2,'gato', 'gatuno', '13', false),
(3,'canario', 'ave', '15', true),
(4,'capullo', 'champiras', '5', false),
(5,'semental', 'tolgota', '8', true),
(6,'Loro', 'mishubishi', '7', true),
(7,'Champiñon', 'nokia', '8', true),
(8,'michi', 'terreneitor', '12', true),
(9,'tamarindo', 'empanadas', '2', true),
(12,'chimpance', 'sopadomacaco', '6', true),
(10,'camionero', 'trenalsur', '23', true);

INSERT INTO publicaciones (post_id, user_id, titulo, descripcion, imagen_ruta, estado, animal_id) VALUES
(35, 1, 'Rico o pobre', 'asdfasdfsadfsdf', 'http://imagen/ruta1', true,1),
(85, 2, 'bitcoin', 'dsgdsfgfdsgfdsdfsg', 'http://imagen/ruta2', false,2),
(87, 3, 'el tiempo', 'dsfgdfgsdfgfdgsd', 'http://imagen/ruta3', true,3),
(84, 4, 'Quiubo', 'sdfgfsdgdfsgdfsgd', 'http://imagen/ruta4', false,4),
(25, 5, 'Caracol', 'sdfgsdgfsdgsdfgs', 'http://imagen/ruta5', true,5),
(98, 6, 'La voz kids', 'sdfgdsfgsdfgsdfgsdf', 'http://imagen/ruta6', true,6),
(36, 7, 'Master cheff', 'dfsgfdsgfdsgsdfgd', 'http://imagen/ruta7', true,7),
(74, 8, 'Perro pulgoso', 'psdfgdfgertwtwert', 'http://imagen/ruta8', true,8),
(12, 9, 'Kamusari', 'hgfhjghjfhjfgjhfghj', 'http://imagen/ruta9', true,9),
(96, 10, 'Dinamarca', 'jhñlkhklhjjfgsfdsaf', 'http://imagen/ruta10', true,12),
(99, 3, 'Venezuela', 'yurtuityiuytiyu', 'http://imagen/ruta11', true,10);


INSERT INTO me_gusta (like_id, post_id, estado) VALUES
(1, 35, true),
(2,85, false),
(3,87, true),
(4,84, false),
(5,25, true),
(6,98, true),
(7,36, true);

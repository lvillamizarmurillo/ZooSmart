CREATE DATABASE IF NOT EXISTS ZooSmart;

USE ZooSmart;

CREATE TABLE IF NOT EXISTS users(
    user_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    numero VARCHAR(20),
    password VARCHAR(20),
    fecha_registro DATE
);

CREATE TABLE IF NOT EXISTS publicaciones(
    post_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED, FOREIGN KEY (user_id) REFERENCES users(user_id),
    titulo VARCHAR(255),
    descripcion TEXT,
    imagen_ruta VARCHAR(255),
    fecha_creacion DATE,
    ubicacion_animal BIGINT(20) UNSIGNED
);

CREATE TABLE IF NOT EXISTS animales(
    animal_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED, FOREIGN KEY (user_id) REFERENCES users(user_id),
    post_id BIGINT(20) UNSIGNED, FOREIGN KEY (post_id) REFERENCES publicaciones(post_id),
    nombre VARCHAR(50),
    especie VARCHAR(50),
    edad INT(3)
);

CREATE TABLE IF NOT EXISTS me_gusta(
    like_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED, FOREIGN KEY (user_id) REFERENCES users(user_id),
    post_id BIGINT(20) UNSIGNED, FOREIGN KEY (post_id) REFERENCES publicaciones(post_id),
    fecha_like DATE
);

CREATE TABLE IF NOT EXISTS pais(
    pais_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    post_id BIGINT(20) UNSIGNED, FOREIGN KEY (post_id) REFERENCES publicaciones(post_id),
    nombre_pais VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS ciudad(
    ciudad_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    pais_id BIGINT(20) UNSIGNED, FOREIGN KEY (pais_id) REFERENCES pais(pais_id),
    nombre_pais VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS mensajes(
    mensajes_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    enviado_id BIGINT(20) UNSIGNED, FOREIGN KEY (enviado_id) REFERENCES users(user_id),
    recibido_id BIGINT(20) UNSIGNED, FOREIGN KEY (recibido_id) REFERENCES users(user_id),
    contenido TEXT,
    fecha_envio DATE
);

CREATE TABLE IF NOT EXISTS contactos(
    contacto_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED, FOREIGN KEY (user_id) REFERENCES users(user_id),
    contact_user_id BIGINT(20) UNSIGNED, FOREIGN KEY (contact_user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS perfil(
    perfil_id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED, FOREIGN KEY (user_id) REFERENCES users(user_id),
    biografia TEXT
);
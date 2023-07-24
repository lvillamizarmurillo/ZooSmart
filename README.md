# ZooSmart

ZooSmart es una plataforma en línea diseñada para conectar a personas interesadas en la adopción de animales y facilitar el proceso de búsqueda y contacto entre adoptantes y dueños de mascotas.

En ZooSmart, los usuarios pueden registrarse y crear perfiles donde pueden subir fotos y detalles de animales disponibles para adopción, se incluye el estado del animal y los requisitos que la persona interesada en adoptar debe cumplir. Los usuarios también pueden interactuar con las publicaciones de otros usuarios, expresando interés mediante la función de "me gusta".

Cuando un usuario da "me gusta" a una publicación, se habilita la opción de contacto con el dueño de la mascota. Esto permite establecer comunicación directa entre ambos, facilitando la coordinación y negociación de la adopción.

ZooSmart es un espacio seguro y amigable donde los amantes de los animales pueden encontrar compañeros peludos en busca de un hogar amoroso. Además, fomenta la interacción entre usuarios para compartir consejos, experiencias y promover el bienestar animal.

## Características

- Registro de usuarios y creación de perfiles.
- Subida de fotos y detalles de animales para adopción.
- Interacción mediante la función de "me gusta" en las publicaciones.
- Habilitación de contacto entre usuarios que han dado "me gusta" a una publicación.

## Tecnologías utilizadas

- Lenguajes: JavaScript
- Backend: Node.js, Express.js
- Base de datos: MySQL
- Otras tecnologías y bibliotecas relevantes

## Requisitos Previos

- Node.js instalado en el entorno local.
- Base de datos MySQL configurada y accesible.

## Licencia

- Este proyecto está bajo la Licencia LTS.

## Contacto

- Para cualquier pregunta o consulta, no dudes en contactarme al siguiente correo: lvillamizarmurillo@gmail.com

## Tablas

1. Tabla de usuarios:

   - Relacionada con la tabla de publicaciones y la tabla de me gusta mediante el ID de usuario.
   - Cada usuario puede tener múltiples publicaciones y recibir múltiples me gusta.
   - Puede tener una relación con la tabla de mensajes para permitir la comunicación entre usuarios.

2. Tabla de publicaciones:

   - Relacionada con la tabla de usuarios mediante el ID de usuario.
   - Cada publicación pertenece a un usuario específico.
   - Puede tener una relación con la tabla de me gusta para registrar los me gusta recibidos.

3. Tabla de perfiles de usuarios:

   - Contiene información adicional de los perfiles de los usuarios registrados.
   - profile_id, user_id, información adicional del perfil (ubicación, biografía, etc.).
   - Esta tabla permite a los usuarios proporcionar detalles adicionales sobre sí mismos en sus perfiles.

4. Tabla de me gusta:

   - Relacionada con la tabla de usuarios y la tabla de publicaciones mediante el ID de usuario y el ID de publicación.
   - Registra qué usuarios han dado me gusta a qué publicaciones.

5. Tabla de mensajes:

   - Relacionada con la tabla de usuarios mediante el ID de remitente y el ID de destinatario.
   - Almacena los mensajes enviados entre usuarios.

6. Tabla de contactos:

   - Relacionada con la tabla de usuarios mediante el ID de usuario y el ID de usuario de contacto.
   - Permite a los usuarios guardar y mantener una lista de contactos.

7. Tabla de animales:

   - Descripción: Almacena información específica sobre los animales disponibles para adopción en la plataforma.
   - Columnas sugeridas: animal_id, user_id, nombre del animal, especie, edad, descripción, imagen.
   - Esta tabla proporciona detalles clave sobre cada animal, como nombre, especie, edad y descripción, lo que ayuda a los usuarios a encontrar la mascota adecuada para su adopción.

8. Tabla de países:

   - Descripción: Almacena información sobre los países disponibles en la plataforma.
   - Columnas sugeridas: id_pais (clave primaria), nombre del país.
   - Esta tabla permite a los usuarios seleccionar el país al que pertenece la ubicación del animal en la publicación.

9. Tabla de ciudades:

   - Descripción: Almacena información sobre las ciudades disponibles en la plataforma.
   - Columnas sugeridas: id_ciudad (clave primaria), nombre de la ciudad, id_pais (clave externa que hace referencia a la tabla de países).
   - Esta tabla proporciona una lista de ciudades asociadas a cada país para que los usuarios elijan la ubicación específica del animal en la publicación.

10. Imagen de referencia:

   ![](./img/Estructura.png)

## Meta

- El viernes 28 de julio tener adelantado la base de datos hecha completamente, el server montado con express y ya tener algunos endpoints totalmente funcionales, donde se realicen varias consultas básicas en la base de datos, tanto de ingreso, consulta, actualización de datos.
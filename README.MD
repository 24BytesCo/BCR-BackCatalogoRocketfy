# BCR - BackEnd Catalogo Rocketfy

```markdown
# Catálogo de Productos API

Esta API de Node.js es una plataforma para administrar un catálogo de productos en línea. Permite a los usuarios crear, editar y modificar productos, además de proporcionar autenticación, búsqueda y otras características útiles. 

## Características clave

- **Express:** La API utiliza el framework Express.js para crear un servidor web rápido y escalable.

- **Variables de entorno:** Las configuraciones sensibles se manejan utilizando variables de entorno para mantener la seguridad.

- **CORS:** Se implementa control de acceso a recursos compartidos (CORS) para permitir solicitudes desde diferentes orígenes.

- **Protección de rutas con JWT:** Las rutas están protegidas por JSON Web Tokens (JWT) para garantizar la autenticación de los usuarios.

- **Renovación de token:** Los tokens de autenticación se renuevan automáticamente para mantener a los usuarios conectados.

- **Encriptación de contraseñas:** Las contraseñas de los usuarios se almacenan de forma segura utilizando técnicas de encriptación.

- **Middlewares Personalizados:** Se implementan middlewares personalizados para el manejo de errores y validaciones de solicitudes.

- **Validaciones semiautomaticas:** Se proporcionan validaciones semiautomáticas para garantizar que los datos sean correctos.

- **Integración con API de Google:** Los usuarios pueden iniciar sesión utilizando sus cuentas de Google.

- **Populate:** Se utiliza la función `populate` de Mongoose para cargar automáticamente datos relacionados.

- **Paginación:** Se implementa la paginación para mostrar grandes conjuntos de datos de manera eficiente.

- **Búsquedas específicas y globales:** Los usuarios pueden buscar productos de manera específica o realizar búsquedas globales en todo el catálogo.

- **Subida de archivos al servidor:** Los usuarios pueden cargar imágenes y archivos relacionados con los productos.

## Requisitos de instalación

Asegúrese de tener Node.js y npm (o yarn) instalados en su sistema. Luego, siga estos pasos:

1. Clone este repositorio en su máquina local.
2. Ejecute `npm install` o `yarn install` para instalar las dependencias.
3. Configure las variables de entorno según sea necesario.
4. Ejecute `npm start` o `yarn start` para iniciar el servidor.

## Autor

- Alexis Dorado Muñoz - alexis.dorado.munoz@gmail.com

## Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](LICENSE) para obtener más detalles.
```

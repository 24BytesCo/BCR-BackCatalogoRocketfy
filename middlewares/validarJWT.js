// Importar la librería jsonwebtoken
const jwt = require('jsonwebtoken');

// Middleware para validar un JSON Web Token (JWT)
const validarJWT = (req, res, next) => {

    // Leer el Token desde la cabecera 'ad-token'
    const token = req.header('ad-token');

    // Comprobar si no hay token en la petición
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        // Verificar y decodificar el token usando la clave secreta (JWT_SECRET)
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        // Agregar el ID de usuario decodificado (uid) al objeto de solicitud (req) para su posterior uso
        req.uid = uid;

        // Continuar con el siguiente middleware o ruta
        next();

    } catch (error) {
        console.log(error);
        // Manejar errores si el token no es válido o ha expirado
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

// Exportar la función de middleware para su uso en otras partes de la aplicación
module.exports = {
    validarJWT
}

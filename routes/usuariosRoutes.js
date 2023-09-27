//Ruta: /api/usuarios

// Importamos el módulo Router desde Express para configurar rutas.
const { Router } = require("express");
const { check } = require("express-validator");

// Importamos el controlador getUsuarios desde usuariosController.
const { getUsuarios, crearUsuario, editarUsuario } = require("../controllers/usuariosController");
const { validarCampos } = require("../middlewares/validarCamposMiddleware");
const { validarJWT } = require("../middlewares/validarJWT");

// Creamos una instancia de Router para definir rutas específicas.
const router = Router();

/* 
Definimos una ruta HTTP GET en la raíz de "/api/usuarios" que utiliza la función getUsuarios
del controlador cuando se accede a esta ruta.
*/ 
router.get("/", validarJWT, getUsuarios);

router.post("/", 
[
    check('nombreCompleto', "El nombre completo es obligatorio").not().isEmpty(),
    check('correoElectronico', "El correo electrónico es obligatorio").not().isEmpty(),
    check('correoElectronico', "El correo electrónico no tiene un formato válido").isEmail(),
    check('contrasenia', "La contraseña es obligatoria").not().isEmpty(),
    validarCampos
    
], crearUsuario);

router.put("/:id", 
[
    check('nombreCompleto', "El nombre completo es obligatorio").not().isEmpty(),
    check('correoElectronico', "El correo electrónico es obligatorio").not().isEmpty(),
    check('correoElectronico', "El correo electrónico no tiene un formato válido").isEmail(),
    check('rol', "El rol es obligatorio").not().isEmpty(),
    validarCampos
    
], editarUsuario);


// Exportamos el router configurado para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;

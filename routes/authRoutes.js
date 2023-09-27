// /Api/Login

// Importamos el módulo Router desde Express para configurar rutas.
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCamposMiddleware");
const { login } = require("../controllers/authController");
 

// Creamos una instancia de Router para definir rutas específicas.
const router = Router();

router.post("/",
[ 
    check("correoElectronico", "El correo es necesario").not().isEmpty(),
    check("correoElectronico", "El formato del correo no es válido").isEmail(),
    check("contrasenia", "La contraseña es necesaria").not().isEmpty(),
    validarCampos

], login);



module.exports = router;
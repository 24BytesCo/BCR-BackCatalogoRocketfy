// /Api/Categoria

// Importamos el módulo Router desde Express para configurar rutas.
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCamposMiddleware");

const { crearCategoria, getCategoria, getCategorias } = require("../controllers/categoriasController");

// Creamos una instancia de Router para definir rutas específicas.
const router = Router();

router.get("/", getCategorias);
router.get("/:id", getCategoria);
router.post("/",
[ 
    check("nombre", "El nombre de la categoría es necesario").not().isEmpty(),
    check("usuarioCrea", "El usuario que crea la categoría es necesario").not().isEmpty(),
    validarCampos

], crearCategoria);



module.exports = router;
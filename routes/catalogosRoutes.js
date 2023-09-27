// /Api/Catalogo

// Importamos el módulo Router desde Express para configurar rutas.
const { Router } = require("express");
const { check } = require("express-validator");
const {
  validarCampos,
  validarIdMongo,
} = require("../middlewares/validarCamposMiddleware");

const {
  getCatalogo,
  crearProducto,
  modificarProducto,
  getProducto,
} = require("../controllers/catalogosController");

// Creamos una instancia de Router para definir rutas específicas.
const router = Router();

router.get("/", getCatalogo);
router.get("/:id", getProducto);
router.post(
  "/",
  [
    check("nombreProducto", "El nombre del producto es necesario")
      .not()
      .isEmpty(),
    check("precio", "El precio del producto es necesario").not().isEmpty(),
    check("usuarioCrea", "El usuario que crea el producto es necesario")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearProducto
);
router.put(
  "/:id",
  [
    check("nombreProducto", "El nombre del producto es necesario")
      .not()
      .isEmpty(),
    check("precio", "El precio del producto es necesario").not().isEmpty(),
    check("usuarioCrea", "El usuario que crea el producto es necesario")
      .not()
      .isEmpty(),
    validarCampos,
    validarIdMongo,
  ],
  modificarProducto
);

module.exports = router;

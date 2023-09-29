// /Api/Productos

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
  getHistoricoPreciosProducto,
  eliminarProducto,
  getHistoricoStockProducto,
  getDocumentosColeccion,
  buscarPorRangoPrecio,
  busquedaCaroBarato
} = require("../controllers/productosController");
const { validarJWT } = require("../middlewares/validarJWT");

// Creamos una instancia de Router para definir rutas específicas.
const router = Router();

router.get("/", getCatalogo);
router.get("/historico-precios/:id", 
[
  validarJWT
], getHistoricoPreciosProducto);

router.get("/historico-stock/:id", 
[
  validarJWT
], getHistoricoStockProducto);

router.get('/busqueda-barato-caro' , busquedaCaroBarato );
router.get("/:id", getProducto);
router.post(
  "/",
  [
    check("nombre", "El nombre del producto es necesario")
      .not()
      .isEmpty(),
      check("descripcion", "La descripción del producto es necesario")
      .not()
      .isEmpty(),
      check("imagen", "La imagen del producto es necesario")
      .not()
      .isEmpty(),
      check("stock", "El stock del producto es necesario")
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
    check("nombre", "El nombre del producto es necesario")
      .not()
      .isEmpty(),
    check("imagen", "La imagen del producto es necesaria").not().isEmpty(),
    check("precio", "El precio del producto es necesario").not().isEmpty(),
    check("usuarioCrea", "El usuario que crea el producto es necesario")
      .not()
      .isEmpty(),
    validarCampos,
    validarIdMongo,
  ],
  modificarProducto
);

router.delete("/:id", eliminarProducto);
router.get('/busqueda/:busqueda' , getDocumentosColeccion );
router.get('/busqueda-rango/:precioMaximo' , buscarPorRangoPrecio );
module.exports = router;

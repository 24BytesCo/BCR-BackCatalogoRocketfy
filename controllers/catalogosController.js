const { response } = require("express");
const Catalogo = require("../models/catalogoModel");
const HistoricoPrecio = require("../models/historicoPreciosModel");
const { default: mongoose } = require("mongoose");

const getCatalogo = async (req, res = response) => {
  try {
    const catalogo = await Catalogo.find().populate([
      { path: "categoria", select: "nombre" },
      { path: "usuarioCrea", select: "nombreCompleto" },
    ]);

    res.json({
      ok: true,
      catalogo,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un problema al consultar los productos del catalogo: ",
      error
    );

    res.json(500).json({
      ok: false,
      mensaje:
        "Ha ocurrido un problema al consultar los productos del catalogo, ver logs",
    });
  }
};

const getHistoricoPreciosProducto = async (req, res = response) => {
  try {

    // Verifica si el ID del producto proporcionado es válido
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.json({
        ok: false,
        mensaje: "El ID del producto no es válido", // Devuelve una respuesta JSON con un mensaje de error
      });
    }

    // Consulta el historial de precios del producto en función del ID del producto
    const historicoPreciosProducto = await HistoricoPrecio.find({
      producto: req.params.id,
    }).populate([
      {
        path: "usuarioCrea", // Pobla la referencia 'usuarioCrea' en el historial de precios
        select: "nombreCompleto", // Selecciona solo el campo 'nombreCompleto' del usuario
      },
      {
        path: "producto", // Pobla la referencia 'producto' en el historial de precios
        select: "nombreProducto", // Selecciona solo el campo 'nombreProducto' del producto
      },
    ]);

    res.json({
      ok: true,
      historicoPreciosProducto, // Devuelve una respuesta JSON con el historial de precios poblado
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un problema al consultar los productos del catálogo: ",
      error
    );
    res.json({
      ok: false,
      mensaje: "Ha ocurrido un error, revisar los registros de errores", // Devuelve un mensaje de error en caso de una excepción
    });
  }
};

const getProducto = (req, res = response) => {
  try {
    res.json({
      ok: true,
      catalogo: [],
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un problema al consultar los productos del catalogo: ",
      error
    );
  }
};

const crearProducto = async (req, res = response) => {
  try {
    if (req.body.categoria.length == 0) {
      return res.status(401).json({
        ok: false,
        mensaje: "Debes enviar al menos una categoría",
      });
    }

    console.log("req.body", req.body);
    const catalogo = Catalogo(req.body);

    await catalogo.save();

    res.json({
      ok: true,
      producto: catalogo,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un problema al crear el producto del catalogo: ",
      error
    );

    res.json(500).json({
      ok: false,
      mensaje:
        "Ha ocurrido un problema al crear el producto del catalogo, ver logs",
    });
  }
};

const modificarProducto = async (req, res = response) => {
  try {
    const idProducto = req.params.id;

    const productoBd = await Catalogo.findById(idProducto);

    const { usuarioCrea, precio } = req.body;
    console.log(productoBd);

    if (!productoBd) {
      return res.status(401).json({
        ok: false,
        mensaje: "No existe un producto con el id proporciano",
      });
    }

    const modificaProducto = await Catalogo.findByIdAndUpdate(
      idProducto,
      req.body
    );

    //Verificar si se está modificando el precio
    if (productoBd.precio != req.body.precio) {
      const registroPrecio = HistoricoPrecio({
        precio,
        usuarioCrea,
        producto: idProducto,
      });

      await registroPrecio.save();
    }

    res.json({
      ok: true,
      modificaProducto,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un problema al modificar el producto del catalogo: ",
      error
    );

    res.json(500).json({
      ok: false,
      mensaje:
        "Ha ocurrido un problema al modificar el producto del catalogo, ver logs",
    });
  }
};

module.exports = {
  getCatalogo,
  crearProducto,
  modificarProducto,
  getProducto,
  getHistoricoPreciosProducto,
};

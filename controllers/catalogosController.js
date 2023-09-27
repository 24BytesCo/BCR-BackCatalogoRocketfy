const { response } = require("express");
const Catalogo = require("../models/catalogoModel");
const HistoricoPrecio = require("../models/historicoPreciosModel");

const getCatalogo = async (req, res = response) => {
  try {
    const catalogo = await Catalogo.find();

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

    res.json(500).json({
      ok: false,
      mensaje:
        "Ha ocurrido un problema al consultar los productos del catalogo, ver logs",
    });
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

    const modificaProducto = await Catalogo.findByIdAndUpdate(idProducto, req.body);

    //Verificar si se está modificando el precio
    if (productoBd.precio != req.body.precio) {
        const registroPrecio = HistoricoPrecio(
            {
                precio,
                usuarioCrea,
                producto: idProducto
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
};

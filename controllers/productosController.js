const { response } = require("express");
const Catalogo = require("../models/productoModel");
const HistoricoPrecio = require("../models/historicoPreciosModel");
const HistoricoStock = require("../models/historicoStockModel");
const { default: mongoose } = require("mongoose");

const getCatalogo = async (req, res = response) => {
  try {
    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 6;

    const [catalogo, totalRegistros] = await Promise.all([
      Catalogo.find({ activo: true })
        .populate([
          { path: "categoria", select: "nombre" },
          { path: "usuarioCrea", select: "nombreCompleto" },
        ])
        .skip(desde)
        .limit(hasta),
      Catalogo.count({ activo: true }),
    ]);

    res.json({
      ok: true,
      catalogo,
      totalRegistros,
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
        select: "nombre", // Selecciona solo el campo 'nombreProducto' del producto
      },
    ]);

    res.json({
      ok: true,
      respuesta: historicoPreciosProducto, // Devuelve una respuesta JSON con el historial de precios poblado
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

const getHistoricoStockProducto = async (req, res = response) => {
  try {
    // Verifica si el ID del producto proporcionado es válido
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.json({
        ok: false,
        mensaje: "El ID del producto no es válido", // Devuelve una respuesta JSON con un mensaje de error
      });
    }

    // Consulta el historial de precios del producto en función del ID del producto
    const historicoStockProducto = await HistoricoStock.find({
      producto: req.params.id,
    }).populate([
      {
        path: "usuarioCrea", // Pobla la referencia 'usuarioCrea' en el historial de precios
        select: "nombreCompleto", // Selecciona solo el campo 'nombreCompleto' del usuario
      },
      {
        path: "producto", // Pobla la referencia 'producto' en el historial de precios
        select: "nombre", // Selecciona solo el campo 'nombreProducto' del producto
      },
    ]);

    res.json({
      ok: true,
      respuesta: historicoStockProducto, // Devuelve una respuesta JSON con el historial de precios poblado
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

const getProducto = async (req, res = response) => {
  try {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      return res.json({
        ok: false,
        mensaje: "El id no es valido",
      });
    }

    const producto = await Catalogo.findById(req.params.id).populate([
      { path: "categoria", select: "nombre" },
      { path: "usuarioCrea", select: "nombreCompleto" },
    ]);

    if (producto && producto.estado == false) {
      return res.json({
        ok: true,
        producto: null,
      });

    }

    res.json({
      ok: true,
      producto,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un problema al consultar los productos del catalogo: ",
      error
    );
  }
};

const eliminarProducto = async (req, res = response) => {
  try {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      return res.json({
        ok: false,
        mensaje: "El id no es valido",
      });
    }
    const productoBd = await Catalogo.findById(req.params.id);
    if (!productoBd) {
      return res.status(404).json({
        ok: false,
        mensaje: "No se ha encontrado producto co el id proporcionado",
      });
    }
    const producto = await Catalogo.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      {
        new: true, // Devuelve el producto actualizado en lugar del anterior
      }
    );

    await producto.save();
    res.json({
      ok: true,
      producto,
    });
  } catch (error) {
    console.log(
      "Ha ocurrido un problema al eloimnar el produto del catalogo: ",
      error
    );
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un problema al eloimnar el produto del catalogo",
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
        precioAntiguo: productoBd.precio,
        precioNuevo: req.body.precio,
        usuarioCrea,
        producto: idProducto,
      });

      await registroPrecio.save();
    }

    //Verificar si se está modificando el stock
    if (productoBd.stock != req.body.stock) {
      const registroStock = HistoricoStock({
        stockAntiguo: productoBd.stock,
        stockNuevo: req.body.stock,
        usuarioCrea,
        producto: idProducto,
      });

      await registroStock.save();
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

const getDocumentosColeccion = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  let data = [];

  if (!busqueda || busqueda.trim() == "") {
    data = await Catalogo.find();
  } else {
    data = await Catalogo.find({ nombre: regex, activo: true });
  }

  res.json({
    ok: true,
    catalogo: data,
  });
};

const buscarPorRangoPrecio = async (req, res = response) => {
  try {
    const precioMaximo = Number(req.params.precioMaximo);
    const catalogo = await Catalogo.find({
      precio: { $gte: 0, $lte: precioMaximo },
      activo: true
    }).exec();

    res.json({
      ok: true,
      catalogo,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      ok: false,
      mensaje: "Ocurrio un error al buscar por rango, revise logs",
    });
  }
};

const busquedaCaroBarato = async (req, res = response) => {
  try {
    // Encuentra el precio más alto (más caro)
    const productoMasCarow = await Catalogo.findOne({activo:true}).sort("-precio").exec();

    // Encuentra el precio más bajo (más barato)
    const productoMasBaratow = await Catalogo.findOne({activo: true}).sort("precio").exec();

    res.json({
      ok: true,
      productoBarato: productoMasBaratow,
      productoMasCaro: productoMasCarow,
    });
  } catch (error) {
    console.log("error ------", error);
    return res.status(500).json({
      ok: false,
      mensaje:
        "Error al consultar el producto mas barato y mas caro, revisa logs",
    });
  }
};

module.exports = {
  getCatalogo,
  crearProducto,
  modificarProducto,
  getProducto,
  getHistoricoPreciosProducto,
  eliminarProducto,
  getHistoricoStockProducto,
  getDocumentosColeccion,
  buscarPorRangoPrecio,
  busquedaCaroBarato,
};

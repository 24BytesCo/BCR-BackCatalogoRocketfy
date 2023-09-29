// Importar el modelo de usuario
const Usuario = require("../models/usuarioModel");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
// Obtener todos los usuarios activos
const getUsuarios = async (req, res) => {
  try {
    // Consultar la base de datos para encontrar usuarios activos
    const usuarios = await Usuario.find(
      { activo: true },
      "nombreCompleto correoElectronico rol google"
    );

    // Responder con una respuesta JSON que incluye los usuarios
    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    // Manejar errores si ocurren al buscar usuarios
    res.status(500).json({
      ok: false,
      error: "Error al obtener usuarios activos",
    });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res = response) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { nombreCompleto, correoElectronico, contrasenia } = req.body;

    //Validando que el correo sea unico

    const usuarioBd = await Usuario.findOne(
      { correoElectronico },
      "nombreCompleto"
    );

    if (usuarioBd) {
      return res.status(401).json({
        ok: false,
        mensaje: "El correo electrónico ya existe en la BD",
      });
    }

    // Crear un nuevo objeto de usuario con los datos proporcionados
    const usuario = new Usuario(req.body);

    //encriptando contraseña
    const salt = bcrypt.genSaltSync();

    usuario.contrasenia = bcrypt.hashSync(contrasenia, salt);

    // Guardar el nuevo usuario en la base de datos
    await usuario.save();

      const token =  await generarJWT(usuario.id.toString());
    // Responder con una respuesta JSON que incluye el usuario creado
    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log("Error Inesperado en crear usuario, catch: ", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error inesperado, por favor revisar logs",
    });
  }
};

// Define una función asincrónica llamada "editarUsuario" que manejará una solicitud PUT
const editarUsuario = async (req, res = response) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const uid = req.params.id; // Obtiene el ID del usuario a editar de los parámetros de la URL

    // Validando que el usuario exista en la BD
    const usuarioBd = await Usuario.findById(uid, "correoElectronico");

    if (!usuarioBd) {
      // Si no se encuentra el usuario en la base de datos
      return res.status(401).json({
        ok: false, // Indica que la solicitud no fue exitosa
        mensaje: "El usuario a actualizar no existe en la BD", // Proporciona un mensaje de error
      });
    }

    const campos = req.body; // Obtiene los campos a actualizar del cuerpo de la solicitud

    if (campos.correoElectronico == usuarioBd.correoElectronico) {
      // Si el correo electrónico no cambia
      delete campos.correoElectronico; // Elimina el campo de correoElectrónico para evitar duplicados
    } else {

      //Busca que el correo que envía no exista en la bd
      if (
        await Usuario.findOne(
          { correoElectronico: campos.correoElectronico },
          "correoElectronico"
        )
      ) {
        return res.status(401).json({
          ok: false, // Indica que la solicitud no fue exitosa
          mensaje: "El nuevo correo ya se encuentra en la Bd", // Proporciona un mensaje de error
        });
      }
    }

    delete campos.contrasenia; // Elimina el campo de contraseña para no ser actualizado
    delete campos.google; // Elimina el campo de google para no ser actualizado

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      // Encuentra y actualiza el usuario en la base de datos
      uid, // ID del usuario a actualizar
      campos, // Campos a actualizar
      {
        new: true, // Devuelve el usuario actualizado en lugar del anterior
      }
    );


    // Responder con una respuesta JSON que incluye el usuario actualizado
    res.json({
      ok: true, // Indica que la solicitud fue exitosa
      usuarioActualizado, // Envía el usuario actualizado en la respuesta
    });
  } catch (error) {
    console.log("Error Inesperado en actualizar usuario, catch: ", error);
    res.status(500).json({
      ok: false, // Indica que hubo un error en la solicitud
      mensaje: "Error inesperado, por favor revisar logs", // Proporciona un mensaje de error
    });
  }
};

// Exportar las funciones para su uso en otros lugares
module.exports = {
  getUsuarios,
  crearUsuario,
  editarUsuario,
};

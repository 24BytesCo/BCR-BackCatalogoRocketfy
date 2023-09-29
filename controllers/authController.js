const { response } = require("express");
const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  try {
    const { correoElectronico, contrasenia } = req.body;

    const usuarioBd = await Usuario.findOne({ correoElectronico });

    if (!usuarioBd) {
      return res.status(400).json({
        ok: false,
        mensaje: "Credenciales inválidas",
      });
    }

    const validarContra = bcrypt.compareSync(
      contrasenia,
      usuarioBd.contrasenia
    );

    if (!validarContra) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error de login",
      });
    }

    const usuario = new Usuario(
      {
        nombreCompleto: usuarioBd.nombreCompleto,
        correoElectronico: usuarioBd.correoElectronico,
        img: usuarioBd.img,
        rol: usuarioBd.rol
      });
    const token = await generarJWT(usuarioBd.id.toString());
    
    res.json({
      ok: true,
      token,
      usuario
    });
  } catch (error) {
    console.log("Error al loguearse : ", error);

    return res.status(500).json({
      ok: false,
      mensaje: "Error inesperado al loguearse, ver logs",
    });
  }
};

const renovarJWT = async(req, res = response) => {

  const uid = req.uid;

  // Generar el TOKEN - JWT
  const token = await generarJWT( uid );

  // Obtener el usuario por UID
  const usuario = await Usuario.findById( uid, "nombreCompleto img correoElectronico rol" );

  delete usuario.contrasenia;

  res.json({
      ok: true,
      token,
      usuario
  });

}


module.exports = {
  login,
  renovarJWT
};

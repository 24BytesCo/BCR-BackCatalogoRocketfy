const { response } = require("express");
const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  try {
    const { correoElectronico, contrasenia } = req.body;

    const usuarioBd = await Usuario.findOne({ correoElectronico });

    if (!usuarioBd) {
      return res.status(404).json({
        ok: false,
        mensaje: "Eror de loguin",
      });
    }

    const validarContra = bcrypt.compareSync(
      contrasenia,
      usuarioBd.contrasenia
    );

    if (!validarContra) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error de loguin",
      });
    }

    const token = await generarJWT(usuarioBd.id.toString());
    
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log("Error al loguearse : ", error);

    return res.status(500).json({
      ok: false,
      mensaje: "Error inesperado al loguearse, ver logs",
    });
  }
};

module.exports = {
  login,
};

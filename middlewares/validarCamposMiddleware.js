const { response } = require("express");
const { validationResult } = require("express-validator");
const mongoose = require('mongoose');

const validarCampos = (req, res = response, next)=> {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json(
        {
          ok:false,
          errores: errores.array()
        });
    }

    next();
} 
const validarIdMongo = (req, res = response, next)=> {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json(
      {
        ok:false,
        mensaje: "El id proporcionado no es un id de mongo válido"
      });
  }

  next();
} 

module.exports = {
    validarCampos,
    validarIdMongo
};
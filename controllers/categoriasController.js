const { response } = require("express");
const Categoria = require("../models/categoriaModel");

const getCategorias = async (req, res = response)=> {
try {

    const catalogo = await Categoria.find();  


    res.json({
        ok:true,
        catalogo
    });
    
} catch (error) {
    console.log("Ha ocurrido un problema al consultar los productos del catalogo: ", error);

    res.json(500).json({
        ok: false,
        mensaje: "Ha ocurrido un problema al consultar los productos del catalogo, ver logs"
    });
}
} 

const getCategoria = (req, res = response)=> {
    try {
    
    
        res.json({
            ok:true,
            catalogo: []
        });
        
    } catch (error) {
        console.log("Ha ocurrido un problema al consultar los productos del catalogo: ", error);
    
        res.json(500).json({
            ok: false,
            mensaje: "Ha ocurrido un problema al consultar los productos del catalogo, ver logs"
        });
    }
} 

const crearCategoria = async (req, res = response)=> {
    try {
    console.log("req.body", req.body);
        const catalogo = Categoria(req.body);

        await catalogo.save();
    
        res.json({
            ok:true,
            producto: catalogo
        });
        
    } catch (error) {
        console.log("Ha ocurrido un problema al crear el producto del catalogo: ", error);
    
        res.json(500).json({
            ok: false,
            mensaje: "Ha ocurrido un problema al crear el producto del catalogo, ver logs"
        });
    }
}

const modificarCategoria = (req, res = response)=> {
    try {
    
    
        res.json({
            ok:true,
            producto: []
        });
        
    } catch (error) {
        console.log("Ha ocurrido un problema al modificar el producto del catalogo: ", error);
    
        res.json(500).json({
            ok: false,
            mensaje: "Ha ocurrido un problema al modificar el producto del catalogo, ver logs"
        });
    }
} 
    

module.exports = {
    getCategorias,
    crearCategoria,
    modificarCategoria,
    getCategoria
}
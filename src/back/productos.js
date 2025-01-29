import express from "express";
import { Sequelize, DataTypes } from "sequelize";
import con from './conbbdd.js';


const app = express();
const ruteo = express.Router();


(async() => {
    const sequelize = await con();
    const Producto = sequelize.define(
        'producto', {
            nombre : {
                type : DataTypes.STRING,
                allowNull : false
            },
            descripcion : {
                type: DataTypes.STRING
            },
            precio : {
                type : DataTypes.INTEGER
            },
            categoria: {
                type: DataTypes.STRING
            }
        });
        await Producto.sync();
});

ruteo.post('/nuevoProducto', async(request, res) => {
    const {nombreI, descripcionI, precioI} = request.body;
    try{
        const nuevoProducto = await Producto.create(
            {
                nombre : nombreI,
                descripcion : descripcionI,
                precio: precioI
            }
        )
    } catch(error){
        console.log('Error al crear producto: ', error);
    }
});

ruteo.put('/editarProducto', async(request, res) => {
    const{nombreE, descripcionE, precioE} = request.body;
    const id = request.id;
    try{
        const productoEditado = await Producto.update(
            {
                nombre: nombreE,
                descripcion: descripcionE,
                precio : precioE
            },
            {where: {id : id}}
        );
    } catch(error){
        console.log('Error al actualizar producto: ', error);
    }
});

ruteo.delete('/borrarProducto', async(request)=>{
    const id = request.id;
    try{
        await Producto.destroy({where: {id : id}});
    } catch(error){
        console.log('Error al borrar producto: ',error);
    }
});

ruteo.get('/listaProductos', async(res) => {
    try{
        const listaDeProductos = await Producto.findAll();
        res.status(200).json({message:'proceso exitoso', listaDeProductos});
    }catch(error){
        console.log('Error al buscar productos', error);
        res.status(500).json({error: 'Error al obtener lista de productos'});
    }
});

ruteo.get('/listaCategoria/:categoria', async(request,res) => {
    const categoria = request.params;
    try{
        const listaPorCategoria = await Producto.findAll({
            where:{categoria : categoria}
        });
        res.status(200).json({message: 'Proceso exitoso', listaPorCategoria});
    }catch(error){
        res.status(500).json({error: 'error al buscar por categoria'});
    }
});



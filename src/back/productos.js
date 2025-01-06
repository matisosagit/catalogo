import expressRouter from "express-router";
import { Sequelize, DataTypes } from "sequelize";
import con from './conbbdd';
import { request } from "express";

(async() => {
    await con();}
);

const ruteo = expressRouter();

const Producto = Sequelize.define(
    'Producto', {
        nombre : {
            type : DataTypes.STRING,
            allowNull : false
        },
        descripcion : {
            type: DataTypes.STRING
        },
        precio : {
            type : DataTypes.INTEGER
        }
    });

(async() => {
    await Producto.sync();
});

ruteo.post('/nuevoProducto', async(request, res) => {
    const {nombreI, descripcionI, precioI} = request.body;
    //try para crear producto con sequelize.create
});



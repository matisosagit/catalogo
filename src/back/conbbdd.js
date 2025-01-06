import { Sequelize } from "sequelize";

async function con(){
    const conectarBBDD =  new Sequelize('database', 'username', 'password', {
        host: 'localhost',
        dialect: 'mysql'
    });
    try{
        await conectarBBDD.authenticate();
        console.log("conexion exitosa");
    }
    catch(error){
        console.log("error al conectar: ", error);
    }
    return conectarBBDD;
}

export default con;
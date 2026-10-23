const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3000;

async function startServer(){
    try{
        await sequelize.authenticate();
        console.log('Conexion a PSQL exitosa');

        app.listen(PORT, () => {
            console.log(`Proyect server running on port: ${PORT}`);
        });
    }catch(error){
        console.error('Error en la conexion con PSQL:', error.message);
        process.exit(1);
    }
}

startServer(); 
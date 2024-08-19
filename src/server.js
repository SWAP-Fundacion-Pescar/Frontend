import app from './app.js';

const PORT = process.env.PORT || 3005;

//Inicia el servidor en el puerto 3005
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});

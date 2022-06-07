const express = require ("express");
const Contenedor = require('./Contenedor.js');

const app = express();

const PORT = 8080;

const ContenedorProductos = new Contenedor('./productos.txt')

app.listen(PORT, () => console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`));

// Rutas*************

//http://localhost:8080/productos
app.get ('/productos', async (req, res)=>{
    try {
        const productos = await ContenedorProductos.getAll()

        res.send(productos)

    } catch (error) {
        res.send(error)
    }

})
 
app.get ('/productosRandom', async (req, res)=>{
    try {
        const productos = await ContenedorProductos.getAll()

        const indice = Math.floor(Math.random() * productos.length)

        res.send(productos[indice])

    } catch (error) {
        res.send(error)
    }

})

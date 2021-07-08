const express = require("express")
fs = require('fs');

const app = express()

const PORT = 8080;

let contar1 = 0;
let contar2 = 0;


app.get('/items', (req, res) => {
    contar1++;
    let data = fs.readFileSync("productos.txt")
    let dataParsed = JSON.parse(data);
    let productos = dataParsed;

    let respuesta = {
        items: productos,
        cantidad: productos.length
    }


    res.send(respuesta)
})

app.get('/item-random', (req,res)=>{
    contar2++
    
    let data = fs.readFileSync("productos.txt")
    let dataParsed = JSON.parse(data);


    let productoAleatorio = Math.floor(Math.random()*(dataParsed.length));
    let productoAlAzar = {
        item: dataParsed[productoAleatorio],
    }
    res.send(productoAlAzar)
})

app.get('/visitas', (req,res) => {
    let visitaciones = {
        visitas: {
            items: contar1,
            itemRandom: contar2
        }
    }
    res.send(visitaciones)
})



const server = app.listen(PORT, ()=> {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
const express = require ('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const pathPublic = path.resolve(__dirname, './public');
app.use(express.static(pathPublic));


app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});


app.listen (8080, () => {
    console.log('Servidor iniciado en: http://localhost:8080');
});


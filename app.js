const express = require('express');
const app = express();
const db = require('./db/connection')

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`O express esta rodando na porta ${PORT}`);
})

//Db
db 
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso!");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err);
    })

//Routes
app.get('/', (req, res) => {
    res.send("Esta funcionando!")
})
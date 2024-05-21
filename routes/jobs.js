// Nome no plural em letras minusculas, com o nome da tabela no database. Nomeclatura padrao para arquivo de rotas
const express = require('express');
const router = express.Router()
const Job = require("../models/Job")

router.get('/test', (req, res) => {
    res.send('deu certo')
})

// add job via post
router.post('/add', (req, res) => {
    let {title, salary, company, description, email, new_job} = req.body;

    //insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(()=> res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
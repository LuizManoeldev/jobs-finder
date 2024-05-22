// Nome no plural em letras minusculas, com o nome da tabela no database. Nomeclatura padrao para arquivo de rotas
const express = require('express');
const router = express.Router()
const Job = require("../models/Job")

// get add form
router.get('/add', (req, res) => {
    res.render('add')
})
// add job
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

//get job detail
router.get("/view/:id", (req, res) => {
    Job.findOne({
        where: {id: req.params.id}
    }).then(job => {
        res.render('view',{
            job
        })
    }).catch(err => console.log(err))
})




module.exports = router
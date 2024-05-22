const express    = require('express');
const exphbs     = require('express-handlebars');
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const Job        = require('./models/Job')
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`O express esta rodando na porta ${PORT}`);
})

//Body Parser
app.use(bodyParser.urlencoded({ extended:false }))

//handlerbars
app.set('views', path.join(__dirname, 'views')) // diretorio das views
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })) // arquivo principal do layout
app.set('view engine', 'handlebars') // handlerbars com engine de renderização

// pasta de arquivos estaticos - ex. imgs, svg e etc
app.use(express.static(path.join(__dirname,'public' )))

//db
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
    //input no index -  name = "job"
    // form action = '/' method = "GET"
    let search = req.query.job 
    let query = `%${search}%` // PH -> PHP, Word -> Wordpress
    
    // Se não tiver parametro de busca:
    if(!search){
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs
            });
    
        })
        .catch(err => {
            console.log("Ocorreu um erro ao buscar os trabalhos:", err);
            res.render('index', { jobs: [] });
        });
    } else { // caso tenha um parametro para busca:
        Job.findAll({
            where: {title: { [Op.like]: query}},
            order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs
            });
    
        })
        .catch(err => {
            console.log("Ocorreu um erro ao buscar os trabalhos:", err);
            res.render('index', { jobs: [] });
        });
    }
    
})

//Jobs route
// Aqui ele estabelece que todas as rotas do ./routes/jobs, iram comecar a partir 
// de /jobs que é o primeiro parametro da funcao.
app.use('/jobs', require('./routes/jobs'))
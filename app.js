const express    = require('express');
const exphbs     = require('express-handlebars');
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');

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
app.use(express.static(path.join(__dirname, )))

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
    //res.send("Esta funcionando!")

    //alteracao para retornar um handlerbar
    // nao inicia no main, pois ele ja foi setado como principal e é exibido independente
    // da pagina
    res.render('index')
})

//Jobs route
// Aqui ele estabelece que todas as rotas do ./routes/jobs, iram comecar a partir 
// de /jobs que é o primeiro parametro da funcao.
app.use('/jobs', require('./routes/jobs'))
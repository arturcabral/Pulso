const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const handlebars = require('express-handlebars');


//Variavéis Globais
let id;

//Seta o diretório público
const HTML_DIR = path.join(__dirname, '/public/')
app.use(express.static(HTML_DIR));

//importa os modulos locais
const escrever = require('./escrever.js');
const ler = require('./ler.js');
const naivechain = require('./naivechain/main.js');


//NAIVECHAIN - Biblioteca Blockchain
naivechain();

//Config Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.engine('handlebars', handlebars({defaultLayout: 'main'}))


router.get('/',function(req,res){
    const title = "Pulso";
    res.render('index', {title: title});
});

router.get('/ler-imagem',function(req,res){
  const title = "Receber";
  res.render('ler-imagem', {title: title});
});

router.get('/teste',function(req,res){
  var sender = "Artur";
  var receiver = "Tainá";
  res.render('analise-final', { sender: sender , receiver: receiver });
});

//Rota formulário
router.get('/form',function(req,res){
const title = "Enviar";
res.render('formulario', {title: title});
});

//Roda Verificar Imagem
router.get('/verificar-imagem',  function(req,res){
  //Solicitar sender receiver
  var hashValue = req.query.hash;
  console.log('O hash é ' + hashValue);
  ler(hashValue, res);


});
//ROTA ADDD
router.get('/add',  function(req,res){
  //Solicitar sender receiver
  var sender = req.query.sender;
  var receiver = req.query.receiver;

  console.log(req.query);
  
  if (sender != undefined &&  receiver != undefined )
  {
  //função de escrita
  	id = escrever(sender, receiver);
  	//console.log("Foi");
    res.redirect('../gerar-imagem')


  }
  else {
  	console.log("Erro");
  	const title = "Erro";
    res.render('error', {title: title});
  }
});

router.get('/gerar-imagem',function(req,res){
  ler(id, res);
});

var porta = process.env.PORT || 8080;


//add the router
app.use('/', router);
app.listen(porta);

console.log('Running at Port 8080');

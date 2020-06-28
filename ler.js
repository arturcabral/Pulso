

const fetch = require('node-fetch');

function showData(result, dado, res) {

  if (typeof(dado) == "string") {
    let trueHash = false;
    let sender;
    let receiver;

    for (const data in result) {

      if (result[data]['hash'] == dado) {
        //console.log("achei!");
        trueHash = true;
        sender =result[data]['data']['de'];
        receiver =result[data]['data']['para'];

      }
      else {
        //console.log("não achei!")
      }
    }
  
    if(trueHash) { 
      //console.log("TEM HASH");
      const title = "Receber";
      res.render('analise-final', { sender: sender , receiver: receiver , title: title });

    }
    else { 
      //console.log("NÃO TEM");
      const title = "Erro";
      res.render('analise-erro', {title: title});

    }
  }
  
  else {
    for (const data in result) {
        //console.log(result[data]['data']['id']);
        //console.log(result[data]['data']);    
          
          
          var id = result[data]['data']['id']
            if (result[data]['data']['id'] == dado) {
              //console.log(result[data]['hash']) //imprime hash
              var hash = result[data]['hash'];
              //res.redirect("/teste");
              const title = "Enviar"
              res.render('gerar-imagem', { hash: hash , title: title });
            }
          
      }
    }
}
var ler = function(id , res) {
     fetch('http://localhost:3001/blocks')
      .then(response => {response.json()
          .then( data => showData(data, id , res))
        })
      .catch(err => console.log('Deu erro ' + err,message))
}


  module.exports = ler;

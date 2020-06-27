
//retornar id 

var id = 0;

var escrever = function(s,r) {
    const fetch = require('node-fetch');

    var url ='http://localhost:3001/mineBlock';
    var headers = {'Content-type' : 'application/json'};

    function Escrita(enviador,recebidor,tipo) {
        //identificador
        id++;        
        
        var data = '{"data" : {"de": "'+ enviador + '", "para": "' +recebidor +'", "tipo": '+ tipo + ' , "id": '+ id +' }}';

        return new Promise((resolve, reject) => {

            fetch('http://localhost:3001/mineBlock', {method: 'POST', headers: headers, body: data})
                .then((res) => res.text())
                .then((json) => {
                    resolve(json);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    //função de escrita
    
    Escrita(s,r, 1)
    .then((value)=>{})
    .catch((err)=>{
        console.log(err)
        state = false;
    }) 
    return id;
}

module.exports = escrever;
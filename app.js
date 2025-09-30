/***************************************************************************************************************************
 * Objetivo: arquivo de endPoints referente a API whatsapp
 * Data: 15/09/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 * 
 ****************************************************************************************************************************/

//dependências da API
const express    = require('express')    //Responsável pela API
const cors       = require('cors')       //Responsável pelas permissões da API (APP)  
const bodyParser = require('body-parser')//Responsável por gerenciar a chegada dos dados da API com o front-end

//import do arquivo de funções
const dados = require('./modulo/funcoes.js')

//retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080


//criando uma instância de uma classe do express
const app = express()

//configuração de permissões da API 
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')
   
    app.use(cors())

    next() 
})

//ENDPOINTS

//função 01
app.get('/v1/whatsapp/usuarios', function(request, response){

    //Pesquisa na função
    let usuarios = dados.getAllData()

    //retorna o status code
    response.status(usuarios.status_code)
    //retorna o JSON
    response.json(usuarios)
})

//função 02
app.get('/v1/whatsapp/usuario/:number', function(request, response){
    let number = request.params.number

    //Pesquisa na função
    let usuario = dados.getProfileInfo(number)

    //retorna o status code
    response.status(usuario.status_code)
    //retorna o JSON
    response.json(usuario)
})



//Start na API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})

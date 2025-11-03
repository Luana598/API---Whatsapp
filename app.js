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
const PORT = process.env.PORT || 8080


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

    let usuarios = dados.getAllData()

    response.status(usuarios.status_code)

    response.json(usuarios)
})

//função 02
app.get('/v1/whatsapp/usuario/:number', function(request, response){
    let number = request.params.number

    let usuario = dados.getProfileInfo(number)

    response.status(usuario.status_code)
    
    response.json(usuario)
})

//função 03
app.get('/v1/whatsapp/contatos/:number', function(request, response){
    let number = request.params.number

    let contacts = dados.getContactInfo(number)

    response.status(contacts.status_code)
    
    response.json(contacts)
})

//função 04
app.get('/v1/whatsapp/mensagens/:number', function(request, response){
    let number = request.params.number

    let messages = dados.getAllUserMessages(number)

    response.status(messages.status_code)
    
    response.json(messages)
})

//função 05
app.get('/v1/whatsapp/conversa', function(request, response){
    let number = request.query.number
    let contactNumber = request.query.contact

    let messages = dados.getMessagesToContact(number, contactNumber)

    response.status(messages.status_code)
    
    response.json(messages)
})

//função 06
app.get('/v1/whatsapp/palavra-chave', function(request, response){
    let number = request.query.number
    let contactNumber = request.query.contact
    let keyword = request.query.keyword

    let messages = dados.getFilterByKeyword(keyword, number, contactNumber)

    response.status(messages.status_code)
    
    response.json(messages)
})

//Start na API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})

/***************************************************************************************************************************
 * Objetivo: arquivo de funções para gerenciar a API de dados de conversas do whatsapp
 * Data: 30/09/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ****************************************************************************************************************************/

const MESSAGE_ERRO = { status: false, status_code: 500, development: "Luana M. Lopes Bomfim" }

const { connect } = require('http2')
const dados = require('./contatos.js')

const getAllData = function (){

    let message = {
        status: true,
        status_code: 200,
        development: "Luana M. Lopes Bomfim",
    }

    message.contatos = dados.contatos['whats-users']

    if (message.contatos.length > 0)
        return message //saída verdadeira (200)
    else
        return MESSAGE_ERRO //saída falsa (500)
}

const getProfileInfo = function (number){
    let message = {
        status: true,
        status_code: 200,
        development: "Luana M. Lopes Bomfim",
    }

    let usuario = dados.contatos['whats-users'].find(function (item) {
        return item.number === number
    })


    message.number = usuario.number
    message.userName = usuario.account
    message.nickname = usuario.nickname
    message.background = usuario.background
    message.creation =  usuario['created-since']
    message.profileImage = usuario['profile-image']
    
   
  
     if (message.number.length > 0)
         return message //saída verdadeira (200)
     else
         return MESSAGE_ERRO //saída falsa (500)

}

const getContactInfo = function (number){

     let message = {
        status: true,
        status_code: 200,
         development: "Luana M. Lopes Bomfim",
         contatos: []
    }

    let usuario = dados.contatos['whats-users'].find(function (item) {
        return item.number === number
    })


        
    message.contatos = usuario.contacts



    console.log(message)

}

const getUserMessages = function (){

}

getContactInfo('11966578996')

module.exports = {
    getAllData,
    getProfileInfo
}
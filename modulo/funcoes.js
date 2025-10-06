/***************************************************************************************************************************
 * Objetivo: arquivo de funções para gerenciar a API de dados de conversas do whatsapp
 * Data: 30/09/2025
 * Autor: Luana M. Lopes Bomfim
 * Versão: 1.0
 ****************************************************************************************************************************/

const MESSAGE_ERRO = { status: false, status_code: 500, development: "Luana M. Lopes Bomfim" }

const { connect } = require('http2')
const dados = require('./contatos.js')

const getAllData = function () {

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

const getProfileInfo = function (number) {
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
    message.creation = usuario['created-since']
    message.profileImage = usuario['profile-image']



    if (message.number.length > 0)
        return message //saída verdadeira (200)
    else
        return MESSAGE_ERRO //saída falsa (500)

}

const getContactInfo = function (number) {

    let message = {
        status: true,
        status_code: 200,
        development: "Luana M. Lopes Bomfim",
    }

    let usuario = dados.contatos['whats-users'].find(function (item) {
        return item.number === number
    })

    let userContacts = []

    usuario.contacts.forEach(contato => {
        userContacts.push({
            contactName: contato.name,
            profileImage: contato.image,
            description: contato.description,
            Number: contato.number
        })

    })

    message.contacts = userContacts

    if (message.contacts.length > 0)
        return message //saída verdadeira (200)
    else
        return MESSAGE_ERRO //saída falsa (500)

}

const getAllUserMessages = function (number) {
    let message = {
        status: true,
        status_code: 200,
        development: "Luana M. Lopes Bomfim",
    }

    let usuario = dados.contatos['whats-users'].find(function (item) {
        return item.number === number
    })

    let allMessages = []

    usuario.contacts.forEach(contato => {
        allMessages.push(contato.messages)
    })

    message.User = usuario.account
    message.UserMessages = allMessages


    if (message.UserMessages.length > 0)
        return message //saída verdadeira (200)
    else
        return MESSAGE_ERRO //saída falsa (500)

}

const getMessagesToContact = function (number, contactNumber) {
    let message = {
        status: true,
        status_code: 200,
        development: "Luana M. Lopes Bomfim",
    }


    let usuario = dados.contatos['whats-users'].find(function (item) {
        return item.number === number
    })

    let contato = usuario.contacts.find(function (contact) {
        return contact.number === contactNumber
    })

    message.userName = usuario.account
    message.contactName = contato.name
    message.conversation = contato.messages

    if (message.conversation.length > 0)
        return message //saída verdadeira (200)
    else
        return MESSAGE_ERRO //saída falsa (500)
}

const getFilterByKeyword = function (keyword, number, contactNumber) {
    let message = {
        status: true,
        status_code: 200,
        development: "Luana M. Lopes Bomfim",
    }


    let usuario = dados.contatos['whats-users'].find(function (item) {
        return item.number === number
    })

    
  if (!usuario) {
    return {
      status: false,
      status_code: 404,
      message: "Usuário não encontrado"
    }
  }

    let contato = usuario.contacts.find(function (contact) {
        return contact.number === contactNumber
    })


    if (!contato) {
        return {
            status: false,
            status_code: 404,
            message: "Contato não encontrado"
        }
    }


    // filter todas ascria um array mensagens que passam na condição
    let result = contato.messages.filter(msg =>
        msg.content.toLowerCase().includes(keyword.toLowerCase())
    )

    message.userName = usuario.account
    message.contactName = contato.name
    message.ResearchResult = result

    if (message.ResearchResult.length > 0)
        return message //saída verdadeira (200)
    else
        return MESSAGE_ERRO //saída falsa (500)

}

module.exports = {
    getAllData,
    getProfileInfo,
    getContactInfo,
    getAllUserMessages,
    getMessagesToContact,
    getFilterByKeyword
}
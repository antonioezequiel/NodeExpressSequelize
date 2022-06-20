const express = require('express');
const body_parser = require('body-parser');
const pessoaRouter = require('./PessoaRouter.js');
const nivelRouter = require('./NivelRouter.js');
const turmaRouter = require('./TurmaRouter.js')

const routers = (app) => {
    app.get('/', (req, resp)=>{
        resp.status(200).send({'pagina Inicial': 'olá, estamos na página inicial'})
    })
    app.use(body_parser.json());
    app.use(
        pessoaRouter,
        nivelRouter, 
        turmaRouter
    );
}

module.exports = routers;
//export default routers;
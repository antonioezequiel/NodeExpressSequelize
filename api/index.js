//import express from 'express'
const express = require('express');
const routers = require('./routers')

//import parser from 'body-parser'

const app = express();
routers(app);

/*app.get('/', (req, resp) => {
    resp.status(201).json({message: 'estou no ar'})
});

app.get('/pessoas', (req, resp) => {
    PessoaController.getAll(req, resp);
});*/


//export default app;
module.exports = app;
//import app from './api/index.js'
const app = require('./api/index.js');

const porta = process.env.PORT || 3000;

/*const rotas = {
    "/": 'curso de node',
    "/livros": 'você está na pagina de livros',
    "/autores": 'essa página é de autores',
    "/editora": 'página de editora de livros'
}

const server = http.createServer((req, resp) => {
    resp.writeHead(200, {'content-type': 'text/plain'});
    resp.end(rotas[req.url]);
})

server.listen(porta, () => {
    console.log(`Servidor escutando na porta http://localhost:${porta}`);
})
*/
 
app.listen(porta, () => {
    console.log(`Servidor escutando na porta http://localhost:${porta}`);
})
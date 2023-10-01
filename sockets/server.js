// Importa as bibliotecas necessárias
var express = require('express'),

app = express(),
server = require('http').createServer(app).listen(process.env.SERVER_PORT), // Cria um servidor HTTP e o faz escutar na porta 4555
io = require(process.env.SOCKET_IO_PATH).listen(server), // Cria uma instância do Socket.io e a conecta ao servidor
bodyParser = require('body-parser'); // Biblioteca para análise do corpo das requisições

const doteenv = require('dotenv')
doteenv.config()

// Configura o uso do bodyParser para analisar os corpos das requisições
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const routes = require('./routes')

const middleware = require('./middleware')

app.use(middleware.emitir); // Utiliza o middleware de emissão de notificações
app.use(process.env.API_BASE_ROUTE, routes); // Define a rota base '/api' para o roteador

// Inicia o servidor na porta definida
var port = process.env.PORT

app.listen(port);
console.log('Conectado à porta ' + port);

// Middleware para emitir notificações via Socket.io
var emitir = function (req, res, next) {
    var notificar = req.query.notificacao || '';
    if (notificar != '') {
        io.emit('notificacao', notificar); // Emite uma notificação via Socket.io
        next(); // Passa para o próximo middleware
    } else {
        next(); // Passa para o próximo middleware
    }
}

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Configuração do MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'CRUD'
});

// Conectar ao MySQL
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ' + err.stack);
        return;
    }
    console.log('Conexão bem sucedida ao MySQL com o ID: ' + connection.threadId);
});

// Middleware para analisar solicitações POST
app.use(bodyParser.urlencoded({ extended: true }));

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para adicionar uma pessoa
app.post('/add', (req, res) => {
    const { nome, sobrenome, telefone } = req.body;
    const pessoa = { nome, sobrenome, telefone };

    connection.query('INSERT INTO pessoas SET ?', pessoa, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar pessoa: ' + err.stack);
            return;
        }
        console.log('Pessoa adicionada com o ID: ' + result.insertId);
        res.redirect('/');
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

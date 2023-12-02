const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configurações do banco de dados
const db_config = {
    host: 'seu_host',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'seu_banco_de_dados',
};

// Conexão com o banco de dados
const connection = mysql.createConnection(db_config);
connection.connect();

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Rota para processar o formulário
app.post('/cadastrar', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const instagram = req.body.instagram;
    const seguidores = req.body.seguidores;
    const senha = req.body.senha;

    // Inserir dados no banco de dados
    const sql = 'INSERT INTO influenciadores (nome, email, instagram, seguidores, senha) VALUES (?, ?, ?, ?, ?)';
    const values = [nome, email, instagram, seguidores, senha];

    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.send('Erro ao cadastrar influenciador.');
        } else {
            res.send('Cadastro realizado com sucesso!');
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

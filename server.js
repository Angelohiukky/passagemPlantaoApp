// Importa o módulo 'http' do Node.js para criar um servidor web
const http = require('http');
// Importa o módulo 'fs' para trabalhar com o sistema de arquivos (ler nossos HTML, CSS, JS)
const fs = require('fs');
// Importa o módulo 'path' para lidar com caminhos de arquivos de forma segura
const path = require('path');

const PORT = 3000; // Define a porta onde nosso servidor vai rodar

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
    // req: objeto de requisição (o que o navegador pediu)
    // res: objeto de resposta (o que o servidor vai devolver)

    // Define o caminho do arquivo solicitado pelo navegador
    let filePath = '.' + req.url; // Começa com '.' para indicar o diretório atual
    if (filePath === './') { // Se o navegador pediu a raiz (ex: http://localhost:3000/)
        filePath = './index.html'; // Devolve o index.html por padrão
    }

    // Define o tipo de conteúdo (MIME type) com base na extensão do arquivo
    let contentType = 'text/html'; // Padrão é HTML
    const extname = String(path.extname(filePath)).toLowerCase(); // Pega a extensão do arquivo
    const mimeTypes = { // Dicionário de tipos de arquivo
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };
    // Se a extensão for conhecida, usa o tipo de conteúdo correspondente
    contentType = mimeTypes[extname] || 'application/octet-stream'; // 'application/octet-stream' para tipos desconhecidos

    // Lê o arquivo do sistema de arquivos
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') { // 'ENOENT' significa "arquivo não encontrado"
                // Se o arquivo não existir, envia um erro 404 (Not Found)
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                // Para outros erros do servidor, envia um 500 (Internal Server Error)
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            // Se o arquivo foi lido com sucesso, envia o conteúdo com o tipo correto
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Faz o servidor "escutar" por requisições na porta definida
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Pressione Ctrl+C para parar o servidor.`);
});
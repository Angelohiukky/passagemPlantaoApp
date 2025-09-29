## 📝 Gerador de Relatório de Plantão
Uma aplicação de desktop simples e eficiente, construída com Electron, para padronizar e agilizar a criação de relatórios de passagem de plantão.

## 🖼️ Visão Geral
O objetivo desta aplicação é fornecer aos técnicos uma ferramenta intuitiva para registrar as atividades do seu turno de trabalho. Com um formulário estruturado, o utilizador pode documentar agendamentos, tarefas, pendências e a movimentação de chamados, gerando ao final um arquivo .txt formatado e pronto para ser compartilhado via Whatsapp Web.

## ✨ Funcionalidades
Formulário Intuitivo: Interface limpa e organizada para preenchimento rápido das informações.

Data Automática: O campo de data já vem preenchido com o dia atual.

Contador de Chamados: Adicione ou remova facilmente a contagem de chamados abertos e fechados por unidade.

Geração de Relatório: Crie um relatório de texto (.txt) padronizado com um único clique.

Download Automático: O arquivo gerado é nomeado com a data atual e baixado automaticamente.

Envio para Whatsapp Web, inserindo o número do contato escolhido.

## 🛠️ Tecnologias Utilizadas
Este projeto foi construído utilizando as seguintes tecnologias:

Electron: Framework para criar aplicações de desktop com tecnologias web.

HTML5: Linguagem de marcação para a estrutura da interface.

CSS3: Folhas de estilo para o design visual da aplicação.

JavaScript: Linguagem de programação para a lógica e interatividade.

## 🚀 Como Começar
Siga os passos abaixo para configurar e executar o projeto no seu ambiente de desenvolvimento.

Pré-requisitos
Certifique-se de que tem o Node.js (que inclui o npm) instalado na sua máquina.

Para verificar a versão do Node.js: node -v

Para verificar a versão do npm: npm -v

Instalação
Clone o repositório:

```` git clone [https://github.com/angelohiukky/passagemplantaoapp.git](https://github.com/angelohiukky/passagemplantaoapp.git) ````

Navegue até o diretório do projeto:

```` cd passagemplantaoapp ````

Inicie um arquivo package.json (caso o projeto não tenha um):

```` npm init -y ````

Instale o Electron como uma dependência de desenvolvimento:

```` npm install --save-dev electron ````

Configure o script de inicialização:
Abra o arquivo package.json e, dentro do objeto "scripts", adicione a seguinte linha:

"start": "electron ."

Execute a aplicação:

```` npm start ````

## 👨‍💻 Como Usar
Após iniciar a aplicação, siga estes passos:

Selecione a Data: O campo já estará preenchido com a data atual, mas pode ser alterado se necessário.

Escolha o Técnico e o Turno: Utilize os menus de seleção.

Preencha os Campos: Descreva os agendamentos, tarefas, pendências e outras atividades nos campos de texto.

Contabilize os Chamados: Utilize os botões +1 e -1 para ajustar a quantidade de chamados abertos e fechados para cada unidade.

Gere o Relatório: Clique no botão "Gerar e Baixar Relatório .txt". O arquivo será salvo automaticamente na sua pasta de downloads.

## 🤝 Como Contribuir
Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será muito apreciada.

Faça um Fork do Projeto

Crie a sua Feature Branch (git checkout -b feature/AmazingFeature)

Faça o Commit das suas alterações (git commit -m 'Add some AmazingFeature')

Faça o Push para a Branch (git push origin feature/AmazingFeature)

Abra um Pull Request

## 📝 Licença
Este projeto está distribuído sob a Licença MIT. Veja o arquivo LICENSE para mais informações.

## 👤 Autor
Rodrigo Angelo Evangelista - Desenvolvedor do Projeto

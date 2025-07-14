const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  // Cria a janela do navegador.
  const mainWindow = new BrowserWindow({
    width: 800, // Largura da janela
    height: 700, // Altura da janela
    minWidth: 700, // Largura mínima
    minHeight: 600, // Altura mínima
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Usado para segurança (Electron padrão)
      nodeIntegration: false, // Desabilita integração do Node.js no renderer para segurança
      contextIsolation: true // Habilita isolamento de contexto para segurança
    },
    icon: path.join(__dirname, 'icon.png') // JÚNIOR: Opcional - Caminho para um ícone do seu app
  });

  // Carrega o arquivo index.html da sua aplicação.
  mainWindow.loadFile('index.html');

  // Abre as ferramentas de desenvolvedor (DevTools). Opcional, bom para depurar.
  // mainWindow.webContents.openDevTools();
}

// Este método será chamado quando o Electron terminar a inicialização
// e estiver pronto para criar janelas do navegador.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // No macOS, é comum recriar uma janela no aplicativo quando
    // o ícone do dock é clicado e não há outras janelas abertas.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Fecha o aplicativo quando todas as janelas forem fechadas, exceto no macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
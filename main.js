const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Parchment',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    frame: true,
    backgroundColor: '#FAF7F2'
  });

  mainWindow.loadFile('index.html');

  // 如果通过命令行参数打开了文件
  const filePath = process.argv[1];
  if (filePath && (filePath.endsWith('.md') || filePath.endsWith('.markdown'))) {
    setTimeout(() => {
      openFile(filePath);
    }, 500);
  }
}

function openFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath);
    mainWindow.webContents.send('file-opened', { content, filename, filePath });
    mainWindow.setTitle(`Parchment - ${filename}`);
  } catch (err) {
    dialog.showErrorBox('打开文件失败', err.message);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 处理打开文件请求
ipcMain.handle('open-file-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown', extensions: ['md', 'markdown'] },
      { name: '所有文件', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    const content = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath);
    mainWindow.setTitle(`Parchment - ${filename}`);
    return { content, filename, filePath };
  }
  return null;
});

// macOS 上通过"打开方式"打开文件
app.on('open-file', (event, filePath) => {
  event.preventDefault();
  if (mainWindow) {
    openFile(filePath);
  } else {
    app.whenReady().then(() => {
      setTimeout(() => openFile(filePath), 500);
    });
  }
});

// 获取启动参数中的文件路径（Windows）
if (process.platform === 'win32') {
  const filePath = process.argv.find(arg =>
    arg.endsWith('.md') || arg.endsWith('.markdown')
  );
  if (filePath && app.isReady()) {
    setTimeout(() => openFile(filePath), 500);
  }
}
const { app, BrowserWindow, ipcMain, net } = require('electron');
const path = require('path');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
      contextIsolation: true,
    }
  })

  win.loadFile('index.html')
};

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('my-invokable-ipc', async (event, ...args) => {

  const request = net.request('https://api.stack.mn/api/login');

  request.on('response', (response) => {
    const data = [];
    response.on('data', (chunk) => {
      data.push(chunk);
    });
    response.on('end', () => {
      const json = Buffer.concat(data).toString();
      win.webContents.send('uuuu', json);
    });

  })

  request.end();
})
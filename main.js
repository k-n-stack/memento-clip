const { app, BrowserWindow, ipcMain, net, webContents } = require('electron');
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
});

ipcMain.handle('open-url', async (event, url) => {
  require('electron').shell.openExternal(url);
});

ipcMain.handle('to-interface', async () => {
  win.loadFile('interface.html');
});

ipcMain.handle('fetch-threads', async (event, token) => {

  const request = net.request({
    method: 'GET',
    protocol: 'https:',
    hostname: 'api.stack.mn',
    path: '/api/user-thread-full'
  });

  request.setHeader('Content-Type', 'application/json');
  request.setHeader('Authorization', `Bearer ${token}`);

  request.on('response', (response) => {
    const data = [];
    response.on('data', (chunk) => {
      data.push(chunk);
    });
    response.on('end', () => {
      const json = Buffer.concat(data).toString();
      win.webContents.send('set-threads', json);
    })
  });

  request.end();
});

ipcMain.handle('my-invokable-ipc', async (event, body) => {

  const _body = JSON.stringify(body);

  const request = net.request({
    method: 'POST',
    protocol: 'https:',
    hostname: 'api.stack.mn',
    path: '/api/login',
  });

  request.setHeader('Content-Type', 'application/json');
  request.write(_body, 'utf-8');

  request.on('response', (response) => {
    const data = [];
    response.on('data', (chunk) => {
      data.push(chunk);
    });
    response.on('end', () => {
      const json = Buffer.concat(data).toString();
      win.webContents.send('fetch-login', json);
    });

  })

  request.end();
})
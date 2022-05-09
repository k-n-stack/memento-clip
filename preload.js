const { contextBridge, ipcRenderer, net } = require('electron');

contextBridge.exposeInMainWorld(
    'test',
    {
      login: async (body) => {
        const result = await ipcRenderer.invoke('my-invokable-ipc', body)
      },
      openLink: async (url) => {
        ipcRenderer.invoke('open-url', url);
      },
    }
)

ipcRenderer.on('fetch-login', (event, data) => {
  const json = JSON.parse(data);
  if (json.status === "authenticated") {
    sessionStorage.setItem('stmn_status', json.status);
    sessionStorage.setItem('stmn_token', json.token);
    sessionStorage.setItem('stmn_anid', json.alphanumeric_id);
    sessionStorage.setItem('stmn_email', json.email);
    sessionStorage.setItem('stmn_image_url', json.image_url);
    sessionStorage.setItem('stmn_pseudonym', json.pseudonym);
    ipcRenderer.invoke('fetch-threads', json.token);
  }
});

ipcRenderer.on('set-threads', (event, data) => {
  sessionStorage.setItem('stmn_threads', data);
  ipcRenderer.invoke('to-interface');
});
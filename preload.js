const { contextBridge, ipcRenderer, net } = require('electron');

contextBridge.exposeInMainWorld(
    'test',
    {
      login: async () => {
        const result = await ipcRenderer.invoke('my-invokable-ipc')
        // console.log(result);
      }
    }
)

ipcRenderer.on('uuuu', (event, data) => {
  console.log(data);
});
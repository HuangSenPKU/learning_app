const { app, BrowserWindow, ipcMain } = require('electron/main')
// require('update-electron-app')()
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false, // 设置为false以确保渲染进程可访问navigator对象
                enableRemoteModule: true,
                sandbox: false, // 禁用沙箱模式，允许访问Geolocation API
            }
        }
    })

    win.loadFile('map.html')
}

app.whenReady().then(() => {
    ipcMain.handle('ping', async () => 'pong')
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
const {
    app, // 控制应用生命周期的模块
    BrowserWindow, // 创建原生浏览器窗口的模块
    Tray,
    screen,
    ipcMain,
    globalShortcut,
} = require('electron');
const path = require('path');
const events = require('./events');

const rootFolder = path.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window, tray 会被自动地关闭
let mainWindow = null;
let tray = null;

const windowWidth = isDev ? 1200 : 1000;
const windowHeight = 600;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: '洞窝小工具',
        width: windowWidth,
        height: windowHeight,
        show: false,
        center: true,
        backgroundColor: '#403F4D',
        icon: path.join(rootFolder, 'assets', 'icon.png'),
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: false,
            preload: path.join(__dirname, 'preload.js'),
            devTools: true,
            webSecurity: false,
            allowRunningInsecureContent: true,
            // contextIsolation: false,
        },
    });

    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(rootFolder, '/build/index.html')}`;
    mainWindow.loadURL(startURL);

    globalShortcut.register('CommandOrControl+Shift+i', function () {
        mainWindow.webContents.openDevTools();
    });

    mainWindow.once('ready-to-show', () => mainWindow.show());
    tray = new Tray(path.join(rootFolder, 'assets', 'icon.png'));
    tray.setToolTip('Click to access OneCopy');

    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
};

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
    app.quit();
} else {
    app.on('second-instance', () => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.whenReady().then(() => {
        createWindow();

        // Set App ID for notifications
        app.setAppUserModelId('com.hiroshifuu.onecopy-electron');

        // 打开开发工具
        if (isDev) mainWindow.openDevTools();

        // 当 window 被关闭，这个事件会被发出
        mainWindow.on('closed', function () {
            // 取消引用 window 对象，如果你的应用支持多窗口的话，
            // 通常会把多个 window 对象存放在一个数组里面，
            // 但这次不是。
            mainWindow = null;
        });
    });
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null || BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
}

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform !== 'darwin') app.quit();
});

//事件监听
events.forEach((item) => {
    ipcMain.on(item.name, () => item.fn(app, mainWindow));
});

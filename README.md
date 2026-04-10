# Parchment - 优雅的 Markdown 阅读器

一个基于 Electron 的桌面 Markdown 查看器，支持优雅的书籍风格界面。

![Parchment](assets/icon.svg)

## 功能特点

- 🎨 **优雅界面** - 精美的书籍风格排版设计
- 📂 **文件关联** - 右键 .md 文件，选择"打开方式"即可使用
- 📑 **目录导航** - 自动生成侧边栏目录，快速跳转章节
- ⌨️ **快捷键** - Ctrl+O 快速打开文件
- 🖥️ **跨平台** - 支持 Windows

## 下载安装

### Windows

1. 前往 [Releases](../../releases) 页面下载最新版本的 `Parchment-x.x.x-win.zip`
2. 解压到任意目录（如 `C:\Program Files\Parchment`）
3. 双击 `Parchment.exe` 运行

### 设置"打开方式"

安装后，可以将 Parchment 设置为 .md 文件的默认打开方式：

1. 右键任意 .md 文件 → **打开方式** → **选择其他应用**
2. 点击 **更多应用** → **在此电脑上查找其他应用**
3. 选择解压目录中的 `Parchment.exe`
4. 勾选 **始终使用此应用打开 .md 文件**

## 开发

### 环境要求

- Node.js 18+
- npm

### 本地运行

```bash
# 安装依赖
npm install

# 运行开发版本
npm start

# 打包
npm run build:win
```

### 发布新版本

```bash
# 更新版本号
npm version 1.0.1

# 推送标签，触发自动构建
git push origin v1.0.1
```

GitHub Actions 会自动构建并发布到 Releases 页面。

## 许可证

MIT
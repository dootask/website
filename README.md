# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 帮助中心

帮助中心源码在 `help/` 目录，通过 `/help/` 路径访问。

```bash
npm run build:help   # 构建帮助文档到 public/help/
npm run build:nuxt   # 仅构建主站
npm run build        # 构建帮助文档 + 主站
```

## API

项目内置了上传/下载接口，用于管理安装包和更新日志。上传接口需要 Token 鉴权，在 `.env` 中配置：

```
UPLOAD_TOKEN=your-secret-token-here
```

### 上传更新日志

```
POST /api/upload/changelog
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "## 1.2.0\n- 新功能A\n- 修复B\n\n## 1.1.0\n- 初始版本"
}
```

### 获取更新日志

```
GET /api/changelog
```

返回格式：

```json
{
  "data": {
    "updateLog": "Markdown 内容"
  }
}
```

### 上传安装包

```
POST /api/upload/package
Authorization: Bearer <token>
Content-Type: multipart/form-data

字段：
  platform  - 平台（win / mac / linux / android）
  arch      - 架构（x64 / arm64，android 不需要）
  version   - 版本号
  file      - 安装包文件
```

示例：

```bash
curl -X POST http://localhost:3000/api/upload/package \
  -H "Authorization: Bearer your-token" \
  -F "platform=mac" \
  -F "arch=arm64" \
  -F "version=1.2.0" \
  -F "file=@DooTask-1.2.0-arm64.dmg"
```

### 下载安装包

```
GET /api/download/latest?platform=<platform>&arch=<arch>
```

参数：
- `platform` - 必填，可选值：`win` / `mac` / `linux` / `android`
- `arch` - 非 android 平台必填，可选值：`x64` / `arm64`

示例：
- Mac Apple 芯片：`/api/download/latest?platform=mac&arch=arm64`
- Windows x64：`/api/download/latest?platform=win&arch=x64`
- Android：`/api/download/latest?platform=android`

### 存储结构

上传的文件存储在 `storage/uploads/` 目录下：

```
storage/uploads/
  changelog.md          # 更新日志
  packages.json         # 安装包清单（元数据）
  packages/
    win/x64/            # Windows x64 安装包
    win/arm64/          # Windows ARM64 安装包
    mac/x64/            # macOS Intel 安装包
    mac/arm64/          # macOS Apple Silicon 安装包
    linux/x64/          # Linux x64 安装包
    android/            # Android 安装包
```

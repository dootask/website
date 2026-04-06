# DooTask Website

DooTask 官网，基于 Nuxt 3 构建。提供官网页面展示、客户端安装包下载、更新日志、客户端自动更新等功能。

## 部署

### 1. 准备环境变量

复制 `.env.example` 为 `.env`，填入上传鉴权 Token：

```bash
cp .env.example .env
```

```
UPLOAD_TOKEN=your-secret-token-here
```

此 Token 需要与 [dootask](https://github.com/kuaifan/dootask) 仓库 GitHub Secrets 中的 `UPLOAD_TOKEN` 保持一致。

### 2. 启动容器

```bash
docker compose up -d
```

默认监听 8080 端口，可在 `docker-compose.yml` 中修改。

### 3. 数据持久化

安装包和更新日志通过 volume 挂载持久化到宿主机 `./uploads` 目录：

```
./uploads/
  draft/{version}/       # 上传中的草稿版本
  release/{version}/     # 已发布的正式版本（安装包 + yml 等）
  changelog.md           # 更新日志
  manifest.json          # 包清单（元数据）
```

### 4. 与 dootask 发布流水线对接

dootask 仓库推送到 `pro` 分支时，GitHub Actions 会自动构建客户端并上传到本站。需要在 dootask 仓库的 GitHub Settings → Secrets 中配置：

| Secret | 说明 |
|--------|------|
| `UPLOAD_TOKEN` | 与本站 `.env` 中的 `UPLOAD_TOKEN` 一致 |
| `UPLOAD_URL` | 本站地址，如 `https://www.dootask.com` |

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build        # 构建帮助文档 + 主站
npm run build:nuxt   # 仅构建主站
npm run build:help   # 仅构建帮助文档到 public/help/
```

## 帮助中心

帮助中心源码在 `help/` 目录，通过 `/help/` 路径访问。

## API

### 上传安装包

```
POST /api/upload/package
Authorization: Bearer <token>
Content-Type: multipart/form-data

字段：
  version   - 版本号（必填）
  platform  - 平台（可选，win / mac / linux / android）
  arch      - 架构（可选，x64 / arm64，非 android 时必填）
  file      - 文件
```

有 `platform` 字段时为安装包，无 `platform` 时为辅助文件（如 latest.yml、blockmap）。上传的文件进入 draft 状态。

### 发布版本

```
POST /api/upload/release
Authorization: Bearer <token>
Content-Type: application/json

{ "version": "1.7.14" }
```

将 draft 版本发布为 release，用户才能下载。

### 上传更新日志

```
POST /api/upload/changelog
Authorization: Bearer <token>
Content-Type: application/json

{ "content": "Markdown 内容" }
```

### 获取更新日志

```
GET /api/changelog
```

### 下载安装包

```
GET /api/download/latest?platform=<platform>&arch=<arch>
```

- `platform` - 必填：`win` / `mac` / `linux` / `android`
- `arch` - 非 android 必填：`x64` / `arm64`

### 客户端自动更新

新版本客户端通过以下路径检查更新和下载：

```
GET /api/download/update/{filename}
```

旧版本客户端兼容路径（已有客户端硬编码此地址）：

```
GET /desktop/publish/{filename}
```

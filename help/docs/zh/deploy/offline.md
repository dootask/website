# 离线部署

当目标服务器**无法访问外网**（内网环境、专网、信创/政企隔离网络等），无法在线拉取 Docker 镜像和依赖时，可按本指南进行离线部署。

核心思路：先在**一台能联网的机器**上把所有需要联网才能获取的物料（Docker 镜像、PHP 依赖、项目代码）准备好，打成离线包，再拷贝到离线服务器上加载安装。

## 前置条件

离线服务器需提前安装好以下基础环境（这部分也需要离线安装，请到对应官网下载离线安装包）：

- **Docker v20.10+**
- **Docker Compose v2.0+**

:::tip 提示
联网准备机与离线服务器的 **CPU 架构必须一致**（同为 `x86_64/amd64` 或同为 `arm64`）。架构不一致时导出的镜像无法在目标机运行，需在与目标机同架构的机器上准备物料。
:::

## 第一步：在联网机器上准备离线物料

### 1. 克隆项目代码

```bash
git clone -b pro --depth=1 https://github.com/kuaifan/dootask.git
cd dootask
```

### 2. 导出 Docker 镜像

DooTask 依赖的镜像定义在项目根目录的 `docker-compose.yml` 中。**镜像版本会随版本发布变化（尤其是 appstore），导出前请先核对实际版本：**

```bash
grep 'image:' docker-compose.yml
```

以当前版本为例，需要以下镜像（请以你 `grep` 出来的结果为准）：

```bash
docker pull kuaifan/php:swoole-8.4
docker pull nginx:alpine
docker pull redis:alpine
docker pull mariadb:10.7.3
docker pull dootask/appstore:0.5.3
```

拉取完成后，一次性导出为离线镜像包：

```bash
docker save \
  kuaifan/php:swoole-8.4 \
  nginx:alpine \
  redis:alpine \
  mariadb:10.7.3 \
  dootask/appstore:0.5.3 \
  | gzip > dootask-images.tar.gz
```

### 3. 预装 PHP 依赖（重要）

离线安装时无法联网执行 `composer install`，必须提前把 `vendor/` 目录准备好。在联网机器的项目目录下执行：

```bash
./cmd composer install --optimize-autoloader
```

执行完成后会生成完整的 `vendor/` 目录。

:::tip 提示
也可以直接从对应版本的 [GitHub Release](https://github.com/kuaifan/dootask/releases) 下载附件 `vendor.tar.gz`，解压到项目根目录得到 `vendor/`，省去本地构建。注意 `vendor.tar.gz` 必须与项目代码**版本一致**。
:::

### 4. 打包整个项目目录

把包含 `vendor/` 和 `dootask-images.tar.gz` 的整个项目目录打成压缩包，便于传输：

```bash
cd ..
tar -czf dootask-offline.tar.gz dootask/
```

## 第二步：拷贝到离线服务器

通过 U 盘、内网传输、`scp` 等任意方式，把 `dootask-offline.tar.gz` 拷贝到离线服务器。

```bash
tar -xzf dootask-offline.tar.gz
cd dootask
```

## 第三步：在离线服务器上加载并安装

### 1. 加载 Docker 镜像

```bash
docker load -i dootask-images.tar.gz
```

加载完成后用 `docker images` 确认所有镜像都已存在。

### 2. 确认 PHP 依赖已就位

确认项目目录下 `vendor/autoload.php` 存在（即第一步准备的 `vendor/` 已随包带过来）。

### 3. 执行安装

```bash
./cmd install
```

由于镜像已 `docker load`、`vendor/` 已就位，安装过程不再需要联网（`docker compose` 见本地已有镜像不会再拉取，`composer install` 在 `vendor/` 完整时是空操作）。如需指定端口：

```bash
./cmd install --port 80
```

## 后续升级

离线环境无法 `git pull`，升级思路是"在联网机准备新版物料 → 拷贝到离线机覆盖代码 → 本地模式升级"。

`./cmd update --local` 会**跳过联网拉代码和 `composer install`**，只做数据库备份、迁移并重启服务，因此**新版代码和 `vendor/` 需要你手动放到位**。

1. **联网机**：在项目目录 `git pull`（或重新 clone）到新版本，执行 `./cmd composer install --optimize-autoloader` 重新生成 `vendor/`；重新 `grep docker-compose.yml` 核对镜像版本并重新导出 `dootask-images.tar.gz`（新版本可能升级了镜像 tag，这步不能省）。
2. **离线机**：先备份数据 `./cmd mysql backup`。
3. **离线机**：`docker load -i dootask-images.tar.gz` 加载新镜像。
4. **离线机**：用新版本的**代码和 `vendor/`** 覆盖现有项目目录，但**保留** `.env`、`docker/`（含数据库数据）、`public/uploads`（上传文件）等运行时数据——即只替换程序代码，不动配置与数据。
5. **离线机**：执行 `./cmd update --local` 完成数据库迁移并重启（`--local` 不联网拉代码与依赖）。

:::warning 注意
不要用新包整目录覆盖旧安装，否则会丢失 `.env`、数据库数据和已上传文件。务必只替换代码与 `vendor/`，保留上述运行时目录。升级前的 `./cmd mysql backup` 也是为此兜底。
:::

## 常见问题

### 安装卡在"安装依赖失败"

说明 `vendor/` 不完整或缺失。离线机无法联网补全依赖，请回到联网机执行 `./cmd composer install --optimize-autoloader` 生成**完整**的 `vendor/` 后重新拷贝。

### `docker load` 后 `./cmd install` 仍尝试联网拉取镜像

检查 `docker-compose.yml` 里的镜像 tag 与你 `docker load` 进来的镜像 tag 是否**完全一致**。tag 不一致时 Docker 会认为本地没有该镜像而尝试联网拉取。

### 镜像在目标机无法启动 / 报架构错误

准备机与目标机 CPU 架构不一致。请在与目标机同架构（`amd64`/`arm64`）的机器上重新准备镜像包。

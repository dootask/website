# 应用部署

本指南将带您逐步完成应用部署，涵盖系统要求、服务器部署步骤及常见注意事项，确保您能够快速且顺利地部署应用。

## 系统要求

在开始部署应用之前，请确保您的系统满足以下要求：

### 必须安装的工具
- **Docker v20.10+**：系统必须安装 Docker 版本 20.10 或更高版本，确保系统稳定运行。
- **Docker Compose v2.0+**：必须安装 Docker Compose 2.0 或以上版本，以便于容器化应用的正常运行。

### 支持的操作系统
- **Linux 系统**：
  - `CentOS`
  - `Debian`
  - `Ubuntu`
- **macOS**
- **Windows**

:::tip 特别说明
在 Windows 系统下，为确保命令能够顺利执行，建议使用 Git Bash 或 Cmder。
:::

### 硬件要求
- **CPU**：双核处理器或更高
- **RAM**：建议不少于 4GB 内存
- **硬盘**：建议有充足的存储空间，以容纳 Docker 镜像和容器数据


## 服务器部署步骤

按照以下步骤进行项目部署，确保系统满足前述要求。

### 克隆项目代码

从 GitHub 或 Gitee 克隆项目到本地或服务器：

- **GitHub**:
  ```bash
  git clone -b pro --depth=1 https://github.com/kuaifan/dootask.git
  ```

- **Gitee**:
  ```bash
  git clone -b pro --depth=1 https://gitee.com/aipaw/dootask.git
  ```

### 进入项目目录

切换到项目的根目录：
```bash
cd dootask
```

### 安装项目

使用以下命令进行一键安装部署项目：
```bash
./cmd install
```

### 自定义端口安装

如果需要指定服务的运行端口，可以使用以下命令进行自定义端口配置：
```bash
./cmd install --port 80
```

## 注意事项

- **网络连接**：在安装过程中，可能会拉取相关依赖和镜像，请确保您的网络连接稳定。
- **Docker 和 Docker Compose 安装**：安装失败时，首先检查是否已正确安装 Docker 和 Docker Compose，并确保系统权限足够。
- **权限问题**：若出现权限相关问题，请确保使用具有管理员权限的用户进行操作。

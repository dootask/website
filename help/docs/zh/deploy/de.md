# 部署

按照以下步骤部署项目，确保系统满足系统要求。


## 1. 克隆项目代码

您可以通过以下任一平台将项目克隆到本地或服务器：

- **GitHub**:
```bash
git clone -b pro --depth=1 https://github.com/kuaifan/dootask.git
```

- **Gitee**:
```bash
git clone -b pro --depth=1 https://gitee.com/aipaw/dootask.git
```



## 2. 进入项目目录

切换到项目的根目录：
```bash
cd dootask
```


## 3. 安装项目

使用一键安装命令部署项目：
```bash
./cmd install
```



**自定义端口安装**  
如果需要指定服务的运行端口，可以通过以下命令自定义端口号：
```bash
./cmd install --port 80
```


## 配置


### 运行命令的快捷方式

```bash
# 你可以使用以下命令来执行
./cmd artisan "your command"          # 运行 artisan 命令
./cmd php "your command"              # 运行 php 命令
./cmd nginx "your command"            # 运行 nginx 命令
./cmd redis "your command"            # 运行 redis 命令
./cmd composer "your command"         # 运行 composer 命令
./cmd supervisorctl "your command"    # 运行 supervisorctl 命令
./cmd mysql "your command"            # 运行 mysql 命令 (backup: 备份数据库，recovery: 还原数据库，open: 开启数据库外部端口访问，close: 关闭数据库外部端口访问)
```

### 修改端口

```bash
./cmd port 80
```

### 重置管理员密码

```bash
./cmd repassword
```

### SSL配置

1. 使用脚本配置，会使用80/443端口，并申请免费证书
```bash
./cmd https 
```

2. 手动配置

### 备份数据

```bash
./cmd mysql backup
```

### 恢复数据

```bash
./cmd mysql recovery
```

### 升级
```bash
# Method 1: Running commands in a project
./cmd update

# Or method 2: use this method if method 1 fails
git pull
./cmd mysql backup
./cmd uninstall
./cmd install
./cmd mysql recovery
```
跨越大版本升级失败时请重试执行一次。

如果升级后出现502请运行 `./cmd restart` 重启服务即可。

### 迁移

在新项目安装好之后按照以下步骤完成项目迁移：

1、备份原数据库

```bash
# 在旧的项目下运行命令
./cmd mysql backup
```

2、将`数据库备份文件`及`public/uploads`目录拷贝至新项目

3、还原数据库至新项目
```bash
# 在新的项目下运行命令
./cmd mysql recovery
```
# Deployment

Follow these steps to deploy the project, ensuring the system meets the requirements.

## 1. Clone Project Code

You can clone the project to your local machine or server through either of these platforms:

- **GitHub**:
```bash
git clone -b pro --depth=1 https://github.com/kuaifan/dootask.git
```

- **Gitee**:
```bash
git clone -b pro --depth=1 https://gitee.com/aipaw/dootask.git
```

## 2. Enter Project Directory

Switch to the project's root directory:
```bash
cd dootask
```

## 3. Install Project

Use the one-click installation command to deploy the project:
```bash
./cmd install
```

**Custom Port Installation**  
If you need to specify a custom port for the service, use the following command:
```bash
./cmd install --port 80
```

## Configuration

### Command Shortcuts

```bash
# You can use the following commands to execute
./cmd artisan "your command"          # Run artisan commands
./cmd php "your command"              # Run PHP commands
./cmd nginx "your command"            # Run nginx commands
./cmd redis "your command"            # Run redis commands
./cmd composer "your command"         # Run composer commands
./cmd supervisorctl "your command"    # Run supervisorctl commands
./cmd mysql "your command"            # Run mysql commands (backup: backup database, recovery: restore database, open: enable external database port access, close: disable external database port access)
```

### Modify Port

```bash
./cmd port 80
```

### Reset Administrator Password

```bash
./cmd repassword
```

### SSL Configuration

1. Using script configuration, which will use ports 80/443 and apply for a free certificate
```bash
./cmd https 
```

2. Manual configuration

### Backup Data

```bash
./cmd mysql backup
```

### Restore Data

```bash
./cmd mysql recovery
```

### Upgrade
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
If the upgrade fails across major versions, please try executing it again.

If you encounter a 502 error after upgrading, run `./cmd restart` to restart the service.

### Migration

After installing the new project, follow these steps to complete project migration:

1. Backup the original database

```bash
# Run command in the old project
./cmd mysql backup
```

2. Copy the `database backup file` and `public/uploads` directory to the new project

3. Restore the database to the new project
```bash
# Run command in the new project
./cmd mysql recovery
```
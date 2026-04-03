# Application Deployment

This guide will walk you through the application deployment process, covering system requirements, server deployment steps, and common considerations to ensure a quick and smooth deployment.

## System Requirements

Before deploying the application, please ensure your system meets the following requirements:

### Required Tools
- **Docker v20.10+**: The system must have Docker version 20.10 or higher installed to ensure stable operation.
- **Docker Compose v2.0+**: Docker Compose 2.0 or higher must be installed for proper containerized application operation.

### Supported Operating Systems
- **Linux Systems**:
  - `CentOS`
  - `Debian`
  - `Ubuntu`
- **macOS**
- **Windows**

:::tip Note
On Windows systems, it is recommended to use Git Bash or Cmder to ensure commands execute smoothly.
:::

### Hardware Requirements
- **CPU**: Dual-core processor or higher
- **RAM**: Minimum 4GB recommended
- **Hard Drive**: Sufficient storage space recommended to accommodate Docker images and container data

## Server Deployment Steps

Follow these steps for project deployment, ensuring the system meets the aforementioned requirements.

### Clone Project Code

Clone the project from GitHub or Gitee to your local machine or server:

- **GitHub**:
  ```bash
  git clone -b pro --depth=1 https://github.com/kuaifan/dootask.git
  ```

- **Gitee**:
  ```bash
  git clone -b pro --depth=1 https://gitee.com/aipaw/dootask.git
  ```

### Enter Project Directory

Switch to the project's root directory:
```bash
cd dootask
```

### Install Project

Use the following command for one-click project installation and deployment:
```bash
./cmd install
```

### Custom Port Installation

If you need to specify a custom port for the service, use the following command:
```bash
./cmd install --port 80
```

## Important Notes

- **Network Connection**: During installation, dependencies and images may need to be pulled. Please ensure your network connection is stable.
- **Docker and Docker Compose Installation**: If installation fails, first verify that Docker and Docker Compose are properly installed and ensure sufficient system permissions.
- **Permission Issues**: If permission-related problems occur, make sure you are using a user with administrative privileges.

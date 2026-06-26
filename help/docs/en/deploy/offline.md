# Offline Deployment

When the target server **has no internet access** (intranet environments, private/isolated networks, etc.) and cannot pull Docker images and dependencies online, follow this guide for offline deployment.

Core idea: on **a machine with internet access**, prepare everything that requires a network connection (Docker images, PHP dependencies, project code) into an offline bundle, then copy it to the offline server to load and install.

## Prerequisites

The offline server needs the following base environment installed in advance (these also require offline installation — download the offline installers from their official sites):

- **Docker v20.10+**
- **Docker Compose v2.0+**

:::tip Note
The **CPU architecture must match** between the online preparation machine and the offline server (both `x86_64/amd64`, or both `arm64`). Images exported on a different architecture will not run on the target machine — prepare the bundle on a machine with the same architecture as the target.
:::

## Step 1: Prepare the offline bundle on a machine with internet

### 1. Clone the project code

```bash
git clone -b pro --depth=1 https://github.com/kuaifan/dootask.git
cd dootask
```

### 2. Export Docker images

The images DooTask depends on are defined in `docker-compose.yml` at the project root. **Image versions change with releases (especially appstore), so verify the actual versions before exporting:**

```bash
grep 'image:' docker-compose.yml
```

For the current version, the following images are required (use the result of your own `grep`):

```bash
docker pull kuaifan/php:swoole-8.4
docker pull nginx:alpine
docker pull redis:alpine
docker pull mariadb:10.7.3
docker pull dootask/appstore:0.5.3
```

Once pulled, export them all into a single offline image bundle:

```bash
docker save \
  kuaifan/php:swoole-8.4 \
  nginx:alpine \
  redis:alpine \
  mariadb:10.7.3 \
  dootask/appstore:0.5.3 \
  | gzip > dootask-images.tar.gz
```

### 3. Pre-install PHP dependencies (important)

Offline installation cannot run `composer install` over the network, so the `vendor/` directory must be prepared in advance. In the project directory on the online machine, run:

```bash
./cmd composer install --optimize-autoloader
```

This generates a complete `vendor/` directory.

:::tip Note
Alternatively, download the `vendor.tar.gz` asset from the matching [GitHub Release](https://github.com/kuaifan/dootask/releases) and extract it into the project root to obtain `vendor/`, skipping the local build. The `vendor.tar.gz` **must match the version** of the project code.
:::

### 4. Archive the entire project directory

Bundle the whole project directory (including `vendor/` and `dootask-images.tar.gz`) into an archive for easy transfer:

```bash
cd ..
tar -czf dootask-offline.tar.gz dootask/
```

## Step 2: Copy to the offline server

Transfer `dootask-offline.tar.gz` to the offline server by any means (USB drive, intranet transfer, `scp`, etc.).

```bash
tar -xzf dootask-offline.tar.gz
cd dootask
```

## Step 3: Load and install on the offline server

### 1. Load the Docker images

```bash
docker load -i dootask-images.tar.gz
```

Confirm all images exist with `docker images`.

### 2. Verify PHP dependencies are in place

Confirm `vendor/autoload.php` exists in the project directory (i.e. the `vendor/` prepared in Step 1 was included in the bundle).

### 3. Run the installation

```bash
./cmd install
```

Since the images are already loaded and `vendor/` is in place, the installation no longer needs internet access (`docker compose` won't pull images that already exist locally, and `composer install` is a no-op when `vendor/` is complete). To specify a custom port:

```bash
./cmd install --port 80
```

## Upgrading later

An offline environment cannot `git pull`, so the upgrade approach is "prepare the new bundle online → copy it over and replace the code offline → upgrade in local mode".

`./cmd update --local` **skips pulling code over the network and `composer install`** — it only backs up the database, runs migrations, and restarts the services. This means **the new code and `vendor/` must be put in place by you**.

1. **Online machine**: `git pull` (or re-clone) the project to the new version, run `./cmd composer install --optimize-autoloader` to regenerate `vendor/`; re-run `grep docker-compose.yml` to verify image versions and re-export `dootask-images.tar.gz` (a new release may bump image tags — do not skip this).
2. **Offline machine**: back up the data first with `./cmd mysql backup`.
3. **Offline machine**: load the new images with `docker load -i dootask-images.tar.gz`.
4. **Offline machine**: overwrite the existing project directory with the new **code and `vendor/`**, but **preserve** runtime data such as `.env`, `docker/` (database data), and `public/uploads` (uploaded files) — i.e. replace only the program code, leave configuration and data untouched.
5. **Offline machine**: run `./cmd update --local` to complete the database migration and restart (`--local` does not pull code or dependencies over the network).

:::warning Warning
Do not overwrite the existing installation by replacing the whole directory, or you will lose `.env`, the database data, and uploaded files. Replace only the code and `vendor/`, and keep the runtime directories above. The `./cmd mysql backup` before upgrading is also a safeguard for this.
:::

## FAQ

### Installation stalls at "dependency installation failed"

This means `vendor/` is incomplete or missing. The offline machine cannot complete dependencies over the network — go back to the online machine and run `./cmd composer install --optimize-autoloader` to generate a **complete** `vendor/`, then copy it over again.

### After `docker load`, `./cmd install` still tries to pull images online

Check that the image tags in `docker-compose.yml` **exactly match** the tags you loaded with `docker load`. If the tags differ, Docker treats the image as missing locally and tries to pull it online.

### Images fail to start / report an architecture error on the target machine

The preparation machine and target machine have mismatched CPU architectures. Re-prepare the image bundle on a machine with the same architecture (`amd64`/`arm64`) as the target.

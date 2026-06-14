---
name: dootask-website-release
description: Use when user wants to release a new version, publish a version, bump the version, ship a release, or "发版/发布版本/发个版本". Reads current version, proposes next, then bumps package.json, commits, and pushes.
---

# Release dootask-website

发布 dootask-website 新版本。版本号只存在于根目录 `package.json`，发版流程就是改版本号 + 提交 + 推送。CI 会读 `package.json` 的 `version`，如果对应 tag 不存在就自动构建多架构 Docker 镜像（`:<version>` + `:latest` 双 tag）推到 `ghcr.io/dootask/website/web`，并回打 git tag 到 origin。

## 流程

1. **检查工作区干净**：先跑 `git status --porcelain`。
   - **有未提交的改动** → 停下来，把 `git status` 的结果列给用户，询问是先提交/丢弃/stash 还是取消发版。**不要替用户 `git add` 一把梭**，也不要把这些无关改动夹带进 version bump 提交里。用户明确说"都一起提交"之后再继续。
   - **干净** → 继续下一步。
   - 同时确认在 `main` 分支上（不是就问用户是否切换）。
2. **读取当前版本**：`package.json` 的 `version` 字段。
3. **建议下一个版本**：默认建议 **patch** 递增（`1.0.0 → 1.0.1`），同时列出 minor / major 选项供用户选择。遵循 SemVer：
   - patch：bug 修复、文档、小调整
   - minor：新增功能（向后兼容）
   - major：破坏性变更
4. **等用户确认**：用 `<options>` 列出候选版本号，第一项为推荐项。**必须等用户选定后再动手**。
5. **实施**：
   - 修改 `package.json` 的 `version` 字段（只改这一处）。
   - `git add package.json`
   - `git commit -m "chore: bump version to X.Y.Z"`（保持与历史一致，不加 Co-Authored-By，不加其他 body）
   - `git push`
6. **汇报**：一句话告诉用户发布完成，附新版本号 + Actions 链接。

## 注意事项

- **只改 `package.json`**。不要去找 `CHANGELOG`、`src/` 里的版本常量之类的东西 —— 本项目的版本号唯一来源就是根 `package.json`。
- **commit 消息用英文**，格式固定：`chore: bump version to X.Y.Z`。
- **不加 Co-Authored-By 尾注**。
- **不要在 push 前跑 lint / test / build**，用户要的是快速发版。如有 pre-commit hook 失败，照常排查原因，不要 `--no-verify`。
- **推荐版本号的判断依据**：如果最近提交里全是 `fix:` / `chore:` / `docs:`，推 patch；出现 `feat:` 推 minor；用户另行说明则以用户为准。可以快速看一眼 `git log <last-tag>..HEAD` 或最近几条 commit 辅助判断，但不要过度分析。
- **镜像仓库路径带 `/web` 后缀**：`ghcr.io/dootask/website/web:<version>`，不是 `ghcr.io/dootask/website:<version>`。汇报时别写错。
- **如果 CI 报跳过（SKIP=true）**：说明 tag 已存在 = 这个版本号发过了。需要改更大的版本号重发；**不要**去删远端 tag 后复用同一号。
- **help 帮助文档**：帮助中心源码已内置在本仓库 `help/`（VitePress 项目），CI 直接用 `npm run build:help` 构建进镜像，**不再依赖外部 `xxyijixx/dootask-help`**。如果用户抱怨帮助中心没更新，就在本仓库 `help/docs/` 下改内容后正常发版即可。
- **普通 push 也会触发 CI**：workflow 是 `on: push: branches: [main]`，但有"tag 存在则跳过"的门，所以如果用户没改版本号就 push，CI 会跑起来但直接跳过构建 —— 这是预期行为，别去解释"为啥 push 触发了 CI"这种问题。

## 询问用户确认的模板

```
当前版本：X.Y.Z
建议下一版：X.Y.(Z+1)（理由：最近都是 fix/chore）

<options>
  <option>X.Y.(Z+1) — patch</option>
  <option>X.(Y+1).0 — minor</option>
  <option>(X+1).0.0 — major</option>
</options>
```

## 完成后

回复形如：
`已发布 vX.Y.Z，已推送到 origin/main。CI 将自动构建 Docker 镜像到 ghcr.io/dootask/website/web:X.Y.Z。进度：https://github.com/dootask/website/actions`

不需要总结改动，不需要列步骤。

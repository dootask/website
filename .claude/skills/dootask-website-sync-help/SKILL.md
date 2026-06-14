---
name: dootask-website-sync-help
description: 把本仓库 help/(VitePress 帮助中心)对齐到 dootask 主程序 CHANGELOG 的最新功能。仅通过 /dootask-website-sync-help 命令调用。
---

# 同步 help 帮助文档到 dootask 主程序

- 本仓库(website):`/home/coder/workspaces/dootask-website`,帮助文档在 `help/`。
- 主程序(dootask):`/home/coder/workspaces/dootask`,变更日志 `CHANGELOG.md`。路径不存在就问用户。

## 流程

1. **定基准**:`help/docs/zh/changelog.md` 顶部版本 = 上次对齐点;主程序 `CHANGELOG.md` 顶部版本 = 最新。相等则报"已对齐到 vX.Y.Z"并结束;否则处理 `(已对齐, 最新]` 区间。(changelog 为空说明首次,用 `git log -- help/` 和主程序 release tag 推起点。)

2. **取差集**:区间内的 `Features` 和用户可感知的 `Performance` 要写;纯内部 bugfix、重构、CI/docker/skill 变更跳过。

3. **核对真实 UI**(最关键,别编):写之前 grep 主程序源码拿到准确的菜单名、设置项、选项文案。
   - 系统设置:`dootask/resources/assets/js/pages/manage/setting/components/SystemSetting.vue`(字段名 + Radio/Checkbox 选项 + form-tip)。
   - 界面文案:`dootask/language/original-web.txt`、`original-api.txt`。
   - 权限边界:`dootask/app/Models/`、`dootask/app/Http/Controllers/`。

4. **写 zh + 镜像 en**:每处改动在 `docs/zh/` 和 `docs/en/` 各写一份,结构一致。新增页面前先 `ls help/docs/zh/functions/` 按领域归位。沿用目标文件已有句式(`**项**:说明`、`::: tip`、功能概述/使用建议 bullet)。**新文档不引用没有的图片**,纯文字写步骤。

5. **挂侧边栏**(仅新增页面):`help/docs/.vitepress/sidebar/zh.ts` 和 `en.ts` 都加入口。

6. **更新 changelog**:新版本条目写到 `docs/zh/changelog.md` 和 `docs/en/changelog.md` 顶部,带站内链接。这同时维护了下次的基准点。

7. **构建验证**:`cd help && npm run docs:build`(报 `vitepress: not found` 就先 `npm install`)。它校验死链,必须通过。

8. **停在提交前**:`git status --short help/`,给改动小结 + 建议 commit 消息,用 `<options>` 让用户决定是否提交。默认不提交、不推送。

## 站内链接前缀

zh 是根 locale,en 在 `/en/`。zh 内链写 `/functions/im/todo`(不带 `/zh`),en 写 `/en/functions/im/todo`。写错前缀会构建死链。

## commit 消息模板

```
docs(help): 对齐主程序 v<起>→v<最新> 功能

<一句话:新增/修订了哪些功能文档>,中英文同步。
```

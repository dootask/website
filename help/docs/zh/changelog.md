# 更新日志

本页记录 DooTask 主要面向用户的功能更新，便于了解版本演进。完整的技术变更请以主程序仓库的 CHANGELOG 为准。

## v1.7.90

- 系统设置新增「[创建项目](/functions/account/system-setting)」权限开关，可指定由所有人、部门负责人或特定人员创建项目，未授权时自动隐藏新建入口。
- 会员卡片新增「项目与任务」入口，可直接查看成员参与的[项目、待办与已完成任务](/functions/team/member-management)。
- [审批详情](/functions/approval/approve)支持删除已结束的审批，由发起人或管理员清理无用记录更方便。
- 管理员可设置全员群的群名称，便于统一团队群组的展示。

## v1.7.81

- [团队管理](/functions/team/member-management)中可标记成员邮箱认证状态，成员信息更易管理。
- 系统管理员可在任意群组中设置或取消他人的[聊天待办](/functions/im/todo)，协作管理更灵活。
- 优化大文件下载方式，下载更稳定、更高效。

## v1.7.67

- 新增[聊天待办](/functions/im/todo)提醒时间，到点会引用原消息并提醒相关人员，避免遗漏重要事项。
- [团队管理](/functions/team/member-management)支持管理员创建或批量导入员工账号，并可填写部门、职位等信息。
- 系统设置新增聊天待办[权限控制](/functions/account/system-setting)，可限制其他人员设置或取消聊天待办。

## v1.7.55

- 新增[部门负责人只读视角](/functions/account/system-setting)，可查看部门成员的项目和任务，并按可见性设置控制展示范围。
- 群组、[项目](/functions/projects/team-management)和部门支持主负责人 + 副负责人，协作管理更灵活。
- 新增[共享任务模板](/functions/projects/task-templates)，支持跨项目使用、搜索和使用统计。
- 管理页侧边栏支持拖拽调整宽度。
- [项目归档](/functions/projects/project-archiving)设置选择系统默认规则时，会显示对应提示，减少误操作。
- 支持按需调整翻译使用的模型，便于适配不同使用场景。

## v1.7.29

- [AI 助手](/basic/Aiass-dootask)聊天记录现在可自动保存，换设备或重新打开后也能继续查看历史对话。
- 改善 AI 助手中长图的显示清晰度，减少图片被压缩后变模糊的问题。

## v1.7.23

- 支持使用非[邮箱形式的用户名登录](/functions/account/account-login)，也更适合接入常见的企业账号环境。
- 进一步优化与 Active Directory 的兼容性，企业用户接入和登录更顺畅。

## v1.7.20

- 优化了 LDAP 登录方式，更好兼容 Active Directory，企业账号登录更稳定。

## v1.7.14

- 新增[消息合并转发](/functions/im/forward)，支持批量选择后一次转发。
- 现在可以按项目负责人[筛选任务](/functions/projects/task)，并支持解除任务关联。
- 新增 [AI 自动分析](/functions/account/system-setting)开关，可按需开启或关闭。
- 支持[自定义 AI 服务地址](/functions/ai)，连接和接入方式更灵活。

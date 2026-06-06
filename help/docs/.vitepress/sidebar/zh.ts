import { DefaultTheme } from "vitepress";

export const zhSidebar: DefaultTheme.Sidebar = {
  "/": [
    {
      text: "🗝️ &ensp; 快速开始",
      collapsed: false,
      items: [
        { text: "快速了解 Dooask", link: "/basic/quick-start" },
        { text: "AI助手", link: "/basic/Aiass-dootask" },
        { text: "仪表盘", link: "/basic/dashboard" },
        { text: "任务日历", link: "/basic/clander" },
      ],
    },
    {
      text: "🛠️ &ensp; 账号与设置",
      collapsed: false,
      items: [
        { text: "账号注册", link: "/functions/account/account-register" },
        { text: "账号登录", link: "/functions/account/account-login" },
        { text: "个人设置", link: "/functions/account/personal-setting" },
        {
          text: "系统设置（管理员）",
          link: "/functions/account/system-setting",
        },
      ],
    },
    {
      text: "💬 &ensp; 即时沟通",
      collapsed: false,
      items: [
        { text: "消息状态", link: "/functions/im/sf" },
        { text: "会话标记", link: "/functions/im/sign" },
        { text: "消息编辑", link: "/functions/im/edit" },
        { text: "聊天待办", link: "/functions/im/todo" },
        { text: "消息转发", link: "/functions/im/forward" },
        { text: "创建群组", link: "/functions/im/create-group" },
        { text: "匿名消息", link: "/functions/im/anonymous" },
        { text: "表情回复消息", link: "/functions/im/emoji-reply" },
        { text: "群接龙", link: "/functions/im/group-riddle" },
        { text: "群投票", link: "/functions/im/grooup-vote" },
      ],
    },
    {
      text: "✅ &ensp; 项目与任务管理",
      collapsed: false,
      items: [
        { text: "项目成员管理", link: "/functions/projects/team-management" },
        { text: "项目权限管理", link: "/functions/projects/access-control" },
        { text: "项目归档", link: "/functions/projects/project-archiving" },
        { text: "任务管理", link: "/functions/projects/task" },
        { text: "任务模板", link: "/functions/projects/task-templates" },
        { text: "任务标签", link: "/functions/projects/task-tags" },
        { text: "工作流设置", link: "/functions/projects/workflow" },
        { text: "多种任务展示模式", link: "/functions/projects/view-modes" },
        // { text: "AI辅助任务创建", link: "/functions/projects/ai-assistance" },
      ],
    },
    {
      text: "📦 &ensp; 工具与功能模块",
      collapsed: false,
      items: [
        {
          text: "签到打卡",
          collapsed: true,
          items: [
            { text: "多种打卡方式", link: "/functions/checkin/many-ways" },
            { text: "签到设置(管理员)", link: "/functions/checkin/setting" },
            { text: "数据导出(管理员)", link: "/functions/checkin/export" },
          ],
        },
        {
          text: "审批中心",
          collapsed: true,
          items: [
            { text: "提交审批", link: "/functions/approval/submit" },
            { text: "处理审批", link: "/functions/approval/approve" },
            { text: "数据导出(管理员)", link: "/functions/approval/export" },
            {
              text: "自定义审批流程(管理员)",
              link: "/functions/approval/process",
            },
          ],
        },
        {
          text: "OKR管理",
          collapsed: true,
          items: [
            { text: "OKR管理", link: "/functions/okr/okr-basic" },
            { text: "OKR结果分析", link: "/functions/okr/okr-analysis" },
          ],
        },
        {
          text: "团队管理",
          collapsed: true,
          items: [
            {
              text: "团队管理(管理员)",
              link: "/functions/team/member-management",
            },
            // { text: "组织架构调整", link: ""},
            // { text: "员工离职处理", link: ""},
          ],
        },
        {
          text: "文件管理",
          collapsed: true,
          items: [
            { text: "文件管理", link: "/functions/file/type" },
            { text: "文件共享和访问权限", link: "/functions/file/share" },
            { text: "文件展示方式", link: "/functions/file/show" },
          ],
        },
        { text: "工作报告", link: "/functions/report" },
        { text: "提醒功能", link: "/functions/reminders" },
        { text: "AI机器人", link: "/functions/ai" },
      ],
    },
    {
      text: "🚀 &ensp; 部署与集成",
      link: "/deploy",
    },
    {
      text: "🤝 &ensp; 支持与帮助",
      link: "/support",
    },
    {
      text: "📚 &ensp; 文档完善中",
      link: "/more",
    },
  ],
};

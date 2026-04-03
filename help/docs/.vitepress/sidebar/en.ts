import { DefaultTheme } from "vitepress";

export const enSidebar: DefaultTheme.Sidebar = {
  "/en/": [
    {
      text: "🗝️ &ensp; Quick Start",
      collapsed: false,
      items: [
        { text: "Getting Started with Dooask", link: "/en/basic/quick-start" },
        { text: "AI Assistant", link: "/en/basic/Aiass-dootask" },
        { text: "Dashboard", link: "/en/basic/dashboard" },
        { text: "Task Calendar", link: "/en/basic/clander" },
      ],
    },
    {
      text: "🛠️ &ensp; Account & Settings",
      collapsed: false,
      items: [
        { text: "Account Registration", link: "/en/functions/account/account-register" },
        { text: "Account Login", link: "/en/functions/account/account-login" },
        { text: "Personal Settings", link: "/en/functions/account/personal-setting" },
        {
          text: "System Settings (Admin)", 
          link: "/en/functions/account/system-setting",
        },
      ],
    },
    {
      text: "💬 &ensp; Instant Messaging",
      collapsed: false,
      items: [
        { text: "Message Status", link: "/en/functions/im/sf" },
        { text: "Conversation Tags", link: "/en/functions/im/sign" },
        { text: "Message Editing", link: "/en/functions/im/edit" },
        { text: "Create Group", link: "/en/functions/im/create-group" },
        { text: "Anonymous Messaging", link: "/en/functions/im/anonymous" },
        { text: "Emoji Replies", link: "/en/functions/im/emoji-reply" },
        { text: " Group Solitaire", link: "/en/functions/im/group-riddle" },
        { text: "Group Polls", link: "/en/functions/im/grooup-vote" },
      ],
    },
    {
      text: "✅ &ensp; Project & Task Management",
      collapsed: false,
      items: [
        { text: "Project Team Management", link: "/en/functions/projects/team-management" },
        { text: "Project Permissions", link: "/en/functions/projects/access-control" },
        { text: "Project Archiving", link: "/en/functions/projects/project-archiving" },
        { text: "Task Management", link: "/en/functions/projects/task" },
        { text: "Task Templates", link: "/en/functions/projects/task-templates" },
        { text: "Task Tags", link: "/en/functions/projects/task-tags" },
        { text: "Workflow Settings", link: "/en/functions/projects/workflow" },
        { text: "Multiple Task View Modes", link: "/en/functions/projects/view-modes" },
      ],
    },
    {
      text: "📦 &ensp; Tools & Features",
      collapsed: false,
      items: [
        {
          text: "Check-in",
          collapsed: true,
          items: [
            { text: "Multiple ways to clock in", link: "/en/functions/checkin/many-ways" },
            { text: "Check-in Settings (Admin)", link: "/en/functions/checkin/setting" },
            { text: "Data Export (Admin)", link: "/en/functions/checkin/export" },
          ],
        },
        {
          text: "Approval Center",
          collapsed: true,
          items: [
            { text: "Submit for Approval", link: "/en/functions/approval/submit" },
            { text: "Approve Requests", link: "/en/functions/approval/approve" },
            { text: "Data Export (Admin)", link: "/en/functions/approval/export" },
            { text: "Custom Approval Process (Admin)", link: "/en/functions/approval/process" },
          ],
        },
        {
          text: "OKR Management",
          collapsed: true,
          items: [
            { text: "OKR Overview", link: "/en/functions/okr/okr-basic" },
            { text: "OKR Results Analysis", link: "/en/functions/okr/okr-analysis" },
          ],
        },
        {
          text: "Team Management",
          collapsed: true,
          items: [
            {
              text: "Team Management (Admin)",
              link: "/en/functions/team/member-management",
            },
          ],
        },
        {
          text: "File Management",
          collapsed: true,
          items: [
            { text: "File Types", link: "/en/functions/file/type" },
            { text: "File Sharing & Access", link: "/en/functions/file/share" },
            { text: "File Display Options", link: "/en/functions/file/show" },
          ],
        },
        { text: "Work Reports", link: "/en/functions/report" },
        { text: "Reminders", link: "/en/functions/reminders" },
        { text: "AI Bot", link: "/en/functions/ai" },
      ],
    },
    {
      text: "🚀 &ensp; Deployment & Integration",
      link: "/en/deploy",
    },
    {
      text: "🤝 &ensp; Support & Help",
      link: "/en/support",
    },
    {
      text: "📚 &ensp; Documentation in Progress",
      link: "/en/more",
    },
  ],
};

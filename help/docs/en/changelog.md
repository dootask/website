# Changelog

This page records the main user-facing feature updates of DooTask to help you understand version evolution. For the complete technical changes, refer to the CHANGELOG in the main program repository.

## v1.7.90

- System Settings adds a "[Create Project](/en/functions/account/system-setting)" permission switch, allowing you to specify whether everyone, department owners, or specific members can create projects; the creation entry is automatically hidden when unauthorized.
- The member card adds a "Projects and Tasks" entry to directly view the [projects, todos, and completed tasks](/en/functions/team/member-management) a member participates in.
- [Approval details](/en/functions/approval/approve) support deleting finished approvals, making it easier for the initiator or administrator to clean up useless records.
- Administrators can set the group name of the general group for unified team group display.

## v1.7.81

- [Team management](/en/functions/team/member-management) allows marking members' email verification status for easier member information management.
- System administrators can set or cancel others' [chat todos](/en/functions/im/todo) in any group, making collaboration more flexible.
- Optimized large file downloads for a more stable and efficient experience.

## v1.7.67

- Added reminder times for [chat todos](/en/functions/im/todo); when due, the original message is quoted and relevant members are reminded, avoiding missed important matters.
- [Team management](/en/functions/team/member-management) supports administrators creating or bulk-importing employee accounts with department, position, and other information.
- System Settings adds chat todo [permission control](/en/functions/account/system-setting) to restrict who can set or cancel chat todos.

## v1.7.55

- Added a [read-only department owner view](/en/functions/account/system-setting) to view the projects and tasks of department members, with display scope controlled by visibility settings.
- Groups, [projects](/en/functions/projects/team-management), and departments support a primary owner + deputy owner for more flexible collaborative management.
- Added [shared task templates](/en/functions/projects/task-templates), supporting cross-project use, search, and usage statistics.
- The management sidebar supports drag-to-resize width.
- When the [project archiving](/en/functions/projects/project-archiving) setting selects the system default rule, a corresponding hint is shown to reduce mistakes.
- Support adjusting the model used for translation as needed to suit different scenarios.

## v1.7.29

- The [AI assistant](/en/basic/Aiass-dootask) chat history is now saved automatically, so you can continue viewing past conversations after switching devices or reopening.
- Improved the clarity of long images in the AI assistant, reducing blurriness after compression.

## v1.7.23

- Support logging in with a [non-email username](/en/functions/account/account-login), which better suits common enterprise account environments.
- Further improved compatibility with Active Directory for smoother enterprise user onboarding and login.

## v1.7.20

- Optimized LDAP login for better Active Directory compatibility and more stable enterprise account login.

## v1.7.14

- Added [merge forwarding of messages](/en/functions/im/forward), supporting batch selection and forwarding at once.
- You can now [filter tasks](/en/functions/projects/task) by project owner and unlink tasks.
- Added an [AI Auto Analysis](/en/functions/account/system-setting) switch that can be enabled or disabled as needed.
- Support [custom AI service URLs](/en/functions/ai) for more flexible connection and integration.

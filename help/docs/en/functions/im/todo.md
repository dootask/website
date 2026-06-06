# Chat Todo

In daily communication, important messages can easily get buried by subsequent chats. The **Chat Todo** feature in **DooTask** lets you mark any chat message as a todo item and assign it to specific members, ensuring key matters are followed up in time and never missed.

::: tip 🐬 Use Cases
- Assign tasks brought up in a group chat to specific people;
- Set a "handle later" reminder for yourself;
- Let administrators help assign or clean up todos for team members.
:::

## Setting a Todo

1. In a chat conversation, find the message you want to follow up on.
2. **Right-click** (long-press on mobile) the message and select [Set Todo] from the menu.
3. Choose the members responsible for the todo (multiple selection allowed) and confirm.

Members marked with the todo will see this message in their todo list for centralized handling.

## Setting a Reminder Time

After setting a reminder time for a todo, the system will **quote the original message** and remind the relevant members when the time arrives, so important matters are never missed.

1. Click [Reminder Time] on the todo item.
2. Choose the specific reminder date and time.
3. After saving, the todo shows the reminder time; when the set time arrives, the relevant members receive a reminder with the original message quoted.

> Clearing the reminder time cancels the reminder for that todo.

## Canceling a Todo

- When the matter is handled, select [Cancel Todo] on the todo item.
- The system shows a confirmation prompt; after confirming, the todo is removed from the list.

## Setting / Canceling Todos for Others

Whether you can set or cancel todos for **others** is controlled by the **[Todo Permission](/en/functions/account/system-setting)** in System Settings:

- **Allow**: All members can set / cancel todos for others.
- **Forbid** (safer default): Only the following roles can set / cancel todos for others:
  - The todo member themselves;
  - System administrators;
  - Group owners (including group admins);
  - Project owners (including project admins);
  - Task owners.

::: tip Note
System administrators can set or cancel todos for members in any group, making it easy to coordinate team tasks.
:::

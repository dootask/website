# Workflow Settings

Workflow settings provide teams with a flexible task management approach, supporting customized task processing flows to significantly improve work efficiency.

![Workflow](/images/en/pro_workflow_pic_1.png)

When creating a project, you can directly choose to **Enable Workflow**, or configure custom workflows after project creation based on your needs.

![Create Workflow](/images/en/pro_workflow_pic_2.png)


## I. Workflow Status Types

Workflows consist of **four task status types**, each with specific functions and rules:

### 1. Start Status
- **Description**: The default status for new tasks; all tasks are automatically marked with this status upon creation.
- **Characteristics**: Serves as the initial status for tasks, requiring no additional configuration.

### 2. In Progress
- **Description**: Tasks enter the execution phase, with multiple statuses able to be marked as "In Progress" simultaneously.
- **Characteristics**: Supports parallel processing, suitable for task division or multi-phase management.

### 3. Acceptance /Testing
- **Description**: Tasks enter the acceptance or testing phase after completion.
- **Characteristics**: Only **one** status can be set as "Acceptance /Testing" in the entire workflow, ensuring uniqueness in the task review process.

### 4. End Status
- **Description**: The final status after task completion, representing the endpoint of the process.
- **Characteristics**: When tasks enter this status, the system automatically marks them as "Completed".

![Add Status](/images/en/pro_workflow_pic_3.png)


## II. Status Setting Features

Each status supports personalized configuration and transition rules to meet team management needs. Main features include:

### 1. Status Owner
- **Description**: The status owner is the primary responsible person or collaborator when the task is in that status.
- **Configuration**: Multiple owners can be added to each status, helping clarify responsibility distribution and improve collaboration efficiency.

### 2. Transition Modes
Transition modes determine how task owners are assigned when tasks move from current to target status. Available modes include:

#### (1) Add Mode
- **Description**: When tasks transition to the target status, the system adds the target status owner as a task owner while retaining the original owner.
- **Use Case**: Suitable for tasks requiring multiple owner collaboration, ensuring team-wide task progression.

#### (2) Transfer Mode
- **Description**: When tasks transition to the target status, the system replaces the current task owner with the target status owner, converting the original owner to a collaborator.
- **Use Case**: Suitable for workflows with frequent owner changes.

#### (3) Exclude Mode
- **Description**: When tasks transition to the target status, the system replaces the current task owner with the target status owner while maintaining change records, converting the original owner to a collaborator.
- **Use Case**: Suitable for task management scenarios requiring rigorous change records.

### 3. Restrict Owner Options
- **Description**: When enabled, only task owners and project administrators can modify the status when tasks enter this state.
- **Use Case**: Suitable for task management processes requiring strict permission control.

### 4. Associated Lists
- **Description**: Set associated task lists for statuses. When tasks transition to that status, the system automatically moves them to the corresponding list.
- **Use Case**: Helps categorize tasks by phase or priority, such as creating "Pending Acceptance" or "In Progress" task lists.

![Status Settings](/images/en/pro_workflow_pic_4.png)


## III. Status Transition Rules

Workflows allow customization of **status transition rules**, where teams can define which target statuses each status can transition to, ensuring task processing follows established logical requirements.

![Status Transition Rules](/images/en/pro_workflow_pic_1.png)


## IV. Important Notes

1. **Review/Testing Status**  
   Only one "Acceptance/Testing" status can be set in the workflow to avoid management confusion from multiple review statuses.

2. **End Status**  
   Once tasks enter "End Status", their status cannot be modified further.

3. **Transition Modes**  
   Choose transition modes based on team collaboration methods and permission requirements to ensure clear and efficient task management.

4. **Associated Lists**  
   Proper use of associated lists can optimize task categorization management and view display, facilitating task tracking and progress monitoring.


Through proper workflow configuration, teams can easily achieve efficient task management and smooth collaboration processes.
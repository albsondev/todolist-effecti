# ToDo Application with Vue.js 2 and Vuex

This project implements a ToDo application using Vue.js 2 and Vuex, focusing on state management and performance optimization techniques. It adheres to the requirements outlined in the Effecti technical assessment document.

## Table of Contents

- [Project Setup](#project-setup)
- [Features](#features)
- [Technical Requirements and Implementation](#technical-requirements-and-implementation)
- [Components](#components)
- [Bonus Features](#bonus-features)
- [Evaluation Criteria](#evaluation-criteria)

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/albsondev/todolist-effecti.git
   ```

2. **Install dependencies:**

    ```bash
    cd todolist-effecti
    yarn install
    ```

3. **Run the application:**

    ```bash
    yarn serve
    ```

## Features

This ToDo application allows users to manage a list of tasks with the following features:

*   Add Task: Create new tasks with a title, description, and priority (low, medium, high).
*   Edit Task: Update existing tasks.
*   Delete Task: Delete existing tasks.
*   Mark Task as Completed: Mark tasks as completed or pending.
*   Filter Tasks: Filter tasks by status (completed, pending, or all) and by priority.
*   Sort Tasks: Order tasks by priority (low, medium, high).
*   Calendar View: Visualize tasks on a calendar, color-coded by priority.
*   Kanban View: View tasks organized by priority in a Kanban-style board.
*   Search Tasks: Search tasks by title or priority.
*   Empty State: Displays a message when there are no tasks.

## Technical Requirements and Implementation

1. **State Management with Vuex**

    Vuex is used for state management, ensuring predictable state changes and efficient data flow. The az\tasks.js file in the store directory manages the application's state.

2. **Actions & Mutations**

    Actions and mutations are defined in the Vuex store to handle state updates. Actions handle asynchronous operations and commit mutations to change the state.

3. **Modularization**

    The Vuex store is organized into a module for clarity and maintainability.

4. **Data Persistence**

    Task data is persisted in localStorage so that tasks remain available upon page reload.

5. **Responsive Layout**
    The application is designed to be mobile-friendly and functions well on various screen sizes using Vuetify's responsive grid system.

6. **Reusable Components**

    The application is organized into reusable components for maintainability:

    *   **TaskList** Component: Displays a list of tasks. (This component is integrated into the **KanbanView** and **CalendarView** components)

    *   **TaskItem** Displays individual tasks. (This component is integrated into the KanbanView component)


    *   **TaskForm** Component: Displays a list of tasks. (This component is integrated into the KanbanView and CalendarView components)

    *   **CalendarView** Displays tasks on a calendar.

    *   **KanbanView** Displays tasks in a Kanban-style board.

    *   **PriorityLegend** Component: Displays the priority color legend.



## Components

**HomeView.vue**
This component is the main view of the application. It handles the display of the task form, calendar view, and Kanban view. It also manages the search functionality and the empty state display.

**TaskForm.vue**
This component is responsible for creating and editing tasks. It emits events to the parent component (**HomeView) to handle saving and canceling task edits.

**CalendarView.vue**
This component displays tasks on a calendar, color-coded by priority. It emits an event when a day is clicked, allowing the parent component to handle task selection.

**PriorityLegend.vue**
This component displays tasks in a Kanban-style board, organized by priority. It emits events for editing and deleting tasks.

**HomeView.vue**
This component is the main view of the application. It handles the display of the task form, calendar view, and Kanban view. It also manages the search functionality and the empty state display.


## Bonus Features

* **Large Data Set Simulation:** The application simulates a large number of tasks (100+) to test responsiveness. This is done by generating random tasks on initial load if the localStorage is empty.

## Technologies Used

* **Vue.js 2:** The core JavaScript framework for building the user interface.

* **Vuex:** State management library for Vue.js applications.

* **Vuetify:** Component library for Vue.js providing pre-built UI components.

* **Vue Router:** Routing library for Vue.js applications.


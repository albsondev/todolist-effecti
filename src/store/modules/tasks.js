function generateRandomTasks(count) {
  const priorities = ["low", "medium", "high"];
  const tasks = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  function getRandomDate() {
    const start = today.getDate();
    const end = new Date(currentYear, currentMonth + 1, 0).getDate(); // Último dia do mês atual
    const day = Math.floor(Math.random() * (end - start + 1)) + start;
    return new Date(currentYear, currentMonth, day).toISOString().substr(0, 10);
  }

  for (let i = 0; i < count; i++) {
    tasks.push({
      id: i,
      title: `Task ${i + 1}`,
      description: `Description for task ${i + 1}`,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      completed: false,
      date: getRandomDate(),
    });
  }

  return tasks;
}

// Verifique se o localStorage está vazio e inicialize com tarefas simuladas se necessário
let storedTasks = JSON.parse(localStorage.getItem("tasks"));
if (!storedTasks || storedTasks.length === 0) {
  storedTasks = generateRandomTasks(100);
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
}

const state = {
  tasks: storedTasks,
};

const getters = {
  allTasks: (state) => state.tasks,
  completedTasks: (state) => state.tasks.filter((task) => task.completed),
  pendingTasks: (state) => state.tasks.filter((task) => !task.completed),
};

const actions = {
  addTask({ commit }, task) {
    commit("newTask", task);
  },
  deleteTask({ commit }, id) {
    commit("removeTask", id);
  },
  updateTask({ commit }, updatedTask) {
    commit("editTask", updatedTask);
  },
  toggleTaskStatus({ commit }, id) {
    commit("toggleStatus", id);
  },
};

const mutations = {
  newTask: (state, task) => {
    state.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
  removeTask: (state, id) => {
    state.tasks = state.tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
  editTask: (state, updatedTask) => {
    const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
  updateTasks(state, tasks) {
    state.tasks = tasks;
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
  toggleStatus: (state, task) => {
    const taskToUpdate = state.tasks.find((t) => t.id === task.id);
    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

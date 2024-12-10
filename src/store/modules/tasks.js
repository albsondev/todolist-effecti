const state = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
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
  toggleStatus: (state, id) => {
    const task = state.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
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

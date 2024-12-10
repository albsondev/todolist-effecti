const state = () => ({
  tasks: JSON.parse(localStorage.getItem("tasks")) || [], // Carrega as tarefas do localStorage ao iniciar
});

const mutations = {
  ADD_TASK(state, task) {
    state.tasks.push({ ...task, id: Date.now(), completed: false });
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
  EDIT_TASK(state, updatedTask) {
    const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      // Substitui a tarefa na lista de tarefas
      state.tasks.splice(index, 1, { ...updatedTask });
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Atualiza o localStorage
    }
  },
  DELETE_TASK(state, taskId) {
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
};

const actions = {
  addTask({ commit }, task) {
    commit("ADD_TASK", task);
  },
  editTask({ commit }, task) {
    commit("EDIT_TASK", task);
  },
  deleteTask({ commit }, taskId) {
    commit("DELETE_TASK", taskId);
  },
};

const getters = {
  getAllTasks: (state) => state.tasks,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

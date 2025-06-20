<!-- src/components/Dashboard.vue -->
<template>
  <div class="dashboard">
    <div class="user-header glass-panel">
      <h2>{{ user.name }}'s Tasks</h2>
      <p>{{ tasks.length }} tasks</p>
    </div>

    <div class="add-task-form glass-panel">
      <input
        v-model="newTaskText"
        placeholder="What needs to be done?"
        @keyup.enter="addTask"
      />
      <button @click="addTask">Add Task</button>
    </div>

    <div class="task-list">
      <div v-for="task in tasks" :key="task.id" class="task-item glass-panel">
        <div class="task-content">
          <input
            type="checkbox"
            v-model="task.completed"
            @change="updateTask(task)"
          />
          <span :class="{ completed: task.completed }">{{ task.text }}</span>
        </div>
        <button @click="deleteTask(task.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user", "tasks"],
  data() {
    return {
      newTaskText: "",
    };
  },
  methods: {
    addTask() {
      if (this.newTaskText.trim()) {
        this.$emit("add-task", this.newTaskText.trim());
        this.newTaskText = "";
      }
    },
    deleteTask(taskId) {
      this.$emit("delete-task", taskId);
    },
    updateTask(task) {
      this.$emit("update-task", task);
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: grid;
  gap: 1.5rem;
}

.user-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-task-form {
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
}

.add-task-form input {
  flex: 1;
}

.task-list {
  display: grid;
  gap: 1rem;
}

.task-item {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.completed {
  text-decoration: line-through;
  opacity: 0.7;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: white;
}
</style>

<template>
  <div class="dashboard">
    <div class="user-header glass-panel">
      <h2>{{ user.name }}'s Dashboard</h2>
      <div class="task-stats">
        <span>{{ incompleteTasksCount }} tasks left</span>
        <span>{{ completedTasksCount }} completed</span>
      </div>
    </div>

    <div class="add-task-form glass-panel">
      <input
        v-model="newTask.text"
        placeholder="Task description"
        @keyup.enter="addTask"
      />
      <input type="time" v-model="newTask.time" />
      <button @click="addTask" :disabled="!isTaskValid">Add Task</button>
    </div>

    <div class="task-list">
      <div
        v-for="task in sortedTasks"
        :key="task.id"
        class="task-item glass-panel"
        :class="{ completed: task.completed }"
      >
        <div class="task-content">
          <input
            type="checkbox"
            v-model="task.completed"
            @change="toggleTask(task.id)"
          />
          <div class="task-details">
            <span class="task-text">{{ task.text }}</span>
            <span class="task-time">{{ formatTime(task.time) }}</span>
          </div>
        </div>
        <button @click="deleteTask(task.id)" class="delete-task-btn">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user", "tasks"],
  data() {
    return {
      newTask: {
        text: "",
        time: new Date().toTimeString().substring(0, 5),
      },
    };
  },
  computed: {
    incompleteTasksCount() {
      return this.tasks.filter((t) => !t.completed).length;
    },
    completedTasksCount() {
      return this.tasks.filter((t) => t.completed).length;
    },
    isTaskValid() {
      return this.newTask.text.trim() !== "";
    },
    sortedTasks() {
      return [...this.tasks].sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return a.time.localeCompare(b.time);
      });
    },
  },
  methods: {
    addTask() {
      if (this.isTaskValid) {
        this.$emit("add-task", {
          text: this.newTask.text.trim(),
          time: this.newTask.time,
        });
        this.newTask.text = "";
        this.newTask.time = new Date().toTimeString().substring(0, 5);
      }
    },
    deleteTask(taskId) {
      this.$emit("delete-task", taskId);
    },
    toggleTask(taskId) {
      this.$emit("toggle-task", taskId);
    },
    formatTime(time) {
      if (!time) return "";
      const [hours, minutes] = time.split(":");
      return `${hours}:${minutes}`;
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

.task-stats {
  display: flex;
  gap: 1rem;
}

.add-task-form {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  align-items: center;
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
  transition: all 0.3s ease;
}

.task-item.completed {
  opacity: 0.7;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.task-details {
  display: flex;
  flex-direction: column;
}

.task-text {
  font-weight: 500;
}

.task-time {
  font-size: 0.8rem;
  opacity: 0.8;
}

.completed .task-text {
  text-decoration: line-through;
}

.delete-task-btn {
  background: rgba(255, 0, 0, 0.2);
}

.delete-task-btn:hover {
  background: rgba(255, 0, 0, 0.3);
}

input[type="time"] {
  width: 120px;
}
</style>

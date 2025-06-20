<template>
  <div class="task-list">
    <transition-group name="task-fade">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="glass-panel task-item"
      >
        <div class="task-content">
          <span :class="{ completed: task.completed }">{{ task.text }}</span>
          <small>{{ task.time }}</small>
        </div>
        <button @click="$emit('delete-task', index)" class="delete-button">
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: ["tasks"],
};
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.task-content {
  display: flex;
  flex-direction: column;
}

.task-content small {
  opacity: 0.7;
  font-size: 0.8em;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.delete-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.delete-button:hover {
  opacity: 1;
  transform: scale(1.2);
}

.task-fade-enter-active,
.task-fade-leave-active {
  transition: all 0.3s ease;
}

.task-fade-enter-from,
.task-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

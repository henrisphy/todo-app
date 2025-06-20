<template>
  <div class="modern-form">
    <div class="form-header">
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
      <h3>Create New Task</h3>
    </div>

    <div class="form-body">
      <div class="input-field">
        <label for="task-input">Task Description</label>
        <input
          id="task-input"
          v-model="taskText"
          placeholder="What needs to be done?"
          @keyup.enter="submitTask"
          class="modern-input"
        />
        <div class="underline"></div>
      </div>

      <div class="input-field">
        <label for="task-time">Time</label>
        <div class="time-picker">
          <input
            id="task-time"
            type="time"
            v-model="taskTime"
            class="modern-input"
          />
          <svg class="clock-icon" viewBox="0 0 24 24">
            <path
              d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"
            />
          </svg>
        </div>
      </div>

      <button
        @click="submitTask"
        class="submit-btn"
        :disabled="!taskText.trim()"
      >
        <span>Add Task</span>
        <svg class="arrow-icon" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskText: "",
      taskTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  },
  methods: {
    submitTask() {
      if (this.taskText.trim()) {
        this.$emit("add-task", {
          text: this.taskText.trim(),
          time: this.taskTime,
          completed: false,
        });
        this.taskText = "";
      }
    },
  },
};
</script>

<style scoped>
.modern-form {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-form:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.form-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.form-header h3 {
  margin: 0;
  font-weight: 500;
  font-size: 1.2rem;
  color: white;
}

.icon {
  width: 24px;
  height: 24px;
  fill: rgba(255, 255, 255, 0.8);
}

.form-body {
  padding: 20px;
}

.input-field {
  margin-bottom: 24px;
  position: relative;
}

.input-field label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.modern-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.modern-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
}

.modern-input:focus ~ .underline {
  width: 100%;
}

.time-picker {
  position: relative;
}

.clock-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  fill: rgba(255, 255, 255, 0.6);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.submit-btn:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s ease;
}

.submit-btn:hover .arrow-icon {
  transform: translateX(3px);
}

/* Animasi saat form muncul */
.modern-form {
  animation: fadeInUp 0.5s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

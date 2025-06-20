<template>
  <div class="modern-form-container">
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
              class="modern-input time-input"
            />
          </div>
        </div>
      </div>
    </div>

    <button @click="submitTask" class="submit-btn" :disabled="!taskText.trim()">
      <span>Add Task</span>
      <svg class="arrow-icon" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
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
/* Layout Container */
.modern-form-container {
  margin-bottom: 24px;
}

/* Form Styling */
.modern-form {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 16px; /* Spacing antara form dan button */
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.form-header h3 {
  margin: 0;
  font-weight: 500;
  font-size: 1.2rem;
  color: #764ba2; /* Warna ungu yang diminta */
}

.form-body {
  padding: 20px;
}

/* Input Fields */
.input-field {
  margin-bottom: 24px;
  position: relative;
}

.input-field label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #764ba2; /* Warna ungu yang diminta */
  font-weight: 500;
}

.modern-input {
  max-width: 98%;
  width: 98%;

  padding: 14px 16px; /* Lebih besar */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #667eea;
  font-size: 1rem;
}

.time-input {
  font-size: 1.1rem; /* Ukuran font lebih besar */
  padding: 14px 44px 14px 16px; /* Ruang untuk icon */
}

/* Button */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 480px) {
  .modern-form {
    border-radius: 12px;
  }

  .form-header,
  .form-body {
    padding: 16px;
  }

  .modern-input {
    padding: 12px 14px;
    font-size: 0.95rem;
    color: #667eea;
  }

  .time-input {
    font-size: 1rem;
    padding: 12px 40px 12px 14px;
    color: #667eea;
  }

  .submit-btn {
    padding: 14px;
    font-size: 1rem;
  }
}
</style>

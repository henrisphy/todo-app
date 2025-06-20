<template>
  <div class="app">
    <!-- Header -->
    <header class="app-header glass-header">
      <button
        @click="toggleNavbar"
        class="menu-toggle"
        :class="{ active: navbarActive }"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <h1 class="app-title">✨ TaskFlow ✨</h1>
    </header>

    <!-- Navigation -->
    <nav class="app-nav" :class="{ active: navbarActive }">
      <div class="user-management">
        <h3 class="section-title" style="margin-left: 10px">User Dashboard</h3>

        <div class="user-input-group">
          <input
            v-model="newUser"
            placeholder="Enter username"
            @keyup.enter="addUser"
            class="user-input"
          />
          <button @click="addUser" class="add-user-btn">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>
        </div>

        <div class="user-list-container">
          <div class="user-list">
            <div
              v-for="(user, index) in users"
              :key="index"
              class="user-item"
              :class="{ active: currentUser === user }"
              @click="selectUser(user)"
            >
              <span class="user-name">{{ user }}</span>
              <button @click.stop="deleteUser(index)" class="delete-user-btn">
                <svg class="icon" viewBox="0 0 24 24">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="app-main" :class="{ shifted: navbarActive }">
      <div class="content-wrapper">
        <div v-if="currentUser" class="task-management">
          <div class="user-header">
            <h2 class="user-greeting">
              <span class="welcome">Welcome,</span>
              <span class="username">{{ currentUser }}</span>
            </h2>
            <p class="task-count">
              {{ userTasks.length }}
              {{ userTasks.length === 1 ? "task" : "tasks" }}
            </p>
          </div>

          <AddTask @add-task="addTask" />
          <TaskList :tasks="userTasks" @delete-task="deleteTask" />
        </div>

        <div v-else class="no-user-selected">
          <svg class="empty-icon" viewBox="0 0 24 24">
            <path
              d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
            />
          </svg>
          <h3>No User Selected</h3>
          <p>Please select or create a user to manage tasks</p>
        </div>
      </div>

      <Footer />
    </main>
  </div>
</template>

<script>
import AddTask from "./components/AddTask.vue";
import TaskList from "./components/TaskList.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { AddTask, TaskList, Footer },
  data() {
    return {
      navbarActive: false,
      newUser: "",
      currentUser: "",
      users: JSON.parse(localStorage.getItem("users")) || [],
      tasks: JSON.parse(localStorage.getItem("tasks")) || {},
    };
  },
  computed: {
    userTasks() {
      return this.currentUser ? this.tasks[this.currentUser] || [] : [];
    },
  },
  methods: {
    toggleNavbar() {
      this.navbarActive = !this.navbarActive;
    },
    addUser() {
      if (this.newUser.trim() && !this.users.includes(this.newUser.trim())) {
        this.users.push(this.newUser.trim());
        this.currentUser = this.newUser.trim();
        this.newUser = "";
        this.saveToLocalStorage();
      }
    },
    deleteUser(index) {
      const deletedUser = this.users[index];
      this.users.splice(index, 1);
      if (this.currentUser === deletedUser) {
        this.currentUser = this.users[0] || "";
      }
      delete this.tasks[deletedUser];
      this.saveToLocalStorage();
    },
    selectUser(user) {
      this.currentUser = user;
      this.navbarActive = false;
    },
    addTask(task) {
      if (!this.tasks[this.currentUser]) {
        this.tasks[this.currentUser] = [];
      }
      this.tasks[this.currentUser].push(task);
      this.saveToLocalStorage();
    },
    deleteTask(index) {
      this.tasks[this.currentUser].splice(index, 1);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },
};
</script>

<style>
/* Base Styles */
:root {
  --primary: #764ba2;
  --secondary: #667eea;
  --text-light: rgba(255, 255, 255, 0.9);
  --text-muted: rgba(255, 255, 255, 0.6);
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Satoshi", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
  min-height: 100vh;
}

/* Glassmorphism Effect */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

/* App Layout */
.app {
  display: flex;
  min-height: 100vh;
  position: relative;
}

/* Header Styles */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  z-index: 100;
}

.app-title {
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Menu Toggle Button */
.menu-toggle {
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
}

.menu-toggle .bar {
  display: block;
  width: 100%;
  height: 3px;
  background: var(--primary);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.menu-toggle.active .bar:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.menu-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .bar:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

/* Navigation Styles */
.app-nav {
  position: fixed;
  top: 0;
  left: -280px;
  width: 280px;
  height: 100vh;
  padding: 1.5rem;
  z-index: 90;
  transition: all 0.3s ease;
  overflow-y: auto;
}

.app-nav.active {
  left: 0;
}

.user-management {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
}

.section-title {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.user-input-group {
  display: flex;
  gap: 0.5rem;
}

.user-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}

.user-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
}

.add-user-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-user-btn:hover {
  transform: scale(1.05);
}

.add-user-btn .icon {
  width: 20px;
  height: 20px;
  fill: white;
}

.user-list-container {
  flex: 1;
  overflow-y: auto;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-item {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-item.active {
  background: linear-gradient(
    135deg,
    rgba(118, 75, 162, 0.3),
    rgba(102, 126, 234, 0.3)
  );
}

.user-name {
  font-weight: 500;
}

.delete-user-btn {
  background: transparent;
  border: none;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-user-btn:hover {
  background: rgba(255, 99, 71, 0.2);
}

.delete-user-btn .icon {
  width: 16px;
  height: 16px;
  fill: var(--text-muted);
  transition: all 0.2s ease;
}

.delete-user-btn:hover .icon {
  fill: tomato;
}

/* Main Content Styles */
.app-main {
  flex: 1;
  padding: 5rem 1rem 2rem;
  transition: all 0.3s ease;
}

.app-main.shifted {
  margin-left: 280px;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.task-management {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.user-greeting {
  display: flex;
  flex-direction: column;
}

.welcome {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.username {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.task-count {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* No User Selected State */
.no-user-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  border-radius: 12px;
  gap: 1rem;
}

.no-user-selected h3 {
  font-size: 1.25rem;
  color: var(--text-light);
}

.no-user-selected p {
  color: var(--text-muted);
  max-width: 300px;
}

.empty-icon {
  width: 48px;
  height: 48px;
  fill: var(--text-muted);
  opacity: 0.5;
  margin-bottom: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-main.shifted {
    margin-left: 0;
    transform: translateX(280px);
    overflow: hidden;
  }

  .app-nav {
    width: 280px;
    left: -280px;
  }

  .app-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .app-main {
    padding: 4.5rem 0.75rem 2rem;
  }

  .user-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .username {
    font-size: 1.25rem;
  }
}
</style>

<template>
  <div class="app-container">
    <!-- Header -->
    <header class="glass-header">
      <button @click="toggleNavbar" class="hamburger-button">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h1 class="app-title">✨ TaskFlow ✨</h1>
    </header>
    <!-- Navbar Toggle Button -->
    <button @click="toggleNavbar" class="navbar-toggle glass-panel">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <!-- Navbar -->
    <nav class="glass-navbar" :class="{ active: navbarActive }">
      <div class="user-controls">
        <h3>User Dashboard</h3>
        <input
          v-model="newUser"
          placeholder="New username"
          @keyup.enter="addUser"
          class="glass-input"
        />
        <button @click="addUser" class="glass-button">Add User</button>

        <div class="user-list">
          <div
            v-for="(user, index) in users"
            :key="index"
            class="user-item glass-panel"
            :class="{ active: currentUser === user }"
            @click="selectUser(user)"
          >
            {{ user }}
            <button @click.stop="deleteUser(index)" class="delete-button">
              ×
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="content" :class="{ shifted: navbarActive }">
      <div v-if="currentUser" class="user-tasks">
        <h2>{{ currentUser }}'s Tasks</h2>
        <AddTask @add-task="addTask" />
        <TaskList :tasks="userTasks" @delete-task="deleteTask" />
      </div>

      <div v-else class="no-user-selected glass-panel">
        <p>Please select or create a user to manage tasks</p>
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

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.navbar-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  color: white;
}

.glass-navbar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 280px;
  height: 100vh;
  padding: 20px;
  z-index: 90;
  transition: all 0.3s ease;
}

.glass-navbar.active {
  left: 0;
}

.content {
  flex: 1;
  padding: 80px 20px 20px;
  transition: all 0.3s ease;
}

.content.shifted {
  margin-left: 280px;
}

.user-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  flex-grow: 1;
}

.user-item {
  padding: 12px 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-item.active {
  background: rgba(255, 255, 255, 0.3);
}

.delete-button {
  background: transparent;
  border: none;
  font-size: 1.2em;
  padding: 0 5px;
}

.no-user-selected {
  padding: 40px;
  text-align: center;
  margin-top: 40px;
}
/* Gaya Header Modern */
.glass-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 80;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-title {
  margin: 0 auto;
  font-weight: 500;
  font-size: 1.5rem;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Gaya Hamburger Button */
.hamburger-button {
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 100;
}

.hamburger-button span {
  display: block;
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger-button:hover span {
  background: #c3cfe2;
}

/* Efek animasi saat navbar aktif */
.hamburger-button.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger-button.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-button.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
@media (max-width: 768px) {
  .content.shifted {
    margin-left: 0;
    opacity: 0.3;
    pointer-events: none;
  }

  .glass-navbar {
    width: 80vw;
    left: -85vw;
  }
}
</style>

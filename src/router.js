import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import TodoList from "./views/TodoList.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/todos", component: TodoList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createApp } from "vue";
import App from "./App.vue";
import { initGlassEffects } from "./assets/glass-bg";

// Initialize glass effects
initGlassEffects();

// Load external font efficiently
const loadFont = () => {
  const link = document.createElement("link");
  link.href =
    "https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  document.body.style.fontFamily = "'Satoshi', sans-serif";
};

loadFont();

createApp(App).mount("#app");

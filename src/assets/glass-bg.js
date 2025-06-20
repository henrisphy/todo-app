export function initGlassEffects() {
  const style = document.createElement("style");
  style.textContent = `
      .glass-panel {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        transition: all 0.3s ease;
      }
      
      .glass-panel:hover {
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
      }
      
      .glass-navbar {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }
    `;
  document.head.appendChild(style);
}

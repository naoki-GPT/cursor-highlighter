// バージョン: 1.1
// 拡張機能：マウスカーソル強調（リング、波紋、ON/OFF、設定可）

// 初期化
let ring, settings = {};
const applySettings = () => {
  if (ring) ring.remove();
  if (settings.mode === "ring" || settings.mode === "both") {
    ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.style.border = `2px solid ${settings.color}`;
    ring.style.width = ring.style.height = settings.size + 'px';
    document.body.appendChild(ring);
  }
};

chrome.storage.sync.get(["enabled", "mode", "color", "size"], (res) => {
  settings = {
    enabled: res.enabled ?? true,
    mode: res.mode ?? "both",
    color: res.color ?? "red",
    size: res.size ?? 40
  };

  if (!settings.enabled) return;

  applySettings();

  document.addEventListener('mousemove', (e) => {
    if ((settings.mode === "ring" || settings.mode === "both") && ring) {
      ring.style.left = `${e.clientX - settings.size / 2}px`;
      ring.style.top = `${e.clientY - settings.size / 2}px`;
    }
  });

  document.addEventListener('click', (e) => {
    if (settings.mode === "ripple" || settings.mode === "both") {
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX - 10}px`;
      ripple.style.top = `${e.clientY - 10}px`;
      ripple.style.background = settings.color;
      document.body.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    }
  });
});

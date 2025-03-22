document.addEventListener('DOMContentLoaded', () => {
  const enabled = document.getElementById('enabled');
  const mode = document.getElementById('mode');
  const color = document.getElementById('color');
  const size = document.getElementById('size');
  const save = document.getElementById('save');

  chrome.storage.sync.get(["enabled", "mode", "color", "size"], (res) => {
    enabled.checked = res.enabled ?? true;
    mode.value = res.mode ?? "both";
    color.value = res.color ?? "#ff0000";
    size.value = res.size ?? 40;
  });

  save.addEventListener('click', () => {
    chrome.storage.sync.set({
      enabled: enabled.checked,
      mode: mode.value,
      color: color.value,
      size: parseInt(size.value)
    }, () => {
      window.close();
    });
  });
});

// Runs before first paint, including on pages that do not hydrate Svelte.
(() => {
  const key = 'mode-watcher-mode';
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference = 'system';
  try {
    preference = localStorage.getItem(key) || 'system';
  } catch {
    // Theme switching still works when storage is disabled.
  }
  const apply = () => {
    const dark = preference === 'dark' || (preference !== 'light' && system.matches);
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  };
  apply();
  system.addEventListener('change', apply);
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) {
      preference = event.newValue || 'system';
      apply();
    }
  });
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('[data-theme-toggle]')) return;
    preference = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    apply();
    try {
      localStorage.setItem(key, preference);
    } catch {
      // Keep the selected theme for this page even without persistent storage.
    }
  });

  // The static homepage still records real performance data without a framework bundle.
  if (
    location.pathname === '/' &&
    ['www.rishavnandi.com', 'rishavnandi.com'].includes(location.hostname)
  ) {
    window.addEventListener(
      'load',
      () => {
        const script = document.createElement('script');
        script.src = '/_vercel/speed-insights/script.js';
        script.defer = true;
        script.dataset.route = '/';
        document.head.appendChild(script);
      },
      { once: true }
    );
  }
})();

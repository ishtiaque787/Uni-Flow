// ── Theme ──────────────────────────────────────────────
// NOTE: the initial theme is set by a blocking inline script in <head>
// (before first paint) to avoid a flash of the wrong theme on page load.
// This file only handles theme *changes* after the page is interactive.

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('uniflow-theme', theme);
  document.querySelectorAll('[data-theme-btn]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-btn') === theme);
  });
  const quickToggle = document.getElementById('quickThemeToggle');
  if (quickToggle) {
    quickToggle.innerHTML = theme === 'dark'
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';
    if (window.lucide) lucide.createIcons();
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  document.querySelectorAll('[data-theme-btn]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-btn') === current);
    btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme-btn')));
  });
  const quickToggle = document.getElementById('quickThemeToggle');
  if (quickToggle) {
    quickToggle.innerHTML = current === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    quickToggle.addEventListener('click', toggleTheme);
  }

  if (window.lucide) lucide.createIcons();

  // ── Generic tab groups: [data-tabs] wraps [data-tab] buttons,
  // controlling sibling [data-tabpanel] elements by index ──
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const buttons = Array.from(group.querySelectorAll('[data-tab]'));
    const panelGroup = group.getAttribute('data-tabs');
    const panels = Array.from(document.querySelectorAll(`[data-tabpanel="${panelGroup}"]`));
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach((p, pi) => { p.style.display = pi === i ? '' : 'none'; });
      });
    });
  });

  // ── Filter chips: [data-filter-group] buttons filter [data-filter-item] by data-filter-tag ──
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const buttons = Array.from(group.querySelectorAll('[data-filter]'));
    const listSel = group.getAttribute('data-filter-group');
    const items = Array.from(document.querySelectorAll(`${listSel} [data-filter-tag]`));
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.getAttribute('data-filter');
        items.forEach((item) => {
          const tag = item.getAttribute('data-filter-tag');
          item.style.display = (val === 'All' || val === tag) ? '' : 'none';
        });
      });
    });
  });

  // ── Toggle switches ──
  document.querySelectorAll('[data-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => btn.classList.toggle('on'));
  });

  // ── Password show/hide ──
  document.querySelectorAll('[data-pw-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.getAttribute('data-pw-toggle'));
      if (!input) return;
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      btn.innerHTML = showing ? '<i data-lucide="eye"></i>' : '<i data-lucide="eye-off"></i>';
      if (window.lucide) lucide.createIcons();
    });
  });

  // ── Search filter (materials / courses) ──
  document.querySelectorAll('[data-search]').forEach((input) => {
    const listSel = input.getAttribute('data-search');
    const items = Array.from(document.querySelectorAll(`${listSel} [data-search-text]`));
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      items.forEach((item) => {
        const text = item.getAttribute('data-search-text').toLowerCase();
        const matchesFilter = item.style.display !== 'none' || q === '';
        item.style.display = text.includes(q) ? '' : 'none';
      });
    });
  });
});

const toggleButton = document.getElementById('themeToggle');
  const body = document.body;

  // Load saved theme preference on page load
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
  }

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save preference
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
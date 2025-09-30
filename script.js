// populate year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle persisted to localStorage
const toggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  toggle.setAttribute('aria-pressed', theme === 'light');
}

const savedTheme = localStorage.getItem('mo_theme') || 'dark';
applyTheme(savedTheme);

toggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('mo_theme', nextTheme);
});

// Basic contact form client-side validation + open mailto as fallback
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('formStatus');

  if (!name || !email || !message) {
    status.textContent = 'Please complete all fields.';
    return false;
  }

  // very simple email check
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    status.textContent = 'Please enter a valid email.';
    return false;
  }

  // In a real site you'd POST to your backend here.
  // For GitHub Pages we’ll fallback to mailto.
  const subject = encodeURIComponent('Portfolio inquiry from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
  window.location.href = 'mailto:mohmdelshaikh@gmail.com?subject=' + subject + '&body=' + body;
  status.textContent = 'Opening your email client...';
  return false;
}

// Accessibility: enable keyboard "Enter" on project demo placeholder links
document.querySelectorAll('.project a[onclick]').forEach(a => {
  a.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') { a.click(); }
  });
});

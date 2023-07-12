const switcherToChangeTheme = document.querySelector('#switcher-button');

function setDarkTheme() {
  document.body.classList.add('dark');
  localStorage.theme = 'dark';
}

function setLightTheme() {
  document.body.classList.remove('dark');
  localStorage.theme = 'light';
}

function updateTheme() {
  if (localStorage.theme === 'dark') {
    document.body.classList.add('dark');
    switcherToChangeTheme.checked = true;
  } else {
    document.body.classList.remove('dark');
    switcherToChangeTheme.checked = false;
  }
}

switcherToChangeTheme.addEventListener('click', () => {
  if (document.body.classList.contains('dark')) {
    setLightTheme();
  } else {
    setDarkTheme();
  }
});

window.addEventListener('storage', updateTheme);

updateTheme();
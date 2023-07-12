// const navItems = document.querySelectorAll('.site-nav__item_active');

// function handleClick(event) {
// event.preventDefault();

// // Змінна для збереження посилання, на яке було натиснуто
// var clickedLink = event.currentTarget;

// // Перевіряємо кожен елемент навігації
// for (var i = 0; i < navItems.length; i++) {
//     var navItem = navItems[i];

//     // Отримуємо посилання у поточного елемента навігації
//     var link = navItem.querySelector('.site-nav__link');

//     // Перевіряємо, чи співпадає посилання з натиснутим посиланням
//     if (link === clickedLink) {
//     // Встановлюємо змінну на поточну сторінку як true
//     navItem.dataset.current = 'true';
//     // Додаємо клас "current" до активного елемента навігації
//     navItem.classList.add('current');
//     } else {
//     // Встановлюємо змінну на неактивну сторінку як false
//     navItem.dataset.current = 'false';
//     // Видаляємо клас "current" у неактивних елементів навігації
//     navItem.classList.remove('current');
//     }
// }
// }

// // Додаємо обробник події кліку до кожного посилання навігації
// for (var i = 0; i < navItems.length; i++) {
// var navItem = navItems[i];
// var link = navItem.querySelector('.site-nav__link');
// link.addEventListener('click', handleClick);
// }


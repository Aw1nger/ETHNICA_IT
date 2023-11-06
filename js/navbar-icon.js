const burgerButton = document.getElementById('burgerButton');
burgerButton.addEventListener('click', function () {
  burgerButton.classList.toggle('header__burger-icon--active'); // Добавляем или удаляем класс при клике
});
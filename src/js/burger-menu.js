(() => {
    const refs = {
      openBurgerBtn: document.querySelector("[data-menu-open]"),
      closeBurgerBtn: document.querySelector("[data-menu-close]"),
      menu: document.querySelector("[data-menu]"),
    };
  
    refs.openBurgerBtn.addEventListener("click", toggleMenu);
    refs.closeBurgerBtn.addEventListener("click", toggleMenu);
  
    function toggleMenu() {
      refs.menu.classList.toggle("is-hidden");
    }
  })();
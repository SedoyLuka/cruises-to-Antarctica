import {FocusLock} from "../../utils/focus-lock";

const body = document.body;
const header = document.querySelector(".header");
const headerNav = header.querySelector(".header__navigation-wrapper");
const headerToggle = headerNav.querySelector(".header__toggle");
const headerLinks = headerNav.querySelectorAll(".header__link");
const focusLock = new FocusLock();
const onClickLink = closeMenu;

function closeMenu() {
  focusLock.unlock();
  body.classList.remove("page-lock");
  header.classList.add("header--closed");
  header.classList.remove("header--opened");

  headerLinks.forEach((link) => {
    link.removeEventListener("click", onClickLink);
  });
}

function openMenu() {
  focusLock.lock(".header");
  body.classList.add("page-lock");
  header.classList.remove("header--closed");
  header.classList.add("header--opened");

  headerLinks.forEach((link) => {
    link.addEventListener("click", onClickLink);
  });
}

function initBurger() {
  headerToggle.addEventListener("click", function () {
    if (header.classList.contains("header--closed")) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  document.addEventListener("click", function (evt) {
    const target = evt.target;
    const headerIsTarget = target === headerNav || headerNav.contains(target);
    const headerIsOpened = header.classList.contains("header--opened");

    if (!headerIsTarget && headerIsOpened) {
      closeMenu();
    }
  });

  header.classList.remove("header--nojs");
}

export {initBurger};

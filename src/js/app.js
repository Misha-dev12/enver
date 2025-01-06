function App() {
  function offset(el) {
    var rect = el?.getBoundingClientRect(),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect?.top + scrollTop };
  }

  let tabs = document.querySelectorAll(".js-tab");
  let tabContents = document.querySelectorAll(".js-tab-content");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", (event) => {
      let tabsChildren = event.target.parentElement.children;
      for (let t = 0; t < tabsChildren.length; t++) {
        tabsChildren[t].classList.remove("tab__active");
      }

      tabs[i].classList.add("tab__active");

      let tabContentChildrens =
        event.target.parentElement.nextElementSibling.children;

      for (let c = 0; c < tabContentChildrens.length; c++) {
        tabContentChildrens[c].classList.remove("tab__content-active");
      }

      tabContents[i].classList.add("tab__content-active");
    });
  }

  //// slider

  
  let sliderCompany = new Swiper(".js-company-slider", {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    speed: 5200,
    simulateTouch: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    breakpoints: {
      1800: {
        spaceBetween: 80,
      },
      900: {
        spaceBetween: 50
      }
    },
  });
  
  let sliderBeyond = new Swiper(".beyond-slider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    spaceBetween: 10,
    loop: true,
    slidesPerView: 1,
    breakpoints: {
      1800: {
        spaceBetween: 40,
        slidesPerView: 3,
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3,
      },
      768: {
        spaceBetween: 10,
        slidesPerView: 2,
      },
    },
  });
  //// faq accordion
  let acc = document.getElementsByClassName("accordion-item");
  let i;

  for (i = 0; i < acc.length; i++) {
    let head = acc[i].querySelector(".accordion-item__head");
    head.addEventListener("click", function () {
      let parentAcc = this.closest(".accordion-item");
      parentAcc.classList.toggle("active");

      let panel = parentAcc.querySelector(".accordion-item__body");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  // scroll header
  const setFixedHeader = () => {
    if (window.scrollY >= 60 || window.pageYOffset >= 60) {
      document
        .getElementsByClassName("header")[0]
        .classList.add("scroll-active");
    } else {
      document
        .getElementsByClassName("header")[0]
        .classList.remove("scroll-active");
    }
  }

  //// parallax

  window.addEventListener("scroll", () => {
    let { scrollY } = window;

    let parallaxElem = document.getElementsByClassName("parallax");
    for (let i = 0; i < parallaxElem.length; i++) {
      let item = parallaxElem[i];

      if (item.scrollTop < scrollY) {
        item.style.top = 0.5 * scrollY - item.scrollTop + "px";
      } else {
        item.style.top = '0px'
      }
    }
  });

  /// header burger

  const burger = document.querySelector(".burger");
  const header = document.querySelector(".header");
  const body = document.querySelector("body");

  function toggleMenu() {
    let burgerClasses = burger.classList.value;
    if (burgerClasses.includes("active")) {
      burger.classList.remove("active");
      header.classList.remove("open-menu");
      body.style.overflow = "visible";
      header.querySelector(".js-dropdown.active").classList.remove("active");
    } else {
      burger.classList.add("active");
      header.classList.add("open-menu");
      body.style.overflow = "hidden";
    }
  }

  burger.addEventListener("click", toggleMenu);

  /// append login
  const login = document.querySelector(".login");
  const nav = document.querySelector(".nav");
  const headerInner = document.querySelector(".header__inner");

  function appendLogin() {
    if (window.innerWidth < 900) {
      nav?.append(login);
    } else {
      headerInner?.append(login);
      burger.classList.remove("active");
      header.classList.remove("open-menu");
      body.style.overflow = "visible";
    }
  }

  // mobile menu

  const dropdownMenu = document.querySelector(".header");

  dropdownMenu.addEventListener("click", (event) => {
    if (event.target.className.includes("js-dropdown")) {
      event.target.classList.add("active");
    }

    if (event.target.className.includes("js-back")) {
      let parentElem = event.target.closest(".js-dropdown");
      parentElem.classList.remove("active");
    }
  });

  //// scroll down

  document.body.addEventListener("click", (event) => {
    const item = event?.target;
    if (item.className.includes("js-offset-scroll")) {
      const offsetId = item.dataset.offset;
      const offsetElement = document.querySelector(offsetId);

      offsetElement.scrollIntoView({ behavior: "smooth" });
    }
  });

  // sticky tab header

  let headerItem = document.getElementById("myHeader");

  const parentItem = headerItem?.closest("section");
  function setTabsSticky() {
    let offsetParent = offset(parentItem);
    if (
      window.scrollY >= offsetParent.top &&
      parentItem.offsetHeight + offsetParent.top > window.scrollY
    ) {
      headerItem?.classList.add("sticky");
    } else {
      headerItem?.classList.remove("sticky");
    }
  }

  function setActiveTab() {
    let activeTab = null;
    let tabBlocks = document.querySelectorAll(".js-tab-block");
    let tabs = document.querySelectorAll(".js-offset-scroll");
    for (let i = 0; i < tabBlocks.length; i++) {
      let offsetTab = offset(tabBlocks[i]);
      if (window.scrollY >= offsetTab.top) {
        activeTab = tabBlocks[i].id;
      }
    }

    for (let j = 0; j < tabs.length; j++) {
      if (`#${activeTab}` === tabs[j]?.dataset.offset) {
        tabs[j].classList.add("tab__active");
      } else {
        tabs[j].classList.remove("tab__active");
      }
    }
    // console.log(activeTab);
  }

  // gsap plug

  gsap.registerPlugin(MotionPathPlugin);

  const animates = document.getElementsByClassName("js-animate");

  for (let i = 0; i < animates.length; i++) {
    let rectSpeed = null;
    let rect = null;
    if (animates[i].querySelector(".plane")) {
      rect = animates[i].querySelector(".plane");
      rectSpeed = 25;
    } else if (animates[i].querySelector(".ship")) {
      rect = animates[i].querySelector(".ship");
      rectSpeed = 50;
    }

    let path = animates[i].querySelector(".path");

    gsap.set(rect, { scaleX: -1, duration: 0.5 });

    if (rect && path) {
      gsap
        .timeline({ repeat: -1 })
        .from(rect, {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: rectSpeed,
          ease: "none",
        })
        .to(rect, { scaleX: 1, duration: 0.5 })
        .to(rect, {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: rectSpeed,
          ease: "none",
        })
        .to(rect, { scaleX: -1, duration: 0.5 });
    }
  }

  // running numbers

  const time = 3000;
  const step = 1;

  function outNum(num, elem) {
    let n = 0;
    let t = Math.round(time / (num / step));
    let interval = setInterval(() => {
      n = n + step;
      if (n == num) {
        clearInterval(interval);
      }
      elem.innerHTML = n;
    }, t);
  }

  let executed = false;

  function toVisibleElem(classes, innerClass) {
    let elem = document.getElementsByClassName(classes);
    let visibleArea = window.innerHeight + window.scrollY;

    for (let i = 0; i < elem?.length; i++) {
      if (visibleArea > elem[i]?.offsetTop) {
        elem[i].classList.add("loading");
        if (!executed) {
          executed = true;

          let runningNumbers = document.getElementsByClassName(innerClass);
          for (let j = 0; j < runningNumbers?.length; j++) {
            if (visibleArea > runningNumbers[j]?.offsetTop) {
              let num = runningNumbers[j].innerHTML;
              outNum(num, runningNumbers[j]);
            }
          }
        }
      }
    }
  }

  
  window.onscroll = function () {
    setFixedHeader();
  };

  window.addEventListener("scroll", () => {
    toVisibleElem("js-running-value", "js-running-number");
    setTabsSticky();
    setActiveTab();
  });

  window.addEventListener("resize", () => {
    appendLogin();
  });

  document.addEventListener("DOMContentLoaded", () => {
    appendLogin();
    setFixedHeader();
  });
}

App();

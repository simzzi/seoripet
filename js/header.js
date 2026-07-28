function mobileMenu(){
  const menuBtn = document.querySelector(".menu-btn");
  const closeBtn = document.querySelector(".close-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const dim = document.querySelector(".mobile-dim");
  const depthBtns = document.querySelectorAll(".mobile-depth1");

  if (!menuBtn || !closeBtn || !mobileNav || !dim) return;

  menuBtn.onclick = function () {
    mobileNav.classList.add("open");
    dim.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  closeBtn.onclick = function () {
    mobileNav.classList.remove("open");
    dim.classList.remove("show");
    document.body.style.overflow = "";
  };

  dim.onclick = function () {
    mobileNav.classList.remove("open");
    dim.classList.remove("show");
    document.body.style.overflow = "";
  };

  depthBtns.forEach(function (btn) {
    btn.onclick = function () {
      const parent = btn.parentElement;
      const icon = btn.querySelector("span");

      parent.classList.toggle("active");
      icon.textContent = parent.classList.contains("active") ? "−" : "+";
    };
  });
};
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.dataset.target === current) {
      item.classList.add("active");
    }
  });
});
navItems.forEach(item => {
  item.addEventListener("click", () => {
    document.getElementById(item.dataset.target)
      .scrollIntoView({ behavior: "smooth" });   
  });
});
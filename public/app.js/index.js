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



const img = document.querySelector(".float-img");

let pos = 0, dir = 1;

function animate() {
  pos += 0.50 * dir;
  if (pos > 20 || pos < -20) dir *= -1;
  img.style.transform = `translateY(${pos}px)`;
  requestAnimationFrame(animate);
  img.style.transform += ` translateY(8px) scale(0.95)`;
}

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) animate();
});

observer.observe(img);
// const img = document.querySelector(".float-img");

// let targetY = 0;  
// let currentY = 0;  
// const range = 20;  
// const speed = 0.1; 


// document.addEventListener("mousemove", e => {
//   const windowHeight = window.innerHeight;
//   const pointerY = e.clientY;


//   targetY = ((pointerY / windowHeight) - 0.5) * range * 2;
// });


// function animate() {

//   currentY += (targetY - currentY) * speed;

//   img.style.transform = `translateY(${currentY}px)`;

//   requestAnimationFrame(animate);
// }

// animate();
const watchBtn = document.getElementById("watchBtn");
const modal = document.getElementById("videoModal");
const closeBtn = document.querySelector(".close");
const videoFrame = document.getElementById("videoFrame");


const videoID = "5ToQXOXGzjI";
const videoURL = `https://www.youtube.com/embed/${videoID}?autoplay=1`;

watchBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  videoFrame.src = videoURL;
});

function closeModal() {
  modal.style.display = "none";
  videoFrame.src = ""; 
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
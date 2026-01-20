const items = document.querySelectorAll(".nav-item, .book-table");
const sections = document.querySelectorAll("section");


window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 160;
    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  items.forEach(item => {
    item.classList.remove("active");
    if (item.dataset.target === current) {
      item.classList.add("active");
    }
  });
});

// CLICK SCROLL
items.forEach(item => {
  item.addEventListener("click", () => {
    const target = item.dataset.target;
    if (!target) return;

    document
      .getElementById(target)
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
const modal1 = document.getElementById("videoModal");
const closeBtn = document.querySelector(".close");
const videoFrame = document.getElementById("videoFrame");


const videoID = "5ToQXOXGzjI";
const videoURL = `https://www.youtube.com/embed/${videoID}?autoplay=1`;

watchBtn.addEventListener("click", () => {
  modal1.style.display = "flex";
  videoFrame.src = videoURL;
});

function closeModal() {
  modal1.style.display = "none";
  videoFrame.src = ""; 
}

closeBtn.addEventListener("click", closeModal);

modal1.addEventListener("click", e => {
  if (e.target === modal1) closeModal();
});



const form = document.getElementById("resForm");
const tableSelect = document.getElementById("table");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");


const tables = Array.from({ length: 14 }, (_, i) => `Table ${i + 1}`);


let reservations = [];


tables.forEach(t => {
  const option = document.createElement("option");
  option.value = t;
  option.textContent = t;
  tableSelect.appendChild(option);
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const table = tableSelect.value;


  const exists = reservations.find(
    r => r.date === date && r.time === time && r.table === table
  );

  if (exists) {
    showModal("❌This table is already reserved at this time!");
  } else {
    reservations.push({ date, time, table });
    showModal(" Table reserved successfully!");
    form.reset();
  }
});

function showModal(msg) {
  modalText.textContent = msg;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}
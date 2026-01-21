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



const forms = document.querySelectorAll(".resForm");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");

const TOTAL_TABLES = 8;
const MAX_PEOPLE = 4;
const MAX_HOURS = 2;

const tables = Array.from({ length: TOTAL_TABLES }, (_, i) => `Table ${i + 1}`);

let reservations = JSON.parse(localStorage.getItem("reservations")) || [];


document.querySelectorAll(".res-table").forEach(select => {
  tables.forEach(t => {
    const option = document.createElement("option");
    option.value = t;
    option.textContent = t;
    select.appendChild(option);
  });
});


function showModal(msg) {
  modalText.textContent = msg;
  modal.style.display = "flex";
}
function closeModal() {
  modal.style.display = "none";
}

function validTime(date, time) {
  const now = new Date();
  const selected = new Date(`${date}T${time}`);
  const diffHours = (now - selected) / (1000 * 60 * 60);
  return diffHours <= MAX_HOURS;
}


function handleReservation(form) {
  const date = form.querySelector(".res-date").value;
  const time = form.querySelector(".res-time").value;
  const table = form.querySelector(".res-table").value;
  const people = Number(form.querySelector(".res-people").value);

  if (!table) return showModal(" Please choose a table");
  if (people > MAX_PEOPLE) return showModal(" Max 4 people per table");
  if (!validTime(date, time)) return showModal(" Time already expired");

  const exists = reservations.find(r =>
    r.date === date && r.time === time && r.table === table
  );

  if (exists) return showModal(" Table already reserved");

  reservations.push({ date, time, table, people });
  localStorage.setItem("reservations", JSON.stringify(reservations));

  showModal("Reservation confirmed!");
  form.reset();
}


forms.forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    handleReservation(form);
  });
});












const tabs = document.querySelectorAll(".tab");
const menuItems = document.querySelectorAll(".menu-item");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

  
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.dataset.category;

    menuItems.forEach(menuItem => {
      if (menuItem.dataset.category === category) {

    
        menuItem.classList.remove("hide");

        menuItem.animate(
          [
            { opacity: 0, transform: "scale(0.9) translateY(20px)" },
            { opacity: 1, transform: "scale(1) translateY(0)" }
          ],
          {
            duration: 400,
            easing: "ease-out",
            fill: "forwards"
          }
        );

      } else {

    
        menuItem.animate(
          [
            { opacity: 1, transform: "scale(1) translateY(0)" },
            { opacity: 0, transform: "scale(0.9) translateY(20px)" }
          ],
          {
            duration: 300,
            easing: "ease-in",
            fill: "forwards"
          }
        );

        setTimeout(() => {
          menuItem.classList.add("hide");
        }, 300);
      }
    });

  });
});
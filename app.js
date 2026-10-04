const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("mainNav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll("main section[id], #top")];
const navLinks = [...document.querySelectorAll("#mainNav a")];

function updateNavigation() {
  let current = "top";
  const position = window.scrollY + 180;

  sections.forEach(section => {
    if (section.offsetTop <= position) current = section.id || "top";
  });

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    link.classList.toggle(
      "active",
      href === `#${current}` || (current === "top" && href === "#top")
    );
  });
}

window.addEventListener("scroll", updateNavigation, { passive: true });
updateNavigation();

document.getElementById("year").textContent = new Date().getFullYear();

const visual = document.querySelector(".hero-visual");

if (visual && window.matchMedia("(pointer:fine)").matches) {
  visual.addEventListener("mousemove", event => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const emblem = visual.querySelector(".x-emblem");
    if (emblem) {
      emblem.style.transform =
        `translate(${x * 14}px, ${y * 14}px)`;
    }
  });

  visual.addEventListener("mouseleave", () => {
    const emblem = visual.querySelector(".x-emblem");
    if (emblem) emblem.style.transform = "";
  });
}

const navLinks = Array.from(document.querySelectorAll(".section-nav__link"));
const sections = Array.from(document.querySelectorAll("main .slide"));
const revealNodes = Array.from(document.querySelectorAll(".reveal"));

function setActiveNavById(id) {
  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isMatch);
    link.setAttribute("aria-current", isMatch ? "true" : "false");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href");
    if (!targetId) return;
    const target = document.querySelector(targetId);
    if (!(target instanceof HTMLElement)) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveNavById(entry.target.id);
      }
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0.01,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealNodes.forEach((node) => revealObserver.observe(node));

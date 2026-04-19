// main.js — Krish Maharjan Portfolio

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { label: "HTML5", icon: "🌐" },
  { label: "CSS3", icon: "🎨" },
  { label: "JavaScript", icon: "⚡" },
  { label: "TypeScript", icon: "🔷" },
  { label: "Node.js", icon: "🟢" },
  { label: "React", icon: "⚛️" },
  { label: "Python", icon: "🐍" },
  { label: "PostgreSQL", icon: "🗄️" },
  { label: "Docker", icon: "🐳" },
  { label: "Git", icon: "🔀" },
  { label: "Figma", icon: "✏️" },
  { label: "REST APIs", icon: "🔗" },
];

const PROJECTS = [
  {
    title: 'E-Commerce Store',
    desc: 'A fully functional online store with product listings, a shopping cart, checkout flow, and order management.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Calculator',
    desc: 'A clean, responsive calculator supporting basic arithmetic, keyboard input, and a history log of recent calculations.',
    img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&h=400&fit=crop&auto=format',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'To-Do List',
    desc: 'A task management app with add, edit, delete, and complete features — with local storage so tasks persist on refresh.',
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop&auto=format',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];

// ─── Theme ───────────────────────────────────────────────────────────────────
// 6am–5:59pm = light  |  6pm–5:59am = dark
// Initial theme is set synchronously in <head> to prevent flash.
// Here we just keep it in sync every minute.

const applyTheme = () => {
  const hour = new Date().getHours();
  const theme = hour >= 6 && hour < 18 ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  const badge = document.getElementById("theme-badge");
  if (badge)
    badge.title = theme === "light" ? "Light mode (day)" : "Dark mode (night)";
};

applyTheme();
setInterval(applyTheme, 60_000);

// ─── Clocks ──────────────────────────────────────────────────────────────────

const pad = (n) => String(n).padStart(2, "0");

const getNPT = () => {
  const utcMs = Date.now() + new Date().getTimezoneOffset() * 60000;
  const npt = new Date(utcMs + 345 * 60000); // UTC+5:45
  return `${pad(npt.getHours())}:${pad(npt.getMinutes())}:${pad(npt.getSeconds())}`;
};

const getLocal = () => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const tickClocks = () => {
  const nptEl = document.getElementById("npt-time");
  const localEl = document.getElementById("local-time");
  if (nptEl) nptEl.textContent = getNPT();
  if (localEl) localEl.textContent = getLocal();
};

tickClocks();
setInterval(tickClocks, 1000);

// ─── DOM Ready ───────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // EmailJS
  if (typeof emailjs !== "undefined") emailjs.init("jaEu-NvWgmhTrCtnP");

  // Render skills
  const skillsGrid = document.getElementById("skills-grid");
  if (skillsGrid) {
    skillsGrid.innerHTML = SKILLS.map(
      (s) =>
        `<div class="skill-badge" data-gsap>
        <span class="skill-badge__icon" aria-hidden="true">${s.icon}</span>
        <span>${s.label}</span>
      </div>`,
    ).join("");
  }

  // Render project cards
  const worksGrid = document.getElementById("works-grid");
  if (worksGrid) {
    worksGrid.innerHTML = PROJECTS.map(
      (p) =>
        `<article class="work-card" data-gsap>
        <img src="${p.img}" alt="${p.title}" class="work-card__img" loading="lazy" width="600" height="400">
        <div class="work-card__body">
          <h3 class="work-card__title">${p.title}</h3>
          <p class="work-card__desc">${p.desc}</p>
          <div class="work-card__tags">${p.tags.map((t) => `<span class="work-card__tag">${t}</span>`).join("")}</div>
          <a href="#" class="work-card__link">View Project</a>
        </div>
      </article>`,
    ).join("");
  }

  // Nav — hamburger toggle
  const hamburger = document.getElementById("hamburger");
  const header = document.getElementById("site-header");
  const mobileList = document.getElementById("nav-mobile-list");

  hamburger?.addEventListener("click", () => {
    const open = header.classList.toggle("nav--open");
    hamburger.setAttribute("aria-expanded", open);
    mobileList?.setAttribute("aria-hidden", !open);
  });

  document.querySelectorAll(".nav__mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav--open");
      hamburger?.setAttribute("aria-expanded", "false");
      mobileList?.setAttribute("aria-hidden", "true");
    });
  });

  // Back to top
  const backBtn = document.getElementById("back-to-top");
  if (backBtn) {
    window.addEventListener(
      "scroll",
      () => {
        backBtn.classList.toggle("back-to-top--visible", window.scrollY > 300);
      },
      { passive: true },
    );
    backBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  // GSAP animations
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined")
      gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .from(".hero__top", { opacity: 0, y: -20, duration: 0.5 })
      .from(".hero__greeting", { opacity: 0, y: 30, duration: 0.6 }, "-=0.2")
      .from(".hero__name", { opacity: 0, y: 50, duration: 0.9 }, "-=0.4")
      .from(".hero__tagline", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero__cta-group", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
      .from("#clock-widget", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero__scroll-hint", { opacity: 0, duration: 0.5 }, "-=0.2")
      .from(".hero__bg-text", { opacity: 0, duration: 1.0 }, "-=0.8");

    // Scroll reveals
    if (typeof ScrollTrigger !== "undefined") {
      const reveal = (target, vars) =>
        gsap.from(target, {
          ...vars,
          scrollTrigger: { trigger: target, start: "top 80%" },
        });

      reveal(".skill-badge", {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });
      reveal(".work-card", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      });
      reveal(".resume__sidebar", {
        opacity: 0,
        x: -40,
        duration: 0.7,
        ease: "power3.out",
      });
      reveal(".resume__main", {
        opacity: 0,
        x: 40,
        duration: 0.7,
        ease: "power3.out",
      });
      reveal(".contact__info", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "power3.out",
      });
      reveal(".contact__form", {
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  } else {
    // Graceful degradation if GSAP fails to load
    document.querySelectorAll("[data-gsap]").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }

  // Contact form
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name");
    const email = document.getElementById("form-email");
    const message = document.getElementById("form-message");
    const btn = document.getElementById("form-submit");
    const status = document.getElementById("form-status");

    // Clear errors
    ["error-name", "error-email", "error-message"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });
    status.textContent = "";
    status.className = "form__status";

    // Validate
    let valid = true;
    if (!name.value.trim()) {
      document.getElementById("error-name").textContent = "Name is required.";
      valid = false;
    }
    if (!email.value.trim()) {
      document.getElementById("error-email").textContent = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      document.getElementById("error-email").textContent =
        "Enter a valid email.";
      valid = false;
    }
    if (!message.value.trim()) {
      document.getElementById("error-message").textContent =
        "Message is required.";
      valid = false;
    }
    if (!valid) return;

    btn.disabled = true;
    btn.textContent = "Sending…";

    if (typeof emailjs === "undefined") {
      status.textContent = "Email service unavailable. Please email directly.";
      status.className = "form__status form__status--error";
      btn.disabled = false;
      btn.textContent = "Send Message";
      return;
    }

    try {
      await emailjs.send("service_b8b900o", "template_pny925g", {
        from_name: name.value,
        from_email: email.value,
        message: message.value,
      });
      status.textContent = "Message sent! I'll get back to you soon.";
      status.className = "form__status form__status--success";
      form.reset();
    } catch {
      status.textContent =
        "Something went wrong. Please try again or email directly.";
      status.className = "form__status form__status--error";
    } finally {
      btn.disabled = false;
      btn.textContent = "Send Message";
    }
  });
});

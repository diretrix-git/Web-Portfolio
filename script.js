/* ══════════════════════════════════════════════
   EMAILJS CONFIG — replace with your real values
══════════════════════════════════════════════ */
const EJ_PUBLIC_KEY = "jaEu-NvWgmhTrCtnP"; // EmailJS → Account → Public Key
const EJ_SERVICE_ID = "service_b8b900o"; // EmailJS → Email Services → Service ID
const EJ_TEMPLATE_ID = "template_pny925g"; // EmailJS → Email Templates → Template ID
emailjs.init({ publicKey: EJ_PUBLIC_KEY });

/* ── GSAP ── */
gsap.registerPlugin(ScrollTrigger);

/* ── DARK / LIGHT MODE ── */
function applyMode() {
  const h = new Date().getHours();
  const dark = h >= 18 || h < 6;
  document.body.classList.toggle("dark", dark);
  const label = dark ? "☾ Night" : "☀ Day";
  document.getElementById("mode-badge").textContent = label;
  const mob = document.getElementById("mode-badge-mob");
  if (mob) mob.textContent = label;
}
applyMode();
setInterval(applyMode, 60000);

/* ── CLOCKS — real-time, ticking every second ── */
function z(n) {
  return String(n).padStart(2, "0");
}
function fmtDate(d) {
  const D = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const M = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${D[d.getDay()]}, ${d.getDate()} ${M[d.getMonth()]} ${d.getFullYear()}`;
}

// Show user's IANA timezone (e.g. "Asia/Kolkata")
const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local Time";
document.getElementById("local-tz").textContent = userTZ;

function updateClocks() {
  const now = new Date();

  // Local clock — straightforward from the browser
  document.getElementById("lc-h").textContent = z(now.getHours());
  document.getElementById("lc-m").textContent = z(now.getMinutes());
  document.getElementById("lc-s").textContent = z(now.getSeconds());
  document.getElementById("local-date").textContent = fmtDate(now);

  // Nepal clock — convert to UTC first, then add +5:45
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const nepalMs = utcMs + (5 * 60 + 45) * 60000;
  const np = new Date(nepalMs);
  document.getElementById("np-h").textContent = z(np.getHours());
  document.getElementById("np-m").textContent = z(np.getMinutes());
  document.getElementById("np-s").textContent = z(np.getSeconds());
  document.getElementById("nepal-date").textContent = fmtDate(np);
}
updateClocks();
setInterval(updateClocks, 1000); // tick every second

/* ── HAMBURGER ── */
const ham = document.getElementById("hamburger");
const menu = document.getElementById("mobile-menu");

ham.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  ham.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
});
document.querySelectorAll(".mob-link").forEach((a) => {
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    ham.classList.remove("open");
    document.body.style.overflow = "";
  });
});

/* ── SMOOTH SCROLL (all anchor links, offset for fixed nav) ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById("navbar").offsetHeight;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH,
      behavior: "smooth",
    });
  });
});

/* ── GSAP HERO ── */
const tl = gsap.timeline({ delay: 0.15 });
tl.fromTo(
  ".hero-eyebrow",
  { y: 20, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
)
  .fromTo(
    ".hero-name",
    { y: 40, opacity: 0, skewY: 2 },
    { y: 0, opacity: 1, skewY: 0, duration: 0.85, ease: "power3.out" },
    "-=0.4",
  )
  .fromTo(
    ".hero-tagline",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
    "-=0.5",
  )
  .fromTo(
    ".hero-cta",
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    "-=0.4",
  )
  .fromTo(
    ".hero-visual",
    { x: 40, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
    "-=0.7",
  )
  .fromTo(
    ".scroll-hint",
    { x: -15, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5 },
    "-=0.2",
  );

gsap.to(".scroll-line", {
  scaleX: 1.6,
  repeat: -1,
  yoyo: true,
  duration: 1.4,
  ease: "sine.inOut",
  delay: 1.6,
});

gsap.fromTo(
  ".clock-card",
  { y: 30, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 0.7,
    ease: "back.out(1.5)",
    scrollTrigger: { trigger: "#clocks", start: "top 85%", once: true },
  },
);

document.querySelectorAll("[data-reveal]").forEach((el) => {
  gsap.fromTo(
    el,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
    },
  );
});
gsap.fromTo(
  ".skill-chip",
  { y: 16, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.03,
    duration: 0.35,
    ease: "power2.out",
    scrollTrigger: { trigger: ".skills-categories", start: "top 80%", once: true },
  },
);
gsap.fromTo(
  ".project-card",
  { y: 24, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.07,
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: { trigger: ".projects-grid", start: "top 95%", once: true },
  },
);

/* ── BACK TO TOP ── */
const backTop = document.getElementById("back-top");
let backTicking = false;
window.addEventListener("scroll", () => {
  if (backTicking) return;
  backTicking = true;
  requestAnimationFrame(() => {
    backTop.classList.toggle("visible", window.scrollY > 400);
    backTicking = false;
  });
});
backTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* ── CONTACT FORM ── */
function setErr(inputId, errId, show) {
  document.getElementById(inputId).classList.toggle("err", show);
  document.getElementById(errId).classList.toggle("show", show);
}
// live-clear errors as user types
[
  ["fname", "err-fname"],
  ["cemail", "err-email"],
  ["message", "err-message"],
].forEach(([inp, err]) => {
  document.getElementById(inp).addEventListener("input", () => {
    document.getElementById(inp).classList.remove("err");
    document.getElementById(err).classList.remove("show");
    // also hide global status
    const s = document.getElementById("form-status");
    s.className = "";
    s.style.display = "none";
  });
});

document.getElementById("send-btn").addEventListener("click", async () => {
  const fname = document.getElementById("fname").value.trim();
  const email = document.getElementById("cemail").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const status = document.getElementById("form-status");
  const btn = document.getElementById("send-btn");

  // clear
  status.className = "";
  status.style.display = "none";

  // per-field validation
  let ok = true;
  setErr("fname", "err-fname", !fname);
  if (!fname) ok = false;
  setErr("cemail", "err-email", !email || !emailRx.test(email));
  if (!email || !emailRx.test(email)) ok = false;
  setErr("message", "err-message", !message);
  if (!message) ok = false;
  if (!ok) return;

  btn.textContent = "Sending…";
  btn.disabled = true;

  try {
    await emailjs.sendForm(
      EJ_SERVICE_ID,
      EJ_TEMPLATE_ID,
      document.getElementById("contact-form"),
    );
    status.className = "success";
    status.textContent =
      "✓ Message sent! I'll get back to you within 24 hours. Thank you!";
    status.style.display = "block";
    document.getElementById("contact-form").reset();
    gsap.fromTo(
      status,
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 },
    );
  } catch (err) {
    status.className = "error";
    status.textContent =
      "✗ Something went wrong. Please email me directly at krish.maharjan@gmail.com";
    status.style.display = "block";
    console.error("EmailJS error:", err);
  } finally {
    btn.textContent = "Send Message →";
    btn.disabled = false;
  }
});

/* ── NAV ACTIVE HIGHLIGHT — throttled ── */
const allSecs = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-links a");
let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    let cur = "";
    allSecs.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 140) cur = s.id;
    });
    navAs.forEach((a) => {
      a.style.color = a.getAttribute("href") === `#${cur}` ? "var(--accent)" : "";
    });
    scrollTicking = false;
  });
});

/* ==========================================================================
   Nicola Holdings Group — Site Script
   No dependencies. Everything here is progressive enhancement: the site
   remains fully readable and navigable with JavaScript disabled.
   ========================================================================== */

/* ---------- SITE SETTINGS (edit these) ----------
   CONTACT_EMAIL: the business inbox the contact form should address.
                  Leave empty until a verified business email exists.
   WOSB_CERTIFIED: set to true once SBA has awarded WOSB certification. While false,
                  every WOSB reference carries a small "Preview" tag and the official SBA
                  WOSB badge stays hidden. Add ?preview=final
                  to the page URL to see the finished, tag-free design without changing this. */
const SITE = {
  WOSB_CERTIFIED: true,
  CONTACT_EMAIL: "",
};

(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  /* ---------- WOSB certification display ---------- */
  const previewFinal = new URLSearchParams(location.search).get("preview") === "final";
  if (SITE.WOSB_CERTIFIED || previewFinal) root.classList.add("cert-final");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Header state on scroll ---------- */
  const header = document.querySelector("[data-header]");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  function setNav(open, { returnFocus = false } = {}) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    if (open) {
      const first = nav.querySelector("a");
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => setNav(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a[href^='#']")) setNav(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setNav(false, { returnFocus: true });
    });
    // Close the drawer if the viewport grows past the mobile breakpoint
    window.matchMedia("(min-width: 1181px)").addEventListener("change", (mq) => { if (mq.matches) setNav(false); });
  }

  /* ---------- Active section highlighting in nav ---------- */
  const navLinks = Array.from(document.querySelectorAll(".primary-nav__list a[href^='#']"));
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const hero = document.querySelector("#top");
  if (hero) sections.unshift(hero); // hero in view = no nav item active

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navLinks.forEach((a) => {
          const active = a.getAttribute("href") === id;
          a.classList.toggle("is-active", active);
          if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = (i % 3) * 70 + "ms"; // light stagger within rows
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Contact form (static: opens the visitor's email app) ---------- */
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  // With a business email configured, the inquiry form appears beneath the phone panel.
  if (form && SITE.CONTACT_EMAIL) form.hidden = false;

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.classList.remove("is-error");

      let firstInvalid = null;
      form.querySelectorAll("[required]").forEach((field) => {
        const valid = field.checkValidity() && field.value.trim() !== "";
        field.setAttribute("aria-invalid", String(!valid));
        if (!valid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        status.textContent = "Please complete your name, a valid email, and a message.";
        status.classList.add("is-error");
        firstInvalid.focus();
        return;
      }

      if (!SITE.CONTACT_EMAIL) {
        status.textContent = "Our business inbox is being set up. Please check back shortly.";
        return;
      }

      const data = new FormData(form);
      const subject = `Website inquiry — ${data.get("type")}`;
      const body = [
        `Name: ${data.get("name")}`,
        `Organization: ${data.get("organization") || "—"}`,
        `Email: ${data.get("email")}`,
        `Inquiry type: ${data.get("type")}`,
        "",
        data.get("message"),
      ].join("\n");

      window.location.href = `mailto:${SITE.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Your email app should open with your message ready to send.";
    });

    form.addEventListener("input", (e) => {
      if (e.target.hasAttribute("aria-invalid")) e.target.removeAttribute("aria-invalid");
    });
  }
})();

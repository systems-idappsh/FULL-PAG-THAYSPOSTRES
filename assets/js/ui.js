/* ==========================================================================
   thayspostres · Interfaz
   ========================================================================== */

(function () {
  "use strict";

  function initMobileNavigation() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-site-nav]");

    if (!toggle || !nav) {
      return;
    }

    function closeNav() {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }

    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
      document.body.classList.toggle("nav-open", !expanded);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNav();
      }
    });
  }

  function markActiveNavigation() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll("[data-nav-link]");

    links.forEach(function (link) {
      const href = link.getAttribute("href");
      const normalizedHref = href ? href.split("/").pop() : "";

      if (normalizedHref === currentPath) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function initFaqAccordions(scope) {
    const root = scope || document;
    const buttons = root.querySelectorAll("[data-faq-button]");

    buttons.forEach(function (button) {
      const panelId = button.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;

      if (!panel) {
        return;
      }

      button.addEventListener("click", function () {
        const isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isOpen));
        panel.classList.toggle("is-open", !isOpen);
      });
    });
  }

  function initGalleryFilters() {
    const filterButtons = document.querySelectorAll("[data-gallery-filter]");
    const items = document.querySelectorAll("[data-gallery-category]");

    if (!filterButtons.length || !items.length) {
      return;
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const filter = button.getAttribute("data-gallery-filter") || "all";

        filterButtons.forEach(function (item) {
          const isActive = item === button;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });

        items.forEach(function (item) {
          const category = item.getAttribute("data-gallery-category");
          const visible = filter === "all" || category === filter;
          item.hidden = !visible;
        });
      });
    });
  }

  function initCopyCurrentYear() {
    const yearElements = document.querySelectorAll("[data-current-year]");
    const year = String(new Date().getFullYear());

    yearElements.forEach(function (element) {
      element.textContent = year;
    });
  }

  function initImageFallbacks(scope) {
    const root = scope || document;
    const images = root.querySelectorAll("img[data-fallback]");

    images.forEach(function (image) {
      image.addEventListener("error", function () {
        const fallback = image.getAttribute("data-fallback");
        if (fallback && image.src.indexOf(fallback) === -1) {
          image.src = fallback;
        }
      });
    });
  }

  window.ThaysPostresUI = {
    initMobileNavigation: initMobileNavigation,
    markActiveNavigation: markActiveNavigation,
    initFaqAccordions: initFaqAccordions,
    initGalleryFilters: initGalleryFilters,
    initCopyCurrentYear: initCopyCurrentYear,
    initImageFallbacks: initImageFallbacks
  };
})();

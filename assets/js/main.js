/* ==========================================================================
   thayspostres · Inicialización global
   ========================================================================== */

(function () {
  "use strict";

  function runWhenReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  runWhenReady(function () {
    if (window.ThaysPostresWhatsApp) {
      window.ThaysPostresWhatsApp.setBrandText(document);
      window.ThaysPostresWhatsApp.applyGlobalWhatsAppLinks(document);
      window.ThaysPostresWhatsApp.applySocialLinks(document);
      window.ThaysPostresWhatsApp.initWhatsAppForms(document);
    }

    if (window.ThaysPostresUI) {
      window.ThaysPostresUI.initMobileNavigation();
      window.ThaysPostresUI.markActiveNavigation();
      window.ThaysPostresUI.initFaqAccordions(document);
      window.ThaysPostresUI.initGalleryFilters();
      window.ThaysPostresUI.initCopyCurrentYear();
      window.ThaysPostresUI.initImageFallbacks(document);
    }

    if (window.ThaysPostresCatalog) {
      window.ThaysPostresCatalog.initCatalogPage();
      window.ThaysPostresCatalog.initFeaturedProducts();
    }
  });
})();

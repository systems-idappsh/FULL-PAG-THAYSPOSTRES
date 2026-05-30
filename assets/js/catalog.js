/* ==========================================================================
   thayspostres · Catálogo
   ========================================================================== */

(function () {
  "use strict";

  function getProducts() {
    return Array.isArray(window.ThaysPostresProducts) ? window.ThaysPostresProducts : [];
  }

  function getConfig() {
    return window.ThaysPostresConfig || {};
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    if (typeof text === "string") {
      element.textContent = text;
    }
    return element;
  }

  function createBadge(text, modifier) {
    const badge = createElement("span", "badge" + (modifier ? " " + modifier : ""), text);
    return badge;
  }

  function createProductCard(product) {
    const config = getConfig();
    const article = createElement("article", "card product-card");
    article.setAttribute("data-product-id", product.id);

    const media = createElement("div", "card__media");
    const img = document.createElement("img");
    img.src = product.image || "assets/img/placeholders/product-placeholder.svg";
    img.alt = "Referencia visual de " + product.name.replace(" [SUPUESTO]", "");
    img.loading = "lazy";
    img.setAttribute("data-fallback", "assets/img/placeholders/product-placeholder.svg");
    media.appendChild(img);

    const body = createElement("div", "card__body");
    const title = createElement("h3", "card__title", product.name);
    const description = createElement("p", "card__text", product.description);
    const meta = createElement("div", "card__meta");

    if (product.categoryLabel) {
      meta.appendChild(createBadge(product.categoryLabel, "badge--soft"));
    }

    if (product.isAssumption) {
      meta.appendChild(createBadge(config.flags ? config.flags.assumedProduct : "[SUPUESTO]", "badge--warning"));
    }

    if (Array.isArray(product.tags)) {
      product.tags.forEach(function (tag) {
        if (tag !== "[SUPUESTO]") {
          meta.appendChild(createBadge(tag, ""));
        }
      });
    }

    const note = createElement("p", "text-small text-muted", config.messages ? config.messages.availabilityNote : "Precios y disponibilidad se confirman por mensaje.");
    const button = createElement("a", "btn btn--whatsapp", "Consultar por WhatsApp");
    button.setAttribute("data-product-whatsapp", product.id);

    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(meta);
    body.appendChild(note);
    body.appendChild(button);

    article.appendChild(media);
    article.appendChild(body);

    return article;
  }

  function getCategories(products) {
    const categories = [{ id: "all", label: "Todo" }];
    const seen = new Set();

    products.forEach(function (product) {
      if (!product.category || seen.has(product.category)) {
        return;
      }
      seen.add(product.category);
      categories.push({
        id: product.category,
        label: product.categoryLabel || product.category
      });
    });

    return categories;
  }

  function renderFilters(container, products, onFilter) {
    if (!container) {
      return;
    }

    const categories = getCategories(products);
    container.innerHTML = "";

    categories.forEach(function (category, index) {
      const button = createElement("button", "filter-btn" + (index === 0 ? " is-active" : ""), category.label);
      button.type = "button";
      button.setAttribute("data-category", category.id);
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false");

      button.addEventListener("click", function () {
        container.querySelectorAll(".filter-btn").forEach(function (item) {
          const isActive = item === button;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });

        onFilter(category.id);
      });

      container.appendChild(button);
    });
  }

  function bindProductWhatsApp(scope) {
    const root = scope || document;
    const buttons = root.querySelectorAll("[data-product-whatsapp]");
    const products = getProducts();
    const whatsApp = window.ThaysPostresWhatsApp;

    if (!whatsApp) {
      return;
    }

    buttons.forEach(function (button) {
      const id = button.getAttribute("data-product-whatsapp");
      const product = products.find(function (item) {
        return item.id === id;
      });

      if (!product) {
        return;
      }

      whatsApp.setLinkAttributes(button, product.whatsappMessage, "Consultar " + product.name + " por WhatsApp");
    });
  }

  function renderProductList(container, products) {
    if (!container) {
      return;
    }

    container.innerHTML = "";

    if (!products.length) {
      const empty = createElement("div", "empty-state");
      empty.innerHTML = "<h3>No hay productos para mostrar</h3><p>Revisa otra categoría o actualiza el archivo de productos.</p>";
      container.appendChild(empty);
      return;
    }

    products.forEach(function (product) {
      container.appendChild(createProductCard(product));
    });

    bindProductWhatsApp(container);

    if (window.ThaysPostresUI && typeof window.ThaysPostresUI.initImageFallbacks === "function") {
      window.ThaysPostresUI.initImageFallbacks(container);
    }
  }

  function updateStatus(element, count) {
    if (!element) {
      return;
    }

    element.textContent = count === 1 ? "1 producto de ejemplo visible." : count + " productos de ejemplo visibles.";
  }

  function initCatalogPage() {
    const grid = document.querySelector("[data-catalog-grid]");
    const filters = document.querySelector("[data-catalog-filters]");
    const status = document.querySelector("[data-catalog-status]");
    const searchInput = document.querySelector("[data-catalog-search]");

    if (!grid) {
      return;
    }

    const products = getProducts();
    let activeCategory = "all";
    let query = "";

    function getFilteredProducts() {
      return products.filter(function (product) {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory;
        const normalizedQuery = query.trim().toLowerCase();
        const searchable = [
          product.name,
          product.categoryLabel,
          product.description,
          Array.isArray(product.tags) ? product.tags.join(" ") : ""
        ].join(" ").toLowerCase();

        const matchesQuery = !normalizedQuery || searchable.indexOf(normalizedQuery) !== -1;
        return matchesCategory && matchesQuery;
      });
    }

    function refresh() {
      const filteredProducts = getFilteredProducts();
      renderProductList(grid, filteredProducts);
      updateStatus(status, filteredProducts.length);
    }

    renderFilters(filters, products, function (category) {
      activeCategory = category;
      refresh();
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        query = searchInput.value || "";
        refresh();
      });
    }

    refresh();
  }

  function initFeaturedProducts() {
    const container = document.querySelector("[data-featured-products]");

    if (!container) {
      return;
    }

    const featured = getProducts().filter(function (product) {
      return product.featured;
    }).slice(0, 3);

    renderProductList(container, featured);
  }

  window.ThaysPostresCatalog = {
    initCatalogPage: initCatalogPage,
    initFeaturedProducts: initFeaturedProducts,
    bindProductWhatsApp: bindProductWhatsApp
  };
})();

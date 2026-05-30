/* ==========================================================================
   thayspostres · WhatsApp
   ========================================================================== */

(function () {
  "use strict";

  function getConfig() {
    return window.ThaysPostresConfig || {};
  }

  function normalizePhoneNumber(phone) {
    if (!phone || typeof phone !== "string") {
      return "";
    }

    return phone.replace(/\D/g, "");
  }

  function buildMessage(template, values) {
    const safeTemplate = typeof template === "string" ? template : "";
    const replacements = values && typeof values === "object" ? values : {};

    return safeTemplate.replace(/\{([a-zA-Z0-9_]+)\}/g, function (match, key) {
      return Object.prototype.hasOwnProperty.call(replacements, key) ? String(replacements[key]) : match;
    });
  }

  function buildWhatsAppUrl(message) {
    const config = getConfig();
    const phone = normalizePhoneNumber(config.contact ? config.contact.whatsappNumber : "");
    const safeMessage = typeof message === "string" && message.trim() !== "" ? message.trim() : config.messages.general;

    if (!phone) {
      return "#";
    }

    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(safeMessage);
  }

  function setLinkAttributes(link, message, label) {
    if (!link) {
      return;
    }

    link.setAttribute("href", buildWhatsAppUrl(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");

    if (label) {
      link.setAttribute("aria-label", label);
    }
  }

  function applyGlobalWhatsAppLinks(scope) {
    const root = scope || document;
    const config = getConfig();
    const buttons = root.querySelectorAll("[data-whatsapp]");

    buttons.forEach(function (button) {
      const messageKey = button.getAttribute("data-whatsapp");
      const customMessage = button.getAttribute("data-message");
      let message = config.messages.general;

      if (customMessage) {
        message = customMessage;
      } else if (messageKey === "custom-order") {
        message = config.messages.customOrder;
      }

      setLinkAttributes(button, message, "Contactar a thayspostres por WhatsApp");
    });
  }

  function applySocialLinks(scope) {
    const root = scope || document;
    const config = getConfig();
    const facebookLinks = root.querySelectorAll("[data-social='facebook']");
    const instagramLinks = root.querySelectorAll("[data-social='instagram']");

    facebookLinks.forEach(function (link) {
      if (config.contact && config.contact.facebookUrl) {
        link.href = config.contact.facebookUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });

    instagramLinks.forEach(function (link) {
      if (config.contact && config.contact.instagramUrl) {
        link.href = config.contact.instagramUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
        link.classList.add("is-disabled");
      }
    });
  }

  function setBrandText(scope) {
    const root = scope || document;
    const config = getConfig();

    root.querySelectorAll("[data-brand-field]").forEach(function (element) {
      const key = element.getAttribute("data-brand-field");
      const value = config.brand && config.brand[key] ? config.brand[key] : "";
      if (value) {
        element.textContent = value;
      }
    });

    root.querySelectorAll("[data-contact-field]").forEach(function (element) {
      const key = element.getAttribute("data-contact-field");
      const value = config.contact && config.contact[key] ? config.contact[key] : "";
      if (value) {
        element.textContent = value;
      }
    });

    root.querySelectorAll("[data-message-field]").forEach(function (element) {
      const key = element.getAttribute("data-message-field");
      const value = config.messages && config.messages[key] ? config.messages[key] : "";
      if (value) {
        element.textContent = value;
      }
    });
  }

  function validateFormValue(value, minLength) {
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (!trimmed) {
      return false;
    }
    if (minLength && trimmed.length < minLength) {
      return false;
    }
    return true;
  }

  function initWhatsAppForms(scope) {
    const root = scope || document;
    const forms = root.querySelectorAll("[data-whatsapp-form]");

    forms.forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = form.querySelector("[name='nombre']");
        const productInput = form.querySelector("[name='producto']");
        const dateInput = form.querySelector("[name='fecha']");
        const quantityInput = form.querySelector("[name='cantidad']");
        const detailsInput = form.querySelector("[name='detalle']");
        const errorBox = form.querySelector("[data-form-error]");

        const errors = [];

        if (nameInput && !validateFormValue(nameInput.value, 2)) {
          errors.push("Escribe tu nombre o referencia de contacto.");
        }

        if (detailsInput && !validateFormValue(detailsInput.value, 12)) {
          errors.push("Agrega una idea o detalle de al menos 12 caracteres.");
        }

        if (errorBox) {
          errorBox.textContent = errors.join(" ");
          errorBox.classList.toggle("is-visible", errors.length > 0);
        }

        if (errors.length > 0) {
          return;
        }

        const product = productInput && productInput.value ? productInput.value.trim() : "Pedido personalizado";
        const date = dateInput && dateInput.value ? dateInput.value.trim() : "[fecha por confirmar]";
        const quantity = quantityInput && quantityInput.value ? quantityInput.value.trim() : "[cantidad por confirmar]";
        const details = detailsInput && detailsInput.value ? detailsInput.value.trim() : "[detalle por confirmar]";
        const name = nameInput && nameInput.value ? nameInput.value.trim() : "[nombre por confirmar]";

        const message = [
          "Hola, vengo del sitio web de thayspostres.",
          "Me gustaría consultar un pedido.",
          "Nombre: " + name,
          "Producto o idea: " + product,
          "Fecha: " + date,
          "Cantidad: " + quantity,
          "Detalle: " + details,
          "Entiendo que precio, disponibilidad y personalización se confirman por mensaje."
        ].join("\n");

        window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      });
    });
  }

  window.ThaysPostresWhatsApp = {
    normalizePhoneNumber: normalizePhoneNumber,
    buildMessage: buildMessage,
    buildWhatsAppUrl: buildWhatsAppUrl,
    setLinkAttributes: setLinkAttributes,
    applyGlobalWhatsAppLinks: applyGlobalWhatsAppLinks,
    applySocialLinks: applySocialLinks,
    setBrandText: setBrandText,
    initWhatsAppForms: initWhatsAppForms
  };
})();

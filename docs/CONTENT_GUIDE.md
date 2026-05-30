# Guía de contenido para thayspostres

Esta guía explica cómo mantener el sitio sin inventar datos operativos ni publicar información no confirmada.

## Tono de marca

El tono recomendado es:

- Dulce.
- Cercano.
- Claro.
- Profesional.
- Sin exageraciones.
- Sin prometer disponibilidad.
- Sin precios no confirmados.
- Sin horarios no confirmados.

Ejemplo seguro:

> Cuéntanos tu idea y confirmamos disponibilidad, precio y detalles por WhatsApp.

Ejemplo no seguro:

> Entregamos todos los días a cualquier zona con precio fijo.

## Datos que no deben inventarse

No publiques como reales:

- Teléfono definitivo.
- Dirección exacta.
- Horarios.
- Precios.
- Promociones.
- Métodos de pago.
- Costos de envío.
- Cobertura exacta de delivery.
- Tiempos mínimos garantizados.
- Testimonios.
- Historia de la marca.
- Años de experiencia.
- Nombre de propietaria o equipo.
- Certificaciones.

Cuando un dato no esté confirmado, usa:

```text
[SUPUESTO A VALIDAR]
```

Cuando un producto sea de demostración, usa:

```text
[SUPUESTO]
```

## Cómo editar datos de marca

Archivo:

```text
assets/js/config.js
```

Campos principales:

- `brand.name`
- `brand.shortDescription`
- `brand.locationApprox`
- `contact.whatsappDisplay`
- `contact.whatsappNumber`
- `contact.instagramReference`
- `contact.instagramUrl`
- `contact.facebookUrl`
- `messages.general`
- `messages.product`
- `messages.customOrder`

## Cómo agregar productos

Archivo:

```text
assets/js/data-products.js
```

Cada producto debe conservar:

- `id`
- `name`
- `category`
- `categoryLabel`
- `description`
- `image`
- `tags`
- `isAssumption`
- `featured`
- `whatsappMessage`

Reglas:

1. Usa nombres claros.
2. Evita precios no confirmados.
3. Marca productos de ejemplo con `[SUPUESTO]`.
4. Agrega una imagen local en `assets/img/products/`.
5. Usa mensajes de WhatsApp que pidan disponibilidad y detalles, no que confirmen venta.
6. Mantén el `id` en minúsculas y sin espacios.

## Cómo reemplazar placeholders

Las imágenes actuales son SVG locales de demostración.

Carpetas:

```text
assets/img/products/
assets/img/gallery/
assets/img/brand/
```

Recomendaciones:

- Usa fotos propias o autorizadas.
- Prefiere nombres descriptivos, por ejemplo `pastel-flores-rosa.webp`.
- Agrega `alt` descriptivo en HTML cuando la imagen esté escrita manualmente.
- En productos renderizados por JS, revisa que el nombre del producto describa correctamente la imagen.
- Optimiza peso de imágenes antes de subir a producción.

## Cómo validar información antes de publicar

Antes de retirar `[SUPUESTO A VALIDAR]`, confirma el dato con la marca:

- Número de WhatsApp.
- URL final de Instagram.
- Página oficial de Facebook.
- Ubicación o zona de atención.
- Horarios.
- Políticas de pedidos.
- Tiempos de anticipación.
- Entrega o recolección.
- Métodos de pago.
- Precios o rangos.

## SEO de contenido

Cada página ya tiene estructura base de SEO. Antes de producción:

1. Cambia `https://example.com/thayspostres` por el dominio real.
2. Ajusta `sitemap.xml`.
3. Revisa títulos y descripciones.
4. No agregues precios ni horarios no confirmados en metadatos.
5. No agregues una dirección exacta sin permiso.

## Recomendación editorial

Mantén el catálogo como inspiración y usa WhatsApp para confirmar condiciones reales. Esto protege a la marca de expectativas incorrectas y evita publicar información operativa falsa.

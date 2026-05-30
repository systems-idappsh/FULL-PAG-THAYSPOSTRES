# thayspostres

Proyecto web estático profesional para `thayspostres`, una marca local de repostería y postres personalizados. La entrega está construida con HTML5, CSS3 y JavaScript vanilla, sin frameworks, sin backend y sin base de datos en esta fase.

## Estado de la entrega

- Tipo: sitio multipágina estático.
- Stack: HTML5, CSS3 modular y JavaScript vanilla modular.
- Backend: no incluido en esta fase.
- Base de datos: no incluida en esta fase.
- Catálogo: renderizado desde `assets/js/data-products.js`.
- Configuración: centralizada en `assets/js/config.js`.
- WhatsApp: configurable y con mensajes automáticos.
- Imágenes: placeholders SVG locales, sin imágenes externas con copyright.
- Datos no confirmados: marcados como `[SUPUESTO A VALIDAR]`.
- Productos de demostración: marcados como `[SUPUESTO]`.

## Estructura

```text
thayspostres/
├── index.html
├── catalogo.html
├── pedidos.html
├── galeria.html
├── contacto.html
├── faq.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── README.md
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── pages.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── config.js
│   │   ├── data-products.js
│   │   ├── whatsapp.js
│   │   ├── ui.js
│   │   ├── catalog.js
│   │   └── main.js
│   └── img/
│       ├── brand/
│       ├── products/
│       ├── gallery/
│       └── placeholders/
└── docs/
    ├── CONTENT_GUIDE.md
    └── FUTURE_PHASES.md
```

## Cómo ejecutar

### Opción 1: abrir directo

Abre `index.html` en tu navegador.

### Opción 2: servidor local recomendado

Desde la carpeta del proyecto:

```bash
python -m http.server 8080
```

Luego abre:

```text
http://localhost:8080
```

## Cómo cambiar WhatsApp

Edita `assets/js/config.js`:

```javascript
contact: {
  whatsappDisplay: "+64 21 610 757 [SUPUESTO A VALIDAR]",
  whatsappNumber: "+64 21 610 757",
  whatsappIsValidated: false
}
```

Cuando el número sea real:

1. Cambia `whatsappNumber`.
2. Cambia `whatsappDisplay`.
3. Cambia `whatsappIsValidated` a `true`.
4. Retira `[SUPUESTO A VALIDAR]` sólo si el dato está confirmado.

## Cómo cambiar redes sociales

Edita `assets/js/config.js`:

```javascript
contact: {
  instagramReference: "thayspostres?igshid=OGQ5ZDc2ODk2ZA== [SUPUESTO A VALIDAR]",
  instagramUrl: "",
  facebookUrl: "https://www.facebook.com/profile.php?id=100091986630496"
}
```

Instagram queda sin enlace final porque no se proporcionó una URL completa validada. Cuando exista, coloca la URL completa en `instagramUrl`.

## Cómo agregar productos

Edita `assets/js/data-products.js` y agrega un objeto con esta estructura:

```javascript
{
  id: "nombre-unico",
  name: "Producto [SUPUESTO]",
  category: "categoria",
  categoryLabel: "Categoría",
  description: "Descripción segura sin precios ni promesas no validadas.",
  image: "assets/img/products/producto.svg",
  tags: ["Etiqueta", "[SUPUESTO]"],
  isAssumption: true,
  featured: false,
  whatsappMessage: "Hola, vengo del sitio web de thayspostres. Me interesa consultar sobre: Producto. ¿Me puedes compartir disponibilidad y detalles?"
}
```

No agregues precios, horarios, promociones, métodos de pago, costos de envío ni tiempos garantizados si no están confirmados.

## SEO

Cada página incluye:

- `title` único.
- `meta description`.
- `canonical` preparado con `https://example.com/thayspostres`.
- Open Graph básico.
- Un solo `h1`.
- Enlaces internos.
- Textos alternativos en imágenes.
- `robots.txt`.
- `sitemap.xml`.
- `site.webmanifest`.

Antes de publicar, reemplaza `https://example.com/thayspostres` por el dominio real.

## Accesibilidad

La entrega incluye:

- HTML semántico.
- Menú con `aria-expanded`.
- Botón de salto al contenido.
- Textos alternativos.
- Labels en formularios.
- Estados `focus-visible`.
- Acordeón FAQ accesible.
- Respeto a `prefers-reduced-motion`.

## Pruebas manuales recomendadas

1. Abrir `index.html` y navegar por todas las páginas.
2. Revisar el menú móvil en 320px, 375px, 768px y 1024px.
3. Abrir `catalogo.html`, filtrar por categoría y buscar productos.
4. Clic en cada botón de WhatsApp y verificar que el mensaje se codifica correctamente.
5. Abrir `pedidos.html`, enviar formulario vacío y validar mensajes de error.
6. Completar el formulario de pedido y revisar el mensaje generado.
7. Abrir `galeria.html` y probar filtros.
8. Abrir `faq.html` y probar acordeones.
9. Desactivar JavaScript y confirmar que el contenido base sigue visible en páginas informativas.
10. Reemplazar una imagen por una ruta rota y confirmar fallback visual.

## Checklist de publicación

- [ ] Validar número real de WhatsApp.
- [ ] Validar URL final de Instagram.
- [ ] Confirmar Facebook oficial.
- [ ] Validar ubicación exacta sólo si se desea publicarla.
- [ ] Validar horarios antes de agregarlos.
- [ ] Validar métodos de pago antes de agregarlos.
- [ ] Validar políticas de anticipo y cancelación.
- [ ] Validar cobertura de delivery, si aplica.
- [ ] Reemplazar placeholders por fotos reales autorizadas.
- [ ] Reemplazar dominio `example.com`.
- [ ] Revisar textos legales o políticas si el sitio pasa a recibir pedidos estructurados.

## Fases futuras

Consulta `docs/FUTURE_PHASES.md` para una ruta segura hacia PHP, MySQL, panel administrativo, catálogo editable y pedidos estructurados.

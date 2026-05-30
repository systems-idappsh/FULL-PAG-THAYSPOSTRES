# Fases futuras para thayspostres

La fase actual es un sitio estático profesional con HTML5, CSS3 y JavaScript vanilla. No incluye backend, base de datos, login, panel administrativo, pasarela de pago ni carrito.

## Fase actual

Incluye:

- Páginas estáticas.
- Catálogo desde archivo JavaScript local.
- Configuración centralizada.
- WhatsApp configurable.
- Galería con placeholders locales.
- SEO básico.
- Accesibilidad básica.
- Documentación.

No incluye:

- PHP funcional.
- MySQL.
- Panel administrativo.
- Login.
- Carrito.
- Pagos.
- Inventario.
- Automatización real de pedidos.

## Fase 2: PHP para componentes reutilizables

Objetivo: reducir duplicación entre páginas.

Posibles cambios:

- Convertir HTML a PHP.
- Crear includes para header, footer, navegación y scripts.
- Mantener contenido seguro.
- Mantener el sitio sin base de datos si todavía no se necesita catálogo editable.

Estructura sugerida:

```text
public/
├── index.php
├── catalogo.php
├── pedidos.php
├── galeria.php
├── contacto.php
├── faq.php
├── assets/
└── includes/
    ├── header.php
    ├── footer.php
    └── nav.php
```

## Fase 3: MySQL para catálogo editable

Objetivo: administrar productos reales sin editar JavaScript.

Tablas sugeridas:

- `products`
- `categories`
- `product_images`
- `settings`

Reglas de seguridad:

- PDO con prepared statements.
- Charset `utf8mb4`.
- Validación de campos.
- Escape de salida.
- Manejo de errores sin exponer detalles.
- Panel protegido si hay administración.

## Fase 4: Panel administrativo

Objetivo: que la marca pueda editar catálogo, fotos y datos de contacto.

Módulos posibles:

- Login.
- Dashboard.
- CRUD de productos.
- CRUD de categorías.
- Configuración de redes y WhatsApp.
- Carga de imágenes.
- Gestión de preguntas frecuentes.

Seguridad mínima:

- `password_hash`.
- `password_verify`.
- Sesiones seguras.
- Regenerar ID de sesión al iniciar sesión.
- CSRF en formularios.
- Validación de archivos subidos.
- Restricción de tipos de imagen.
- Logs internos.

## Fase 5: Pedidos estructurados

Objetivo: capturar solicitudes desde un formulario interno.

No debe implementarse sin validar primero:

- Datos que se necesitan del cliente.
- Políticas de privacidad.
- Tiempo real de atención.
- Notificaciones por correo o WhatsApp.
- Condiciones de anticipo.
- Confirmación manual o automática.
- Estado del pedido.

## Fase 6: Tienda o pagos

Sólo recomendable si la operación lo necesita y si se validan:

- Precios reales.
- Inventario o disponibilidad.
- Métodos de pago.
- Impuestos o comprobantes.
- Políticas de cancelación.
- Zonas de entrega.
- Soporte al cliente.
- Seguridad y cumplimiento aplicable.

## Ruta recomendada

1. Publicar fase estática.
2. Validar contenido real.
3. Medir consultas por WhatsApp.
4. Agregar fotografías reales.
5. Migrar a PHP sólo si la edición manual se vuelve incómoda.
6. Agregar MySQL sólo si el catálogo cambia frecuentemente.
7. Considerar panel administrativo cuando haya operación estable.
8. Considerar pagos sólo después de validar precios, políticas y logística.

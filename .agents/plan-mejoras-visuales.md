# 🎨 Plan de Implementación — Mejoras Visuales y Correcciones para ADN Limpieza

> **Proyecto:** ADN Limpieza — Web de Negocio de Limpieza Profesional  
> **Stack:** Next.js + Tailwind CSS v4 + shadcn/ui  
> **Fecha:** 6 de Marzo, 2026  
> **Objetivo:** Corregir errores visuales, reducir tamaños excesivos, mejorar estética y pulir el modo oscuro para dejar la web lista para producción.

---

## 📋 Índice de Fases

| Fase | Descripción                                             | Prioridad  |
| ---- | ------------------------------------------------------- | ---------- |
| 1    | Reducción de Tamaños Excesivos (Tipografía y Espaciado) | 🔴 Crítica |
| 2    | Correcciones de Modo Oscuro                             | 🔴 Crítica |
| 3    | Mejora de Botones (eliminar aspecto plano)              | 🟡 Alta    |
| 4    | Rediseño de Tarjetas de Producto                        | 🟡 Alta    |
| 5    | Mejora de Tarjetas Bento Grid (Features)                | 🟡 Alta    |
| 6    | Pulido del Header                                       | 🟢 Media   |
| 7    | Pulido del Footer                                       | 🟢 Media   |
| 8    | Mejora de Página de Detalle de Producto                 | 🟢 Media   |
| 9    | Mejora de Página Sobre Nosotros                         | 🟢 Media   |
| 10   | Micro-animaciones y Efectos de Interacción              | 🔵 Baja    |
| 11   | Floating WhatsApp y UX General                          | 🔵 Baja    |

---

## 🔴 FASE 1: Reducción de Tamaños Excesivos

### Problema

Los títulos, subtítulos y botones son **excesivamente grandes**, lo que hace que la web se sienta tosca e inmadura. Los `display-2xl` llegan a `text-7xl` en desktop, y los botones usan `h-14` (56px de altura), que es demasiado para un negocio de limpieza.

### Archivos a modificar

- `app/globals.css` (clases de tipografía)
- `app/(web)/page.tsx` (Home)
- `app/(web)/productos/page.tsx`
- `app/(web)/sobre-nosotros/page.tsx`

### Cambios específicos

#### 1.1 — Reducir la escala tipográfica en `globals.css`

**Archivo:** `app/globals.css` (líneas ~200-256)

```css
/* ANTES */
.display-2xl {
  @apply text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1];
}
.display-xl {
  @apply text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1];
}
.display-lg {
  @apply text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight;
}
.heading-xl {
  @apply text-2xl sm:text-3xl font-semibold leading-snug tracking-tight;
}
.heading-lg {
  @apply text-xl sm:text-2xl font-semibold leading-snug;
}
.heading-md {
  @apply text-lg sm:text-xl font-semibold leading-snug;
}
.body-lg {
  @apply text-lg sm:text-xl leading-relaxed;
}

/* DESPUÉS */
.display-2xl {
  @apply text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1];
}
.display-xl {
  @apply text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1];
}
.display-lg {
  @apply text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight;
}
.heading-xl {
  @apply text-xl sm:text-2xl font-semibold leading-snug tracking-tight;
}
.heading-lg {
  @apply text-lg sm:text-xl font-semibold leading-snug;
}
.heading-md {
  @apply text-base sm:text-lg font-semibold leading-snug;
}
.body-lg {
  @apply text-base sm:text-lg leading-relaxed;
}
```

> **Razonamiento:** Bajar un escalón completo cada clase tipográfica. El hero pasa de 7xl → 3.5rem (~56px) en desktop, que es impactante pero no abrumador.

#### 1.2 — Reducir tamaño de botones CTA del Hero

**Archivo:** `app/(web)/page.tsx` (líneas ~93-108)

```tsx
/* ANTES */
className =
  "h-14 px-8 text-base rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 group";
// y
className =
  "h-14 px-8 text-base rounded-xl border-2 hover:border-primary hover:text-primary transition-all duration-300";

/* DESPUÉS */
className =
  "h-12 px-6 text-sm rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 group";
// y
className =
  "h-12 px-6 text-sm rounded-xl border-2 hover:border-primary hover:text-primary transition-all duration-300";
```

#### 1.3 — Reducir tamaño de stats del hero

**Archivo:** `app/(web)/page.tsx` (línea ~119)

```tsx
/* ANTES */
<div className="text-3xl font-bold text-primary">{stat.value}</div>

/* DESPUÉS */
<div className="text-2xl font-bold text-primary">{stat.value}</div>
```

#### 1.4 — Reducir section-padding (espaciado vertical de secciones)

**Archivo:** `app/globals.css` (líneas ~699-705)

```css
/* ANTES */
.section-padding {
  @apply py-16 sm:py-20 lg:py-24;
}
.section-padding-lg {
  @apply py-20 sm:py-28 lg:py-32;
}

/* DESPUÉS */
.section-padding {
  @apply py-12 sm:py-16 lg:py-20;
}
.section-padding-lg {
  @apply py-16 sm:py-20 lg:py-24;
}
```

#### 1.5 — Reducir el hero min-height

**Archivo:** `app/(web)/page.tsx` (línea ~51)

```tsx
/* ANTES */
<section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">

/* DESPUÉS */
<section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20">
```

#### 1.6 — Reducir padding en tarjetas bento

**Archivo:** `app/(web)/page.tsx` (líneas ~185 y ~217)

```tsx
/* ANTES — tarjeta destacada */
"lg:col-span-2 p-8 rounded-3xl relative overflow-hidden",

/* DESPUÉS */
"lg:col-span-2 p-6 rounded-2xl relative overflow-hidden",

/* ANTES — tarjetas regulares */
"p-8 rounded-3xl",

/* DESPUÉS */
"p-6 rounded-2xl",
```

#### 1.7 — Ajustar el tamaño del HeroImage

**Archivo:** `components/hero-image.tsx` (línea ~67)

```tsx
/* ANTES */
"relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]",

/* DESPUÉS */
"relative w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[480px]",
```

---

## 🔴 FASE 2: Correcciones de Modo Oscuro

### Problema

Hay **múltiples elementos rotos en dark mode**: el mapa de Google aparece como un bloque blanco brillante, el widget de reseñas Elfsight puede tener texto oscuro sobre fondo oscuro, la sección CTA tiene problemas de contraste, y tarjetas/iconos no se adaptan correctamente.

### 2.1 — Mapa de Google con filtro dark mode

**Archivo:** `components/footer.tsx` (líneas ~163-172)

Envolver el iframe del mapa con una clase que aplique un filtro CSS en dark mode:

```tsx
/* ANTES */
<iframe
  // ... props del iframe
  className="grayscale hover:grayscale-0 transition-all duration-700"
/>

/* DESPUÉS */
<iframe
  // ... props del iframe
  className="grayscale hover:grayscale-0 transition-all duration-700 dark:brightness-75 dark:contrast-125 dark:invert dark:hue-rotate-180"
/>
```

Aplicar lo mismo en `app/(web)/sobre-nosotros/page.tsx` (línea ~373):

```tsx
className =
  "grayscale hover:grayscale-0 transition-all duration-700 dark:brightness-75 dark:contrast-125 dark:invert dark:hue-rotate-180";
```

### 2.2 — Footer: fondo más visible en dark mode

**Archivo:** `components/footer.tsx` (línea ~39)

```tsx
/* ANTES */
<footer className="relative bg-muted/30 border-t border-border/50">

/* DESPUÉS */
<footer className="relative bg-muted/30 dark:bg-card/50 border-t border-border/50">
```

### 2.3 — Header: glass effect en dark mode

**Archivo:** `components/header.tsx` (línea ~81)

```tsx
/* ANTES */
isScrolled ? "bg-muted/50" : "bg-background/50 backdrop-blur-sm";

/* DESPUÉS */
isScrolled
  ? "bg-muted/50 dark:bg-muted/30"
  : "bg-background/50 dark:bg-background/30 backdrop-blur-sm";
```

### 2.4 — Sección CTA: mejorar contraste texto en dark mode

**Archivo:** `app/(web)/page.tsx` (líneas ~258-263)

El problema es que en dark mode, `primary-foreground` es oscuro (`oklch(0.12 0.02 260)`), lo cual es difícil de leer sobre el gradient naranja/azul.

**Solución en `globals.css`:** Cambiar `--primary-foreground` en dark mode a blanco:

```css
/* ANTES (en .dark) */
--primary: oklch(0.75 0.18 55);
--primary-foreground: oklch(0.12 0.02 260);

/* DESPUÉS */
--primary: oklch(0.75 0.18 55);
--primary-foreground: oklch(0.99 0 0);
```

> **⚠️ IMPACTO:** Este cambio afecta **todos los botones primary** en dark mode. El texto de los botones primary cambiará de oscuro a blanco. Verificar que todos los botones primary siguen viéndose bien. Los botones con fondo naranja se verán mejor con texto blanco en dark mode.

### 2.5 — Tarjetas de producto en dark mode: mejorar bordes y sombras

**Archivo:** `components/product-grid.tsx` (líneas ~30-35)

```tsx
/* ANTES */
"border border-border/40 hover:border-primary/40",
"shadow-sm hover:shadow-md",

/* DESPUÉS */
"border border-border/50 dark:border-border/60 hover:border-primary/40",
"shadow-soft hover:shadow-soft-lg dark:shadow-none dark:hover:shadow-[0_0_20px_-5px_rgba(255,165,0,0.15)]",
```

### 2.6 — Tarjetas de valores y timeline en dark mode

**Archivo:** `app/(web)/sobre-nosotros/page.tsx`

En las tarjetas de valores (línea ~258-264):

```tsx
/* ANTES */
"bg-card border border-border/50",
"shadow-soft hover:shadow-soft-lg",

/* DESPUÉS */
"bg-card dark:bg-card/80 border border-border/50",
"shadow-soft hover:shadow-soft-lg dark:shadow-none",
```

En las tarjetas del timeline (línea ~208-211):

```tsx
/* ANTES */
"p-6 rounded-2xl bg-card border border-border/50 shadow-soft",
"hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300",

/* DESPUÉS */
"p-6 rounded-2xl bg-card dark:bg-card/80 border border-border/50 shadow-soft dark:shadow-none",
"hover:shadow-soft-lg dark:hover:shadow-[0_0_20px_-5px_rgba(255,165,0,0.1)] hover:-translate-y-1 transition-all duration-300",
```

---

## 🟡 FASE 3: Mejora de Botones (eliminar aspecto plano)

### Problema

Los botones se sienten planos, sin profundidad ni retroalimentación al hacer clic. Les falta: sombra de profundidad, efecto de hover más rico, micro-animación al hacer clic (scale-down).

### 3.1 — Mejorar el componente Button base (shadcn)

**Archivo:** `components/ui/button.tsx`

Buscar la variante `default` en el componente Button y añadir:

```tsx
/* VARIANTE default — ANTES */
default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",

/* VARIANTE default — DESPUÉS */
default: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200",
```

```tsx
/* VARIANTE outline — ANTES */
outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",

/* VARIANTE outline — DESPUÉS */
outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-200",
```

```tsx
/* VARIANTE secondary — ANTES */
secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",

/* VARIANTE secondary — DESPUÉS */
secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200",
```

### 3.2 — Sección CTA: botón "Consultar Ahora" más vivo

**Archivo:** `app/(web)/page.tsx` (líneas ~265-277)

```tsx
/* ANTES */
className={cn(
  "h-14 px-8 text-base rounded-xl",
  "bg-white text-primary border-0",
  "hover:bg-white/90",
  "shadow-soft-xl hover:shadow-glow-lg",
  "transition-all duration-300 hover:scale-105"
)}

/* DESPUÉS */
className={cn(
  "h-12 px-6 text-sm font-semibold rounded-xl",
  "bg-white text-primary border-0",
  "hover:bg-white/95",
  "shadow-lg hover:shadow-xl",
  "transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
)}
```

### 3.3 — Botón WhatsApp en el footer: mejorar hover

**Archivo:** `components/footer.tsx` (líneas ~71-76)

```tsx
/* ANTES */
className = "shadow-soft hover:shadow-glow transition-all duration-300 mb-8";

/* DESPUÉS */
className =
  "shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mb-8";
```

---

## 🟡 FASE 4: Rediseño de Tarjetas de Producto

### Problema

Las tarjetas de producto son cajas muy básicas con grey boxes. Les falta: elevación, hover effects más ricos, y la transición se siente genérica. En mobile son demasiado planas.

### Archivos a modificar

- `components/product-grid.tsx`

### 4.1 — Mejorar el card component de productos

**Archivo:** `components/product-grid.tsx`

```tsx
/* ANTES — artículo completo (líneas ~28-86) */
<article
  key={product._id}
  className={cn(
    "group flex flex-col h-full bg-card rounded-xl overflow-hidden",
    "border border-border/40 hover:border-primary/40",
    "shadow-sm hover:shadow-md",
    "transition-all duration-300",
    "animate-fade-up"
  )}
  style={{ animationDelay: `${index * 50}ms` }}
>

/* DESPUÉS */
<article
  key={product._id}
  className={cn(
    "group flex flex-col h-full bg-card rounded-2xl overflow-hidden",
    "border border-border/40 hover:border-primary/30",
    "shadow-soft hover:shadow-soft-lg",
    "transition-all duration-300 hover:-translate-y-1",
    "animate-fade-up"
  )}
  style={{ animationDelay: `${index * 50}ms` }}
>
```

### 4.2 — Mejorar la imagen del producto con overlay más elegante

```tsx
/* ANTES (línea ~51) */
<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

/* DESPUÉS */
<div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
```

### 4.3 — Mejorar la sección de contenido del card

```tsx
/* ANTES (línea ~73) */
<div className="flex flex-col flex-1 p-3.5">

/* DESPUÉS */
<div className="flex flex-col flex-1 p-4">
```

### 4.4 — Agregar un CTA sutil al card

Después del `<p>` de descripción (línea ~82), agregar:

```tsx
<div className="mt-auto pt-3">
  <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1">
    Ver detalle
    <ArrowRight className="w-3 h-3" />
  </span>
</div>
```

> **Nota:** requiere importar `ArrowRight` de `lucide-react`.

---

## 🟡 FASE 5: Mejora de Tarjetas Bento Grid (Features)

### Problema

La tarjeta "Productos de Calidad" ocupa 2 columnas y tiene un fondo gradient naranja que se siente tosco. Las tarjetas menores son muy simples. El diseño bento grid no tiene la elegancia esperada.

### Archivos a modificar

- `app/(web)/page.tsx`

### 5.1 — Tarjeta principal: reducir intensidad del gradient

**Archivo:** `app/(web)/page.tsx` (líneas ~184-209)

```tsx
/* ANTES */
"bg-gradient-to-br from-primary to-primary/80",

/* DESPUÉS */
"bg-gradient-to-br from-primary/95 to-primary/75",
```

Y reducir el tamaño del ícono del logo:

```tsx
/* ANTES */
<div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 relative overflow-hidden">

/* DESPUÉS */
<div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5 relative overflow-hidden">
```

### 5.2 — Tarjetas regulares: agregar shine effect

```tsx
/* ANTES (línea ~217) */
("p-6 rounded-2xl",
  "bg-card border border-border/50",
  "shadow-soft hover:shadow-soft-lg",
  "transition-all duration-500 hover:-translate-y-1",
  "group");

/* DESPUÉS */
("p-6 rounded-2xl",
  "bg-card border border-border/50",
  "shadow-soft hover:shadow-soft-lg",
  "transition-all duration-300 hover:-translate-y-1",
  "group shine");
```

### 5.3 — Reducir tamaño de iconos en tarjetas

```tsx
/* ANTES */
<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ...">
  <Icon className="w-7 h-7 text-primary" />
</div>

/* DESPUÉS */
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 ...">
  <Icon className="w-6 h-6 text-primary" />
</div>
```

---

## 🟢 FASE 6: Pulido del Header

### 6.1 — Reducir padding del header

**Archivo:** `components/header.tsx` (líneas ~36-40)

```tsx
/* ANTES */
isScrolled
  ? "py-3 glass border-b border-border/50 shadow-soft"
  : "py-4 bg-transparent";

/* DESPUÉS */
isScrolled
  ? "py-2 glass border-b border-border/50 shadow-soft"
  : "py-3 bg-transparent";
```

### 6.2 — Reducir tamaño del logo

```tsx
/* ANTES (línea ~51) */
"relative w-12 h-12 rounded-full overflow-hidden...";

/* DESPUÉS */
"relative w-10 h-10 rounded-full overflow-hidden...";
```

### 6.3 — Navegación pill: reducir tamaño

```tsx
/* ANTES (línea ~90) */
"relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300",

/* DESPUÉS */
"relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
```

### 6.4 — Botón de contactar: reducirlo

```tsx
/* ANTES (líneas ~112-117) */
<WhatsAppButton
  size="sm"
  className="shadow-soft hover:shadow-glow transition-shadow duration-300"
>

/* DESPUÉS */
<WhatsAppButton
  size="sm"
  className="shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
>
```

---

## 🟢 FASE 7: Pulido del Footer

### 7.1 — Reducir el padding general

**Archivo:** `components/footer.tsx` (línea ~41)

```tsx
/* ANTES */
<div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">

/* DESPUÉS */
<div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
```

### 7.2 — Reducir tamaño del logo en footer

```tsx
/* ANTES (línea ~48) */
"relative w-12 h-12 rounded-full overflow-hidden...";

/* DESPUÉS */
"relative w-10 h-10 rounded-full overflow-hidden...";
```

### 7.3 — Mejorar logo Syntrax: reducir tamaño

**Archivo:** `components/footer.tsx` (línea ~198)

```tsx
/* ANTES */
<div className="relative w-42 h-16">

/* DESPUÉS */
<div className="relative w-32 h-12">
```

### 7.4 — Reducir tamaño de iconos de contacto

```tsx
/* ANTES (línea ~110) */
<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 ...">
  <Icon className="w-5 h-5 text-primary" />
</div>

/* DESPUÉS */
<div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ...">
  <Icon className="w-4 h-4 text-primary" />
</div>
```

### 7.5 — Social links: reducir tamaño

```tsx
/* ANTES (línea ~88) */
"w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",

/* DESPUÉS */
"w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
```

---

## 🟢 FASE 8: Mejora de Página de Detalle de Producto

### Archivos a modificar

- `app/(web)/productos/[id]/page.tsx`

### 8.1 — Mejorar el layout de la página

**Archivo:** `app/(web)/productos/[id]/page.tsx`

```tsx
/* ANTES (línea ~67) */
<div className="lg:col-span-5 aspect-square relative overflow-hidden rounded-2xl bg-muted shadow-sm">

/* DESPUÉS */
<div className="lg:col-span-5 aspect-square relative overflow-hidden rounded-2xl bg-muted/50 shadow-soft border border-border/30">
```

### 8.2 — Reducir título del producto

```tsx
/* ANTES (línea ~101) */
<h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance tracking-tight text-foreground/90">

/* DESPUÉS */
<h1 className="text-3xl lg:text-4xl font-bold mb-5 text-balance tracking-tight text-foreground">
```

### 8.3 — Mejorar la tarjeta de características

```tsx
/* ANTES (línea ~133) */
<Card className="mt-12 mb-8 border-none shadow-sm bg-muted/30">

/* DESPUÉS */
<Card className="mt-10 mb-8 border border-border/30 shadow-soft bg-muted/20 dark:bg-card/50 rounded-2xl">
```

### 8.4 — Tarjetas de productos relacionados: consistencia con catálogo

```tsx
/* ANTES (línea ~176) */
<Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">

/* DESPUÉS */
<Card className="overflow-hidden shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 h-full border-border/40 hover:border-primary/30 rounded-2xl">
```

### 8.5 — Título de productos relacionados: reducir

```tsx
/* ANTES (línea ~163) */
<h2 className="text-3xl font-bold mb-8">Productos Relacionados</h2>

/* DESPUÉS */
<h2 className="text-2xl font-semibold mb-6">Productos Relacionados</h2>
```

---

## 🟢 FASE 9: Mejora de Página Sobre Nosotros

### 9.1 — Reducir tamaños en la sección de historia

**Archivo:** `app/(web)/sobre-nosotros/page.tsx`

Los títulos ya se redujeron con la Fase 1. Verificar que se ven bien.

### 9.2 — Tarjetas de valores: agregar hover con shine

```tsx
/* ANTES (líneas ~258-264) */
"p-8 rounded-3xl text-center",
"bg-card border border-border/50",

/* DESPUÉS */
"p-6 rounded-2xl text-center",
"bg-card dark:bg-card/80 border border-border/50 shine",
```

### 9.3 — Reducir iconos de valores

```tsx
/* ANTES (líneas ~266-268) */
<div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ...">
  <Icon className="w-8 h-8 text-primary" />
</div>

/* DESPUÉS */
<div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-5 ...">
  <Icon className="w-7 h-7 text-primary" />
</div>
```

### 9.4 — Tarjetas de contacto: reducir

```tsx
/* ANTES (línea ~331) */
"flex items-start gap-4 p-6 rounded-2xl",

/* DESPUÉS */
"flex items-start gap-4 p-5 rounded-xl",
```

### 9.5 — Reducir tamaño de iconos de contacto en about

```tsx
/* ANTES (línea ~337) */
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 ...">
  <Icon className="w-6 h-6 text-primary" />
</div>

/* DESPUÉS */
<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ...">
  <Icon className="w-5 h-5 text-primary" />
</div>
```

---

## 🔵 FASE 10: Micro-animaciones y Polish

### 10.1 — Agregar animación de shake suave al WhatsApp flotante

**Archivo:** `components/floating-whatsapp.tsx`

Agregar una animación sutil de "attention grab" que se dispare periódicamente:

```css
/* En globals.css, agregar: */
@keyframes wiggle {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}
```

```tsx
/* Agregar al botón flotante className */
"animate-[wiggle_2s_ease-in-out_infinite_3s]";
```

### 10.2 — Mejorar transiciones de la navegación pill

**Archivo:** `components/header.tsx`

Agregar `motion-safe:` prefix a animaciones para respetar preferencias de usuario:

```tsx
/* En el active pill (línea ~98) */
/* ANTES */
<span className="absolute inset-0 rounded-full bg-primary shadow-sm" />

/* DESPUÉS */
<span className="absolute inset-0 rounded-full bg-primary shadow-sm transition-all duration-300" />
```

### 10.3 — Scroll indicator suave en hero

**Archivo:** `app/(web)/page.tsx`

Agregar un indicador de scroll sutil al final del hero, antes de cerrar la `</section>` (después de línea ~161):

```tsx
{
  /* Scroll indicator */
}
<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
  <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1.5">
    <div className="w-1.5 h-3 rounded-full bg-foreground/30 animate-pulse" />
  </div>
</div>;
```

---

## 🔵 FASE 11: Floating WhatsApp y UX General

### 11.1 — Reducir tamaño del botón WhatsApp flotante

**Archivo:** `components/floating-whatsapp.tsx`

```tsx
/* ANTES (línea ~32) */
"px-4 py-4 rounded-full",

/* DESPUÉS */
"px-3.5 py-3.5 rounded-full",
```

### 11.2 — Reducir el icono del WhatsApp

```tsx
/* ANTES (línea ~41) */
<WhatsAppIcon className="h-6 w-6 flex-shrink-0 ..." />

/* DESPUÉS */
<WhatsAppIcon className="h-5 w-5 flex-shrink-0 ..." />
```

### 11.3 — Suavizar la animación de ping

```tsx
/* ANTES (línea ~54) */
<span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />

/* DESPUÉS */
<span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-10 pointer-events-none" />
```

---

## 🧪 Checklist de Verificación Post-Implementación

Después de completar todas las fases, verificar en el navegador:

### Modo Claro ☀️

- [ ] Hero: título y subtítulo se leen bien sin ser excesivos
- [ ] Botones: tienen profundidad (sombra), reaccionan al hover (elevation), reaccionan al click (depress)
- [ ] Tarjetas bento: tamaño proporcionado, shine effect funciona
- [ ] Tarjetas de producto: son elegantes con sombras suaves y hover lift
- [ ] CTA section: el botón blanco tiene buen contraste y animación
- [ ] Footer: tamaños reducidos, mapa integrado correctamente
- [ ] Sobre nosotros: timeline legible, valores cards con shine, contacto cards proporcionales

### Modo Oscuro 🌙

- [ ] Mapa de Google: se ve oscuro con el filtro CSS (no bloque blanco)
- [ ] Texto CTA: blanco sobre gradient naranja → legible
- [ ] Tarjetas: bordes sutiles visibles, sin sombras que no rindan en dark
- [ ] Botones primary: texto blanco sobre fondo naranja
- [ ] Header glass: se ve sutil y no opaco
- [ ] Footer: fondo diferenciado correctamente
- [ ] Elfsight reviews: verificar manualmente si se ve bien (depende del widget externo)

### Responsive 📱

- [ ] Mobile: todo cabe sin overflow, títulos no se salen
- [ ] Tablet: grid de tarjetas se reorganiza correctamente
- [ ] Desktop: layout 2 columnas del hero se ve equilibrado

---

## 📝 Notas Importantes para la IA Implementadora

1. **Orden de implementación:** Seguir las fases en orden numérico. La Fase 1 (tipografía) y Fase 2 (dark mode) son las más impactantes y deben hacerse primero.

2. **No romper el admin:** El panel admin (`app/(admin)`) usa su propio design system en `globals.css` (clases con prefijo `admin-`). **NO tocar ninguna clase admin-\***.

3. **Verificar builds:** Después de cada fase, ejecutar `pnpm run dev` y verificar que no hay errores de compilación.

4. **shadcn/ui:** El componente `Button` está en `components/ui/button.tsx`. Al modificar las variantes, verificar que el cambio no rompe otros botones de la app.

5. **Tailwind v4:** Este proyecto usa Tailwind CSS v4 con la nueva sintaxis de imports (`@import "tailwindcss"`). Las clases `@utility` y `@layer` funcionan con la nueva API.

6. **Respaldo:** Hacer commit antes de empezar las modificaciones para poder revertir si algo sale mal.

7. **Dark mode class-based:** El toggle de dark mode usa la clase `.dark` en `<html>`. Las variantes `dark:` de Tailwind están configuradas con `@custom-variant dark (&:is(.dark *))`.

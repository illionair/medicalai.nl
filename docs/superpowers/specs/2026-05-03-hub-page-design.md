# Educational Hub page (`/hub`) — Design

**Date:** 2026-05-03
**Status:** Draft, awaiting user review

## Goal

Add a new `/hub` route titled "Educational Hub" that mirrors the bento-style mockup the user shared, using existing published BlogPost data and matching site-wide visual conventions (glass panels, brand colors, framer-motion). The current site-wide `<Navbar />` and `<Footer />` are kept as-is, with one new nav link added for the hub.

## Out of scope

- Webinars (replaced by Topics-by-category section, since no webinar data exists).
- A real e-learning capture flow (the "Coming Soon" CTA links to `/subscribe`).
- New images or asset production — hero reuses `/images/hand-robot.png`; bento tiles use `BlogPost.coverImage` / `imageUrl` with a CSS-gradient fallback when missing.
- Material Symbols font integration — replaced by `lucide-react` (already a dep).

## Architecture

### File layout

```
src/app/hub/page.tsx                      ← server, fetches data, composes sections
src/components/hub/HubHero.tsx            ← client (framer-motion fade-in)
src/components/hub/FeaturedBento.tsx      ← client (hover scale)
src/components/hub/ComingSoonCard.tsx     ← server, static
src/components/hub/CategoryGrid.tsx       ← server, 2x2
src/lib/blog.ts                           ← + getCategoryCounts()
src/context/LanguageContext.tsx           ← + t.nav.hub, t.hub.*
src/components/Navbar.tsx                 ← + link to /hub
src/app/globals.css                       ← + .glass-panel, .ambient-shadow utility classes
```

The page sits inside the existing root layout, so the fixed `<Navbar />` (top) and `<Footer />` (bottom) are inherited automatically.

### Page composition

```tsx
// src/app/hub/page.tsx (server component)
export const revalidate = 60;

export default async function HubPage() {
  const [blogs, counts] = await Promise.all([
    getPublishedBlogs(),
    getCategoryCounts(),
  ]);
  const top3 = blogs.slice(0, 3);

  return (
    <main className="...">
      <HubHero />
      <FeaturedBento blogs={top3} />
      <section className="grid md:grid-cols-2 gap-8">
        <ComingSoonCard />
        <CategoryGrid counts={counts} />
      </section>
    </main>
  );
}
```

## Data flow

### `getPublishedBlogs()` — existing (unchanged)
Returns published, non-future-scheduled BlogPosts ordered `createdAt desc`. Hub slices first 3 for the bento.

### `getCategoryCounts()` — new in `src/lib/blog.ts`

```ts
export async function getCategoryCounts(): Promise<{ category: string; count: number }[]> {
  const CATEGORIES = ["Predictie", "Diagnostiek", "Methodisch", "Ethiek"];
  try {
    const rows = await prisma.blogPost.groupBy({
      by: ["category"],
      where: {
        published: true,
        isGuideline: false,
        OR: [{ scheduledFor: null }, { scheduledFor: { lte: new Date() } }],
      },
      _count: { _all: true },
    });
    const lookup = new Map(rows.map(r => [r.category, r._count._all]));
    return CATEGORIES.map(c => ({ category: c, count: lookup.get(c) ?? 0 }));
  } catch (error) {
    logBlogLoadFailure("Failed to load category counts", error);
    return CATEGORIES.map(c => ({ category: c, count: 0 }));
  }
}
```

The four categories are intentionally hardcoded (matches the existing `BlogPost.category` enum-like values used elsewhere) so the grid layout is stable even when a category has zero published posts.

### Edge cases

- **Fewer than 3 published blogs:** `FeaturedBento` renders only the slots it has. With 0 blogs, it shows a single "Nog geen publicaties" placeholder spanning the full row.
- **BlogPost without `coverImage` and `imageUrl`:** tile renders a CSS gradient fallback keyed off the category (one fixed gradient per category, no image element).
- **`getCategoryCounts` failure:** all 4 cards render with count `0`; layout never collapses.

## Components

### `HubHero` (client)

```ts
Props: none

Layout:
  <section h-[500px] rounded-3xl overflow-hidden glass-panel ambient-shadow flex items-end p-12>
    <img src="/images/hand-robot.png" absolute inset-0 object-cover opacity-90 />
    <gradient overlay white/90 → transparent />
    <motion.div glass card>
      <span eyebrow>{t.hub.eyebrow}</span>
      <h1>{t.hub.title}</h1>
      <p>{t.hub.subtitle}</p>
    </motion.div>
  </section>
```

`framer-motion`: same fade-up sequence as `<Hero />` (delays 0.1 / 0.2 / 0.3, ease `[0.16, 1, 0.3, 1]`).

### `FeaturedBento` (client)

```ts
Props: { blogs: BlogPost[] }   // expected length 0–3

Layout:
  grid md:grid-cols-12 gap-8
    blogs[0] → article col-span-8
      h-64 image + glass content panel (title, summary line-clamp-3, category badge, date)
    blogs[1..2] → div col-span-4 flex flex-col gap-8
      each: article h-32 image + small content (title, summary line-clamp-2, category badge)
```

Each tile is `<Link href={`/blog/${id}`}>` with `whileHover={{ scale: 1.01 }}`. Image source: `blog.coverImage ?? blog.imageUrl ?? null`; null → CSS gradient keyed by category.

### `ComingSoonCard` (server)

```ts
Props: none

- div linear-gradient (#f0f7ff → #e6f0fa) rounded-3xl p-10 ambient-shadow relative overflow-hidden
- decorative <GraduationCap size={120} /> top-right opacity-10
- <span> eyebrow {t.hub.coming_soon_label}
- <h2> {t.hub.elearning_title}
- <p> {t.hub.elearning_body}
- <Link href="/subscribe"> styled as pill button: {t.hub.notify_me}
```

### `CategoryGrid` (server)

```ts
Props: { counts: { category: string; count: number }[] }

Layout:
  glass-panel rounded-3xl p-10
    <h2>{t.hub.topics_title}</h2>
    <div grid grid-cols-2 gap-4>
      {counts.map(c => <CategoryTile />)}
    </div>

CategoryTile:
  <Link href={`/topics/${category}`} class="rounded-2xl p-5 hover:bg-white/50 ...">
    <Icon /> {category}
    <span>{t.hub.articles_count(count)}</span>
  </Link>
```

Icon mapping (lucide-react):
- Predictie → `TrendingUp`
- Diagnostiek → `Stethoscope`
- Methodisch → `FlaskConical`
- Ethiek → `Scale`

## Styling

Mockup-specific utility classes added once to `src/app/globals.css`:

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 0.5px solid rgba(255, 255, 255, 0.2);
}
.ambient-shadow {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.03);
}
```

Color tokens from the mockup (`primary-container`, `surface-container-lowest`, etc.) are NOT introduced. Existing site tokens (`brand-primary`, `brand-secondary`, `brand-accent`, `brand-dark`, `brand-white`, slate scale) cover all needed roles. This keeps the hub visually consistent with `/blog`, `/topics`, `/guidelines`.

No new font imports. Site typography (set globally) applies.

## i18n

New keys in `src/context/LanguageContext.tsx`:

```ts
nav: {
  ...,
  hub: "Hub" / "Hub",
}
hub: {
  eyebrow: "Knowledge Center" / "Knowledge Center",
  title: "Educational Hub" / "Educational Hub",
  subtitle:
    "Verdiep je klinische expertise met curated research, slimme inzichten en aankomende sessies."
    / "Advance your clinical expertise with curated research, intelligent insights, and upcoming seminars.",
  latest_research: "Laatste Research" / "Latest Research",
  view_all: "Bekijk archief" / "View archive",
  coming_soon_label: "Binnenkort" / "Coming Soon",
  elearning_title: "AI 101 voor Clinici" / "AI 101 for Clinicians",
  elearning_body:
    "Een uitgebreide masterclass die machine-learning toepassingen in de dagelijkse klinische praktijk demystifieert."
    / "A comprehensive masterclass demystifying machine-learning applications in daily clinical practice.",
  notify_me: "Houd mij op de hoogte" / "Notify Me",
  topics_title: "Onderwerpen" / "Topics",
  articles_count: (n: number) => `${n} artikelen` / `${n} articles`,
}
```

`articles_count` is a function (not a static string) since the existing `LanguageContext` already supports function values (verify when implementing — if it doesn't, the value becomes `${n} artikelen` and is interpolated at the call site).

## Navbar change

In `src/components/Navbar.tsx`, the `links` array becomes:

```ts
const links = [
  { href: "/", label: t.nav.publications },
  { href: "/topics", label: t.nav.topics },
  { href: "/hub", label: t.nav.hub },           // ← new, between topics and authors
  { href: "/authors", label: t.nav.authors },
  { href: "/guidelines", label: t.nav.guidelines },
  { href: "/subscribe", label: t.nav.subscribe },
  { href: "/about", label: t.nav.about },
];
```

`guidelines` was already present; the user explicitly noted they want it to remain. No removals.

## Footer

No change. Existing `<Footer />` is rendered by the root layout for all routes.

## Testing / verification

- `/hub` renders without errors when 0, 1, 2, 3, and >3 published blogs exist
- `/hub` renders when one of the bento blogs has neither `coverImage` nor `imageUrl` → gradient fallback visible
- Category counts reflect DB state; clicking a category card navigates to `/topics/<category>`
- Coming Soon button navigates to `/subscribe`
- Navbar shows "Hub" link active state on `/hub`
- Switching language (NL ↔ EN) updates all hub strings
- Mobile (≤ md): bento collapses to single column, category grid collapses to single column

## Open questions

None at draft time. Reviewer to confirm spec before plan is written.

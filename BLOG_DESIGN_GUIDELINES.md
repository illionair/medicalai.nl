# Medical AI - Blog Design & Architecture Guidelines

Dit document beschrijft de visie, design-instructies en technische vereisten voor de blog-sectie van Medical-AI.nl.

## 1. De Visie (Voor Designer & Schrijver)

**Doel:** De kloof dichten tussen technische AI-innovatie en de dagelijkse medische praktijk.

**Doelgroep:**
*   **Medisch Specialisten:** Focus op workflow, klinische validatie en bruikbaarheid.
*   **Ziekenhuismanagers:** Focus op kosten, ROI en implementatie-eisen.

**Kernwaarden:**
*   **Betrouwbaar:** Evidence-based, onderbouwd met bronnen.
*   **Scanbaar:** Tijdwinst voor de drukke professional.
*   **Neutraal:** Geen verkoop, objectieve analyse.

**Vibe:** *The Lancet meets Apple*. Schoon, veel witruimte, professioneel blauw/grijs, hoge leesbaarheid.

---

## 2. Instructies voor de UI/UX Designer

De blogpagina is het "huis" van de content. Dit is geen standaard blog-layout; we gebruiken specifieke datavelden en functionaliteiten.

### A. De Layout: "The Single Product Page" (De One-Pager)
Dit is de belangrijkste pagina. Hier landt de arts.

*   **Structuur:**
    *   **Desktop:** 2-koloms layout (Content links, Sidebar rechts).
    *   **Mobile:** Single column.

*   **Above the Fold (Direct zichtbaar):**
    1.  **Titel (H1):** Groot en duidelijk.
    2.  **Subtitel:** De "One-liner" belofte.
    3.  **Trust Badges:** Een rij visuele tags direct onder de titel.
        *   `[Specialisme: Radiologie]`
        *   `[Status: 🟢 CE Class IIa]`
        *   `[Status: 🔵 FDA Cleared]`
        *   `[Kosten: €€]`

### B. De Navigatie & Sidebar (Desktop)
Een **Sticky Sidebar** (rechts) die in beeld blijft tijdens het scrollen.

*   **Inhoud Sidebar:**
    *   Knop: "Naar website ontwikkelaar" (Extern).
    *   Knop: "Bekijk demo" (Indien beschikbaar).
    *   **Share buttons:** LinkedIn, WhatsApp.
    *   **Metadata Box:** "Quick Facts" kader (bijv. Privacy status, Cloud vs. On-prem).

### C. Visual Hierarchy (In de content)
Tekstblokken moeten visueel gescheiden zijn voor verschillende lezersprofielen.

1.  **Clinical Utility:** Icoon van een stethoscoop/arts. Focus op klinische tekst.
2.  **Evidence Check (De Data):** *Moet eruit springen.* Gebruik een gekleurd kader (lichtgrijs/zachtblauw). Toon cijfers (AUC, Sensitiviteit) als data, niet als platte tekst.
3.  **Manager Check:** Icoon van een aktetas/gebouw. Focus op implementatie/kosten.
4.  **Community:** Onderaan een sectie "Wat vinden collega's?" met een LinkedIn-knop/integratie.

### D. Specifieke Features (Dev Requirements)
*   **Citation Tool:** Knop in footer: "Kopieer referentie" (voor presentaties).
*   **DOI Link:** Aanklikbare DOI-link die opent in een nieuw tabblad.

---

## 3. Architectuur & Filtering

### Filtering & Navigatie
Op de homepage en archiefpagina's moet een **filterbalk** aanwezig zijn.

**Filteropties:**
1.  **Specialisme** (bijv. Radiologie, Cardiologie, Huisartsgeneeskunde)
2.  **CE-Status** (bijv. CE Class I, IIa, IIb, III, Geen)
3.  **Kosten** (bijv. Gratis, €, €€, €€€)

### Taxonomie (Onderwerpen Menu)
De structuur onder het menu "Onderwerpen" (Topics) moet logisch gescheiden zijn:

1.  **Specialismen** (Tags)
    *   Radiologie
    *   Cardiologie
    *   Dermatologie
    *   ...
2.  **Type Model** (Tags)
    *   Predictie
    *   Diagnostiek
    *   Prognose
3.  **Overig** (Tags)
    *   Ethiek
    *   Richtlijnen & Wetgeving

**Implementatie:**
*   Alle bovenstaande items (Specialismen, Model types, etc.) worden technisch als **Tags** aan een blogpost gekoppeld.
*   Deze tags zijn aanklikbaar en leiden naar een overzichtspagina voor die specifieke tag.

---

## 4. Article Authoring — Frontmatter & Custom Tags

Statische artikelen in `docs/articles/drafts/` ondersteunen een uitgebreid YAML-frontmatter blok en een aantal inline custom tags. Een gemigreerd artikel begint zo:

```yaml
---
status: draft
title: "AUC 0,89 — en toch onveilig?"
seoTitle: "AUC uitgelegd voor zorgprofessionals: wat zegt het wel en niet?"
subtitle: "Wat AUC wel en niet vertelt over je model"
difficulty: middel        # basis | middel | diep
readingMinutes: 8
coverConcept: roc-curve   # roc-curve | scale-balance | leaky-pipe (anders → default)
---
```

`title` overschrijft de H1 op de pagina. `seoTitle` blijft beschikbaar voor `<head>` en RSS.

### Custom tags in body

| Tag | Doel | Voorbeeld |
|---|---|---|
| `<tldr>` | 3-bullet samenvatting bovenaan | `<tldr><li>punt 1</li><li>punt 2</li><li>punt 3</li></tldr>` |
| `<callout type="case\|warning\|tip\|key" title="…">` | gekleurd kader | zie hieronder |
| `<term def="korte uitleg">jargon</term>` | inline tooltip | `<term def="Area Under the ROC Curve">AUC</term>` |
| `<keytakeaway>` | pull-quote per H2 | `<keytakeaway>Score is een rangorde, geen diagnose.</keytakeaway>` |
| `<interactive name="…">` | widget van de registry | zie widget-sectie |

### Widget syntax

Een widget zonder props:
```html
<interactive name="auc-roc"></interactive>
```

Met getypeerde props (gevalideerd door Zod schema in `src/lib/widgets/schemas.ts`):
```html
<interactive name="auc-threshold" data-props='{"initialThreshold":0.45}'></interactive>
```

**JSON-escaping is strikt**: gebruik altijd single-quote outer + double-quote inner. Het script `scripts/lint-articles.mjs` (gehangen aan `prebuild`) parseert elke `data-props` blob en faalt de build op syntaxfouten.

### Constraint: callout children

React-markdown re-parseert children van een custom tag niet als markdown. Houd `<callout>` body in plain HTML — gebruik `<p>`, `<strong>`, `<em>` direct, geen `**bold**` syntax. Zelfde voor `<keytakeaway>`.

### Aanspreekvorm

Hele site gebruikt **"je"**. Geen mix met "u". Lint manueel of voer een vervang-sweep uit op nieuwe drafts vóór commit.

"use server";

import { prisma } from "@/lib/prisma";

export async function createOpenEvidencePost() {
    // 1. Create or find the Article
    const article = await prisma.article.upsert({
        where: { pubmedId: "openevidence-manual" },
        update: {},
        create: {
            pubmedId: "openevidence-manual",
            title: "OpenEvidence: Generatieve AI met bronvermelding",
            abstract: "OpenEvidence beantwoordt complexe klinische vragen door gebruik te maken van een Retrieval-Augmented Generation (RAG) architectuur.",
            authors: "OpenEvidence Team",
            journal: "Medical AI Blog",
            status: "PUBLISHED",
            url: "https://www.openevidence.com"
        }
    });

    // 2. Upsert the BlogPost (Idempotent)
    await prisma.blogPost.upsert({
        where: { articleId: article.id },
        update: {
            title: "OpenEvidence: Generatieve AI met bronvermelding",
            published: false,
            specialism: "Alle specialismen",
            ceStatus: "n.v.t. (Informatiebron)",
            cost: "Gratis (Freemium)",
            modelType: "Generative AI (RAG)",
            developer: "OpenEvidence (USA)",
            privacy: "⚠️ US Cloud",
            integration: "Web-based",
            demoUrl: "https://www.openevidence.com",
            citation: "Medical AI. (2025). OpenEvidence: Generatieve AI met bronvermelding.",
            doi: "https://www.openevidence.com"
        },
        create: {
            title: "OpenEvidence: Generatieve AI met bronvermelding",
            content: `
# De toekomst van medische kennis

**OpenEvidence** is een nieuwe speler in het veld van medische AI die belooft de manier waarop artsen informatie zoeken te revolutioneren.

## 1. Het Klinische Nut (Voor de Specialist)

### Wat doet het?
OpenEvidence beantwoordt complexe klinische vragen door gebruik te maken van een **Retrieval-Augmented Generation (RAG)** architectuur.
1. In tegenstelling tot standaard ChatGPT, zoekt het eerst in miljoenen medische documenten (full-text papers uit o.a. *The Lancet*, *NEJM*, en richtlijnen).
2. Vervolgens synthetiseert het een antwoord mét directe voetnoten naar deze bronnen.

### De Workflow
Het systeem lost het probleem van "informatie-overload" op. Waar artsen traditioneel zelf zoekresultaten uit PubMed moeten synthetiseren, geeft OpenEvidence direct een samengevat antwoord. Het is ontworpen als ondersteuning voor nascholing, besluitvorming en onderwijs, niet als autonome diagnosticus.

### De Data-Vertaler (Evidence Check)
**Technisch:** OpenEvidence scoorde als eerste AI consistent >90% op het United States Medical Licensing Examination (USMLE). Recentelijk claimt het bedrijf zelfs scores van 100% op bepaalde onderdelen.

**Onze Interpretatie:** De kracht zit niet alleen in de score, maar in de verifieerbaarheid. Het systeem vermindert hallucinaties (het verzinnen van feiten) door claims te koppelen aan bronnen.

> ⚠️ **Let op:** Er is sprake van een sterke US-bias. Antwoorden zijn vaak gebaseerd op Amerikaanse richtlijnen (FDA/AHA). Blijf alert op verschillen met Nederlandse protocollen (EMA/NHG).

## 2. De Manager Check (Voor Beslissers)

### Implementatie & Toegang
De toegang was aanvankelijk beperkt tot artsen met een Amerikaans NPI-nummer. Inmiddels is dit versoepeld: ook Nederlandse artsen kunnen een account aanmaken door hun medische registratie te verifiëren (bijvoorbeeld via het uploaden van een foto van uw ziekenhuispas).

### ROI Potentieel
Enorme efficiëntiewinst in het ontsluiten van kennis ("Niet zoeken, maar vragen"). Het bespaart kostbare tijd die anders aan literatuurstudie wordt besteed.

### Compliance & Privacy
Hier ligt het grootste risico voor ziekenhuizen. Het is een Amerikaanse dienst die data verwerkt in de VS. Het invoeren van patiëntcasuïstiek is juridisch risicovol onder de AVG. Het is geen medisch hulpmiddel (geen CE-markering), maar een informatiebron.
            `,
            summary: "OpenEvidence beantwoordt complexe klinische vragen met bronvermelding. Een diepe duik in de klinische waarde, betrouwbaarheid en privacy-aspecten.",
            category: "Diagnostiek",
            published: false,
            articleId: article.id,

            // Blog 2.0 Fields
            specialism: "Alle specialismen",
            ceStatus: "n.v.t. (Informatiebron)",
            cost: "Gratis (Freemium)",
            modelType: "Generative AI (RAG)",
            developer: "OpenEvidence (USA)",
            privacyType: "Cloud",
            integration: "Web-based",
            demoUrl: "https://www.openevidence.com",
            vendorUrl: "https://www.openevidence.com",
            citation: "Medical AI. (2025). OpenEvidence: Generatieve AI met bronvermelding.",
            doi: "https://www.openevidence.com",
            fdaStatus: "None",
            fdaNumber: ""
        }
    });
}

"use server";

import { prisma } from "@/lib/prisma";

const TEN_MIN_PUBMED_ID = "ten-min-ai-checklist-manual";

const TEN_MIN_CONTENT = `AI-artikelen in de zorg kunnen indrukwekkend klinken: hoge AUC, grote datasets, deep learning, "expert-level performance". Toch is de klinische vraag meestal eenvoudiger: helpt dit mijn patiënt, in mijn setting, zonder nieuwe schade te veroorzaken? Met onderstaande 10-minutencheck kun je snel bepalen of een AI-studie de moeite waard is om dieper te lezen, te bespreken in een journal club of voorlopig naast je neer te leggen.

## De snelle 10-minutencheck

**Minuut 1: Wat is de klinische taak?**
Vraag eerst: welk besluit moet de AI ondersteunen? Diagnose, triage, prognose, behandeling, monitoring of administratieve workflow? Een model dat "sepsis voorspelt" is te vaag. Wanneer voorspelt het model sepsis, voor wie, met welke actie erna, en wie moet die actie uitvoeren?

**Minuut 2: Klopt de populatie?**
Vergelijk de studiepopulatie met jouw patiënten. Leeftijd, comorbiditeit, ziektestadium, setting, apparatuur, taal, etniciteit, verwijspatroon en prevalentie doen ertoe. Een model uit één academisch centrum met geselecteerde patiënten is zelden direct toepasbaar in een perifere spoedpost of huisartsenpraktijk.

**Minuut 3: Is de uitkomst klinisch relevant?**
Kijk of de uitkomst hard, reproduceerbaar en relevant is. Mortaliteit, IC-opname, pathologisch bevestigde diagnose of heropname zijn vaak sterker dan samengestelde, administratieve of proxy-uitkomsten. Let ook op timing: een voorspelling van verslechtering "binnen 24 uur" is alleen nuttig als er op dat moment nog iets te doen is.

**Minuut 4: Hoe is de dataset opgebouwd?**
Check bron, periode, inclusiecriteria, exclusies en ontbrekende data. Zijn trainings-, validatie- en testdata echt gescheiden? Bij beeldvorming: komen meerdere beelden van dezelfde patiënt in verschillende sets terecht? Bij EPD-data: zijn variabelen beschikbaar vóór het beslismoment, of is er datalek uit de toekomst?

**Minuut 5: Is er externe validatie?**
Interne validatie is een begin, geen eindpunt. Een goede AI-studie test het model bij voorkeur op data uit andere centra, andere tijdsperioden of andere systemen. Externe validatie is cruciaal omdat AI-modellen gevoelig zijn voor lokale patronen: scanners, labmethoden, codeergewoonten en behandelprotocollen.

**Minuut 6: Kijk verder dan AUC**
Een hoge AUC betekent niet automatisch klinische bruikbaarheid. Zoek sensitiviteit, specificiteit, positief en negatief voorspellende waarde bij relevante drempels. Vraag: hoeveel fout-positieven en fout-negatieven levert dit op per 100 patiënten in mijn setting? Een model kan statistisch sterk zijn en praktisch onbruikbaar door te veel alarmen.

**Minuut 7: Is het model gecalibreerd?**
Voor risicomodellen is calibratie essentieel: als het model 20% risico voorspelt, gebeurt de uitkomst dan ongeveer bij 20 van de 100 vergelijkbare patiënten? Slechte calibratie kan leiden tot overbehandeling of gemiste zorg. Zoek naar calibratieplots, intercept, slope of beoordeling per risicogroep, niet alleen naar discriminatie.

**Minuut 8: Is bias onderzocht?**
AI kan bestaande ongelijkheid versterken. Kijk of prestaties zijn uitgesplitst naar relevante subgroepen: geslacht, leeftijd, etniciteit, sociaaleconomische status, taal, comorbiditeit, zwangerschap, apparatuurtype of centrum. "Geen verschil gevonden" is alleen geruststellend als de studie genoeg power had en de subgroepen vooraf logisch waren gekozen.

**Minuut 9: Past het in de workflow?**
Een model is geen los getal, maar een interventie in een werksysteem. Wie ziet de output? Wanneer? In welk scherm? Hoe wordt onzekerheid getoond? Mag de arts afwijken? Is er training? Wordt alarmmoeheid gemeten? DECIDE-AI benadrukt terecht dat menselijke factoren en implementatiecontext onderdeel zijn van de klinische evaluatie, niet een voetnoot achteraf.

**Minuut 10: Is er bewijs voor clinical utility?**
De hoogste lat is niet modelprestatie, maar betere zorg: minder complicaties, sneller juiste behandeling, minder onnodige diagnostiek, betere patiëntervaring of lagere werkdruk zonder schade. Idealiter is er prospectieve evaluatie, liefst gerandomiseerd of zorgvuldig quasi-experimenteel. Decision curve analysis, impactanalyse of trialdata zijn sterker dan alleen retrospectieve performance.

<interactive name="checklist-10min"></interactive>

## Uitleg: wat maakt een AI-artikel geloofwaardig?

Begin met de vraag of het artikel past bij het type studie. Voor diagnostische accuratesse is STARD-AI relevant; voor predictiemodellen TRIPOD+AI en PROBAST+AI; voor trials CONSORT-AI; voor vroege klinische evaluatie DECIDE-AI. Deze richtlijnen zijn geen keurmerk, maar ze helpen zien wat minimaal transparant gerapporteerd moet zijn.

Let vooral op de afstand tussen onderzoek en praktijk. Veel AI-studies blijven steken in retrospectieve evaluatie: het model krijgt historische data en voorspelt wat al gebeurd is. Dat kan nuttig zijn voor ontwikkeling, maar zegt weinig over gedrag in de spreekkamer, op de SEH of in het MDO. Zodra een AI-output echte beslissingen beïnvloedt, ontstaan nieuwe risico's: automation bias, alarmmoeheid, verschuiving van verantwoordelijkheid en veranderde diagnostische drempels.

Regulatoire context hoort ook in je snelle beoordeling. In Europa vallen veel medische AI-systemen onder bestaande medische-hulpmiddelenregels en, afhankelijk van gebruik en risico, onder de EU AI Act. In de VS publiceert de FDA lijsten en guidance rond AI-enabled medical devices, inclusief aandacht voor lifecycle management en vooraf bepaalde wijzigingsplannen. Voor de lezer betekent dit: vraag of het systeem bedoeld is als medisch hulpmiddel, of er markttoelating is voor de beoogde indicatie, en hoe updates na implementatie worden bewaakt.

## Rode vlaggen

Wantrouw artikelen die vooral marketingtaal gebruiken: "revolutionair", "clinician-level", "generalizable" zonder overtuigende externe validatie. Een AUC zonder klinische drempels is onvoldoende. Een model zonder calibratie-informatie is riskant wanneer het risicoschattingen geeft. Een dataset zonder duidelijke tijdslijn of patiëntscheiding kan datalek bevatten. Subgroepanalyse ontbreekt vaak precies waar bias het meest waarschijnlijk is.

Andere rode vlaggen: alleen één centrum, kleine testset, onduidelijke referentiestandaard, uitkomst die deels door het model beïnvloed had kunnen worden, geen vergelijking met standaardzorg, geen beschrijving van ontbrekende data, geen foutanalyse, geen workflowbeschrijving, geen monitoringplan na implementatie, en belangenverstrengeling zonder onafhankelijke evaluatie.

## Conclusie

Een AI-artikel beoordelen hoeft niet te beginnen met de architectuur van het neurale netwerk. Begin klinisch: patiënt, beslissing, uitkomst, setting en consequentie. Daarna pas modelprestatie. In 10 minuten kun je meestal onderscheiden of een studie alleen technisch interessant is, of mogelijk klinisch bruikbaar. De kernvraag blijft: zou dit model, getest bij mijn patiënten en ingebed in mijn workflow, aantoonbaar betere beslissingen opleveren dan goede zorg zonder dit model?

## Bronnen

1. Collins GS et al. TRIPOD+AI statement. BMJ, 2024. https://www.bmj.com/content/385/bmj-2023-078378
2. Moons KGM et al. PROBAST+AI. BMJ, 2025. https://www.bmj.com/content/388/bmj-2024-082505
3. Sounderajah V et al. STARD-AI reporting guideline. Nature Medicine, 2025. https://www.nature.com/articles/s41591-025-03953-8
4. Liu X et al. CONSORT-AI extension. Nature Medicine, 2020. https://www.nature.com/articles/s41591-020-1034-x
5. Rivera SC et al. SPIRIT-AI extension. Nature Medicine, 2020. https://www.nature.com/articles/s41591-020-1037-7
6. Vasey B et al. DECIDE-AI. Nature Medicine, 2022. https://www.nature.com/articles/s41591-022-01772-9
7. Vickers AJ, Elkin EB. Decision curve analysis. Medical Decision Making, 2006. https://doi.org/10.1177/0272989X06295361
8. FDA. Artificial Intelligence in Software as a Medical Device. https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device
9. Regulation (EU) 2024/1689, Artificial Intelligence Act. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng
`;

const TEN_MIN_FIELDS = {
    title: "Hoe beoordeel je een AI-artikel in 10 minuten?",
    subtitle: "Een praktische checklist voor klinisch relevante AI-studies",
    summary: "10 vragen die je in tien minuten door een AI-studie kunt lopen: van klinische taak en populatie tot calibratie, bias, workflow en clinical utility.",
    category: "Methodisch",
    specialism: "Alle specialismen",
    citation: "Medical AI. (2026). Hoe beoordeel je een AI-artikel in 10 minuten?",
};

export async function createTenMinChecklistPost() {
    const article = await prisma.article.upsert({
        where: { pubmedId: TEN_MIN_PUBMED_ID },
        update: {},
        create: {
            pubmedId: TEN_MIN_PUBMED_ID,
            title: TEN_MIN_FIELDS.title,
            abstract: TEN_MIN_FIELDS.summary,
            authors: "Medical AI redactie",
            journal: "Medical AI Hub",
            status: "PUBLISHED",
        },
    });

    await prisma.blogPost.upsert({
        where: { articleId: article.id },
        update: {
            title: TEN_MIN_FIELDS.title,
            subtitle: TEN_MIN_FIELDS.subtitle,
            summary: TEN_MIN_FIELDS.summary,
            content: TEN_MIN_CONTENT,
            category: TEN_MIN_FIELDS.category,
            specialism: TEN_MIN_FIELDS.specialism,
            citation: TEN_MIN_FIELDS.citation,
            published: true,
        },
        create: {
            title: TEN_MIN_FIELDS.title,
            subtitle: TEN_MIN_FIELDS.subtitle,
            summary: TEN_MIN_FIELDS.summary,
            content: TEN_MIN_CONTENT,
            category: TEN_MIN_FIELDS.category,
            specialism: TEN_MIN_FIELDS.specialism,
            citation: TEN_MIN_FIELDS.citation,
            published: true,
            articleId: article.id,
        },
    });
}

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
            privacyType: "⚠️ US Cloud",
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

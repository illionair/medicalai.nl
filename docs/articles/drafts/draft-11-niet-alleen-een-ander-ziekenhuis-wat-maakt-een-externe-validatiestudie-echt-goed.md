---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-1256-79e3-b4d1-715ddeec7cb0.jsonl  ts: 2026-05-03T22:39:58.847Z -->

# Niet alleen een ander ziekenhuis: wat maakt een externe validatiestudie echt goed?

## Intro

Een AI-model dat uitstekend presteert in de ontwikkeldata is nog geen klinisch bruikbaar model. Externe validatie test of voorspellingen overeind blijven in nieuwe, relevante data die niet zijn gebruikt voor training, tuning, modelselectie of interne evaluatie. Maar “extern” betekent niet automatisch “goed”. Een dataset uit een ander ziekenhuis kan alsnog te klein, te selectief, te oud, slecht gelabeld of operationeel onvergelijkbaar zijn. Een goede externe validatiestudie laat zien voor wie, waar, wanneer en onder welke klinische voorwaarden een model betrouwbaar genoeg is om beslissingen te ondersteunen.

## Begin bij de beoogde inzet

De kernvraag is niet: “Werkt het model op dataset B?” De kernvraag is: “Werkt het model voor de doelpopulatie en klinische beslissing waarvoor we het willen gebruiken?” Beschrijf daarom expliciet de doelpopulatie: leeftijd, ziekte-spectrum, inclusie- en exclusiecriteria, comorbiditeit, prevalentie, verwijspatroon en relevante demografie. Een sepsismodel voor IC-patiënten valideer je niet overtuigend op algemene SEH-patiënten zonder uit te leggen waarom die populatie aansluit.

Ook de setting moet concreet zijn: eerste lijn, tertiair centrum, spoedzorg, screening, thuismonitoring, radiologie-workflow of EPD-beslisondersteuning. Technische context telt mee: scanners, labmethoden, EPD-velden, triageprocessen, datakwaliteit en wie het modelresultaat ziet. Externe validatie is dus meer dan geografische afstand; het gaat om klinische en operationele vergelijkbaarheid.

## Tijd, beschikbaarheid en datalekken

Een sterke studie vermeldt de tijdsperiode van de validatiecohort. Modellen kunnen degraderen door veranderde richtlijnen, apparatuur, populaties, codering, behandelopties of ziekte-epidemiologie. Temporale validatie, bijvoorbeeld training op 2018-2021 en externe evaluatie op 2023-2025, kan minstens zo informatief zijn als validatie in een ander centrum.

Predictorbeschikbaarheid is een vaak onderschat punt. Alle voorspellers moeten op het beslismoment beschikbaar zijn, in dezelfde vorm als bij implementatie. Een labwaarde die pas na opname bekend is, mag niet worden gebruikt voor een triagebesluit bij binnenkomst. Let ook op dataverwerking: automatische extractie, handmatige correctie, beeldpreprocessing en uitsluiting van “slechte” scans moeten overeenkomen met echte praktijk. Anders valideer je een ideaal proces, niet het inzetbare model.

## Outcome-definitie en referentiestandaard

De outcome-definitie moet reproduceerbaar, klinisch relevant en onafhankelijk van de modelvoorspelling zijn. Bij diagnostische AI gaat het om de referentiestandaard: histologie, expertpanel, follow-up, microbiologie, adjudicatie of een combinatie. Bij prognostische modellen gaat het om tijdshorizon en meetmethode: 30-dagen mortaliteit, IC-opname binnen 24 uur, complicatie binnen 90 dagen. Een outcome die in centrum A anders wordt gecodeerd dan in centrum B kan schijnbare prestatieverschillen veroorzaken.

Voor medische beeldvorming sluit dit aan bij CLAIM: rapporteer dataherkomst, acquisitie, selectie, preprocessing, referentiestandaard en externe testset transparant. Voor interventiestudies waarin het AI-systeem daadwerkelijk de zorg beïnvloedt, is CONSORT-AI relevanter: daar moet ook de menselijke interactie, workflow, versie van het algoritme en impact op klinische uitkomsten worden beschreven.

## Missing data is geen voetnoot

Missing data hoort niet verstopt te zitten in een supplement. Rapporteer per predictor en outcome hoeveel data ontbreken, waarom ze ontbreken, en hoe ermee is omgegaan. Complete-case analyse kan bias introduceren als ontbrekende waarden samenhangen met ernst, setting of subgroep. Imputatie moet vooraf gespecificeerd en passend zijn voor de implementatiecontext. Belangrijk: als het model in de praktijk moet kunnen omgaan met ontbrekende waarden, moet de validatie datzelfde mechanisme testen.

## Prestatie: calibration én discrimination

Discrimination beschrijft hoe goed het model onderscheid maakt tussen mensen met en zonder outcome, vaak met AUC/C-statistic, sensitiviteit, specificiteit of positive predictive value bij vooraf gekozen drempels. Dat is nodig, maar niet genoeg.

Calibration is minstens zo belangrijk: kloppen de voorspelde risico’s met de geobserveerde risico’s? Een model met AUC 0,85 kan klinisch gevaarlijk zijn als het systematisch 20% risico voorspelt waar 5% realistisch is. Rapporteer calibration-in-the-large, calibration slope, flexible calibration plots en, bij tijd-tot-eventmodellen, kalibratie op relevante tijdspunten. Vermijd alleen Hosmer-Lemeshow-achtige p-waarden; die zeggen weinig over klinische bruikbaarheid.

## Clinical utility: wat verandert er aan beslissingen?

Een model kan statistisch indrukwekkend zijn en klinisch nutteloos. Daarom hoort een goede externe validatie decision-curve analysis of een vergelijkbare clinical utility-analyse te bevatten wanneer het model bedoeld is om acties te sturen. Net benefit laat zien of gebruik van het model meer voordeel oplevert dan “iedereen behandelen”, “niemand behandelen” of standaardzorg, over relevante risicodrempels. Die drempels moeten klinisch worden gemotiveerd: bij welke voorspelde kans verwijs je, behandel je, scan je of intensiveer je monitoring?

## Subgroepen, fairness en transportability

Gemiddelde performance kan problemen maskeren. Rapporteer subgroup performance voor klinisch en ethisch relevante groepen: leeftijd, geslacht/gender, etniciteit, sociaaleconomische status, centrum, scanner, ziekte-ernst, comorbiditeit en datakwaliteit. Kleine subgroepen vragen om onzekerheidsintervallen en terughoudende interpretatie, maar niet om zwijgen.

Transportability gaat over de vraag of het model verplaatsbaar is naar nieuwe populaties, settings en tijdsperioden. Soms is volledige herontwikkeling niet nodig, maar wel recalibratie of lokale updating. Een goede studie maakt duidelijk of slechte performance komt door case-mix, andere predictorverdeling, outcomeverschil, workflowverschil of echte modelinstabiliteit.

## Praktische checklist

- Is de validatieset volledig onafhankelijk van training, tuning en modelselectie?
- Sluiten doelpopulatie, setting en tijdsperiode aan op de beoogde inzet?
- Waren alle predictors beschikbaar op het beslismoment, zonder datalekken?
- Is de outcome-definitie helder, klinisch relevant en vergelijkbaar tussen centra?
- Zijn missing data beschreven en methodologisch verantwoord behandeld?
- Worden calibration, discrimination en onzekerheidsintervallen gerapporteerd?
- Is clinical utility onderzocht met relevante beslisdrempels?
- Zijn subgroepen en fairness onderzocht zonder overinterpretatie?
- Wordt transportability besproken, inclusief behoefte aan recalibratie?
- Is rapportage in lijn met TRIPOD+AI en beoordeling mogelijk met PROBAST+AI?

## Bronnen

- [TRIPOD+AI statement, BMJ 2024](https://www.bmj.com/content/385/bmj-2023-078378)
- [PROBAST+AI, BMJ 2025](https://www.bmj.com/content/388/bmj-2024-082505)
- [Evaluation of clinical prediction models, part 2: external validation, BMJ 2024](https://www.bmj.com/content/384/bmj-2023-074820)
- [CLAIM 2024 Update, EQUATOR Network](https://www.equator-network.org/reporting-guidelines/checklist-for-artificial-intelligence-in-medical-imaging-claim-a-guide-for-authors-and-reviewers/)
- [CONSORT-AI extension, Nature Medicine 2020](https://www.nature.com/articles/s41591-020-1034-x)
- [Decision curve analysis and net benefit, Vickers & Holland 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8413398/)

---


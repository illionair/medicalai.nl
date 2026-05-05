---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-117d-7472-bf6e-2897a7ccd005.jsonl  ts: 2026-05-03T22:40:16.963Z -->

# FDA, CE en MDR: wat betekenen ze voor AI-modellen in de zorg?

AI-leveranciers schermen vaak met termen als “FDA-cleared”, “CE-marked” of “MDR-compliant”. Dat klinkt geruststellend, maar voor een ziekenhuis, onderzoeksgroep of klinisch beslisser is de echte vraag scherper: waarvoor is dit AI-systeem beoordeeld, op welke versie, met welke klinische claim, en wat gebeurt er als het model verandert? Dit artikel geeft een praktische uitleg. Het is bedoeld als educatief overzicht, niet als juridisch advies.

## Het startpunt: is het AI-model een medisch hulpmiddel?

Een AI-model is niet automatisch een medisch hulpmiddel. De regulatoire status hangt vooral af van de “intended purpose”: het beoogde gebruik zoals de fabrikant dat claimt in documentatie, marketing, handleiding en klinische evaluatie.

Een model dat CT-beelden analyseert om longembolie te signaleren, een sepsisrisico voorspelt of therapiekeuzes ondersteunt, zal vaak binnen medische hulpmiddelenwetgeving vallen. Een model dat alleen administratieve notities samenvat of populatieniveau-onderzoek ondersteunt, kan daarbuiten vallen. De grens zit niet in het woord “AI”, maar in de medische claim en het gebruik bij individuele patiënten.

Belangrijk is ook het begrip SaMD: Software as a Medical Device. Volgens de internationale IMDRF-definitie gaat het om software die een medisch doel vervult zonder onderdeel te zijn van een hardware-medisch hulpmiddel. Veel klinische AI valt hieronder, maar AI kan ook onderdeel zijn van een scanner, monitor, labinstrument of combinatieproduct. De FDA spreekt vaak over AI-enabled medical devices: medische hulpmiddelen waarin AI of machine learning een functie vervult.

## EU: CE-markering onder MDR of IVDR

In Europa is CE-markering het toegangsbewijs tot de markt. Voor medische hulpmiddelen gebeurt dit meestal onder de Medical Devices Regulation, MDR 2017/745. Voor diagnostiek op basis van lichaamsmateriaal, zoals lab- of genetische tests, kan de IVDR 2017/746 gelden.

CE is geen “EU-FDA approval”. De fabrikant blijft primair verantwoordelijk voor conformiteit. Afhankelijk van de risicoklasse beoordeelt een notified body, een onafhankelijke aangewezen instantie, het kwaliteitsmanagementsysteem en technische documentatie. Bij veel klinische AI-software is zo’n notified body nodig.

Voor software is MDR Rule 11 belangrijk. Software die informatie levert voor diagnostische of therapeutische beslissingen valt vaak minimaal in klasse IIa. Als een fout besluit kan leiden tot ernstige verslechtering, chirurgische interventie, overlijden of onomkeerbare gezondheidsschade, kan de klasse IIb of III worden. Dat heeft direct gevolgen voor de zwaarte van bewijs, toezicht en documentatie.

Een CE-markering betekent dus: dit product, voor deze beoogde toepassing, in deze configuratie, voldoet volgens de gekozen route aan de toepasselijke EU-eisen. Het betekent niet automatisch dat het model in elke patiëntpopulatie, elk ziekenhuisinformatiesysteem of elke workflow even goed presteert.

## VS: FDA premarket review

In de Verenigde Staten beoordeelt de FDA medische hulpmiddelen via bestaande device-routes. Bij AI-enabled devices gaat het meestal om 510(k) clearance, De Novo authorization of PMA approval. Welke route geldt, hangt af van risico, nieuwheid en vergelijkbaarheid met bestaande hulpmiddelen.

De FDA kijkt bij premarket review onder meer naar beoogd gebruik, technische validatie, klinische prestatie, softwaredocumentatie, cybersecurity, human factors en risicoanalyse. “FDA-cleared” betekent meestal dat het product via 510(k) substantieel equivalent is bevonden aan een predicate device. “FDA-approved” hoort vooral bij PMA voor hoog-risico hulpmiddelen. “FDA-registered” is veel zwakker: registratie van een bedrijf of productlisting is geen inhoudelijke goedkeuring van klinische prestaties.

Een nuttig voordeel in de VS is de publieke FDA-database. Voor veel AI-enabled devices zijn samenvattingen beschikbaar waarin indicatie, productcode, beslisdatum en soms validatie-informatie staan. Toch blijft opletten nodig: de publieke samenvatting bevat niet alle ingediende data.

## Praktisch verschil tussen EU en FDA

Kort gezegd: de FDA is een centrale toezichthouder die marketing authorization verleent voor de Amerikaanse markt. De EU werkt via CE-markering, fabrikantverantwoordelijkheid en notified bodies binnen MDR/IVDR.

Bij de FDA vraag je: welke submission, welke pathway, welke cleared/authorized/approved indication, en welke modelversie? Bij CE/MDR vraag je: welke risicoklasse, welke notified body, welk certificaat, welke intended purpose, en vallen alle modules onder de CE-scope?

Ook taal doet ertoe. Een leverancier kan zeggen dat “het platform CE heeft”, terwijl de voorspellende AI-module nog niet als medisch hulpmiddel is beoordeeld. Of een Amerikaans product kan “FDA-cleared” zijn voor triage van radiologische beelden, maar niet voor autonome diagnose of gebruik bij kinderen.

## Lifecycle, post-market monitoring en drift

AI is geen statisch implantaat. Data, populaties, scanners, labmethoden, EPD-velden en klinische workflows veranderen. Daardoor kunnen prestaties verschuiven: data drift, calibration drift, veranderende foutpatronen of bias in subgroepen.

Daarom vragen moderne kaders om lifecycle management. In de EU horen post-market surveillance, vigilance, klinische follow-up en periodieke veiligheidsrapportage bij de MDR/IVDR-systematiek. In de VS verwacht de FDA eveneens kwaliteitsmanagement, correctieve acties, incidentrapportage en monitoring passend bij het risico. De IMDRF Good Machine Learning Practice-principes benadrukken dat AI/ML-hulpmiddelen over de totale levenscyclus beheerst moeten worden.

Voor klinische gebruikers is dit cruciaal: een mooie AUC in een retrospectieve publicatie is niet genoeg. Je wilt weten hoe het model lokaal blijft presteren, wie afwijkingen detecteert, wanneer alarmdrempels worden aangepast en hoe gebruikers worden geïnformeerd.

## Modelwijzigingen: locked, adaptive en vooraf geplande updates

Veel goedgekeurde of gecertificeerde AI-modellen zijn “locked”: dezelfde input geeft bij dezelfde versie dezelfde output. Updates gebeuren via gecontroleerde software-releases.

Adaptieve of lerende modellen zijn ingewikkelder. Als een model na marktintroductie verandert, kan dat invloed hebben op veiligheid, prestaties of beoogd gebruik. Dan kan een nieuwe FDA-submission of notified-body beoordeling nodig zijn.

De FDA heeft hiervoor een belangrijk instrument: de Predetermined Change Control Plan, PCCP. Daarmee kan een fabrikant vooraf beschrijven welke AI-wijzigingen gepland zijn, hoe die worden ontwikkeld en gevalideerd, en wat de impact is. Als de FDA dat plan beoordeelt binnen de marketing submission, kunnen bepaalde updates later worden doorgevoerd zonder telkens een volledige nieuwe submission, zolang ze binnen het goedgekeurde plan blijven.

In Europa bestaat ook change control, maar de route loopt via MDR/IVDR, notified body, technische documentatie en beoordeling van significante wijzigingen. Met de EU AI Act komt daar voor bepaalde medische AI extra aandacht bij voor data governance, transparantie, menselijk toezicht, post-market monitoring en substantiële wijzigingen.

## Vragen die je aan leveranciers moet stellen

1. Wat is de exacte intended purpose en voor welke patiëntgroep, setting en workflow geldt die?
2. Is het product SaMD, onderdeel van een medisch hulpmiddel, of alleen research/decision support zonder medische claim?
3. Welke FDA-route of welke MDR/IVDR-klasse geldt, en kun je het certificaat of FDA-besluitnummer tonen?
4. Welke modelversie is beoordeeld, en hoe worden updates, retraining en release notes beheerd?
5. Welke externe validatie is gedaan op relevante populaties, apparatuur, talen, etniciteit, leeftijdsgroepen en comorbiditeit?
6. Hoe monitort de leverancier post-market performance, drift, incidenten, bias en fout-negatieven/fout-positieven?
7. Is er een FDA PCCP of EU change-controlbeleid voor modelwijzigingen?
8. Wat moet de zorgprofessional met de output doen: informeren, bevestigen, triëren, diagnosticeren of behandelen?

## Conclusie

FDA, CE en MDR zijn geen kwaliteitsstempels in algemene zin. Ze zijn contextspecifieke signalen: dit hulpmiddel, met deze claim, in deze versie, via deze route, is beoordeeld tegen bepaalde eisen. Voor AI-modellen is juist die specificiteit alles. Vraag dus niet alleen “is het goedgekeurd?”, maar vooral: waarvoor, op basis van welk bewijs, onder welk toezicht, en wat gebeurt er als het model leert of verandert?

## Bronnen

- FDA: AI-enabled medical devices list: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices  
- FDA: PCCP guidance for AI-enabled device software functions: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence  
- European Commission: MDR/IVDR overview: https://health.ec.europa.eu/medical-devices-new-regulations/overview_en  
- MDCG 2019-11 rev.1 software qualification/classification: https://health.ec.europa.eu/latest-updates/update-mdcg-2019-11-rev1-qualification-and-classification-software-regulation-eu-2017745-and-2025-06-17_en  
- MDCG 2025-6 on MDR/IVDR and AI Act interplay: https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en  
- IMDRF SaMD key definitions: https://www.imdrf.org/documents/software-medical-device-samd-key-definitions

---


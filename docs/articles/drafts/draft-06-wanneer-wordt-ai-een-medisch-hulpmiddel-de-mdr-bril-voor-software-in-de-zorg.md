---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-10df-7b71-9ebb-e28cc2ad4519.jsonl  ts: 2026-05-03T22:40:32.887Z -->

# Wanneer wordt AI een medisch hulpmiddel? De MDR-bril voor software in de zorg

Stel: het IT-team van je ziekenhuis bouwt een sepsis-alert. Het systeem leest vitale parameters en labwaarden uit het EPD, geeft een risicoscore en waarschuwt de arts-assistent bij hoog risico. Is dat gewoon slimme software, of is het een medisch hulpmiddel onder de MDR?

De korte versie: AI wordt niet gereguleerd omdat het AI is, maar omdat het een medische bedoeling krijgt. Zodra software patiëntgegevens analyseert en een diagnose, prognose, waarschuwing, monitoringadvies of behandeladvies ondersteunt, kijk je met de MDR-bril. Dit artikel is educatief bedoeld en geen juridisch advies; betrek bij concrete marktintroductie altijd regulatory, klinische en juridische expertise.

<interactive name="mdr-claim-checker"></interactive>

## Eerst de beslislogica

Gebruik deze snelle denkroute:

1. Is er een medische claim?
2. Gaat het over een individuele patiënt?
3. Analyseert of interpreteert de software patiëntdata?
4. Wordt de output gebruikt voor diagnose, prognose, monitoring, triage of behandeling?

Als het antwoord steeds ja is, is de software vrijwel zeker regulatoir relevant. Of het dan MDR, IVDR, een module, een accessoire of onderdeel van een breder hulpmiddel is, vraagt nadere beoordeling. Maar de belangrijkste afslag heb je dan al genomen: dit is niet meer alleen kantoorsoftware.

## Intended purpose: de claim bepaalt de route

De belangrijkste vraag is niet: "Is het AI?" maar: "Waarvoor claimt de aanbieder dat de software gebruikt wordt?" De MDR noemt dit de **intended purpose**: het beoogde gebruik zoals blijkt uit label, gebruiksaanwijzing, website, demo, verkoopmateriaal, contract en klinische evaluatie.

Daarom kan dezelfde techniek buiten of binnen de MDR vallen. Een algoritme dat CT-beelden comprimeert voor opslag is iets anders dan een algoritme dat longnoduli markeert. Een chatbot met algemene uitleg over diabetes is iets anders dan software die voor deze patiënt een insuline-aanpassing adviseert. De medische claim, niet het technische label, is het kantelpunt.

## SaMD en MDSW zonder mystiek

Internationaal hoor je vaak **SaMD**: Software as a Medical Device. Dat betekent: software die zelf een medische functie uitvoert, zonder onderdeel te hoeven zijn van specifieke hardware. In Europese guidance wordt meestal **MDSW** gebruikt: Medical Device Software.

Voor artsen is de praktische vertaling simpel: software kan zich gedragen als een medisch hulpmiddel, zoals een bloeddrukmeter of ECG-apparaat dat ook doet. Het meet misschien niets fysieks, maar het levert medische informatie die klinische beslissingen kan sturen. Of de software in de cloud, een app, een EPD-module, een lokaal dashboard of een scanner zit, is daarbij niet doorslaggevend. De functie is belangrijker dan de verpakking.

## Klinische beslisondersteuning: het grijze gebied

Clinical decision support loopt van onschuldig naar hoog risico. Een zoekfunctie in richtlijnen, een naslagwerk of algemene educatieve uitleg valt meestal buiten MDR zolang de software geen patiëntspecifieke analyse maakt en geen medische output geeft.

Waarschijnlijk binnen MDR komt software die patiëntgegevens verwerkt om een score, alarm, interpretatie of advies te geven. Denk aan:

- een sepsis-alert op basis van vitale parameters en labwaarden;
- AI-detectie van afwijkingen op CT, MRI, mammografie of ECG;
- een score voor beroerterisico, heropnamerisico of therapierespons;
- patiëntspecifiek medicatie-, dosis- of behandeladvies;
- software die een medisch apparaat aanstuurt of beïnvloedt, zoals een closed-loop insulinepomp.

Bij analyse van lichaamsmateriaal, zoals bloed, urine, weefsel of genetische data, kan de IVDR in plaats van de MDR relevant zijn.

## Rule 11: eerst het waarom, dan de naam

Als software eenmaal als medisch hulpmiddel kwalificeert, moet de risicoklasse worden bepaald. De meeste medische software valt minimaal in klasse IIa omdat zij informatie levert die wordt gebruikt bij diagnose of behandeling. Die software-regel heet **Rule 11**, maar belangrijker is waarom de regel zo werkt: hoe groter de schade als de output fout is, hoe zwaarder de beoordeling.

Een algemeen risico-overzicht kan lager uitvallen dan een alert die direct triage stuurt. Een doseringsadvies voor chemotherapie of antistolling is zwaarder dan een administratieve samenvatting. Software waarbij een fout kan leiden tot ernstige verslechtering, een chirurgische interventie, overlijden of onomkeerbare schade kan in klasse IIb of III terechtkomen.

"Alle andere software" kan klasse I zijn, maar dat is geen startpunt. Eerst moet duidelijk zijn of het uberhaupt Medical Device Software is. Pas daarna kun je zinnig over de klasse praten.

## Wanneer valt AI waarschijnlijk buiten MDR?

Er zijn drie veelvoorkomende grensgevallen waarbij AI meestal buiten MDR blijft, zolang er geen medische intended purpose wordt geclaimd:

- **Administratie en logistiek:** planning, facturatie, personeelsroosters, voorraadbeheer of beddenplanning.
- **Communicatie en opslag:** videobellen, berichten, EPD/PACS-functionaliteit die alleen data bewaart, overdraagt of toont zonder medische interpretatie.
- **Algemene kennis en onderzoek:** onderwijs, nascholing, literatuurhulp, populatieniveau-onderzoek of prototypes die niet in klinische besluitvorming worden gebruikt.

Let op de module-logica. Een EPD is niet automatisch MDR-software, maar een EPD-module die patiëntspecifiek medicatieadvies of alarmsignalen genereert kan dat wel zijn. Ook "alleen intern gebruik" is geen magische vrijstelling; bij structurele klinische inzet kunnen MDR-verplichtingen of in-house-device-regels relevant worden.

## CE-markering en klinische evaluatie

Als AI-software onder MDR valt, is CE-markering nodig voordat het hulpmiddel in de EU op de markt wordt gebracht of in gebruik wordt genomen. Voor klasse IIa, IIb en III is meestal een **notified body** betrokken: een onafhankelijke keuringsinstantie die door de fabrikant wordt ingeschakeld om kwaliteitssysteem en technische documentatie te beoordelen.

CE-markering vraagt meer dan een goede AUC. De fabrikant moet onder meer zorgen voor risicomanagement, cybersecurity, usability, software lifecycle-processen, technische documentatie en klinische evaluatie. Bij AI is vooral belangrijk dat de claim aantoonbaar is. "Detecteert beroerte vroegtijdig" vraagt ander bewijs dan "ordent beelden op acquisitiedatum".

Voor medische software draait klinische evaluatie vaak om drie bewijsblokken:

1. Is de output klinisch logisch verbonden met de aandoening of fysiologische toestand?
2. Genereert het model betrouwbaar en reproduceerbaar de bedoelde output uit de inputdata?
3. Werkt de output in de beoogde populatie, setting, workflow en gebruikersgroep?

Voor AI betekent dit extra aandacht voor datasetrepresentativiteit, bias, generaliseerbaarheid, lokale zorgpaden, menselijke interpretatie en prestaties na implementatie.

## Na livegang: monitoring en updates

AI is na CE-markering niet "af". De fabrikant moet via post-market surveillance gegevens verzamelen over veiligheid en prestaties: klachten, incidenten, gebruikersfeedback, real-world performance, literatuur, klinische follow-up en trends.

Modelupdates zijn gevoelig. Een beveiligingspatch is iets anders dan retraining op nieuwe data, een gewijzigde drempelwaarde, uitbreiding naar een nieuwe indicatie of toepassing in een andere populatie. Elke wijziging vraagt impactanalyse: verandert de intended purpose, prestatie, veiligheid, datainterpretatie of gebruikersinteractie? Dan kan aanvullende validatie, documentatie of notified-body betrokkenheid nodig zijn.

## Praktische checklist

- Welke medische claim staat in documentatie, demo, salesmateriaal of contract?
- Worden patiëntspecifieke gegevens verwerkt?
- Geeft de software een diagnose, voorspelling, risicoscore, alarm of behandeladvies?
- Wordt de output gebruikt voor klinische beslissingen?
- Wat is de mogelijke schade bij fout-positieve of fout-negatieve output?
- Gaat het om lichaamsmateriaal of labdiagnostiek, waardoor IVDR relevant kan zijn?
- Is het een zelfstandig product, module, accessoire of onderdeel van hardware?
- Welke MDR Rule 11-klasse lijkt plausibel?
- Is er klinisch bewijs voor de beoogde populatie, setting en workflow?
- Hoe worden performance drift, updates, incidenten en real-world performance gemonitord?

## Bronnen

- European Commission: [MDR Regulation (EU) 2017/745, EUR-Lex](https://eur-lex.europa.eu/eli/reg/2017/745/oj)
- European Commission/MDCG: [MDCG 2019-11 Rev.1, Qualification and Classification of Software, June 2025](https://health.ec.europa.eu/latest-updates/update-mdcg-2019-11-rev1-qualification-and-classification-software-regulation-eu-2017745-and-2025-06-17_en)
- European Commission/MDCG: [MDCG 2020-1, Clinical Evaluation of Medical Device Software](https://health.ec.europa.eu/system/files/2020-09/md_mdcg_2020_1_guidance_clinic_eva_md_software_en_0.pdf)
- IMDRF: [Software as a Medical Device: Key Definitions](https://www.imdrf.org/documents/software-medical-device-samd-key-definitions)
- IMDRF: [SaMD Clinical Evaluation](https://www.imdrf.org/documents/software-medical-device-samd-clinical-evaluation)
- European Commission/MDCG/AIB: [MDCG 2025-6, Interplay between MDR/IVDR and the AI Act](https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en)

---


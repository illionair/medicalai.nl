---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-10df-7b71-9ebb-e28cc2ad4519.jsonl  ts: 2026-05-03T22:40:32.887Z -->

# Wanneer wordt AI een medisch hulpmiddel? De MDR-bril voor software in de zorg

AI in de zorg voelt vaak als “software”, maar juridisch kan het al snel een medisch hulpmiddel zijn. Niet omdat er AI in zit, maar omdat de software een medische bedoeling heeft en gebruikt wordt voor diagnose, prognose, monitoring of behandeling. Dit artikel is bedoeld als praktische oriëntatie voor zorgprofessionals, onderzoekers en product owners. Het is educatief en geen juridisch advies; betrek bij concrete marktintroductie altijd regulatory, klinische en juridische expertise.

## De kern: intended purpose

De belangrijkste vraag is niet: “Is het AI?” maar: “Waarvoor claimt de fabrikant dat het gebruikt wordt?” De MDR noemt dit de intended purpose: het beoogde gebruik zoals blijkt uit label, gebruiksaanwijzing, marketing, verkoopmateriaal en klinische evaluatie.

Dat betekent: dezelfde algoritmische techniek kan buiten of binnen de MDR vallen afhankelijk van de claim. Een model dat CT-beelden comprimeert voor opslag is iets anders dan een model dat longnoduli detecteert. Een chatbot die algemene uitleg geeft over diabetes is iets anders dan een tool die voor een specifieke patiënt een insuline-aanpassing adviseert.

## SaMD, MDSW en AI: termen zonder mystiek

Internationaal wordt vaak gesproken over SaMD: Software as a Medical Device. Daarmee wordt software bedoeld die zelf een medische functie uitvoert zonder onderdeel te hoeven zijn van een specifiek hardware-medisch hulpmiddel. In Europese guidance wordt meestal Medical Device Software (MDSW) gebruikt. Het gaat om software die, alleen of in combinatie, een medisch doel heeft volgens de MDR of IVDR.

Belangrijk: cloud, app, EPD-module, server of embedded software maakt op zichzelf niet uit. De locatie of technische verpakking bepaalt niet de kwalificatie. Een AI-model in een webapp kan even goed MDSW zijn als software in een scanner.

## Klinische beslisondersteuning: van laag naar hoog risico

Clinical decision support is een breed spectrum. Een naslagwerk, eenvoudige zoekfunctie of algemene richtlijnweergave zal meestal niet als medisch hulpmiddel kwalificeren, zolang het geen patiëntspecifieke analyse uitvoert en geen medische output creëert.

Waarschijnlijk binnen de MDR komt software die patiëntgegevens verwerkt om aanbevelingen, waarschuwingen of scores te geven voor diagnose, prognose, monitoring of therapie. Denk aan:

- AI die mammografieën of CT-scans analyseert en verdachte afwijkingen markeert.
- Een ECG-algoritme dat ritmestoornissen detecteert.
- Een sepsis-alert op basis van vitale parameters en labwaarden.
- Software die antistollingsdosering of chemotherapiedosering adviseert.
- Een EPD-module die patiëntspecifiek nierfunctierisico koppelt aan medicatieadvies.
- Software die een medisch apparaat aanstuurt of beïnvloedt, zoals een closed-loop insulinepomp.

Bij labdiagnostiek of analyse van specimens kan de IVDR in plaats van de MDR relevant zijn.

## Rule 11: de software-regel onder de MDR

Als software eenmaal als medisch hulpmiddel kwalificeert, komt classificatie. Voor veel medische software is Rule 11 uit Annex VIII van de MDR doorslaggevend.

In gewone taal: software die informatie levert die wordt gebruikt voor beslissingen met diagnostisch of therapeutisch doel is meestal klasse IIa. Als een verkeerde beslissing ernstig letsel of een chirurgische interventie kan veroorzaken, kan klasse IIb gelden. Als een verkeerde beslissing kan leiden tot overlijden of onomkeerbare verslechtering van gezondheid, kan klasse III gelden.

Software die fysiologische processen monitort is meestal klasse IIa; monitoring van vitale parameters waarbij variaties direct gevaar kunnen opleveren, kan klasse IIb zijn. “Alle andere software” kan klasse I zijn, maar dat is geen vrijbrief: eerst moet duidelijk zijn dat het überhaupt MDSW is, en andere MDR-regels kunnen ook van toepassing zijn.

## Wanneer valt AI waarschijnlijk buiten MDR?

AI kan buiten de MDR vallen wanneer er geen medische intended purpose is. Voorbeelden:

- Administratie: planning, facturatie, personeelsroosters, voorraadbeheer.
- Communicatie: veilige berichten, videobellen, verwijzingen doorsturen.
- Opslag en overdracht: EPD/PACS-functionaliteit die alleen data bewaart, archiveert, converteert of toont zonder diagnostische verwerking.
- Onderwijs: simulaties, nascholing, algemene medische uitleg.
- Algemene wellness: leefstijl-, fitness- of slaapapps zonder medische claim.
- Onderzoekstools die niet in klinische besluitvorming worden gebruikt en niet op de markt of in gebruik worden genomen voor patiëntenzorg.

Let op de nuance: zodra een module in zo’n systeem medische informatie analyseert, interpreteert of een patiëntspecifieke aanbeveling geeft, kan juist die module wel onder MDR vallen.

## CE-markering: meer dan een sticker

Voor markttoegang in de EU moet een medisch hulpmiddel voldoen aan de MDR en CE-gemarkeerd worden. Voor klasse IIa, IIb en III is doorgaans een notified body betrokken. De fabrikant moet onder meer zorgen voor een kwaliteitsmanagementsysteem, risicomanagement, technische documentatie, cybersecurity, usability, software lifecycle-processen, klinische evaluatie en post-market surveillance.

Bij AI is vooral belangrijk dat claims aantoonbaar zijn. “Detecteert beroerte vroegtijdig” vraagt ander bewijs dan “ordent beelden op acquisitiedatum”. Marketingtaal kan de regulatory scope vergroten.

## Clinical evaluation: bewijs dat de software klinisch klopt

Klinische evaluatie is geen eenmalig document aan het einde van ontwikkeling. Het is een gepland, systematisch en continu proces. Voor MDSW draait het om drie bewijsblokken:

1. Valid clinical association of scientific validity: is de output klinisch logisch verbonden met de aandoening of fysiologische staat?
2. Technical performance: genereert het model betrouwbaar, nauwkeurig en reproduceerbaar de bedoelde output uit de inputdata?
3. Clinical performance: levert de output in de beoogde populatie, setting en workflow klinisch relevante informatie of voordeel op?

Voor AI betekent dit ook aandacht voor generaliseerbaarheid, datasetrepresentativiteit, bias, beoogde gebruikers, workflow, usability en prestaties in de Nederlandse of Belgische praktijk.

## Post-market surveillance en model updates

AI is zelden “af”. Na CE-markering moet de fabrikant actief gegevens verzamelen over kwaliteit, prestaties en veiligheid: klachten, incidenten, gebruikersfeedback, real-world performance, literatuur, PMCF en trends. Voor hogere klassen hoort daar ook periodieke veiligheidsrapportage bij.

Model updates zijn regulatory gevoelig. Een bugfix of securitypatch is iets anders dan retraining op nieuwe data, een nieuwe populatie, een extra indicatie of een gewijzigde drempelwaarde. Elke wijziging vraagt impactanalyse: verandert intended purpose, prestatie, risico, interpretatie van data of gebruikersinterface? Dan kan herbeoordeling, notified-body betrokkenheid of aanvullende klinische validatie nodig zijn.

## Praktische checklist

- Welke medische claim staat in producttekst, handleiding, contract, pitchdeck of demo?
- Worden patiëntspecifieke gegevens verwerkt?
- Levert de AI nieuwe medische informatie, interpretatie, score, alarm of advies?
- Wordt de output gebruikt voor diagnose, prognose, monitoring, triage of behandeling?
- Wat gebeurt er als de output fout-negatief of fout-positief is?
- Is het een zelfstandig product, module, accessoire of onderdeel van hardware?
- Valt het onder MDR of mogelijk IVDR?
- Welke Rule 11-klasse is plausibel?
- Is er klinisch bewijs voor de specifieke populatie, setting en workflow?
- Hoe worden drift, updates, cybersecurity, incidenten en real-world performance gevolgd?

## Bronnen

- European Commission: [MDR Regulation (EU) 2017/745, EUR-Lex](https://eur-lex.europa.eu/eli/reg/2017/745/oj)
- European Commission/MDCG: [MDCG 2019-11 Rev.1, Qualification and Classification of Software, June 2025](https://health.ec.europa.eu/latest-updates/update-mdcg-2019-11-rev1-qualification-and-classification-software-regulation-eu-2017745-and-2025-06-17_en)
- European Commission/MDCG: [MDCG 2020-1, Clinical Evaluation of Medical Device Software](https://health.ec.europa.eu/system/files/2020-09/md_mdcg_2020_1_guidance_clinic_eva_md_software_en_0.pdf)
- IMDRF: [Software as a Medical Device: Key Definitions](https://www.imdrf.org/documents/software-medical-device-samd-key-definitions)
- IMDRF: [SaMD Clinical Evaluation](https://www.imdrf.org/documents/software-medical-device-samd-clinical-evaluation)
- European Commission/MDCG/AIB: [MDCG 2025-6, Interplay between MDR/IVDR and the AI Act](https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en)

---


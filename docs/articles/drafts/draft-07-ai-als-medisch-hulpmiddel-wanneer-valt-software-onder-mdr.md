---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-10df-7b71-9ebb-e28cc2ad4519.jsonl  ts: 2026-05-03T22:43:01.158Z -->

# AI als medisch hulpmiddel: wanneer valt software onder MDR?

AI in de zorg is niet automatisch een medisch hulpmiddel. Een taalmodel, algoritme of dashboard wordt pas regulatoir interessant wanneer de software een **medisch beoogd doel** krijgt: bijvoorbeeld diagnose, monitoring, prognose, behandeling of klinische beslisondersteuning. De kernvraag is dus niet “zit er AI in?”, maar: **wat claimt de aanbieder dat de software doet, voor wie, en met welk klinisch gevolg?**

Dit artikel is een educatieve oriëntatie voor zorgprofessionals, onderzoekers, product owners en klinische beslissers in Nederland en België. Het is geen juridisch advies en vervangt geen beoordeling door regulatory, klinische en juridische experts.

## De sleutelterm: intended purpose

Onder de EU Medical Device Regulation (MDR) draait alles om de **intended purpose**: het beoogde gebruik zoals de fabrikant dat omschrijft in de gebruiksaanwijzing, labels, website, verkoopmateriaal, demo’s, contracten en klinische evaluatie.

Dat maakt de context doorslaggevend. Een algoritme dat beelden sorteert of comprimeert is meestal geen medisch hulpmiddel. Een algoritme dat op dezelfde beelden longnoduli detecteert, segmentaties maakt of maligniteitsrisico voorspelt, komt waarschijnlijk wél in beeld als medische software.

Voor productteams is dit een vroege ontwerpvraag: schrijf niet pas aan het einde een intended purpose. De intended purpose bepaalt of de software onder MDR of IVDR valt, welke risicoklasse waarschijnlijk is, welke klinische onderbouwing nodig is en hoe updates mogen worden beheerd.

## SaMD en Medical Device Software

Internationaal wordt vaak gesproken over **Software as a Medical Device** (SaMD): software die een medische functie uitvoert zonder onderdeel te hoeven zijn van specifieke hardware. In Europese guidance wordt meestal **Medical Device Software** (MDSW) gebruikt. Het gaat om software die, alleen of in combinatie, een doel vervult dat past binnen de definitie van medisch hulpmiddel of in-vitrodiagnostisch medisch hulpmiddel.

Of de software draait in de cloud, in een app, in een EPD-module, op een lokaal ziekenhuisnetwerk of embedded in een apparaat, is niet beslissend. De medische functie is beslissend.

## Klinische beslisondersteuning: vaak het kantelpunt

**Clinical decision support** is een glijdende schaal. Algemene richtlijninformatie, educatieve uitleg of een zoekfunctie in protocollen valt meestal buiten MDR, zolang de software geen patiëntspecifieke medische interpretatie of aanbeveling genereert.

Waarschijnlijk binnen MDR komt software die patiëntgegevens verwerkt om klinisch relevante output te leveren, zoals:

- een sepsis-alert op basis van vitale parameters en labwaarden;
- AI-detectie van afwijkingen op CT, MRI, mammografie of ECG;
- een score voor beroerterisico, heropnamerisico of therapierespons;
- patiëntspecifiek medicatie-, dosis- of behandeladvies;
- software die een medisch apparaat aanstuurt of beïnvloedt.

Als de software informatie geeft op basis van specimens uit het menselijk lichaam, zoals bloed, urine, weefsel of feces, kan de **IVDR** in plaats van de MDR relevant zijn.

## Rule 11: waarom veel medische software klasse IIa of hoger wordt

Voor veel medische software is **Rule 11** uit Annex VIII van de MDR bepalend. Kort gezegd: software die informatie levert die wordt gebruikt voor diagnostische of therapeutische beslissingen valt meestal in **klasse IIa**. Als een verkeerde beslissing kan leiden tot ernstige verslechtering of een chirurgische interventie, kan **klasse IIb** gelden. Als een verkeerde beslissing kan leiden tot overlijden of onomkeerbare verslechtering van de gezondheid, kan **klasse III** gelden.

Software die fysiologische processen monitort is doorgaans klasse IIa. Monitoring van vitale parameters waarbij variaties direct gevaar kunnen opleveren, kan klasse IIb zijn.

“Alle andere software” kan klasse I zijn, maar dat is geen standaarduitkomst. Eerst moet helder zijn of de software überhaupt MDSW is, daarna welke classificatieregel past bij de intended purpose en het risico.

## Wanneer valt AI waarschijnlijk buiten MDR?

AI kan buiten MDR vallen wanneer er geen medische intended purpose is. Denk aan:

- planning, administratie, facturatie, roostering en voorraadbeheer;
- communicatie- of videobelsoftware zonder medische interpretatie;
- opslag, archivering of overdracht van patiëntgegevens zonder analyse;
- EPD-functionaliteit die alleen registreert of toont;
- algemene educatie, training of literatuurondersteuning;
- wellness- of leefstijlapps zonder medische claim;
- vroege onderzoeksprototypes die niet klinisch worden ingezet.

Let op: een niet-medisch platform kan medische modules bevatten. Een EPD is niet automatisch MDR-software, maar een EPD-module die patiëntspecifiek medicatieadvies of alarmsignalen genereert kan dat wél zijn. Ook “alleen intern gebruik” is geen magische vrijstelling; bij structurele klinische inzet kunnen MDR-verplichtingen of in-house-device-regels relevant worden.

## CE-markering en klinische evaluatie

Als AI-software onder MDR valt, is CE-markering nodig voordat het hulpmiddel in de EU op de markt wordt gebracht of in gebruik wordt genomen. Voor klasse IIa, IIb en III is normaal gesproken een notified body betrokken. CE-markering vraagt meer dan een goed model: denk aan kwaliteitsmanagement, risicomanagement, software lifecycle, cybersecurity, usability, technische documentatie, klinische evaluatie en post-market surveillance.

De **clinical evaluation** moet aantonen dat de software veilig presteert en het beoogde klinische voordeel behaalt. Voor medische software worden vaak drie bewijsblokken onderscheiden:

1. **Valid clinical association**: is de output klinisch logisch en wetenschappelijk onderbouwd gekoppeld aan de aandoening of fysiologische staat?
2. **Technical performance**: genereert de software betrouwbaar en reproduceerbaar de bedoelde output?
3. **Clinical performance**: werkt de output in de bedoelde populatie, setting, workflow en gebruikersgroep?

Voor AI betekent dit extra aandacht voor datasetkwaliteit, bias, generaliseerbaarheid, lokale zorgpaden, menselijke interpretatie en prestaties na implementatie.

## Post-market surveillance en model updates

AI is na CE-markering niet “af”. De fabrikant moet via **post-market surveillance** actief gegevens verzamelen over veiligheid, prestaties, klachten, incidenten, gebruikersfeedback, real-world performance, literatuur en trends.

Model updates zijn regulatoir gevoelig. Een beveiligingspatch is iets anders dan retraining op nieuwe data, wijziging van drempelwaarden, uitbreiding naar een nieuwe indicatie of toepassing in een andere populatie. Elke update vraagt impactanalyse: verandert de intended purpose, prestatie, veiligheid, datainterpretatie of gebruikersinteractie? Dan kan aanvullende validatie, documentatie of notified-body betrokkenheid nodig zijn.

## Praktische checklist

Gebruik deze vragen als eerste triage, niet als formele classificatie:

- Welke medische claim staat in documentatie, demo, salesmateriaal of contract?
- Worden patiëntspecifieke gegevens verwerkt?
- Geeft de software een diagnose, voorspelling, risicoscore, alarm of behandeladvies?
- Wordt de output gebruikt voor klinische beslissingen?
- Wat is de mogelijke schade bij fout-positieve of fout-negatieve output?
- Gaat het om lichaamsmateriaal of labdiagnostiek, waardoor IVDR relevant kan zijn?
- Is het een zelfstandige tool, module, accessoire of onderdeel van hardware?
- Welke MDR Rule 11-klasse lijkt plausibel?
- Is er klinisch bewijs voor de beoogde populatie en setting?
- Hoe worden performance drift, updates, incidenten en real-world performance gemonitord?

## Visualisatiepakket

### Figuurideeën

1. **Beslisboom: valt deze AI onder MDR?**  
   Verticale flowchart: `software/AI` → `intended purpose` → `medisch doel?` → `patiëntspecifieke analyse?` → `diagnose/therapie/monitoring/prognose?` → `MDR`, `IVDR`, `buiten MDR` of `nader beoordelen`.

2. **Rule 11-risicoladder**  
   Horizontale ladder met klassen `I`, `IIa`, `IIb`, `III`. X-as: ernst van mogelijke schade door verkeerde output. Plaats voorbeelden op de ladder: administratie, algemene CDS, sepsis-alert, therapiebeslissing met levensbedreigend risico.

3. **Lifecycle-cirkel voor AI-medical-device software**  
   Cirkel: intended purpose → classificatie → klinische evaluatie → CE-markering → post-market surveillance → model-update-impactanalyse → terug naar evaluatie.

4. **Modulaire EPD-kaart**  
   Blokdiagram van een EPD-platform met administratieve modules, communicatie, viewer, AI-alarmmodule en AI-diagnosemodule. Gebruik kleurcodering: niet-MDSW, mogelijk MDSW, waarschijnlijk MDSW.

### Interactieve component

Een eenvoudige **React quiz/calculator** past goed: 8-10 vragen over medische claim, patiëntspecifieke data, klinische output, mogelijke schade, IVDR-signalen en apparaatbesturing. Output: `waarschijnlijk buiten MDR`, `mogelijk MDR/IVDR`, `waarschijnlijk MDSW`, plus disclaimer: educatief, geen juridisch advies. Een simpele SVG-beslisboom met klikbare stappen zou ook sterk werken.

### Afbeeldingen/video’s om op te zoeken of te gebruiken

- Europese Commissie infographic: zoekterm `European Commission Is your software a Medical Device infographic MDCG`.
- IMDRF SaMD Clinical Evaluation schema: zoekterm `IMDRF SaMD clinical evaluation valid clinical association analytical validation clinical validation`.
- CORE-MD visual over AI-MDSW-risico: zoekterm `CORE-MD clinical risk score AI medical device software figure`.
- BSI webinar over AI en medische hulpmiddelen: zoekterm `BSI Interplay of Medical Devices and AI webinar`.

## Referenties

### Wetenschappelijke bronnen

- **CORE-MD clinical risk score for regulatory evaluation of artificial intelligence-based medical device software — Rademakers et al., npj Digital Medicine, 2025.**  
  Gebruikt voor nuance over klinische evaluatie van AI-MDSW, valid clinical association, technical performance, clinical performance en lifecycle-risico.  
  DOI: https://doi.org/10.1038/s41746-025-01459-8

- **Regulating Artificial Intelligence and Machine Learning-Enabled Medical Devices in Europe and the United Kingdom — Li, Williams, Gilbert & Anderson, Law, Technology and Humans, 2023.**  
  Gebruikt voor achtergrond over regulatoire uitdagingen bij lerende AI/ML-medische hulpmiddelen en modelwijzigingen.  
  DOI: https://doi.org/10.5204/lthj.3073

### Richtlijnen, regelgeving en tools

- **Regulation (EU) 2017/745 on medical devices — European Parliament and Council, 2017.**  
  Gebruikt voor MDR-definities, intended purpose, Rule 11, CE-markering, clinical evaluation en post-market surveillance.  
  URL: https://eur-lex.europa.eu/eli/reg/2017/745/oj

- **MDCG 2019-11 Rev.1, Guidance on Qualification and Classification of Software in Regulation (EU) 2017/745 and Regulation (EU) 2017/746 — Medical Device Coordination Group, update 2025.**  
  Gebruikt voor MDSW-kwalificatie, softwaremodules, intended purpose, Rule 11-uitleg en voorbeelden van software binnen/buiten MDR.  
  URL: https://health.ec.europa.eu/latest-updates/update-mdcg-2019-11-rev1-qualification-and-classification-software-regulation-eu-2017745-and-2025-06-17_en

- **MDCG 2020-1, Guidance on Clinical Evaluation (MDR) / Performance Evaluation (IVDR) of Medical Device Software — Medical Device Coordination Group, 2020.**  
  Gebruikt voor clinical evaluation, clinical evidence, technical performance, clinical performance en post-market data bij MDSW.  
  URL: https://health.ec.europa.eu/system/files/2020-09/md_mdcg_2020_1_guidance_clinic_eva_md_software_en_0.pdf

- **Software as a Medical Device: Key Definitions — IMDRF/SaMD WG/N10FINAL, 2013.**  
  Gebruikt voor de definitie van SaMD.  
  URL: https://www.imdrf.org/documents/software-medical-device-samd-key-definitions

- **Software as a Medical Device: Clinical Evaluation — IMDRF/SaMD WG/N41FINAL, 2017.**  
  Gebruikt voor het driedelige evaluatiekader: valid clinical association, analytical/technical validation en clinical validation.  
  URL: https://www.imdrf.org/documents/software-medical-device-samd-clinical-evaluation

- **Regulation (EU) 2024/1689, Artificial Intelligence Act — European Parliament and Council, 2024.**  
  Gebruikt als context voor AI-systemen die ook onder productveiligheidswetgeving zoals MDR/IVDR kunnen vallen.  
  URL: https://eur-lex.europa.eu/eli/reg/2024/1689/oj

- **MDCG 2025-6 / AIB 2025-1, Interplay between MDR/IVDR and the Artificial Intelligence Act — MDCG/AIB, 2025.**  
  Gebruikt voor de nuance dat AI-medische hulpmiddelen naast MDR/IVDR ook AI Act-verplichtingen kunnen raken.  
  URL: https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en

### Visual/video-bronnen

- **Infographic: Is your software a Medical Device? — European Commission, 2021.**  
  Voorgesteld als basis/inspiratie voor de MDR-beslisboom.  
  URL: https://health.ec.europa.eu/publications/infographic-your-software-medical-device_en

- **Software as a Medical Device: Clinical Evaluation — IMDRF, 2017.**  
  Voorgesteld als bron voor een eigen Nederlandstalige visual van de drie bewijsblokken.  
  URL: https://www.imdrf.org/documents/software-medical-device-samd-clinical-evaluation

- **CORE-MD clinical risk score figure — Rademakers et al., npj Digital Medicine, 2025.**  
  Voorgesteld als inspiratie voor een risicovisual rond AI-MDSW en klinische evaluatie.  
  DOI: https://doi.org/10.1038/s41746-025-01459-8

- **Interplay of Medical Devices and AI — BSI webinar, jaar niet vermeld op geraadpleegde pagina.**  
  Voorgesteld als educatieve video-/presentatiebron over MDR, AI Act en notified-body-perspectief.  
  URL: https://www.bsigroup.com/en-US/insights-and-media/media/webinars/interplay-of-medical-devices-and-ai/

---

## Interactieve module

```html
<interactive name="mdr-claim-checker"></interactive>
```


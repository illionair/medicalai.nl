---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-43-37-019df002-f0a8-7722-a4f9-de355c1d43ba.jsonl  ts: 2026-05-03T22:45:57.851Z -->

# De AI faalt zelden alleen op het model: waarom slimme zorg-AI strandt in de workflow

AI in de zorg wordt vaak beoordeeld op sensitiviteit, specificiteit, AUC of nauwkeurigheid. Maar in het ziekenhuis faalt een systeem meestal op iets alledaagsers: het past niet in het werk. Een waarschuwing komt te laat, verschijnt bij de verkeerde professional, vraagt om een actie waarvoor niemand eigenaar is, of verdwijnt tussen tientallen andere meldingen. Dit artikel is bedoeld als educatief implementatiekader voor ziekenhuizen en klinische AI-teams, niet als medisch of juridisch advies.

## 1. Workflow mismatch: de stille hoofdreden

Een AI-model kan technisch goed presteren en toch klinisch weinig waarde leveren. De kernvraag is niet: “Is het model accuraat?” maar: “Verandert de output op het juiste moment een haalbare beslissing?”

Workflow mismatch ontstaat wanneer de AI-uitkomst niet aansluit op bestaande taken, rollen, overdrachten en besluitmomenten. Denk aan een risico-inschatting voor verslechtering die verschijnt nadat de visite is afgerond, een radiologie-algoritme dat een extra reviewstap creëert zonder capaciteitsplanning, of een sepsis-alert die een verpleegkundige ziet terwijl de vervolgstap bij de arts-assistent ligt.

Goede implementatie begint daarom met workflow mapping: waar ontstaat de klinische onzekerheid, wie kan handelen, welke gegevens zijn dan beschikbaar, en wat is de minimale actie die het systeem moet ondersteunen? Zonder die analyse wordt AI een extra scherm, niet een betere zorgstap.

## 2. Alert fatigue en automation bias: twee tegengestelde risico’s

AI-systemen falen vaak doordat gebruikers óf te weinig vertrouwen hebben, óf te veel.

Bij alert fatigue worden zorgprofessionals ongevoelig voor meldingen. Dat gebeurt vooral bij hoge volumes, herhaalde meldingen, onduidelijke urgentie en lage positieve voorspellende waarde. Een alert die “mogelijk risico” zegt maar negen van de tien keer geen nuttige actie oplevert, concurreert met medicatiebewaking, labuitslagen, telefoons, piepers en overdrachten. Uiteindelijk wordt wegklikken een rationele werkstrategie.

Automation bias is het spiegelbeeld: gebruikers volgen het systeem te gemakkelijk. Dit kan leiden tot commission errors, waarbij een onjuist advies wordt overgenomen, of omission errors, waarbij men niet verder kijkt omdat het systeem niets meldt. Training moet daarom niet alleen uitleggen hoe de knop werkt, maar ook wanneer de AI waarschijnlijk faalt, welke patiëntgroepen minder goed vertegenwoordigd zijn, hoe onzekerheid wordt getoond, en hoe afwijkende klinische intuïtie wordt gedocumenteerd.

## 3. Timing: een goede voorspelling kan te vroeg of te laat zijn

Timing is een ontwerpbeslissing, geen detail. Een vroeg alarmsignaal geeft meer reactietijd, maar vaak ook meer fout-positieven. Een laat signaal is specifieker, maar kan klinisch nutteloos zijn. Voor implementatieleiders is daarom de vraag: wat is het handelingsvenster?

Een AI-output moet gekoppeld worden aan een concrete beslissing: extra observatie, labcontrole, consult, medicatiecheck, triage, follow-up of bespreking in MDO. Als de output buiten dat venster valt, ontstaat ruis. De beste timing kan per afdeling verschillen: SEH, IC, verpleegafdeling, polikliniek en diagnostische ketens hebben elk een ander ritme.

## 4. EPD-integratie: niet alleen technisch, maar klinisch

EPD-integratie wordt vaak besproken als API-, HL7- of FHIR-vraagstuk. Dat is nodig, maar onvoldoende. De klinische integratie gaat over zichtbaarheid, context en actieerbaarheid.

Een goede AI-integratie toont de output op de plek waar de beslissing al wordt genomen. Ze beperkt extra klikken, verklaart kort waarom de melding relevant is, toont de belangrijkste inputfactoren of onzekerheid, en biedt een directe vervolgstap. Bijvoorbeeld: order set openen, taak toewijzen, notitie starten, consult aanvragen of alert snoozen met reden.

Vermijd “losse dashboards” die alleen door enthousiaste projectleden worden bekeken. Als de AI buiten de EPD-routine leeft, wordt gebruik afhankelijk van geheugen en motivatie. Dat houdt zelden stand in nachtdiensten, personeelstekort of piekbelasting.

## 5. Verantwoordelijkheden: wie is eigenaar van de volgende stap?

Elke AI-output moet een operationeel eigenaarschap hebben. Wie ziet de melding? Wie beoordeelt haar? Wie mag handelen? Wie is verantwoordelijk bij afwijken? Wie monitort performance? Wie zet het systeem tijdelijk uit bij storing of drift?

Zonder duidelijke afspraak over wie het alarm ziet, wie het beoordeelt, wie ingrijpt en wie problemen oplost, ontstaat schijnveiligheid. De verpleegkundige dacht dat de arts het zag; de arts dacht dat het AI-team monitorde; het AI-team dacht dat de afdeling eigenaar was. Klinische AI vraagt daarom om governance: CMIO, medisch specialist, verpleegkundige vertegenwoordiging, data science, EPD-beheer, kwaliteit & veiligheid, privacy/security en juridisch advies moeten vooraf afspraken maken over gebruik, escalatie en wijzigingsbeheer.

## 6. Lokale context en change management

AI reist slecht zonder lokale validatie. Patiëntpopulatie, meetfrequentie, labapparatuur, registratiediscipline, triageprotocollen en personeelsmix verschillen per instelling. Een model dat elders goed werkt, kan lokaal slechter kalibreren of een onwerkbare alertlast veroorzaken.

Change management begint vóór livegang. Betrek eindgebruikers bij ontwerp, simuleer casussen, draai het systeem tijdelijk in silent mode, test op verschillende diensten, en organiseer feedbacksessies na de eerste weken. Maak zichtbaar welke feedback tot aanpassingen leidt. Dat vergroot vertrouwen meer dan een algemene belofte dat “het algoritme gevalideerd is”.

## 7. Monitoring en feedbackloops

AI-implementatie is geen project met een einddatum, maar een leerproces. Monitor minimaal: modelprestatie, kalibratie, alertvolume, responstijd, override-redenen, vervolgacties, incidentmeldingen, verschillen tussen patiëntgroepen, technische beschikbaarheid en klinische uitkomsten waar passend.

Belangrijk is de feedbackloop: kunnen gebruikers melden dat een alert onzinnig, te laat of onduidelijk was? Wordt die feedback beoordeeld? Is er een procedure voor drempelaanpassing, hertraining, tijdelijke pauzering of de-implementatie? Een AI-systeem zonder onderhoudsritme wordt langzaam minder betrouwbaar, zelfs als het bij start veelbelovend was.

## Praktische checklist voor implementatieleiders

- Is de klinische beslissing waarvoor AI bedoeld is scherp gedefinieerd?
- Komt de output bij de professional die daadwerkelijk kan handelen?
- Verschijnt de output binnen het juiste handelingsvenster?
- Is de vervolgstap direct uitvoerbaar in het EPD?
- Zijn alertvolume, prioriteit en herhaalfrequentie vooraf getest?
- Is duidelijk wie verantwoordelijk is voor beoordeling, actie, escalatie en monitoring?
- Hebben gebruikers training gekregen over beperkingen, onzekerheid en automation bias?
- Is lokale validatie gedaan op eigen data en eigen workflow?
- Is er een change-managementplan met champions, simulaties en nazorg?
- Zijn performance, gebruik, veiligheid en feedback structureel belegd?

## Visualisatiepakket

**Figuurideeën**
1. Swimlane “van modelscore naar klinische actie”: patiëntdata, model, EPD, verantwoordelijke rol, actie, feedback.
2. Timingkaart: AI-output afgezet tegen visite, overdracht, labronde, MDO en ontslagmoment.
3. Alert fatigue-funnel: alle alerts, klinisch relevante alerts, opgevolgde alerts, uitkomstimpact. Zo'n funnel laat zien waar meldingen onderweg hun waarde verliezen: bij te veel volume, onduidelijke urgentie, geen eigenaar of geen uitvoerbare vervolgstap.
4. Governance-matrix: klinisch eigenaar, CMIO, data science, EPD-team, kwaliteit & veiligheid.

**Interactieve component**
Een “workflow-fit simulator” waarin gebruikers drempelwaarde, alertfrequentie, ontvanger en timing aanpassen. De tool toont fictieve effecten op alertlast, gemiste casussen, responstijd en benodigde capaciteit.

**Afbeelding/video-zoekbronnen**
- AHRQ / CDS Connect; zoekterm: “clinical decision support five rights workflow AHRQ”; bronvoorkeur: officiële AHRQ-pagina’s.
- ONC SAFER Guides; zoekterm: “SAFER Guides computerized provider order entry decision support monitoring alerts”; bronvoorkeur: officiële ONC/PDF.
- FDA MLMD Transparency; zoekterm: “machine learning enabled medical device transparency workflow FDA”; bronvoorkeur: FDA/Health Canada/MHRA.
- CHI/Google Research; zoekterm: “Beede human-centered evaluation deep learning deployed clinics diabetic retinopathy video”; bronvoorkeur: Google Research, ACM, CHI-talk.

## Referenties

### Wetenschappelijke bronnen
- Bates et al., “Ten Commandments for Effective Clinical Decision Support”, JAMIA, 2003. Reden: juiste informatie, juiste persoon, juiste moment. DOI: https://doi.org/10.1197/jamia.M1370  
- Carayon et al., “Work system design for patient safety: the SEIPS model”, Quality & Safety in Health Care, 2006. Reden: sociotechnische workflowanalyse. DOI: https://doi.org/10.1136/qshc.2005.015842  
- Goddard, Roudsari & Wyatt, “Automation bias”, JAMIA, 2012. Reden: risico’s en mitigatie van oververtrouwen in beslisondersteuning. DOI: https://doi.org/10.1136/amiajnl-2011-000089  
- Ancker et al., “Effects of workload, work complexity, and repeated alerts on alert fatigue”, BMC Medical Informatics and Decision Making, 2017. Reden: alert fatigue-mechanismen. DOI: https://doi.org/10.1186/s12911-017-0430-8  
- Beede et al., “A Human-Centered Evaluation of a Deep Learning System Deployed in Clinics”, CHI, 2020. Reden: lokale workflow en context bij AI-deployments. DOI: https://doi.org/10.1145/3313831.3376718  
- Wong et al., “External Validation of a Widely Implemented Proprietary Sepsis Prediction Model”, JAMA Internal Medicine, 2021. Reden: lokale validatie, alertlast en klinische waarde. DOI: https://doi.org/10.1001/jamainternmed.2021.2626  
- Sendak et al., “A Path for Translation of Machine Learning Products into Healthcare Delivery”, EMJ Innovations, 2020. Reden: lifecycle, implementatie en monitoring. DOI: https://doi.org/10.33590/emjinnov/19-00172  

### Richtlijnen en tools
- WHO, “Ethics and governance of artificial intelligence for health”, 2021. Reden: governance, verantwoordelijkheid en ethiek. URL: https://www.who.int/publications/i/item/9789240029200  
- FDA/Health Canada/MHRA, “Good Machine Learning Practice for Medical Device Development”, 2021; IMDRF-update 2025. Reden: human-AI team, lifecycle en monitoring. URL: https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles  
- FDA/Health Canada/MHRA, “Transparency for Machine Learning-Enabled Medical Devices”, 2024. Reden: timing, context, gebruikersinformatie en workflow. URL: https://www.fda.gov/medical-devices/software-medical-device-samd/transparency-machine-learning-enabled-medical-devices-guiding-principles  
- NICE, “Evidence standards framework for digital health technologies”, bijgewerkt 2022. Reden: bewijsstandaarden voor digitale en adaptieve technologie. URL: https://www.nice.org.uk/corporate/ecd7  
- ONC, “SAFER Guides”, 2025, pagina bijgewerkt 2026. Reden: EPD-veiligheid, CPOE/CDS en organisatorische verantwoordelijkheden. URL: https://healthit.gov/clinical-quality-and-safety/safer-guides/  
- AHRQ, “CDS Connect” en “How to Implement Evidence Using Clinical Decision Support”, 2012/2019. Reden: implementatie, vijf rechten van CDS, monitoring en borging. URL: https://www.ahrq.gov/cpi/about/otherwebsites/cds-connect/index.html

---


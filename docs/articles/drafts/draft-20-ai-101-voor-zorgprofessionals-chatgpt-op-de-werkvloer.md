---
status: draft
source: user-request
created: 2026-05-06
needs_review: true
audience: zorgprofessionals
format: e-learning
---

# AI 101 voor zorgprofessionals: ChatGPT en AI op de werkvloer

## Doel van deze e-learning

Deze e-learning helpt zorgprofessionals om generatieve AI, zoals ChatGPT, Copilot, Gemini of Claude, veilig en verantwoord te gebruiken op de werkvloer. De module gaat niet over programmeren of AI bouwen. Het gaat over dagelijkse vragen:

- Mag ik een patientbrief in ChatGPT zetten?
- Mag ik AI gebruiken om een tekst begrijpelijker te maken?
- Mag AI helpen bij triage, diagnose of behandeladvies?
- Wat zegt de AVG, het beroepsgeheim, de AI Act en de MDR hierover?
- Waarom zijn sommige dingen verboden of onverstandig, ook als ze technisch makkelijk kunnen?

De korte versie:

> AI mag ondersteunen, maar mag nooit ongemerkt patientgegevens, beroepsgeheim, privacy, klinisch oordeel of professionele verantwoordelijkheid overnemen.

Deze tekst is educatief bedoeld en is geen juridisch advies. Volg altijd het actuele beleid van je eigen zorgorganisatie.

## Leerdoelen

Na deze e-learning kan de deelnemer:

1. Uitleggen wat generatieve AI wel en niet betrouwbaar kan.
2. Herkennen wanneer AI-gebruik privacyrisico's of een datalek kan veroorzaken.
3. Uitleggen waarom gezondheidsgegevens extra beschermd zijn.
4. Verschil maken tussen laag-risico administratief gebruik en hoog-risico klinisch gebruik.
5. Bepalen wanneer een AI-toepassing mogelijk een medisch hulpmiddel is.
6. Een veilige prompt maken zonder herleidbare patientgegevens.
7. AI-output kritisch controleren voordat die wordt gebruikt.
8. Weten wanneer je lokaal beleid, privacy officer, FG, CISO, jurist, medisch manager of AI-team moet betrekken.

## Module 1 - Wat is generatieve AI?

Generatieve AI is software die nieuwe tekst, beelden, code, samenvattingen of antwoorden kan maken op basis van een opdracht. ChatGPT is een bekend voorbeeld. Zo'n systeem voorspelt welk antwoord waarschijnlijk past bij jouw vraag. Het "begrijpt" de zorgcontext niet zoals een zorgprofessional dat doet.

### Wat kan AI goed?

AI kan helpen bij taalwerk:

- Een tekst korter of duidelijker maken.
- Een eerste concept maken voor een algemene folder.
- Een ingewikkelde uitleg herschrijven naar B1-taal.
- Een checklist maken voor een overleg.
- Een onderwijsquiz maken.
- Een niet-patientgebonden tekst vertalen of structureren.
- Brainstormen over algemene communicatie.

### Wat kan AI niet betrouwbaar?

AI kan overtuigend klinken terwijl het antwoord onjuist is. Dit heet hallucinatie: het model verzint feiten, bronnen, richtlijnen, doseringen of redeneringen die plausibel lijken.

AI kent bovendien niet automatisch:

- De actuele richtlijn van jouw organisatie.
- De volledige context van een patient.
- Medicatiehistorie, contra-indicaties of uitzonderingen.
- Lokale werkafspraken.
- De juridische status van de tool die jij gebruikt.
- Of de output veilig genoeg is voor gebruik in zorgverlening.

### Praktijkzin

Gebruik AI alsof je een snelle, taalvaardige assistent hebt die soms met veel zelfvertrouwen fouten maakt.

## Module 2 - De gouden regel: geen herleidbare patientgegevens in publieke AI

Voer geen herleidbare patientgegevens in een publieke AI-chatbot in.

Onder herleidbare patientgegevens vallen niet alleen naam en geboortedatum, maar ook combinaties van gegevens waardoor iemand alsnog herkenbaar kan worden:

- Initialen, leeftijd, woonplaats, beroep of zeldzame diagnose.
- Datum van opname, operatie of consult.
- Labwaarden met een uniek ziekteverloop.
- Dossierfragmenten, verwijsbrieven, ontslagbrieven of correspondentie.
- Foto's, scans, geluidsopnames of transcripties.
- BSN, patientnummer, telefoonnummer, e-mailadres of adres.
- Gegevens van familieleden of mantelzorgers.

### Waarom mag dit niet?

Gezondheidsgegevens zijn volgens de AVG bijzondere persoonsgegevens. Die zijn extra gevoelig en extra beschermd. Als je zulke gegevens in een publieke chatbot zet, kunnen ze terechtkomen bij een externe aanbieder, in logs, op servers buiten je organisatie of in processen die jij niet overziet.

De Autoriteit Persoonsgegevens waarschuwt dat het invoeren van persoonsgegevens in AI-chatbots kan leiden tot datalekken. In de zorg is dat extra ernstig, omdat patientgegevens onder het medisch beroepsgeheim vallen.

Ook als je denkt "ik vraag alleen om een samenvatting", blijft het invoeren van de tekst een verwerking en mogelijk doorgifte van persoonsgegevens.

### Belangrijk verschil

Niet elke AI-tool is hetzelfde.

Een publieke gratis chatbot is iets anders dan een door de zorgorganisatie goedgekeurde AI-toepassing met:

- Beveiligingsbeoordeling.
- Verwerkersovereenkomst.
- Duidelijke bewaartermijnen.
- Afspraak dat data niet worden gebruikt voor modeltraining.
- Toegangsbeheer.
- Logging en incidentprocedure.
- DPIA waar nodig.
- Duidelijke instructies voor zorgprofessionals.

Maar ook bij een goedgekeurde tool geldt: gebruik alleen waarvoor de tool is beoordeeld en toegestaan.

## Module 3 - Wat mag meestal wel?

Onderstaande voorbeelden zijn meestal laag risico, zolang er geen patientgegevens, bedrijfsgevoelige gegevens of vertrouwelijke informatie in staan.

### 1. Algemene patientinformatie herschrijven

Voorbeeldprompt:

> Herschrijf deze algemene uitleg over hoge bloeddruk naar B1-taal. Gebruik korte zinnen en vermijd vakjargon. Er staan geen patientgegevens in de tekst.

Waarom dit meestal mag:

- De tekst gaat niet over een concrete patient.
- Er worden geen gezondheidsgegevens van een herkenbaar persoon gedeeld.
- De zorgprofessional controleert de inhoud voordat die wordt gebruikt.

Let op:

- Controleer medische juistheid.
- Controleer of de tekst past bij lokale afspraken.
- Controleer of de toon geschikt is voor de doelgroep.

### 2. Een neutrale e-mail of agenda maken

Voorbeeldprompt:

> Maak een korte agenda voor een teamoverleg over wachttijden op de polikliniek. Gebruik een zakelijke toon.

Waarom dit meestal mag:

- Er staan geen patientgegevens in.
- Het gaat om algemene ondersteuning van werkprocessen.

Niet doen:

> Maak een mail over patient Jansen, geboren op 3 maart 1948, die boos is over de uitslag van zijn CT.

Waarom niet:

- Naam, geboortedatum, onderzoek en situatie maken de patient herleidbaar.
- Je deelt medische en mogelijk emotionele informatie met een externe tool.
- Dit kan een datalek en schending van het beroepsgeheim zijn.

### 3. Een checklist of scholingsmateriaal maken

Voorbeeldprompt:

> Maak vijf toetsvragen voor verpleegkundigen over veilige omgang met AI-chatbots. Richt je op privacy, beroepsgeheim en controle van output.

Waarom dit meestal mag:

- Het is onderwijsinhoud.
- Er is geen concrete patient.
- De output wordt nog beoordeeld door een mens.

### 4. Algemene uitleg vragen

Voorbeeldprompt:

> Leg in eenvoudige taal uit wat het verschil is tussen sensitiviteit en specificiteit. Geef aan dat ik bronnen moet controleren.

Waarom dit meestal mag:

- Het is algemene kennis.
- Er wordt geen medische beslissing genomen voor een concrete patient.

Let op:

- Vraag AI niet om definitieve medische of juridische conclusies.
- Controleer bij richtlijnen altijd de originele bron.

## Module 4 - Wat mag niet, en waarom niet?

### Niet doen 1 - Een dossier of ontslagbrief in ChatGPT plakken

Voorbeeld:

> Vat deze ontslagbrief samen voor de huisarts: [volledige ontslagbrief]

Waarom dit niet mag:

- Een ontslagbrief bevat gezondheidsgegevens en vaak direct herleidbare gegevens.
- Je deelt informatie buiten de vertrouwde zorgomgeving.
- De aanbieder van de chatbot kan toegang krijgen tot de ingevoerde tekst.
- Dit kan een datalek zijn.
- Het kan het medisch beroepsgeheim schenden.

Wat kan wel:

- Gebruik alleen een door de organisatie goedgekeurde samenvattingstool.
- Controleer of de tool voor dit doel is toegestaan.
- Gebruik geen publieke AI-chatbot.
- Laat de zorgprofessional de samenvatting altijd controleren.

### Niet doen 2 - AI vragen om diagnose of behandeladvies voor een concrete patient

Voorbeeld:

> Deze patient heeft koorts, thoracale pijn, verhoogde D-dimeer en nierfunctiestoornis. Welke diagnose is het meest waarschijnlijk en wat moet ik voorschrijven?

Waarom dit niet mag met een publieke of niet-gevalideerde chatbot:

- Het gaat om klinische besluitvorming voor een concrete patient.
- AI kan hallucineren of belangrijke context missen.
- Fout advies kan directe schade veroorzaken.
- De tool is meestal niet gevalideerd als medisch hulpmiddel.
- Als software bedoeld is voor diagnose, behandeling, monitoring of voorspelling, kan de MDR van toepassing zijn.
- De zorgprofessional blijft eindverantwoordelijk en mag die verantwoordelijkheid niet verschuiven naar een chatbot.

Wat kan soms wel:

- Algemene differentiaaldiagnostische kennis opzoeken zonder patientgegevens.
- Een gevalideerd, goedgekeurd klinisch beslisondersteunend systeem gebruiken binnen het afgesproken proces.
- AI-output alleen gebruiken als hulpmiddel, niet als zelfstandig besluit.

### Niet doen 3 - Een consult opnemen en laten uitwerken zonder goedgekeurde werkwijze

Voorbeeld:

> Ik zet mijn telefoon op tafel en laat een AI-app automatisch meeluisteren en het consultverslag maken.

Waarom dit niet zomaar mag:

- Een consult bevat zeer gevoelige gezondheidsgegevens.
- Opname en transcriptie zijn extra verwerkingen van persoonsgegevens.
- De patient moet weten wat er gebeurt.
- De organisatie moet weten waar audio, transcript en output worden opgeslagen.
- Er moeten afspraken zijn over toestemming, beveiliging, bewaartermijn, verwijderen, logging en toegang.
- De zorgverlener moet het verslag controleren.

Wat kan mogelijk wel:

- Een door de organisatie goedgekeurde AI-scribe gebruiken.
- Alleen volgens lokaal beleid.
- Met duidelijke patientinformatie en waar nodig toestemming.
- Met afspraken over opslag, training, toegang en verwijderen.

### Niet doen 4 - AI-output rechtstreeks in het dossier zetten

Voorbeeld:

> ChatGPT maakt een samenvatting en die plak ik zonder controle in het EPD.

Waarom dit niet mag:

- AI kan fouten, verzinsels of verkeerde nuances bevatten.
- Het medisch dossier moet juist, relevant en zorgvuldig zijn.
- Een fout in het dossier kan latere zorgbeslissingen beinvloeden.
- De zorgprofessional is verantwoordelijk voor wat in het dossier staat.

Wat kan wel:

- AI-output als concept gebruiken binnen een goedgekeurde tool.
- Alles inhoudelijk controleren.
- Onjuistheden verwijderen.
- Duidelijk blijven wie de professionele beoordeling heeft gedaan.

### Niet doen 5 - Vertrouwelijke organisatie-informatie invoeren

Voorbeeld:

> Analyseer deze interne incidentmelding, inclusief namen van medewerkers en afdelingen.

Waarom dit niet mag:

- Het kan persoonsgegevens van medewerkers bevatten.
- Het kan bedrijfsgevoelige of vertrouwelijke informatie bevatten.
- Incidentmeldingen kunnen juridische en reputatierisico's hebben.
- De organisatie heeft mogelijk specifieke regels voor veilig melden en leren.

Wat kan wel:

- Een volledig geanonimiseerde, algemene leerpuntenlijst laten herschrijven.
- Een goedgekeurde interne tool gebruiken.
- Eerst afstemmen met privacy, kwaliteit of juridische afdeling.

## Module 5 - De wet- en regelgeving in gewone taal

### AVG/GDPR

De AVG geldt voor het verwerken van persoonsgegevens. Gezondheidsgegevens zijn bijzondere persoonsgegevens. In de zorg betekent dit: wees extra streng met doel, noodzaak, beveiliging, toegang, bewaartermijn en delen met derden.

Waarom dit belangrijk is voor AI:

- Een prompt invoeren is ook gegevens verwerken.
- Een chatbotaanbieder kan een derde partij zijn.
- Opslag in logs of gebruik voor training kan een nieuw doel zijn.
- De patient weet vaak niet dat diens gegevens worden ingevoerd.

### Beroepsgeheim en WGBO

Zorgprofessionals hebben een beroepsgeheim. Dat betekent dat informatie die je door je beroep over een patient weet, niet zomaar met anderen mag worden gedeeld.

Waarom dit belangrijk is voor AI:

- Een externe AI-aanbieder is niet automatisch onderdeel van de behandelrelatie.
- "Ik wilde alleen hulp met formuleren" maakt het delen niet automatisch toegestaan.
- Toestemming, noodzaak, beveiliging en lokale afspraken blijven relevant.

### EU AI Act

De Europese AI Act is sinds 1 augustus 2024 in werking getreden en wordt stapsgewijs van toepassing. Sinds 2 februari 2025 gelden onder meer bepalingen over AI-geletterdheid en verboden AI-praktijken. Organisaties die AI-systemen gebruiken moeten zorgen dat medewerkers voldoende AI-geletterd zijn, passend bij hun rol en de context.

Waarom dit belangrijk is voor zorgprofessionals:

- Zorgmedewerkers moeten weten wat AI wel en niet kan.
- De risico's voor patienten zijn groter dan in veel andere sectoren.
- Menselijk toezicht, transparantie en verantwoord gebruik zijn geen bijzaak.

### MDR en IVDR

AI-software kan een medisch hulpmiddel zijn als de software een medisch doel heeft, zoals diagnose, preventie, monitoring, voorspelling, prognose of behandeling. Dan gelden strengere eisen, zoals CE-markering en risicobeoordeling.

Waarom dit belangrijk is:

- Een algemene teksthulp is meestal geen medisch hulpmiddel.
- Een tool die diagnose of behandeling ondersteunt mogelijk wel.
- Een zorgorganisatie moet weten waarvoor een AI-tool bedoeld en goedgekeurd is.
- Een algemene LLM is meestal niet automatisch geschikt voor zorgverlening.

### IGJ-toezicht en kwaliteit van zorg

De IGJ roept zorgaanbieders op om generatieve AI zorgvuldig in te voeren. De impact op patientenzorg is soms nog onbekend. Daarom zijn risicoanalyse, beleid, scholing, monitoring en professionele controle nodig.

Waarom dit belangrijk is:

- Nieuwe technologie kan zorg verbeteren, maar ook nieuwe fouten introduceren.
- Een fout antwoord kan klinisch, juridisch en ethisch grote gevolgen hebben.
- Zorgaanbieders moeten veilige producten en veilig gebruik organiseren.

## Module 6 - Beslisboom: mag ik AI hiervoor gebruiken?

Gebruik deze vragen voordat je een AI-tool gebruikt.

### Stap 1 - Gaat het over een concrete patient?

Ja:

- Gebruik geen publieke AI-chatbot.
- Check of er een goedgekeurde zorgtool en lokaal beleid is.
- Vraag bij twijfel je leidinggevende, privacy officer, FG of AI-team.

Nee:

- Ga door naar stap 2.

### Stap 2 - Staat er informatie in waardoor iemand herkenbaar kan zijn?

Ja:

- Niet invoeren.
- Eerst verwijderen, generaliseren of een goedgekeurde tool gebruiken.
- Let op: echte anonimisering is moeilijker dan alleen naam weghalen.

Nee:

- Ga door naar stap 3.

### Stap 3 - Heeft de output invloed op diagnose, triage, behandeling of medicatie?

Ja:

- Hoog risico.
- Gebruik alleen gevalideerde en goedgekeurde systemen.
- Menselijke klinische beoordeling is verplicht.

Nee:

- Ga door naar stap 4.

### Stap 4 - Is de tool goedgekeurd door je organisatie?

Ja:

- Gebruik de tool alleen volgens het toegestane doel.
- Volg instructies over opslag, data, prompts en controle.

Nee:

- Gebruik alleen voor algemene, niet-vertrouwelijke taken.
- Deel geen persoonsgegevens, patientgegevens of interne vertrouwelijke informatie.

### Stap 5 - Kun je de output controleren?

Nee:

- Niet gebruiken voor professioneel handelen.

Ja:

- Controleer inhoud, bron, actualiteit, toon en risico voordat je de output gebruikt.

## Module 7 - Praktijkscenario's

### Scenario 1 - Folder begrijpelijker maken

Je hebt een algemene tekst over bloeddrukmeting zonder patientgegevens. Je vraagt AI om de tekst eenvoudiger te maken.

Mag dit?

Ja, meestal wel.

Waarom:

- Geen concrete patient.
- Geen bijzondere persoonsgegevens.
- Laag-risico taalbewerking.

Voorwaarde:

- Medische inhoud controleren.
- Geen bronloze medische claims toevoegen.

### Scenario 2 - Dossier samenvatten

Je hebt weinig tijd en plakt een volledig EPD-fragment in ChatGPT om een samenvatting te maken.

Mag dit?

Nee.

Waarom:

- Het EPD-fragment bevat gezondheidsgegevens.
- De patient is waarschijnlijk direct of indirect herleidbaar.
- De externe aanbieder kan toegang krijgen tot de data.
- Dit kan een datalek en schending van het beroepsgeheim zijn.

Veiliger alternatief:

- Gebruik een goedgekeurde interne tool.
- Vraag je organisatie of er beleid is voor AI-samenvattingen.

### Scenario 3 - Diagnosecheck

Je voert klachten, labwaarden en voorgeschiedenis in en vraagt: "Wat is de diagnose?"

Mag dit?

Niet met een publieke of niet-gevalideerde AI-tool.

Waarom:

- Concrete patientgegevens.
- Klinische besluitvorming.
- Risico op hallucinerend of onvolledig advies.
- Mogelijk medisch hulpmiddel zonder juiste borging.

Veiliger alternatief:

- Raadpleeg richtlijnen, supervisor of gevalideerd beslisondersteunend systeem.
- Gebruik AI alleen voor algemene uitleg zonder patientgegevens.

### Scenario 4 - Algemene uitleg voor scholing

Je vraagt AI: "Leg uit wat bias in medische AI betekent en geef drie voorbeelden voor verpleegkundigen."

Mag dit?

Ja, meestal wel.

Waarom:

- Geen patientgegevens.
- Educatief doel.
- Output kan gecontroleerd worden.

Let op:

- Controleer of voorbeelden kloppen.
- Vermeld dat AI-output niet automatisch betrouwbaar is.

### Scenario 5 - AI-scribe tijdens consult

Een leverancier biedt een AI-tool aan die consulten opneemt en automatisch verslag maakt.

Mag dit?

Alleen als de organisatie dit zorgvuldig heeft goedgekeurd en ingericht.

Waarom:

- Audio en transcript bevatten gevoelige gezondheidsgegevens.
- Er is risico op opslag, doorgifte, training of ongeautoriseerde toegang.
- Patienten moeten weten wat er gebeurt.
- De zorgverlener moet het verslag controleren.

Vragen vooraf:

- Is er een verwerkersovereenkomst?
- Wordt data gebruikt voor training?
- Waar wordt data opgeslagen?
- Hoe lang wordt audio bewaard?
- Is toestemming of expliciete informatie aan de patient nodig?
- Wie controleert en accordeert het verslag?

## Module 8 - Veilige prompts

### Onveilige prompt

> Maak een verwijsbrief voor Jan de Vries, 74 jaar, COPD GOLD 3, opname vorige week wegens pneumonie, gebruikt prednison en woont in Breda.

Probleem:

- Direct herleidbaar.
- Medische gegevens.
- Locatie en leeftijd verhogen herkenbaarheid.

### Veilige prompt

> Maak een algemene structuur voor een verwijsbrief van een patient met een chronische longaandoening na een recente ziekenhuisopname. Gebruik placeholders zoals [reden verwijzing], [relevante voorgeschiedenis] en [medicatie]. Voeg geen medische adviezen toe.

Waarom veiliger:

- Geen herkenbare patient.
- Geen echte medische details.
- Output is een sjabloon, geen dossierinhoud.

### Onveilige prompt

> Vat deze klachtmelding samen en noem wie fout zat: [interne melding met namen].

Probleem:

- Persoonsgegevens van medewerkers en mogelijk patienten.
- Vertrouwelijke incidentinformatie.
- AI kan onterecht schuld toewijzen.

### Veilige prompt

> Maak een neutraal sjabloon voor het samenvatten van een incidentmelding. Gebruik kopjes voor feiten, impact, directe actie, leerpunten en vervolgactie. Gebruik geen oordeel over schuld.

Waarom veiliger:

- Geen echte casusdata.
- Ondersteunt proces, niet inhoudelijk oordeel.

## Module 9 - Toetsvragen

### Vraag 1

Je wilt een patientbrief in ChatGPT plakken om die naar B1-taal te herschrijven. Wat is het beste antwoord?

A. Dat mag altijd, want het doel is patientvriendelijke communicatie.  
B. Dat mag als je alleen de naam verwijdert.  
C. Dat mag niet met een publieke chatbot als de patient nog herleidbaar is.  
D. Dat mag als je de output controleert.

Correct antwoord: C.

Uitleg:

Alleen de naam verwijderen is vaak niet genoeg. Gezondheidsgegevens, datums, leeftijd, diagnose en context kunnen iemand nog steeds herleidbaar maken. Invoer in een publieke chatbot kan een datalek en schending van het beroepsgeheim opleveren.

### Vraag 2

Waarom moet AI-output altijd gecontroleerd worden voordat die in zorgcommunicatie wordt gebruikt?

A. Omdat AI nooit Nederlands kan schrijven.  
B. Omdat AI overtuigend onjuiste informatie kan geven.  
C. Omdat AI alleen voor programmeurs bedoeld is.  
D. Omdat controle alleen nodig is bij betaalde tools.

Correct antwoord: B.

Uitleg:

Generatieve AI kan hallucineren. De tekst kan goed klinken, maar toch medisch onjuist, verouderd, incompleet of misleidend zijn.

### Vraag 3

Wanneer kan AI-software mogelijk een medisch hulpmiddel zijn?

A. Als de software een medisch doel heeft, zoals diagnose of behandelondersteuning.  
B. Als de software duur is.  
C. Als de software tekst kan samenvatten.  
D. Als de software in een ziekenhuis wordt gebruikt.

Correct antwoord: A.

Uitleg:

Onder de MDR gaat het om het beoogde medische doel. Software voor diagnose, behandeling, monitoring of voorspelling kan een medisch hulpmiddel zijn en moet dan aan strengere eisen voldoen.

### Vraag 4

Wat is een veilige toepassing van een publieke AI-chatbot?

A. Een volledig consultverslag samenvatten.  
B. Labwaarden laten interpreteren voor een concrete patient.  
C. Een algemene folder zonder patientgegevens herschrijven naar eenvoudiger taal.  
D. Een foto van een wond uploaden voor diagnose.

Correct antwoord: C.

Uitleg:

Algemene tekst zonder patientgegevens is veel lager risico. De andere opties bevatten patientgegevens en/of klinische besluitvorming.

### Vraag 5

Wat vraagt de AI Act onder meer van organisaties die AI gebruiken?

A. Dat alle AI-systemen verboden worden.  
B. Dat medewerkers voldoende AI-geletterd zijn voor hun rol en context.  
C. Dat alleen artsen AI mogen gebruiken.  
D. Dat AI-output altijd automatisch juist is.

Correct antwoord: B.

Uitleg:

De AI Act bevat een verplichting rond AI-geletterdheid. Medewerkers die AI gebruiken moeten voldoende begrijpen wat de mogelijkheden, beperkingen en risico's zijn.

## Module 10 - Werkafspraken voor teams

Bespreek als team deze minimale afspraken:

1. Welke AI-tools mogen we gebruiken?
2. Voor welke taken mogen we die tools gebruiken?
3. Welke gegevens mogen nooit worden ingevoerd?
4. Wie beoordeelt nieuwe AI-tools?
5. Wanneer is een DPIA nodig?
6. Wanneer betrekken we de FG, CISO, jurist, medisch manager of cliëntenraad?
7. Hoe informeren we patienten bij AI-gebruik in het consult?
8. Wie controleert AI-output?
9. Hoe melden we fouten of incidenten?
10. Hoe houden we beleid actueel?

## Samenvatting voor op een poster

Gebruik AI veilig in de zorg:

- Geen herleidbare patientgegevens in publieke AI.
- Geen dossier, brief, foto, audio of labwaarden in ChatGPT.
- Gebruik AI niet als zelfstandige arts, verpleegkundige of triagist.
- Controleer altijd de output.
- Gebruik alleen goedgekeurde tools voor zorgprocessen.
- Vraag bij twijfel: privacy officer, FG, CISO, leidinggevende of AI-team.
- Jij blijft professioneel verantwoordelijk.

## Bronnen en verdiepende links

- Autoriteit Persoonsgegevens, "Caution: use of AI chatbot may lead to data breaches", 6 augustus 2024. https://autoriteitpersoonsgegevens.nl/en/current/caution-use-of-ai-chatbot-may-lead-to-data-breaches
- Autoriteit Persoonsgegevens, "Gezondheid". Gezondheidsgegevens zijn bijzondere persoonsgegevens. https://autoriteitpersoonsgegevens.nl/themas/gezondheid
- Autoriteit Persoonsgegevens, "De AVG in het kort". https://autoriteitpersoonsgegevens.nl/nl/onderwerpen/algemene-informatie-avg/algemene-informatie-avg
- KNMG, dossier "Artificial Intelligence (AI)", bijgewerkt 9 april 2026. https://www.knmg.nl/actueel/dossiers/digitale-zorg-1/artificial-intelligence-ai
- KNMG, "Beroepsgeheim". https://www.knmg.nl/ik-ben-geneeskundestudent-1/ethische-toolkit/dilemmas-begrippen/beroepsgeheim
- Inspectie Gezondheidszorg en Jeugd, "IGJ roept zorgaanbieders op: ga zorgvuldig om met invoering van generatieve AI-toepassingen", 10 februari 2025. https://www.igj.nl/documenten/2025/02/10/igj-roept-zorgaanbieders-op-ga-zorgvuldig-om-met-invoering-van-generatieve-ai-toepassingen
- Inspectie Gezondheidszorg en Jeugd, "Veilige producten". Software kan een medisch hulpmiddel zijn bij diagnostische of therapeutische functie. https://www.igj.nl/onderwerpen/themas-in-het-toezicht/digitale-zorg/veilige-producten
- Europese Unie, Regulation (EU) 2024/1689, Artificial Intelligence Act. https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- Europese Commissie, "Artificial Intelligence in healthcare". https://health.ec.europa.eu/ehealth-digital-health-and-care/artificial-intelligence-healthcare_en
- Europese Commissie, AI Act Service Desk, implementation timeline. https://ai-act-service-desk.ec.europa.eu/en/ai-act/eu-ai-act-implementation-timeline


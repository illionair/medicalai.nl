---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-45-38-019df004-c963-7191-aee9-237854311f6e.jsonl  ts: 2026-05-03T22:47:16.626Z -->

# RAG in de zorg: een uitlegbare brug tussen medische kennis en generatieve AI

## Korte intro
Retrieval augmented generation, meestal RAG genoemd, is een manier om generatieve AI te laten antwoorden met behulp van opgehaalde bronnen: richtlijnen, protocollen, formularia, literatuur, lokale werkafspraken of patiëntvrije kennisdocumenten. Voor medische toepassingen is dat aantrekkelijk, omdat zorgkennis snel verandert en beslissingen verantwoord moeten kunnen worden. RAG maakt een taalmodel echter niet automatisch “veilig” of klinisch juist. Het is een architectuur die brongebruik mogelijk maakt; de governance, evaluatie en menselijke controle bepalen of het bruikbaar is.

Dit artikel is educatief bedoeld en is geen medisch, juridisch of implementatieadvies.

## Wat RAG doet
Een klassiek taalmodel antwoordt vooral vanuit patronen die tijdens training zijn geleerd. Bij RAG krijgt het model eerst relevante passages uit een gecontroleerde kennisbank. Daarna formuleert het een antwoord op basis van die passages. In medische context kan de vraag bijvoorbeeld zijn: “Wat zegt ons protocol over antistolling rond een endoscopie?” Het systeem zoekt relevante tekstfragmenten, voegt die als context toe en vraagt het model om alleen daarop te antwoorden.

De kernbelofte is groundedness: een antwoord moet herleidbaar zijn tot concrete bronnen. Groundedness is sterker dan “klinkt logisch”; het betekent dat beweringen door de opgehaalde passages worden gedragen. Daarom hoort een medische RAG-output broncitatie te tonen: titel, versie/datum, paragraaf of passage, en liefst een link naar het brondocument.

## Embeddings, chunking en vector search
Om documenten vindbaar te maken, worden ze meestal opgeknipt in chunks: kleine tekstblokken van bijvoorbeeld enkele alinea’s. Die chunks krijgen embeddings: numerieke representaties van betekenis. Een vector search zoekt vervolgens chunks waarvan de embedding lijkt op de embedding van de vraag.

Embeddings groeperen teksten op betekenis, niet op woordkeuze: als een bibliotheek die boeken op thema sorteert in plaats van op titel. Dat werkt anders dan zoeken op exacte trefwoorden. Een vraag over “bloedverdunners” kan passages over “anticoagulantia” vinden. Dat is krachtig, maar ook riskant als de betekenis verkeerd wordt opgepakt: semantisch nabije tekst is niet altijd klinisch relevant. Goed chunking-ontwerp is daarom cruciaal. Een chunk moet klein genoeg zijn om precies te zijn, maar groot genoeg om aanbeveling, uitzondering, populatie en contra-indicatie bij elkaar te houden. Voor richtlijnen zijn metadata vaak net zo belangrijk als de tekst: specialisme, doelgroep, publicatiedatum, autorisatie, revisiestatus, lokale geldigheid en bewijskracht.

## Richtlijnen, protocollen en updatebaarheid
Medische RAG-systemen zijn zo goed als hun corpus. Een kennisbank met oude pdf’s, dubbele protocollen en onduidelijke versies levert schijnzekerheid. Begin daarom met bronhiërarchie: lokale protocollen, nationale richtlijnen, formularia, patiënteninformatie en wetenschappelijke literatuur hebben elk een andere status. Leg vast wat voorgaat bij conflict. Bijvoorbeeld: “lokaal geautoriseerd protocol boven algemene tekst, tenzij expliciet verlopen.”

Updatebaarheid is een groot voordeel van RAG. Je hoeft het taalmodel niet opnieuw te trainen wanneer een richtlijn wijzigt; je vervangt of herindexeert de bron. Maar dat moet traceerbaar gebeuren: versiebeheer, indexdatum, changelog, automatische signalering van verlopen documenten en tests op bekende vragen na elke update.

## Hallucinaties blijven mogelijk
RAG vermindert hallucinaties, maar elimineert ze niet. Een model kan een bron verkeerd samenvatten, een ontbrekende aanbeveling invullen, citaties te breed gebruiken of conflicterende passages gladstrijken. Ook retrieval kan falen: het systeem haalt de verkeerde chunk op, mist een uitzondering of vindt alleen een oude versie.

Daarom moet een medische RAG-assistent kunnen weigeren: “Ik vind hiervoor geen voldoende bron in de kennisbank.” Dat is geen zwakte, maar een veiligheidsfunctie. Voor klinische beslissingen hoort het systeem ondersteunend te zijn, niet autonoom beslissend.

## Toegang, privacy en beveiliging
Niet elk document en niet elke vraag hoort voor iedereen beschikbaar te zijn. RAG voor zorg vraagt role-based access control: een OK-protocol, apotheekdocument of bestuursnotitie kan andere toegangsrechten hebben. Als patiëntgegevens worden gebruikt, gelden extra eisen rond dataminimalisatie, logging, bewaartermijnen, verwerkersafspraken, versleuteling en mogelijk scheiding tussen patiëntdata en algemene kennis.

Een belangrijk ontwerpprincipe: indexeer geen identificeerbare patiëntinformatie tenzij het use-case, toestemming/grondslag, beveiliging en governance expliciet zijn ingericht. Let ook op prompt injection in documenten: een kwaadwillende of vervuilde bron kan instructies bevatten zoals “negeer alle veiligheidsregels”. Documenten moeten dus als data worden behandeld, niet als vertrouwde instructies.

## Evaluatie: wat meet je?
Evalueer RAG op meerdere lagen. Retrievalkwaliteit: vindt het systeem de juiste bron bij bekende vragen? Antwoordkwaliteit: is het antwoord correct, volledig, begrijpelijk en passend bij de doelgroep? Citatiekwaliteit: ondersteunen de geciteerde passages echt de claims? Veiligheid: weigert het systeem bij onvoldoende bronmateriaal, buiten-scope vragen of conflicterende informatie?

Gebruik een testset met echte, geanonimiseerde kennisvragen uit kliniek, bibliotheek en beleid. Voeg failure modes toe: verouderde richtlijn, afkortingen, synoniemen, meertalige termen, zeldzame uitzonderingen, pediatrie versus volwassenen, lokaal versus landelijk protocol. Laat inhoudsdeskundigen blind beoordelen en monitor na livegang op feedback, incidenten en drift.

## Praktische checklist
- Is de bronhiërarchie vastgelegd, inclusief lokale protocollen versus externe richtlijnen?
- Heeft elke bron metadata: eigenaar, datum, versie, status, doelgroep en vervaldatum?
- Zijn chunks getest op behoud van klinische context, uitzonderingen en contra-indicaties?
- Toont elk antwoord broncitatie met passage of paragraaf?
- Kan het systeem onzekerheid tonen en weigeren bij onvoldoende bewijs?
- Worden retrieval, antwoord, citatie en gebruikersfeedback apart gelogd?
- Zijn privacy, toegangsrechten, verwerkersafspraken en audit trails ingericht?
- Is er een evaluatieset met bekende vragen en risicovolle randgevallen?
- Is er een procedure voor updates, herindexering en regressietests?
- Is duidelijk dat de output beslisondersteunend is en geen vervanging van professionele beoordeling?

## Belangrijkste failure modes
De gevaarlijkste fouten zijn niet altijd spectaculaire hallucinaties. Vaak gaat het om subtiele missers: een richtlijn voor de verkeerde populatie, een oud protocol, een ontbrekende contra-indicatie, een verkeerd geïnterpreteerde tabel, of een antwoord dat één bron citeert maar een bredere claim doet. Andere failure modes zijn OCR-fouten in pdf’s, afkortingen met meerdere betekenissen, bias naar veelvoorkomende documenten, en overmatige zekerheid in de toon.

## Visualisatiepakket
Figuurideeën:
1. Pipeline: vraag → embedding → vector search → retrieved chunks → LLM → antwoord met bronnen.
2. “Goede versus slechte chunk”: laat zien hoe een aanbeveling zonder uitzondering gevaarlijk incompleet wordt.
3. Bronhiërarchiekaart: lokaal protocol, nationale richtlijn, literatuur, patiëntinformatie.
4. Failure-mode matrix: retrievalfout, generatiefout, citatiefout, updatefout.

Interactieve component:
- Mini-demo waarin gebruikers chunkgrootte aanpassen en zien welke passages bij dezelfde klinische vraag worden opgehaald.

Afbeelding/video-zoekbronnen:
- CDC PHIL: zoek “clinical documentation”, “public health data”, “healthcare worker computer”; voorkeur voor officiële publieke gezondheidsbeelden.
- Wikimedia Commons / SMART Servier Medical Art: zoek “medical informatics”, “clinical decision support”, “healthcare AI”; voorkeur voor CC-gelicentieerde illustraties.
- IBM Technology video: zoek “What is Retrieval-Augmented Generation RAG IBM”; bruikbaar als algemene RAG-uitleg.
- TensorFlow Embedding Projector: zoek “embedding projector vector visualization”; bruikbaar voor interactieve uitleg van embeddings.

## Referenties

### Wetenschappelijke bronnen
- Lewis et al., “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks”, 2020. Basispublicatie voor RAG-concept. https://arxiv.org/abs/2005.11401  
- Zakka et al., “Almanac: Retrieval-Augmented Language Models for Clinical Medicine”, NEJM AI, 2024. Klinische toepassing van retrieval-augmented language models. DOI: 10.1056/aioa2300068  
- Kresevic et al., “Optimization of hepatological clinical guidelines interpretation by large language models”, npj Digital Medicine, 2024. Voorbeeld van RAG bij richtlijninterpretatie. DOI: 10.1038/s41746-024-01091-y  
- Azamfirei et al., “Large language models and the perils of their hallucinations”, Critical Care, 2023. Risico van hallucinaties in medische context. DOI: 10.1186/s13054-023-04393-x  

### Richtlijnen/tools
- WHO, “Ethics and governance of large multi-modal models”, 2024. Governance en risico’s van generatieve AI in gezondheid. https://www.who.int/news/item/18-01-2024-who-releases-ai-ethics-and-governance-guidance-for-large-multi-modal-models  
- NIST, “AI Risk Management Framework 1.0”, 2023. Risicomanagementkader voor AI-systemen. DOI: 10.6028/NIST.AI.100-1  
- NIST, “Generative AI Profile”, 2024. Specifieke risico’s van generatieve AI. DOI: 10.6028/NIST.AI.600-1  
- Federatie Medisch Specialisten, Richtlijnendatabase. Bronvoorkeur voor Nederlandse medisch-specialistische richtlijnen. https://demedischspecialist.nl/kennisinstituut/expertise/richtlijnen/richtlijnendatabase  
- NHG-Richtlijnen. Bronvoorkeur voor huisartsenzorg. https://richtlijnen.nhg.org/  

### Visual/video/interactief
- IBM, “What is Retrieval-Augmented Generation?” Algemene visuele uitleg van RAG. https://www.ibm.com/think/videos/rag  
- TensorFlow Embedding Projector. Interactieve visualisatie van embeddings. https://projector.tensorflow.org/  
- CDC Public Health Image Library. Publieke gezondheidsbeelden. https://phil.cdc.gov/  
- Wikimedia Commons SMART Servier Medical Art. CC-gelicentieerde medische illustraties. https://commons.wikimedia.org/wiki/Commons:SMART-Servier_Medical_Art

---

## Interactieve module

```html
<interactive name="rag-chunking-demo"></interactive>
```


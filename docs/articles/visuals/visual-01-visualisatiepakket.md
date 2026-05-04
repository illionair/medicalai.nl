---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-10df-7b71-9ebb-e28cc2ad4519.jsonl  ts: 2026-05-03T22:41:01.906Z -->

## Visualisatiepakket

### Figuurideeën

1. **Beslisboom: valt deze AI onder MDR?**  
   Layout als verticale flowchart:  
   `AI/software` → `intended purpose?` → `medisch doel?` → `patiëntspecifieke analyse?` → `diagnose/therapie/monitoring/prognose?` → `MDR, IVDR of buiten scope`.  
   Gebruik kleurcodes: groen = waarschijnlijk buiten MDR, oranje = nader beoordelen, rood = waarschijnlijk MDSW.

2. **Rule 11-risicoladder**  
   Horizontale ladder met klassen `I`, `IIa`, `IIb`, `III`.  
   X-as: impact van verkeerde output.  
   Voorbeelden op de ladder: administratieve software → beslisondersteuning → sepsis-alarm → therapiebeslissing met risico op overlijden/onherstelbare schade.

3. **Lifecycle-cirkel voor AI-medical-device software**  
   Cirkelvormige infographic: `intended purpose` → `risicoklasse` → `klinische evaluatie` → `CE-markering` → `post-market surveillance` → `model update impact assessment` → terug naar klinische evaluatie.  
   Leg visueel de boodschap vast dat AI na CE-markering niet “klaar” is.

4. **Modulekaart van een EPD/AI-platform**  
   Blokdiagram met meerdere modules: planning, opslag, berichten, viewer, AI-diagnosemodule, alarmmodule.  
   Laat zien dat niet het hele platform automatisch MDR-software is, maar dat specifieke modules met medische claims wel MDSW kunnen zijn.

### Interactieve component

**MDR-screener als quiz/calculator**  
Een eenvoudige React-component of webformulier met 8-10 vragen:

- Heeft de software een medische claim?
- Worden patiëntspecifieke gegevens gebruikt?
- Geeft de software diagnose-, prognose-, monitoring- of therapie-informatie?
- Stuurt of beïnvloedt de software een medisch hulpmiddel?
- Worden specimens/labdata geïnterpreteerd?
- Wat is het mogelijke gevolg van een foutieve output?
- Wordt de software commercieel beschikbaar gesteld of klinisch ingezet?

Output: `waarschijnlijk buiten MDR`, `mogelijk MDR/IVDR: specialistisch beoordelen`, `waarschijnlijk MDSW`, of `mogelijk IVDR`.  
Plaats er duidelijk bij: educatief hulpmiddel, geen juridisch advies en geen formele classificatie.

Geschikte vorm: **quiz + beslisboom + risicoladder**. Voor dit onderwerp is een calculator/passende checklist sterker dan een simulatie.

### Afbeeldingen of video’s om op te zoeken

1. **Europese Commissie / MDCG infographic**  
   Zoekterm: `European Commission is your software a medical device infographic MDCG`  
   Voorkeur: officiële Europese Commissie-pagina of PDF.

2. **IMDRF SaMD clinical evaluation schema**  
   Zoekterm: `IMDRF SaMD clinical evaluation valid clinical association analytical validation clinical validation figure`  
   Bruikbaar voor een eigen, Nederlandstalige hertekening van de drie bewijsblokken.

3. **MDR Rule 11 educational explainer**  
   Zoekterm: `MDR Rule 11 software medical device classification explainer notified body`  
   Voorkeur: notified bodies, Europese regulatoren, universiteiten of erkende medtech-opleiders.

4. **AI medical device lifecycle / post-market monitoring**  
   Zoekterm: `AI medical device post-market surveillance model update clinical evaluation`  
   Zoek bij voorkeur naar educatieve webinars of slides van Europese toezichthouders, MDCG-gerelateerde presentaties, IMDRF of gerenommeerde notified bodies.

### Aanbevolen visuele vorm

Een **infographic** met beslisboom en Rule 11-ladder past het best bij het artikel. Voor online publicatie zou ik daarnaast een kleine **React quiz/calculator** maken: snel, praktisch en precies geschikt voor product owners en klinische teams die willen inschatten wanneer regulatory expertise nodig is.

---


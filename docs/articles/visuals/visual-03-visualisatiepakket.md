---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-38-19-019deffe-12fe-7b31-9a4b-c4ef30992b88.jsonl  ts: 2026-05-03T22:40:32.285Z -->

## Visualisatiepakket

**Figuurideeën die we zelf kunnen maken**

1. **Implementatietrap van klinische AI**  
   Horizontale flow van links naar rechts: `retrospective validation` → `silent trial / shadow mode` → `pilot` → `live deployment` → `post-market monitoring`.  
   Per stap: doel, zichtbaarheid voor clinici, invloed op zorgbesluit, belangrijkste risico’s en go/no-go criteria. Dit werkt goed als eenvoudige infographic of SVG/React component.

2. **Beslismatrix: wanneer mag je door naar de volgende fase?**  
   Tabel of heatmap met rijen zoals performance, calibratie, datakwaliteit, workflowfit, logging, incidentproces, menselijke verantwoordelijkheid en stopcriteria. Kolommen: retrospectief, shadow mode, pilot, live.  
   Gebruik kleurcodering: rood = blocker, oranje = nader onderzoek, groen = akkoord. Past goed als checklist-infographic.

3. **Monitoringdashboard na live deployment**  
   Mock-up van een dashboard met vier panelen: technische status, modelperformance, driftindicatoren en klinische veiligheidssignalen.  
   Mogelijke assen: tijd op de x-as; alertvolume, missing data, calibratie-afwijking of false positive rate op de y-as. Dit maakt duidelijk dat AI-monitoring meer is dan “model draait/niet draait”.

4. **Incident- en stopcriteria-flow**  
   Flowchart: signaal uit monitoring of clinician report → triage → ernstclassificatie → tijdelijke mitigatie → root-cause analyse → besluit: door, aanpassen, pauzeren of stoppen.  
   Benadruk dat stopcriteria vooraf zijn vastgesteld en niet pas tijdens een incident worden bedacht.

**Interactieve component**

Een **“deployment readiness simulator”** past hier sterk. De gebruiker kiest per fase waarden of toggles, bijvoorbeeld: externe validatie gedaan, silent trial afgerond, logging compleet, subgroup performance acceptabel, incidentproces getest, rollback beschikbaar. De component toont vervolgens: `niet klaar`, `klaar voor silent trial`, `klaar voor pilot` of `klaar voor gecontroleerde live deployment`.  
Vorm: interactieve React-checklist, slider of kleine calculator. Voeg expliciet toe dat de uitkomst educatief is en geen medisch, juridisch of regulatoir oordeel vervangt.

**Afbeeldingen of video’s om op te zoeken/gebruiken**

1. Zoekterm: `FDA Good Machine Learning Practice medical device AI lifecycle monitoring`  
   Bronvoorkeur: FDA of IMDRF. Geschikt voor visuals rond lifecycle management, monitoring en modelwijzigingen.

2. Zoekterm: `WHO ethics governance artificial intelligence health human oversight`  
   Bronvoorkeur: WHO. Geschikt voor illustraties of citaten rond menselijke verantwoordelijkheid, transparantie en governance.

3. Zoekterm: `NICE evidence standards framework digital health technologies evaluation`  
   Bronvoorkeur: NICE. Bruikbaar voor visuals over bewijsniveaus, evaluatie en implementatie van digitale gezondheidstechnologie.

4. Zoekterm: `clinical AI silent trial shadow mode workflow diagram`  
   Bronvoorkeur: peer-reviewed artikelen, universitaire ziekenhuizen of academische AI-centra. Gebruik dit vooral als inspiratie; maak bij voorkeur een eigen vereenvoudigde infographic om auteursrecht en contextproblemen te vermijden.

Een korte **quiz** kan ook passend zijn, bijvoorbeeld: “Is deze situatie retrospectieve validatie, shadow mode, pilot of live deployment?” Dat helpt implementatieteams de fasen scherp te onderscheiden zonder te suggereren dat één quiz een governancebesluit kan vervangen.


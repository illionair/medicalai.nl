---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-53-18-019df00b-cecc-7d42-bf94-e6272baaa0bd.jsonl  ts: 2026-05-03T22:54:06.171Z -->

**Controle Agent C Review**

Beperking: volledige drafts 1-4 zie ik hier niet, alleen via samenvatting. Dus voor `10-minuten AI-artikel beoordelen`, `interne vs externe validatie`, `AUC`, en `calibratie` kan ik alleen controleren dat ze thematisch sterk zijn, niet of hun visualisatiepakket al compleet is.

**1. Visuals Die Sterk Zijn**

- `AI als medisch hulpmiddel / MDR`: sterkste visual package. Beslisboom, Rule 11-ladder, lifecycle-cirkel en claim-checker zijn concreet en goed bouwbaar.
- `Data leakage`: heel geschikt voor interactieve uitleg. De “lekkende pijplijn”, index-time muur en simulator met toggles zijn precies het soort visuals dat complexe ML-fouten begrijpelijk maakt.
- `Clinical utility`: decision curve + drempel-schuifregelaar is hoogwaardig en klinisch relevant. Dit kan een kernfeature van de hub worden.
- `RAG in de zorg`: pipeline + chunking-demo is sterk. Vooral “goede vs slechte chunk” maakt het tastbaar.
- `Workflow-falen`: swimlane, timingkaart en alert fatigue funnel zijn praktisch en passen goed bij implementatie-artikelen.
- `LLM’s in de zorg`: risicoladder en privacykaart zijn bruikbaar, maar moeten iets concreter worden gemaakt met echte use cases.

**2. Visuals Die Nog Te Vaag Zijn**

- `Bias en fairness`: mist zichtbaar visualisatiepakket. Nodig: subgroup-performance heatmap, fairness tradeoff diagram, label-bias keten, calibratie per subgroep.
- `Externe validatie`: mist zichtbaar visualisatiepakket. Nodig: “extern is niet altijd extern”-matrix, train/test/temporal split schema, calibration plot voorbeeld, transportability kaart.
- `Silent trial / shadow mode`: mist zichtbaar visualisatiepakket. Nodig: implementatiefase-tijdlijn, monitoring dashboard mockup, stopcriteria matrix, audit-log flow.
- `LLM’s`: image/video zoekbronnen zijn deels te breed. Maak liever eigen figuren; externe beelden alleen als ondersteunend.
- `RAG`: IBM/TensorFlow bronnen zijn betrouwbaar voor algemene uitleg, maar medische RAG moet vooral eigen visuals gebruiken met broncitatie naar richtlijnen/protocollen.
- Artikelen 1-4: onzeker. Vooral `AUC` en `calibratie` móéten interactieve visuals krijgen, anders blijft het te abstract.

**3. Top 5 Interactieve Componenten Om Te Prioriteren**

1. **AUC / threshold playground**  
   Zoals Google ML Course: slider voor drempelwaarde, live ROC-curve, confusion matrix, sensitiviteit/specificiteit/PPV/NPV.

2. **Calibratie simulator**  
   Laat zien dat twee modellen dezelfde AUC kunnen hebben maar verschillend gekalibreerd zijn. Met calibration plot en “voorspeld risico vs werkelijk risico”.

3. **Clinical utility / decision curve calculator**  
   Slider voor prevalentie, drempelrisico, sensitiviteit/specificiteit en foutkosten. Output: net benefit en aantallen per 1.000 patiënten.

4. **Data leakage simulator**  
   Toggles: patient-level split aan/uit, scaler vóór split, future feature, duplicate images. Laat interne AUC kunstmatig stijgen en externe performance dalen.

5. **MDR / AI claim-checker**  
   Quiz: medische claim, patiëntspecifieke data, diagnose/therapie, mogelijke schade, updatebaar model. Output: “waarschijnlijk buiten MDR”, “mogelijk MDSW”, “regulatory review nodig”.

Daarna als zesde: **RAG chunking-demo**, omdat die visueel prachtig wordt en goed past bij LLM-artikelen.

**4. Standaard Visual-Template Voor Toekomstige Artikelen**

Elk artikel krijgt voortaan standaard:

- **Hero visual**: eigen gemaakte afbeelding of abstracte medische/AI illustratie, geen generieke stockfoto.
- **Kernfiguur**: één hoofdconcept als diagram, flowchart, matrix, tijdlijn of curve.
- **Mini-interactie**: slider, quiz, simulator, toggle-demo of klikbare beslisboom.
- **Praktijkvisual**: checklist, workflow-swimlane, dashboardmockup of “wat vraag je aan leverancier?” kaart.
- **Bronblok per visual**: bij elke figuur vermelden waarop deze is gebaseerd.
- **Image policy**: primaire bronnen eerst: FDA, EU/MDCG, WHO, NICE, NIST, EQUATOR, PubMed/PMC, officiële onderwijsbronnen. Externe afbeeldingen alleen gebruiken als licentie duidelijk is; anders zelf maken.
- **Caption-stijl**: korte uitleg + “waarom dit klinisch uitmaakt”.

Kort oordeel: de reeks heeft inhoudelijk veel body, maar de controle moet nu afdwingen dat elk artikel minimaal één eigen kernfiguur én één interactieve uitleg krijgt. Vooral AUC, calibratie, leakage en clinical utility kunnen echt onderscheidend worden.


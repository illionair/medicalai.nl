---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-117d-7472-bf6e-2897a7ccd005.jsonl  ts: 2026-05-03T22:40:50.888Z -->

## Visualisatiepakket

**Figuurideeën**

1. **Beslisboom: “Wanneer wordt AI een medisch hulpmiddel?”**  
   Layout als eenvoudige yes/no-flow: `AI-model` -> `medische claim?` -> `gericht op individuele patiënt?` -> `diagnose/therapie/monitoring/prognose?` -> `SaMD/MDSW of onderdeel van hulpmiddel?`. Eindpunten: “waarschijnlijk buiten MDR/FDA-device scope”, “mogelijk SaMD/MDSW”, “vraag regulatory dossier op”. Dit leent zich goed voor een eenvoudige SVG of React-component.

2. **Vergelijkende routekaart EU versus VS**  
   Twee kolommen naast elkaar. Links: `intended purpose` -> `MDR/IVDR classificatie` -> `notified body indien nodig` -> `CE-markering` -> `post-market surveillance`. Rechts: `intended use` -> `device classification/pathway` -> `510(k), De Novo of PMA` -> `FDA clearance/authorization/approval` -> `post-market controls`. Gebruik kleur alleen om routes te onderscheiden, niet om “beter/slechter” te suggereren.

3. **Lifecycle-loop voor AI-modellen**  
   Circulaire infographic: `ontwikkeling` -> `validatie` -> `premarket review/CE` -> `klinische implementatie` -> `monitoring van drift, bias en incidenten` -> `gecontroleerde update` -> terug naar `validatie`. Voeg aparte labels toe voor “PCCP” aan FDA-kant en “significante wijziging/notified body” aan EU-kant.

4. **Risicomatrix voor klinische impact**  
   X-as: rol van de AI-output, van “informeert” naar “stuurt diagnose/therapie”. Y-as: mogelijke schade bij fout, van “laag” naar “ernstig/onherstelbaar/overlijden”. Plaats voorbeeldclaims in vakken, zoals “administratieve samenvatting”, “triage-alert”, “therapiedosering”, “autonome detectie kritiek beeld”. Duidelijk vermelden: illustratief, geen formele classificatie.

**Interactieve component**

Een **“claim-checker” quiz of mini-calculator** past goed: de gebruiker beantwoordt 6 vragen over een leverancierclaim, bijvoorbeeld: medische claim ja/nee, individuele patiënt ja/nee, diagnose/therapie ja/nee, autonome beslissing ja/nee, updatebaar model ja/nee, FDA/CE-bewijs beschikbaar ja/nee. Output: geen juridisch oordeel, maar een risicosignaal met vragen die men aan de leverancier moet stellen. Geschikt als React-component met radio buttons en een samenvattende checklist.

**Afbeeldingen/video’s om op te zoeken of te gebruiken**

- Zoekterm: `FDA AI-enabled medical devices list`  
  Bronvoorkeur: officiële FDA-pagina met de AI-enabled medical devices list: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices

- Zoekterm: `FDA Software as a Medical Device SaMD examples`  
  Bronvoorkeur: FDA Digital Health Center of Excellence of FDA SaMD-pagina’s: https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd

- Zoekterm: `MDCG 2019-11 medical device software Rule 11 MDR`  
  Bronvoorkeur: Europese Commissie/MDCG-documenten over softwareclassificatie: https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en

- Zoekterm: `IMDRF SaMD risk categorization framework diagram`  
  Bronvoorkeur: IMDRF-documenten over SaMD-definities en risicocategorisatie: https://www.imdrf.org/working-groups/software-medical-device-samd

---


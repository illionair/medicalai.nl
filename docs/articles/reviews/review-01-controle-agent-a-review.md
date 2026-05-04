---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-53-08-019df00b-a576-7741-aad5-0e69d2bf3970.jsonl  ts: 2026-05-03T22:54:49.089Z -->

**Controle Agent A Review**

Beperking: ik zie volledige drafts voor o.a. bias/fairness, MDR, externe validatie, silent trial, workflow, clinical utility, LLM, RAG en data leakage. Drafts 1-4 zie ik alleen via samenvatting/titel, en enkele latere agents hebben “geen draft afgerond”; die kan ik dus niet inhoudelijk volledig beoordelen.

**1. Hoogste Prioriteit Bevindingen**

De grootste veiligheidsedit is regulatoir taalgebruik. Maak overal expliciet onderscheid tussen:  
`wetgeving` zoals MDR/IVDR, AI Act en AVG/GDPR; `guidance` zoals MDCG, FDA GMLP, FDA transparency, NICE ESF; `reporting guidelines` zoals TRIPOD+AI, CONSORT-AI, CLAIM en DECIDE-AI; en `risk-of-bias tools` zoals PROBAST+AI. Dit moet consequent terugkomen.

Voor MDR/CE/FDA/AI Act: vermijd zinnen die klinken als juridisch advies. Formuleer steeds: “kan onder MDR vallen afhankelijk van intended purpose”, “laat dit beoordelen door regulatory/legal experts”, “FDA clearance/authorization/approval hangt af van pathway”. Niet alles wat medische AI is, is automatisch hetzelfde type gereguleerd product.

AI Act-claims moeten genuanceerd: high-risk onder artikel 6 geldt o.a. wanneer het AI-systeem zelf een product is of safety component van een product onder Annex I-wetgeving én derdepartij-conformiteitsbeoordeling nodig is. Niet schrijven alsof alle medische AI automatisch high-risk is.

Visuals/images/videos: heel goed idee, maar publicatieveiligheid vraagt bron/licentie per visual. Gebruik bij voorkeur eigen SVG/React-figuren, interactieve simulaties met fictieve data, of officiële/CC/public-domain bronnen. Geen journal figures kopiëren tenzij licentie dat toelaat; bij “adapted from” bron en licentie vermelden.

LLM/RAG-artikelen moeten extra duidelijk zeggen: RAG vermindert hallucinaties maar bewijst geen klinische juistheid. Bronverwijzingen kunnen fout of misleidend zijn. Bij patiëntspecifieke output kan het systeem richting clinical decision support/medical-device beoordeling gaan.

**2. Artikel-Specifieke Opmerkingen**

1-4: volledige tekst niet zichtbaar. Let erop dat “10 minuten beoordelen” als snelle triage wordt gepresenteerd, niet als volledige methodologische beoordeling. Bij AUC en calibratie: AUC is discriminatie, geen kans op juistheid; calibratie is noodzakelijk maar geen bewijs van clinical utility.

Bias/fairness: sterk concept. Voeg toe dat subgroepanalyse met gevoelige gegevens juridisch/ethisch zorgvuldig moet gebeuren onder AVG. Pas op met “andere drempels per groep”; dat vereist klinische, ethische en juridische onderbouwing.

MDR-artikel: belangrijkste edit. “CE-markering is nodig voordat…” is te absoluut zonder nuance rond onderzoek, in-house gebruik en precieze marktintroductie/ingebruikname. Voeg toe dat MDCG guidance niet juridisch bindend is. Rule 11 is correct als kern, maar classificatie blijft case-specific.

Externe validatie: goed. Voeg minimaal toe: event count/sample size, model lock vóór validatie, vooraf gespecificeerde analyse, confidence intervals, en dat lokale recalibratie opnieuw gevalideerd moet worden.

Silent trial/shadow mode: goed, maar schrijf niet alsof “geen klinische invloed” betekent “geen governance nodig”. Ook silent trials kunnen DPIA, informatiebeveiliging, ethische toetsing/lokale toestemming en logging-afspraken vereisen.

Workflow-artikel: sterk. Zinnen als “AI faalt meestal…” iets verzachten naar “AI strandt vaak…”. Voeg human factors/usability en lokale EPD-context toe.

Clinical utility: goed. Decision curve analysis niet presenteren als bewijs van patiëntuitkomst, maar als besliskundige evaluatie. Prospectieve/gerandomiseerde evaluatie is vooral nodig bij hogere risico’s of workflow-impact.

LLM-artikel: goed genuanceerd. Voeg toe: geen patiëntdata in publieke modellen; modelversies kunnen wijzigen; logging kan zelf gezondheidsdata bevatten; patiëntspecifieke klinische output kan MDR/AI Act/AVG-vragen oproepen.

RAG-artikel: goed. Voeg sterker toe: retrieval failure, verkeerde citaties, verouderde documenten en conflicterende richtlijnen zijn kernrisico’s. Een RAG-systeem moet kunnen weigeren.

Data leakage: sterk. Voeg foundation-model/benchmark contamination toe, plus device/site metadata leakage bij beeldvorming.

**3. Redactionele Veiligheidsregels**

Elke publicatie krijgt een korte disclaimer: educatief, geen medisch/juridisch advies, niet gebruiken voor individuele patiëntbeslissingen.

Elke referentielijst splitsen in: wetenschappelijke bronnen, reporting/risk-of-bias tools, regulatoire/juridische bronnen, en visual/video/interactieve bronnen. Vermeld DOI/URL, versie/datum en liefst geraadpleegd op datum.

Gebruik modaliteit: “kan”, “waarschijnlijk”, “afhankelijk van intended purpose/context”, “vereist lokale beoordeling”. Vermijd “valt altijd onder”, “is veilig”, “bewijst”, “garandeert”.

Voor interactieve onderdelen: fictieve data, duidelijke simulatie-labels, geen upload van patiëntdata, geen diagnostische output.

Belangrijke verificatiebronnen: MDR Rule 11 op EUR-Lex, EU AI Act artikel 6 op EUR-Lex, MDCG 2019-11 Rev.1, FDA GMLP/transparency/PCCP guidance, TRIPOD+AI, PROBAST+AI, CONSORT-AI en DECIDE-AI.

---


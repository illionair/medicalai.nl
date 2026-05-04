---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-45-38-019df004-c8b5-7830-b29e-ea240b51d947.jsonl  ts: 2026-05-03T22:47:17.351Z -->

# LLM’s in de zorg: slim hulpmiddel, geen automatische collega

## Korte intro

Large Language Models (LLM’s) kunnen in de zorg veel werk verlichten: consulten samenvatten, patiëntbrieven begrijpelijker maken, administratieve teksten voorbereiden, literatuur doorzoeken of triagevragen structureren. Maar dezelfde kracht maakt ze riskant. Een LLM klinkt vaak zeker, ook wanneer het model iets verzint, context mist of gevoelig reageert op kleine promptverschillen. Dit artikel is educatief bedoeld voor zorgprofessionals, bestuurders, AI-teams en onderzoekers. Het is geen medisch of juridisch advies.

## Wat LLM’s goed kunnen

De meest kansrijke toepassingen liggen waar taalwerk zwaar weegt, maar waar een mens eindverantwoordelijk blijft. Denk aan samenvattingen van dossiers, ontslagbrieven, administratieve codering, voorbereiding van verwijsbrieven, patiëntvriendelijke uitleg, scholing, onderzoeksassistentie en triage-ondersteuning. Bij triage moet het model echter nooit zelfstandig urgentie bepalen zonder klinische vangrails. Bij diagnostiek en behandeling geldt: een LLM kan helpen ordenen, alternatieven noemen of richtlijnpassages ophalen, maar mag geen autonome diagnose of behandeladvies geven.

## De technische valkuilen

Hallucinatie is het bekendste risico: het model genereert plausibele maar onjuiste informatie, zoals niet-bestaande richtlijnen, verkeerde doseringen of verzonnen bronverwijzingen. RAG, retrieval augmented generation, kan dit verminderen door het model antwoorden te laten baseren op gecontroleerde bronnen zoals lokale protocollen, NHG-richtlijnen of ziekenhuisdocumentatie. RAG lost het probleem niet op: slechte zoekresultaten, verouderde documenten of verkeerd geciteerde passages blijven mogelijk.

Prompt sensitivity betekent dat kleine wijzigingen in vraagstelling, volgorde of toon een ander antwoord kunnen opleveren. Daarom zijn vaste prompttemplates, versiebeheer en regressietests belangrijk. De context window is eveneens begrensd. Een model kan maar een bepaalde hoeveelheid tekst tegelijk verwerken en gebruikt lange context niet altijd robuust; relevante informatie “in het midden” kan onderbenut raken. Gebruik daarom samenvattingen met bronverwijzingen, chunking, prioritering en expliciete instructies om onzekerheid te melden.

## Privacy, PHI en logging

In Nederland vallen gezondheidsgegevens onder de AVG als bijzondere persoonsgegevens. De Amerikaanse term PHI, protected health information, is nuttig wanneer leveranciers of cloudproviders onder HIPAA-context opereren, maar vervangt de AVG niet. Voor ieder LLM-gebruik met patiëntdata zijn doelbinding, dataminimalisatie, grondslag, verwerkersafspraken, bewaartermijnen, toegangsbeheer en een DPIA belangrijk.

Logging is dubbel. Zonder logging kun je fouten, bias en incidenten niet onderzoeken. Met logging kun je juist extra privacyrisico creëren. Log daarom minimaal: modelversie, prompttemplate, tijdstip, gebruikerrol, bronset, output, menselijke correctie en incidentmarkering. Vermijd ruwe patiëntgegevens in logs waar dat niet strikt nodig is; gebruik pseudonimisering, encryptie en beperkte bewaartermijnen.

## Evaluatie, bias en uitlegbaarheid

Een LLM moet niet alleen “goed klinken”, maar meetbaar veilig en nuttig zijn. Evalueer per use case: feitelijke juistheid, volledigheid, brontrouw, leesbaarheid, tijdswinst, klinische veiligheid, fouttypes, gebruikersgedrag en impact op patiënten. Test ook op subgroepen: leeftijd, taalniveau, gender, migratieachtergrond, comorbiditeit en zeldzame aandoeningen. Bias ontstaat vaak door scheve trainingsdata, historische zorgverschillen of ongelijke representatie.

Explainability bij LLM’s betekent meestal niet dat je exact weet waarom elk woord is gegenereerd. Praktischer is: toon gebruikte bronnen, laat onzekerheden zien, markeer aannames, geef alternatieven en maak zichtbaar welke delen door een mens zijn aangepast.

## Clinical oversight: wie tekent waarvoor?

Een goede governance-vraag is niet “kan het model dit?”, maar “wie merkt het als het fout gaat?”. Leg vast wie eigenaar is van de use case, wie klinisch eindverantwoordelijk is, wanneer outputs verplicht gecontroleerd worden, wanneer het systeem stopt, en hoe incidenten worden gemeld. Voor diagnostiek, behandeling, medicatie, triage en beslisondersteuning is menselijke supervisie geen formaliteit maar een veiligheidsmechanisme.

## Praktische checklist

- Is de use case administratief, informatief of klinisch beslissend?
- Worden patiëntgegevens verwerkt, en is een DPIA uitgevoerd?
- Is duidelijk of AVG, beroepsgeheim, NEN/ISO-beleid, MDR/AI Act of HIPAA/PHI-afspraken relevant zijn?
- Is er een vaste prompttemplate met versiebeheer?
- Worden bronnen via RAG gecontroleerd, actueel gehouden en geciteerd?
- Is logging proportioneel, beveiligd en beperkt in bewaartermijn?
- Zijn hallucination, prompt sensitivity en context-window-fouten getest?
- Wordt bias per relevante patiëntgroep geëvalueerd?
- Is er klinische review vóór gebruik in zorgbeslissingen?
- Is duidelijk wat het systeem niet mag doen?

## Visualisatiepakket

Figuurideeën:
1. Risicoladder van LLM-use cases: administratie laag risico, patiëntcommunicatie middel, triage hoog, diagnose/behandeling zeer hoog.
2. RAG-flow: vraag → bronselectie → context → LLM-output → broncheck → menselijke validatie.
3. Privacykaart: prompt, modelprovider, logs, RAG-index, EPD-koppeling en bewaartermijnen.
4. Evaluatiematrix: accuraatheid, veiligheid, bias, uitlegbaarheid en workflow-impact.

Interactieve component:
Een “LLM-zorgcheck” waarin gebruikers een use case kiezen en direct zien welke controles nodig zijn: DPIA, RAG, logging, klinische validatie, bias-test en menselijke supervisie.

Afbeelding/video-zoekbronnen:
- WHO Media Centre; zoekterm: “WHO artificial intelligence health large multimodal models”.
- FDA AI-enabled medical devices list; zoekterm: “FDA AI enabled medical devices radiology list”.
- RSNA AI education/video archive; zoekterm: “RSNA artificial intelligence radiology workflow video”.
- OWASP GenAI Security Project; zoekterm: “OWASP LLM Top 10 prompt injection diagram”.

## Referenties

### Wetenschappelijke bronnen

- Liu et al., “Lost in the Middle: How Language Models Use Long Contexts”, TACL, 2024. Gebruikt voor context-window-risico. DOI: https://doi.org/10.1162/tacl_a_00638
- Lewis et al., “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks”, NeurIPS, 2020. Gebruikt voor RAG-uitleg. URL: https://arxiv.org/abs/2005.11401
- Haltaufderheide & Ranisch, “The ethics of ChatGPT in medicine and healthcare”, npj Digital Medicine, 2024. Gebruikt voor ethische risico’s. DOI: https://doi.org/10.1038/s41746-024-01157-x
- Celi et al., “Sources of bias in artificial intelligence that perpetuate healthcare disparities”, PLOS Digital Health, 2022. Gebruikt voor bias en gezondheidsverschillen. DOI: https://doi.org/10.1371/journal.pdig.0000022
- Tam et al., “A framework for human evaluation of large language models in healthcare”, npj Digital Medicine, 2024. Gebruikt voor evaluatiecriteria. URL: https://www.nature.com/articles/s41746-024-01258-7

### Richtlijnen en tools

- WHO, “Ethics and governance of artificial intelligence for health: guidance on large multi-modal models”, 2024. Gebruikt voor governance en risico’s. URL: https://www.who.int/news/item/18-01-2024-who-releases-ai-ethics-and-governance-guidance-for-large-multi-modal-models
- NIST, “AI Risk Management Framework 1.0”, 2023, en “Generative AI Profile”, 2024. Gebruikt voor risicomanagement. DOI: https://doi.org/10.6028/NIST.AI.100-1 en https://doi.org/10.6028/NIST.AI.600-1
- Europese Unie, “Regulation (EU) 2024/1689 Artificial Intelligence Act”, 2024. Gebruikt voor high-risk AI en menselijk toezicht. URL: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- Autoriteit Persoonsgegevens, “Data protection impact assessment”, actueel. Gebruikt voor DPIA/AVG. URL: https://autoriteitpersoonsgegevens.nl/themas/basis-avg/praktisch-avg/data-protection-impact-assessment-dpia
- OWASP, “Top 10 for Large Language Model Applications”, actueel. Gebruikt voor prompt injection, datalekken en overreliance. URL: https://owasp.org/www-project-top-10-for-large-language-model-applications

### Visual/video/interactieve bronnen

- FDA, “Artificial Intelligence-Enabled Medical Devices”. Voor datavisualisatie van gereguleerde AI-toepassingen. URL: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices
- RSNA, “Artificial Intelligence” en video-archief. Voor workflowbeelden in radiologie. URL: https://www.rsna.org/artificial-intelligence
- WHO, LMM-guidance nieuws- en mediapagina. Voor publieke gezondheidsvisuals. URL: https://www.who.int/news/item/18-01-2024-who-releases-ai-ethics-and-governance-guidance-for-large-multi-modal-models

---


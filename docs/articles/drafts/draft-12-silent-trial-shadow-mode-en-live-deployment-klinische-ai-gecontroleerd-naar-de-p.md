---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-38-19-019deffe-12fe-7b31-9a4b-c4ef30992b88.jsonl  ts: 2026-05-03T22:39:38.470Z -->

# Silent trial, shadow mode en live deployment: klinische AI gecontroleerd naar de praktijk brengen

## Intro

Een AI-model dat retrospectief goed presteert, is nog geen veilig klinisch hulpmiddel. In het ziekenhuis botst een model op rommelige datastromen, werkdruk, afwijkende populaties, veranderende protocollen en menselijke interpretatie. Daarom is de stap van “validatie” naar “live gebruik” geen technische release, maar een gefaseerd implementatieprogramma. Dit artikel beschrijft een praktische route: retrospective validation, prospective silent trial of shadow mode, pilot en live deployment. Het is educatief bedoeld en geen medisch of juridisch advies.

## 1. Retrospective validation: bewijs op historische data

Retrospective validation test een AI-systeem op bestaande patiëntdata, liefst uit een periode, afdeling of instelling die niet gebruikt is voor training. De kernvraag is: doet het model wat het belooft binnen de beoogde klinische toepassing?

Goede retrospectieve validatie kijkt verder dan AUC of accuracy. Belangrijk zijn calibratie, sensitiviteit en specificiteit bij relevante drempels, fouttypen, subgroepen, missende waarden, datalekken en performance per klinische workflow. Een model voor sepsisdetectie moet bijvoorbeeld niet alleen “sepsis” herkennen, maar dat tijdig doen, met een bruikbaar aantal alerts, bij patiënten die op dat moment werkelijk in de klinische populatie zitten.

Deze fase is geschikt om technische en methodologische risico’s te vinden: labeldefinities, bias, datakwaliteit, onbedoelde proxies, leakage uit toekomstige informatie en verschillen tussen trainingsdata en lokale praktijk. Maar retrospectief bewijs blijft beperkt: het bewijst niet dat de live dataketen werkt, dat clinici de output begrijpen, of dat het model veilig past in het zorgproces.

## 2. Prospective silent trial / shadow mode: live meekijken zonder invloed

Een silent trial, vaak ook shadow mode genoemd, draait het AI-systeem prospectief op echte, actuele data in de bedoelde klinische omgeving, maar zonder dat de output klinische beslissingen beïnvloedt. Het model “kijkt mee” op de achtergrond. Clinici blijven blind voor de voorspellingen, of de output wordt alleen bekeken door een evaluatieteam.

Dit is de brug tussen laboratoriumvalidatie en klinische inzet. Je test niet alleen het model, maar het hele systeem: datakoppelingen, latency, preprocessing, uptime, patiëntselectie, foutafhandeling, logging en lokale populatiedrift. Een silent trial kan laten zien dat een model dat op historische data sterk leek, live minder goed presteert omdat labwaarden later binnenkomen, definities anders zijn geworden, of een EPD-veld anders wordt gevuld.

Vooraf moeten succescriteria vastliggen: minimale performance, maximale latency, acceptabele foutcategorieën, subgroup performance, datavolledigheid en operationele betrouwbaarheid. Ook moet duidelijk zijn wie de silent-trialresultaten beoordeelt en wanneer hertraining, redesign of stopzetting nodig is.

## 3. Pilot: gecontroleerde klinische blootstelling

In een pilot wordt de AI-output zichtbaar en mag deze, binnen afgebakende grenzen, het zorgproces ondersteunen. Dit is geen “kleine livegang”, maar een gecontroleerde interventie met extra toezicht. De pilot heeft een beperkte scope: bijvoorbeeld één afdeling, één patiëntgroep, vaste werktijden, een klein aantal getrainde gebruikers en een vooraf afgesproken escalatiepad.

De belangrijkste vragen verschuiven. Niet alleen “klopt het model?”, maar ook: begrijpen gebruikers de output, verandert het gedrag op een wenselijke manier, ontstaat alert fatigue, worden verantwoordelijkheden helder opgepakt, en is er klinische meerwaarde zonder nieuwe veiligheidsrisico’s?

Een goede pilot bevat training, feedbackmomenten, monitoring dashboards, incidentregistratie en een duidelijk besluitmoment. De AI mag niet “stilletjes” norm worden voordat de organisatie weet wat het effect is op patiënten, professionals en workflow.

## 4. Live deployment: productie is een zorgproces, geen eindpunt

Live deployment betekent dat de AI structureel onderdeel wordt van de klinische workflow. Vanaf dat moment is beheer minstens zo belangrijk als ontwikkeling. Er moeten eigenaren zijn voor modelperformance, klinische veiligheid, technische beschikbaarheid, privacy, security, leverancierscontact, wijzigingsbeheer en periodieke evaluatie.

Workflowintegratie is vaak bepalender dan modelscore. Een goede AI-output verschijnt op het juiste moment, bij de juiste professional, in het juiste systeem, met een begrijpelijke actiecontext. Een slecht geplaatste alert kan genegeerd worden; een te dwingende alert kan juist automation bias veroorzaken. Ontwerp daarom expliciet voor de menselijke-AI-samenwerking: de professional blijft verantwoordelijk voor klinische interpretatie, terwijl de organisatie verantwoordelijk is voor veilige randvoorwaarden.

## Monitoring, drift en incidentproces

Na livegang moet monitoring meerdere lagen omvatten. Technisch: uptime, latency, foutmeldingen, inputuitval en versiestatus. Datagericht: ontbrekende waarden, distributieverschuivingen, veranderde coderingen en afwijkende patiëntmix. Modelgericht: discriminatie, calibratie, alertvolume, false positives, false negatives en performance per subgroup. Klinisch: impact op wachttijd, diagnostiek, behandeling, escalaties en mogelijke schade.

Drift is niet alleen statistiek. Een nieuw protocol, ander labapparaat, veranderde populatie of aangepast EPD-scherm kan modelgedrag veranderen. Daarom hoort driftmonitoring gekoppeld te zijn aan change management: wie wordt geïnformeerd, wie beoordeelt de klinische relevantie en wanneer wordt het model tijdelijk uitgezet?

Het incidentproces moet vooraf klaarstaan. Meldkanalen moeten laagdrempelig zijn voor clinici. Incidenten moeten worden geclassificeerd naar ernst, herleidbaarheid, patiëntimpact, reproduceerbaarheid en noodzaak tot correctieve actie. Bij ernstige signalen moet er een route zijn voor onmiddellijke pauzering, communicatie naar gebruikers en, waar van toepassing, melding aan toezichthouders of fabrikant.

## Audit logs en stopcriteria

Audit logs zijn essentieel voor verantwoording en leren. Leg vast: modelversie, inputtijdstip, gebruikte datavelden, output, drempelwaarde, gebruiker, getoonde interface, eventuele override, downstream actie en technische status. Logs moeten privacybewust zijn ingericht en alleen toegankelijk voor bevoegde rollen.

Stopcriteria maken governance concreet. Voorbeelden zijn: performance onder afgesproken minimum, disproportionele fouten in een subgroup, onverklaarde stijging in alertvolume, ernstige dataketenfout, onacceptabele latency, klinische incidenten met plausibele AI-bijdrage, ontbreken van auditability, of een wijziging in workflow waardoor de oorspronkelijke validatie niet meer geldt.

## Praktische implementatiechecklist

1. Definieer intended use, patiëntpopulatie, gebruikers, beslismoment en grenzen van het AI-systeem.
2. Voer externe of temporele retrospectieve validatie uit, inclusief calibratie, subgroepen en foutanalyse.
3. Controleer datakwaliteit, datalekken, labeldefinities, privacygrondslag en security.
4. Ontwerp de silent trial met vooraf vastgelegde succes- en stopcriteria.
5. Test live datastromen, latency, logging, foutafhandeling en modelversiebeheer.
6. Beoordeel silent-trialresultaten multidisciplinair: kliniek, data science, IT, privacy, veiligheid en bestuur.
7. Start alleen een pilot met getrainde gebruikers, beperkte scope en zichtbaar supportkanaal.
8. Monitor technische, statistische en klinische signalen vanaf dag één.
9. Richt incidentproces, escalatiepad, rollback en communicatieplan in.
10. Plan periodieke herbeoordeling, inclusief drift, bias, workflowimpact en noodzaak tot hertraining.

## Slot

De veilige route naar klinische AI is gefaseerd en bescheiden: eerst bewijzen op historische data, daarna live meekijken zonder invloed, vervolgens beperkt klinisch testen en pas daarna gecontroleerd uitrollen. Silent trials en shadow mode zijn geen bureaucratische tussenstap; ze zijn de plek waar modelbelofte en ziekenhuiswerkelijkheid elkaar voor het eerst eerlijk ontmoeten.

## Bronnen

- DECIDE-AI guideline, BMJ/Nature Medicine: https://www.bmj.com/content/377/bmj-2022-070904  
- “The silent trial”, Frontiers in Digital Health: https://www.frontiersin.org/articles/10.3389/fdgth.2022.929508  
- Scoping review silent trials, Nature Health: https://www.nature.com/articles/s44360-025-00048-z  
- FDA Good Machine Learning Practice: https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles  
- EU Commission over AI in healthcare en AI Act: https://health.ec.europa.eu/ehealth-digital-health-and-care/artificial-intelligence-healthcare_en  
- NICE Evidence Standards Framework: https://www.nice.org.uk/about/what-we-do/our-programmes/evidence-standards-framework-for-digital-health-technologies

---


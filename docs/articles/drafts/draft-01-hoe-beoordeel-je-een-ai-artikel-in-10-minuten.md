---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-35-32-019deffb-894d-76d0-916e-03bf5213b4f2.jsonl  ts: 2026-05-03T22:36:41.688Z -->

# Hoe beoordeel je een AI-artikel in 10 minuten?

AI-artikelen in de zorg kunnen indrukwekkend klinken. Hoge AUC. Grote datasets. Deep learning. "Expert-level performance". Maar voor jou is de vraag vaak veel gewoner: helpt dit mijn patiënt, in mijn setting, bij een echte beslissing?

Met deze 10-minutencheck zie je snel of een AI-studie de moeite waard is. Lees je verder? Bespreek je het in een journal club? Of leg je het voorlopig naast je neer?

## De snelle 10-minutencheck

**Minuut 1: Wat is de klinische taak?**  
Begin niet bij het model, maar bij het besluit. Gaat het om diagnose, triage, prognose, behandeling, monitoring of administratie? Een model dat "sepsis voorspelt" is te vaag. Wanneer voorspelt het model dit? Voor wie? Wat moet iemand daarna doen? En wie is daarvoor verantwoordelijk?

**Minuut 2: Klopt de populatie?**  
Vergelijk de studiepopulatie met jouw patiënten. Leeftijd, comorbiditeit, ziektestadium, setting, apparatuur, taal, etniciteit, verwijspatroon en prevalentie doen ertoe. Een model uit één academisch centrum met geselecteerde patiënten past niet automatisch bij een perifere spoedpost of huisartsenpraktijk.

**Minuut 3: Is de uitkomst klinisch relevant?**  
Kijk of de uitkomst ertoe doet voor patiënt of zorgproces. Mortaliteit, IC-opname, pathologisch bevestigde diagnose of heropname zijn vaak sterker dan administratieve of samengestelde uitkomsten. Let ook op timing. Een voorspelling van verslechtering "binnen 24 uur" helpt alleen als er dan nog iets te doen is.

**Minuut 4: Hoe is de dataset opgebouwd?**  
Check bron, periode, inclusiecriteria, exclusies en ontbrekende data. Zijn trainings-, validatie- en testdata echt gescheiden? Bij beeldvorming: zijn meerdere beelden van dezelfde patiënt per ongeluk over verschillende sets verdeeld? Bij EPD-data: waren alle variabelen al beschikbaar vóór het beslismoment, of kijkt het model stiekem naar informatie uit de toekomst?

**Minuut 5: Is er externe validatie?**  
Interne validatie is een begin, geen eindpunt. Een goede studie test het model ook op data uit andere centra, andere tijdsperioden of andere systemen. Dat is belangrijk omdat AI-modellen lokale gewoonten kunnen leren: scanners, labmethoden, codeergewoonten en behandelprotocollen.

**Minuut 6: Kijk verder dan AUC**  
AUC zegt hoe goed een model gemiddeld onderscheid maakt tussen patiënten met en zonder de uitkomst. Dat is nuttig, maar niet genoeg. Je wilt weten wat er gebeurt bij een drempel die je echt zou gebruiken. Zoek sensitiviteit, specificiteit, positief en negatief voorspellende waarde. Vraag heel concreet: hoeveel fout-positieven en fout-negatieven levert dit op per 100 patiënten in mijn setting? Een model kan een hoge AUC hebben en toch te veel alarmen geven.

**Minuut 7: Is het model gecalibreerd?**  
Calibratie betekent: klopt de kans die het model noemt? Als het model 20% risico voorspelt, gebeurt de uitkomst dan bij ongeveer 20 van de 100 vergelijkbare patiënten? Slechte calibratie kan leiden tot overbehandeling of juist gemiste zorg. Zoek naar een calibratieplot, intercept, slope of beoordeling per risicogroep. Alleen "het model onderscheidt goed" is niet genoeg.

**Minuut 8: Is bias onderzocht?**  
AI kan bestaande ongelijkheid versterken. Kijk of prestaties zijn uitgesplitst naar relevante subgroepen: geslacht, leeftijd, etniciteit, sociaaleconomische status, taal, comorbiditeit, zwangerschap, apparatuurtype of centrum. “Geen verschil gevonden” is alleen geruststellend als de studie genoeg power had en de subgroepen vooraf logisch waren gekozen.

**Minuut 9: Past het in de workflow?**  
Een model is geen los getal. Het komt terecht in een werksysteem. Wie ziet de output? Wanneer? In welk scherm? Hoe wordt onzekerheid getoond? Mag de arts afwijken? Is er training? Wordt alarmmoeheid gemeten? DECIDE-AI benadrukt terecht dat menselijke factoren en invoering in de praktijk onderdeel zijn van de klinische evaluatie.

**Minuut 10: Is er bewijs voor betere zorg?**  
De hoogste lat is niet modelprestatie, maar betere zorg. Denk aan minder complicaties, sneller juiste behandeling, minder onnodige diagnostiek, betere patiëntervaring of lagere werkdruk zonder extra schade. Idealiter is het model vooruitkijkend getest in de praktijk, liefst gerandomiseerd of met een zorgvuldig vergelijkingsontwerp. Decision curve analysis, impactanalyse of trialdata zijn sterker dan alleen een test op oude data.

<interactive name="checklist-10min"></interactive>

## Wat doe je na 10 minuten?

Gebruik de check niet als eindoordeel, maar als triage.

**Groen: 9-10 punten.** De studie is sterk genoeg voor bespreking. Lees methoden, figuren en supplementen rustig door. Kijk vooral of de claim past bij jouw patiënten en workflow.

**Oranje: 3-8 punten.** Lees voorzichtig en gericht. Bij 6-8 punten kan de studie nog steeds waardevol zijn, maar de zwakke plekken bepalen hoeveel je ermee kunt. Bij 3-5 punten is meestal alleen een specifieke methode, dataset of claim interessant.

**Rood: 0-2 punten.** Sla de studie voorlopig over voor klinische besluitvorming. Bewaar hem hoogstens als technische achtergrond of als voorbeeld van wat nog onvoldoende is uitgewerkt.

## Uitleg: wat maakt een AI-artikel geloofwaardig?

Begin met de vraag of het artikel past bij het type studie. Voor diagnostische accuratesse is STARD-AI relevant; voor predictiemodellen TRIPOD+AI en PROBAST+AI; voor trials CONSORT-AI; voor vroege klinische evaluatie DECIDE-AI. Deze richtlijnen zijn geen keurmerk, maar ze helpen zien wat minimaal transparant gerapporteerd moet zijn.

Kort vertaald: TRIPOD+AI helpt bij transparante rapportage van predictiemodellen, PROBAST+AI bij risico op bias en toepasbaarheid, STARD-AI bij diagnostische accuratesse, CONSORT-AI bij klinische trials met AI, en DECIDE-AI bij vroege klinische evaluatie in de workflow.

Let vooral op de afstand tussen onderzoek en praktijk. Veel AI-studies testen een model op historische data: het model krijgt oude dossiers of beelden en voorspelt wat inmiddels al bekend is. Dat kan nuttig zijn voor ontwikkeling. Het zegt minder over gedrag in de spreekkamer, op de SEH of in het MDO. Zodra een AI-output echte beslissingen beïnvloedt, ontstaan nieuwe risico's: te veel vertrouwen in het systeem, alarmmoeheid, onduidelijke verantwoordelijkheid en veranderde diagnostische drempels.

Ook regels en toelating horen in je snelle beoordeling. In Europa vallen veel medische AI-systemen onder de regels voor medische hulpmiddelen en, afhankelijk van gebruik en risico, onder de EU AI Act. In de VS publiceert de FDA lijsten en guidance rond AI-enabled medical devices, met aandacht voor beheer over de hele levensduur en vooraf geplande wijzigingen. Praktisch betekent dit: vraag of het systeem bedoeld is als medisch hulpmiddel, of er toelating is voor deze indicatie, en hoe updates na invoering worden bewaakt.

## Rode vlaggen

Wantrouw artikelen die vooral marketingtaal gebruiken: “revolutionair”, “clinician-level”, “generalizable” zonder overtuigende externe validatie. Een AUC zonder klinische drempels is onvoldoende. Een model zonder calibratie-informatie is riskant wanneer het risicoschattingen geeft. Een dataset zonder duidelijke tijdslijn of patiëntscheiding kan datalek bevatten. Subgroepanalyse ontbreekt vaak precies waar bias het meest waarschijnlijk is.

Andere rode vlaggen: alleen één centrum, kleine testset, onduidelijke referentiestandaard, uitkomst die deels door het model beïnvloed had kunnen worden, geen vergelijking met standaardzorg, geen beschrijving van ontbrekende data, geen foutanalyse, geen workflowbeschrijving, geen monitoringplan na implementatie, en belangenverstrengeling zonder onafhankelijke evaluatie.

## Conclusie

Begin bij de patiënt. Daarna bij de beslissing. Dan bij de actie die uit de voorspelling volgt. Pas daarna komt het neurale netwerk.

In 10 minuten kun je meestal zien of een studie alleen technisch interessant is, of mogelijk bruikbaar voor zorg. De kernvraag blijft: zou dit model, getest bij mijn patiënten en ingebed in mijn workflow, aantoonbaar betere beslissingen opleveren dan goede zorg zonder dit model?

## Bronnen

1. Collins GS et al. TRIPOD+AI statement. BMJ, 2024. https://www.bmj.com/content/385/bmj-2023-078378  
2. Moons KGM et al. PROBAST+AI. BMJ, 2025. https://www.bmj.com/content/388/bmj-2024-082505  
3. Sounderajah V et al. STARD-AI reporting guideline. Nature Medicine, 2025. https://www.nature.com/articles/s41591-025-03953-8  
4. Liu X et al. CONSORT-AI extension. Nature Medicine, 2020. https://www.nature.com/articles/s41591-020-1034-x  
5. Rivera SC et al. SPIRIT-AI extension. Nature Medicine, 2020. https://www.nature.com/articles/s41591-020-1037-7  
6. Vasey B et al. DECIDE-AI. Nature Medicine, 2022. https://www.nature.com/articles/s41591-022-01772-9  
7. Vickers AJ, Elkin EB. Decision curve analysis. Medical Decision Making, 2006. https://doi.org/10.1177/0272989X06295361  
8. FDA. Artificial Intelligence in Software as a Medical Device. https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device  
9. Regulation (EU) 2024/1689, Artificial Intelligence Act. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng

---


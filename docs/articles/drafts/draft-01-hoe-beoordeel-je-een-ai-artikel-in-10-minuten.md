---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
title: "Hoe beoordeel je een AI-artikel in 10 minuten?"
subtitle: "Een snelle eerste scan voordat je de diepte in gaat"
difficulty: basis
readingMinutes: 9
coverConcept: checklist
summary: "Gebruik deze 10-minutencheck als snelle oriëntatie: past de studie bij jouw patiënten, vraagstelling en beoogde toepassing, en is het de moeite waard om daarna met officiële checklists dieper te beoordelen?"
---

<!-- bron: rollout-2026-05-04T00-35-32-019deffb-894d-76d0-916e-03bf5213b4f2.jsonl  ts: 2026-05-03T22:36:41.688Z -->

# Hoe beoordeel je een AI-artikel in 10 minuten?

AI-artikelen in de zorg kunnen indrukwekkend klinken. Hoge AUC. Grote datasets. Deep learning. "Expert-level performance". Maar voordat je de methoden induikt, wil je meestal eerst iets eenvoudigers weten: gaat dit artikel over een vraagstelling, populatie en mogelijke toepassing die voor jou relevant zijn?

Deze 10-minutencheck is bedoeld als snelle eerste scan. Niet als definitief oordeel, en niet als vervanging van volledige beoordelingsinstrumenten zoals TRIPOD+AI, PROBAST+AI, STARD-AI, CONSORT-AI of DECIDE-AI. Die officiële checklists zijn nuttig, maar ook uitgebreid. Je gebruikt ze vooral wanneer een artikel na de eerste scan belangrijk genoeg lijkt voor een verdere inhoudelijke beoordeling.

Kort gezegd: eerst snel door het artikel heen, daarna pas de diepte in. Wil je die grotere methodologische checklists erbij pakken, lees dan ook [Niet alleen een ander ziekenhuis: wat maakt een externe validatiestudie echt goed?](/blog/article-goede-externe-validatiestudie). Daar komen TRIPOD+AI, PROBAST+AI, CLAIM en CONSORT-AI terug bij de vraag of een studie betrouwbaar en toepasbaar genoeg is.

<callout type="tip" title="Waarvoor gebruik je deze check?">
<p>Gebruik de 10 minuten om te beslissen of een artikel geschikt is voor jou: past de klinische taak bij jouw praktijk, zijn de patiënten vergelijkbaar, en is er genoeg bewijs om verder te lezen? Als het antwoord ja is, kun je daarna de volledige richtlijnen en supplementen erbij pakken.</p>
</callout>

## De snelle 10-minutencheck

**Minuut 1: Wat is de klinische taak?**  
Begin niet bij het model, maar bij de vraagstelling van het artikel: welk klinisch probleem moet de AI helpen oplossen, en welke beslissing of actie hangt daaraan vast? Gaat het om diagnose, prioritering, prognose, behandeling, monitoring of administratie? Een model dat "sepsis voorspelt" is te vaag. Wanneer voorspelt het model dit? Voor wie? Wat moet iemand daarna doen? En wie is daarvoor verantwoordelijk?

**Minuut 2: Klopt de populatie?**  
Vergelijk de studiepopulatie met jouw patiënten. Leeftijd, comorbiditeit, ziektestadium, setting, apparatuur, taal, etniciteit, verwijspatroon en prevalentie doen ertoe. Een model uit één academisch centrum met geselecteerde patiënten past niet automatisch bij een andere zorgsetting.

**Minuut 3: Is de uitkomst klinisch relevant?**  
Kijk of de uitkomst ertoe doet voor patiënt of zorgproces. Mortaliteit, IC-opname, pathologisch bevestigde diagnose of heropname zijn vaak sterker dan administratieve of samengestelde uitkomsten. Let ook op timing. Een voorspelling van verslechtering "binnen 24 uur" helpt alleen als er dan nog iets te doen is.

**Minuut 4: Hoe is de dataset opgebouwd?**  
Check bron, periode, inclusiecriteria, exclusies en ontbrekende data. Zijn trainings-, validatie- en testdata echt gescheiden, ook op patiëntniveau? Bij beeldvorming: beschrijft het artikel of meerdere beelden van dezelfde patiënt in dezelfde set zijn gehouden? Bij EPD-data: gebruikte het model alleen gegevens die op het voorspeltijdstip al bekend konden zijn, dus geen labuitslagen, diagnoses of behandelkeuzes die pas later kwamen?

**Minuut 5: Is er externe validatie, en is de testset groot genoeg?**  
Interne validatie is een begin, geen eindpunt. Sterker bewijs ontstaat wanneer het model ook is getest op data uit andere centra, andere tijdsperioden of andere systemen. Dat is belangrijk omdat AI-modellen lokale patronen kunnen leren: scanners, labmethoden, codeergewoonten en behandelprotocollen.

Let ook op de omvang van de testset. In klassieke statistiek wordt vooraf vaak een steekproefgrootte berekend voor één vooraf vastgelegde vergelijking of hypothese. Bij machine-learningartikelen is dat lastiger: het model heeft vaak veel mogelijke voorspellers geleerd, prestaties worden met meerdere maten beoordeeld, en de vraag is niet alleen "is er een verschil?", maar ook "hoe betrouwbaar is deze performance in nieuwe patiënten?". Voor AI-validatie bestaat daarom nog geen breed gedragen simpel antwoord op de vraag hoeveel patiënten altijd genoeg zijn. Kijk in ieder geval niet alleen naar het totale aantal patiënten, maar ook naar het aantal patiënten mét de uitkomst, de prevalentie, de breedte van betrouwbaarheidsintervallen, het aantal centra en of subgroepanalyses überhaupt iets kunnen zeggen.

**Minuut 6: Kijk verder dan AUC**  
AUC zegt hoe goed een model gemiddeld onderscheid maakt tussen patiënten met en zonder de uitkomst. Dat is nuttig, maar niet genoeg. Je wilt weten wat er gebeurt bij een drempel die je echt zou gebruiken. Zoek sensitiviteit, specificiteit, positief en negatief voorspellende waarde. Reken het zo concreet mogelijk terug: hoeveel fout-positieven en fout-negatieven levert dit op per 100 patiënten in mijn setting? Een model kan een hoge AUC hebben en toch te veel alarmen geven. Meer uitleg staat in [AUC uitgelegd voor zorgprofessionals](/blog/article-auc-uitgelegd-zorgprofessionals).

**Minuut 7: Is het model gecalibreerd?**  
Calibratie betekent: klopt de kans die het model noemt? Als het model 20% risico voorspelt, gebeurt de uitkomst dan bij ongeveer 20 van de 100 vergelijkbare patiënten? Slechte calibratie kan leiden tot overbehandeling of juist gemiste zorg. Zoek naar een calibratieplot, intercept, slope of beoordeling per risicogroep. Alleen "het model onderscheidt goed" is niet genoeg. Zie ook [Calibratie: de vergeten maat bij AI in de zorg](/blog/article-calibratie-ai-zorg).

**Minuut 8: Is bias onderzocht?**  
AI kan bestaande ongelijkheid versterken. Kijk of prestaties zijn uitgesplitst naar relevante subgroepen: geslacht, leeftijd, etniciteit, sociaaleconomische status, taal, comorbiditeit, zwangerschap, apparatuurtype of centrum. Let daarbij op de omvang van die subgroepen: als een artikel schrijft dat er "geen verschil" is gevonden, zegt dat weinig wanneer de subgroepen klein zijn of pas achteraf zijn gekozen.

**Minuut 9: Is de praktische toepassing duidelijk?**  
Een model is geen los getal. Zeker bij vroeg of verkennend onderzoek hoeft een artikel nog niet te beschrijven hoe het precies in de praktijk wordt ingevoerd. Maar het moet wel duidelijk maken waarvoor de uitkomst bedoeld is: welke gebruiker of stap in het zorgproces ermee geholpen zou zijn, en welke mogelijke vervolgstap logisch is. Als die koppeling ontbreekt, blijft het moeilijk om klinische waarde in te schatten.

**Minuut 10: Is er bewijs voor betere zorg?**  
De hoogste lat is niet modelprestatie, maar betere zorg. Denk aan minder complicaties, sneller juiste behandeling, minder onnodige diagnostiek, betere patiëntervaring of lagere werkdruk zonder extra schade. Idealiter is het model vooruitkijkend getest in de praktijk, liefst gerandomiseerd of met een zorgvuldig vergelijkingsontwerp. Decision curve analysis, impactanalyse of trialdata zijn sterker dan alleen een test op oude data. Zie voor verdieping [Van AUC naar echte winst: wanneer helpt AI in de kliniek?](/blog/article-van-auc-naar-klinische-winst).

<interactive name="checklist-10min"></interactive>

## Wat doe je na 10 minuten?

Gebruik de check niet als eindoordeel, maar als snelle oriëntatie.

**Groen: 9-10 punten.** De studie lijkt sterk genoeg om verder te lezen. Bekijk methoden, figuren en supplementen rustig. Kijk vooral of de claim past bij jouw patiënten en beoogde toepassing.

**Oranje: 3-8 punten.** Lees voorzichtig en gericht. Bij 6-8 punten kan de studie nog steeds waardevol zijn, maar de zwakke plekken bepalen hoeveel je ermee kunt. Bij 3-5 punten is meestal alleen een specifieke methode, dataset of claim interessant.

**Rood: 0-2 punten.** Sla de studie voorlopig over voor klinische besluitvorming. Bewaar hem hoogstens als technische achtergrond of als voorbeeld van wat nog onvoldoende is uitgewerkt.

## Waar komt deze check vandaan?

De check is een praktische samenvatting van terugkerende thema's uit officiële rapportage- en beoordelingsinstrumenten voor medische AI. Voor diagnostische accuratesse is STARD-AI relevant; voor predictiemodellen TRIPOD+AI en PROBAST+AI; voor trials CONSORT-AI; voor vroege klinische evaluatie DECIDE-AI. Deze richtlijnen zijn geen keurmerk, maar ze helpen zien wat minimaal transparant gerapporteerd moet zijn.

Kort vertaald:

| Instrument | Wanneer pak je deze erbij? | Wat maakt het duidelijk? |
|---|---|---|
| TRIPOD+AI | Het artikel ontwikkelt of rapporteert een predictiemodel. | Of populatie, voorspellers, uitkomst, modelontwikkeling en performance transparant zijn beschreven. |
| PROBAST+AI | Je wilt beoordelen of een predictiemodel betrouwbaar en toepasbaar is. | Of er risico is op bias door patiëntselectie, voorspellers, uitkomstdefinitie of analyse. |
| STARD-AI | Het artikel gaat over diagnostische accuratesse. | Of duidelijk is wie getest is, wat de referentiestandaard was en hoe goed de AI diagnose onderscheidt. |
| CONSORT-AI | De AI is onderzocht in een klinische trial. | Hoe de AI-interventie in de studie zat, welke versie is gebruikt en wat de klinische uitkomsten waren. |
| DECIDE-AI | Het artikel beschrijft vroege evaluatie in of rond de praktijk. | Of mens-AI-interactie, context en praktische toepassing voldoende zijn beschreven. |

Waarom dan toch deze korte versie? Omdat je vaak eerst wilt weten of een artikel jouw tijd waard is. De officiële lijsten zijn precieser, maar ook lang. Deze check haalt de snelste signalen naar voren: vraagstelling, populatie, uitkomst, dataopbouw, externe validatie, performance bij bruikbare drempels, calibratie, bias, beoogde toepassing en bewijs voor betere zorg.

Let vooral op de afstand tussen onderzoek en praktijk. Veel AI-studies testen een model op historische data: het model krijgt oude dossiers of beelden en voorspelt wat inmiddels al bekend is. Dat kan nuttig zijn voor ontwikkeling. Het zegt minder over wat er gebeurt wanneer een AI-uitkomst in een echt zorgproces wordt gebruikt. Zodra een AI-uitkomst beslissingen beïnvloedt, ontstaan nieuwe risico's: te veel vertrouwen in het systeem, extra meldingen, onduidelijke verantwoordelijkheid en veranderde diagnostische drempels.

Ook regels en toelating kunnen relevant zijn in je snelle beoordeling. In Europa vallen veel medische AI-systemen onder de regels voor medische hulpmiddelen en, afhankelijk van gebruik en risico, onder de EU AI Act. In de VS publiceert de FDA lijsten en guidance rond AI-enabled medical devices, met aandacht voor beheer over de hele levensduur en vooraf geplande wijzigingen. Praktisch betekent dit: controleer of het systeem bedoeld is als medisch hulpmiddel, of er toelating is voor deze indicatie, en hoe updates na invoering worden bewaakt.

## Rode vlaggen

Wees voorzichtig met artikelen die vooral grote claims gebruiken: “revolutionair”, “clinician-level”, “generalizable” zonder overtuigende externe validatie. Een AUC zonder klinische drempels is onvoldoende. Een model zonder calibratie-informatie is riskant wanneer het risicoschattingen geeft. Een dataset zonder duidelijke tijdslijn of patiëntscheiding kan datalek bevatten. Subgroepanalyse ontbreekt vaak juist waar verschillen klinisch relevant kunnen zijn.

Andere rode vlaggen: alleen één centrum, kleine testset, onduidelijke referentiestandaard, uitkomst die deels door het model beïnvloed had kunnen worden, geen vergelijking met standaardzorg, geen beschrijving van ontbrekende data, geen foutanalyse, onduidelijke beoogde toepassing, en belangenverstrengeling zonder onafhankelijke evaluatie. Als het artikel al implementatie of gebruik in de praktijk claimt, let dan ook op monitoring na invoering.

## Conclusie

Begin bij de vraagstelling, de patiëntengroep en de beoogde toepassing. Pas daarna komt het neurale netwerk.

In 10 minuten kun je meestal zien of een studie alleen technisch interessant is, of mogelijk relevant voor zorg. De kernvraag blijft: zou dit model, getest bij vergelijkbare patiënten en gebruikt op een logisch moment in het zorgproces, aantoonbaar betere zorg opleveren dan goede zorg zonder dit model?

## Verder lezen

Deze 10-minutencheck is de eerste stap. Als een artikel relevant blijft, kun je daarna één onderdeel verdiepen:

- [AUC uitgelegd voor zorgprofessionals](/blog/article-auc-uitgelegd-zorgprofessionals), als de studie vooral met AUC of ROC-curves overtuigt.
- [Calibratie: de vergeten maat bij AI in de zorg](/blog/article-calibratie-ai-zorg), als het model risico's of kansen geeft.
- [Niet alleen een ander ziekenhuis: wat maakt een externe validatiestudie echt goed?](/blog/article-goede-externe-validatiestudie), als je wilt beoordelen of de testpopulatie echt past.
- [Van AUC naar echte winst: wanneer helpt AI in de kliniek?](/blog/article-van-auc-naar-klinische-winst), als de vraag is of betere modelprestatie ook betere zorg oplevert.

De volgende stap in deze reeks wordt een apart artikel over officiële AI-checklists: welke gebruik je wanneer, en hoe ga je na deze snelle scan dieper beoordelen?

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

---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-35-32-019deffb-894d-76d0-916e-03bf5213b4f2.jsonl  ts: 2026-05-03T22:36:41.688Z -->

# Hoe beoordeel je een AI-artikel in 10 minuten?

AI-artikelen in de zorg kunnen indrukwekkend klinken: hoge AUC, grote datasets, deep learning, “expert-level performance”. Toch is de klinische vraag meestal eenvoudiger: helpt dit mijn patiënt, in mijn setting, zonder nieuwe schade te veroorzaken? Met onderstaande 10-minutencheck kun je snel bepalen of een AI-studie de moeite waard is om dieper te lezen, te bespreken in een journal club of voorlopig naast je neer te leggen.

## De snelle 10-minutencheck

**Minuut 1: Wat is de klinische taak?**  
Vraag eerst: welk besluit moet de AI ondersteunen? Diagnose, triage, prognose, behandeling, monitoring of administratieve workflow? Een model dat “sepsis voorspelt” is te vaag. Wanneer voorspelt het model sepsis, voor wie, met welke actie erna, en wie moet die actie uitvoeren?

**Minuut 2: Klopt de populatie?**  
Vergelijk de studiepopulatie met jouw patiënten. Leeftijd, comorbiditeit, ziektestadium, setting, apparatuur, taal, etniciteit, verwijspatroon en prevalentie doen ertoe. Een model uit één academisch centrum met geselecteerde patiënten is zelden direct toepasbaar in een perifere spoedpost of huisartsenpraktijk.

**Minuut 3: Is de uitkomst klinisch relevant?**  
Kijk of de uitkomst hard, reproduceerbaar en relevant is. Mortaliteit, IC-opname, pathologisch bevestigde diagnose of heropname zijn vaak sterker dan samengestelde, administratieve of proxy-uitkomsten. Let ook op timing: een voorspelling van verslechtering “binnen 24 uur” is alleen nuttig als er op dat moment nog iets te doen is.

**Minuut 4: Hoe is de dataset opgebouwd?**  
Check bron, periode, inclusiecriteria, exclusies en ontbrekende data. Zijn trainings-, validatie- en testdata echt gescheiden? Bij beeldvorming: komen meerdere beelden van dezelfde patiënt in verschillende sets terecht? Bij EPD-data: zijn variabelen beschikbaar vóór het beslismoment, of is er datalek uit de toekomst?

**Minuut 5: Is er externe validatie?**  
Interne validatie is een begin, geen eindpunt. Een goede AI-studie test het model bij voorkeur op data uit andere centra, andere tijdsperioden of andere systemen. Externe validatie is cruciaal omdat AI-modellen gevoelig zijn voor lokale patronen: scanners, labmethoden, codeergewoonten en behandelprotocollen.

**Minuut 6: Kijk verder dan AUC**  
Een hoge AUC betekent niet automatisch klinische bruikbaarheid. Zoek sensitiviteit, specificiteit, positief en negatief voorspellende waarde bij relevante drempels. Vraag: hoeveel fout-positieven en fout-negatieven levert dit op per 100 patiënten in mijn setting? Een model kan statistisch sterk zijn en praktisch onbruikbaar door te veel alarmen.

**Minuut 7: Is het model gecalibreerd?**  
Voor risicomodellen is calibratie essentieel: als het model 20% risico voorspelt, gebeurt de uitkomst dan ongeveer bij 20 van de 100 vergelijkbare patiënten? Slechte calibratie kan leiden tot overbehandeling of gemiste zorg. Zoek naar calibratieplots, intercept, slope of beoordeling per risicogroep, niet alleen naar discriminatie.

**Minuut 8: Is bias onderzocht?**  
AI kan bestaande ongelijkheid versterken. Kijk of prestaties zijn uitgesplitst naar relevante subgroepen: geslacht, leeftijd, etniciteit, sociaaleconomische status, taal, comorbiditeit, zwangerschap, apparatuurtype of centrum. “Geen verschil gevonden” is alleen geruststellend als de studie genoeg power had en de subgroepen vooraf logisch waren gekozen.

**Minuut 9: Past het in de workflow?**  
Een model is geen los getal, maar een interventie in een werksysteem. Wie ziet de output? Wanneer? In welk scherm? Hoe wordt onzekerheid getoond? Mag de arts afwijken? Is er training? Wordt alarmmoeheid gemeten? DECIDE-AI benadrukt terecht dat menselijke factoren en implementatiecontext onderdeel zijn van de klinische evaluatie, niet een voetnoot achteraf.

**Minuut 10: Is er bewijs voor clinical utility?**  
De hoogste lat is niet modelprestatie, maar betere zorg: minder complicaties, sneller juiste behandeling, minder onnodige diagnostiek, betere patiëntervaring of lagere werkdruk zonder schade. Idealiter is er prospectieve evaluatie, liefst gerandomiseerd of zorgvuldig quasi-experimenteel. Decision curve analysis, impactanalyse of trialdata zijn sterker dan alleen retrospectieve performance.

## Uitleg: wat maakt een AI-artikel geloofwaardig?

Begin met de vraag of het artikel past bij het type studie. Voor diagnostische accuratesse is STARD-AI relevant; voor predictiemodellen TRIPOD+AI en PROBAST+AI; voor trials CONSORT-AI; voor vroege klinische evaluatie DECIDE-AI. Deze richtlijnen zijn geen keurmerk, maar ze helpen zien wat minimaal transparant gerapporteerd moet zijn.

Kort vertaald: TRIPOD+AI helpt bij transparante rapportage van predictiemodellen, PROBAST+AI bij risico op bias en toepasbaarheid, STARD-AI bij diagnostische accuratesse, CONSORT-AI bij klinische trials met AI, en DECIDE-AI bij vroege klinische evaluatie in de workflow.

Let vooral op de afstand tussen onderzoek en praktijk. Veel AI-studies blijven steken in retrospectieve evaluatie: het model krijgt historische data en voorspelt wat al gebeurd is. Dat kan nuttig zijn voor ontwikkeling, maar zegt weinig over gedrag in de spreekkamer, op de SEH of in het MDO. Zodra een AI-output echte beslissingen beïnvloedt, ontstaan nieuwe risico’s: automation bias, alarmmoeheid, verschuiving van verantwoordelijkheid en veranderde diagnostische drempels.

Regulatoire context hoort ook in je snelle beoordeling. In Europa vallen veel medische AI-systemen onder bestaande medische-hulpmiddelenregels en, afhankelijk van gebruik en risico, onder de EU AI Act. In de VS publiceert de FDA lijsten en guidance rond AI-enabled medical devices, inclusief aandacht voor lifecycle management en vooraf bepaalde wijzigingsplannen. Voor de lezer betekent dit: vraag of het systeem bedoeld is als medisch hulpmiddel, of er markttoelating is voor de beoogde indicatie, en hoe updates na implementatie worden bewaakt.

## Rode vlaggen

Wantrouw artikelen die vooral marketingtaal gebruiken: “revolutionair”, “clinician-level”, “generalizable” zonder overtuigende externe validatie. Een AUC zonder klinische drempels is onvoldoende. Een model zonder calibratie-informatie is riskant wanneer het risicoschattingen geeft. Een dataset zonder duidelijke tijdslijn of patiëntscheiding kan datalek bevatten. Subgroepanalyse ontbreekt vaak precies waar bias het meest waarschijnlijk is.

Andere rode vlaggen: alleen één centrum, kleine testset, onduidelijke referentiestandaard, uitkomst die deels door het model beïnvloed had kunnen worden, geen vergelijking met standaardzorg, geen beschrijving van ontbrekende data, geen foutanalyse, geen workflowbeschrijving, geen monitoringplan na implementatie, en belangenverstrengeling zonder onafhankelijke evaluatie.

## Conclusie

Een AI-artikel beoordelen hoeft niet te beginnen met de architectuur van het neurale netwerk. Begin klinisch: patiënt, beslissing, uitkomst, setting en consequentie. Daarna pas modelprestatie. In 10 minuten kun je meestal onderscheiden of een studie alleen technisch interessant is, of mogelijk klinisch bruikbaar. De kernvraag blijft: zou dit model, getest bij mijn patiënten en ingebed in mijn workflow, aantoonbaar betere beslissingen opleveren dan goede zorg zonder dit model?

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


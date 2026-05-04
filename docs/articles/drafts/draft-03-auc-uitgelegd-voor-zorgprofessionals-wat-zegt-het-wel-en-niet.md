---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-35-33-019deffb-8a64-7d40-8bdd-45e9c2441702.jsonl  ts: 2026-05-03T22:36:40.635Z -->

# AUC uitgelegd voor zorgprofessionals: wat zegt het wel en niet?

In publicaties over medische AI staat AUC vaak pontificaal in de samenvatting: “het model behaalde een AUC van 0,89”. Dat klinkt alsof het model bijna klaar is voor gebruik. In werkelijkheid zegt AUC iets smaller, maar belangrijks: hoe goed het model patiënten kan rangschikken van laag naar hoog risico. Het zegt niet automatisch of de gekozen drempel klopt, of de kansen betrouwbaar zijn, of het model in jouw ziekenhuis betere zorg oplevert.

Deze uitleg volgt dezelfde leerlijn als een goede ROC/AUC-crash course: eerst scores, dan drempels, dan de ROC-curve, dan AUC als rangschikkingskans. We gebruiken alleen een eigen fictieve medische dataset en eigen visuals.

<interactive name="auc-playground"></interactive>

## 1. Begin met scores, niet met labels

Een AI-model voor bijvoorbeeld sepsis, intracraniële bloeding of heropname geeft vaak geen direct ja/nee-antwoord, maar een score tussen 0 en 1. Een patiënt met score 0,91 wordt door het model hoger verdacht dan een patiënt met score 0,18. Zolang je geen drempel kiest, heb je alleen een rangorde.

Dat is precies waar AUC begint. De vraag is: krijgen patiënten mét de uitkomst gemiddeld hogere scores dan patiënten zonder de uitkomst? Als het antwoord vaak ja is, discrimineert het model goed. Als de scores door elkaar lopen, zakt de AUC.

## 2. Een drempel maakt van scores beslissingen

In de kliniek moet je uiteindelijk handelen. Vanaf welke score alarmeer je het sepsisteam? Vanaf welke score markeer je een CT als urgent? Vanaf welke score stuur je iemand door voor aanvullende diagnostiek?

Bij een lage drempel noem je veel patiënten positief. Dat verhoogt meestal de sensitiviteit, omdat je minder echte gevallen mist. Tegelijk stijgt vaak het aantal fout-positieven. Bij een hoge drempel wordt het model strenger: minder fout-positieven, maar ook meer gemiste echte gevallen. Daarom horen sensitiviteit, specificiteit, PPV en NPV altijd bij een gekozen drempel.

In de interactieve module zie je dit direct. Schuif de drempel naar links en de fout-positieven nemen toe; schuif naar rechts en de fout-negatieven nemen toe. De ROC-curve vat alle mogelijke drempels samen.

## 3. ROC is de kaart van alle drempels

ROC staat voor *receiver operating characteristic*. De ROC-curve zet de true positive rate, oftewel sensitiviteit, op de y-as en de false positive rate, oftewel 1 - specificiteit, op de x-as. Elk punt op de curve hoort bij een andere drempel.

Een perfecte classifier gaat snel naar linksboven: hoge sensitiviteit zonder fout-positieven. Een model dat niet beter is dan toeval ligt rond de diagonaal. Een model onder de diagonaal rangschikt vaker verkeerd dan goed; theoretisch kun je dan de labels omdraaien en beter dan toeval worden.

Voor zorgprofessionals is vooral linksboven interessant, maar niet blind. Een punt met iets lagere sensitiviteit kan klinisch beter zijn als fout-positieven duur of schadelijk zijn. Een punt met meer fout-positieven kan juist acceptabel zijn als een fout-negatief gevaarlijk is.

## 4. AUC is de oppervlakte onder die curve

AUC staat voor *area under the curve*. Een AUC van 1,0 betekent perfecte rangschikking: elke patiënt met de uitkomst krijgt een hogere score dan elke patiënt zonder de uitkomst. Een AUC van 0,5 betekent toevalsniveau. Een AUC van 0,80 betekent praktisch: als je willekeurig één patiënt mét en één patiënt zonder de uitkomst kiest, geeft het model in ongeveer 80% van zulke paren de hogere score aan de patiënt mét de uitkomst.

Dat paar-idee is vaak de meest intuïtieve uitleg. AUC is geen percentage juiste diagnoses bij één drempel. Het is een drempelonafhankelijke rangordemaat.

## 5. Waarom AUC handig is

AUC is nuttig om te zien of een model überhaupt signaal oppikt. Als een longemboliemodel patiënten met embolie gemiddeld niet hoger scoort dan patiënten zonder embolie, is het weinig waard. AUC is ook handig om modellen grof te vergelijken in dezelfde validatiepopulatie, vooral vroeg in ontwikkeling.

Maar let op: AUC is relatief robuust voor monotone scoretransformaties. Als alle scores anders worden geschaald maar de rangorde gelijk blijft, blijft de AUC gelijk. Dat kan prettig zijn voor modelvergelijking, maar riskant als gebruikers denken dat de absolute kansen klinisch betrouwbaar zijn.

## 6. Waarom AUC in medische AI tekortschiet

AUC zegt niets over calibratie. Een model kan patiënten goed rangschikken en toch systematisch te hoge of te lage risico's geven. Als honderd patiënten elk “20% risico” krijgen, verwacht je ongeveer twintig uitkomsten. Als het er vijf of vijftig zijn, is de calibratie klinisch onveilig, ook bij een mooie AUC.

AUC zegt ook weinig over prevalentie. PPV en NPV veranderen sterk tussen een IC, SEH, polikliniek of screeningspopulatie. Een model met dezelfde sensitiviteit en specificiteit kan op een laag-prevalente afdeling vooral fout-positieve alarmen produceren. Dat leidt tot alarmmoeheid, extra diagnostiek en soms onnodige behandeling.

Verder zegt AUC niet of de workflow klopt. Een model met AUC 0,92 kan onbruikbaar zijn als het signaal te laat komt, onduidelijk is, geen handelingsoptie heeft of precies de patiënten markeert waarvoor de arts toch al actie zou nemen.

## 7. Kies drempels met klinische kosten in gedachten

Drempelkeuze is geen puur statistische keuze. Bij een triagemodel voor een potentieel levensbedreigende aandoening kan een fout-negatief zwaarder wegen dan een extra beoordeling. Bij selectie voor een belastende biopsie kan een fout-positief juist meer schade veroorzaken. De beste drempel is daarom contextafhankelijk.

Decision curve analysis kan hierbij helpen. Die methode vertaalt drempels naar netto voordeel en vergelijkt het model met eenvoudige strategieën zoals “behandel iedereen” of “behandel niemand”. Zo zie je of het model in het klinisch relevante drempelgebied meer goed dan kwaad doet.

## 8. Praktische checklist bij een AUC in een artikel

Vraag bij elke AUC:

1. Is de AUC gemeten op een onafhankelijke, liefst externe validatieset?
2. Lijkt de validatiepopulatie op mijn patiënten en workflow?
3. Worden sensitiviteit, specificiteit, PPV en NPV getoond bij klinisch relevante drempels?
4. Is calibratie onderzocht met plot, intercept en slope?
5. Zijn prestaties per subgroep gerapporteerd?
6. Is er gekeken naar clinical utility of decision curve analysis?
7. Is duidelijk wat er gebeurt bij fout-positieven en fout-negatieven?

## Kernboodschap

AUC vertelt hoe goed een model patiënten rangschikt. Dat is nuttig, maar onvoldoende voor medische besluitvorming. Voor veilige AI in de zorg heb je daarnaast drempels, calibratie, prevalentie, subgroepanalyse, workflow-evaluatie en klinische utility nodig. Een hoge AUC is dus geen eindpunt, maar het begin van de beoordeling.

## Bronnen

- Google Machine Learning Crash Course, “Classification: ROC and AUC”: https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc  
- Fawcett T. An introduction to ROC analysis. *Pattern Recognition Letters*. 2006. https://doi.org/10.1016/j.patrec.2005.10.010  
- Hanley JA, McNeil BJ. The meaning and use of the area under a receiver operating characteristic curve. *Radiology*. 1982. https://pubmed.ncbi.nlm.nih.gov/7063747/  
- TRIPOD Statement, BMJ/BMC Medicine: https://www.bmj.com/content/350/bmj.g7594 en https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-014-0241-z  
- ROC/AUC praktische uitleg voor radiologen, *Korean Journal of Radiology*: https://pmc.ncbi.nlm.nih.gov/articles/PMC2698108/  
- Calibration: the Achilles heel of predictive analytics, *BMC Medicine*: https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-019-1466-7  
- Decision Curve Analysis, Vickers & Elkin, *Medical Decision Making*: https://journals.sagepub.com/doi/10.1177/0272989X06295361  
- Stap-voor-stap uitleg decision curve analysis, *Diagnostic and Prognostic Research*: https://diagnprognres.biomedcentral.com/articles/10.1186/s41512-019-0064-7  


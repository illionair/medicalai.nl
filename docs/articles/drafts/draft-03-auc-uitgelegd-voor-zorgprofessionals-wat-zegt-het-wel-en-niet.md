---
status: draft
title: "AUC uitgelegd: wat zegt het wel en niet?"
seoTitle: "AUC uitgelegd: wat zegt het wel en niet?"
subtitle: "Wat AUC wel en niet vertelt over je model"
difficulty: middel
readingMinutes: 8
coverConcept: roc-curve
---

# AUC uitgelegd: wat zegt het wel en niet?

"Het model behaalde een AUC van 0,89." Dat klinkt geruststellend, maar het is nog geen volledig antwoord. AUC zegt vooral of een model patiënten met de uitkomst gemiddeld hoger op de lijst zet dan patiënten zonder die uitkomst. Het zegt niet vanzelf of de gekozen drempel logisch is, of de getoonde kans klopt, of het model past bij de beoogde toepassing.


Denk daarom vroeg aan drie praktische vragen:

1. Wie is getest: lijkt de validatieset op de patiënten, context en het meetmoment waarvoor je het model wilt begrijpen?
2. Bij welke drempel wordt gehandeld: wanneer leidt een score tot bellen, plannen, controleren of behandelen?
3. Wat gebeurt er als het model fout zit: wat kost een vals alarm, en wat kost een gemiste patiënt?

Pas daarna krijgt <term def="Area Under the ROC Curve — drempelvrije rangordemaat: kans dat een willekeurige patiënt mét uitkomst hoger scoort dan een willekeurige zonder.">AUC</term> klinische betekenis.

<tldr>
<li>AUC meet rangschikking, niet kalibratie of klinische winst.</li>
<li>Sensitiviteit, specificiteit, PPV en NPV horen altijd bij een gekozen drempel — niet bij het model als geheel.</li>
<li>Externe validatie, kalibratie en decision curve analysis helpen om AUC te vertalen naar mogelijke waarde in de praktijk.</li>
</tldr>

Hieronder bouwen we het in vier stappen op: eerst scores, dan drempels, dan de ROC-curve, dan AUC zelf. De voorbeelden zijn bedoeld als oefensituatie; de denkstappen zijn dezelfde als bij een echt model.

## 1. Begin bij scores, niet bij labels

Een sepsis-, bloeding- of heropnamemodel geeft zelden ja/nee terug. Het geeft een score tussen 0 en 1. Een patiënt met 0,91 staat hoger op de lijst dan eentje met 0,18. Zonder drempel heb je dus geen diagnose — je hebt een rangorde.

Daar begint AUC. De vraag is simpel: krijgen patiënten mét de uitkomst gemiddeld hogere scores dan patiënten zonder? Hieronder zie je patiënten op één score-as. Paarse vierkantjes zijn patiënten bij wie de uitkomst aanwezig is; oranje rondjes zijn patiënten zonder die uitkomst.

<interactive name="auc-scores"></interactive>

Vallen de paarse markers vooral rechts? Goed teken — er zit signaal in de scores. Liggen paars en oranje door elkaar? Dan valt er weinig te halen, hoe je de drempel ook legt.

<keytakeaway>Score is een rangorde, geen diagnose. Wat je ermee doet, hangt af van waar je de drempel legt.</keytakeaway>

## 2. Een drempel maakt van scores beslissingen

Een score krijgt pas betekenis wanneer er een drempel aan hangt. Vanaf welke score noem je het modelresultaat positief? En wat betekent positief dan: extra controle, aanvullende diagnostiek, eerder bespreken of juist niets doen zonder andere informatie?

Lage drempel: je noemt veel patiënten positief. Je mist minder echte gevallen (sensitiviteit omhoog), maar je krijgt ook meer vals alarm. Hoge drempel: omgekeerd. Daarom horen sensitiviteit, specificiteit, <term def="Positive Predictive Value — kans dat een patiënt met positief modelresultaat ook echt de uitkomst heeft. Hangt sterk af van prevalentie.">PPV</term> en <term def="Negative Predictive Value — kans dat een patiënt met negatief modelresultaat ook echt geen uitkomst heeft.">NPV</term> altíjd bij een gekozen drempel — niet bij het model in zijn geheel.

<interactive name="auc-threshold" data-props='{"initialThreshold":0.58}'></interactive>

Schuif zelf en wissel tussen gescheiden, overlappende en scheef verdeelde data. Zo zie je welke patiënten over de drempellijn vallen, en wat dat doet met fout-positieven en gemiste gevallen.

Een mini-rekenvoorbeeld maakt de drempel concreet. Stel: in een groep van 1.000 patiënten heeft 10% de uitkomst, dus 100 patiënten. Bij een gekozen drempel haalt het model 80% sensitiviteit en 90% specificiteit. Dan vang je 80 echte gevallen, mis je 20, en krijg je 90 vals-positieve signalen onder de 900 patiënten zonder uitkomst. De PPV is dan 80 / (80 + 90) = 47%. Een positief modelresultaat is dus bijna de helft van de tijd terecht. Als dezelfde test wordt gebruikt in een populatie met 2% prevalentie, daalt de PPV sterk, ook al blijven sensitiviteit en specificiteit gelijk.

<keytakeaway>Drempelkeuze bepaalt de consequenties. Je weegt wat een fout-positief versus een fout-negatief in de beoogde toepassing kost.</keytakeaway>

## 3. ROC: alle drempels tegelijk

<term def="Receiver Operating Characteristic — curve die voor elke drempel sensitiviteit (y) tegen 1−specificiteit (x) uitzet.">ROC</term> staat voor *receiver operating characteristic*. Op de y-as: sensitiviteit. Op de x-as: 1 − specificiteit, ofwel het aandeel patiënten zonder uitkomst dat ten onrechte een alarm krijgt. Elk punt op de curve is één drempel.

Een sterk model duikt naar linksboven: veel echte gevallen vangen, weinig vals alarm. De diagonaal is gokken. Onder de diagonaal? Dan rangschikt het model averechts en levert labels omdraaien een beter model op.

<interactive name="auc-roc"></interactive>

Linksboven is meestal het beste, maar niet altijd. Bij selectie voor een belastende test weegt een fout-positief zwaar. Bij vroege herkenning van een ernstige uitkomst weegt een gemiste casus zwaar. Welke drempel klopt, hangt af van wat de fout kost.

## 4. AUC: oppervlakte onder de curve

AUC = oppervlakte onder de ROC-curve. 1,00 is perfecte rangschikking, 0,50 is een muntje opgooien. Een AUC van 0,80 betekent in de praktijk: pak willekeurig één patiënt mét en één zonder de uitkomst, dan geeft het model in 80% van die paren de hogere score aan de juiste persoon.

<interactive name="auc-pairs"></interactive>

Dat paar-idee is de meest praktische uitleg. AUC is dus géén percentage juiste diagnoses bij één drempel. Het is een drempelvrije rangordemaat.

## Waarom AUC handig is

Eerste kwaliteitsvraag: pikt het model überhaupt iets op? Als een longemboliemodel embolieën gemiddeld niet hoger scoort dan controles, hoef je verder weinig te onderzoeken. Twee modellen vergelijken op dezelfde validatieset gaat ook prima met AUC.

Let op: AUC verandert niet als je alle scores herschaalt. Verschuif de schaal, behoud de rangorde, en de AUC blijft gelijk. Voor modelvergelijking handig — voor het vertrouwen in absolute kansen riskant.

## Waarom AUC alléén tekortschiet

<callout type="warning" title="Drie dingen die AUC niét vertelt">
<p><strong>Geen <term def="Mate waarin voorspelde kansen overeenkomen met werkelijke uitkomsten — bv. krijgen patiënten met 20% voorspeld risico ook echt 20% events?">kalibratie</term>.</strong> Een model kan keurig rangschikken en toch consequent te hoog of te laag inschatten. Honderd patiënten met "20% risico" en in werkelijkheid vijftig events? Klinisch onveilig, ook bij AUC 0,90.</p>
<p><strong>Geen prevalentie.</strong> PPV en NPV verschuiven flink tussen populaties met veel of weinig patiënten met de uitkomst. Hetzelfde model met dezelfde sensitiviteit kan bij lage prevalentie vooral vals-positieve signalen geven.</p>
<p><strong>Geen praktische waarde.</strong> AUC 0,92 zegt niet of de uitslag op tijd komt, iets toevoegt aan bestaande informatie of leidt tot een betere vervolgstap.</p>
</callout>

## Drempels kiezen met klinische kosten in gedachten

Drempelkeuze is een inhoudelijke keuze. Bij vroege herkenning van een ernstige uitkomst weegt een gemiste casus vaak zwaarder dan een extra beoordeling. Bij selectie voor een belastende test kan dat andersom liggen.

<term def="Decision Curve Analysis — methode die voor elke drempel netto klinische winst toont, vergeleken met 'behandel iedereen' en 'behandel niemand'.">Decision curve analysis</term> maakt dat expliciet: welke drempels leveren netto winst op, vergeleken met simpele strategieën als "behandel iedereen" of "behandel niemand"? Zo zie je of het model in het klinisch relevante drempelgebied meer goed dan kwaad doet.

Neem een model dat risico op een ernstige uitkomst voorspelt. Een artikel met alleen AUC laat dan nog veel open. Je wilt ook weten wat er bij een gekozen drempel gebeurt: hoeveel patiënten worden positief gemarkeerd, hoeveel daarvan hebben werkelijk de uitkomst, hoeveel worden gemist, en komt de voorspelling vroeg genoeg om iets zinvols te doen?

## Snelle check bij elke AUC die je tegenkomt

1. Externe validatieset, of intern getest?
2. Lijkt die populatie op de patiënten en context waarvoor je het artikel leest?
3. Worden sensitiviteit, specificiteit, PPV en NPV bij relevante drempels getoond?
4. Is kalibratie onderzocht (plot, intercept, slope)?
5. Zijn er subgroepresultaten?
6. Decision curve of clinical utility-analyse aanwezig?
7. Wat gebeurt er bij een fout-positief, en bij een fout-negatief?

## Tot slot

AUC vertelt hoe goed een model rangschikt. Dat is nuttig, maar het is een startpunt, geen groen licht. Voor veilige toepassing horen drempels, kalibratie, prevalentie, subgroepen, praktische bruikbaarheid en klinische winst er allemaal bij.

## Bronnen

- Google Machine Learning Crash Course, "Classification: ROC and AUC": https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc
- Fawcett T. An introduction to ROC analysis. *Pattern Recognition Letters*. 2006. https://doi.org/10.1016/j.patrec.2005.10.010
- Hanley JA, McNeil BJ. The meaning and use of the area under a receiver operating characteristic curve. *Radiology*. 1982. https://pubmed.ncbi.nlm.nih.gov/7063747/
- TRIPOD Statement, BMJ/BMC Medicine: https://www.bmj.com/content/350/bmj.g7594 en https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-014-0241-z
- ROC/AUC praktische uitleg voor radiologen, *Korean Journal of Radiology*: https://pmc.ncbi.nlm.nih.gov/articles/PMC2698108/
- Calibration: the Achilles heel of predictive analytics, *BMC Medicine*: https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-019-1466-7
- Decision Curve Analysis, Vickers & Elkin, *Medical Decision Making*: https://journals.sagepub.com/doi/10.1177/0272989X06295361
- Stap-voor-stap uitleg decision curve analysis, *Diagnostic and Prognostic Research*: https://diagnprognres.biomedcentral.com/articles/10.1186/s41512-019-0064-7

---
status: draft
source: codex
created: 2026-05-05
needs_review: true
---

# Wat is hyperparametertuning?

Hyperparametertuning klinkt alsof je diep in de machinekamer van AI moet staan. Maar het basisidee is veel menselijker: je hebt een model gekozen, en nu moet je instellen hoe gevoelig, streng of voorzichtig het mag leren.

Vergelijk het met een stethoscoop of echoapparaat. Voordat je luistert of kijkt, stel je gevoeligheid, frequentie en ruisfilter af. Die instellingen bepalen niet wat de patiënt heeft, maar wel hoe goed je het signaal kunt oppikken zonder elk bijgeluid voor pathologie aan te zien. Bij AI doen hyperparameters iets vergelijkbaars: ze bepalen de leerhouding van het model voordat het de patronen uit patiëntdata leert.

<interactive name="hyperparameter-tuning-lab"></interactive>

## Parameters versus hyperparameters

Een **parameter** leert het model uit de data. Bij een eenvoudig sepsismodel kunnen dat bijvoorbeeld de gewichten zijn bij leeftijd, temperatuur, hartfrequentie, bloeddruk, CRP of leukocyten. Na training heeft het model geleerd hoeveel elk kenmerk meetelt in de voorspelling.

Een **hyperparameter** kies je vóór of tijdens het trainen. Het model leert die instelling niet zelf uit de patiëntdata. Jij bepaalt bijvoorbeeld hoe complex het model mag worden, hoe streng het wordt afgeremd, of wanneer het moet stoppen met leren.

Kort gezegd: parameters zijn wat het model leert. Hyperparameters bepalen hoe het model mag leren.

## Eén voorbeeld: een random forest voor sepsisrisico

Neem een random forest dat op basis van EPD- en labdata een sepsisrisico voorspelt. Een random forest bouwt veel beslisbomen. Elke boom stelt simpele vragen: is de temperatuur hoger dan een bepaalde waarde, is de bloeddruk laag, is CRP verhoogd, is er zuurstofbehoefte? Aan het eind stemmen de bomen samen over het risico.

Bij zo'n model zijn drie hyperparameters goed te begrijpen:

- **Aantal bomen:** meer bomen maken de stemming stabieler, maar kosten meer rekentijd.
- **Maximale diepte:** diepe bomen kunnen subtiele patronen leren, maar ook lokale toevalligheden onthouden.
- **Minimum aantal patiënten per eindblad:** als elk eindblad genoeg patiënten moet bevatten, wordt de boom rustiger en minder gevoelig voor uitzonderingen.

Dit is genoeg om het principe te snappen. Een te vrij model kan het trainingsziekenhuis uit het hoofd leren. Een te streng model mist echte signalen. Tuning zoekt de instelling die het beste generaliseert naar nieuwe patiënten.

## Wat betekent “beter” bij tuning?

De verleiding is om te zeggen: de instelling met de hoogste AUC wint. In medische AI is dat te smal. Een getuned model moet niet alleen goed scoren op papier, maar ook stabiel, gecalibreerd, uitlegbaar genoeg en praktisch bruikbaar zijn.

Stel dat twee instellingen bijna dezelfde AUC hebben. De ene gebruikt zeer diepe bomen en geeft wisselende risicoschattingen per subgroep. De andere is iets eenvoudiger, heeft betere calibratie en blijft stabieler in een latere periode. Voor klinisch gebruik is de tweede vaak verstandiger.

## De testset mag niet meepraten

Een nette tuningprocedure heeft drie gescheiden rollen:

1. **Trainingsdata:** hier leert het model zijn parameters.
2. **Validatiedata of cross-validatie:** hier vergelijk je hyperparameterinstellingen.
3. **Testdata:** hier kijk je pas aan het eind één keer hoe het gekozen model presteert.

Als je de testset gebruikt om hyperparameters te kiezen, is het geen testset meer. Dan heeft de testset meegepraat in de ontwikkeling en wordt de eindscore te optimistisch. Dat is alsof je een examen oefent met precies dezelfde vragen en daarna doet alsof het een onafhankelijke toets was.

## Grid search en random search

Bij **grid search** probeer je alle combinaties uit een vooraf gekozen rooster. Bijvoorbeeld: 100, 300 of 500 bomen; maximale diepte 3, 5 of 8; minimaal 10, 25 of 50 patiënten per blad. Dat is overzichtelijk, maar het aantal combinaties groeit snel.

Bij **random search** kies je willekeurige combinaties uit een redelijke zoekruimte. Dat klinkt minder systematisch, maar werkt vaak goed omdat meestal maar een paar instellingen echt veel invloed hebben. De les voor lezers is niet dat één methode altijd beter is, maar dat de zoekruimte vooraf logisch moet zijn en binnen de trainings- en validatiedata moet blijven.

## Overfitting: te goed afgestemd op de oefenpopulatie

Hyperparametertuning kan overfitting verminderen, maar ook veroorzaken. Als je heel veel combinaties probeert en telkens de beste validatiescore kiest, vind je op den duur misschien een instelling die toevallig goed past bij die ene dataset. De score stijgt, maar de betrouwbaarheid buiten het ziekenhuis daalt.

Daarom zijn patient-level splits, temporele validatie en externe validatie belangrijk. Bij medische data mogen records van dezelfde patiënt niet verspreid raken over train en test. Bij tijdgevoelige modellen is testen op latere patiënten vaak realistischer dan een willekeurige split.

## Termen die je vaak tegenkomt

Sommige hyperparameters horen vooral bij neurale netwerken. Je hoeft ze niet allemaal te kunnen afstellen, maar je moet wel herkennen wat ze ongeveer betekenen:

- **Batch size:** hoeveel voorbeelden het model tegelijk gebruikt voordat het zijn interne gewichten bijwerkt.
- **Learning rate:** hoe groot de leerstappen zijn. Te groot kan instabiel worden; te klein leert traag.
- **Regularisatie:** verzamelnaam voor technieken die een model afremmen zodat het minder snel ruis onthoudt.
- **Dropout:** een regularisatietechniek waarbij tijdens training telkens een deel van het netwerk tijdelijk wordt uitgezet.
- **Weight decay:** een regularisatietechniek die te grote gewichten ontmoedigt.

Voor een basisartikel is dit genoeg. CNN-filters, kernel size en pooling horen eerder thuis in een apart stuk over beeldmodellen.

## Wat maakt tuning klinisch lastig?

In medische AI is de beste instelling niet altijd de instelling met de hoogste gemiddelde score. Soms wil je een stabieler model met iets lagere performance, maar betere calibratie. Soms wil je een eenvoudiger model dat makkelijker uit te leggen is aan gebruikers. Soms is rekentijd belangrijk, bijvoorbeeld bij triage of monitoring. En soms is een opvallend hoge score juist verdacht, omdat het model een lokaal shortcut of datalek heeft geleerd.

Tuning hoort daarom altijd samen te gaan met:

- patient-level of episode-level splits;
- een aparte validatieset of nested cross-validatie;
- calibratiecontrole;
- subgroepanalyse;
- externe of temporele validatie;
- duidelijke rapportage van alle tuningkeuzes.

## Praktische checklist

Vraag bij een getuned model:

1. Is duidelijk welk modeltype is gebruikt?
2. Welke hyperparameters zijn getuned en waarom?
3. Hoe groot was de zoekruimte?
4. Is tuning gescheiden van de eindtestset?
5. Is er nested cross-validatie, een validatieset of externe validatie gebruikt?
6. Zijn calibratie en subgroepen na tuning opnieuw bekeken?
7. Is het gekozen model ook praktisch uitvoerbaar in de workflow?

## Kernboodschap

Hyperparametertuning is niet “aan knoppen draaien tot de score stijgt”. Het is gecontroleerd kiezen hoe een model mag leren. Je moet begrijpen welke knoppen de complexiteit en voorzichtigheid van het model bepalen, en je moet de eindtestset beschermen. In medische AI is een goed getuned model niet alleen beter op papier, maar vooral betrouwbaarder bij nieuwe patiënten.

## Bronnen

- scikit-learn. *Tuning the hyper-parameters of an estimator*. https://scikit-learn.org/stable/modules/grid_search.html  
- scikit-learn. *RandomizedSearchCV*. https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html  
- TensorFlow. *Introduction to the Keras Tuner*. https://www.tensorflow.org/tutorials/keras/keras_tuner  
- XGBoost documentation. *XGBoost Parameters*. https://xgboost.readthedocs.io/en/stable/parameter.html  
- scikit-learn. *Ensembles: gradient boosting, random forests, bagging, voting, stacking*. https://scikit-learn.org/stable/modules/ensemble.html  
- Bergstra J, Bengio Y. *Random Search for Hyper-Parameter Optimization*. Journal of Machine Learning Research, 2012. https://jmlr.org/papers/v13/bergstra12a.html  
- Google for Developers. *Machine Learning Crash Course*. https://developers.google.com/machine-learning/crash-course

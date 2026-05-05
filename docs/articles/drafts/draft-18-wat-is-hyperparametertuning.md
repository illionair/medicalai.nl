---
status: draft
source: codex
created: 2026-05-05
needs_review: true
---

# Wat is hyperparametertuning?

Hyperparametertuning klinkt als iets dat vooral in notebooks, GPU-clusters en Kaggle-discussies leeft. In werkelijkheid is het een heel menselijk probleem: je hebt een model gekozen, maar je moet nog bepalen hoe gevoelig, groot, streng, snel of voorzichtig dat model mag zijn.

Een model is niet één vaste machine. Het is eerder een apparaat met knoppen. Sommige knoppen bepalen hoe het model leert. Andere knoppen bepalen hoe complex het model mag worden. Nog weer andere knoppen bepalen hoeveel ruis het model mag negeren. Hyperparametertuning is het zorgvuldig instellen van die knoppen, zonder jezelf voor de gek te houden met een testset die je stiekem al hebt gebruikt.

<interactive name="hyperparameter-tuning-lab"></interactive>

## Parameters versus hyperparameters

Een **parameter** leert het model uit de data. Bij een logistisch regressiemodel zijn dat bijvoorbeeld de gewichten bij leeftijd, CRP, bloeddruk of CT-kenmerken. Bij een neuraal netwerk zijn het de gewichten tussen neuronen. Bij een random forest zijn het de splits in de bomen.

Een **hyperparameter** kies je vóór of tijdens het trainingsproces. Denk aan het aantal bomen in een random forest, de maximale diepte van een boom, de learning rate van XGBoost, het aantal lagen in een neuraal netwerk, de dropout, de batch size of het aantal filters in een CNN.

Kort gezegd: parameters worden geleerd. Hyperparameters bepalen hoe het leren mag gebeuren.

## Eerst begrijpen welk model je hebt

De grootste fout bij tuning is direct aan knoppen draaien zonder te weten wat het apparaat doet. Bij medische AI is dat gevaarlijk, omdat een hogere interne AUC soms vooral betekent dat je model beter is geworden in het onthouden van lokale patronen, niet in het generaliseren naar nieuwe patiënten.

Begin daarom met drie vragen:

1. Wat voor model is dit: lineair, boom-gebaseerd, boosting, neuraal netwerk, CNN, transformer?
2. Welke knoppen bepalen vooral complexiteit, regularisatie en leersnelheid?
3. Welke validatie past bij de klinische vraag: random split, patient-level split, temporal split, externe validatie?

Pas daarna komt tuning.

## Tuning is geen magie, maar meten met discipline

Een nette tuningprocedure heeft meestal vier onderdelen. Eerst kies je een model en een redelijke zoekruimte. Daarna train je veel kandidaatmodellen binnen cross-validatie of een validatieset. Vervolgens kies je niet automatisch het model met de hoogste score, maar het model met de beste balans tussen prestatie, stabiliteit, uitlegbaarheid en kosten. Tot slot test je één keer op een onafhankelijke testset.

Die laatste stap is belangrijk. Als je de testset gebruikt om hyperparameters te kiezen, is het geen testset meer. Dan is het een onderdeel van de training geworden.

## Voorbeeld 1: neurale netwerken

Bij een gewoon neuraal netwerk zijn bekende hyperparameters:

- **Aantal lagen en neuronen:** meer capaciteit kan complexere patronen leren, maar ook sneller overfitten.
- **Learning rate:** bepaalt hoe groot de update-stappen zijn. Te hoog kan instabiel worden; te laag leert traag of blijft hangen.
- **Batch size:** bepaalt hoeveel voorbeelden per update worden gebruikt.
- **Dropout en weight decay:** regularisatie die het model minder afhankelijk maakt van toevallige patronen.
- **Aantal epochs en early stopping:** wanneer stop je met trainen?

Menselijk gezegd: je probeert te voorkomen dat het netwerk elke patiënt uit het trainingsziekenhuis uit het hoofd leert, terwijl het toch genoeg vrijheid heeft om echte medische patronen te herkennen.

## Voorbeeld 2: random forest

Een random forest bouwt veel beslisbomen en laat ze samen stemmen. Belangrijke hyperparameters zijn:

- **n_estimators:** het aantal bomen.
- **max_depth:** hoe diep elke boom mag gaan.
- **min_samples_leaf:** hoeveel voorbeelden minimaal in een eindblad moeten zitten.
- **max_features:** hoeveel variabelen elke split mag bekijken.
- **class_weight:** handig bij scheve uitkomsten, zoals zeldzame events.

Een dieper forest kan meer nuance leren, maar ook kleine toevalligheden in de trainingsdata vasthouden. Een grotere `min_samples_leaf` maakt bomen rustiger en vaak beter generaliseerbaar.

## Voorbeeld 3: XGBoost

XGBoost bouwt bomen na elkaar. Elke nieuwe boom probeert fouten van de vorige bomen te corrigeren. Daardoor is het krachtig, vooral op tabulaire data, maar ook gevoelig voor tuning.

Veelgebruikte hyperparameters zijn:

- **learning_rate / eta:** hoe groot elke correctiestap is.
- **n_estimators:** hoeveel bomen achter elkaar worden gebouwd.
- **max_depth:** hoe complex elke boom mag zijn.
- **min_child_weight, gamma:** maken splits conservatiever.
- **subsample en colsample_bytree:** gebruiken per boom maar een deel van patiënten of variabelen.
- **reg_alpha en reg_lambda:** L1- en L2-regularisatie.

Een veelvoorkomende strategie is: lagere learning rate, meer bomen, early stopping, en daarna pas diepte en regularisatie fijner afstellen.

## Voorbeeld 4: CNN's

Een convolutioneel neuraal netwerk, of CNN, wordt vaak gebruikt voor beelden zoals röntgenfoto's, CT-slices, dermatoscopie of pathologie. De knoppen zijn deels anders:

- **Aantal filters:** hoeveel beeldpatronen elke laag mag leren.
- **Kernel size:** hoe groot het lokale venster is waar het model naar kijkt.
- **Aantal convolutionele blokken:** hoe diep de beeldrepresentatie wordt.
- **Pooling:** hoe snel ruimtelijke informatie wordt samengevat.
- **Data augmentation:** rotaties, crops, kleurvariatie of andere beeldtransformaties.
- **Transfer learning:** start je vanaf een model dat al op veel beelden is voorgetraind?

Bij medische beelden is patient-level splitting cruciaal. Als slices van dezelfde patiënt in train en test belanden, lijkt de tuning geweldig, maar is de validatie lek.

## Grid search, random search en slimmer zoeken

Grid search probeert alle combinaties uit een vooraf gekozen rooster. Dat is overzichtelijk, maar kan snel duur worden. Random search kiest willekeurige combinaties uit verdelingen. Dat klinkt minder systematisch, maar werkt vaak verrassend goed, vooral wanneer maar een paar hyperparameters echt veel invloed hebben.

Daarna komen methoden zoals Bayesian optimization, Hyperband en successive halving. Die proberen sneller te leren welke regio's van de zoekruimte veelbelovend zijn. Toch blijft het principe hetzelfde: je zoekt binnen trainings- en validatiedata, niet op de eindtest.

## Wat maakt tuning klinisch lastig?

In medische AI is de beste hyperparameterinstelling niet altijd de hoogste gemiddelde AUC. Soms wil je een stabieler model met iets lagere performance, maar betere calibratie. Soms wil je een eenvoudiger model dat artsen kunnen begrijpen. Soms is inferentietijd belangrijker dan een kleine winst in validatiescore. En soms is een model dat lokaal perfect lijkt juist verdacht, omdat het mogelijk datalek, populatieshift of site-specifieke shortcuts heeft geleerd.

Daarom hoort tuning altijd samen te gaan met:

- patient-level of episode-level splits;
- nested cross-validatie of een aparte validatieset;
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

Hyperparametertuning is niet “aan knoppen draaien tot de score stijgt”. Het is gecontroleerd kiezen hoe een model mag leren. Je moet eerst begrijpen welk model je gebruikt, welke knoppen echt betekenis hebben, en welke validatie voorkomt dat je jezelf voor de gek houdt. In medische AI is een goed getuned model niet alleen beter op papier, maar vooral betrouwbaarder buiten het notebook.

## Bronnen

- scikit-learn. *Tuning the hyper-parameters of an estimator*. https://scikit-learn.org/stable/modules/grid_search.html  
- scikit-learn. *RandomizedSearchCV*. https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html  
- TensorFlow. *Introduction to the Keras Tuner*. https://www.tensorflow.org/tutorials/keras/keras_tuner  
- XGBoost documentation. *XGBoost Parameters*. https://xgboost.readthedocs.io/en/stable/parameter.html  
- scikit-learn. *Ensembles: gradient boosting, random forests, bagging, voting, stacking*. https://scikit-learn.org/stable/modules/ensemble.html  
- Bergstra J, Bengio Y. *Random Search for Hyper-Parameter Optimization*. Journal of Machine Learning Research, 2012. https://jmlr.org/papers/v13/bergstra12a.html  
- Google for Developers. *Machine Learning Crash Course*. https://developers.google.com/machine-learning/crash-course

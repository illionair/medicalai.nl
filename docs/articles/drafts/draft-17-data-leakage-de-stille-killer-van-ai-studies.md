---
status: draft
title: "Data leakage: AUC 0,97 die je niet vertrouwt"
seoTitle: "Data leakage: de stille killer van AI-studies"
subtitle: "Waarom indrukwekkende prestaties op papier vaak doorprikken in de praktijk"
difficulty: diep
readingMinutes: 9
coverConcept: leaky-pipe
---

# Data leakage: AUC 0,97 die je niet vertrouwt

Een AI-model met een AUC van 0,97 klinkt indrukwekkend. Totdat blijkt dat het model tijdens training of evaluatie stiekem informatie heeft gezien die in de echte klinische praktijk niet beschikbaar zou zijn. Dat is data leakage: een methodologische fout die prestaties op papier opblaast en vertrouwen in toepassing ondermijnt.

<tldr>
<li>Leakage maakt prestaties artificieel hoog en verraadt zich vaak pas bij externe validatie.</li>
<li>De kernvraag: zou deze informatie er zijn op het exacte moment dat het model in de praktijk een voorspelling moet doen?</li>
<li>Patient-level splits, tijdgescheiden validatie en pipelines voor preprocessing voorkomen het meeste.</li>
</tldr>

Dit conceptartikel is educatief bedoeld voor beoordeling van AI-literatuur. Het is geen medisch, juridisch of regulatorisch advies.

## Wat is data leakage?

Data leakage ontstaat wanneer informatie uit de toekomst, uit de testset, uit de labelprocedure of uit herhaalde metingen terechtkomt in de modelontwikkeling. Het verraderlijke is dat leakage vaak niet zichtbaar is aan de resultaten. Integendeel: het model lijkt juist uitzonderlijk goed.

Voor klinische AI is de kernvraag simpel: zou deze informatie beschikbaar zijn op het exacte moment waarop het model in de praktijk een voorspelling moet doen? Als het antwoord nee is, of twijfelachtig, is er risico op leakage.

<keytakeaway>Een verdacht hoge AUC is geen prijs maar een rode vlag. Vraag direct: welke informatie zat in de training die in productie zou ontbreken?</keytakeaway>

<interactive name="data-leakage-simulator"></interactive>

## Waar gaat het mis?

### Train/test contamination

Treedt op wanneer testdata direct of indirect worden gebruikt bij training, featureselectie, hyperparameter tuning, threshold-keuze of modelselectie. Ook herhaald "even kijken" naar de testset om keuzes bij te stellen is contaminatie. De testset is dan geen onafhankelijke toets meer, maar onderdeel van het ontwikkelproces.

### Patient-level leakage

Klassiek in medische datasets. Als meerdere opnames, beelden, slices of metingen van dezelfde patiënt over train en test worden verdeeld, leert het model patiëntspecifieke patronen in plaats van generaliseerbare ziekte-informatie. Bij beeldvorming kan dit gebeuren wanneer 2D-slices uit dezelfde CT-scan als losse observaties worden gesplitst.

### Duplicate images en records

Versterken het probleem. Publieke datasets bevatten soms identieke of bijna-identieke beelden, heruploads, afgeleide crops of augmented varianten. Als augmentatie vóór de split gebeurt, kunnen varianten van hetzelfde beeld in train en test belanden.

### Temporal leakage

Ontstaat wanneer een willekeurige split over tijd wordt gebruikt terwijl het model later op toekomstige patiënten moet werken. Toekomstige behandelprotocollen, coderingspraktijken, laboratoriumassays of pandemiegolven kunnen dan onbedoeld in de training zitten. Een tijdgebaseerde validatie is vaak realistischer.

### Preprocessing leakage

Subtiel en veelvoorkomend. Normalisatie, imputatie, PCA, featureselectie, oversampling of tekstvectorisatie mogen niet op de volledige dataset worden "gefit". Eerst splitsen, daarna alle preprocessing uitsluitend leren op de trainingsdata, bij voorkeur in een pipeline binnen cross-validatie.

### Label leakage

Ontstaat wanneer predictors het label verraden. Denk aan een variabele "palliatief beleid" in een mortaliteitsmodel, een radiologieverslag dat de diagnose al noemt, een labaanvraag die alleen bij verdachte patiënten gebeurt, of een outcome die mede uit dezelfde bron is afgeleid als de predictor.

### Leakage via follow-up of behandeling

Treedt op wanneer het model zogenaamd bij opname voorspelt, maar variabelen gebruikt die pas na behandeling, IC-opname, ontslag of latere follow-up beschikbaar zijn. Behandeling kan bovendien mediator zijn: het model leert dan de reactie van het zorgsysteem, niet het oorspronkelijke risico.

### Feature engineering die toekomst inpakt

"Aantal dagen tot ontslag", "laatste labwaarde tijdens opname", "maximale zuurstofbehoefte" of "aantal controles na diagnose" lijken nette features, maar kunnen toekomstinformatie bevatten. Ook ziekenhuis-ID, scannerprotocol of metadata kunnen als proxy werken voor diagnose of zorgpad.

## Cross-validatie is geen vrijbrief

<callout type="warning" title="K-fold beschermt niet automatisch">
<p>Row-level K-fold is ongeschikt bij herhaalde metingen per patiënt, multicenterdata of tijdsafhankelijke data. Gebruik waar passend <term def="Variant van K-fold die alle records van dezelfde groep (patiënt, episode, centrum) in dezelfde fold houdt.">GroupKFold</term> op patiënt-, episode- of centrum-ID, tijdgescheiden validatie, en nested cross-validation voor hyperparameter tuning. De externe testset blijft gesloten tot het eind.</p>
</callout>

## Detectie en preventie

Begin met een <term def="Het klinische moment waarop de voorspelling wordt gedaan — alleen informatie van vóór dit moment mag het model gebruiken.">index time</term>: het klinische moment waarop de voorspelling wordt gedaan. Maak daarna een datalijn: welke variabele bestond vóór dit moment, welke erna, en wie kende het label?

Signalen van mogelijke leakage zijn verdacht hoge prestaties, grote kloof tussen interne en externe validatie, uitstekende performance met klinisch onwaarschijnlijke features, of modellen die goed scoren op metadata maar slecht op inhoud. Detectie kan met patiënt-ID-overlapchecks, hashing of perceptual hashing voor beelden, near-duplicate search, ablation studies, simpele baseline-modellen, random-label tests en externe validatie per tijdsperiode of centrum.

Preventie vraagt procesdiscipline: protocol vooraf vastleggen, split vóór preprocessing, testset locken, pipelines gebruiken, alle tuning binnen de trainingsdata houden, en de exacte partitions rapporteren. TRIPOD+AI helpt bij transparante rapportage van prediction models. PROBAST+AI helpt reviewers risico op bias en toepasbaarheid beoordelen. CLAIM is vooral relevant voor medische beeldvorming en vraagt expliciete rapportage over databronnen, preprocessing, partitions en interne/externe testing.

<keytakeaway>Externe validatie op een ander centrum of latere tijdsperiode is de strengste lakmoesproef. Een grote AUC-kloof tussen intern en extern is bijna altijd leakage of distributieshift.</keytakeaway>

## Praktische checklist

- Is het voorspelmoment expliciet gedefinieerd?
- Zijn train, validatie en test gescheiden op het juiste niveau: patiënt, episode, centrum of tijd?
- Zijn duplicaten, near-duplicates en augmented varianten vóór de split opgespoord?
- Is preprocessing uitsluitend op trainingsdata gefit?
- Zijn featureselectie en hyperparameter tuning binnen cross-validatie uitgevoerd?
- Zijn alle features beschikbaar op het echte gebruiksmoment?
- Bevatten features geen proxies voor label, behandeling, follow-up of ontslag?
- Is er een tijds- of externe validatie die past bij de intended use?
- Zijn partitions, exclusies, missing-data-aanpak en preprocessing reproduceerbaar beschreven?
- Is de performance vergeleken vóór en na verwijdering van verdachte features?

## Referenties

**Wetenschappelijke bronnen**
- Kapoor S, Narayanan A. *Leakage and the reproducibility crisis in machine-learning-based science*. Patterns, 2023. https://doi.org/10.1016/j.patter.2023.100804
- Roberts M et al. *Common pitfalls and recommendations for using machine learning to detect and prognosticate for COVID-19 using chest radiographs and CT scans*. Nature Machine Intelligence, 2021. https://doi.org/10.1038/s42256-021-00307-0
- Andaur Navarro CL et al. *Risk of bias in studies on prediction models developed using supervised machine learning techniques*. BMJ, 2021. https://doi.org/10.1136/bmj.n2281
- Finlayson SG et al. *The Clinician and Dataset Shift in Artificial Intelligence*. New England Journal of Medicine, 2021. https://doi.org/10.1056/NEJMc2104626

**Richtlijnen en tools**
- Collins GS et al. *TRIPOD+AI statement*. BMJ, 2024. https://doi.org/10.1136/bmj-2023-078378
- Moons KGM et al. *PROBAST+AI*. BMJ, 2025. https://doi.org/10.1136/bmj-2024-082505
- Tejani AS et al. *Checklist for Artificial Intelligence in Medical Imaging: CLAIM 2024 Update*. Radiology: Artificial Intelligence, 2024. https://doi.org/10.1148/ryai.240300

**Praktische bronnen**
- scikit-learn. *Common pitfalls and recommended practices*. https://scikit-learn.org/stable/common_pitfalls.html
- Google for Developers. *Machine Learning Crash Course*. https://developers.google.com/machine-learning
- Kaggle Learn. *Intermediate Machine Learning, Data Leakage*. https://www.kaggle.com/learn/intermediate-machine-learning

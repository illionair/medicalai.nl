---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-35-33-019deffb-8b77-7730-9e61-be26bf58ea21.jsonl  ts: 2026-05-03T22:36:32.463Z -->

# Calibratie: de vergeten maat bij AI in de zorg

AI-modellen in de zorg worden vaak gepresenteerd met indrukwekkende AUC’s, sensitiviteiten of accuratessepercentages. Die maten zeggen vooral iets over ranking: kan het model patiënten met een uitkomst gemiddeld hoger plaatsen dan patiënten zonder die uitkomst? Dat is belangrijk, maar niet genoeg. In de kliniek werken we zelden met alleen rangordes. We werken met risico’s: 5%, 12%, 30%, 70%. Zulke getallen sturen gesprekken, triage, vervolgdiagnostiek en behandeling. Dan moet niet alleen de volgorde kloppen, maar ook de schaal.

Calibratie gaat over die schaal. Een goed gecalibreerd model geeft voorspelde kansen die overeenkomen met de geobserveerde werkelijkheid. Als een sepsis-model bij honderd vergelijkbare patiënten telkens ongeveer 20% risico voorspelt, dan verwacht je dat ongeveer twintig van hen sepsis ontwikkelen. Niet tien. Niet veertig. Een model kan dus uitstekend discrimineren, maar slecht gecalibreerd zijn. Het herkent dan relatief goed wie hoger of lager risico heeft, maar overschat of onderschat het absolute risico. Voor klinische besluitvorming is dat geen detail, maar een veiligheidsvraag.

Een eerste eenvoudige maat is **calibratie-in-the-large**. Die vergelijkt het gemiddelde voorspelde risico met het geobserveerde eventpercentage. Stel dat een model gemiddeld 18% complicatierisico voorspelt, terwijl in de lokale populatie 9% complicaties optreedt. Dan is het model systematisch te pessimistisch. De ranking kan nog steeds bruikbaar zijn, maar de absolute kansen zijn te hoog. Dit gebeurt vaak bij transport van modellen tussen ziekenhuizen, regio’s of tijdsperioden, omdat casemix, prevalentie, diagnostiek en behandelbeleid verschillen.

De **calibration slope** kijkt naar een ander probleem: zijn de voorspellingen te extreem of juist te vlak? Een slope van 1 is ideaal. Een slope lager dan 1 betekent meestal dat voorspelde risico’s te uitgesproken zijn: lage risico’s zijn te laag, hoge risico’s te hoog. Dat past bij overfitting, waarbij het model ruis uit de ontwikkeldata heeft geleerd. Het model geeft dan te extreme voorspellingen, alsof het overstuurt: hoge scores nóg hoger, lage nóg lager. Een slope hoger dan 1 betekent dat voorspellingen te voorzichtig zijn: lage en hoge risico’s liggen te dicht bij elkaar. In de praktijk is vooral een slope onder 1 een waarschuwingssignaal bij complexe machine-learningmodellen die op beperkte of selectieve data zijn ontwikkeld.

**Calibration plots** maken dit zichtbaar. Op de x-as staat het voorspelde risico, op de y-as het geobserveerde risico. De 45-gradenlijn is perfecte calibratie. Een curve boven die lijn betekent dat het model risico onderschat; een curve eronder betekent overschatting. Het voordeel van zo’n plot is klinisch: je ziet waar het probleem zit. Een model kan goed gecalibreerd zijn rond 10-20%, maar ernstig afwijken boven 40%. Dat maakt uit als juist rond een hoge-risicodrempel IC-opname, CT-diagnostiek of preventieve behandeling wordt overwogen.

De **Brier score** vat voorspellingsfouten in kansen samen. Bij binaire uitkomsten is het de gemiddelde gekwadrateerde afstand tussen voorspelde kans en werkelijke uitkomst. Een voorspelling van 0,90 voor een patiënt die het event krijgt, scoort goed; 0,90 voor iemand zonder event scoort slecht. De Brier score combineert aspecten van calibratie en discriminatie en is daarom nuttig als algemene performancemaat. Tegelijk is hij minder intuïtief dan een calibratieplot: hij vertelt dat er fout zit, maar minder precies waar en hoe klinisch relevant die fout is.

Waarom wordt calibratie dan zo vaak vergeten? Omdat rankingmaten aantrekkelijker zijn. De AUC is compact, bekend en relatief stabiel. Bovendien kan een model met slechte absolute kansen nog steeds een fraaie AUC hebben. Maar zorgprofessionals nemen geen besluiten op basis van AUC’s. Zij moeten weten of een voorspeld risico van 25% werkelijk ongeveer 25% betekent in hun patiëntenpopulatie. Een verkeerd gecalibreerd model kan leiden tot overdiagnostiek, onnodige behandeling, onterechte geruststelling of gemiste kansen op preventie.

De klinische consequenties zijn concreet. Bij overschatting van cardiovasculair risico krijgen te veel patiënten medicatie of intensieve controles. Bij onderschatting van infectierisico wordt behandeling mogelijk te laat gestart. Bij oncologische prognosemodellen kan miscalibratie behandelkeuzes en patiëntverwachtingen vertekenen. Bij gedeelde besluitvorming is dit extra gevoelig: een patiënt kan anders kiezen bij 5% dan bij 20%, zelfs als beide getallen dezelfde rankingpositie weerspiegelen.

Daarom is **recalibratie** vaak nodig voordat een AI-model lokaal wordt gebruikt. De lichtste vorm is intercept-updating: het model wordt aangepast aan het lokale basisrisico, terwijl de relatieve effecten gelijk blijven. Dit corrigeert vooral calibratie-in-the-large. Een volgende stap is het aanpassen van intercept én slope, waardoor te extreme of te vlakke voorspellingen worden bijgesteld. Bij voldoende lokale data kan volledige herfit of model updating nodig zijn. Recalibratie is geen cosmetische ingreep, maar onderdeel van implementatie. Een model dat in ziekenhuis A goed werkt, is niet automatisch betrouwbaar in ziekenhuis B.

TRIPOD+AI en PROBAST+AI maken dit punt expliciet. TRIPOD+AI vraagt om transparante rapportage van modelontwikkeling en evaluatie, inclusief calibratieprestaties, zodat gebruikers kunnen beoordelen of voorspelde risico’s interpreteerbaar en toepasbaar zijn. PROBAST+AI gaat verder in de beoordeling van risico op bias en toepasbaarheid: een modelevaluatie die alleen discriminatie rapporteert, geeft onvoldoende basis voor klinisch vertrouwen. Voor AI verandert dit principe niet. Deep learning, gradient boosting of random forests ontslaan ontwikkelaars niet van de plicht om betrouwbare kansen te leveren.

Voor zorgprofessionals is de praktische les eenvoudig: vraag bij elk voorspellend AI-model niet alleen “hoe goed rangschikt het model?”, maar ook “kloppen de kansen hier, bij onze patiënten, nu?” Vraag naar calibratie-in-the-large, calibration slope, calibration plots, Brier score en externe validatie. Vraag of recalibratie is uitgevoerd of gepland. En vraag hoe calibratie bewaakt wordt na implementatie, want populaties, behandelrichtlijnen en registratiesystemen veranderen.

AI in de zorg wordt pas klinisch volwassen wanneer voorspelde risico’s niet alleen indrukwekkend klinken, maar ook betrouwbaar zijn. Calibratie is daarbij geen statistische voetnoot. Het is de brug tussen een score en een verantwoord besluit.

## Bronnen

- Collins GS, Moons KGM, Dhiman P, et al. **TRIPOD+AI statement: updated guidance for reporting clinical prediction models that use regression or machine learning methods.** BMJ, 2024. https://www.bmj.com/content/385/bmj-2023-078378  
- Moons KGM, Damen JAA, Kaul T, et al. **PROBAST+AI: an updated quality, risk of bias, and applicability assessment tool for prediction models using regression or artificial intelligence methods.** BMJ, 2025. https://www.bmj.com/content/388/bmj-2024-082505  
- Van Calster B, McLernon DJ, van Smeden M, Wynants L, Steyerberg EW. **Calibration: the Achilles heel of predictive analytics.** BMC Medicine, 2019. https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-019-1466-7  
- Van Calster B, Nieboer D, Vergouwe Y, et al. **A calibration hierarchy for risk models was defined: from utopia to empirical data.** Journal of Clinical Epidemiology, 2016. https://www.sciencedirect.com/science/article/abs/pii/S0895435615005818  
- Steyerberg EW, Vickers AJ, Cook NR, et al. **Assessing the performance of prediction models: a framework for traditional and novel measures.** Epidemiology, 2010. https://pmc.ncbi.nlm.nih.gov/articles/PMC3575184/  
- Brier GW. **Verification of forecasts expressed in terms of probability.** Monthly Weather Review, 1950. https://doi.org/10.1175/1520-0493(1950)078%3C0001:VOFEIT%3E2.0.CO;2

---

## Interactieve module

```html
<interactive name="calibration-simulator"></interactive>
```


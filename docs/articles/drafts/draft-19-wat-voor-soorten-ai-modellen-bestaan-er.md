---
status: draft
source: codex
created: 2026-05-05
needs_review: true
---

# Wat voor soorten AI-modellen bestaan er?

“AI-model” klinkt alsof het één ding is. In werkelijkheid is het een verzamelnaam. Het ene model lijkt op een vertrouwde risicoscore, het andere op een grote verzameling beslisbomen, en weer een ander op een beeldherkenner die patronen in CT- of pathologiebeelden ziet.

Voor artsen is de belangrijkste vraag niet welk model het modernst klinkt, maar welk model past bij de klinische taak en de datavorm. Een model voor EPD-data hoeft niet hetzelfde te zijn als een model voor mammografie. Een uitlegbare score voor triage vraagt iets anders dan beeldsegmentatie in radiologie.

Dit artikel snoeit bewust. We behandelen drie modelgezinnen die je in medische AI vaak tegenkomt: logistische regressie, tree-based modellen en CNN's voor beeldvorming. Transformers, multimodale modellen en reinforcement learning zijn belangrijk, maar horen eerder in een vervolgartikel voor gevorderden.

<interactive name="model-family-map"></interactive>

## Eerst: welke data en welke beslissing?

De meeste medische AI-modellen leren een relatie tussen input en output. De input kan bijvoorbeeld bestaan uit leeftijd, labwaarden, vitale parameters, medicatie, diagnosecodes of medische beelden. De output is meestal een kans, label, score, segmentatie of alarm.

Begin daarom met drie praktische vragen:

- Welke input gebruikt het model: tabeldata, beeld, tekst of iets anders?
- Welke klinische output geeft het: risico, diagnose, triage, segmentatie of advies?
- Op welk moment moet iemand iets met die output doen?

Een goed modeltype is dus geen modekeuze. Het is een match tussen klinische vraag, beschikbare data, gewenste uitlegbaarheid en risico bij fouten.

## 1. Lineaire en logistische regressie

**Klinische usecase:** een risico op heropname, sepsis, complicatie of mortaliteit voorspellen op basis van EPD-data.

Logistische regressie lijkt het meest op klassieke medische risicomodellen. Het model combineert variabelen zoals leeftijd, bloeddruk, CRP, comorbiditeit of eerdere opnames met gewichten. Die combinatie wordt omgezet naar een kans, bijvoorbeeld 12% risico op complicatie binnen 30 dagen.

Waarom werkt dit goed voor veel EPD-vragen? Omdat veel klinische predictie begint met gestructureerde tabeldata: rijen zijn patiënten, kolommen zijn kenmerken. Logistische regressie is relatief transparant: je kunt zien welke variabelen bijdragen en in welke richting.

De valkuil is dat het model eenvoudige verbanden veronderstelt. Complexe interacties, zoals een labwaarde die alleen bij een specifieke combinatie van leeftijd en comorbiditeit betekenis krijgt, worden niet vanzelf goed opgepikt. Ook transparantie is geen garantie voor waarheid: een netjes uitlegbaar model kan nog steeds slecht gevalideerd of slecht gecalibreerd zijn.

Ruwe intuïtie: het model maakt een gewogen optelsom van bekende klinische signalen.

## 2. Tree-based modellen: random forest en XGBoost

**Klinische usecase:** risico voorspellen met gemengde EPD-data, labwaarden, vitale parameters en niet-lineaire patronen.

Een beslisboom stelt opeenvolgende vragen: is leeftijd hoger dan X, is CRP boven Y, is de systolische bloeddruk lager dan Z, is er zuurstofbehoefte? Aan het eind kom je in een blad met een voorspelling.

Een **random forest** bouwt veel van zulke bomen en laat ze samen stemmen. **XGBoost** bouwt bomen na elkaar: elke nieuwe boom probeert fouten van eerdere bomen te corrigeren. Beide behoren tot de tree-based familie en zijn populair bij tabulaire zorgdata.

Waarom werkt dit goed voor gemengde data? Omdat bomen automatisch drempels en interacties kunnen leren. Ze kunnen bijvoorbeeld oppikken dat een labwaarde pas zorgelijk wordt in combinatie met leeftijd, vitale instabiliteit of bepaalde medicatie.

De valkuil is overfitting en schijnzekerheid. Diepe bomen kunnen lokale gewoonten leren: hoe vaak een afdeling lab aanvraagt, hoe een ziekenhuis codeert, of welke order set bij verdenking wordt gebruikt. Daardoor kan het model intern prachtig scoren en extern tegenvallen. Vraag dus naar patient-level splits, externe validatie, calibratie en subgroepanalyse.

Ruwe intuïtie: veel kleine beslisroutes stemmen samen, of corrigeren elkaar stap voor stap.

## 3. CNN's: modellen voor medische beelden

**Klinische usecase:** afwijkingen detecteren of segmenteren op rontgenfoto's, CT, MRI, mammografie, dermatologiebeelden, oogfundusfoto's of pathologiebeelden.

Een CNN, voluit convolutioneel neuraal netwerk, is gemaakt voor beelddata. Het kijkt niet naar een tabel met kolommen, maar naar pixels en lokale beeldpatronen. In de eerste lagen herkent het simpele patronen zoals randen, contrastverschillen en texturen. In latere lagen worden die patronen abstracter, bijvoorbeeld een nodus, vaatstructuur, laesie of weefselpatroon.

Waarom werkt dit goed voor beelden? Omdat medische beelden ruimtelijke structuur hebben. De betekenis zit niet alleen in losse pixels, maar in patronen naast elkaar: vorm, begrenzing, densiteit, symmetrie en context.

De valkuil is dat CNN's gevoelig kunnen zijn voor shortcuts. Een model kan leren van scannermerk, tekstmarkers, acquisitieprotocol, cropping of centrumverschillen in plaats van van pathologie. Ook bij beelden is patient-level splitting cruciaal: slices of beelden van dezelfde patiënt mogen niet verdeeld raken over train en test. Externe validatie op andere scanners, centra en populaties is geen luxe maar een veiligheidscheck.

Ruwe intuïtie: eerst kleine beeldstukjes herkennen, daarna grotere klinisch relevante patronen.

## Waar zijn taalmodellen en transformers gebleven?

Taalmodellen, transformers, embeddings en multimodale modellen worden snel belangrijker in de zorg, vooral voor samenvatten, zoeken, verslagondersteuning en RAG-systemen. Maar ze brengen eigen begrippen en risico's mee: context window, brontrouw, hallucinaties, promptgevoeligheid, privacy en workflowcontrole.

Voor een basisoverzicht is het helderder om ze niet tussen regressie, bomen en CNN's te proppen. De praktische boodschap blijft hetzelfde: kijk naar de input, output, klinische taak, validatie en schade bij fouten. Een indrukwekkende architectuur maakt een slechte usecase niet goed.

## Hoe kies je een modeltype?

Gebruik dit als startpunt:

- **EPD-data met klassieke risicovraag:** begin vaak met logistische regressie als sterke baseline.
- **Gemengde tabeldata met interacties:** random forest of XGBoost kan passend zijn, mits goed gevalideerd.
- **Medische beelden:** CNN's zijn vaak logisch, met strenge beeldvalidatie.
- **Tekst of richtlijnen:** behandel dit als aparte taalmodel- of RAG-usecase, met eigen veiligheidsvragen.

Het beste model is niet automatisch het meest complexe model. In medische AI is het beste model vaak het model dat de klinische vraag beantwoordt, goed gevalideerd is, begrijpelijk genoeg is voor de workflow en veilig blijft bij nieuwe patiënten.

## Praktische checklist

Vraag bij elk AI-model:

1. Welke input gebruikt het model?
2. Wat is de output en op welk moment wordt die gebruikt?
3. Past het modeltype bij de datavorm?
4. Is er een eenvoudige baseline vergeleken, zoals logistische regressie?
5. Is het model extern of temporeel gevalideerd?
6. Zijn calibratie, subgroepen en fouttypen onderzocht?
7. Begrijpt de gebruiker wat de output wel en niet betekent?
8. Wat gebeurt er als de output fout-positief of fout-negatief is?

## Kernboodschap

AI-modellen zijn geen magische zwarte doos van één soort. Logistische regressie maakt een gewogen risicoschatting. Tree-based modellen stellen veel kleine vragen en laten beslisroutes stemmen of elkaar corrigeren. CNN's herkennen lokale patronen in beelden. De kunst is niet om het nieuwste model te kiezen, maar het passende model voor de klinische vraag, de datavorm en de workflow waarin echte mensen ermee moeten werken.

## Bronnen

- IBM. *What is machine learning?* https://www.ibm.com/think/topics/machine-learning  
- scikit-learn. *User Guide: supervised and unsupervised learning*. https://scikit-learn.org/stable/user_guide.html  
- scikit-learn. *Ensembles: gradient boosting, random forests, bagging, voting, stacking*. https://scikit-learn.org/stable/modules/ensemble.html  
- Google for Developers. *Machine Learning Crash Course*. https://developers.google.com/machine-learning/crash-course  
- Goodfellow I, Bengio Y, Courville A. *Deep Learning*. MIT Press, 2016. https://www.deeplearningbook.org/  
- Vaswani A, et al. *Attention Is All You Need*. NeurIPS, 2017. https://arxiv.org/abs/1706.03762  
- LeCun Y, Bengio Y, Hinton G. *Deep learning*. Nature, 2015. https://doi.org/10.1038/nature14539

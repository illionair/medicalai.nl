---
status: draft
source: codex
created: 2026-05-05
needs_review: true
---

# Wat voor soorten AI-modellen bestaan er?

“AI-model” is een brede term. Soms bedoelen mensen een simpel regressiemodel. Soms een random forest. Soms een deep-learningmodel voor CT-beelden. Soms een taalmodel dat richtlijntekst samenvat. Die modellen horen allemaal bij hetzelfde grote huis, maar ze wonen niet in dezelfde kamer.

Dit artikel is een menselijk overzicht. Niet om alle wiskunde te behandelen, maar om te voelen welk type model waarvoor bedoeld is, hoe het ongeveer werkt, en welke vragen je moet stellen voordat je het in de zorg serieus neemt.

<interactive name="model-family-map"></interactive>

## Eerst: wat leert het model eigenlijk?

De meeste AI-modellen leren een relatie tussen input en output. De input kan tabulaire EPD-data zijn, een beeld, tekst, audio, een tijdreeks of een combinatie daarvan. De output kan een diagnose, risico, segmentatie, samenvatting, ranking of advies zijn.

Het type model hangt dus niet alleen af van mode of marketing. Het hangt af van de vraag:

- Wil je een label voorspellen, zoals maligniteit ja/nee?
- Wil je een getal voorspellen, zoals risico op heropname?
- Wil je patronen vinden zonder vooraf bekende labels?
- Wil je tekst genereren of samenvatten?
- Wil je een keuze optimaliseren over tijd?

## Supervised learning: leren met voorbeelden en labels

Supervised learning is de meest herkenbare vorm. Je geeft het model voorbeelden met het juiste antwoord. Bijvoorbeeld: patiënten met kenmerken én de uitkomst sepsis ja/nee. Of beelden met labels: pneumonie wel/niet.

Binnen supervised learning heb je grofweg twee taken:

**Classificatie** voorspelt een categorie. Denk aan: benigne versus maligne, wel of geen complicatie, urgent versus niet urgent.

**Regressie** voorspelt een continue waarde. Denk aan ligduur, labwaarde, risico of tijd tot event.

Veel klinische predictiemodellen vallen hieronder. De grote vraag is dan niet alleen “hoe hoog is de AUC?”, maar ook: klopt de calibratie, is de validatie extern, en past de drempel bij de workflow?

## Lineaire en logistische modellen

Lineaire modellen zijn vaak het beginpunt. Ze combineren variabelen met gewichten. Bij logistische regressie wordt die combinatie omgezet naar een kans.

Het voordeel is dat je redelijk goed kunt zien welke variabelen bijdragen. Het nadeel is dat complexe interacties vaak niet vanzelf worden geleerd. Toch zijn deze modellen in de zorg nog steeds waardevol, juist omdat ze transparant en robuust kunnen zijn.

Ruwe intuïtie: het model trekt een relatief eenvoudige grens door de data.

## Beslisbomen en random forests

Een beslisboom stelt opeenvolgende vragen: is leeftijd hoger dan X? Is CRP hoger dan Y? Is er zuurstofbehoefte? Aan het eind kom je in een blad met een voorspelling.

Een random forest bouwt veel van zulke bomen op varianten van de data en laat ze samen stemmen. Daardoor wordt het model stabieler dan één losse boom.

Ruwe intuïtie: veel kleine beslisroutes stemmen samen. Dit werkt vaak goed op tabulaire data, maar kan nog steeds overfitten als bomen te diep worden of validatie niet goed is.

## Gradient boosting en XGBoost

Boosting bouwt modellen na elkaar. Elke nieuwe boom probeert de fouten van de vorige bomen te corrigeren. XGBoost is een bekende implementatie van gradient boosting.

Dit type model is vaak sterk op gestructureerde tabulaire data: EPD-variabelen, labwaarden, scores, claimsdata, registraties. Het kan nonlineariteit en interacties leren zonder dat je die allemaal vooraf specificeert.

Ruwe intuïtie: een team van kleine correctoren, waarbij elke nieuwe boom zegt: “hier ging het vorige team nog mis.”

## Neurale netwerken

Neurale netwerken bestaan uit lagen van knooppunten met gewichten. Ze leren representaties: tussenstappen waarin ruwe input wordt omgezet naar bruikbare patronen. Bij kleine tabulaire datasets zijn ze niet automatisch beter dan boommodellen. Bij beelden, tekst, audio en grote complexe data kunnen ze juist veel krachtiger zijn.

Ruwe intuïtie: het model leert zelf tussenkenmerken. Niet alleen “CRP hoog”, maar combinaties of patronen die je niet handmatig hebt geprogrammeerd.

## CNN's: modellen voor beelden

Convolutionele neurale netwerken, CNN's, zijn ontworpen voor beelden. Ze kijken met kleine vensters naar lokale patronen: randen, vlekken, texturen, vormen. Die patronen worden laag voor laag abstracter.

In medische AI worden CNN's gebruikt voor radiologie, dermatologie, pathologie, oogheelkunde en andere beeldtaken. Ze kunnen krachtig zijn, maar vragen strenge validatie: patient-level splits, scanner- en centrumvariatie, externe datasets en duidelijke foutanalyse.

Ruwe intuïtie: eerst kleine beeldstukjes herkennen, daarna grotere structuren.

## Transformers en taalmodellen

Transformers verwerken reeksen zoals tekst, tokens, codes of soms beeldpatches. Ze gebruiken attention: het model leert welke delen van de input belangrijk zijn voor elkaar. Grote taalmodellen zijn transformers die op enorme hoeveelheden tekst zijn voorgetraind.

In de zorg kunnen ze helpen bij samenvatten, zoeken, structureren, conceptverslagen of uitleg. Maar ze zijn geen automatische collega. Ze kunnen overtuigend klinken en toch fouten maken, bronnen verzinnen of lokale context missen.

Ruwe intuïtie: het model leest context door te wegen welke woorden of stukken informatie elkaar beïnvloeden.

## Unsupervised learning: patronen zonder labels

Bij unsupervised learning zijn er geen vooraf bekende antwoorden. Het model zoekt structuur. Clustering groepeert bijvoorbeeld patiënten met vergelijkbare kenmerken. Dimensionality reduction maakt complexe data overzichtelijker in minder dimensies.

Dit is handig voor exploratie, subtypen, kwaliteitscontrole of cohortverkenning. Maar een cluster is niet automatisch een klinisch subtype. Je moet altijd terug naar interpretatie, validatie en klinische betekenis.

Ruwe intuïtie: het model sorteert de kast zonder dat iemand vooraf labels op de bakjes heeft geplakt.

## Self-supervised en generatieve modellen

Self-supervised learning gebruikt data om zelf leersignalen te maken. Een taalmodel leert bijvoorbeeld ontbrekende woorden of volgende tokens voorspellen. Een beeldmodel kan leren welke representaties hetzelfde object of dezelfde structuur beschrijven.

Generatieve modellen kunnen nieuwe tekst, beelden, audio of data-achtige voorbeelden maken. In medische context is dat interessant voor documentatie, simulatie, educatie of data-augmentatie, maar risicovol voor diagnostische claims en privacy.

Ruwe intuïtie: het model leert de grammatica van data, en kan daarna nieuwe voorbeelden of samenvattingen maken.

## Reinforcement learning

Reinforcement learning leert door acties en beloningen. Een agent probeert keuzes te maken die op lange termijn veel beloning opleveren. In theorie past dit bij behandelstrategieën over tijd. In de praktijk is klinische toepassing moeilijk, omdat echte experimenten riskant zijn, beloningen vertraagd zijn en confounding groot is.

Ruwe intuïtie: leren door trial-and-error, maar in de zorg mag je die trial-and-error niet zomaar op patiënten doen.

## Multimodale modellen

Steeds vaker combineren modellen meerdere bronnen: beeld plus tekst, EPD plus labwaarden, radiologieverslag plus scan, of monitoringdata plus klinische notities. Dit kan rijker zijn, maar ook complexer. Als één bron de andere verraadt, ontstaat leakage. Als één modaliteit ontbreekt in de praktijk, kan het model falen.

Ruwe intuïtie: meerdere zintuigen tegelijk, maar ook meerdere manieren om in de war te raken.

## Hoe kies je een modeltype?

Een praktisch startpunt:

- **Tabulaire data, beperkte dataset:** begin met logistische regressie, random forest of gradient boosting.
- **Beelden:** denk aan CNN's of vision transformers, met strenge beeldvalidatie.
- **Tekst en richtlijnen:** denk aan embeddings, retrieval, transformers of RAG.
- **Onbekende patiëntgroepen:** clustering of dimensionality reduction kan exploratief helpen.
- **Beslissingen over tijd:** wees voorzichtig met reinforcement learning; vaak is eerst goede observationele validatie nodig.

Het beste model is niet altijd het meest indrukwekkende model. In medische AI is het beste model vaak het model dat de klinische vraag beantwoordt, goed gevalideerd is, uitlegbaar genoeg is voor de workflow, en veilig blijft bij nieuwe patiënten.

## Praktische checklist

Vraag bij elk AI-model:

1. Welke input gebruikt het model?
2. Wat is de output en op welk moment wordt die gebruikt?
3. Is het supervised, unsupervised, generatief, multimodaal of iets anders?
4. Past het modeltype bij de datavorm?
5. Is het model extern gevalideerd?
6. Zijn calibratie, subgroepen en fouttypen onderzocht?
7. Begrijpt de gebruiker wat de output wel en niet betekent?

## Kernboodschap

AI-modellen zijn geen magische zwarte doos van één soort. Het zijn families met verschillende manieren van leren. Lineaire modellen trekken eenvoudige grenzen. Bomen stellen vragen. Forests laten bomen stemmen. Boosting corrigeert stap voor stap. Neurale netwerken leren representaties. CNN's kijken naar lokale beeldpatronen. Transformers wegen context. Clustering zoekt structuur. Generatieve modellen maken nieuwe output. De kunst is niet om het nieuwste model te kiezen, maar het passende model voor de klinische vraag.

## Bronnen

- IBM. *What is machine learning?* https://www.ibm.com/think/topics/machine-learning  
- scikit-learn. *User Guide: supervised and unsupervised learning*. https://scikit-learn.org/stable/user_guide.html  
- scikit-learn. *Ensembles: gradient boosting, random forests, bagging, voting, stacking*. https://scikit-learn.org/stable/modules/ensemble.html  
- Google for Developers. *Machine Learning Crash Course*. https://developers.google.com/machine-learning/crash-course  
- Goodfellow I, Bengio Y, Courville A. *Deep Learning*. MIT Press, 2016. https://www.deeplearningbook.org/  
- Vaswani A, et al. *Attention Is All You Need*. NeurIPS, 2017. https://arxiv.org/abs/1706.03762  
- LeCun Y, Bengio Y, Hinton G. *Deep learning*. Nature, 2015. https://doi.org/10.1038/nature14539

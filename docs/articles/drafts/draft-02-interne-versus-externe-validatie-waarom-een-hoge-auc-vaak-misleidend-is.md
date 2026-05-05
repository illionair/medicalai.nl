---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-35-32-019deffb-89d1-7bc1-924c-b1fce65f69ee.jsonl  ts: 2026-05-03T22:36:41.331Z -->

# Interne versus externe validatie: waarom een hoge AUC vaak misleidend is

Een AI-model met een AUC van 0,92 klinkt alsof het bijna klaar is voor de kliniek. Toch is dat vaak te snel gedacht. Een hoge AUC zegt vooral: in deze testset kon het model patiënten met de uitkomst meestal hoger rangschikken dan patiënten zonder de uitkomst.

Dat is nuttig, maar het is geen groen licht. De echte vraag is: werkt dit model bij onze patiënten, met onze metingen, in onze workflow, op het moment dat wij een beslissing moeten nemen?

## Wat zegt AUC wel?

AUC is een maat voor discriminatie. Discriminatie betekent: kan het model de ene patiënt hoger op de risicolijst zetten dan de andere?

Een AUC van 0,80 kun je zo lezen: neem willekeurig één patiënt die de uitkomst kreeg en één patiënt die de uitkomst niet kreeg. In ongeveer 80 van de 100 van zulke paren geeft het model de patiënt met de uitkomst de hogere score.

Dat zegt niets over de vraag of een voorspeld risico van 20% ook echt 20% is. Het zegt ook niets over hoeveel alarmen er afgaan bij een gekozen drempel. En het zegt weinig over de vraag of het model past bij een andere afdeling, een ander ziekenhuis of een latere periode.

## Interne validatie is een eerste controle

Bij interne validatie test je het model op data uit dezelfde bron als de ontwikkeldata. Denk aan cross-validatie, bootstrapping of een willekeurige train-test-splitsing.

Dat is beter dan helemaal niet testen. Het helpt om te zien of het model niet alleen de ontwikkeldata uit het hoofd heeft geleerd. Maar het blijft een beperkte toets. Trainings- en testpatiënten komen vaak uit hetzelfde EPD, dezelfde periode, dezelfde labprocessen en dezelfde behandelcultuur.

Daarom kan een testset statistisch onafhankelijk zijn, maar klinisch toch nauwelijks nieuw.

## Overfitting: slim lijken op bekende data

Overfitting betekent dat een model toevallige patronen leert die niet echt algemeen gelden. Het leert dan niet alleen ziekte en risico, maar ook lokale gewoonten: wie krijgt welk lab, welke woorden staan in een verslag, welke afdeling codeert op welke manier?

Een flexibel model kan daar heel goed in worden. Intern ziet de AUC er dan prachtig uit. Buiten die omgeving valt de prestatie terug.

## Data leakage: stiekem de toekomst zien

Data leakage is nog verraderlijker. Dan krijgt het model informatie die op het echte beslismoment niet beschikbaar zou zijn, of die de uitkomst indirect verklapt.

Voorbeelden zijn labwaarden die pas na diagnose worden bepaald, medicatie die pas gestart is nadat iemand al ziek leek, of notitietekst die alleen ontstaat na klinische verdenking. Een model kan dan niet zozeer ziekte voorspellen, maar de latere zorgreactie herkennen.

Ook dat kan een hoge interne AUC geven. In gebruik verdwijnt het voordeel zodra de workflow anders is.

<interactive name="validation-shift-map"></interactive>

## Tijdvalidatie: werkt het later nog?

Tijdvalidatie betekent: ontwikkelen op oudere data, testen op latere patiënten. Dat is belangrijk, want de toekomst lijkt nooit precies op het verleden.

Richtlijnen veranderen. Populaties veranderen. Meetmethoden veranderen. Tijdens COVID zagen veel modellen plots andere prevalenties, zorgpaden en risicoprofielen. Ook zonder crisis kan de relatie tussen voorspelde en werkelijke risico's verschuiven. Dat heet verschuivende kalibratie.

Tijdvalidatie is dus sterker dan een willekeurige splitsing binnen dezelfde periode. Maar meestal blijft het nog steeds binnen één organisatie.

## Externe validatie: werkt het ook elders?

Externe validatie is de strengere test. Het model wordt dan toegepast op data uit een andere relevante bron die niet is gebruikt voor ontwikkeling, featureselectie, tuning of modelkeuze.

Dat kan een ander ziekenhuis zijn, een ander EPD-systeem, een andere regio of een andere zorglijn. "Extern" is alleen zinvol als die dataset lijkt op de plek waar je het model wilt gebruiken. Een academische IC-validatie bewijst niet vanzelf dat hetzelfde model veilig is op een perifere SEH.

Externe validatie is ook geen eeuwig keurmerk. Een model kan goed werken in ziekenhuis A, matig in ziekenhuis B en slecht in een subgroep met andere leeftijd, comorbiditeit of meetpraktijk.

## Verschuiving tussen ontwikkeldata en praktijkdata

Veel problemen komen door verschuiving tussen ontwikkeldata en praktijkdata. De patiënten kunnen anders zijn. De uitkomst kan vaker of juist minder vaak voorkomen. De betekenis van een predictor kan veranderen.

Bij sepsis is dat heel concreet. Stel dat een model is ontwikkeld in een ziekenhuis waar bloedkweken en IC-consulten vaak vlak vóór een geregistreerde sepsisdiagnose kwamen. In een ander ziekenhuis worden bloedkweken eerder of juist selectiever ingezet. Het model herkent dan misschien vooral het oude zorgpad, niet het biologische risico.

Soms zakt de AUC dan duidelijk. Soms blijft de AUC redelijk, maar raakt de kalibratie kwijt.

## Kalibratie: kloppen de kansen?

Kalibratie vraagt iets anders dan AUC: komen voorspelde kansen overeen met wat er echt gebeurt?

Als een model bij 100 patiënten een risico rond 20% voorspelt, verwacht je ongeveer 20 patiënten met de uitkomst. Als het er in werkelijkheid 8 zijn, overschat het model. Als het er 35 zijn, onderschat het model.

Voor zorgbeslissingen is dat cruciaal. Een model kan patiënten goed rangschikken, maar de absolute risico's verkeerd inschatten. Dan krijg je te veel behandeling, te weinig behandeling of alarmen op de verkeerde plek.

## Een beslisdrempel maakt het pas klinisch

Neem een sepsis-alarm op de SEH. De leverancier rapporteert een AUC van 0,88. Dat klinkt goed. Maar de afdeling moet kiezen: bij welke score gaat het alarm af?

Stel dat bij een lage drempel van 100 patiënten er 25 een alarm krijgen. Daarvan hebben er misschien 8 echt sepsis en 17 niet. Je vangt meer zieke patiënten, maar het team krijgt veel fout-positieve alarmen.

Bij een hogere drempel krijgen misschien 10 van de 100 patiënten een alarm. Daarvan zijn er 6 terecht en 4 fout-positief. Dat lijkt rustiger, maar mogelijk mis je nu 2 of 3 patiënten die je eerder had willen zien.

De AUC kiest die drempel niet voor je. Daarvoor moet je weten wat een fout-positief kost, wat een gemiste casus kost en wie op het alarm moet reageren.

## Wat vraag ik morgen?

Vraag de leverancier of onderzoeker niet alleen: "wat is de AUC?" Vraag:

- Op welke patiënten, periode en instelling is deze AUC gemeten?
- Was de testset echt gescheiden van ontwikkeling, featureselectie en tuning?
- Is er tijdvalidatie gedaan op latere patiënten?
- Is er externe validatie gedaan in een setting die lijkt op de onze?
- Hoe is data leakage uitgesloten?
- Hoe goed is de kalibratie, vooral rond onze beslisdrempel?
- Wat gebeurt er per 100 patiënten: hoeveel alarmen, terechte alarmen en gemiste gevallen?
- Zijn subgroepen apart bekeken?
- Wordt prestatie na implementatie gemonitord?
- Wie is verantwoordelijk als de populatie, workflow of drempel verandert?

TRIPOD+AI en PROBAST+AI helpen om dit systematisch te beoordelen. Ze vragen om transparantie over dataselectie, predictoren op het beslismoment, ontbrekende waarden, scheiding tussen ontwikkeling en validatie, biasrisico en toepasbaarheid.

De korte les: interne validatie vertelt vooral of het model de eigen data begrijpt. Tijdvalidatie vertelt of het model later nog werkt. Externe validatie vertelt of het model de overstap naar de praktijk aankan.

Een hoge AUC is dus geen groen licht. Het is hooguit het begin van het gesprek.

## Bronnen

Collins GS et al. TRIPOD+AI statement. BMJ 2024. https://www.bmj.com/content/385/bmj-2023-078378

Moons KGM et al. PROBAST+AI. BMJ 2025. https://www.bmj.com/content/388/bmj-2024-082505

Collins GS et al. Evaluation of clinical prediction models, part 1. BMJ 2024. https://www.bmj.com/content/384/bmj-2023-074819

Riley RD et al. Evaluation of clinical prediction models, part 2: external validation. BMJ 2024. https://www.bmj.com/content/384/bmj-2023-074820

Van Calster B et al. Calibration: the Achilles heel of predictive analytics. BMC Medicine 2019. https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-019-1466-7

Koch LM et al. Distribution shift detection for postmarket surveillance of medical AI algorithms. npj Digital Medicine 2024. https://www.nature.com/articles/s41746-024-01085-w

---


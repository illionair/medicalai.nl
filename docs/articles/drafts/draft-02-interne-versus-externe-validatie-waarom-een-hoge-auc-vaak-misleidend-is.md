---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-35-32-019deffb-89d1-7bc1-924c-b1fce65f69ee.jsonl  ts: 2026-05-03T22:36:41.331Z -->

# Interne versus externe validatie: waarom een hoge AUC vaak misleidend is

Een AI-model met een AUC van 0,92 klinkt indrukwekkend. Voor zorgprofessionals suggereert zo’n getal al snel: dit model onderscheidt zieke van niet-zieke patiënten uitstekend. Maar een hoge AUC is geen bewijs dat een model veilig, betrouwbaar of klinisch bruikbaar is. Zeker niet wanneer die AUC afkomstig is uit interne validatie, een random train-test split of een single-center testset. In medische AI is de centrale vraag niet: “werkt het model op data die lijken op de ontwikkeldata?”, maar: “werkt het model bij mijn patiënten, in mijn workflow, op dit moment?”

De AUC, of area under the receiver operating characteristic curve, meet discriminatie: hoe goed geeft het model gemiddeld hogere scores aan patiënten mét de uitkomst dan aan patiënten zonder de uitkomst? Een AUC van 0,80 betekent grofweg dat bij een willekeurig gekozen patiënt met de uitkomst en een willekeurig gekozen patiënt zonder de uitkomst, het model in 80% van de paren de juiste patiënt hoger rangschikt. Dat is nuttige informatie. Maar het zegt weinig over absolute risico’s, behandelbeslissingen, lokale toepasbaarheid of de gevolgen van fout-positieven en fout-negatieven. Een model kan een hoge AUC hebben en toch systematisch risico’s overschatten, vooral bij laagrisicopatiënten. Of het kan goed rangschikken, maar precies rond de klinische beslisgrens onbetrouwbaar zijn.

Daarom is interne validatie slechts een eerste technische controle. Interne validatie gebruikt data uit dezelfde bron als de ontwikkeldata, bijvoorbeeld via cross-validatie, bootstrapping of een random train-test split. Zulke methoden kunnen helpen om optimisme door overfitting te schatten. Overfitting ontstaat wanneer een model niet alleen echte klinische signalen leert, maar ook toevallige patronen, meetgewoonten, coderingsartefacten of lokale praktijkvariatie in de ontwikkelset. Hoe flexibeler het model en hoe kleiner of rijker de dataset, hoe groter dit risico. Een random split doorbreekt dit probleem maar beperkt: trainings- en testpatiënten komen nog steeds uit dezelfde instelling, dezelfde periode, hetzelfde EPD, dezelfde labapparatuur en vaak dezelfde behandelcultuur. De testset is dan statistisch onafhankelijk, maar klinisch niet echt nieuw.

Een beruchte valkuil is data leakage. Daarbij komt informatie in de modelinput terecht die in de echte voorspellende situatie niet beschikbaar zou zijn, of die de uitkomst indirect verraadt. Denk aan labwaarden die pas na diagnose worden bepaald, medicatie die gestart is als reactie op de aandoening, notitietermen die alleen na verdenking worden gebruikt, of beeldvormingsmetadata die correleren met scannerlocatie of protocol. Leakage kan een model spectaculair laten presteren in interne validatie. In de praktijk verdwijnt die prestatie zodra de workflow verandert of het model prospectief wordt gebruikt. Een hoge AUC kan dan vooral meten hoe goed het model de lokale administratie heeft leren herkennen.

Single-center testsets voegen nog een probleem toe: ze testen meestal reproduceerbaarheid binnen één ecosysteem, niet generaliseerbaarheid. Een universitair centrum heeft andere patiënten, verwijspatronen, comorbiditeit, diagnostische intensiteit en behandelstrategieën dan een streekziekenhuis of eerstelijnssetting. Zelfs binnen één ziekenhuis kunnen afdelingen verschillen. Als een sepsismodel vooral leert dat bepaalde bloedkweken, IC-consulten of order sets vaak voorafgaan aan geregistreerde sepsis, kan het model lokaal goed scoren maar elders falen. De AUC is dan geen universele eigenschap van het model, maar een eigenschap van model plus dataset plus context.

Temporal validation is daarom een belangrijke tussenstap. Hierbij wordt het model ontwikkeld op oudere data en getest op latere patiënten. Dat benadert beter hoe een model na implementatie gebruikt wordt: de toekomst lijkt nooit precies op het verleden. Richtlijnen, populaties, meetmethoden, coding practices en behandeluitkomsten veranderen. Tijdens de COVID-19-pandemie zagen veel modellen bijvoorbeeld een plotselinge verschuiving in prevalentie, zorgpaden en risicoprofielen. Ook zonder crisis treedt “calibration drift” op: de relatie tussen voorspelde en werkelijke risico’s verschuift. Temporal validation kan laten zien of een model robuust is tegen zulke tijdseffecten, maar blijft meestal beperkt tot dezelfde organisatie.

External validation is de strengere test: het model wordt toegepast op data uit een andere, relevante bron die niet gebruikt is voor ontwikkeling, featureselectie, hyperparameter-tuning of modelkeuze. Dit kan een ander ziekenhuis zijn, een ander land, een ander EPD-systeem of een andere zorglijn. Belangrijk is dat de externe dataset de beoogde toepassing weerspiegelt. Een extern cohort is niet automatisch goed; het moet passen bij de target population, predictorbeschikbaarheid, uitkomstdefinitie en klinische timing. Externe validatie is ook geen eenmalig stempel “goedgekeurd”. Een model kan in ziekenhuis A goed werken, in ziekenhuis B matig, en in subgroepen met andere leeftijd, etniciteit, sociaaleconomische status of comorbiditeit slecht.

Dit raakt aan dataset shift: verschillen tussen ontwikkeldata en gebruiksdata. Covariate shift betekent dat patiëntkenmerken of meetwaarden anders verdeeld zijn. Label shift betekent dat de prevalentie van de uitkomst verandert. Concept shift betekent dat de betekenis van een voorspeller of uitkomst verandert, bijvoorbeeld door nieuwe behandelingen of diagnostische criteria. Voor AI-modellen met beeld, tekst of EPD-data kunnen ook technische shifts ontstaan: andere scanners, andere protocollen, andere terminologie, andere missingness-patronen. Zulke verschuivingen kunnen een AUC verlagen, maar soms blijft de AUC redelijk terwijl de kalibratie ernstig ontspoort. Dat is klinisch gevaarlijk: het model ordent patiënten nog aardig, maar de gecommuniceerde risico’s kloppen niet.

Kalibratie verdient daarom evenveel aandacht als discriminatie. Kalibratie vraagt: komen voorspelde kansen overeen met geobserveerde kansen? Als een model bij honderd patiënten een risico van 20% voorspelt, zouden ongeveer twintig van hen de uitkomst moeten krijgen. Voor besluitvorming is dat cruciaal. Een cardiologisch model dat risico’s verdubbelt kan leiden tot overbehandeling; een oncologisch triagemodel dat risico’s onderschat kan vertraging veroorzaken. Goede rapportage omvat daarom calibration-in-the-large, kalibratieslope en liefst een flexibele kalibratieplot over het hele risicobereik, vooral rond klinische drempels. Alleen een AUC rapporteren is alsof men een thermometer beoordeelt op de vraag of hij warmere patiënten boven koudere zet, zonder te controleren of 39,5 graden ook echt 39,5 graden is.

TRIPOD+AI benadrukt dat studies naar predictiemodellen transparant moeten rapporteren hoe data zijn geselecteerd, welke predictoren beschikbaar waren op het beslismoment, hoe ontbrekende waarden zijn behandeld, hoe modelontwikkeling en validatie zijn gescheiden, en welke prestatiematen zijn geëvalueerd. PROBAST+AI gaat nog verder als beoordelingsinstrument voor kwaliteit, risico op bias en toepasbaarheid. Het onderscheid tussen modelontwikkeling en modelevaluatie is daarbij essentieel: een elegant ontwikkeld model kan nog steeds slecht toepasbaar zijn in een andere setting, en een validatiestudie kan een vertekend beeld geven als de dataset, uitkomstmeting of analyse gebrekkig is.

Voor zorgprofessionals is de praktische les eenvoudig maar streng. Vraag bij elke hoge AUC: op welke data is dit gemeten? Was de testset echt onafhankelijk? Waren alle modelkeuzes al vastgelegd vóór validatie? Is er temporal en externe validatie gedaan? Zijn kalibratie, subgroepprestaties en klinische bruikbaarheid onderzocht? Sluit de validatiepopulatie aan bij mijn patiënten? Is er monitoring na implementatie?

Een hoge AUC kan een goed begin zijn, maar nooit het eindpunt. Klinische generaliseerbaarheid ontstaat pas wanneer een model laat zien dat het betrouwbaar discrimineert, correct gekalibreerd is, robuust blijft onder dataset shift, en meerwaarde heeft binnen echte beslissingen. Interne validatie vertelt vooral of het model de eigen data begrijpt. Externe validatie vertelt of het model de zorg aankan.

## Bronnen

Collins GS et al. TRIPOD+AI statement. BMJ 2024. https://www.bmj.com/content/385/bmj-2023-078378

Moons KGM et al. PROBAST+AI. BMJ 2025. https://www.bmj.com/content/388/bmj-2024-082505

Collins GS et al. Evaluation of clinical prediction models, part 1. BMJ 2024. https://www.bmj.com/content/384/bmj-2023-074819

Riley RD et al. Evaluation of clinical prediction models, part 2: external validation. BMJ 2024. https://www.bmj.com/content/384/bmj-2023-074820

Van Calster B et al. Calibration: the Achilles heel of predictive analytics. BMC Medicine 2019. https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-019-1466-7

Koch LM et al. Distribution shift detection for postmarket surveillance of medical AI algorithms. npj Digital Medicine 2024. https://www.nature.com/articles/s41746-024-01085-w

---


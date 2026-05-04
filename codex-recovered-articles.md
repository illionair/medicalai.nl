# Codex recovered output (2026-05-04)

## Article drafts (17)

<!-- bron: rollout-2026-05-04T00-35-32-019deffb-894d-76d0-916e-03bf5213b4f2.jsonl  ts: 2026-05-03T22:36:41.688Z -->

# Hoe beoordeel je een AI-artikel in 10 minuten?

AI-artikelen in de zorg kunnen indrukwekkend klinken: hoge AUC, grote datasets, deep learning, “expert-level performance”. Toch is de klinische vraag meestal eenvoudiger: helpt dit mijn patiënt, in mijn setting, zonder nieuwe schade te veroorzaken? Met onderstaande 10-minutencheck kun je snel bepalen of een AI-studie de moeite waard is om dieper te lezen, te bespreken in een journal club of voorlopig naast je neer te leggen.

## De snelle 10-minutencheck

**Minuut 1: Wat is de klinische taak?**  
Vraag eerst: welk besluit moet de AI ondersteunen? Diagnose, triage, prognose, behandeling, monitoring of administratieve workflow? Een model dat “sepsis voorspelt” is te vaag. Wanneer voorspelt het model sepsis, voor wie, met welke actie erna, en wie moet die actie uitvoeren?

**Minuut 2: Klopt de populatie?**  
Vergelijk de studiepopulatie met jouw patiënten. Leeftijd, comorbiditeit, ziektestadium, setting, apparatuur, taal, etniciteit, verwijspatroon en prevalentie doen ertoe. Een model uit één academisch centrum met geselecteerde patiënten is zelden direct toepasbaar in een perifere spoedpost of huisartsenpraktijk.

**Minuut 3: Is de uitkomst klinisch relevant?**  
Kijk of de uitkomst hard, reproduceerbaar en relevant is. Mortaliteit, IC-opname, pathologisch bevestigde diagnose of heropname zijn vaak sterker dan samengestelde, administratieve of proxy-uitkomsten. Let ook op timing: een voorspelling van verslechtering “binnen 24 uur” is alleen nuttig als er op dat moment nog iets te doen is.

**Minuut 4: Hoe is de dataset opgebouwd?**  
Check bron, periode, inclusiecriteria, exclusies en ontbrekende data. Zijn trainings-, validatie- en testdata echt gescheiden? Bij beeldvorming: komen meerdere beelden van dezelfde patiënt in verschillende sets terecht? Bij EPD-data: zijn variabelen beschikbaar vóór het beslismoment, of is er datalek uit de toekomst?

**Minuut 5: Is er externe validatie?**  
Interne validatie is een begin, geen eindpunt. Een goede AI-studie test het model bij voorkeur op data uit andere centra, andere tijdsperioden of andere systemen. Externe validatie is cruciaal omdat AI-modellen gevoelig zijn voor lokale patronen: scanners, labmethoden, codeergewoonten en behandelprotocollen.

**Minuut 6: Kijk verder dan AUC**  
Een hoge AUC betekent niet automatisch klinische bruikbaarheid. Zoek sensitiviteit, specificiteit, positief en negatief voorspellende waarde bij relevante drempels. Vraag: hoeveel fout-positieven en fout-negatieven levert dit op per 100 patiënten in mijn setting? Een model kan statistisch sterk zijn en praktisch onbruikbaar door te veel alarmen.

**Minuut 7: Is het model gecalibreerd?**  
Voor risicomodellen is calibratie essentieel: als het model 20% risico voorspelt, gebeurt de uitkomst dan ongeveer bij 20 van de 100 vergelijkbare patiënten? Slechte calibratie kan leiden tot overbehandeling of gemiste zorg. Zoek naar calibratieplots, intercept, slope of beoordeling per risicogroep, niet alleen naar discriminatie.

**Minuut 8: Is bias onderzocht?**  
AI kan bestaande ongelijkheid versterken. Kijk of prestaties zijn uitgesplitst naar relevante subgroepen: geslacht, leeftijd, etniciteit, sociaaleconomische status, taal, comorbiditeit, zwangerschap, apparatuurtype of centrum. “Geen verschil gevonden” is alleen geruststellend als de studie genoeg power had en de subgroepen vooraf logisch waren gekozen.

**Minuut 9: Past het in de workflow?**  
Een model is geen los getal, maar een interventie in een werksysteem. Wie ziet de output? Wanneer? In welk scherm? Hoe wordt onzekerheid getoond? Mag de arts afwijken? Is er training? Wordt alarmmoeheid gemeten? DECIDE-AI benadrukt terecht dat menselijke factoren en implementatiecontext onderdeel zijn van de klinische evaluatie, niet een voetnoot achteraf.

**Minuut 10: Is er bewijs voor clinical utility?**  
De hoogste lat is niet modelprestatie, maar betere zorg: minder complicaties, sneller juiste behandeling, minder onnodige diagnostiek, betere patiëntervaring of lagere werkdruk zonder schade. Idealiter is er prospectieve evaluatie, liefst gerandomiseerd of zorgvuldig quasi-experimenteel. Decision curve analysis, impactanalyse of trialdata zijn sterker dan alleen retrospectieve performance.

## Uitleg: wat maakt een AI-artikel geloofwaardig?

Begin met de vraag of het artikel past bij het type studie. Voor diagnostische accuratesse is STARD-AI relevant; voor predictiemodellen TRIPOD+AI en PROBAST+AI; voor trials CONSORT-AI; voor vroege klinische evaluatie DECIDE-AI. Deze richtlijnen zijn geen keurmerk, maar ze helpen zien wat minimaal transparant gerapporteerd moet zijn.

Let vooral op de afstand tussen onderzoek en praktijk. Veel AI-studies blijven steken in retrospectieve evaluatie: het model krijgt historische data en voorspelt wat al gebeurd is. Dat kan nuttig zijn voor ontwikkeling, maar zegt weinig over gedrag in de spreekkamer, op de SEH of in het MDO. Zodra een AI-output echte beslissingen beïnvloedt, ontstaan nieuwe risico’s: automation bias, alarmmoeheid, verschuiving van verantwoordelijkheid en veranderde diagnostische drempels.

Regulatoire context hoort ook in je snelle beoordeling. In Europa vallen veel medische AI-systemen onder bestaande medische-hulpmiddelenregels en, afhankelijk van gebruik en risico, onder de EU AI Act. In de VS publiceert de FDA lijsten en guidance rond AI-enabled medical devices, inclusief aandacht voor lifecycle management en vooraf bepaalde wijzigingsplannen. Voor de lezer betekent dit: vraag of het systeem bedoeld is als medisch hulpmiddel, of er markttoelating is voor de beoogde indicatie, en hoe updates na implementatie worden bewaakt.

## Rode vlaggen

Wantrouw artikelen die vooral marketingtaal gebruiken: “revolutionair”, “clinician-level”, “generalizable” zonder overtuigende externe validatie. Een AUC zonder klinische drempels is onvoldoende. Een model zonder calibratie-informatie is riskant wanneer het risicoschattingen geeft. Een dataset zonder duidelijke tijdslijn of patiëntscheiding kan datalek bevatten. Subgroepanalyse ontbreekt vaak precies waar bias het meest waarschijnlijk is.

Andere rode vlaggen: alleen één centrum, kleine testset, onduidelijke referentiestandaard, uitkomst die deels door het model beïnvloed had kunnen worden, geen vergelijking met standaardzorg, geen beschrijving van ontbrekende data, geen foutanalyse, geen workflowbeschrijving, geen monitoringplan na implementatie, en belangenverstrengeling zonder onafhankelijke evaluatie.

## Conclusie

Een AI-artikel beoordelen hoeft niet te beginnen met de architectuur van het neurale netwerk. Begin klinisch: patiënt, beslissing, uitkomst, setting en consequentie. Daarna pas modelprestatie. In 10 minuten kun je meestal onderscheiden of een studie alleen technisch interessant is, of mogelijk klinisch bruikbaar. De kernvraag blijft: zou dit model, getest bij mijn patiënten en ingebed in mijn workflow, aantoonbaar betere beslissingen opleveren dan goede zorg zonder dit model?

## Bronnen

1. Collins GS et al. TRIPOD+AI statement. BMJ, 2024. https://www.bmj.com/content/385/bmj-2023-078378  
2. Moons KGM et al. PROBAST+AI. BMJ, 2025. https://www.bmj.com/content/388/bmj-2024-082505  
3. Sounderajah V et al. STARD-AI reporting guideline. Nature Medicine, 2025. https://www.nature.com/articles/s41591-025-03953-8  
4. Liu X et al. CONSORT-AI extension. Nature Medicine, 2020. https://www.nature.com/articles/s41591-020-1034-x  
5. Rivera SC et al. SPIRIT-AI extension. Nature Medicine, 2020. https://www.nature.com/articles/s41591-020-1037-7  
6. Vasey B et al. DECIDE-AI. Nature Medicine, 2022. https://www.nature.com/articles/s41591-022-01772-9  
7. Vickers AJ, Elkin EB. Decision curve analysis. Medical Decision Making, 2006. https://doi.org/10.1177/0272989X06295361  
8. FDA. Artificial Intelligence in Software as a Medical Device. https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device  
9. Regulation (EU) 2024/1689, Artificial Intelligence Act. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng

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

<!-- bron: rollout-2026-05-04T00-35-33-019deffb-8a64-7d40-8bdd-45e9c2441702.jsonl  ts: 2026-05-03T22:36:40.635Z -->

# AUC uitgelegd voor zorgprofessionals: wat zegt het wel en niet?

In publicaties over medische AI staat de AUC vaak prominent in de samenvatting: “het model behaalde een AUC van 0,89”. Dat klinkt indrukwekkend, maar wat betekent het klinisch? En vooral: wat betekent het niet? Voor zorgprofessionals is AUC nuttig, maar alleen als onderdeel van een bredere beoordeling van modelprestatie, veiligheid en bruikbaarheid.

AUC staat voor *area under the receiver operating characteristic curve*. De ROC-curve laat zien hoe sensitiviteit en specificiteit veranderen wanneer je de beslisdrempel van een test of AI-model verschuift. Een model geeft bijvoorbeeld een risicoscore voor sepsis, maligniteit op beeldvorming of heropname binnen 30 dagen. Kies je een lage drempel, dan vang je veel echte gevallen: hoge sensitiviteit. Maar je krijgt meestal ook meer fout-positieven: lagere specificiteit. Kies je een hoge drempel, dan gebeurt het omgekeerde.

De AUC vat die hele ROC-curve samen in één getal. Een AUC van 0,5 betekent dat het model niet beter discrimineert dan toeval. Een AUC van 1,0 betekent perfecte scheiding tussen patiënten met en zonder uitkomst. Praktisch kun je AUC ook lezen als de kans dat het model een willekeurige patiënt mét de uitkomst een hogere risicoscore geeft dan een willekeurige patiënt zonder de uitkomst. Daarmee meet AUC vooral discriminatie: kan het model rangordenen wie relatief hoger of lager risico heeft?

Dat is waardevol. In medische AI wil je vaak weten of het algoritme überhaupt signaal oppikt. Een model voor longembolie dat patiënten met embolie gemiddeld niet hoger scoort dan patiënten zonder embolie, is weinig bruikbaar. AUC is daarom een goede eerste taal om modellen te vergelijken, vooral in ontwikkel- en validatiestudies.

Maar AUC zegt niet welk besluit je moet nemen bij een individuele patiënt. Daarvoor heb je een threshold nodig: vanaf welke voorspelde kans of score noemen we de test “positief”, starten we behandeling, doen we aanvullende diagnostiek of alarmeren we een team? Sensitiviteit, specificiteit, positief voorspellende waarde en negatief voorspellende waarde horen altijd bij zo’n gekozen drempel.

Neem een AI-model dat intracraniële bloeding op CT prioriteert. Bij een lage drempel kan het model bijna alle bloedingen vinden, maar ook veel scans ten onrechte als urgent markeren. Dat kan acceptabel zijn als missen gevaarlijker is dan extra beoordeling. Bij een model dat patiënten selecteert voor een belastende biopsie kan een hogere drempel logischer zijn, omdat fout-positieven directe schade veroorzaken. De AUC alleen vertelt niet waar die balans ligt.

Sensitiviteit is het aandeel zieken of patiënten met de uitkomst dat positief test. Specificiteit is het aandeel niet-zieken dat negatief test. PPV is de kans dat iemand met een positieve test werkelijk de aandoening of uitkomst heeft. NPV is de kans dat iemand met een negatieve test de aandoening of uitkomst niet heeft. Het verschil is cruciaal: sensitiviteit en specificiteit zijn testeigenschappen bij een gekozen drempel, terwijl PPV en NPV sterk afhangen van prevalentie.

Prevalentie is een van de meest onderschatte punten bij medische AI. Stel dat een sepsismodel op de IC en op een algemene verpleegafdeling dezelfde sensitiviteit en specificiteit heeft. De PPV zal op de IC meestal hoger zijn, omdat sepsis daar vaker voorkomt. Op een laag-prevalente afdeling kunnen veel positieve alarmen fout-positief zijn, zelfs bij een redelijke AUC. Dat leidt tot alarmmoeheid, extra diagnostiek en mogelijk onnodige antibiotica. Omgekeerd kan de NPV in een laag-prevalente setting juist zeer hoog lijken. Daarom moet een model altijd extern gevalideerd worden in de populatie waarin het gebruikt gaat worden.

Daarnaast kan een model goed discrimineren maar slecht gekalibreerd zijn. Calibratie betekent: komen voorspelde kansen overeen met geobserveerde risico’s? Als een model bij honderd patiënten telkens “20% risico” voorspelt, dan zou ongeveer twintig van hen de uitkomst moeten krijgen. Een AUC kan hoog blijven terwijl de absolute kansen systematisch te hoog of te laag zijn. Dat is klinisch belangrijk. Voor triage op rangorde kan discriminatie soms volstaan, maar voor gedeelde besluitvorming, informed consent of behandelkeuzes op basis van absolute risico’s is calibratie essentieel.

In medische AI komt miscalibratie vaak voor door verschillen tussen ontwikkeldata en praktijkdata. Denk aan andere scanners, andere laboratoriumassays, veranderde behandelprotocollen, codering in het EPD of een patiëntpopulatie met andere comorbiditeit. Een model dat in ziekenhuis A prima gekalibreerd is, kan in ziekenhuis B te agressief alarmeren. Daarom zijn calibratieplots, calibratie-intercept, calibratiehelling en hercalibratie geen statistische luxe, maar onderdeel van klinische veiligheid.

Ook zegt AUC weinig over workflow. Een model met AUC 0,92 kan onbruikbaar zijn als de uitslag te laat komt, onduidelijk wordt gepresenteerd, geen handelingsperspectief geeft of vooral patiënten markeert waarvoor de arts toch al actie zou nemen. Omgekeerd kan een model met bescheidener AUC nuttig zijn als het precies op het juiste moment een behandelbare subgroep vindt.

Hier komt decision curve analysis in beeld. Decision curve analysis probeert de klinische waarde van een model te beoordelen door netto voordeel te berekenen over een reeks beslisdrempels. Het vergelijkt het model met eenvoudige strategieën zoals “behandel iedereen” of “behandel niemand”. De kern is dat fout-positieven en fout-negatieven niet even zwaar wegen. Bij verdenking meningitis weegt een gemiste diagnose anders dan een onnodige extra bloedtest. Decision curve analysis maakt expliciet bij welke drempelwaarden een model meer goed dan kwaad doet.

Voor zorgprofessionals is dat vaak begrijpelijker dan een abstracte AUC. De vraag wordt dan: binnen het risicogebied waarin wij werkelijk zouden handelen, levert dit model netto voordeel op? Als een model alleen voordeel heeft bij drempels die klinisch niet realistisch zijn, is het waarschijnlijk niet bruikbaar, hoe mooi de AUC ook oogt.

Hoe beoordeel je een AUC in de praktijk? Begin met de context. Gaat het om diagnose, prognose, screening, triage of behandelindicatie? Kijk vervolgens naar de validatiepopulatie: lijkt die op jouw patiënten? Vraag naar prestaties bij relevante drempels: sensitiviteit, specificiteit, PPV en NPV. Kijk naar calibratie, vooral als absolute risico’s worden gebruikt. Vraag of er decision curve analysis of een vergelijkbare klinische utility-analyse is gedaan. En beoordeel de workflow: wie ziet de uitslag, wanneer, met welke actie, en hoe wordt gemonitord of het model blijft presteren?

De kernboodschap is simpel: AUC zegt hoe goed een model patiënten kan rangordenen naar risico. Dat is nuttig, maar onvoldoende. AUC zegt niet automatisch of de voorspelde kansen kloppen, welke drempel klinisch verstandig is, hoeveel fout-positieven je krijgt in jouw populatie, of het model daadwerkelijk betere zorg oplevert. Voor medische AI is een hoge AUC dus geen eindpunt, maar een beginpunt van de beoordeling.

## Bronnen

- TRIPOD Statement, BMJ/BMC Medicine: https://www.bmj.com/content/350/bmj.g7594 en https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-014-0241-z  
- ROC/AUC praktische uitleg voor radiologen, *Korean Journal of Radiology*: https://pmc.ncbi.nlm.nih.gov/articles/PMC2698108/  
- Calibration: the Achilles heel of predictive analytics, *BMC Medicine*: https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-019-1466-7  
- Decision Curve Analysis, Vickers & Elkin, *Medical Decision Making*: https://journals.sagepub.com/doi/10.1177/0272989X06295361  
- Stap-voor-stap uitleg decision curve analysis, *Diagnostic and Prognostic Research*: https://diagnprognres.biomedcentral.com/articles/10.1186/s41512-019-0064-7  
- FDA over evaluatie van AI-enabled medical devices: https://www.fda.gov/medical-devices/medical-device-regulatory-science-research-programs-conducted-osel/evaluation-methods-artificial-intelligence-ai-enabled-medical-devices-performance-assessment-and

---

<!-- bron: rollout-2026-05-04T00-35-33-019deffb-8b77-7730-9e61-be26bf58ea21.jsonl  ts: 2026-05-03T22:36:32.463Z -->

# Calibratie: de vergeten maat bij AI in de zorg

AI-modellen in de zorg worden vaak gepresenteerd met indrukwekkende AUC’s, sensitiviteiten of accuratessepercentages. Die maten zeggen vooral iets over ranking: kan het model patiënten met een uitkomst gemiddeld hoger plaatsen dan patiënten zonder die uitkomst? Dat is belangrijk, maar niet genoeg. In de kliniek werken we zelden met alleen rangordes. We werken met risico’s: 5%, 12%, 30%, 70%. Zulke getallen sturen gesprekken, triage, vervolgdiagnostiek en behandeling. Dan moet niet alleen de volgorde kloppen, maar ook de schaal.

Calibratie gaat over die schaal. Een goed gecalibreerd model geeft voorspelde kansen die overeenkomen met de geobserveerde werkelijkheid. Als een sepsis-model bij honderd vergelijkbare patiënten telkens ongeveer 20% risico voorspelt, dan verwacht je dat ongeveer twintig van hen sepsis ontwikkelen. Niet tien. Niet veertig. Een model kan dus uitstekend discrimineren, maar slecht gecalibreerd zijn. Het herkent dan relatief goed wie hoger of lager risico heeft, maar overschat of onderschat het absolute risico. Voor klinische besluitvorming is dat geen detail, maar een veiligheidsvraag.

Een eerste eenvoudige maat is **calibratie-in-the-large**. Die vergelijkt het gemiddelde voorspelde risico met het geobserveerde eventpercentage. Stel dat een model gemiddeld 18% complicatierisico voorspelt, terwijl in de lokale populatie 9% complicaties optreedt. Dan is het model systematisch te pessimistisch. De ranking kan nog steeds bruikbaar zijn, maar de absolute kansen zijn te hoog. Dit gebeurt vaak bij transport van modellen tussen ziekenhuizen, regio’s of tijdsperioden, omdat casemix, prevalentie, diagnostiek en behandelbeleid verschillen.

De **calibration slope** kijkt naar een ander probleem: zijn de voorspellingen te extreem of juist te vlak? Een slope van 1 is ideaal. Een slope lager dan 1 betekent meestal dat voorspelde risico’s te uitgesproken zijn: lage risico’s zijn te laag, hoge risico’s te hoog. Dat past bij overfitting, waarbij het model ruis uit de ontwikkeldata heeft geleerd. Een slope hoger dan 1 betekent dat voorspellingen te voorzichtig zijn: lage en hoge risico’s liggen te dicht bij elkaar. In de praktijk is vooral een slope onder 1 een waarschuwingssignaal bij complexe machine-learningmodellen die op beperkte of selectieve data zijn ontwikkeld.

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

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-0fea-7d62-918c-46da75aa28ad.jsonl  ts: 2026-05-03T22:39:49.154Z -->

# Eerlijk genoeg voor de kliniek? Bias en fairness in medische AI

Medische AI wordt vaak beoordeeld op gemiddelde prestaties: AUROC, sensitiviteit, specificiteit, F1-score. Maar een model kan indrukwekkend scoren in de totale populatie en tegelijk slechter werken voor ouderen, vrouwen, mensen met een donkere huid, patiënten met multimorbiditeit, of een ziekenhuis met andere apparatuur en werkprocessen. Bias en fairness gaan daarom niet alleen over “representatieve data”, maar over de hele keten van dataverzameling, labels, metingen, validatie, implementatie en klinische gevolgen. Dit artikel is educatief bedoeld en is geen juridisch of medisch advies.

## Bias is geen enkelvoudig probleem

**Datasetbias** ontstaat wanneer de ontwikkel- of validatieset niet lijkt op de beoogde klinische populatie. Denk aan een model dat vooral is getraind op academische centra, volwassenen, een specifieke scannerfabrikant of patiënten met complete dossiers. In Nederland en België kan dit extra relevant zijn bij regionale verschillen in zorgpaden, verwijspatronen, codering, etniciteitsregistratie en sociaaleconomische context.

**Labelbias** zit in de uitkomstdefinitie. AI leert niet “de waarheid”, maar het label dat onderzoekers kiezen: diagnosecodes, declaraties, behandelbeslissingen, radiologieverslagen of expertconsensus. Als bestaande zorg ongelijk is, kan het label die ongelijkheid kopiëren. Een klassiek voorbeeld is een Amerikaans populatiemanagementalgoritme dat zorgkosten gebruikte als proxy voor ziektebehoefte; daardoor werden patiënten met vergelijkbare ziektelast ongelijk ingeschat.

**Measurement bias** ontstaat wanneer metingen systematisch verschillen tussen groepen of settings. Apparaten, protocollen, meetfrequentie, ontbrekende waarden en laboratoriumaanvragen zijn zelden neutraal. Een patiënt die vaker wordt gemonitord, produceert meer data; een patiënt bij wie bepaalde testen minder vaak worden aangevraagd, lijkt mogelijk “gezonder” in het dossier.

**Spectrum bias** betekent dat het ziekte- of ernstespectrum in de studie niet overeenkomt met de praktijk. Een model dat is gevalideerd op duidelijke casussen en gezonde controles kan falen bij vroege ziekte, comorbiditeit, atypische presentatie of patiënten op de grens van een klinische beslissing.

## Kijk voorbij gemiddelde performance

Subgroup performance is geen optionele extra. Een totaalscore kan grote verschillen maskeren. Vraag daarom naar prestaties per relevante subgroep: leeftijd, geslacht, zwangerschap, huidskleur waar relevant voor beeld of sensoriek, taal, sociaaleconomische status, migratieachtergrond, comorbiditeit, centrumtype, scanner/protocol en zorgsetting. Niet elke subgroepanalyse is zinvol of statistisch betrouwbaar; kleine aantallen geven brede onzekerheidsintervallen. Maar “te weinig data” is geen reden om fairness te negeren. Het is juist een bevinding: de veiligheid en toepasbaarheid zijn dan onzeker.

Let ook op calibratie binnen subgroepen. Een risico van 20% moet ongeveer hetzelfde betekenen voor verschillende patiëntgroepen. Een model kan dezelfde AUROC hebben, maar bij één groep risico structureel overschatten en bij een andere groep onderschatten. Dat heeft directe gevolgen voor triage, behandeling en geruststelling.

## Fairness metrics: nuttig, maar niet waardenvrij

Fairness metrics maken ongelijkheid zichtbaar, maar kiezen geen ethisch of klinisch doel voor u. Veelgebruikte maten zijn onder meer gelijke sensitiviteit tussen groepen, gelijke specificiteit, gelijke fout-positieve of fout-negatieve percentages, predictive parity en calibratie per groep. Bij ongelijke prevalentie kunnen deze criteria met elkaar botsen: een model kan niet altijd tegelijk perfect gekalibreerd zijn en gelijke foutpercentages hebben.

Daarom begint fairness niet met een formule, maar met de klinische vraag. Bij een sepsiswaarschuwing kan een gemiste diagnose zwaarder wegen dan een fout alarm; bij screening kan overdiagnostiek juist grote schade geven. Fairness betekent dan niet automatisch identieke drempels voor iedereen, maar wel expliciete keuzes, onderbouwde drempels, transparante foutanalyse en monitoring na implementatie.

## Klinische impact: wie draagt de schade?

Bias wordt pas echt belangrijk in de workflow. Een model met ongelijke fout-negatieven kan betekenen dat één groep later behandeling krijgt. Ongelijke fout-positieven kunnen leiden tot onnodige diagnostiek, angst, straling, kosten of wachttijd. Ook kan AI bestaande verschillen versterken: afdelingen met meer capaciteit profiteren sneller, terwijl kwetsbare groepen juist minder toegang hebben tot vervolgzorg.

Beoordeel daarom niet alleen modelperformance, maar ook de beslisketen: wie ziet de output, hoe wordt die geïnterpreteerd, welke actie volgt, is er menselijk toezicht, en worden afwijkingen gelogd? Een AI-tool die “slechts adviseert” kan in de praktijk toch sterk sturen.

## Relevantie voor reporting en risk-of-bias tools

TRIPOD+AI is relevant voor studies die predictiemodellen ontwikkelen of evalueren. Het helpt beoordelen of populatie, databronnen, predictoren, uitkomstdefinities, missing data, modelontwikkeling en performance volledig zijn gerapporteerd. PROBAST+AI sluit daarop aan als instrument voor kwaliteit, risk of bias en toepasbaarheid van predictiemodellen.

Voor medische beeldvorming is CLAIM belangrijk, vooral voor transparantie over inputdata, referentiestandaard, preprocessing, splitsing van datasets, externe testsets en foutanalyse. Bij klinische trials met AI-interventies helpt CONSORT-AI om duidelijk te krijgen hoe de AI in het zorgpad zat, welke versie is gebruikt, hoe mens-AI-interactie verliep en welke fouten optraden. Deze tools lossen fairness niet automatisch op, maar ze maken zichtbaar of fairness überhaupt beoordeeld kan worden.

## Praktische checklist voor beoordeling

1. Past de ontwikkel- en validatiepopulatie bij mijn patiënten, centrum en zorgpad?
2. Zijn relevante subgroepen vooraf benoemd, voldoende groot en apart gerapporteerd?
3. Is duidelijk hoe labels zijn vastgesteld, en kunnen die bestaande ongelijkheid weerspiegelen?
4. Zijn meetapparaten, protocollen, missing data en meetfrequentie vergelijkbaar tussen groepen?
5. Is er externe validatie op data uit andere centra, landen, scanners of tijdsperioden?
6. Worden naast AUROC ook sensitiviteit, specificiteit, calibratie en fouttypes per subgroep getoond?
7. Is uitgelegd welke fairness metric is gekozen en waarom die klinisch passend is?
8. Zijn drempels afgestemd op klinische schade, capaciteit en vervolgacties?
9. Is er een plan voor monitoring, drift, incidentmelding en herbeoordeling na implementatie?
10. Is de rapportage compleet volgens TRIPOD+AI, PROBAST+AI, CLAIM of CONSORT-AI, afhankelijk van het type studie?

## Slot

Fairness in medische AI is geen afvinkrubriek achteraf. Het is een klinisch-wetenschappelijke vraag: voor wie werkt dit systeem, onder welke omstandigheden, met welke foutpatronen, en wat gebeurt er daarna met echte patiënten? Een eerlijker model begint bij betere rapportage, kritische validatie en de bereidheid om gemiddelde prestaties niet te verwarren met veilige zorg.

## Bronnen

- Collins et al., [TRIPOD+AI, BMJ 2024](https://www.bmj.com/content/385/bmj-2023-078378)
- Moons et al., [PROBAST+AI, BMJ 2025](https://www.bmj.com/content/388/bmj-2024-082505)
- Tejani et al., [CLAIM 2024 Update](https://doi.org/10.1148/ryai.240300)
- Liu et al., [CONSORT-AI, Nature Medicine 2020](https://www.nature.com/articles/s41591-020-1034-x)
- WHO, [Ethics and governance of AI for health, 2021](https://www.who.int/publications/i/item/9789240029200)
- Obermeyer et al., [Racial bias in a health algorithm, Science 2019](https://www.science.org/doi/10.1126/science.aax2342)

---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-10df-7b71-9ebb-e28cc2ad4519.jsonl  ts: 2026-05-03T22:40:32.887Z -->

# Wanneer wordt AI een medisch hulpmiddel? De MDR-bril voor software in de zorg

AI in de zorg voelt vaak als “software”, maar juridisch kan het al snel een medisch hulpmiddel zijn. Niet omdat er AI in zit, maar omdat de software een medische bedoeling heeft en gebruikt wordt voor diagnose, prognose, monitoring of behandeling. Dit artikel is bedoeld als praktische oriëntatie voor zorgprofessionals, onderzoekers en product owners. Het is educatief en geen juridisch advies; betrek bij concrete marktintroductie altijd regulatory, klinische en juridische expertise.

## De kern: intended purpose

De belangrijkste vraag is niet: “Is het AI?” maar: “Waarvoor claimt de fabrikant dat het gebruikt wordt?” De MDR noemt dit de intended purpose: het beoogde gebruik zoals blijkt uit label, gebruiksaanwijzing, marketing, verkoopmateriaal en klinische evaluatie.

Dat betekent: dezelfde algoritmische techniek kan buiten of binnen de MDR vallen afhankelijk van de claim. Een model dat CT-beelden comprimeert voor opslag is iets anders dan een model dat longnoduli detecteert. Een chatbot die algemene uitleg geeft over diabetes is iets anders dan een tool die voor een specifieke patiënt een insuline-aanpassing adviseert.

## SaMD, MDSW en AI: termen zonder mystiek

Internationaal wordt vaak gesproken over SaMD: Software as a Medical Device. Daarmee wordt software bedoeld die zelf een medische functie uitvoert zonder onderdeel te hoeven zijn van een specifiek hardware-medisch hulpmiddel. In Europese guidance wordt meestal Medical Device Software (MDSW) gebruikt. Het gaat om software die, alleen of in combinatie, een medisch doel heeft volgens de MDR of IVDR.

Belangrijk: cloud, app, EPD-module, server of embedded software maakt op zichzelf niet uit. De locatie of technische verpakking bepaalt niet de kwalificatie. Een AI-model in een webapp kan even goed MDSW zijn als software in een scanner.

## Klinische beslisondersteuning: van laag naar hoog risico

Clinical decision support is een breed spectrum. Een naslagwerk, eenvoudige zoekfunctie of algemene richtlijnweergave zal meestal niet als medisch hulpmiddel kwalificeren, zolang het geen patiëntspecifieke analyse uitvoert en geen medische output creëert.

Waarschijnlijk binnen de MDR komt software die patiëntgegevens verwerkt om aanbevelingen, waarschuwingen of scores te geven voor diagnose, prognose, monitoring of therapie. Denk aan:

- AI die mammografieën of CT-scans analyseert en verdachte afwijkingen markeert.
- Een ECG-algoritme dat ritmestoornissen detecteert.
- Een sepsis-alert op basis van vitale parameters en labwaarden.
- Software die antistollingsdosering of chemotherapiedosering adviseert.
- Een EPD-module die patiëntspecifiek nierfunctierisico koppelt aan medicatieadvies.
- Software die een medisch apparaat aanstuurt of beïnvloedt, zoals een closed-loop insulinepomp.

Bij labdiagnostiek of analyse van specimens kan de IVDR in plaats van de MDR relevant zijn.

## Rule 11: de software-regel onder de MDR

Als software eenmaal als medisch hulpmiddel kwalificeert, komt classificatie. Voor veel medische software is Rule 11 uit Annex VIII van de MDR doorslaggevend.

In gewone taal: software die informatie levert die wordt gebruikt voor beslissingen met diagnostisch of therapeutisch doel is meestal klasse IIa. Als een verkeerde beslissing ernstig letsel of een chirurgische interventie kan veroorzaken, kan klasse IIb gelden. Als een verkeerde beslissing kan leiden tot overlijden of onomkeerbare verslechtering van gezondheid, kan klasse III gelden.

Software die fysiologische processen monitort is meestal klasse IIa; monitoring van vitale parameters waarbij variaties direct gevaar kunnen opleveren, kan klasse IIb zijn. “Alle andere software” kan klasse I zijn, maar dat is geen vrijbrief: eerst moet duidelijk zijn dat het überhaupt MDSW is, en andere MDR-regels kunnen ook van toepassing zijn.

## Wanneer valt AI waarschijnlijk buiten MDR?

AI kan buiten de MDR vallen wanneer er geen medische intended purpose is. Voorbeelden:

- Administratie: planning, facturatie, personeelsroosters, voorraadbeheer.
- Communicatie: veilige berichten, videobellen, verwijzingen doorsturen.
- Opslag en overdracht: EPD/PACS-functionaliteit die alleen data bewaart, archiveert, converteert of toont zonder diagnostische verwerking.
- Onderwijs: simulaties, nascholing, algemene medische uitleg.
- Algemene wellness: leefstijl-, fitness- of slaapapps zonder medische claim.
- Onderzoekstools die niet in klinische besluitvorming worden gebruikt en niet op de markt of in gebruik worden genomen voor patiëntenzorg.

Let op de nuance: zodra een module in zo’n systeem medische informatie analyseert, interpreteert of een patiëntspecifieke aanbeveling geeft, kan juist die module wel onder MDR vallen.

## CE-markering: meer dan een sticker

Voor markttoegang in de EU moet een medisch hulpmiddel voldoen aan de MDR en CE-gemarkeerd worden. Voor klasse IIa, IIb en III is doorgaans een notified body betrokken. De fabrikant moet onder meer zorgen voor een kwaliteitsmanagementsysteem, risicomanagement, technische documentatie, cybersecurity, usability, software lifecycle-processen, klinische evaluatie en post-market surveillance.

Bij AI is vooral belangrijk dat claims aantoonbaar zijn. “Detecteert beroerte vroegtijdig” vraagt ander bewijs dan “ordent beelden op acquisitiedatum”. Marketingtaal kan de regulatory scope vergroten.

## Clinical evaluation: bewijs dat de software klinisch klopt

Klinische evaluatie is geen eenmalig document aan het einde van ontwikkeling. Het is een gepland, systematisch en continu proces. Voor MDSW draait het om drie bewijsblokken:

1. Valid clinical association of scientific validity: is de output klinisch logisch verbonden met de aandoening of fysiologische staat?
2. Technical performance: genereert het model betrouwbaar, nauwkeurig en reproduceerbaar de bedoelde output uit de inputdata?
3. Clinical performance: levert de output in de beoogde populatie, setting en workflow klinisch relevante informatie of voordeel op?

Voor AI betekent dit ook aandacht voor generaliseerbaarheid, datasetrepresentativiteit, bias, beoogde gebruikers, workflow, usability en prestaties in de Nederlandse of Belgische praktijk.

## Post-market surveillance en model updates

AI is zelden “af”. Na CE-markering moet de fabrikant actief gegevens verzamelen over kwaliteit, prestaties en veiligheid: klachten, incidenten, gebruikersfeedback, real-world performance, literatuur, PMCF en trends. Voor hogere klassen hoort daar ook periodieke veiligheidsrapportage bij.

Model updates zijn regulatory gevoelig. Een bugfix of securitypatch is iets anders dan retraining op nieuwe data, een nieuwe populatie, een extra indicatie of een gewijzigde drempelwaarde. Elke wijziging vraagt impactanalyse: verandert intended purpose, prestatie, risico, interpretatie van data of gebruikersinterface? Dan kan herbeoordeling, notified-body betrokkenheid of aanvullende klinische validatie nodig zijn.

## Praktische checklist

- Welke medische claim staat in producttekst, handleiding, contract, pitchdeck of demo?
- Worden patiëntspecifieke gegevens verwerkt?
- Levert de AI nieuwe medische informatie, interpretatie, score, alarm of advies?
- Wordt de output gebruikt voor diagnose, prognose, monitoring, triage of behandeling?
- Wat gebeurt er als de output fout-negatief of fout-positief is?
- Is het een zelfstandig product, module, accessoire of onderdeel van hardware?
- Valt het onder MDR of mogelijk IVDR?
- Welke Rule 11-klasse is plausibel?
- Is er klinisch bewijs voor de specifieke populatie, setting en workflow?
- Hoe worden drift, updates, cybersecurity, incidenten en real-world performance gevolgd?

## Bronnen

- European Commission: [MDR Regulation (EU) 2017/745, EUR-Lex](https://eur-lex.europa.eu/eli/reg/2017/745/oj)
- European Commission/MDCG: [MDCG 2019-11 Rev.1, Qualification and Classification of Software, June 2025](https://health.ec.europa.eu/latest-updates/update-mdcg-2019-11-rev1-qualification-and-classification-software-regulation-eu-2017745-and-2025-06-17_en)
- European Commission/MDCG: [MDCG 2020-1, Clinical Evaluation of Medical Device Software](https://health.ec.europa.eu/system/files/2020-09/md_mdcg_2020_1_guidance_clinic_eva_md_software_en_0.pdf)
- IMDRF: [Software as a Medical Device: Key Definitions](https://www.imdrf.org/documents/software-medical-device-samd-key-definitions)
- IMDRF: [SaMD Clinical Evaluation](https://www.imdrf.org/documents/software-medical-device-samd-clinical-evaluation)
- European Commission/MDCG/AIB: [MDCG 2025-6, Interplay between MDR/IVDR and the AI Act](https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en)

---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-10df-7b71-9ebb-e28cc2ad4519.jsonl  ts: 2026-05-03T22:43:01.158Z -->

# AI als medisch hulpmiddel: wanneer valt software onder MDR?

AI in de zorg is niet automatisch een medisch hulpmiddel. Een taalmodel, algoritme of dashboard wordt pas regulatoir interessant wanneer de software een **medisch beoogd doel** krijgt: bijvoorbeeld diagnose, monitoring, prognose, behandeling of klinische beslisondersteuning. De kernvraag is dus niet “zit er AI in?”, maar: **wat claimt de aanbieder dat de software doet, voor wie, en met welk klinisch gevolg?**

Dit artikel is een educatieve oriëntatie voor zorgprofessionals, onderzoekers, product owners en klinische beslissers in Nederland en België. Het is geen juridisch advies en vervangt geen beoordeling door regulatory, klinische en juridische experts.

## De sleutelterm: intended purpose

Onder de EU Medical Device Regulation (MDR) draait alles om de **intended purpose**: het beoogde gebruik zoals de fabrikant dat omschrijft in de gebruiksaanwijzing, labels, website, verkoopmateriaal, demo’s, contracten en klinische evaluatie.

Dat maakt de context doorslaggevend. Een algoritme dat beelden sorteert of comprimeert is meestal geen medisch hulpmiddel. Een algoritme dat op dezelfde beelden longnoduli detecteert, segmentaties maakt of maligniteitsrisico voorspelt, komt waarschijnlijk wél in beeld als medische software.

Voor productteams is dit een vroege ontwerpvraag: schrijf niet pas aan het einde een intended purpose. De intended purpose bepaalt of de software onder MDR of IVDR valt, welke risicoklasse waarschijnlijk is, welke klinische onderbouwing nodig is en hoe updates mogen worden beheerd.

## SaMD en Medical Device Software

Internationaal wordt vaak gesproken over **Software as a Medical Device** (SaMD): software die een medische functie uitvoert zonder onderdeel te hoeven zijn van specifieke hardware. In Europese guidance wordt meestal **Medical Device Software** (MDSW) gebruikt. Het gaat om software die, alleen of in combinatie, een doel vervult dat past binnen de definitie van medisch hulpmiddel of in-vitrodiagnostisch medisch hulpmiddel.

Of de software draait in de cloud, in een app, in een EPD-module, op een lokaal ziekenhuisnetwerk of embedded in een apparaat, is niet beslissend. De medische functie is beslissend.

## Klinische beslisondersteuning: vaak het kantelpunt

**Clinical decision support** is een glijdende schaal. Algemene richtlijninformatie, educatieve uitleg of een zoekfunctie in protocollen valt meestal buiten MDR, zolang de software geen patiëntspecifieke medische interpretatie of aanbeveling genereert.

Waarschijnlijk binnen MDR komt software die patiëntgegevens verwerkt om klinisch relevante output te leveren, zoals:

- een sepsis-alert op basis van vitale parameters en labwaarden;
- AI-detectie van afwijkingen op CT, MRI, mammografie of ECG;
- een score voor beroerterisico, heropnamerisico of therapierespons;
- patiëntspecifiek medicatie-, dosis- of behandeladvies;
- software die een medisch apparaat aanstuurt of beïnvloedt.

Als de software informatie geeft op basis van specimens uit het menselijk lichaam, zoals bloed, urine, weefsel of feces, kan de **IVDR** in plaats van de MDR relevant zijn.

## Rule 11: waarom veel medische software klasse IIa of hoger wordt

Voor veel medische software is **Rule 11** uit Annex VIII van de MDR bepalend. Kort gezegd: software die informatie levert die wordt gebruikt voor diagnostische of therapeutische beslissingen valt meestal in **klasse IIa**. Als een verkeerde beslissing kan leiden tot ernstige verslechtering of een chirurgische interventie, kan **klasse IIb** gelden. Als een verkeerde beslissing kan leiden tot overlijden of onomkeerbare verslechtering van de gezondheid, kan **klasse III** gelden.

Software die fysiologische processen monitort is doorgaans klasse IIa. Monitoring van vitale parameters waarbij variaties direct gevaar kunnen opleveren, kan klasse IIb zijn.

“Alle andere software” kan klasse I zijn, maar dat is geen standaarduitkomst. Eerst moet helder zijn of de software überhaupt MDSW is, daarna welke classificatieregel past bij de intended purpose en het risico.

## Wanneer valt AI waarschijnlijk buiten MDR?

AI kan buiten MDR vallen wanneer er geen medische intended purpose is. Denk aan:

- planning, administratie, facturatie, roostering en voorraadbeheer;
- communicatie- of videobelsoftware zonder medische interpretatie;
- opslag, archivering of overdracht van patiëntgegevens zonder analyse;
- EPD-functionaliteit die alleen registreert of toont;
- algemene educatie, training of literatuurondersteuning;
- wellness- of leefstijlapps zonder medische claim;
- vroege onderzoeksprototypes die niet klinisch worden ingezet.

Let op: een niet-medisch platform kan medische modules bevatten. Een EPD is niet automatisch MDR-software, maar een EPD-module die patiëntspecifiek medicatieadvies of alarmsignalen genereert kan dat wél zijn. Ook “alleen intern gebruik” is geen magische vrijstelling; bij structurele klinische inzet kunnen MDR-verplichtingen of in-house-device-regels relevant worden.

## CE-markering en klinische evaluatie

Als AI-software onder MDR valt, is CE-markering nodig voordat het hulpmiddel in de EU op de markt wordt gebracht of in gebruik wordt genomen. Voor klasse IIa, IIb en III is normaal gesproken een notified body betrokken. CE-markering vraagt meer dan een goed model: denk aan kwaliteitsmanagement, risicomanagement, software lifecycle, cybersecurity, usability, technische documentatie, klinische evaluatie en post-market surveillance.

De **clinical evaluation** moet aantonen dat de software veilig presteert en het beoogde klinische voordeel behaalt. Voor medische software worden vaak drie bewijsblokken onderscheiden:

1. **Valid clinical association**: is de output klinisch logisch en wetenschappelijk onderbouwd gekoppeld aan de aandoening of fysiologische staat?
2. **Technical performance**: genereert de software betrouwbaar en reproduceerbaar de bedoelde output?
3. **Clinical performance**: werkt de output in de bedoelde populatie, setting, workflow en gebruikersgroep?

Voor AI betekent dit extra aandacht voor datasetkwaliteit, bias, generaliseerbaarheid, lokale zorgpaden, menselijke interpretatie en prestaties na implementatie.

## Post-market surveillance en model updates

AI is na CE-markering niet “af”. De fabrikant moet via **post-market surveillance** actief gegevens verzamelen over veiligheid, prestaties, klachten, incidenten, gebruikersfeedback, real-world performance, literatuur en trends.

Model updates zijn regulatoir gevoelig. Een beveiligingspatch is iets anders dan retraining op nieuwe data, wijziging van drempelwaarden, uitbreiding naar een nieuwe indicatie of toepassing in een andere populatie. Elke update vraagt impactanalyse: verandert de intended purpose, prestatie, veiligheid, datainterpretatie of gebruikersinteractie? Dan kan aanvullende validatie, documentatie of notified-body betrokkenheid nodig zijn.

## Praktische checklist

Gebruik deze vragen als eerste triage, niet als formele classificatie:

- Welke medische claim staat in documentatie, demo, salesmateriaal of contract?
- Worden patiëntspecifieke gegevens verwerkt?
- Geeft de software een diagnose, voorspelling, risicoscore, alarm of behandeladvies?
- Wordt de output gebruikt voor klinische beslissingen?
- Wat is de mogelijke schade bij fout-positieve of fout-negatieve output?
- Gaat het om lichaamsmateriaal of labdiagnostiek, waardoor IVDR relevant kan zijn?
- Is het een zelfstandige tool, module, accessoire of onderdeel van hardware?
- Welke MDR Rule 11-klasse lijkt plausibel?
- Is er klinisch bewijs voor de beoogde populatie en setting?
- Hoe worden performance drift, updates, incidenten en real-world performance gemonitord?

## Visualisatiepakket

### Figuurideeën

1. **Beslisboom: valt deze AI onder MDR?**  
   Verticale flowchart: `software/AI` → `intended purpose` → `medisch doel?` → `patiëntspecifieke analyse?` → `diagnose/therapie/monitoring/prognose?` → `MDR`, `IVDR`, `buiten MDR` of `nader beoordelen`.

2. **Rule 11-risicoladder**  
   Horizontale ladder met klassen `I`, `IIa`, `IIb`, `III`. X-as: ernst van mogelijke schade door verkeerde output. Plaats voorbeelden op de ladder: administratie, algemene CDS, sepsis-alert, therapiebeslissing met levensbedreigend risico.

3. **Lifecycle-cirkel voor AI-medical-device software**  
   Cirkel: intended purpose → classificatie → klinische evaluatie → CE-markering → post-market surveillance → model-update-impactanalyse → terug naar evaluatie.

4. **Modulaire EPD-kaart**  
   Blokdiagram van een EPD-platform met administratieve modules, communicatie, viewer, AI-alarmmodule en AI-diagnosemodule. Gebruik kleurcodering: niet-MDSW, mogelijk MDSW, waarschijnlijk MDSW.

### Interactieve component

Een eenvoudige **React quiz/calculator** past goed: 8-10 vragen over medische claim, patiëntspecifieke data, klinische output, mogelijke schade, IVDR-signalen en apparaatbesturing. Output: `waarschijnlijk buiten MDR`, `mogelijk MDR/IVDR`, `waarschijnlijk MDSW`, plus disclaimer: educatief, geen juridisch advies. Een simpele SVG-beslisboom met klikbare stappen zou ook sterk werken.

### Afbeeldingen/video’s om op te zoeken of te gebruiken

- Europese Commissie infographic: zoekterm `European Commission Is your software a Medical Device infographic MDCG`.
- IMDRF SaMD Clinical Evaluation schema: zoekterm `IMDRF SaMD clinical evaluation valid clinical association analytical validation clinical validation`.
- CORE-MD visual over AI-MDSW-risico: zoekterm `CORE-MD clinical risk score AI medical device software figure`.
- BSI webinar over AI en medische hulpmiddelen: zoekterm `BSI Interplay of Medical Devices and AI webinar`.

## Referenties

### Wetenschappelijke bronnen

- **CORE-MD clinical risk score for regulatory evaluation of artificial intelligence-based medical device software — Rademakers et al., npj Digital Medicine, 2025.**  
  Gebruikt voor nuance over klinische evaluatie van AI-MDSW, valid clinical association, technical performance, clinical performance en lifecycle-risico.  
  DOI: https://doi.org/10.1038/s41746-025-01459-8

- **Regulating Artificial Intelligence and Machine Learning-Enabled Medical Devices in Europe and the United Kingdom — Li, Williams, Gilbert & Anderson, Law, Technology and Humans, 2023.**  
  Gebruikt voor achtergrond over regulatoire uitdagingen bij lerende AI/ML-medische hulpmiddelen en modelwijzigingen.  
  DOI: https://doi.org/10.5204/lthj.3073

### Richtlijnen, regelgeving en tools

- **Regulation (EU) 2017/745 on medical devices — European Parliament and Council, 2017.**  
  Gebruikt voor MDR-definities, intended purpose, Rule 11, CE-markering, clinical evaluation en post-market surveillance.  
  URL: https://eur-lex.europa.eu/eli/reg/2017/745/oj

- **MDCG 2019-11 Rev.1, Guidance on Qualification and Classification of Software in Regulation (EU) 2017/745 and Regulation (EU) 2017/746 — Medical Device Coordination Group, update 2025.**  
  Gebruikt voor MDSW-kwalificatie, softwaremodules, intended purpose, Rule 11-uitleg en voorbeelden van software binnen/buiten MDR.  
  URL: https://health.ec.europa.eu/latest-updates/update-mdcg-2019-11-rev1-qualification-and-classification-software-regulation-eu-2017745-and-2025-06-17_en

- **MDCG 2020-1, Guidance on Clinical Evaluation (MDR) / Performance Evaluation (IVDR) of Medical Device Software — Medical Device Coordination Group, 2020.**  
  Gebruikt voor clinical evaluation, clinical evidence, technical performance, clinical performance en post-market data bij MDSW.  
  URL: https://health.ec.europa.eu/system/files/2020-09/md_mdcg_2020_1_guidance_clinic_eva_md_software_en_0.pdf

- **Software as a Medical Device: Key Definitions — IMDRF/SaMD WG/N10FINAL, 2013.**  
  Gebruikt voor de definitie van SaMD.  
  URL: https://www.imdrf.org/documents/software-medical-device-samd-key-definitions

- **Software as a Medical Device: Clinical Evaluation — IMDRF/SaMD WG/N41FINAL, 2017.**  
  Gebruikt voor het driedelige evaluatiekader: valid clinical association, analytical/technical validation en clinical validation.  
  URL: https://www.imdrf.org/documents/software-medical-device-samd-clinical-evaluation

- **Regulation (EU) 2024/1689, Artificial Intelligence Act — European Parliament and Council, 2024.**  
  Gebruikt als context voor AI-systemen die ook onder productveiligheidswetgeving zoals MDR/IVDR kunnen vallen.  
  URL: https://eur-lex.europa.eu/eli/reg/2024/1689/oj

- **MDCG 2025-6 / AIB 2025-1, Interplay between MDR/IVDR and the Artificial Intelligence Act — MDCG/AIB, 2025.**  
  Gebruikt voor de nuance dat AI-medische hulpmiddelen naast MDR/IVDR ook AI Act-verplichtingen kunnen raken.  
  URL: https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en

### Visual/video-bronnen

- **Infographic: Is your software a Medical Device? — European Commission, 2021.**  
  Voorgesteld als basis/inspiratie voor de MDR-beslisboom.  
  URL: https://health.ec.europa.eu/publications/infographic-your-software-medical-device_en

- **Software as a Medical Device: Clinical Evaluation — IMDRF, 2017.**  
  Voorgesteld als bron voor een eigen Nederlandstalige visual van de drie bewijsblokken.  
  URL: https://www.imdrf.org/documents/software-medical-device-samd-clinical-evaluation

- **CORE-MD clinical risk score figure — Rademakers et al., npj Digital Medicine, 2025.**  
  Voorgesteld als inspiratie voor een risicovisual rond AI-MDSW en klinische evaluatie.  
  DOI: https://doi.org/10.1038/s41746-025-01459-8

- **Interplay of Medical Devices and AI — BSI webinar, jaar niet vermeld op geraadpleegde pagina.**  
  Voorgesteld als educatieve video-/presentatiebron over MDR, AI Act en notified-body-perspectief.  
  URL: https://www.bsigroup.com/en-US/insights-and-media/media/webinars/interplay-of-medical-devices-and-ai/

---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-117d-7472-bf6e-2897a7ccd005.jsonl  ts: 2026-05-03T22:40:16.963Z -->

# FDA, CE en MDR: wat betekenen ze voor AI-modellen in de zorg?

AI-leveranciers schermen vaak met termen als “FDA-cleared”, “CE-marked” of “MDR-compliant”. Dat klinkt geruststellend, maar voor een ziekenhuis, onderzoeksgroep of klinisch beslisser is de echte vraag scherper: waarvoor is dit AI-systeem beoordeeld, op welke versie, met welke klinische claim, en wat gebeurt er als het model verandert? Dit artikel geeft een praktische uitleg. Het is bedoeld als educatief overzicht, niet als juridisch advies.

## Het startpunt: is het AI-model een medisch hulpmiddel?

Een AI-model is niet automatisch een medisch hulpmiddel. De regulatoire status hangt vooral af van de “intended purpose”: het beoogde gebruik zoals de fabrikant dat claimt in documentatie, marketing, handleiding en klinische evaluatie.

Een model dat CT-beelden analyseert om longembolie te signaleren, een sepsisrisico voorspelt of therapiekeuzes ondersteunt, zal vaak binnen medische hulpmiddelenwetgeving vallen. Een model dat alleen administratieve notities samenvat of populatieniveau-onderzoek ondersteunt, kan daarbuiten vallen. De grens zit niet in het woord “AI”, maar in de medische claim en het gebruik bij individuele patiënten.

Belangrijk is ook het begrip SaMD: Software as a Medical Device. Volgens de internationale IMDRF-definitie gaat het om software die een medisch doel vervult zonder onderdeel te zijn van een hardware-medisch hulpmiddel. Veel klinische AI valt hieronder, maar AI kan ook onderdeel zijn van een scanner, monitor, labinstrument of combinatieproduct. De FDA spreekt vaak over AI-enabled medical devices: medische hulpmiddelen waarin AI of machine learning een functie vervult.

## EU: CE-markering onder MDR of IVDR

In Europa is CE-markering het toegangsbewijs tot de markt. Voor medische hulpmiddelen gebeurt dit meestal onder de Medical Devices Regulation, MDR 2017/745. Voor diagnostiek op basis van lichaamsmateriaal, zoals lab- of genetische tests, kan de IVDR 2017/746 gelden.

CE is geen “EU-FDA approval”. De fabrikant blijft primair verantwoordelijk voor conformiteit. Afhankelijk van de risicoklasse beoordeelt een notified body, een onafhankelijke aangewezen instantie, het kwaliteitsmanagementsysteem en technische documentatie. Bij veel klinische AI-software is zo’n notified body nodig.

Voor software is MDR Rule 11 belangrijk. Software die informatie levert voor diagnostische of therapeutische beslissingen valt vaak minimaal in klasse IIa. Als een fout besluit kan leiden tot ernstige verslechtering, chirurgische interventie, overlijden of onomkeerbare gezondheidsschade, kan de klasse IIb of III worden. Dat heeft direct gevolgen voor de zwaarte van bewijs, toezicht en documentatie.

Een CE-markering betekent dus: dit product, voor deze beoogde toepassing, in deze configuratie, voldoet volgens de gekozen route aan de toepasselijke EU-eisen. Het betekent niet automatisch dat het model in elke patiëntpopulatie, elk ziekenhuisinformatiesysteem of elke workflow even goed presteert.

## VS: FDA premarket review

In de Verenigde Staten beoordeelt de FDA medische hulpmiddelen via bestaande device-routes. Bij AI-enabled devices gaat het meestal om 510(k) clearance, De Novo authorization of PMA approval. Welke route geldt, hangt af van risico, nieuwheid en vergelijkbaarheid met bestaande hulpmiddelen.

De FDA kijkt bij premarket review onder meer naar beoogd gebruik, technische validatie, klinische prestatie, softwaredocumentatie, cybersecurity, human factors en risicoanalyse. “FDA-cleared” betekent meestal dat het product via 510(k) substantieel equivalent is bevonden aan een predicate device. “FDA-approved” hoort vooral bij PMA voor hoog-risico hulpmiddelen. “FDA-registered” is veel zwakker: registratie van een bedrijf of productlisting is geen inhoudelijke goedkeuring van klinische prestaties.

Een nuttig voordeel in de VS is de publieke FDA-database. Voor veel AI-enabled devices zijn samenvattingen beschikbaar waarin indicatie, productcode, beslisdatum en soms validatie-informatie staan. Toch blijft opletten nodig: de publieke samenvatting bevat niet alle ingediende data.

## Praktisch verschil tussen EU en FDA

Kort gezegd: de FDA is een centrale toezichthouder die marketing authorization verleent voor de Amerikaanse markt. De EU werkt via CE-markering, fabrikantverantwoordelijkheid en notified bodies binnen MDR/IVDR.

Bij de FDA vraagt u: welke submission, welke pathway, welke cleared/authorized/approved indication, en welke modelversie? Bij CE/MDR vraagt u: welke risicoklasse, welke notified body, welk certificaat, welke intended purpose, en vallen alle modules onder de CE-scope?

Ook taal doet ertoe. Een leverancier kan zeggen dat “het platform CE heeft”, terwijl de voorspellende AI-module nog niet als medisch hulpmiddel is beoordeeld. Of een Amerikaans product kan “FDA-cleared” zijn voor triage van radiologische beelden, maar niet voor autonome diagnose of gebruik bij kinderen.

## Lifecycle, post-market monitoring en drift

AI is geen statisch implantaat. Data, populaties, scanners, labmethoden, EPD-velden en klinische workflows veranderen. Daardoor kunnen prestaties verschuiven: data drift, calibration drift, veranderende foutpatronen of bias in subgroepen.

Daarom vragen moderne kaders om lifecycle management. In de EU horen post-market surveillance, vigilance, klinische follow-up en periodieke veiligheidsrapportage bij de MDR/IVDR-systematiek. In de VS verwacht de FDA eveneens kwaliteitsmanagement, correctieve acties, incidentrapportage en monitoring passend bij het risico. De IMDRF Good Machine Learning Practice-principes benadrukken dat AI/ML-hulpmiddelen over de totale levenscyclus beheerst moeten worden.

Voor klinische gebruikers is dit cruciaal: een mooie AUC in een retrospectieve publicatie is niet genoeg. U wilt weten hoe het model lokaal blijft presteren, wie afwijkingen detecteert, wanneer alarmdrempels worden aangepast en hoe gebruikers worden geïnformeerd.

## Modelwijzigingen: locked, adaptive en vooraf geplande updates

Veel goedgekeurde of gecertificeerde AI-modellen zijn “locked”: dezelfde input geeft bij dezelfde versie dezelfde output. Updates gebeuren via gecontroleerde software-releases.

Adaptieve of lerende modellen zijn ingewikkelder. Als een model na marktintroductie verandert, kan dat invloed hebben op veiligheid, prestaties of beoogd gebruik. Dan kan een nieuwe FDA-submission of notified-body beoordeling nodig zijn.

De FDA heeft hiervoor een belangrijk instrument: de Predetermined Change Control Plan, PCCP. Daarmee kan een fabrikant vooraf beschrijven welke AI-wijzigingen gepland zijn, hoe die worden ontwikkeld en gevalideerd, en wat de impact is. Als de FDA dat plan beoordeelt binnen de marketing submission, kunnen bepaalde updates later worden doorgevoerd zonder telkens een volledige nieuwe submission, zolang ze binnen het goedgekeurde plan blijven.

In Europa bestaat ook change control, maar de route loopt via MDR/IVDR, notified body, technische documentatie en beoordeling van significante wijzigingen. Met de EU AI Act komt daar voor bepaalde medische AI extra aandacht bij voor data governance, transparantie, menselijk toezicht, post-market monitoring en substantiële wijzigingen.

## Vragen die u aan leveranciers moet stellen

1. Wat is de exacte intended purpose en voor welke patiëntgroep, setting en workflow geldt die?
2. Is het product SaMD, onderdeel van een medisch hulpmiddel, of alleen research/decision support zonder medische claim?
3. Welke FDA-route of welke MDR/IVDR-klasse geldt, en kunt u het certificaat of FDA-besluitnummer tonen?
4. Welke modelversie is beoordeeld, en hoe worden updates, retraining en release notes beheerd?
5. Welke externe validatie is gedaan op relevante populaties, apparatuur, talen, etniciteit, leeftijdsgroepen en comorbiditeit?
6. Hoe monitort u post-market performance, drift, incidenten, bias en fout-negatieven/fout-positieven?
7. Heeft u een FDA PCCP of EU change-controlbeleid voor modelwijzigingen?
8. Wat moet de zorgprofessional met de output doen: informeren, bevestigen, triëren, diagnosticeren of behandelen?

## Conclusie

FDA, CE en MDR zijn geen kwaliteitsstempels in algemene zin. Ze zijn contextspecifieke signalen: dit hulpmiddel, met deze claim, in deze versie, via deze route, is beoordeeld tegen bepaalde eisen. Voor AI-modellen is juist die specificiteit alles. Vraag dus niet alleen “is het goedgekeurd?”, maar vooral: waarvoor, op basis van welk bewijs, onder welk toezicht, en wat gebeurt er als het model leert of verandert?

## Bronnen

- FDA: AI-enabled medical devices list: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices  
- FDA: PCCP guidance for AI-enabled device software functions: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence  
- European Commission: MDR/IVDR overview: https://health.ec.europa.eu/medical-devices-new-regulations/overview_en  
- MDCG 2019-11 rev.1 software qualification/classification: https://health.ec.europa.eu/latest-updates/update-mdcg-2019-11-rev1-qualification-and-classification-software-regulation-eu-2017745-and-2025-06-17_en  
- MDCG 2025-6 on MDR/IVDR and AI Act interplay: https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en  
- IMDRF SaMD key definitions: https://www.imdrf.org/documents/software-medical-device-samd-key-definitions

---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-117d-7472-bf6e-2897a7ccd005.jsonl  ts: 2026-05-03T22:43:30.550Z -->

# Niet alleen “FDA-approved”: wat FDA, CE en MDR echt betekenen voor AI-modellen in de zorg

AI-leveranciers gebruiken graag stevige woorden: “FDA-cleared”, “CE-marked”, “MDR-compliant”, “klinisch gevalideerd”. Voor zorgprofessionals en klinische beslissers is de nuttige vraag niet: “Heeft het model een keurmerk?” maar: “Voor welke claim, patiëntgroep, workflow, modelversie en wijzigingsroute is dit beoordeeld?” Regulatoire status is geen algemene kwaliteitsstempel. Het is een contextspecifiek bewijsstuk.

Dit artikel geeft een praktisch overzicht. Het is educatief bedoeld en geen juridisch advies.

## Eerst: is het AI-model een medisch hulpmiddel?

AI is niet automatisch een medisch hulpmiddel. De kernvraag is de **intended purpose**: het beoogde gebruik zoals de fabrikant dat vastlegt in handleiding, label, technische documentatie, klinische evaluatie en marketingmateriaal.

Een model dat CT-beelden analyseert om longembolie te signaleren, sepsisrisico voorspelt, dosering ondersteunt of een diagnostische waarschijnlijkheid berekent, zal vaak binnen medische hulpmiddelenwetgeving vallen. Een model dat alleen afspraken plant, administratieve notities samenvat of populatiedata voor onderzoek aggregeert, valt daar mogelijk buiten. De grens zit dus niet in “machine learning”, maar in de medische claim en het gebruik bij individuele patiënten.

Hier komen twee termen vaak terug. **SaMD**, Software as a Medical Device, is de internationale term voor software die zelfstandig een medisch doel vervult zonder onderdeel te zijn van hardware. In Europa wordt vaak gesproken over **MDSW**, Medical Device Software. In de praktijk: een AI-model kan zelfstandig SaMD/MDSW zijn, óf onderdeel zijn van een breder medisch hulpmiddel, zoals een scanner, monitor, labinstrument of softwareplatform.

## EU: CE-markering onder MDR of IVDR

In Europa is **CE-markering** het toegangsbewijs tot de markt. Voor de meeste klinische AI gaat het om de Medical Devices Regulation, **MDR 2017/745**. Voor software die informatie levert op basis van in-vitro diagnostiek, bijvoorbeeld lab- of genetische data, kan de **IVDR 2017/746** gelden.

CE-markering betekent: de fabrikant verklaart dat het product voldoet aan de toepasselijke EU-eisen. Bij hogere risicoklassen beoordeelt een **notified body** de technische documentatie, het kwaliteitsmanagementsysteem en de conformiteitsroute. Veel klinische AI-software komt door MDR Rule 11 niet in de laagste klasse terecht. Software die informatie levert voor diagnostische of therapeutische beslissingen is vaak minimaal klasse IIa; als een fout kan leiden tot ernstige verslechtering, chirurgische interventie, overlijden of onomkeerbare schade, kan klasse IIb of III aan de orde zijn.

Een CE-markering geldt altijd voor een specifieke scope: product, versie, intended purpose, risicoklasse en gebruiksomgeving. “Ons platform heeft CE” is dus onvoldoende als de relevante AI-module, nieuwe claim of modelupdate niet onder die scope valt.

## VS: FDA premarket review

De FDA werkt anders. In de Verenigde Staten krijgen medische hulpmiddelen toegang tot de markt via routes zoals **510(k) clearance**, **De Novo authorization** of **PMA approval**. Welke route geldt, hangt af van risico, nieuwheid en vergelijkbaarheid met bestaande hulpmiddelen.

Een **510(k)** betekent niet dat de FDA het product “goedkeurt” in de alledaagse betekenis. Het betekent dat het hulpmiddel substantieel equivalent is bevonden aan een legaal verhandeld vergelijkbaar hulpmiddel. **De Novo** is bedoeld voor nieuwe hulpmiddelen met laag tot matig risico zonder geschikte predicate. **PMA** is de zwaarste route voor klasse III-hulpmiddelen en vraagt doorgaans het meest robuuste bewijs.

Let ook op zwakkere termen. **FDA-registered** of “listed with FDA” zegt weinig over inhoudelijke beoordeling van veiligheid en effectiviteit. Vraag altijd naar het submissionnummer, de exacte indication for use en de publieke FDA-beslissamenvatting.

## EU versus FDA in één praktische vergelijking

De EU-route draait om CE-markering, fabrikantverantwoordelijkheid, risicoklasse, conformiteitsbeoordeling en notified bodies. De FDA-route draait om centrale premarket review via een passende submissionroute.

In de EU vraagt u: welke MDR/IVDR-classificatie, welke notified body, welk certificaat, welke intended purpose, welke modules en welke versie vallen onder CE?

In de VS vraagt u: is het 510(k), De Novo of PMA, wat is de cleared/authorized/approved indication, welke predicate is gebruikt, en welke modelversie is beoordeeld?

In beide systemen blijft één punt hetzelfde: regulatoire status is geen garantie dat het model lokaal even goed werkt in uw populatie, scannerpark, EPD-inrichting of klinische workflow.

## Premarket review is niet het einde

AI-modellen kunnen degraderen na introductie. Patiëntpopulaties veranderen, scanners en labmethoden veranderen, EPD-velden worden anders ingevuld en behandelprotocollen verschuiven. Daardoor kunnen **data drift**, kalibratieproblemen, bias in subgroepen of veranderde foutpatronen ontstaan.

Daarom is **lifecycle management** essentieel. Onder MDR/IVDR horen post-market surveillance, vigilance, incidentanalyse en waar nodig klinische follow-up bij het systeem. De FDA verwacht eveneens kwaliteitsmanagement, risicobeheersing, wijzigingscontrole en post-market monitoring passend bij het risico. Voor zorginstellingen is de praktische vraag: hoe ziet de leverancier dat het model slechter gaat presteren voordat patiënten er last van krijgen?

Vraag daarom niet alleen naar AUC, sensitiviteit en specificiteit uit één studie. Vraag naar lokale validatie, subgroepanalyses, fout-negatieven, fout-positieven, alarmmoeheid, driftmonitoring en procedures voor correctieve acties.

## Modelwijzigingen: update of nieuw hulpmiddel?

AI maakt wijzigingsbeheer extra belangrijk. Een bugfix, security patch of kleine interfacewijziging is iets anders dan een nieuw algoritme, een gewijzigde drempelwaarde, retraining op nieuwe data of uitbreiding naar een nieuwe patiëntgroep.

Bij de FDA is hiervoor het concept **Predetermined Change Control Plan**, PCCP, belangrijk. Een fabrikant kan vooraf beschrijven welke AI-wijzigingen gepland zijn, hoe die worden ontwikkeld, gevalideerd en geïmplementeerd, en hoe de impact wordt beoordeeld. Als zo’n plan binnen de marketing submission is beoordeeld, kunnen bepaalde wijzigingen later binnen die afgesproken grenzen plaatsvinden zonder telkens een volledig nieuwe submission.

In Europa moeten wijzigingen worden beoordeeld binnen MDR/IVDR, technische documentatie, kwaliteitsmanagement en de rol van de notified body. Significante wijzigingen kunnen herbeoordeling vereisen. Met de EU AI Act komen voor bepaalde medische AI-systemen aanvullende eisen rond data governance, transparantie, menselijk toezicht en post-market monitoring in beeld. Dat vervangt MDR/IVDR niet; het komt er voor relevante systemen naast te staan.

## Praktische vragen aan leveranciers

1. Wat is de exacte intended purpose, inclusief patiëntgroep, setting, gebruiker en klinische workflow?
2. Is dit SaMD/MDSW, onderdeel van een hulpmiddel, accessoire, of alleen niet-medische software?
3. Welke CE/MDR/IVDR-classificatie of FDA-route geldt precies?
4. Welke certificaten, submissionnummers en publieke beslissamenvattingen kunt u tonen?
5. Welke modelversie is beoordeeld en hoe herken ik die versie in het product?
6. Welke externe en lokale validatie is beschikbaar voor onze populatie en infrastructuur?
7. Hoe monitort u drift, bias, incidenten en performance per subgroep?
8. Welke wijzigingen vallen binnen bestaande goedkeuring/certificering en welke vereisen herbeoordeling?
9. Wat moet de clinicus met de output doen: informeren, controleren, triëren, diagnosticeren of behandelen?
10. Wat gebeurt er bij een veiligheidsprobleem: melding, rollback, waarschuwing, CAPA of nieuwe release?

## Conclusie

“FDA”, “CE” en “MDR” zijn belangrijke signalen, maar ze zijn alleen betekenisvol als u de scope kent. Een AI-model is beoordeeld voor een specifieke claim, versie, doelgroep en gebruiksomgeving. De slimste vraag aan een leverancier is daarom niet: “Is het goedgekeurd?” maar: “Wat is precies beoordeeld, met welk bewijs, voor welke klinische beslissing, en hoe blijft dat bewijs geldig nadat het model verandert?”

## Visualisatiepakket

**Figuurideeën**

1. **Beslisboom: “Wanneer wordt AI een medisch hulpmiddel?”**  
   Layout: yes/no-flow van `AI-model` naar `medische claim?`, `individuele patiënt?`, `diagnose/therapie/monitoring/prognose?`, `zelfstandige software of onderdeel van hulpmiddel?`. Eindpunten: “waarschijnlijk buiten scope”, “mogelijk SaMD/MDSW”, “regulatoire documentatie opvragen”. Geschikt als eenvoudige SVG of React-flowchart.

2. **Routekaart EU versus VS**  
   Twee kolommen. EU: `intended purpose` -> `MDR/IVDR classificatie` -> `notified body waar nodig` -> `CE-markering` -> `post-market surveillance`. VS: `intended use` -> `device class/pathway` -> `510(k), De Novo of PMA` -> `FDA clearance/authorization/approval` -> `post-market controls`.

3. **Lifecycle-loop voor AI-modellen**  
   Cirkel: `ontwikkeling` -> `validatie` -> `premarket/CE` -> `implementatie` -> `monitoring van drift/bias/incidenten` -> `gecontroleerde update` -> terug naar `validatie`. Markeer apart: “FDA PCCP” en “EU significante wijziging/notified body”.

4. **Risicomatrix voor klinische impact**  
   X-as: rol van output, van “informeert” tot “stuurt diagnose/therapie”. Y-as: schade bij fout, van laag tot ernstig/onherstelbaar. Plaats voorbeelden zoals administratieve samenvatting, triage-alert, therapiedosering en autonome detectie. Duidelijk label: illustratief, geen formele classificatie.

**Interactieve component**

Een **claim-checker quiz/calculator** past goed. De gebruiker beantwoordt 6-8 vragen over medische claim, individuele patiënt, diagnostische/therapeutische impact, autonomie, modelupdates en beschikbaar bewijs. Output: geen juridisch oordeel, maar een checklist met vervolgvragen aan de leverancier. Geschikt als React-component met radio buttons, risicosignaal en exporteerbare vragenlijst.

**Afbeeldingen of video’s om op te zoeken/gebruiken**

- Zoekterm: `European Commission Is your software a Medical Device infographic`  
  Gebruik als inspiratie voor de beslisboom, bij voorkeur via de officiële Europese Commissie-pagina.

- Zoekterm: `FDA AI-enabled medical devices list radiology cardiology`  
  Maak zelf een staafdiagram of tegeloverzicht op basis van de FDA-lijst, bijvoorbeeld per specialisme of type submission.

- Zoekterm: `FDA CDRH Learn Predetermined Change Control Plan AI-enabled device software functions`  
  Geschikt voor educatieve video/slides over PCCP en wijzigingsbeheer.

- Zoekterm: `IMDRF SaMD risk categorization framework diagram`  
  Gebruik als basis voor een eigen risicomatrix, met expliciete vermelding dat IMDRF-categorieën niet één-op-één hetzelfde zijn als MDR-klassen of FDA-routes.

## Referenties

**Wetenschappelijke bronnen**

1. **Kelly CJ, Karthikesalingam A, Suleyman M, Corrado G, King D. “Key challenges for delivering clinical impact with artificial intelligence.” BMC Medicine, 2019.**  
   Gebruikt voor nuance over klinische implementatie, externe validatie, dataset shift, bias, generaliseerbaarheid en post-market surveillance.  
   DOI/URL: https://doi.org/10.1186/s12916-019-1426-2

2. **Vasey B, Nagendran M, Campbell B, et al. “Reporting guideline for the early-stage clinical evaluation of decision support systems driven by artificial intelligence: DECIDE-AI.” Nature Medicine, 2022.**  
   Gebruikt voor het belang van vroege klinische evaluatie, human factors en workflowcontext bij AI-beslisondersteuning.  
   DOI/URL: https://doi.org/10.1038/s41591-022-01772-9

3. **Liu X, Cruz Rivera S, Moher D, Calvert MJ, Denniston AK, SPIRIT-AI and CONSORT-AI Working Group. “Reporting guidelines for clinical trial reports for interventions involving artificial intelligence: the CONSORT-AI extension.” Nature Medicine, 2020.**  
   Gebruikt als achtergrond voor transparante rapportage van klinische studies met AI-interventies.  
   DOI/URL: https://doi.org/10.1038/s41591-020-1034-x

**Richtlijnen, wetgeving en tools**

4. **International Medical Device Regulators Forum, “Software as a Medical Device (SaMD): Key Definitions”, 2013.**  
   Gebruikt voor de definitie van SaMD.  
   URL: https://www.imdrf.org/documents/software-medical-device-samd-key-definitions

5. **International Medical Device Regulators Forum, “Good Machine Learning Practice for Medical Device Development: Guiding Principles”, 2025.**  
   Gebruikt voor lifecycle-denken, monitoring en veilige ontwikkeling van AI/ML-medische hulpmiddelen.  
   URL: https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles

6. **U.S. Food and Drug Administration, “Artificial Intelligence-Enabled Medical Devices”, doorlopend bijgewerkt.**  
   Gebruikt voor uitleg over FDA-geautoriseerde AI-enabled devices en publieke FDA-lijsten.  
   URL: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices

7. **U.S. Food and Drug Administration, “Artificial Intelligence in Software as a Medical Device”, doorlopend bijgewerkt.**  
   Gebruikt voor FDA-context rond AI/ML, SaMD, premarket pathways en lifecycle-management.  
   URL: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device

8. **U.S. Food and Drug Administration, “Marketing Submission Recommendations for a Predetermined Change Control Plan for Artificial Intelligence-Enabled Device Software Functions”, final guidance, 2025.**  
   Gebruikt voor uitleg over PCCP en modelwijzigingen binnen FDA-submissions.  
   URL: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence

9. **U.S. Food and Drug Administration, “Premarket Submissions: Selecting and Preparing the Correct Submission”, doorlopend bijgewerkt.**  
   Gebruikt voor 510(k), De Novo en PMA als FDA-routes.  
   URL: https://www.fda.gov/medical-devices/how-study-and-market-your-device/premarket-submissions-selecting-and-preparing-correct-submission

10. **European Parliament and Council, Regulation (EU) 2017/745 on medical devices, 2017.**  
   Gebruikt voor MDR, CE-markering, classificatie, technische documentatie, post-market surveillance en softwarewijzigingen.  
   URL: https://eur-lex.europa.eu/eli/reg/2017/745/oj

11. **European Parliament and Council, Regulation (EU) 2017/746 on in vitro diagnostic medical devices, 2017.**  
   Gebruikt voor IVDR-context bij AI/software gebaseerd op in-vitro diagnostische gegevens.  
   URL: https://eur-lex.europa.eu/eli/reg/2017/746/oj

12. **European Commission, “Notified bodies for medical devices”, doorlopend bijgewerkt.**  
   Gebruikt voor de rol van notified bodies in conformiteitsbeoordeling.  
   URL: https://health.ec.europa.eu/medical-devices-topics-interest/notified-bodies-medical-devices_en

13. **Medical Device Coordination Group, “MDCG 2019-11 rev.1: Qualification and classification of software - Regulation (EU) 2017/745 and Regulation (EU) 2017/746”, 2025.**  
   Gebruikt voor MDSW, intended purpose, kwalificatie/classificatie en MDR Rule 11.  
   URL: https://health.ec.europa.eu/latest-updates/update-mdcg-2019-11-rev1-qualification-and-classification-software-regulation-eu-2017745-and-2025-06-17_en

14. **Medical Device Coordination Group / Artificial Intelligence Board, “MDCG 2025-6: FAQ on Interplay between the MDR, IVDR and the Artificial Intelligence Act”, 2025.**  
   Gebruikt voor nuance over medische AI, AI Act, aanvullende eisen en samenloop met MDR/IVDR.  
   URL: https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en

15. **Medical Device Coordination Group, “MDCG 2025-10: Guidance on post-market surveillance of medical devices and in vitro diagnostic medical devices”, 2025.**  
   Gebruikt voor post-market surveillance en lifecycle-monitoring onder EU-kaders.  
   URL: https://health.ec.europa.eu/latest-updates/mdcg-2025-10-guidance-post-market-surveillance-medical-devices-and-vitro-diagnostic-medical-devices-2025-12-19_en

16. **U.S. Food and Drug Administration, “Digital Health Policy Navigator”, doorlopend bijgewerkt.**  
   Gebruikt als referentie voor het interactieve claim-checker concept en voor vragen rond softwarefuncties en FDA-toezicht.  
   URL: https://www.fda.gov/medical-devices/digital-health-center-excellence/digital-health-policy-navigator

**Visual/video-bronnen**

17. **European Commission, “Infographic - Is your software a Medical Device?”, 2021.**  
   Gebruikt als visuele referentie voor de voorgestelde beslisboom over MDSW-kwalificatie.  
   URL: https://health.ec.europa.eu/publications/infographic-your-software-medical-device_en

18. **U.S. Food and Drug Administration, “CDRH Learn”, doorlopend bijgewerkt.**  
   Gebruikt als betrouwbare bron voor educatieve video’s, slides en transcripts over medische hulpmiddelen, digital health en PCCP.  
   URL: https://www.fda.gov/training-and-continuing-education/cdrh-learn

19. **International Medical Device Regulators Forum, “Software as a Medical Device: Possible Framework for Risk Categorization and Corresponding Considerations”, 2014.**  
   Gebruikt als visuele inspiratie voor de risicomatrix en SaMD-risicodenken.  
   URL: https://www.imdrf.org/documents/software-medical-device-possible-framework-risk-categorization-and-corresponding-considerations

---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-117d-7472-bf6e-2897a7ccd005.jsonl  ts: 2026-05-03T22:45:05.668Z -->

# FDA, CE en MDR: wat betekenen ze voor AI-modellen?

AI-leveranciers gebruiken graag stevige woorden: “FDA-cleared”, “CE-marked”, “MDR-compliant”, “klinisch gevalideerd”. Voor zorgprofessionals, onderzoekers en klinische beslissers is de nuttige vraag niet alleen óf zo’n claim klopt, maar vooral: voor welke toepassing, welke patiëntgroep, welke workflow, welke modelversie en welke wijzigingsroute is het AI-systeem beoordeeld?

Regulatoire status is geen algemene kwaliteitsstempel. Het is een contextspecifiek bewijsstuk. Dit artikel geeft een praktisch overzicht. Het is educatief bedoeld en geen juridisch advies.

## Eerst: wanneer is AI een medisch hulpmiddel?

Een AI-model is niet automatisch een medisch hulpmiddel. De kernvraag is de **intended purpose**: het beoogde gebruik zoals de fabrikant dat vastlegt in handleiding, label, technische documentatie, klinische evaluatie en marketingmateriaal.

Een model dat CT-beelden analyseert om longembolie te signaleren, sepsisrisico voorspelt, een therapeutische dosering ondersteunt of een diagnostische waarschijnlijkheid berekent, zal vaak binnen medische hulpmiddelenwetgeving vallen. Een model dat alleen afspraken plant, administratieve notities samenvat of populatiedata voor onderzoek aggregeert, valt daar mogelijk buiten. De grens zit dus niet in “AI” of “machine learning”, maar in de medische claim en het gebruik bij individuele patiënten.

Hier komen twee termen vaak terug. **SaMD**, Software as a Medical Device, is de internationale term voor software die zelfstandig een medisch doel vervult zonder onderdeel te zijn van hardware. In Europa wordt vaak gesproken over **MDSW**, Medical Device Software. Een AI-model kan zelfstandig SaMD/MDSW zijn, óf onderdeel zijn van een breder medisch hulpmiddel, zoals een scanner, monitor, labinstrument of softwareplatform.

## EU: CE-markering onder MDR of IVDR

In Europa is **CE-markering** het toegangsbewijs tot de markt. Voor de meeste klinische AI gaat het om de Medical Devices Regulation, **MDR 2017/745**. Voor software die informatie levert op basis van in-vitro diagnostiek, bijvoorbeeld lab- of genetische data, kan de **IVDR 2017/746** gelden.

CE-markering betekent: de fabrikant verklaart dat het product voldoet aan de toepasselijke EU-eisen. Bij hogere risicoklassen beoordeelt een **notified body**, een onafhankelijke aangewezen instantie, de technische documentatie, het kwaliteitsmanagementsysteem en de conformiteitsroute. Veel klinische AI-software komt door MDR Rule 11 niet in de laagste klasse terecht. Software die informatie levert voor diagnostische of therapeutische beslissingen is vaak minimaal klasse IIa. Als een fout kan leiden tot ernstige verslechtering, chirurgische interventie, overlijden of onomkeerbare schade, kan klasse IIb of III aan de orde zijn.

Een CE-markering geldt altijd voor een specifieke scope: product, versie, intended purpose, risicoklasse en gebruiksomgeving. “Ons platform heeft CE” is dus onvoldoende als de relevante AI-module, nieuwe claim of modelupdate niet onder die scope valt.

## VS: FDA premarket review

De FDA werkt anders. In de Verenigde Staten krijgen medische hulpmiddelen toegang tot de markt via routes zoals **510(k) clearance**, **De Novo authorization** of **PMA approval**. Welke route geldt, hangt af van risico, nieuwheid en vergelijkbaarheid met bestaande hulpmiddelen.

Een **510(k)** betekent niet dat de FDA het product “goedkeurt” in de alledaagse betekenis. Het betekent dat het hulpmiddel substantieel equivalent is bevonden aan een legaal verhandeld vergelijkbaar hulpmiddel. **De Novo** is bedoeld voor nieuwe hulpmiddelen met laag tot matig risico zonder geschikte predicate. **PMA** is de zwaarste route voor klasse III-hulpmiddelen en vraagt doorgaans het meest robuuste bewijs.

Let ook op zwakkere termen. **FDA-registered** of “listed with FDA” zegt weinig over inhoudelijke beoordeling van veiligheid en effectiviteit. Vraag altijd naar het submissionnummer, de exacte indication for use en de publieke FDA-beslissamenvatting.

## EU versus FDA: praktisch bekeken

De EU-route draait om CE-markering, fabrikantverantwoordelijkheid, risicoklasse, conformiteitsbeoordeling en notified bodies. De FDA-route draait om centrale premarket review via een passende submissionroute.

In de EU vraagt u: welke MDR/IVDR-classificatie, welke notified body, welk certificaat, welke intended purpose, welke modules en welke versie vallen onder CE?

In de VS vraagt u: is het 510(k), De Novo of PMA, wat is de cleared/authorized/approved indication, welke predicate is gebruikt, en welke modelversie is beoordeeld?

In beide systemen blijft één punt hetzelfde: regulatoire status garandeert niet dat het model lokaal even goed werkt in uw populatie, scannerpark, EPD-inrichting of klinische workflow.

## Premarket review is niet het einde

AI-modellen kunnen na introductie degraderen. Patiëntpopulaties veranderen, scanners en labmethoden veranderen, EPD-velden worden anders ingevuld en behandelprotocollen verschuiven. Daardoor kunnen **data drift**, kalibratieproblemen, bias in subgroepen of veranderde foutpatronen ontstaan.

Daarom is **lifecycle management** essentieel. Onder MDR/IVDR horen post-market surveillance, vigilance, incidentanalyse en waar nodig klinische follow-up bij het systeem. De FDA verwacht eveneens kwaliteitsmanagement, risicobeheersing, wijzigingscontrole en post-market monitoring passend bij het risico. Voor zorginstellingen is de praktische vraag: hoe ziet de leverancier dat het model slechter gaat presteren voordat patiënten er last van krijgen?

Vraag daarom niet alleen naar AUC, sensitiviteit en specificiteit uit één studie. Vraag naar lokale validatie, subgroepanalyses, fout-negatieven, fout-positieven, alarmmoeheid, driftmonitoring en procedures voor correctieve acties.

## Modelwijzigingen: update of nieuw hulpmiddel?

AI maakt wijzigingsbeheer extra belangrijk. Een bugfix, security patch of kleine interfacewijziging is iets anders dan een nieuw algoritme, een gewijzigde drempelwaarde, retraining op nieuwe data of uitbreiding naar een nieuwe patiëntgroep.

Bij de FDA is hiervoor het concept **Predetermined Change Control Plan**, PCCP, belangrijk. Een fabrikant kan vooraf beschrijven welke AI-wijzigingen gepland zijn, hoe die worden ontwikkeld, gevalideerd en geïmplementeerd, en hoe de impact wordt beoordeeld. Als zo’n plan binnen de marketing submission is beoordeeld, kunnen bepaalde wijzigingen later binnen die afgesproken grenzen plaatsvinden zonder telkens een volledig nieuwe submission.

In Europa moeten wijzigingen worden beoordeeld binnen MDR/IVDR, technische documentatie, kwaliteitsmanagement en de rol van de notified body. Significante wijzigingen kunnen herbeoordeling vereisen. Met de EU AI Act komen voor bepaalde medische AI-systemen aanvullende eisen rond data governance, transparantie, menselijk toezicht en post-market monitoring in beeld. Dat vervangt MDR/IVDR niet; het komt er voor relevante systemen naast te staan.

## Praktische vragen aan leveranciers

1. Wat is de exacte intended purpose, inclusief patiëntgroep, setting, gebruiker en workflow?
2. Is dit SaMD/MDSW, onderdeel van een hulpmiddel, accessoire, of niet-medische software?
3. Welke CE/MDR/IVDR-classificatie of FDA-route geldt precies?
4. Welke certificaten, submissionnummers en publieke beslissamenvattingen kunt u tonen?
5. Welke modelversie is beoordeeld en hoe herken ik die versie in het product?
6. Welke externe en lokale validatie is beschikbaar voor onze populatie en infrastructuur?
7. Hoe monitort u drift, bias, incidenten en performance per subgroep?
8. Welke wijzigingen vallen binnen bestaande goedkeuring/certificering en welke vereisen herbeoordeling?
9. Wat moet de clinicus met de output doen: informeren, controleren, triëren, diagnosticeren of behandelen?
10. Wat gebeurt er bij een veiligheidsprobleem: melding, rollback, waarschuwing, CAPA of nieuwe release?

## Conclusie

“FDA”, “CE” en “MDR” zijn belangrijke signalen, maar ze zijn alleen betekenisvol als u de scope kent. Een AI-model is beoordeeld voor een specifieke claim, versie, doelgroep en gebruiksomgeving. De slimste vraag aan een leverancier is daarom niet: “Is het goedgekeurd?” maar: “Wat is precies beoordeeld, met welk bewijs, voor welke klinische beslissing, en hoe blijft dat bewijs geldig nadat het model verandert?”

## Visualisatiepakket

**Figuurideeën**

1. **Beslisboom: “Wanneer wordt AI een medisch hulpmiddel?”**  
   Yes/no-flow van `AI-model` naar `medische claim?`, `individuele patiënt?`, `diagnose/therapie/monitoring/prognose?`, `zelfstandige software of onderdeel van hulpmiddel?`. Eindpunten: “waarschijnlijk buiten scope”, “mogelijk SaMD/MDSW”, “regulatoire documentatie opvragen”. Geschikt als eenvoudige SVG of React-flowchart.

2. **Routekaart EU versus VS**  
   Twee kolommen. EU: `intended purpose` -> `MDR/IVDR classificatie` -> `notified body waar nodig` -> `CE-markering` -> `post-market surveillance`. VS: `intended use` -> `device class/pathway` -> `510(k), De Novo of PMA` -> `FDA clearance/authorization/approval` -> `post-market controls`.

3. **Lifecycle-loop voor AI-modellen**  
   Cirkel: `ontwikkeling` -> `validatie` -> `premarket/CE` -> `implementatie` -> `monitoring van drift/bias/incidenten` -> `gecontroleerde update` -> terug naar `validatie`. Markeer apart: “FDA PCCP” en “EU significante wijziging/notified body”.

4. **Risicomatrix voor klinische impact**  
   X-as: rol van output, van “informeert” tot “stuurt diagnose/therapie”. Y-as: schade bij fout, van laag tot ernstig/onherstelbaar. Plaats voorbeelden zoals administratieve samenvatting, triage-alert, therapiedosering en autonome detectie. Label duidelijk: illustratief, geen formele classificatie.

**Interactieve component**

Een **claim-checker quiz/calculator** past goed. De gebruiker beantwoordt 6-8 vragen over medische claim, individuele patiënt, diagnostische/therapeutische impact, autonomie, modelupdates en beschikbaar bewijs. Output: geen juridisch oordeel, maar een checklist met vervolgvragen aan de leverancier. Geschikt als React-component met radio buttons, risicosignaal en exporteerbare vragenlijst.

**Afbeeldingen of video’s om op te zoeken/gebruiken**

- Zoekterm: `European Commission Is your software a Medical Device infographic`  
  Gebruik als inspiratie voor de beslisboom, bij voorkeur via de officiële Europese Commissie-pagina.

- Zoekterm: `FDA AI-enabled medical devices list radiology cardiology`  
  Maak zelf een staafdiagram of tegeloverzicht op basis van de FDA-lijst, bijvoorbeeld per specialisme of type submission.

- Zoekterm: `FDA CDRH Learn Predetermined Change Control Plan AI-enabled device software functions`  
  Geschikt voor educatieve video/slides over PCCP en wijzigingsbeheer.

- Zoekterm: `IMDRF SaMD risk categorization framework diagram`  
  Gebruik als basis voor een eigen risicomatrix, met expliciete vermelding dat IMDRF-categorieën niet één-op-één hetzelfde zijn als MDR-klassen of FDA-routes.

## Referenties

**Wetenschappelijke bronnen**

1. **Kelly CJ, Karthikesalingam A, Suleyman M, Corrado G, King D. “Key challenges for delivering clinical impact with artificial intelligence.” BMC Medicine, 2019.**  
   Gebruikt voor nuance over klinische implementatie, externe validatie, dataset shift, bias, generaliseerbaarheid en post-market surveillance.  
   DOI/URL: https://doi.org/10.1186/s12916-019-1426-2

2. **Vasey B, Nagendran M, Campbell B, et al. “Reporting guideline for the early-stage clinical evaluation of decision support systems driven by artificial intelligence: DECIDE-AI.” Nature Medicine, 2022.**  
   Gebruikt voor vroege klinische evaluatie, human factors en workflowcontext bij AI-beslisondersteuning.  
   DOI/URL: https://doi.org/10.1038/s41591-022-01772-9

3. **Liu X, Cruz Rivera S, Moher D, Calvert MJ, Denniston AK, SPIRIT-AI and CONSORT-AI Working Group. “Reporting guidelines for clinical trial reports for interventions involving artificial intelligence: the CONSORT-AI extension.” Nature Medicine, 2020.**  
   Gebruikt als achtergrond voor transparante rapportage van klinische studies met AI-interventies.  
   DOI/URL: https://doi.org/10.1038/s41591-020-1034-x

**Richtlijnen, regelgeving en tools**

4. **International Medical Device Regulators Forum, “Software as a Medical Device (SaMD): Key Definitions”, 2013.**  
   Gebruikt voor de definitie van SaMD.  
   URL: https://www.imdrf.org/documents/software-medical-device-samd-key-definitions

5. **International Medical Device Regulators Forum, “Good Machine Learning Practice for Medical Device Development: Guiding Principles”, 2025.**  
   Gebruikt voor lifecycle-denken, monitoring en veilige ontwikkeling van AI/ML-medische hulpmiddelen.  
   URL: https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles

6. **U.S. Food and Drug Administration, “Artificial Intelligence-Enabled Medical Devices”, doorlopend bijgewerkt.**  
   Gebruikt voor FDA-geautoriseerde AI-enabled devices en publieke FDA-lijsten.  
   URL: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices

7. **U.S. Food and Drug Administration, “Artificial Intelligence in Software as a Medical Device”, doorlopend bijgewerkt.**  
   Gebruikt voor FDA-context rond AI/ML, SaMD, premarket pathways en lifecycle-management.  
   URL: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device

8. **U.S. Food and Drug Administration, “Marketing Submission Recommendations for a Predetermined Change Control Plan for Artificial Intelligence-Enabled Device Software Functions”, final guidance, 2025.**  
   Gebruikt voor uitleg over PCCP en modelwijzigingen binnen FDA-submissions.  
   URL: https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence

9. **U.S. Food and Drug Administration, “Premarket Submissions: Selecting and Preparing the Correct Submission”, doorlopend bijgewerkt.**  
   Gebruikt voor 510(k), De Novo en PMA als FDA-routes.  
   URL: https://www.fda.gov/medical-devices/how-study-and-market-your-device/premarket-submissions-selecting-and-preparing-correct-submission

10. **European Parliament and Council, Regulation (EU) 2017/745 on medical devices, 2017.**  
   Gebruikt voor MDR, CE-markering, classificatie, technische documentatie, post-market surveillance en softwarewijzigingen.  
   URL: https://eur-lex.europa.eu/eli/reg/2017/745/oj

11. **European Parliament and Council, Regulation (EU) 2017/746 on in vitro diagnostic medical devices, 2017.**  
   Gebruikt voor IVDR-context bij AI/software gebaseerd op in-vitro diagnostische gegevens.  
   URL: https://eur-lex.europa.eu/eli/reg/2017/746/oj

12. **European Commission, “Notified bodies for medical devices”, doorlopend bijgewerkt.**  
   Gebruikt voor de rol van notified bodies in conformiteitsbeoordeling.  
   URL: https://health.ec.europa.eu/medical-devices-topics-interest/notified-bodies-medical-devices_en

13. **Medical Device Coordination Group, “MDCG 2019-11 rev.1: Qualification and classification of software - Regulation (EU) 2017/745 and Regulation (EU) 2017/746”, 2025.**  
   Gebruikt voor MDSW, intended purpose, kwalificatie/classificatie en MDR Rule 11.  
   URL: https://health.ec.europa.eu/latest-updates/update-mdcg-2019-11-rev1-qualification-and-classification-software-regulation-eu-2017745-and-2025-06-17_en

14. **Medical Device Coordination Group / Artificial Intelligence Board, “MDCG 2025-6: FAQ on Interplay between the MDR, IVDR and the Artificial Intelligence Act”, 2025.**  
   Gebruikt voor nuance over medische AI, AI Act, aanvullende eisen en samenloop met MDR/IVDR.  
   URL: https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en

15. **Medical Device Coordination Group, “MDCG 2025-10: Guidance on post-market surveillance of medical devices and in vitro diagnostic medical devices”, 2025.**  
   Gebruikt voor post-market surveillance en lifecycle-monitoring onder EU-kaders.  
   URL: https://health.ec.europa.eu/latest-updates/mdcg-2025-10-guidance-post-market-surveillance-medical-devices-and-vitro-diagnostic-medical-devices-2025-12-19_en

**Visual, video en interactieve bronnen**

16. **European Commission, “Infographic - Is your software a Medical Device?”, 2021.**  
   Gebruikt als visuele referentie voor de voorgestelde beslisboom over MDSW-kwalificatie.  
   URL: https://health.ec.europa.eu/publications/infographic-your-software-medical-device_en

17. **U.S. Food and Drug Administration, “Digital Health Policy Navigator”, doorlopend bijgewerkt.**  
   Gebruikt als referentie voor het interactieve claim-checker concept en voor vragen rond softwarefuncties en FDA-toezicht.  
   URL: https://www.fda.gov/medical-devices/digital-health-center-excellence/digital-health-policy-navigator

18. **U.S. Food and Drug Administration, “CDRH Learn”, doorlopend bijgewerkt.**  
   Gebruikt als betrouwbare bron voor educatieve video’s, slides en transcripts over medische hulpmiddelen, digital health en PCCP.  
   URL: https://www.fda.gov/training-and-continuing-education/cdrh-learn

19. **International Medical Device Regulators Forum, “Software as a Medical Device: Possible Framework for Risk Categorization and Corresponding Considerations”, 2014.**  
   Gebruikt als visuele inspiratie voor de risicomatrix en SaMD-risicodenken.  
   URL: https://www.imdrf.org/documents/software-medical-device-possible-framework-risk-categorization-and-corresponding-considerations

---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-1256-79e3-b4d1-715ddeec7cb0.jsonl  ts: 2026-05-03T22:39:58.847Z -->

# Niet alleen een ander ziekenhuis: wat maakt een externe validatiestudie echt goed?

## Intro

Een AI-model dat uitstekend presteert in de ontwikkeldata is nog geen klinisch bruikbaar model. Externe validatie test of voorspellingen overeind blijven in nieuwe, relevante data die niet zijn gebruikt voor training, tuning, modelselectie of interne evaluatie. Maar “extern” betekent niet automatisch “goed”. Een dataset uit een ander ziekenhuis kan alsnog te klein, te selectief, te oud, slecht gelabeld of operationeel onvergelijkbaar zijn. Een goede externe validatiestudie laat zien voor wie, waar, wanneer en onder welke klinische voorwaarden een model betrouwbaar genoeg is om beslissingen te ondersteunen.

## Begin bij de beoogde inzet

De kernvraag is niet: “Werkt het model op dataset B?” De kernvraag is: “Werkt het model voor de doelpopulatie en klinische beslissing waarvoor we het willen gebruiken?” Beschrijf daarom expliciet de doelpopulatie: leeftijd, ziekte-spectrum, inclusie- en exclusiecriteria, comorbiditeit, prevalentie, verwijspatroon en relevante demografie. Een sepsismodel voor IC-patiënten valideer je niet overtuigend op algemene SEH-patiënten zonder uit te leggen waarom die populatie aansluit.

Ook de setting moet concreet zijn: eerste lijn, tertiair centrum, spoedzorg, screening, thuismonitoring, radiologie-workflow of EPD-beslisondersteuning. Technische context telt mee: scanners, labmethoden, EPD-velden, triageprocessen, datakwaliteit en wie het modelresultaat ziet. Externe validatie is dus meer dan geografische afstand; het gaat om klinische en operationele vergelijkbaarheid.

## Tijd, beschikbaarheid en datalekken

Een sterke studie vermeldt de tijdsperiode van de validatiecohort. Modellen kunnen degraderen door veranderde richtlijnen, apparatuur, populaties, codering, behandelopties of ziekte-epidemiologie. Temporale validatie, bijvoorbeeld training op 2018-2021 en externe evaluatie op 2023-2025, kan minstens zo informatief zijn als validatie in een ander centrum.

Predictorbeschikbaarheid is een vaak onderschat punt. Alle voorspellers moeten op het beslismoment beschikbaar zijn, in dezelfde vorm als bij implementatie. Een labwaarde die pas na opname bekend is, mag niet worden gebruikt voor een triagebesluit bij binnenkomst. Let ook op dataverwerking: automatische extractie, handmatige correctie, beeldpreprocessing en uitsluiting van “slechte” scans moeten overeenkomen met echte praktijk. Anders valideer je een ideaal proces, niet het inzetbare model.

## Outcome-definitie en referentiestandaard

De outcome-definitie moet reproduceerbaar, klinisch relevant en onafhankelijk van de modelvoorspelling zijn. Bij diagnostische AI gaat het om de referentiestandaard: histologie, expertpanel, follow-up, microbiologie, adjudicatie of een combinatie. Bij prognostische modellen gaat het om tijdshorizon en meetmethode: 30-dagen mortaliteit, IC-opname binnen 24 uur, complicatie binnen 90 dagen. Een outcome die in centrum A anders wordt gecodeerd dan in centrum B kan schijnbare prestatieverschillen veroorzaken.

Voor medische beeldvorming sluit dit aan bij CLAIM: rapporteer dataherkomst, acquisitie, selectie, preprocessing, referentiestandaard en externe testset transparant. Voor interventiestudies waarin het AI-systeem daadwerkelijk de zorg beïnvloedt, is CONSORT-AI relevanter: daar moet ook de menselijke interactie, workflow, versie van het algoritme en impact op klinische uitkomsten worden beschreven.

## Missing data is geen voetnoot

Missing data hoort niet verstopt te zitten in een supplement. Rapporteer per predictor en outcome hoeveel data ontbreken, waarom ze ontbreken, en hoe ermee is omgegaan. Complete-case analyse kan bias introduceren als ontbrekende waarden samenhangen met ernst, setting of subgroep. Imputatie moet vooraf gespecificeerd en passend zijn voor de implementatiecontext. Belangrijk: als het model in de praktijk moet kunnen omgaan met ontbrekende waarden, moet de validatie datzelfde mechanisme testen.

## Prestatie: calibration én discrimination

Discrimination beschrijft hoe goed het model onderscheid maakt tussen mensen met en zonder outcome, vaak met AUC/C-statistic, sensitiviteit, specificiteit of positive predictive value bij vooraf gekozen drempels. Dat is nodig, maar niet genoeg.

Calibration is minstens zo belangrijk: kloppen de voorspelde risico’s met de geobserveerde risico’s? Een model met AUC 0,85 kan klinisch gevaarlijk zijn als het systematisch 20% risico voorspelt waar 5% realistisch is. Rapporteer calibration-in-the-large, calibration slope, flexible calibration plots en, bij tijd-tot-eventmodellen, kalibratie op relevante tijdspunten. Vermijd alleen Hosmer-Lemeshow-achtige p-waarden; die zeggen weinig over klinische bruikbaarheid.

## Clinical utility: wat verandert er aan beslissingen?

Een model kan statistisch indrukwekkend zijn en klinisch nutteloos. Daarom hoort een goede externe validatie decision-curve analysis of een vergelijkbare clinical utility-analyse te bevatten wanneer het model bedoeld is om acties te sturen. Net benefit laat zien of gebruik van het model meer voordeel oplevert dan “iedereen behandelen”, “niemand behandelen” of standaardzorg, over relevante risicodrempels. Die drempels moeten klinisch worden gemotiveerd: bij welke voorspelde kans verwijs je, behandel je, scan je of intensiveer je monitoring?

## Subgroepen, fairness en transportability

Gemiddelde performance kan problemen maskeren. Rapporteer subgroup performance voor klinisch en ethisch relevante groepen: leeftijd, geslacht/gender, etniciteit, sociaaleconomische status, centrum, scanner, ziekte-ernst, comorbiditeit en datakwaliteit. Kleine subgroepen vragen om onzekerheidsintervallen en terughoudende interpretatie, maar niet om zwijgen.

Transportability gaat over de vraag of het model verplaatsbaar is naar nieuwe populaties, settings en tijdsperioden. Soms is volledige herontwikkeling niet nodig, maar wel recalibratie of lokale updating. Een goede studie maakt duidelijk of slechte performance komt door case-mix, andere predictorverdeling, outcomeverschil, workflowverschil of echte modelinstabiliteit.

## Praktische checklist

- Is de validatieset volledig onafhankelijk van training, tuning en modelselectie?
- Sluiten doelpopulatie, setting en tijdsperiode aan op de beoogde inzet?
- Waren alle predictors beschikbaar op het beslismoment, zonder datalekken?
- Is de outcome-definitie helder, klinisch relevant en vergelijkbaar tussen centra?
- Zijn missing data beschreven en methodologisch verantwoord behandeld?
- Worden calibration, discrimination en onzekerheidsintervallen gerapporteerd?
- Is clinical utility onderzocht met relevante beslisdrempels?
- Zijn subgroepen en fairness onderzocht zonder overinterpretatie?
- Wordt transportability besproken, inclusief behoefte aan recalibratie?
- Is rapportage in lijn met TRIPOD+AI en beoordeling mogelijk met PROBAST+AI?

## Bronnen

- [TRIPOD+AI statement, BMJ 2024](https://www.bmj.com/content/385/bmj-2023-078378)
- [PROBAST+AI, BMJ 2025](https://www.bmj.com/content/388/bmj-2024-082505)
- [Evaluation of clinical prediction models, part 2: external validation, BMJ 2024](https://www.bmj.com/content/384/bmj-2023-074820)
- [CLAIM 2024 Update, EQUATOR Network](https://www.equator-network.org/reporting-guidelines/checklist-for-artificial-intelligence-in-medical-imaging-claim-a-guide-for-authors-and-reviewers/)
- [CONSORT-AI extension, Nature Medicine 2020](https://www.nature.com/articles/s41591-020-1034-x)
- [Decision curve analysis and net benefit, Vickers & Holland 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8413398/)

---

<!-- bron: rollout-2026-05-04T00-38-19-019deffe-12fe-7b31-9a4b-c4ef30992b88.jsonl  ts: 2026-05-03T22:39:38.470Z -->

# Silent trial, shadow mode en live deployment: klinische AI gecontroleerd naar de praktijk brengen

## Intro

Een AI-model dat retrospectief goed presteert, is nog geen veilig klinisch hulpmiddel. In het ziekenhuis botst een model op rommelige datastromen, werkdruk, afwijkende populaties, veranderende protocollen en menselijke interpretatie. Daarom is de stap van “validatie” naar “live gebruik” geen technische release, maar een gefaseerd implementatieprogramma. Dit artikel beschrijft een praktische route: retrospective validation, prospective silent trial of shadow mode, pilot en live deployment. Het is educatief bedoeld en geen medisch of juridisch advies.

## 1. Retrospective validation: bewijs op historische data

Retrospective validation test een AI-systeem op bestaande patiëntdata, liefst uit een periode, afdeling of instelling die niet gebruikt is voor training. De kernvraag is: doet het model wat het belooft binnen de beoogde klinische toepassing?

Goede retrospectieve validatie kijkt verder dan AUC of accuracy. Belangrijk zijn calibratie, sensitiviteit en specificiteit bij relevante drempels, fouttypen, subgroepen, missende waarden, datalekken en performance per klinische workflow. Een model voor sepsisdetectie moet bijvoorbeeld niet alleen “sepsis” herkennen, maar dat tijdig doen, met een bruikbaar aantal alerts, bij patiënten die op dat moment werkelijk in de klinische populatie zitten.

Deze fase is geschikt om technische en methodologische risico’s te vinden: labeldefinities, bias, datakwaliteit, onbedoelde proxies, leakage uit toekomstige informatie en verschillen tussen trainingsdata en lokale praktijk. Maar retrospectief bewijs blijft beperkt: het bewijst niet dat de live dataketen werkt, dat clinici de output begrijpen, of dat het model veilig past in het zorgproces.

## 2. Prospective silent trial / shadow mode: live meekijken zonder invloed

Een silent trial, vaak ook shadow mode genoemd, draait het AI-systeem prospectief op echte, actuele data in de bedoelde klinische omgeving, maar zonder dat de output klinische beslissingen beïnvloedt. Het model “kijkt mee” op de achtergrond. Clinici blijven blind voor de voorspellingen, of de output wordt alleen bekeken door een evaluatieteam.

Dit is de brug tussen laboratoriumvalidatie en klinische inzet. Je test niet alleen het model, maar het hele systeem: datakoppelingen, latency, preprocessing, uptime, patiëntselectie, foutafhandeling, logging en lokale populatiedrift. Een silent trial kan laten zien dat een model dat op historische data sterk leek, live minder goed presteert omdat labwaarden later binnenkomen, definities anders zijn geworden, of een EPD-veld anders wordt gevuld.

Vooraf moeten succescriteria vastliggen: minimale performance, maximale latency, acceptabele foutcategorieën, subgroup performance, datavolledigheid en operationele betrouwbaarheid. Ook moet duidelijk zijn wie de silent-trialresultaten beoordeelt en wanneer hertraining, redesign of stopzetting nodig is.

## 3. Pilot: gecontroleerde klinische blootstelling

In een pilot wordt de AI-output zichtbaar en mag deze, binnen afgebakende grenzen, het zorgproces ondersteunen. Dit is geen “kleine livegang”, maar een gecontroleerde interventie met extra toezicht. De pilot heeft een beperkte scope: bijvoorbeeld één afdeling, één patiëntgroep, vaste werktijden, een klein aantal getrainde gebruikers en een vooraf afgesproken escalatiepad.

De belangrijkste vragen verschuiven. Niet alleen “klopt het model?”, maar ook: begrijpen gebruikers de output, verandert het gedrag op een wenselijke manier, ontstaat alert fatigue, worden verantwoordelijkheden helder opgepakt, en is er klinische meerwaarde zonder nieuwe veiligheidsrisico’s?

Een goede pilot bevat training, feedbackmomenten, monitoring dashboards, incidentregistratie en een duidelijk besluitmoment. De AI mag niet “stilletjes” norm worden voordat de organisatie weet wat het effect is op patiënten, professionals en workflow.

## 4. Live deployment: productie is een zorgproces, geen eindpunt

Live deployment betekent dat de AI structureel onderdeel wordt van de klinische workflow. Vanaf dat moment is beheer minstens zo belangrijk als ontwikkeling. Er moeten eigenaren zijn voor modelperformance, klinische veiligheid, technische beschikbaarheid, privacy, security, leverancierscontact, wijzigingsbeheer en periodieke evaluatie.

Workflowintegratie is vaak bepalender dan modelscore. Een goede AI-output verschijnt op het juiste moment, bij de juiste professional, in het juiste systeem, met een begrijpelijke actiecontext. Een slecht geplaatste alert kan genegeerd worden; een te dwingende alert kan juist automation bias veroorzaken. Ontwerp daarom expliciet voor de menselijke-AI-samenwerking: de professional blijft verantwoordelijk voor klinische interpretatie, terwijl de organisatie verantwoordelijk is voor veilige randvoorwaarden.

## Monitoring, drift en incidentproces

Na livegang moet monitoring meerdere lagen omvatten. Technisch: uptime, latency, foutmeldingen, inputuitval en versiestatus. Datagericht: ontbrekende waarden, distributieverschuivingen, veranderde coderingen en afwijkende patiëntmix. Modelgericht: discriminatie, calibratie, alertvolume, false positives, false negatives en performance per subgroup. Klinisch: impact op wachttijd, diagnostiek, behandeling, escalaties en mogelijke schade.

Drift is niet alleen statistiek. Een nieuw protocol, ander labapparaat, veranderde populatie of aangepast EPD-scherm kan modelgedrag veranderen. Daarom hoort driftmonitoring gekoppeld te zijn aan change management: wie wordt geïnformeerd, wie beoordeelt de klinische relevantie en wanneer wordt het model tijdelijk uitgezet?

Het incidentproces moet vooraf klaarstaan. Meldkanalen moeten laagdrempelig zijn voor clinici. Incidenten moeten worden geclassificeerd naar ernst, herleidbaarheid, patiëntimpact, reproduceerbaarheid en noodzaak tot correctieve actie. Bij ernstige signalen moet er een route zijn voor onmiddellijke pauzering, communicatie naar gebruikers en, waar van toepassing, melding aan toezichthouders of fabrikant.

## Audit logs en stopcriteria

Audit logs zijn essentieel voor verantwoording en leren. Leg vast: modelversie, inputtijdstip, gebruikte datavelden, output, drempelwaarde, gebruiker, getoonde interface, eventuele override, downstream actie en technische status. Logs moeten privacybewust zijn ingericht en alleen toegankelijk voor bevoegde rollen.

Stopcriteria maken governance concreet. Voorbeelden zijn: performance onder afgesproken minimum, disproportionele fouten in een subgroup, onverklaarde stijging in alertvolume, ernstige dataketenfout, onacceptabele latency, klinische incidenten met plausibele AI-bijdrage, ontbreken van auditability, of een wijziging in workflow waardoor de oorspronkelijke validatie niet meer geldt.

## Praktische implementatiechecklist

1. Definieer intended use, patiëntpopulatie, gebruikers, beslismoment en grenzen van het AI-systeem.
2. Voer externe of temporele retrospectieve validatie uit, inclusief calibratie, subgroepen en foutanalyse.
3. Controleer datakwaliteit, datalekken, labeldefinities, privacygrondslag en security.
4. Ontwerp de silent trial met vooraf vastgelegde succes- en stopcriteria.
5. Test live datastromen, latency, logging, foutafhandeling en modelversiebeheer.
6. Beoordeel silent-trialresultaten multidisciplinair: kliniek, data science, IT, privacy, veiligheid en bestuur.
7. Start alleen een pilot met getrainde gebruikers, beperkte scope en zichtbaar supportkanaal.
8. Monitor technische, statistische en klinische signalen vanaf dag één.
9. Richt incidentproces, escalatiepad, rollback en communicatieplan in.
10. Plan periodieke herbeoordeling, inclusief drift, bias, workflowimpact en noodzaak tot hertraining.

## Slot

De veilige route naar klinische AI is gefaseerd en bescheiden: eerst bewijzen op historische data, daarna live meekijken zonder invloed, vervolgens beperkt klinisch testen en pas daarna gecontroleerd uitrollen. Silent trials en shadow mode zijn geen bureaucratische tussenstap; ze zijn de plek waar modelbelofte en ziekenhuiswerkelijkheid elkaar voor het eerst eerlijk ontmoeten.

## Bronnen

- DECIDE-AI guideline, BMJ/Nature Medicine: https://www.bmj.com/content/377/bmj-2022-070904  
- “The silent trial”, Frontiers in Digital Health: https://www.frontiersin.org/articles/10.3389/fdgth.2022.929508  
- Scoping review silent trials, Nature Health: https://www.nature.com/articles/s44360-025-00048-z  
- FDA Good Machine Learning Practice: https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles  
- EU Commission over AI in healthcare en AI Act: https://health.ec.europa.eu/ehealth-digital-health-and-care/artificial-intelligence-healthcare_en  
- NICE Evidence Standards Framework: https://www.nice.org.uk/about/what-we-do/our-programmes/evidence-standards-framework-for-digital-health-technologies

---

<!-- bron: rollout-2026-05-04T00-43-37-019df002-f0a8-7722-a4f9-de355c1d43ba.jsonl  ts: 2026-05-03T22:45:57.851Z -->

# De AI faalt zelden alleen op het model: waarom slimme zorg-AI strandt in de workflow

AI in de zorg wordt vaak beoordeeld op sensitiviteit, specificiteit, AUC of nauwkeurigheid. Maar in het ziekenhuis faalt een systeem meestal op iets alledaagsers: het past niet in het werk. Een waarschuwing komt te laat, verschijnt bij de verkeerde professional, vraagt om een actie waarvoor niemand eigenaar is, of verdwijnt tussen tientallen andere meldingen. Dit artikel is bedoeld als educatief implementatiekader voor ziekenhuizen en klinische AI-teams, niet als medisch of juridisch advies.

## 1. Workflow mismatch: de stille hoofdreden

Een AI-model kan technisch goed presteren en toch klinisch weinig waarde leveren. De kernvraag is niet: “Is het model accuraat?” maar: “Verandert de output op het juiste moment een haalbare beslissing?”

Workflow mismatch ontstaat wanneer de AI-uitkomst niet aansluit op bestaande taken, rollen, overdrachten en besluitmomenten. Denk aan een risico-inschatting voor verslechtering die verschijnt nadat de visite is afgerond, een radiologie-algoritme dat een extra reviewstap creëert zonder capaciteitsplanning, of een sepsis-alert die een verpleegkundige ziet terwijl de vervolgstap bij de arts-assistent ligt.

Goede implementatie begint daarom met workflow mapping: waar ontstaat de klinische onzekerheid, wie kan handelen, welke gegevens zijn dan beschikbaar, en wat is de minimale actie die het systeem moet ondersteunen? Zonder die analyse wordt AI een extra scherm, niet een betere zorgstap.

## 2. Alert fatigue en automation bias: twee tegengestelde risico’s

AI-systemen falen vaak doordat gebruikers óf te weinig vertrouwen hebben, óf te veel.

Bij alert fatigue worden zorgprofessionals ongevoelig voor meldingen. Dat gebeurt vooral bij hoge volumes, herhaalde meldingen, onduidelijke urgentie en lage positieve voorspellende waarde. Een alert die “mogelijk risico” zegt maar negen van de tien keer geen nuttige actie oplevert, concurreert met medicatiebewaking, labuitslagen, telefoons, piepers en overdrachten. Uiteindelijk wordt wegklikken een rationele werkstrategie.

Automation bias is het spiegelbeeld: gebruikers volgen het systeem te gemakkelijk. Dit kan leiden tot commission errors, waarbij een onjuist advies wordt overgenomen, of omission errors, waarbij men niet verder kijkt omdat het systeem niets meldt. Training moet daarom niet alleen uitleggen hoe de knop werkt, maar ook wanneer de AI waarschijnlijk faalt, welke patiëntgroepen minder goed vertegenwoordigd zijn, hoe onzekerheid wordt getoond, en hoe afwijkende klinische intuïtie wordt gedocumenteerd.

## 3. Timing: een goede voorspelling kan te vroeg of te laat zijn

Timing is een ontwerpbeslissing, geen detail. Een vroeg alarmsignaal geeft meer reactietijd, maar vaak ook meer fout-positieven. Een laat signaal is specifieker, maar kan klinisch nutteloos zijn. Voor implementatieleiders is daarom de vraag: wat is het handelingsvenster?

Een AI-output moet gekoppeld worden aan een concrete beslissing: extra observatie, labcontrole, consult, medicatiecheck, triage, follow-up of bespreking in MDO. Als de output buiten dat venster valt, ontstaat ruis. De beste timing kan per afdeling verschillen: SEH, IC, verpleegafdeling, polikliniek en diagnostische ketens hebben elk een ander ritme.

## 4. EPD-integratie: niet alleen technisch, maar klinisch

EPD-integratie wordt vaak besproken als API-, HL7- of FHIR-vraagstuk. Dat is nodig, maar onvoldoende. De klinische integratie gaat over zichtbaarheid, context en actieerbaarheid.

Een goede AI-integratie toont de output op de plek waar de beslissing al wordt genomen. Ze beperkt extra klikken, verklaart kort waarom de melding relevant is, toont de belangrijkste inputfactoren of onzekerheid, en biedt een directe vervolgstap. Bijvoorbeeld: order set openen, taak toewijzen, notitie starten, consult aanvragen of alert snoozen met reden.

Vermijd “losse dashboards” die alleen door enthousiaste projectleden worden bekeken. Als de AI buiten de EPD-routine leeft, wordt gebruik afhankelijk van geheugen en motivatie. Dat houdt zelden stand in nachtdiensten, personeelstekort of piekbelasting.

## 5. Verantwoordelijkheden: wie is eigenaar van de volgende stap?

Elke AI-output moet een operationeel eigenaarschap hebben. Wie ziet de melding? Wie beoordeelt haar? Wie mag handelen? Wie is verantwoordelijk bij afwijken? Wie monitort performance? Wie zet het systeem tijdelijk uit bij storing of drift?

Zonder duidelijke RACI-afspraken ontstaat schijnveiligheid. De verpleegkundige dacht dat de arts het zag; de arts dacht dat het AI-team monitorde; het AI-team dacht dat de afdeling eigenaar was. Klinische AI vraagt daarom om governance: CMIO, medisch specialist, verpleegkundige vertegenwoordiging, data science, EPD-beheer, kwaliteit & veiligheid, privacy/security en juridisch advies moeten vooraf afspraken maken over gebruik, escalatie en wijzigingsbeheer.

## 6. Lokale context en change management

AI reist slecht zonder lokale validatie. Patiëntpopulatie, meetfrequentie, labapparatuur, registratiediscipline, triageprotocollen en personeelsmix verschillen per instelling. Een model dat elders goed werkt, kan lokaal slechter kalibreren of een onwerkbare alertlast veroorzaken.

Change management begint vóór livegang. Betrek eindgebruikers bij ontwerp, simuleer casussen, draai het systeem tijdelijk in silent mode, test op verschillende diensten, en organiseer feedbacksessies na de eerste weken. Maak zichtbaar welke feedback tot aanpassingen leidt. Dat vergroot vertrouwen meer dan een algemene belofte dat “het algoritme gevalideerd is”.

## 7. Monitoring en feedbackloops

AI-implementatie is geen project met een einddatum, maar een leerproces. Monitor minimaal: modelprestatie, kalibratie, alertvolume, responstijd, override-redenen, vervolgacties, incidentmeldingen, verschillen tussen patiëntgroepen, technische beschikbaarheid en klinische uitkomsten waar passend.

Belangrijk is de feedbackloop: kunnen gebruikers melden dat een alert onzinnig, te laat of onduidelijk was? Wordt die feedback beoordeeld? Is er een procedure voor drempelaanpassing, hertraining, tijdelijke pauzering of de-implementatie? Een AI-systeem zonder onderhoudsritme wordt langzaam minder betrouwbaar, zelfs als het bij start veelbelovend was.

## Praktische checklist voor implementatieleiders

- Is de klinische beslissing waarvoor AI bedoeld is scherp gedefinieerd?
- Komt de output bij de professional die daadwerkelijk kan handelen?
- Verschijnt de output binnen het juiste handelingsvenster?
- Is de vervolgstap direct uitvoerbaar in het EPD?
- Zijn alertvolume, prioriteit en herhaalfrequentie vooraf getest?
- Is duidelijk wie verantwoordelijk is voor beoordeling, actie, escalatie en monitoring?
- Hebben gebruikers training gekregen over beperkingen, onzekerheid en automation bias?
- Is lokale validatie gedaan op eigen data en eigen workflow?
- Is er een change-managementplan met champions, simulaties en nazorg?
- Zijn performance, gebruik, veiligheid en feedback structureel belegd?

## Visualisatiepakket

**Figuurideeën**
1. Swimlane “van modelscore naar klinische actie”: patiëntdata, model, EPD, verantwoordelijke rol, actie, feedback.
2. Timingkaart: AI-output afgezet tegen visite, overdracht, labronde, MDO en ontslagmoment.
3. Alert fatigue-funnel: alle alerts, klinisch relevante alerts, opgevolgde alerts, uitkomstimpact.
4. Governance-matrix: klinisch eigenaar, CMIO, data science, EPD-team, kwaliteit & veiligheid.

**Interactieve component**
Een “workflow-fit simulator” waarin gebruikers drempelwaarde, alertfrequentie, ontvanger en timing aanpassen. De tool toont fictieve effecten op alertlast, gemiste casussen, responstijd en benodigde capaciteit.

**Afbeelding/video-zoekbronnen**
- AHRQ / CDS Connect; zoekterm: “clinical decision support five rights workflow AHRQ”; bronvoorkeur: officiële AHRQ-pagina’s.
- ONC SAFER Guides; zoekterm: “SAFER Guides computerized provider order entry decision support monitoring alerts”; bronvoorkeur: officiële ONC/PDF.
- FDA MLMD Transparency; zoekterm: “machine learning enabled medical device transparency workflow FDA”; bronvoorkeur: FDA/Health Canada/MHRA.
- CHI/Google Research; zoekterm: “Beede human-centered evaluation deep learning deployed clinics diabetic retinopathy video”; bronvoorkeur: Google Research, ACM, CHI-talk.

## Referenties

### Wetenschappelijke bronnen
- Bates et al., “Ten Commandments for Effective Clinical Decision Support”, JAMIA, 2003. Reden: juiste informatie, juiste persoon, juiste moment. DOI: https://doi.org/10.1197/jamia.M1370  
- Carayon et al., “Work system design for patient safety: the SEIPS model”, Quality & Safety in Health Care, 2006. Reden: sociotechnische workflowanalyse. DOI: https://doi.org/10.1136/qshc.2005.015842  
- Goddard, Roudsari & Wyatt, “Automation bias”, JAMIA, 2012. Reden: risico’s en mitigatie van oververtrouwen in beslisondersteuning. DOI: https://doi.org/10.1136/amiajnl-2011-000089  
- Ancker et al., “Effects of workload, work complexity, and repeated alerts on alert fatigue”, BMC Medical Informatics and Decision Making, 2017. Reden: alert fatigue-mechanismen. DOI: https://doi.org/10.1186/s12911-017-0430-8  
- Beede et al., “A Human-Centered Evaluation of a Deep Learning System Deployed in Clinics”, CHI, 2020. Reden: lokale workflow en context bij AI-deployments. DOI: https://doi.org/10.1145/3313831.3376718  
- Wong et al., “External Validation of a Widely Implemented Proprietary Sepsis Prediction Model”, JAMA Internal Medicine, 2021. Reden: lokale validatie, alertlast en klinische waarde. DOI: https://doi.org/10.1001/jamainternmed.2021.2626  
- Sendak et al., “A Path for Translation of Machine Learning Products into Healthcare Delivery”, EMJ Innovations, 2020. Reden: lifecycle, implementatie en monitoring. DOI: https://doi.org/10.33590/emjinnov/19-00172  

### Richtlijnen en tools
- WHO, “Ethics and governance of artificial intelligence for health”, 2021. Reden: governance, verantwoordelijkheid en ethiek. URL: https://www.who.int/publications/i/item/9789240029200  
- FDA/Health Canada/MHRA, “Good Machine Learning Practice for Medical Device Development”, 2021; IMDRF-update 2025. Reden: human-AI team, lifecycle en monitoring. URL: https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles  
- FDA/Health Canada/MHRA, “Transparency for Machine Learning-Enabled Medical Devices”, 2024. Reden: timing, context, gebruikersinformatie en workflow. URL: https://www.fda.gov/medical-devices/software-medical-device-samd/transparency-machine-learning-enabled-medical-devices-guiding-principles  
- NICE, “Evidence standards framework for digital health technologies”, bijgewerkt 2022. Reden: bewijsstandaarden voor digitale en adaptieve technologie. URL: https://www.nice.org.uk/corporate/ecd7  
- ONC, “SAFER Guides”, 2025, pagina bijgewerkt 2026. Reden: EPD-veiligheid, CPOE/CDS en organisatorische verantwoordelijkheden. URL: https://healthit.gov/clinical-quality-and-safety/safer-guides/  
- AHRQ, “CDS Connect” en “How to Implement Evidence Using Clinical Decision Support”, 2012/2019. Reden: implementatie, vijf rechten van CDS, monitoring en borging. URL: https://www.ahrq.gov/cpi/about/otherwebsites/cds-connect/index.html

---

<!-- bron: rollout-2026-05-04T00-45-38-019df004-c828-7841-94bf-27cf4eec8867.jsonl  ts: 2026-05-03T22:48:07.522Z -->

# Van AUC naar echte winst: wanneer helpt AI in de kliniek?

## Intro

Een AI-model kan indrukwekkend scoren op AUROC, sensitiviteit of F1-score en toch weinig betekenen voor patiënten, professionals of capaciteit. Clinical utility vraagt daarom niet: “Is het model goed?”, maar: “Worden beslissingen beter wanneer we dit model gebruiken?” Dat verschil is cruciaal voor klinische onderzoekers, zorgprofessionals en beslissers die willen bepalen of AI meerwaarde heeft boven huidige zorg. Dit artikel is educatief bedoeld en is geen medisch, juridisch of inkoopadvies.

## Clinical Utility: Meer Dan Modelperformance

Clinical utility betekent dat een AI-systeem aantoonbaar bijdraagt aan betere besluitvorming, betere uitkomsten of efficiëntere zorg in een concrete klinische context. Een model met matige discriminatie kan nuttig zijn als het precies rond een behandel- of verwijsdrempel goed onderscheid maakt. Omgekeerd kan een model met hoge AUROC nutteloos zijn als alle patiënten toch dezelfde behandeling krijgen, als de aanbeveling niet uitvoerbaar is, of als fout-positieven onacceptabele belasting veroorzaken.

De kernvraag is dus: welke actie verandert door de AI-output? Denk aan starten met behandeling, verwijzen, extra diagnostiek, intensiever monitoren, eerder ontslaan of juist niets doen. Zonder duidelijke actie is AI vaak slechts informatieverrijking, geen interventie.

## Net Benefit En Decision Curve Analysis

Decision curve analysis, of DCA, helpt om clinical utility te beoordelen door voordelen en nadelen van modelgestuurde beslissingen samen te nemen in net benefit. Daarbij wordt een model vergeleken met praktische alternatieven: iedereen behandelen, niemand behandelen, of standaardzorg.

De drempelkans is hierbij essentieel. Stel dat een arts pas verwijst bij een geschat risico van 10%. Dan impliceert die drempel een afweging: hoeveel onnodige verwijzingen zijn acceptabel om één relevante casus niet te missen? Net benefit vertaalt die afweging naar één maat waarin terecht-positieven worden beloond en fout-positieven worden bestraft. DCA is vooral nuttig wanneer risico’s, interventies en voorkeuren variëren: bijvoorbeeld bij screening, triage, prognosemodellen en behandelkeuzes.

Belangrijk: DCA lost de klinische vraag niet op. Het maakt de aannames zichtbaar. De “redelijke” drempelrange moet worden vastgesteld met clinici, patiënten, richtlijnen en capaciteitsdata.

## Actionability En Drempels

AI helpt pas echt als de output actionabel is. Een risicoscore “hoog” is onvoldoende. Nodig zijn vooraf gedefinieerde acties per risicocategorie: bijvoorbeeld laag risico: reguliere controle; intermediair: aanvullende test; hoog: specialistische verwijzing.

Behandel- en verwijsdrempels moeten passen bij de ernst van de aandoening, effectiviteit van interventie, bijwerkingen, patiëntvoorkeuren, wachttijden en beschikbare capaciteit. Een model dat veel extra verdenkingen oplevert kan statistisch beter zijn, maar praktisch slechter als diagnostiek vastloopt of kwetsbare groepen onevenredig worden belast.

## Uitkomsten, Workflow En Kosten

Patient outcomes blijven de harde toets: mortaliteit, morbiditeit, kwaliteit van leven, tijd tot diagnose, complicaties, onnodige procedures, patiënttevredenheid en equity. Procesmaten zoals snellere doorlooptijd of hogere detectiegraad zijn waardevol, maar moeten geloofwaardig gekoppeld zijn aan patiëntrelevante winst.

Workflowimpact is net zo belangrijk. Wie ziet de AI-output? Op welk moment? Wordt het advies begrepen? Ontstaat alert fatigue? Moet een arts extra klikken, uitleggen of documenteren? Past het in bestaande MDO’s, EPD’s en triageprocessen? Een model kan klinisch nuttig lijken maar falen door implementatielast.

Ook cost/capacity hoort in de utility-vraag. Denk aan licenties, integratie, training, monitoring, juridische beoordeling, extra diagnostiek, bespaarde consulten, kortere ligduur en budgetimpact. Cost-effectiveness is contextafhankelijk: dezelfde AI kan rendabel zijn in een hoog-volume centrum en verliesgevend in een kleine instelling.

## Harm-Benefit Tradeoff

AI kan schade veroorzaken door fout-negatieven, fout-positieven, automatiseringsbias, vertraging, overdiagnose, privacyrisico’s of ongelijke prestaties tussen subgroepen. De vraag is niet of schade nul is, maar of de verhouding tussen voordeel en nadeel beter is dan bij huidige zorg. Transparantie over beperkingen, foutpatronen, onzekerheid en lokale validatie is daarom onderdeel van clinical utility.

## Prospectief En Gerandomiseerd Bewijs

Retrospectieve validatie is een begin, geen eindpunt. Voor implementatie zijn vaak prospectieve studies nodig: silent trials, workflowpilots, stepped-wedge designs, cluster-RCT’s of individuele RCT’s. Randomized/prospective evidence laat zien wat er gebeurt wanneer echte gebruikers, echte patiënten en echte tijdsdruk meespelen. Na implementatie blijft monitoring nodig voor drift, subgroepperformance, gebruik, veiligheid en veranderende zorgpaden.

## Praktische Checklist

- Is de beoogde klinische beslissing precies gedefinieerd?
- Is de doelgroep lokaal herkenbaar en valideerbaar?
- Zijn behandel-, verwijs- of monitoringsdrempels vooraf bepaald?
- Is de AI-output gekoppeld aan een concrete actie?
- Is performance extern en lokaal gevalideerd, inclusief calibratie en subgroepen?
- Laat DCA positieve net benefit zien binnen realistische drempels?
- Zijn patiëntuitkomsten of sterke surrogaatuitkomsten gemeten?
- Is workflowimpact getest met echte gebruikers?
- Zijn kosten, capaciteit en budgetimpact doorgerekend?
- Zijn schade, bias, foutanalyse en governance expliciet belegd?
- Is er een prospectief of gerandomiseerd evaluatieplan?
- Is er post-implementatie monitoring voor drift en veiligheid?

## Visualisatiepakket

**Figuurideeën**

1. “Van performance naar utility”: ladder van technische validatie naar beslissing, uitkomst, kosten en maatschappelijke waarde.  
2. Decision curve: AI versus standaardzorg, behandel-allen en behandel-niemand, met gemarkeerde klinisch redelijke drempelrange.  
3. Harm-benefit matrix: fout-positieven, fout-negatieven, capaciteit en patiëntimpact per drempel.  
4. Workflow-swimlane: zorgpad vóór en na AI, inclusief waar actie, vertraging of overdracht ontstaat.

**Interactieve component**

Een drempel-schuifregelaar: gebruiker past prevalentie, sensitiviteit, specificiteit, behandelrisico, capaciteit en kosten aan. Output: net benefit, fout-positieven/fout-negatieven per 1.000 patiënten, verwijzingen vermeden en budgetimpact.

**Zoekbronnen**

- PubMed Central / Nature open-access figuren: zoek “decision curve analysis net benefit prediction model figure”.  
- NICE ESF: zoek “NICE evidence standards framework digital health technologies budget impact tool”.  
- dcurves / Decision Curve Analysis: zoek “dcurves threshold probability net benefit”.  
- YouTube/NICE/MedCity: zoek “NICE Evidence Standards Framework for Digital Health Technologies” en “decision curve analysis net benefit tutorial”.

## Referenties

### Wetenschappelijke Bronnen

- Fryback & Thornbury, “The Efficacy of Diagnostic Imaging”, 1991. Reden: klassiek model voor technische, diagnostische, klinische en maatschappelijke waarde. DOI: https://doi.org/10.1177/0272989X9101100203  
- Vickers & Elkin, “Decision Curve Analysis”, 2006. Reden: basismethode voor net benefit en DCA. DOI: https://doi.org/10.1177/0272989X06295361  
- Vickers, van Calster & Steyerberg, “A simple, step-by-step guide to interpreting decision curve analysis”, 2019. Reden: praktische interpretatie van drempelkansen. DOI: https://doi.org/10.1186/s41512-019-0064-7  
- Plana et al., JAMA Network Open, “Randomized Clinical Trials of Machine Learning Interventions in Health Care”, 2022. Reden: overzicht van RCT-bewijs en beperkingen. DOI: https://doi.org/10.1001/jamanetworkopen.2022.33946  
- Zhou et al., npj Digital Medicine, “Clinical impact and quality of RCTs involving AI prediction tools”, 2021. Reden: nuance over klinisch effect versus modelbelofte. DOI: https://doi.org/10.1038/s41746-021-00524-2  
- El Arab & Al Moosa, npj Digital Medicine, “Systematic review of cost effectiveness and budget impact of AI in healthcare”, 2025. Reden: kosten, budgetimpact en contextafhankelijkheid. DOI: https://doi.org/10.1038/s41746-025-01722-y  

### Richtlijnen En Tools

- NICE, “Evidence standards framework for digital health technologies”, 2018, update 2022. Reden: evaluatie van performance, economische impact en deployment. URL: https://www.nice.org.uk/corporate/ecd7  
- DECIDE-AI, Nature Medicine, 2022. Reden: vroege klinische evaluatie en human factors. DOI: https://doi.org/10.1038/s41591-022-01772-9  
- CONSORT-AI, Nature Medicine, 2020. Reden: rapportage van klinische AI-trials. DOI: https://doi.org/10.1038/s41591-020-1034-x  
- TRIPOD+AI, BMJ, 2024. Reden: rapportage van predictiemodellen met AI/ML. DOI: https://doi.org/10.1136/bmj-2023-078378  
- PROBAST+AI, BMJ, 2025. Reden: bias, kwaliteit en toepasbaarheid van predictiemodellen. DOI: https://doi.org/10.1136/bmj-2024-082505  
- FDA/Health Canada/MHRA/IMDRF, Good Machine Learning Practice, 2021/2025. Reden: lifecycle, veiligheid en monitoring. URL: https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles  

### Visual, Video En Interactief

- dcurves R package, 2025. Reden: reproduceerbare DCA-visualisaties. URL: https://www.danieldsjoberg.com/dcurves/  
- NICE ESF video, MedCity/NICE, 2018. Reden: uitleg over bewijsstandaarden voor digitale zorg. URL: https://www.youtube.com/watch?v=_YObDegmZMo  
- STARD-AI, Nature Medicine, 2025. Reden: diagnostische AI-rapportage en figuurinspiratie voor studieflow. DOI: https://doi.org/10.1038/s41591-025-03953-8

---

<!-- bron: rollout-2026-05-04T00-45-38-019df004-c8b5-7830-b29e-ea240b51d947.jsonl  ts: 2026-05-03T22:47:17.351Z -->

# LLM’s in de zorg: slim hulpmiddel, geen automatische collega

## Korte intro

Large Language Models (LLM’s) kunnen in de zorg veel werk verlichten: consulten samenvatten, patiëntbrieven begrijpelijker maken, administratieve teksten voorbereiden, literatuur doorzoeken of triagevragen structureren. Maar dezelfde kracht maakt ze riskant. Een LLM klinkt vaak zeker, ook wanneer het model iets verzint, context mist of gevoelig reageert op kleine promptverschillen. Dit artikel is educatief bedoeld voor zorgprofessionals, bestuurders, AI-teams en onderzoekers. Het is geen medisch of juridisch advies.

## Wat LLM’s goed kunnen

De meest kansrijke toepassingen liggen waar taalwerk zwaar weegt, maar waar een mens eindverantwoordelijk blijft. Denk aan samenvattingen van dossiers, ontslagbrieven, administratieve codering, voorbereiding van verwijsbrieven, patiëntvriendelijke uitleg, scholing, onderzoeksassistentie en triage-ondersteuning. Bij triage moet het model echter nooit zelfstandig urgentie bepalen zonder klinische vangrails. Bij diagnostiek en behandeling geldt: een LLM kan helpen ordenen, alternatieven noemen of richtlijnpassages ophalen, maar mag geen autonome diagnose of behandeladvies geven.

## De technische valkuilen

Hallucinatie is het bekendste risico: het model genereert plausibele maar onjuiste informatie, zoals niet-bestaande richtlijnen, verkeerde doseringen of verzonnen bronverwijzingen. RAG, retrieval augmented generation, kan dit verminderen door het model antwoorden te laten baseren op gecontroleerde bronnen zoals lokale protocollen, NHG-richtlijnen of ziekenhuisdocumentatie. RAG lost het probleem niet op: slechte zoekresultaten, verouderde documenten of verkeerd geciteerde passages blijven mogelijk.

Prompt sensitivity betekent dat kleine wijzigingen in vraagstelling, volgorde of toon een ander antwoord kunnen opleveren. Daarom zijn vaste prompttemplates, versiebeheer en regressietests belangrijk. De context window is eveneens begrensd. Een model kan maar een bepaalde hoeveelheid tekst tegelijk verwerken en gebruikt lange context niet altijd robuust; relevante informatie “in het midden” kan onderbenut raken. Gebruik daarom samenvattingen met bronverwijzingen, chunking, prioritering en expliciete instructies om onzekerheid te melden.

## Privacy, PHI en logging

In Nederland vallen gezondheidsgegevens onder de AVG als bijzondere persoonsgegevens. De Amerikaanse term PHI, protected health information, is nuttig wanneer leveranciers of cloudproviders onder HIPAA-context opereren, maar vervangt de AVG niet. Voor ieder LLM-gebruik met patiëntdata zijn doelbinding, dataminimalisatie, grondslag, verwerkersafspraken, bewaartermijnen, toegangsbeheer en een DPIA belangrijk.

Logging is dubbel. Zonder logging kun je fouten, bias en incidenten niet onderzoeken. Met logging kun je juist extra privacyrisico creëren. Log daarom minimaal: modelversie, prompttemplate, tijdstip, gebruikerrol, bronset, output, menselijke correctie en incidentmarkering. Vermijd ruwe patiëntgegevens in logs waar dat niet strikt nodig is; gebruik pseudonimisering, encryptie en beperkte bewaartermijnen.

## Evaluatie, bias en uitlegbaarheid

Een LLM moet niet alleen “goed klinken”, maar meetbaar veilig en nuttig zijn. Evalueer per use case: feitelijke juistheid, volledigheid, brontrouw, leesbaarheid, tijdswinst, klinische veiligheid, fouttypes, gebruikersgedrag en impact op patiënten. Test ook op subgroepen: leeftijd, taalniveau, gender, migratieachtergrond, comorbiditeit en zeldzame aandoeningen. Bias ontstaat vaak door scheve trainingsdata, historische zorgverschillen of ongelijke representatie.

Explainability bij LLM’s betekent meestal niet dat je exact weet waarom elk woord is gegenereerd. Praktischer is: toon gebruikte bronnen, laat onzekerheden zien, markeer aannames, geef alternatieven en maak zichtbaar welke delen door een mens zijn aangepast.

## Clinical oversight: wie tekent waarvoor?

Een goede governance-vraag is niet “kan het model dit?”, maar “wie merkt het als het fout gaat?”. Leg vast wie eigenaar is van de use case, wie klinisch eindverantwoordelijk is, wanneer outputs verplicht gecontroleerd worden, wanneer het systeem stopt, en hoe incidenten worden gemeld. Voor diagnostiek, behandeling, medicatie, triage en beslisondersteuning is menselijke supervisie geen formaliteit maar een veiligheidsmechanisme.

## Praktische checklist

- Is de use case administratief, informatief of klinisch beslissend?
- Worden patiëntgegevens verwerkt, en is een DPIA uitgevoerd?
- Is duidelijk of AVG, beroepsgeheim, NEN/ISO-beleid, MDR/AI Act of HIPAA/PHI-afspraken relevant zijn?
- Is er een vaste prompttemplate met versiebeheer?
- Worden bronnen via RAG gecontroleerd, actueel gehouden en geciteerd?
- Is logging proportioneel, beveiligd en beperkt in bewaartermijn?
- Zijn hallucination, prompt sensitivity en context-window-fouten getest?
- Wordt bias per relevante patiëntgroep geëvalueerd?
- Is er klinische review vóór gebruik in zorgbeslissingen?
- Is duidelijk wat het systeem niet mag doen?

## Visualisatiepakket

Figuurideeën:
1. Risicoladder van LLM-use cases: administratie laag risico, patiëntcommunicatie middel, triage hoog, diagnose/behandeling zeer hoog.
2. RAG-flow: vraag → bronselectie → context → LLM-output → broncheck → menselijke validatie.
3. Privacykaart: prompt, modelprovider, logs, RAG-index, EPD-koppeling en bewaartermijnen.
4. Evaluatiematrix: accuraatheid, veiligheid, bias, uitlegbaarheid en workflow-impact.

Interactieve component:
Een “LLM-zorgcheck” waarin gebruikers een use case kiezen en direct zien welke controles nodig zijn: DPIA, RAG, logging, klinische validatie, bias-test en menselijke supervisie.

Afbeelding/video-zoekbronnen:
- WHO Media Centre; zoekterm: “WHO artificial intelligence health large multimodal models”.
- FDA AI-enabled medical devices list; zoekterm: “FDA AI enabled medical devices radiology list”.
- RSNA AI education/video archive; zoekterm: “RSNA artificial intelligence radiology workflow video”.
- OWASP GenAI Security Project; zoekterm: “OWASP LLM Top 10 prompt injection diagram”.

## Referenties

### Wetenschappelijke bronnen

- Liu et al., “Lost in the Middle: How Language Models Use Long Contexts”, TACL, 2024. Gebruikt voor context-window-risico. DOI: https://doi.org/10.1162/tacl_a_00638
- Lewis et al., “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks”, NeurIPS, 2020. Gebruikt voor RAG-uitleg. URL: https://arxiv.org/abs/2005.11401
- Haltaufderheide & Ranisch, “The ethics of ChatGPT in medicine and healthcare”, npj Digital Medicine, 2024. Gebruikt voor ethische risico’s. DOI: https://doi.org/10.1038/s41746-024-01157-x
- Celi et al., “Sources of bias in artificial intelligence that perpetuate healthcare disparities”, PLOS Digital Health, 2022. Gebruikt voor bias en gezondheidsverschillen. DOI: https://doi.org/10.1371/journal.pdig.0000022
- Tam et al., “A framework for human evaluation of large language models in healthcare”, npj Digital Medicine, 2024. Gebruikt voor evaluatiecriteria. URL: https://www.nature.com/articles/s41746-024-01258-7

### Richtlijnen en tools

- WHO, “Ethics and governance of artificial intelligence for health: guidance on large multi-modal models”, 2024. Gebruikt voor governance en risico’s. URL: https://www.who.int/news/item/18-01-2024-who-releases-ai-ethics-and-governance-guidance-for-large-multi-modal-models
- NIST, “AI Risk Management Framework 1.0”, 2023, en “Generative AI Profile”, 2024. Gebruikt voor risicomanagement. DOI: https://doi.org/10.6028/NIST.AI.100-1 en https://doi.org/10.6028/NIST.AI.600-1
- Europese Unie, “Regulation (EU) 2024/1689 Artificial Intelligence Act”, 2024. Gebruikt voor high-risk AI en menselijk toezicht. URL: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- Autoriteit Persoonsgegevens, “Data protection impact assessment”, actueel. Gebruikt voor DPIA/AVG. URL: https://autoriteitpersoonsgegevens.nl/themas/basis-avg/praktisch-avg/data-protection-impact-assessment-dpia
- OWASP, “Top 10 for Large Language Model Applications”, actueel. Gebruikt voor prompt injection, datalekken en overreliance. URL: https://owasp.org/www-project-top-10-for-large-language-model-applications

### Visual/video/interactieve bronnen

- FDA, “Artificial Intelligence-Enabled Medical Devices”. Voor datavisualisatie van gereguleerde AI-toepassingen. URL: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices
- RSNA, “Artificial Intelligence” en video-archief. Voor workflowbeelden in radiologie. URL: https://www.rsna.org/artificial-intelligence
- WHO, LMM-guidance nieuws- en mediapagina. Voor publieke gezondheidsvisuals. URL: https://www.who.int/news/item/18-01-2024-who-releases-ai-ethics-and-governance-guidance-for-large-multi-modal-models

---

<!-- bron: rollout-2026-05-04T00-45-38-019df004-c963-7191-aee9-237854311f6e.jsonl  ts: 2026-05-03T22:47:16.626Z -->

# RAG in de zorg: een uitlegbare brug tussen medische kennis en generatieve AI

## Korte intro
Retrieval augmented generation, meestal RAG genoemd, is een manier om generatieve AI te laten antwoorden met behulp van opgehaalde bronnen: richtlijnen, protocollen, formularia, literatuur, lokale werkafspraken of patiëntvrije kennisdocumenten. Voor medische toepassingen is dat aantrekkelijk, omdat zorgkennis snel verandert en beslissingen verantwoord moeten kunnen worden. RAG maakt een taalmodel echter niet automatisch “veilig” of klinisch juist. Het is een architectuur die brongebruik mogelijk maakt; de governance, evaluatie en menselijke controle bepalen of het bruikbaar is.

Dit artikel is educatief bedoeld en is geen medisch, juridisch of implementatieadvies.

## Wat RAG doet
Een klassiek taalmodel antwoordt vooral vanuit patronen die tijdens training zijn geleerd. Bij RAG krijgt het model eerst relevante passages uit een gecontroleerde kennisbank. Daarna formuleert het een antwoord op basis van die passages. In medische context kan de vraag bijvoorbeeld zijn: “Wat zegt ons protocol over antistolling rond een endoscopie?” Het systeem zoekt relevante tekstfragmenten, voegt die als context toe en vraagt het model om alleen daarop te antwoorden.

De kernbelofte is groundedness: een antwoord moet herleidbaar zijn tot concrete bronnen. Groundedness is sterker dan “klinkt logisch”; het betekent dat beweringen door de opgehaalde passages worden gedragen. Daarom hoort een medische RAG-output broncitatie te tonen: titel, versie/datum, paragraaf of passage, en liefst een link naar het brondocument.

## Embeddings, chunking en vector search
Om documenten vindbaar te maken, worden ze meestal opgeknipt in chunks: kleine tekstblokken van bijvoorbeeld enkele alinea’s. Die chunks krijgen embeddings: numerieke representaties van betekenis. Een vector search zoekt vervolgens chunks waarvan de embedding lijkt op de embedding van de vraag.

Dat werkt anders dan zoeken op exacte trefwoorden. Een vraag over “bloedverdunners” kan passages over “anticoagulantia” vinden. Dat is krachtig, maar ook riskant: semantisch nabije tekst is niet altijd klinisch relevant. Goed chunking-ontwerp is daarom cruciaal. Een chunk moet klein genoeg zijn om precies te zijn, maar groot genoeg om aanbeveling, uitzondering, populatie en contra-indicatie bij elkaar te houden. Voor richtlijnen zijn metadata vaak net zo belangrijk als de tekst: specialisme, doelgroep, publicatiedatum, autorisatie, revisiestatus, lokale geldigheid en bewijskracht.

## Richtlijnen, protocollen en updatebaarheid
Medische RAG-systemen zijn zo goed als hun corpus. Een kennisbank met oude pdf’s, dubbele protocollen en onduidelijke versies levert schijnzekerheid. Begin daarom met bronhiërarchie: lokale protocollen, nationale richtlijnen, formularia, patiënteninformatie en wetenschappelijke literatuur hebben elk een andere status. Leg vast wat voorgaat bij conflict. Bijvoorbeeld: “lokaal geautoriseerd protocol boven algemene tekst, tenzij expliciet verlopen.”

Updatebaarheid is een groot voordeel van RAG. Je hoeft het taalmodel niet opnieuw te trainen wanneer een richtlijn wijzigt; je vervangt of herindexeert de bron. Maar dat moet traceerbaar gebeuren: versiebeheer, indexdatum, changelog, automatische signalering van verlopen documenten en tests op bekende vragen na elke update.

## Hallucinaties blijven mogelijk
RAG vermindert hallucinaties, maar elimineert ze niet. Een model kan een bron verkeerd samenvatten, een ontbrekende aanbeveling invullen, citaties te breed gebruiken of conflicterende passages gladstrijken. Ook retrieval kan falen: het systeem haalt de verkeerde chunk op, mist een uitzondering of vindt alleen een oude versie.

Daarom moet een medische RAG-assistent kunnen weigeren: “Ik vind hiervoor geen voldoende bron in de kennisbank.” Dat is geen zwakte, maar een veiligheidsfunctie. Voor klinische beslissingen hoort het systeem ondersteunend te zijn, niet autonoom beslissend.

## Toegang, privacy en beveiliging
Niet elk document en niet elke vraag hoort voor iedereen beschikbaar te zijn. RAG voor zorg vraagt role-based access control: een OK-protocol, apotheekdocument of bestuursnotitie kan andere toegangsrechten hebben. Als patiëntgegevens worden gebruikt, gelden extra eisen rond dataminimalisatie, logging, bewaartermijnen, verwerkersafspraken, versleuteling en mogelijk scheiding tussen patiëntdata en algemene kennis.

Een belangrijk ontwerpprincipe: indexeer geen identificeerbare patiëntinformatie tenzij het use-case, toestemming/grondslag, beveiliging en governance expliciet zijn ingericht. Let ook op prompt injection in documenten: een kwaadwillende of vervuilde bron kan instructies bevatten zoals “negeer alle veiligheidsregels”. Documenten moeten dus als data worden behandeld, niet als vertrouwde instructies.

## Evaluatie: wat meet je?
Evalueer RAG op meerdere lagen. Retrievalkwaliteit: vindt het systeem de juiste bron bij bekende vragen? Antwoordkwaliteit: is het antwoord correct, volledig, begrijpelijk en passend bij de doelgroep? Citatiekwaliteit: ondersteunen de geciteerde passages echt de claims? Veiligheid: weigert het systeem bij onvoldoende bronmateriaal, buiten-scope vragen of conflicterende informatie?

Gebruik een testset met echte, geanonimiseerde kennisvragen uit kliniek, bibliotheek en beleid. Voeg failure modes toe: verouderde richtlijn, afkortingen, synoniemen, meertalige termen, zeldzame uitzonderingen, pediatrie versus volwassenen, lokaal versus landelijk protocol. Laat inhoudsdeskundigen blind beoordelen en monitor na livegang op feedback, incidenten en drift.

## Praktische checklist
- Is de bronhiërarchie vastgelegd, inclusief lokale protocollen versus externe richtlijnen?
- Heeft elke bron metadata: eigenaar, datum, versie, status, doelgroep en vervaldatum?
- Zijn chunks getest op behoud van klinische context, uitzonderingen en contra-indicaties?
- Toont elk antwoord broncitatie met passage of paragraaf?
- Kan het systeem onzekerheid tonen en weigeren bij onvoldoende bewijs?
- Worden retrieval, antwoord, citatie en gebruikersfeedback apart gelogd?
- Zijn privacy, toegangsrechten, verwerkersafspraken en audit trails ingericht?
- Is er een evaluatieset met bekende vragen en risicovolle randgevallen?
- Is er een procedure voor updates, herindexering en regressietests?
- Is duidelijk dat de output beslisondersteunend is en geen vervanging van professionele beoordeling?

## Belangrijkste failure modes
De gevaarlijkste fouten zijn niet altijd spectaculaire hallucinaties. Vaak gaat het om subtiele missers: een richtlijn voor de verkeerde populatie, een oud protocol, een ontbrekende contra-indicatie, een verkeerd geïnterpreteerde tabel, of een antwoord dat één bron citeert maar een bredere claim doet. Andere failure modes zijn OCR-fouten in pdf’s, afkortingen met meerdere betekenissen, bias naar veelvoorkomende documenten, en overmatige zekerheid in de toon.

## Visualisatiepakket
Figuurideeën:
1. Pipeline: vraag → embedding → vector search → retrieved chunks → LLM → antwoord met bronnen.
2. “Goede versus slechte chunk”: laat zien hoe een aanbeveling zonder uitzondering gevaarlijk incompleet wordt.
3. Bronhiërarchiekaart: lokaal protocol, nationale richtlijn, literatuur, patiëntinformatie.
4. Failure-mode matrix: retrievalfout, generatiefout, citatiefout, updatefout.

Interactieve component:
- Mini-demo waarin gebruikers chunkgrootte aanpassen en zien welke passages bij dezelfde klinische vraag worden opgehaald.

Afbeelding/video-zoekbronnen:
- CDC PHIL: zoek “clinical documentation”, “public health data”, “healthcare worker computer”; voorkeur voor officiële publieke gezondheidsbeelden.
- Wikimedia Commons / SMART Servier Medical Art: zoek “medical informatics”, “clinical decision support”, “healthcare AI”; voorkeur voor CC-gelicentieerde illustraties.
- IBM Technology video: zoek “What is Retrieval-Augmented Generation RAG IBM”; bruikbaar als algemene RAG-uitleg.
- TensorFlow Embedding Projector: zoek “embedding projector vector visualization”; bruikbaar voor interactieve uitleg van embeddings.

## Referenties

### Wetenschappelijke bronnen
- Lewis et al., “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks”, 2020. Basispublicatie voor RAG-concept. https://arxiv.org/abs/2005.11401  
- Zakka et al., “Almanac: Retrieval-Augmented Language Models for Clinical Medicine”, NEJM AI, 2024. Klinische toepassing van retrieval-augmented language models. DOI: 10.1056/aioa2300068  
- Kresevic et al., “Optimization of hepatological clinical guidelines interpretation by large language models”, npj Digital Medicine, 2024. Voorbeeld van RAG bij richtlijninterpretatie. DOI: 10.1038/s41746-024-01091-y  
- Azamfirei et al., “Large language models and the perils of their hallucinations”, Critical Care, 2023. Risico van hallucinaties in medische context. DOI: 10.1186/s13054-023-04393-x  

### Richtlijnen/tools
- WHO, “Ethics and governance of large multi-modal models”, 2024. Governance en risico’s van generatieve AI in gezondheid. https://www.who.int/news/item/18-01-2024-who-releases-ai-ethics-and-governance-guidance-for-large-multi-modal-models  
- NIST, “AI Risk Management Framework 1.0”, 2023. Risicomanagementkader voor AI-systemen. DOI: 10.6028/NIST.AI.100-1  
- NIST, “Generative AI Profile”, 2024. Specifieke risico’s van generatieve AI. DOI: 10.6028/NIST.AI.600-1  
- Federatie Medisch Specialisten, Richtlijnendatabase. Bronvoorkeur voor Nederlandse medisch-specialistische richtlijnen. https://demedischspecialist.nl/kennisinstituut/expertise/richtlijnen/richtlijnendatabase  
- NHG-Richtlijnen. Bronvoorkeur voor huisartsenzorg. https://richtlijnen.nhg.org/  

### Visual/video/interactief
- IBM, “What is Retrieval-Augmented Generation?” Algemene visuele uitleg van RAG. https://www.ibm.com/think/videos/rag  
- TensorFlow Embedding Projector. Interactieve visualisatie van embeddings. https://projector.tensorflow.org/  
- CDC Public Health Image Library. Publieke gezondheidsbeelden. https://phil.cdc.gov/  
- Wikimedia Commons SMART Servier Medical Art. CC-gelicentieerde medische illustraties. https://commons.wikimedia.org/wiki/Commons:SMART-Servier_Medical_Art

---

<!-- bron: rollout-2026-05-04T00-45-39-019df004-ca18-7d63-a61f-848a5c82018e.jsonl  ts: 2026-05-03T22:47:45.677Z -->

# Data leakage: de stille killer van AI-studies

Een AI-model met een AUC van 0,97 klinkt indrukwekkend. Totdat blijkt dat het model tijdens training of evaluatie stiekem informatie heeft gezien die in de echte klinische praktijk niet beschikbaar zou zijn. Dat is data leakage: een methodologische fout die prestaties op papier opblaast, maar vertrouwen in toepassing ondermijnt.

Dit conceptartikel is educatief bedoeld voor beoordeling van AI-literatuur. Het is geen medisch, juridisch of regulatorisch advies.

## Wat is data leakage?

Data leakage ontstaat wanneer informatie uit de toekomst, uit de testset, uit de labelprocedure of uit herhaalde metingen terechtkomt in de modelontwikkeling. Het verraderlijke is dat leakage vaak niet zichtbaar is aan de resultaten. Integendeel: het model lijkt juist uitzonderlijk goed.

Voor klinische AI is de kernvraag simpel: zou deze informatie beschikbaar zijn op het exacte moment waarop het model in de praktijk een voorspelling moet doen? Als het antwoord nee is, of twijfelachtig, is er risico op leakage.

## Waar gaat het mis?

**Train/test contamination** treedt op wanneer testdata direct of indirect worden gebruikt bij training, featureselectie, hyperparameter tuning, threshold-keuze of modelselectie. Ook herhaald “even kijken” naar de testset om keuzes bij te stellen is contaminatie. De testset is dan geen onafhankelijke toets meer, maar onderdeel van het ontwikkelproces.

**Patient-level leakage** is klassiek in medische datasets. Als meerdere opnames, beelden, slices of metingen van dezelfde patiënt over train en test worden verdeeld, leert het model patiëntspecifieke patronen in plaats van generaliseerbare ziekte-informatie. Bij beeldvorming kan dit gebeuren wanneer 2D-slices uit dezelfde CT-scan als losse observaties worden gesplitst.

**Duplicate images en records** versterken dit probleem. Publieke datasets bevatten soms identieke of bijna-identieke beelden, heruploads, afgeleide crops of augmented varianten. Als augmentatie vóór de split gebeurt, kunnen varianten van hetzelfde beeld in train en test belanden.

**Temporal leakage** ontstaat wanneer een willekeurige split over tijd wordt gebruikt terwijl het model later op toekomstige patiënten moet werken. Toekomstige behandelprotocollen, coderingspraktijken, laboratoriumassays of pandemiegolven kunnen dan onbedoeld in de training zitten. Een tijdgebaseerde validatie is vaak realistischer.

**Preprocessing leakage** is subtiel en veelvoorkomend. Normalisatie, imputatie, PCA, featureselectie, oversampling of tekstvectorisatie mogen niet op de volledige dataset worden “gefit”. Eerst splitsen, daarna alle preprocessing uitsluitend leren op de trainingsdata, bij voorkeur in een pipeline binnen cross-validatie.

**Label leakage** ontstaat wanneer predictors het label verraden. Denk aan een variabele “palliatief beleid” in een mortaliteitsmodel, een radiologieverslag dat de diagnose al noemt, een labaanvraag die alleen bij verdachte patiënten gebeurt, of een outcome die mede uit dezelfde bron is afgeleid als de predictor.

**Leakage via follow-up of behandeling** treedt op wanneer het model zogenaamd bij opname voorspelt, maar variabelen gebruikt die pas na behandeling, IC-opname, ontslag of latere follow-up beschikbaar zijn. Behandeling kan bovendien mediator zijn: het model leert dan de reactie van het zorgsysteem, niet het oorspronkelijke risico.

**Feature engineering** kan informatie verpakken. “Aantal dagen tot ontslag”, “laatste labwaarde tijdens opname”, “maximale zuurstofbehoefte” of “aantal controles na diagnose” lijken nette features, maar kunnen toekomstinformatie bevatten. Ook ziekenhuis-ID, scannerprotocol of metadata kunnen als proxy werken voor diagnose of zorgpad.

## Cross-validatie is geen vrijbrief

K-fold cross-validation beschermt niet automatisch tegen leakage. Row-level K-fold is ongeschikt bij herhaalde metingen per patiënt, multicenterdata of tijdsafhankelijke data. Gebruik waar passend GroupKFold op patiënt-, episode- of centrum-ID, tijdgescheiden validatie, en nested cross-validation voor hyperparameter tuning. De externe testset blijft gesloten tot het eind.

## Detectie en preventie

Begin met een index time: het klinische moment waarop de voorspelling wordt gedaan. Maak daarna een datalijn: welke variabele bestond vóór dit moment, welke erna, en wie kende het label?

Signalen van mogelijke leakage zijn verdacht hoge prestaties, grote kloof tussen interne en externe validatie, uitstekende performance met klinisch onwaarschijnlijke features, of modellen die goed scoren op metadata maar slecht op inhoud. Detectie kan met patiënt-ID-overlapchecks, hashing of perceptual hashing voor beelden, near-duplicate search, ablation studies, simpele baseline-modellen, random-label tests en externe validatie per tijdsperiode of centrum.

Preventie vraagt procesdiscipline: protocol vooraf vastleggen, split vóór preprocessing, testset locken, pipelines gebruiken, alle tuning binnen de trainingsdata houden, en de exacte partitions rapporteren. TRIPOD+AI helpt bij transparante rapportage van prediction models. PROBAST+AI helpt reviewers risico op bias en toepasbaarheid beoordelen. CLAIM is vooral relevant voor medische beeldvorming en vraagt expliciete rapportage over databronnen, preprocessing, partitions en interne/externe testing.

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

## Visualisatiepakket

**Figuurideeën**
1. “De lekke pijplijn”: schema van ruwe data, split, preprocessing, training en test, met rode pijlen waar informatie teruglekt.  
2. “Index-time muur”: tijdlijn van opname tot follow-up, met toegestane en verboden features.  
3. “Patiëntcluster-split”: één patiënt met meerdere scans/slices/records, correct gegroepeerd in één fold.  
4. “Metric mirage”: AUC intern versus extern vóór en na leakage-correctie.

**Interactieve component**  
Een kleine simulator waarin gebruikers toggles aanzetten: row-level split versus patient-level split, scaler vóór versus na split, toekomstfeature aan/uit, duplicaten aan/uit. De grafiek toont direct hoe interne AUC stijgt terwijl externe AUC daalt.

**Zoekbronnen en zoektermen**
- PubMed/PMC of Google Scholar, voorkeur voor peer-reviewed open access: “data leakage machine learning healthcare patient-level split”, “medical imaging AI duplicate leakage”.  
- BMJ, EQUATOR Network en RSNA, voorkeur voor richtlijnen: “TRIPOD+AI checklist”, “PROBAST+AI prediction model”, “CLAIM 2024 update”.  
- scikit-learn documentation, voorkeur voor preprocessing/pipeline-figuren: “data leakage preprocessing pipeline cross validation”.  
- YouTube of Google ML Education, alleen educatieve bronnen met codevoorbeelden: “target leakage train test contamination machine learning”, “Kaggle data leakage intermediate machine learning”.

## Referenties

**Wetenschappelijke bronnen**
- Kapoor S, Narayanan A. *Leakage and the reproducibility crisis in machine-learning-based science*. Patterns, 2023. Reden: taxonomie en reproduceerbaarheidsrisico’s van leakage. DOI: https://doi.org/10.1016/j.patter.2023.100804  
- Roberts M et al. *Common pitfalls and recommendations for using machine learning to detect and prognosticate for COVID-19 using chest radiographs and CT scans*. Nature Machine Intelligence, 2021. Reden: medische beeldvorming, patient-level splits, bias en validatieproblemen. DOI: https://doi.org/10.1038/s42256-021-00307-0  
- Andaur Navarro CL et al. *Risk of bias in studies on prediction models developed using supervised machine learning techniques*. BMJ, 2021. Reden: systematisch bewijs van bias in ML-prediction studies. DOI: https://doi.org/10.1136/bmj.n2281  
- Finlayson SG et al. *The Clinician and Dataset Shift in Artificial Intelligence*. New England Journal of Medicine, 2021. Reden: klinische context, tijdsverandering en implementatierisico’s. DOI: https://doi.org/10.1056/NEJMc2104626  

**Richtlijnen en tools**
- Collins GS et al. *TRIPOD+AI statement*. BMJ, 2024. Reden: rapportage van klinische prediction models met AI/ML. DOI: https://doi.org/10.1136/bmj-2023-078378  
- Moons KGM et al. *PROBAST+AI*. BMJ, 2025. Reden: beoordeling van kwaliteit, bias en toepasbaarheid. DOI: https://doi.org/10.1136/bmj-2024-082505  
- Tejani AS et al. *Checklist for Artificial Intelligence in Medical Imaging: CLAIM 2024 Update*. Radiology: Artificial Intelligence, 2024. Reden: rapportagechecklist voor AI in medische beeldvorming. DOI: https://doi.org/10.1148/ryai.240300; EQUATOR: https://www.equator-network.org/reporting-guidelines/checklist-for-artificial-intelligence-in-medical-imaging-claim-a-guide-for-authors-and-reviewers/  

**Visual/video/interactieve bronnen**
- scikit-learn. *Common pitfalls and recommended practices*. Reden: praktische voorbeelden van preprocessing leakage en pipelines. URL: https://scikit-learn.org/stable/common_pitfalls.html  
- Google for Developers. *Machine Learning Crash Course*. Reden: interactieve ML-uitleg en oefenmateriaal. URL: https://developers.google.com/machine-learning  
- Kaggle Learn. *Intermediate Machine Learning, Data Leakage*. Reden: toegankelijke oefenomgeving voor target leakage en train/test contamination. URL: https://www.kaggle.com/learn/intermediate-machine-learning

# Visualisatiepakketten (3)

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-10df-7b71-9ebb-e28cc2ad4519.jsonl  ts: 2026-05-03T22:41:01.906Z -->

## Visualisatiepakket

### Figuurideeën

1. **Beslisboom: valt deze AI onder MDR?**  
   Layout als verticale flowchart:  
   `AI/software` → `intended purpose?` → `medisch doel?` → `patiëntspecifieke analyse?` → `diagnose/therapie/monitoring/prognose?` → `MDR, IVDR of buiten scope`.  
   Gebruik kleurcodes: groen = waarschijnlijk buiten MDR, oranje = nader beoordelen, rood = waarschijnlijk MDSW.

2. **Rule 11-risicoladder**  
   Horizontale ladder met klassen `I`, `IIa`, `IIb`, `III`.  
   X-as: impact van verkeerde output.  
   Voorbeelden op de ladder: administratieve software → beslisondersteuning → sepsis-alarm → therapiebeslissing met risico op overlijden/onherstelbare schade.

3. **Lifecycle-cirkel voor AI-medical-device software**  
   Cirkelvormige infographic: `intended purpose` → `risicoklasse` → `klinische evaluatie` → `CE-markering` → `post-market surveillance` → `model update impact assessment` → terug naar klinische evaluatie.  
   Leg visueel de boodschap vast dat AI na CE-markering niet “klaar” is.

4. **Modulekaart van een EPD/AI-platform**  
   Blokdiagram met meerdere modules: planning, opslag, berichten, viewer, AI-diagnosemodule, alarmmodule.  
   Laat zien dat niet het hele platform automatisch MDR-software is, maar dat specifieke modules met medische claims wel MDSW kunnen zijn.

### Interactieve component

**MDR-screener als quiz/calculator**  
Een eenvoudige React-component of webformulier met 8-10 vragen:

- Heeft de software een medische claim?
- Worden patiëntspecifieke gegevens gebruikt?
- Geeft de software diagnose-, prognose-, monitoring- of therapie-informatie?
- Stuurt of beïnvloedt de software een medisch hulpmiddel?
- Worden specimens/labdata geïnterpreteerd?
- Wat is het mogelijke gevolg van een foutieve output?
- Wordt de software commercieel beschikbaar gesteld of klinisch ingezet?

Output: `waarschijnlijk buiten MDR`, `mogelijk MDR/IVDR: specialistisch beoordelen`, `waarschijnlijk MDSW`, of `mogelijk IVDR`.  
Plaats er duidelijk bij: educatief hulpmiddel, geen juridisch advies en geen formele classificatie.

Geschikte vorm: **quiz + beslisboom + risicoladder**. Voor dit onderwerp is een calculator/passende checklist sterker dan een simulatie.

### Afbeeldingen of video’s om op te zoeken

1. **Europese Commissie / MDCG infographic**  
   Zoekterm: `European Commission is your software a medical device infographic MDCG`  
   Voorkeur: officiële Europese Commissie-pagina of PDF.

2. **IMDRF SaMD clinical evaluation schema**  
   Zoekterm: `IMDRF SaMD clinical evaluation valid clinical association analytical validation clinical validation figure`  
   Bruikbaar voor een eigen, Nederlandstalige hertekening van de drie bewijsblokken.

3. **MDR Rule 11 educational explainer**  
   Zoekterm: `MDR Rule 11 software medical device classification explainer notified body`  
   Voorkeur: notified bodies, Europese regulatoren, universiteiten of erkende medtech-opleiders.

4. **AI medical device lifecycle / post-market monitoring**  
   Zoekterm: `AI medical device post-market surveillance model update clinical evaluation`  
   Zoek bij voorkeur naar educatieve webinars of slides van Europese toezichthouders, MDCG-gerelateerde presentaties, IMDRF of gerenommeerde notified bodies.

### Aanbevolen visuele vorm

Een **infographic** met beslisboom en Rule 11-ladder past het best bij het artikel. Voor online publicatie zou ik daarnaast een kleine **React quiz/calculator** maken: snel, praktisch en precies geschikt voor product owners en klinische teams die willen inschatten wanneer regulatory expertise nodig is.

---

<!-- bron: rollout-2026-05-04T00-38-18-019deffe-117d-7472-bf6e-2897a7ccd005.jsonl  ts: 2026-05-03T22:40:50.888Z -->

## Visualisatiepakket

**Figuurideeën**

1. **Beslisboom: “Wanneer wordt AI een medisch hulpmiddel?”**  
   Layout als eenvoudige yes/no-flow: `AI-model` -> `medische claim?` -> `gericht op individuele patiënt?` -> `diagnose/therapie/monitoring/prognose?` -> `SaMD/MDSW of onderdeel van hulpmiddel?`. Eindpunten: “waarschijnlijk buiten MDR/FDA-device scope”, “mogelijk SaMD/MDSW”, “vraag regulatory dossier op”. Dit leent zich goed voor een eenvoudige SVG of React-component.

2. **Vergelijkende routekaart EU versus VS**  
   Twee kolommen naast elkaar. Links: `intended purpose` -> `MDR/IVDR classificatie` -> `notified body indien nodig` -> `CE-markering` -> `post-market surveillance`. Rechts: `intended use` -> `device classification/pathway` -> `510(k), De Novo of PMA` -> `FDA clearance/authorization/approval` -> `post-market controls`. Gebruik kleur alleen om routes te onderscheiden, niet om “beter/slechter” te suggereren.

3. **Lifecycle-loop voor AI-modellen**  
   Circulaire infographic: `ontwikkeling` -> `validatie` -> `premarket review/CE` -> `klinische implementatie` -> `monitoring van drift, bias en incidenten` -> `gecontroleerde update` -> terug naar `validatie`. Voeg aparte labels toe voor “PCCP” aan FDA-kant en “significante wijziging/notified body” aan EU-kant.

4. **Risicomatrix voor klinische impact**  
   X-as: rol van de AI-output, van “informeert” naar “stuurt diagnose/therapie”. Y-as: mogelijke schade bij fout, van “laag” naar “ernstig/onherstelbaar/overlijden”. Plaats voorbeeldclaims in vakken, zoals “administratieve samenvatting”, “triage-alert”, “therapiedosering”, “autonome detectie kritiek beeld”. Duidelijk vermelden: illustratief, geen formele classificatie.

**Interactieve component**

Een **“claim-checker” quiz of mini-calculator** past goed: de gebruiker beantwoordt 6 vragen over een leverancierclaim, bijvoorbeeld: medische claim ja/nee, individuele patiënt ja/nee, diagnose/therapie ja/nee, autonome beslissing ja/nee, updatebaar model ja/nee, FDA/CE-bewijs beschikbaar ja/nee. Output: geen juridisch oordeel, maar een risicosignaal met vragen die men aan de leverancier moet stellen. Geschikt als React-component met radio buttons en een samenvattende checklist.

**Afbeeldingen/video’s om op te zoeken of te gebruiken**

- Zoekterm: `FDA AI-enabled medical devices list`  
  Bronvoorkeur: officiële FDA-pagina met de AI-enabled medical devices list: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices

- Zoekterm: `FDA Software as a Medical Device SaMD examples`  
  Bronvoorkeur: FDA Digital Health Center of Excellence of FDA SaMD-pagina’s: https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd

- Zoekterm: `MDCG 2019-11 medical device software Rule 11 MDR`  
  Bronvoorkeur: Europese Commissie/MDCG-documenten over softwareclassificatie: https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en

- Zoekterm: `IMDRF SaMD risk categorization framework diagram`  
  Bronvoorkeur: IMDRF-documenten over SaMD-definities en risicocategorisatie: https://www.imdrf.org/working-groups/software-medical-device-samd

---

<!-- bron: rollout-2026-05-04T00-38-19-019deffe-12fe-7b31-9a4b-c4ef30992b88.jsonl  ts: 2026-05-03T22:40:32.285Z -->

## Visualisatiepakket

**Figuurideeën die we zelf kunnen maken**

1. **Implementatietrap van klinische AI**  
   Horizontale flow van links naar rechts: `retrospective validation` → `silent trial / shadow mode` → `pilot` → `live deployment` → `post-market monitoring`.  
   Per stap: doel, zichtbaarheid voor clinici, invloed op zorgbesluit, belangrijkste risico’s en go/no-go criteria. Dit werkt goed als eenvoudige infographic of SVG/React component.

2. **Beslismatrix: wanneer mag je door naar de volgende fase?**  
   Tabel of heatmap met rijen zoals performance, calibratie, datakwaliteit, workflowfit, logging, incidentproces, menselijke verantwoordelijkheid en stopcriteria. Kolommen: retrospectief, shadow mode, pilot, live.  
   Gebruik kleurcodering: rood = blocker, oranje = nader onderzoek, groen = akkoord. Past goed als checklist-infographic.

3. **Monitoringdashboard na live deployment**  
   Mock-up van een dashboard met vier panelen: technische status, modelperformance, driftindicatoren en klinische veiligheidssignalen.  
   Mogelijke assen: tijd op de x-as; alertvolume, missing data, calibratie-afwijking of false positive rate op de y-as. Dit maakt duidelijk dat AI-monitoring meer is dan “model draait/niet draait”.

4. **Incident- en stopcriteria-flow**  
   Flowchart: signaal uit monitoring of clinician report → triage → ernstclassificatie → tijdelijke mitigatie → root-cause analyse → besluit: door, aanpassen, pauzeren of stoppen.  
   Benadruk dat stopcriteria vooraf zijn vastgesteld en niet pas tijdens een incident worden bedacht.

**Interactieve component**

Een **“deployment readiness simulator”** past hier sterk. De gebruiker kiest per fase waarden of toggles, bijvoorbeeld: externe validatie gedaan, silent trial afgerond, logging compleet, subgroup performance acceptabel, incidentproces getest, rollback beschikbaar. De component toont vervolgens: `niet klaar`, `klaar voor silent trial`, `klaar voor pilot` of `klaar voor gecontroleerde live deployment`.  
Vorm: interactieve React-checklist, slider of kleine calculator. Voeg expliciet toe dat de uitkomst educatief is en geen medisch, juridisch of regulatoir oordeel vervangt.

**Afbeeldingen of video’s om op te zoeken/gebruiken**

1. Zoekterm: `FDA Good Machine Learning Practice medical device AI lifecycle monitoring`  
   Bronvoorkeur: FDA of IMDRF. Geschikt voor visuals rond lifecycle management, monitoring en modelwijzigingen.

2. Zoekterm: `WHO ethics governance artificial intelligence health human oversight`  
   Bronvoorkeur: WHO. Geschikt voor illustraties of citaten rond menselijke verantwoordelijkheid, transparantie en governance.

3. Zoekterm: `NICE evidence standards framework digital health technologies evaluation`  
   Bronvoorkeur: NICE. Bruikbaar voor visuals over bewijsniveaus, evaluatie en implementatie van digitale gezondheidstechnologie.

4. Zoekterm: `clinical AI silent trial shadow mode workflow diagram`  
   Bronvoorkeur: peer-reviewed artikelen, universitaire ziekenhuizen of academische AI-centra. Gebruik dit vooral als inspiratie; maak bij voorkeur een eigen vereenvoudigde infographic om auteursrecht en contextproblemen te vermijden.

Een korte **quiz** kan ook passend zijn, bijvoorbeeld: “Is deze situatie retrospectieve validatie, shadow mode, pilot of live deployment?” Dat helpt implementatieteams de fasen scherp te onderscheiden zonder te suggereren dat één quiz een governancebesluit kan vervangen.

# Controle Agent reviews (2)

<!-- bron: rollout-2026-05-04T00-53-08-019df00b-a576-7741-aad5-0e69d2bf3970.jsonl  ts: 2026-05-03T22:54:49.089Z -->

**Controle Agent A Review**

Beperking: ik zie volledige drafts voor o.a. bias/fairness, MDR, externe validatie, silent trial, workflow, clinical utility, LLM, RAG en data leakage. Drafts 1-4 zie ik alleen via samenvatting/titel, en enkele latere agents hebben “geen draft afgerond”; die kan ik dus niet inhoudelijk volledig beoordelen.

**1. Hoogste Prioriteit Bevindingen**

De grootste veiligheidsedit is regulatoir taalgebruik. Maak overal expliciet onderscheid tussen:  
`wetgeving` zoals MDR/IVDR, AI Act en AVG/GDPR; `guidance` zoals MDCG, FDA GMLP, FDA transparency, NICE ESF; `reporting guidelines` zoals TRIPOD+AI, CONSORT-AI, CLAIM en DECIDE-AI; en `risk-of-bias tools` zoals PROBAST+AI. Dit moet consequent terugkomen.

Voor MDR/CE/FDA/AI Act: vermijd zinnen die klinken als juridisch advies. Formuleer steeds: “kan onder MDR vallen afhankelijk van intended purpose”, “laat dit beoordelen door regulatory/legal experts”, “FDA clearance/authorization/approval hangt af van pathway”. Niet alles wat medische AI is, is automatisch hetzelfde type gereguleerd product.

AI Act-claims moeten genuanceerd: high-risk onder artikel 6 geldt o.a. wanneer het AI-systeem zelf een product is of safety component van een product onder Annex I-wetgeving én derdepartij-conformiteitsbeoordeling nodig is. Niet schrijven alsof alle medische AI automatisch high-risk is.

Visuals/images/videos: heel goed idee, maar publicatieveiligheid vraagt bron/licentie per visual. Gebruik bij voorkeur eigen SVG/React-figuren, interactieve simulaties met fictieve data, of officiële/CC/public-domain bronnen. Geen journal figures kopiëren tenzij licentie dat toelaat; bij “adapted from” bron en licentie vermelden.

LLM/RAG-artikelen moeten extra duidelijk zeggen: RAG vermindert hallucinaties maar bewijst geen klinische juistheid. Bronverwijzingen kunnen fout of misleidend zijn. Bij patiëntspecifieke output kan het systeem richting clinical decision support/medical-device beoordeling gaan.

**2. Artikel-Specifieke Opmerkingen**

1-4: volledige tekst niet zichtbaar. Let erop dat “10 minuten beoordelen” als snelle triage wordt gepresenteerd, niet als volledige methodologische beoordeling. Bij AUC en calibratie: AUC is discriminatie, geen kans op juistheid; calibratie is noodzakelijk maar geen bewijs van clinical utility.

Bias/fairness: sterk concept. Voeg toe dat subgroepanalyse met gevoelige gegevens juridisch/ethisch zorgvuldig moet gebeuren onder AVG. Pas op met “andere drempels per groep”; dat vereist klinische, ethische en juridische onderbouwing.

MDR-artikel: belangrijkste edit. “CE-markering is nodig voordat…” is te absoluut zonder nuance rond onderzoek, in-house gebruik en precieze marktintroductie/ingebruikname. Voeg toe dat MDCG guidance niet juridisch bindend is. Rule 11 is correct als kern, maar classificatie blijft case-specific.

Externe validatie: goed. Voeg minimaal toe: event count/sample size, model lock vóór validatie, vooraf gespecificeerde analyse, confidence intervals, en dat lokale recalibratie opnieuw gevalideerd moet worden.

Silent trial/shadow mode: goed, maar schrijf niet alsof “geen klinische invloed” betekent “geen governance nodig”. Ook silent trials kunnen DPIA, informatiebeveiliging, ethische toetsing/lokale toestemming en logging-afspraken vereisen.

Workflow-artikel: sterk. Zinnen als “AI faalt meestal…” iets verzachten naar “AI strandt vaak…”. Voeg human factors/usability en lokale EPD-context toe.

Clinical utility: goed. Decision curve analysis niet presenteren als bewijs van patiëntuitkomst, maar als besliskundige evaluatie. Prospectieve/gerandomiseerde evaluatie is vooral nodig bij hogere risico’s of workflow-impact.

LLM-artikel: goed genuanceerd. Voeg toe: geen patiëntdata in publieke modellen; modelversies kunnen wijzigen; logging kan zelf gezondheidsdata bevatten; patiëntspecifieke klinische output kan MDR/AI Act/AVG-vragen oproepen.

RAG-artikel: goed. Voeg sterker toe: retrieval failure, verkeerde citaties, verouderde documenten en conflicterende richtlijnen zijn kernrisico’s. Een RAG-systeem moet kunnen weigeren.

Data leakage: sterk. Voeg foundation-model/benchmark contamination toe, plus device/site metadata leakage bij beeldvorming.

**3. Redactionele Veiligheidsregels**

Elke publicatie krijgt een korte disclaimer: educatief, geen medisch/juridisch advies, niet gebruiken voor individuele patiëntbeslissingen.

Elke referentielijst splitsen in: wetenschappelijke bronnen, reporting/risk-of-bias tools, regulatoire/juridische bronnen, en visual/video/interactieve bronnen. Vermeld DOI/URL, versie/datum en liefst geraadpleegd op datum.

Gebruik modaliteit: “kan”, “waarschijnlijk”, “afhankelijk van intended purpose/context”, “vereist lokale beoordeling”. Vermijd “valt altijd onder”, “is veilig”, “bewijst”, “garandeert”.

Voor interactieve onderdelen: fictieve data, duidelijke simulatie-labels, geen upload van patiëntdata, geen diagnostische output.

Belangrijke verificatiebronnen: MDR Rule 11 op EUR-Lex, EU AI Act artikel 6 op EUR-Lex, MDCG 2019-11 Rev.1, FDA GMLP/transparency/PCCP guidance, TRIPOD+AI, PROBAST+AI, CONSORT-AI en DECIDE-AI.

---

<!-- bron: rollout-2026-05-04T00-53-18-019df00b-cecc-7d42-bf94-e6272baaa0bd.jsonl  ts: 2026-05-03T22:54:06.171Z -->

**Controle Agent C Review**

Beperking: volledige drafts 1-4 zie ik hier niet, alleen via samenvatting. Dus voor `10-minuten AI-artikel beoordelen`, `interne vs externe validatie`, `AUC`, en `calibratie` kan ik alleen controleren dat ze thematisch sterk zijn, niet of hun visualisatiepakket al compleet is.

**1. Visuals Die Sterk Zijn**

- `AI als medisch hulpmiddel / MDR`: sterkste visual package. Beslisboom, Rule 11-ladder, lifecycle-cirkel en claim-checker zijn concreet en goed bouwbaar.
- `Data leakage`: heel geschikt voor interactieve uitleg. De “lekkende pijplijn”, index-time muur en simulator met toggles zijn precies het soort visuals dat complexe ML-fouten begrijpelijk maakt.
- `Clinical utility`: decision curve + drempel-schuifregelaar is hoogwaardig en klinisch relevant. Dit kan een kernfeature van de hub worden.
- `RAG in de zorg`: pipeline + chunking-demo is sterk. Vooral “goede vs slechte chunk” maakt het tastbaar.
- `Workflow-falen`: swimlane, timingkaart en alert fatigue funnel zijn praktisch en passen goed bij implementatie-artikelen.
- `LLM’s in de zorg`: risicoladder en privacykaart zijn bruikbaar, maar moeten iets concreter worden gemaakt met echte use cases.

**2. Visuals Die Nog Te Vaag Zijn**

- `Bias en fairness`: mist zichtbaar visualisatiepakket. Nodig: subgroup-performance heatmap, fairness tradeoff diagram, label-bias keten, calibratie per subgroep.
- `Externe validatie`: mist zichtbaar visualisatiepakket. Nodig: “extern is niet altijd extern”-matrix, train/test/temporal split schema, calibration plot voorbeeld, transportability kaart.
- `Silent trial / shadow mode`: mist zichtbaar visualisatiepakket. Nodig: implementatiefase-tijdlijn, monitoring dashboard mockup, stopcriteria matrix, audit-log flow.
- `LLM’s`: image/video zoekbronnen zijn deels te breed. Maak liever eigen figuren; externe beelden alleen als ondersteunend.
- `RAG`: IBM/TensorFlow bronnen zijn betrouwbaar voor algemene uitleg, maar medische RAG moet vooral eigen visuals gebruiken met broncitatie naar richtlijnen/protocollen.
- Artikelen 1-4: onzeker. Vooral `AUC` en `calibratie` móéten interactieve visuals krijgen, anders blijft het te abstract.

**3. Top 5 Interactieve Componenten Om Te Prioriteren**

1. **AUC / threshold playground**  
   Zoals Google ML Course: slider voor drempelwaarde, live ROC-curve, confusion matrix, sensitiviteit/specificiteit/PPV/NPV.

2. **Calibratie simulator**  
   Laat zien dat twee modellen dezelfde AUC kunnen hebben maar verschillend gekalibreerd zijn. Met calibration plot en “voorspeld risico vs werkelijk risico”.

3. **Clinical utility / decision curve calculator**  
   Slider voor prevalentie, drempelrisico, sensitiviteit/specificiteit en foutkosten. Output: net benefit en aantallen per 1.000 patiënten.

4. **Data leakage simulator**  
   Toggles: patient-level split aan/uit, scaler vóór split, future feature, duplicate images. Laat interne AUC kunstmatig stijgen en externe performance dalen.

5. **MDR / AI claim-checker**  
   Quiz: medische claim, patiëntspecifieke data, diagnose/therapie, mogelijke schade, updatebaar model. Output: “waarschijnlijk buiten MDR”, “mogelijk MDSW”, “regulatory review nodig”.

Daarna als zesde: **RAG chunking-demo**, omdat die visueel prachtig wordt en goed past bij LLM-artikelen.

**4. Standaard Visual-Template Voor Toekomstige Artikelen**

Elk artikel krijgt voortaan standaard:

- **Hero visual**: eigen gemaakte afbeelding of abstracte medische/AI illustratie, geen generieke stockfoto.
- **Kernfiguur**: één hoofdconcept als diagram, flowchart, matrix, tijdlijn of curve.
- **Mini-interactie**: slider, quiz, simulator, toggle-demo of klikbare beslisboom.
- **Praktijkvisual**: checklist, workflow-swimlane, dashboardmockup of “wat vraag je aan leverancier?” kaart.
- **Bronblok per visual**: bij elke figuur vermelden waarop deze is gebaseerd.
- **Image policy**: primaire bronnen eerst: FDA, EU/MDCG, WHO, NICE, NIST, EQUATOR, PubMed/PMC, officiële onderwijsbronnen. Externe afbeeldingen alleen gebruiken als licentie duidelijk is; anders zelf maken.
- **Caption-stijl**: korte uitleg + “waarom dit klinisch uitmaakt”.

Kort oordeel: de reeks heeft inhoudelijk veel body, maar de controle moet nu afdwingen dat elk artikel minimaal één eigen kernfiguur én één interactieve uitleg krijgt. Vooral AUC, calibratie, leakage en clinical utility kunnen echt onderscheidend worden.
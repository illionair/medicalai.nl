---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
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

## Interactieve module

```html
<interactive name="auc-playground"></interactive>
```


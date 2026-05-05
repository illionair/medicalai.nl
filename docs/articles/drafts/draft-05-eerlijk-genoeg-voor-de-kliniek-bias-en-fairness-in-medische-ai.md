---
status: draft
title: "Eerlijk genoeg? Bias in medische AI"
seoTitle: "Eerlijk genoeg voor de kliniek? Bias en fairness in medische AI"
subtitle: "Waarom een hoge AUROC niets zegt over wie het model in de steek laat"
difficulty: middel
readingMinutes: 9
coverConcept: scale-balance
---

# Eerlijk genoeg? Bias in medische AI

Medische AI wordt vaak beoordeeld op gemiddelde prestaties: AUROC, sensitiviteit, specificiteit, F1-score. Maar een model kan indrukwekkend scoren in de totale populatie en tegelijk slechter werken voor ouderen, vrouwen, mensen met een donkere huid, patiënten met multimorbiditeit, of een ziekenhuis met andere apparatuur en werkprocessen.

<tldr>
<li>Bias zit niet alleen in de data, maar in de hele keten: dataverzameling, labels, metingen, validatie, implementatie en klinische gevolgen.</li>
<li>Subgroep-prestaties zijn geen extra — een totaalscore kan grote verschillen maskeren.</li>
<li>Fairness-metrics maken ongelijkheid zichtbaar, maar kiezen geen ethisch of klinisch doel voor je.</li>
</tldr>

Dit artikel is educatief bedoeld en is geen juridisch of medisch advies.

## Bias is geen enkelvoudig probleem

**Datasetbias** ontstaat wanneer de ontwikkel- of validatieset niet lijkt op de beoogde klinische populatie. Denk aan een model dat vooral is getraind op academische centra, volwassenen, een specifieke scannerfabrikant of patiënten met complete dossiers.

In Nederland en België kan dit extra relevant zijn bij regionale verschillen in zorgpaden, verwijspatronen, codering, etniciteitsregistratie en sociaaleconomische context.

**Labelbias** zit in de uitkomstdefinitie. AI leert niet "de waarheid", maar het label dat onderzoekers kiezen: diagnosecodes, declaraties, behandelbeslissingen, radiologieverslagen of expertconsensus. Als bestaande zorg ongelijk is, kan het label die ongelijkheid kopiëren.

<callout type="case" title="Casus: Obermeyer et al. (Science 2019)">
<p>Een Amerikaans populatiemanagementalgoritme dat ruim 200 miljoen mensen affecteerde gebruikte historische zorgkosten als proxy voor ziektebehoefte. Omdat zwarte patiënten bij vergelijkbare ziektelast structureel mínder zorg krijgen, schatte het model hun behoefte stelselmatig te laag in.</p>
<p>Resultaat: bij gelijke risico-score waren zwarte patiënten gemiddeld <strong>zieker</strong> dan witte. Het aandeel zwarte patiënten dat in extra zorgprogramma's werd opgenomen, halveerde bijna door deze proxy-keuze.</p>
</callout>

**Measurement bias** ontstaat wanneer metingen systematisch verschillen tussen groepen of settings. Apparaten, protocollen, meetfrequentie, ontbrekende waarden en laboratoriumaanvragen zijn zelden neutraal. Een patiënt die vaker wordt gemonitord, produceert meer data; een patiënt bij wie bepaalde testen minder vaak worden aangevraagd, lijkt mogelijk "gezonder" in het dossier.

**<term def="Vertekening doordat het ziekte-ernste-spectrum in de studie niet overeenkomt met de praktijk — bv. alleen duidelijke gevallen versus gezonde controles, terwijl de praktijk vol zit met grensgevallen.">Spectrum bias</term>** betekent dat het ziekte- of ernstespectrum in de studie niet overeenkomt met de praktijk. Een model dat is gevalideerd op duidelijke casussen en gezonde controles kan falen bij vroege ziekte, comorbiditeit, atypische presentatie of patiënten op de grens van een klinische beslissing.

## Kijk voorbij gemiddelde performance

Subgroup performance is geen optionele extra. Een totaalscore kan grote verschillen maskeren. Vraag daarom naar prestaties per relevante subgroep: leeftijd, geslacht, zwangerschap, huidskleur waar relevant voor beeld of sensoriek, taal, sociaaleconomische status, migratieachtergrond, comorbiditeit, centrumtype, scanner/protocol en zorgsetting.

Niet elke subgroepanalyse is zinvol of statistisch betrouwbaar; kleine aantallen geven brede onzekerheidsintervallen. Maar "te weinig data" is geen reden om fairness te negeren. Het is juist een bevinding: de veiligheid en toepasbaarheid zijn dan onzeker.

Let ook op <term def="Mate waarin voorspelde kansen overeenkomen met werkelijke uitkomstpercentages — een risico van 20% moet ongeveer hetzelfde betekenen voor verschillende patiëntgroepen.">calibratie</term> binnen subgroepen. Een risico van 20% moet ongeveer hetzelfde betekenen voor verschillende patiëntgroepen. Een model kan dezelfde AUROC hebben, maar bij één groep risico structureel overschatten en bij een andere groep onderschatten. Dat heeft directe gevolgen voor triage, behandeling en geruststelling.

<interactive name="fairness-audit-simulator"></interactive>

<keytakeaway>Een model met identieke AUROC kan voor de ene groep veilig en voor de andere systematisch fout zijn. Subgroep-rapportage is geen extra — het is de kerntoets.</keytakeaway>

## Fairness metrics: nuttig, maar niet waardenvrij

Fairness metrics maken ongelijkheid zichtbaar, maar kiezen geen ethisch of klinisch doel voor je. Veelgebruikte maten zijn onder meer gelijke sensitiviteit tussen groepen, gelijke specificiteit, gelijke fout-positieve of fout-negatieve percentages, <term def="Predictive parity — bij gelijke modelvoorspelling moeten werkelijke uitkomstpercentages tussen groepen gelijk zijn (gelijke PPV).">predictive parity</term> en calibratie per groep.

Bij ongelijke prevalentie kunnen deze criteria met elkaar botsen: een model kan niet altijd tegelijk perfect gekalibreerd zijn en gelijke foutpercentages hebben.

Daarom begint fairness niet met een formule, maar met de klinische vraag. Bij een sepsiswaarschuwing kan een gemiste diagnose zwaarder wegen dan een fout alarm; bij screening kan overdiagnostiek juist grote schade geven. Fairness betekent dan niet automatisch identieke drempels voor iedereen, maar wel expliciete keuzes, onderbouwde drempels, transparante foutanalyse en monitoring na implementatie.

## Klinische impact: wie draagt de schade?

Bias wordt pas echt belangrijk in de workflow. Een model met ongelijke fout-negatieven kan betekenen dat één groep later behandeling krijgt. Ongelijke fout-positieven kunnen leiden tot onnodige diagnostiek, angst, straling, kosten of wachttijd.

Ook kan AI bestaande verschillen versterken: afdelingen met meer capaciteit profiteren sneller, terwijl kwetsbare groepen juist minder toegang hebben tot vervolgzorg.

Beoordeel daarom niet alleen modelperformance, maar ook de beslisketen: wie ziet de output, hoe wordt die geïnterpreteerd, welke actie volgt, is er menselijk toezicht, en worden afwijkingen gelogd? Een AI-tool die "slechts adviseert" kan in de praktijk toch sterk sturen.

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

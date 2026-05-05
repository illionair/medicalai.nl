---
status: draft
source: codex-recovered-articles.md
recovered: 2026-05-04
needs_review: true
---

<!-- bron: rollout-2026-05-04T00-45-38-019df004-c828-7841-94bf-27cf4eec8867.jsonl  ts: 2026-05-03T22:48:07.522Z -->

# Van AUC naar echte winst: wanneer helpt AI in de kliniek?

## Intro

Een AI-model kan indrukwekkend scoren op AUROC, sensitiviteit of F1-score en toch weinig betekenen voor patiënten, professionals of capaciteit. Het lijkt op het kiezen van een drempel bij een screeningstest: een betere test is pas nuttig als de gekozen drempel leidt tot betere beslissingen. Clinical utility vraagt daarom niet: “Is het model goed?”, maar: “Worden beslissingen beter wanneer we dit model gebruiken?” Dat verschil is cruciaal voor klinische onderzoekers, zorgprofessionals en beslissers die willen bepalen of AI meerwaarde heeft boven huidige zorg. Dit artikel is educatief bedoeld en is geen medisch, juridisch of inkoopadvies.

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

## Interactieve module

```html
<interactive name="clinical-utility-calculator"></interactive>
```


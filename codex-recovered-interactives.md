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
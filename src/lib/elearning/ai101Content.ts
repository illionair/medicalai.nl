export type Ai101Level = "B1" | "B2";

export type Ai101StatusTone =
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "danger";

export type Ai101RuleKind = "allowed" | "askFirst" | "notAllowed";

export type Ai101QuizOption = {
    id: string;
    label: string;
    isCorrect: boolean;
    feedback: string;
};

export type Ai101QuizQuestion = {
    id: string;
    question: string;
    options: Ai101QuizOption[];
    correctFeedback: string;
    incorrectFeedback: string;
};

export type Ai101CaseStep = {
    id: string;
    title: string;
    situation: string;
    goodAction: string;
    why: string;
    reflectionPrompt: string;
};

export type Ai101Rule = {
    id: string;
    kind: Ai101RuleKind;
    label: string;
    plainText: string;
    why: string;
    example: string;
};

export type Ai101Lesson = {
    id: string;
    title: string;
    durationMinutes: number;
    level: Ai101Level;
    summary: string;
    learningGoals: string[];
    keyMessage: string;
    explainers: {
        title: string;
        body: string;
    }[];
    rules: Ai101Rule[];
    cases: Ai101CaseStep[];
    quiz: Ai101QuizQuestion[];
};

export type Ai101Module = {
    id: string;
    title: string;
    subtitle: string;
    audience: string;
    lessons: Ai101Lesson[];
};

export const ai101VisualLabels = {
    allowed: {
        text: "Mag meestal",
        tone: "success",
        short: "OK",
    },
    askFirst: {
        text: "Eerst checken",
        tone: "warning",
        short: "Check",
    },
    notAllowed: {
        text: "Niet invoeren",
        tone: "danger",
        short: "Stop",
    },
    humanReview: {
        text: "Mens beslist",
        tone: "info",
        short: "Review",
    },
    patientData: {
        text: "Patientgegevens",
        tone: "danger",
        short: "Privacy",
    },
    conceptOnly: {
        text: "Alleen concept",
        tone: "neutral",
        short: "Concept",
    },
} satisfies Record<
    string,
    { text: string; tone: Ai101StatusTone; short: string }
>;

export const ai101Microcopy = {
    buttons: {
        start: "Start de les",
        continue: "Verder",
        back: "Terug",
        showAnswer: "Bekijk uitleg",
        retry: "Probeer opnieuw",
        saveProgress: "Voortgang opslaan",
        finishModule: "Rond module af",
        openCase: "Open casus",
        checkPrompt: "Check mijn prompt",
    },
    statuses: {
        notStarted: "Nog niet gestart",
        inProgress: "Je bent bezig",
        completed: "Afgerond",
        needsReview: "Bespreek dit met je team",
        safePrompt: "Deze prompt lijkt veilig geformuleerd",
        unsafePrompt: "Pas op: hier staat mogelijk herleidbare informatie in",
        saved: "Opgeslagen",
        saving: "Bezig met opslaan...",
    },
    hints: {
        anonymize: "Laat namen, geboortedata, nummers en unieke details weg.",
        verify: "Controleer AI-output altijd met je eigen kennis, bron en protocol.",
        policy: "Twijfel je? Gebruik het beleid van je organisatie als leidraad.",
        role: "Geef AI een duidelijke taak, maar laat de beslissing bij de professional.",
    },
    emptyStates: {
        noAnswerYet: "Kies een antwoord om feedback te zien.",
        noCaseSelected: "Kies een casus om te oefenen.",
        noProgress: "Je voortgang verschijnt hier zodra je start.",
    },
} as const;

export const ai101Content = {
    id: "ai-101-zorgprofessionals",
    title: "AI 101 voor zorgprofessionals",
    subtitle: "ChatGPT en AI veilig, praktisch en begrijpelijk op de werkvloer",
    languageLevel: "B1/B2",
    intro:
        "Deze e-learning helpt zorgprofessionals om AI-tools zoals ChatGPT verstandig te gebruiken. De toon is praktisch: wat kan helpen, wat mag niet, en waar moet je zelf blijven nadenken?",
    promise:
        "Na afloop kun je betere prompts schrijven, privacyrisico's herkennen en AI-output kritisch beoordelen voordat je iets gebruikt in je werk.",
    modules: [
        {
            id: "basis",
            title: "Module 1: Wat is AI eigenlijk?",
            subtitle: "Een gewone uitleg zonder technische mist",
            audience: "Alle zorgprofessionals, ook zonder technische voorkennis",
            lessons: [
                {
                    id: "wat-is-chatgpt",
                    title: "ChatGPT in gewone taal",
                    durationMinutes: 8,
                    level: "B1",
                    summary:
                        "ChatGPT voorspelt tekst op basis van patronen. Het begrijpt taal goed genoeg om nuttig te zijn, maar het weet niet vanzelf wat waar, actueel of passend is.",
                    learningGoals: [
                        "Je kunt uitleggen wat ChatGPT wel en niet doet.",
                        "Je herkent waarom AI soms overtuigend klinkt maar toch fout kan zijn.",
                        "Je weet waarom een mens altijd moet controleren.",
                    ],
                    keyMessage:
                        "AI is een hulpmiddel voor denken en schrijven, geen collega die verantwoordelijkheid overneemt.",
                    explainers: [
                        {
                            title: "Waarom klinkt AI zo zeker?",
                            body:
                                "ChatGPT maakt zinnen die waarschijnlijk passen bij je vraag. Het kan daardoor heel zeker klinken, ook als de inhoud niet klopt. Zie de output daarom als een concept, niet als bewijs.",
                        },
                        {
                            title: "Wat betekent dit voor zorgwerk?",
                            body:
                                "In de zorg kunnen kleine fouten grote gevolgen hebben. Gebruik AI daarom vooral voor lage-risicotaken, zoals tekst structureren, uitleg vereenvoudigen of brainstormen. Controleer altijd zelf.",
                        },
                    ],
                    rules: [
                        {
                            id: "wel-samenvatten-zonder-data",
                            kind: "allowed",
                            label: "Mag meestal",
                            plainText:
                                "Je mag algemene tekst laten samenvatten als er geen herleidbare patientinformatie in staat.",
                            why:
                                "Er wordt geen informatie gedeeld waarmee iemand herkend kan worden.",
                            example:
                                "Vat deze openbare richtlijn samen in 5 punten voor een teamoverleg.",
                        },
                        {
                            id: "niet-diagnose-laten-beslissen",
                            kind: "notAllowed",
                            label: "Niet doen",
                            plainText:
                                "Laat ChatGPT geen diagnose, triagebesluit of behandelkeuze nemen.",
                            why:
                                "AI kan fouten maken, mist context en draagt geen professionele verantwoordelijkheid.",
                            example:
                                "Wat heeft deze patient en welke behandeling moet ik starten?",
                        },
                    ],
                    cases: [
                        {
                            id: "teamuitleg",
                            title: "Casus: uitleg voor een teamoverleg",
                            situation:
                                "Je wilt collega's uitleggen wat generatieve AI is. Je hebt geen patientinformatie nodig.",
                            goodAction:
                                "Vraag om een korte uitleg in B1-taal en controleer of de uitleg klopt.",
                            why:
                                "Dit is een laag-risicotaak. De output helpt bij communicatie, maar jij blijft verantwoordelijk voor de inhoud.",
                            reflectionPrompt:
                                "Welke zin uit de AI-output zou jij aanpassen zodat die beter past bij jouw team?",
                        },
                    ],
                    quiz: [
                        {
                            id: "zeker-klinken",
                            question:
                                "Waarom moet je AI-output controleren, ook als de tekst professioneel klinkt?",
                            options: [
                                {
                                    id: "a",
                                    label:
                                        "Omdat AI overtuigende tekst kan maken die toch onjuist is.",
                                    isCorrect: true,
                                    feedback:
                                        "Klopt. De toon zegt niets over de betrouwbaarheid van de inhoud.",
                                },
                                {
                                    id: "b",
                                    label:
                                        "Omdat AI alleen Engels begrijpt en Nederlands altijd fout gaat.",
                                    isCorrect: false,
                                    feedback:
                                        "Niet helemaal. AI kan Nederlands verwerken, maar betrouwbaarheid blijft een aandachtspunt.",
                                },
                                {
                                    id: "c",
                                    label:
                                        "Omdat AI nooit nuttig is voor zorgprofessionals.",
                                    isCorrect: false,
                                    feedback:
                                        "Dat is te streng. AI kan nuttig zijn, vooral bij ondersteunende taken.",
                                },
                            ],
                            correctFeedback:
                                "Goed gezien. Professioneel taalgebruik is geen kwaliteitskeurmerk.",
                            incorrectFeedback:
                                "Kijk nog eens naar het verschil tussen goed klinkende tekst en betrouwbare inhoud.",
                        },
                    ],
                },
            ],
        },
        {
            id: "privacy-veiligheid",
            title: "Module 2: Privacy en veiligheid",
            subtitle: "Waarom sommige informatie nooit in een publieke AI-tool hoort",
            audience: "Zorgprofessionals die AI willen gebruiken in dagelijkse taken",
            lessons: [
                {
                    id: "patientgegevens",
                    title: "Patientgegevens: wat mag wel en niet?",
                    durationMinutes: 12,
                    level: "B1",
                    summary:
                        "Herleidbare informatie hoort niet in ChatGPT of andere publieke AI-tools. Ook losse details kunnen samen naar een persoon wijzen.",
                    learningGoals: [
                        "Je herkent directe en indirecte patientgegevens.",
                        "Je kunt uitleggen waarom anonimiseren lastig is.",
                        "Je kiest een veilig alternatief voor gevoelige casussen.",
                    ],
                    keyMessage:
                        "Als iemand mogelijk te herkennen is, voer je de informatie niet in.",
                    explainers: [
                        {
                            title: "Direct herleidbaar",
                            body:
                                "Denk aan naam, geboortedatum, adres, telefoonnummer, BSN, patientnummer of foto. Dit mag niet in een publieke AI-tool.",
                        },
                        {
                            title: "Indirect herleidbaar",
                            body:
                                "Ook details zoals zeldzame aandoening, kleine woonplaats, datum van opname of bijzondere combinatie van klachten kunnen iemand herkenbaar maken.",
                        },
                        {
                            title: "Waarom beleid belangrijk is",
                            body:
                                "Elke organisatie kan andere afspraken hebben over goedgekeurde AI-tools. Gebruik alleen tools en werkwijzen die passen bij lokaal beleid, AVG, beroepsgeheim en informatiebeveiliging.",
                        },
                    ],
                    rules: [
                        {
                            id: "algemene-vraag",
                            kind: "allowed",
                            label: "Mag meestal",
                            plainText:
                                "Stel algemene vragen zonder gegevens over een echte patient.",
                            why:
                                "De vraag gaat over kennis of communicatie, niet over een herkenbare persoon.",
                            example:
                                "Leg in eenvoudige taal uit wat een MRI-scan is.",
                        },
                        {
                            id: "geanonimiseerde-casus-checken",
                            kind: "askFirst",
                            label: "Eerst checken",
                            plainText:
                                "Gebruik een fictieve of sterk aangepaste casus alleen als je organisatie dit toestaat.",
                            why:
                                "Anonimiseren is moeilijk. Een combinatie van details kan alsnog herkenbaar zijn.",
                            example:
                                "Een volwassen patient met veelvoorkomende klachten, zonder datum, locatie of unieke details.",
                        },
                        {
                            id: "echte-patientdata",
                            kind: "notAllowed",
                            label: "Niet invoeren",
                            plainText:
                                "Voer geen namen, nummers, datums, brieven, labuitslagen of verslagen van echte patienten in.",
                            why:
                                "Dit kan privacy, beroepsgeheim en vertrouwen schaden.",
                            example:
                                "Maak een samenvatting van dit ontslagverslag met naam en geboortedatum.",
                        },
                    ],
                    cases: [
                        {
                            id: "ontslagbrief",
                            title: "Casus: ontslagbrief begrijpelijk maken",
                            situation:
                                "Je wilt een ontslagbrief eenvoudiger formuleren voor een patient. De brief bevat naam, opnameperiode, diagnose en medicatie.",
                            goodAction:
                                "Gebruik geen echte brief in ChatGPT. Maak zelf een algemene prompt, bijvoorbeeld: 'Schrijf een voorbeeldtekst in B1-taal over medicatie-instructies na ontslag.'",
                            why:
                                "Je krijgt hulp bij formuleren zonder echte patientgegevens te delen.",
                            reflectionPrompt:
                                "Welke gegevens uit de originele brief zouden iemand herkenbaar kunnen maken?",
                        },
                        {
                            id: "zeldzame-aandoening",
                            title: "Casus: zeldzame aandoening in een kleine regio",
                            situation:
                                "Je beschrijft geen naam, maar wel leeftijd, woonplaats, diagnose en datum van opname.",
                            goodAction:
                                "Laat de casus weg of maak hem duidelijk fictief en algemener. Check lokaal beleid als je twijfelt.",
                            why:
                                "Ook zonder naam kan de combinatie van details herleidbaar zijn.",
                            reflectionPrompt:
                                "Welke details kun je weglaten zonder je leervraag te verliezen?",
                        },
                    ],
                    quiz: [
                        {
                            id: "indirect-herleidbaar",
                            question:
                                "Welke situatie is het meest risicovol voor privacy?",
                            options: [
                                {
                                    id: "a",
                                    label:
                                        "Een algemene vraag: 'Leg diabetes type 2 uit in B1-taal.'",
                                    isCorrect: false,
                                    feedback:
                                        "Dit is meestal laag risico, omdat er geen echte patient in voorkomt.",
                                },
                                {
                                    id: "b",
                                    label:
                                        "Een casus zonder naam, maar met zeldzame diagnose, leeftijd, woonplaats en opnamedatum.",
                                    isCorrect: true,
                                    feedback:
                                        "Juist. Deze combinatie kan alsnog naar een persoon wijzen.",
                                },
                                {
                                    id: "c",
                                    label:
                                        "Een vraag om ideeen voor een scholingsposter over handhygiene.",
                                    isCorrect: false,
                                    feedback:
                                        "Dit is meestal geschikt, zolang er geen echte personen of interne gevoelige informatie in staan.",
                                },
                            ],
                            correctFeedback:
                                "Goed. Privacy gaat ook over combinaties van gegevens.",
                            incorrectFeedback:
                                "Let vooral op indirecte herkenbaarheid: losse details kunnen samen gevoelig worden.",
                        },
                    ],
                },
            ],
        },
        {
            id: "praktisch-gebruik",
            title: "Module 3: Goed prompten op de werkvloer",
            subtitle: "Duidelijke vragen stellen en nuttige output krijgen",
            audience: "Teams die AI willen inzetten voor ondersteunende taken",
            lessons: [
                {
                    id: "goede-prompt",
                    title: "Van vage vraag naar bruikbare prompt",
                    durationMinutes: 10,
                    level: "B1",
                    summary:
                        "Een goede prompt zegt wat je wilt, voor wie het is, welke toon past en welke grenzen gelden.",
                    learningGoals: [
                        "Je bouwt een veilige prompt zonder patientgegevens.",
                        "Je vraagt om een concept, checklist of uitleg in passend taalniveau.",
                        "Je benoemt dat AI geen medisch besluit mag nemen.",
                    ],
                    keyMessage:
                        "Hoe duidelijker de opdracht, hoe bruikbaarder het concept. Maar de controle blijft bij jou.",
                    explainers: [
                        {
                            title: "Een simpele promptformule",
                            body:
                                "Gebruik: taak + doelgroep + context zonder patientdata + gewenste vorm + grens. Bijvoorbeeld: 'Maak een korte checklist voor verpleegkundigen over voorbereiding op een polibezoek. Gebruik B1-taal. Geef geen medisch advies.'",
                        },
                        {
                            title: "Vraag om onzekerheid",
                            body:
                                "Laat AI aangeven waar aannames zitten. Vraag bijvoorbeeld: 'Noem ook wat je niet zeker weet en welke punten ik moet controleren.'",
                        },
                    ],
                    rules: [
                        {
                            id: "concepttekst",
                            kind: "allowed",
                            label: "Mag meestal",
                            plainText:
                                "Gebruik AI voor eerste concepten van algemene patientinformatie, teammails of checklists.",
                            why:
                                "Dit ondersteunt communicatie en organisatie, zolang je zelf controleert.",
                            example:
                                "Maak een eerste versie van een korte uitleg over bloeddruk meten thuis.",
                        },
                        {
                            id: "interne-protocollen",
                            kind: "askFirst",
                            label: "Eerst checken",
                            plainText:
                                "Vraag beleid na voordat je interne protocollen, contracten of niet-openbare documenten invoert.",
                            why:
                                "Ook zonder patientgegevens kan informatie vertrouwelijk zijn.",
                            example:
                                "Vat dit interne escalatieprotocol samen voor nieuwe medewerkers.",
                        },
                        {
                            id: "blind-overnemen",
                            kind: "notAllowed",
                            label: "Niet doen",
                            plainText:
                                "Neem AI-tekst niet blind over in patientcommunicatie, verslaglegging of beleid.",
                            why:
                                "De tekst kan feitelijke fouten, ongepaste toon of ontbrekende waarschuwingen bevatten.",
                            example:
                                "Stuur deze AI-tekst direct naar alle patienten zonder controle.",
                        },
                    ],
                    cases: [
                        {
                            id: "patientfolder",
                            title: "Casus: patientfolder herschrijven",
                            situation:
                                "Een folder is te moeilijk geschreven. Je wilt B1-taal, maar de medische inhoud moet blijven kloppen.",
                            goodAction:
                                "Laat AI een concept maken op basis van algemene, niet-herleidbare tekst. Controleer daarna medische juistheid, toon en lokale afspraken.",
                            why:
                                "AI kan taal vereenvoudigen, maar kan ook nuance verliezen.",
                            reflectionPrompt:
                                "Welke zinnen moet een inhoudsdeskundige altijd controleren voordat de folder online gaat?",
                        },
                    ],
                    quiz: [
                        {
                            id: "prompt-onderdeel",
                            question:
                                "Welke prompt is het meest geschikt voor veilig werkgebruik?",
                            options: [
                                {
                                    id: "a",
                                    label:
                                        "Schrijf een diagnose voor mijn patient op basis van deze brief.",
                                    isCorrect: false,
                                    feedback:
                                        "Deze prompt deelt waarschijnlijk patientgegevens en vraagt om een medisch besluit.",
                                },
                                {
                                    id: "b",
                                    label:
                                        "Maak een B1-concepttekst over voorbereiding op een bloedafname. Gebruik geen individuele casus.",
                                    isCorrect: true,
                                    feedback:
                                        "Goed. De taak, doelgroep en grens zijn duidelijk en er staan geen patientgegevens in.",
                                },
                                {
                                    id: "c",
                                    label:
                                        "Maak dit interne protocol korter; ik plak het hieronder volledig.",
                                    isCorrect: false,
                                    feedback:
                                        "Dit kan vertrouwelijke interne informatie bevatten. Check eerst het beleid.",
                                },
                            ],
                            correctFeedback:
                                "Sterk. Een veilige prompt is concreet en deelt geen gevoelige gegevens.",
                            incorrectFeedback:
                                "Kijk naar twee dingen: staat er gevoelige informatie in en vraagt de prompt om een besluit?",
                        },
                    ],
                },
            ],
        },
        {
            id: "kritisch-beoordelen",
            title: "Module 4: AI-output beoordelen",
            subtitle: "Van mooi antwoord naar verantwoord gebruik",
            audience: "Zorgprofessionals die AI-output willen toepassen of delen",
            lessons: [
                {
                    id: "controlelijst",
                    title: "De 5 checks voor gebruik",
                    durationMinutes: 9,
                    level: "B2",
                    summary:
                        "Voordat je AI-output gebruikt, check je inhoud, bron, privacy, toon en verantwoordelijkheid.",
                    learningGoals: [
                        "Je gebruikt een vaste controlelijst voor AI-output.",
                        "Je herkent ontbrekende bronnen en hallucinerende details.",
                        "Je bepaalt wanneer overleg met een collega nodig is.",
                    ],
                    keyMessage:
                        "AI-output is pas bruikbaar na menselijke controle en professionele afweging.",
                    explainers: [
                        {
                            title: "De vijf checks",
                            body:
                                "Controleer: 1. klopt de inhoud, 2. past het bij richtlijn of lokaal protocol, 3. staan er geen gevoelige gegevens in, 4. is de toon passend, 5. is duidelijk wie verantwoordelijk is.",
                        },
                        {
                            title: "Wanneer extra voorzichtig?",
                            body:
                                "Wees extra voorzichtig bij medicatie, dosering, triage, diagnostiek, kwetsbare groepen, juridische tekst en situaties met hoge tijdsdruk.",
                        },
                    ],
                    rules: [
                        {
                            id: "checklist-gebruiken",
                            kind: "allowed",
                            label: "Mag meestal",
                            plainText:
                                "Gebruik een vaste checklist voordat je AI-output opslaat, verstuurt of deelt.",
                            why:
                                "Een vaste controle voorkomt dat je alleen op de nette formulering vertrouwt.",
                            example:
                                "Ik controleer deze tekst op inhoud, bron, privacy, toon en verantwoordelijkheid.",
                        },
                        {
                            id: "collega-laten-meekijken",
                            kind: "askFirst",
                            label: "Eerst checken",
                            plainText:
                                "Laat een collega meekijken bij gevoelige, nieuwe of organisatiebrede AI-output.",
                            why:
                                "Een tweede blik verkleint de kans op fouten en blinde vlekken.",
                            example:
                                "Deze tekst gaat naar alle patienten van de afdeling; wil jij meekijken?",
                        },
                        {
                            id: "ai-als-bron",
                            kind: "notAllowed",
                            label: "Niet doen",
                            plainText:
                                "Gebruik ChatGPT niet als enige bron voor medische, juridische of beleidsmatige informatie.",
                            why:
                                "AI kan bronnen verzinnen, verouderde informatie geven of context missen.",
                            example:
                                "ChatGPT zegt dat dit de nieuwste richtlijn is, dus we nemen het over.",
                        },
                    ],
                    cases: [
                        {
                            id: "medicatie-uitleg",
                            title: "Casus: uitleg over medicatie",
                            situation:
                                "AI schrijft een begrijpelijke tekst over bijwerkingen. De tekst klinkt goed, maar noemt geen bron.",
                            goodAction:
                                "Controleer de informatie in actuele, betrouwbare bronnen en pas de tekst aan volgens lokaal beleid.",
                            why:
                                "Bij medicatie kan foutieve of onvolledige informatie direct schade geven.",
                            reflectionPrompt:
                                "Welke onderdelen van de tekst moet je controleren voordat je hem gebruikt?",
                        },
                    ],
                    quiz: [
                        {
                            id: "broncontrole",
                            question:
                                "Wat doe je als ChatGPT een medische uitleg geeft zonder betrouwbare bron?",
                            options: [
                                {
                                    id: "a",
                                    label:
                                        "Gebruiken als de tekst duidelijk en professioneel klinkt.",
                                    isCorrect: false,
                                    feedback:
                                        "Een duidelijke toon is niet genoeg. Controleer altijd de inhoud.",
                                },
                                {
                                    id: "b",
                                    label:
                                        "Controleren met richtlijn, protocol of betrouwbare bron voordat je de tekst gebruikt.",
                                    isCorrect: true,
                                    feedback:
                                        "Juist. De broncontrole hoort bij verantwoord gebruik.",
                                },
                                {
                                    id: "c",
                                    label:
                                        "Alleen de laatste zin verwijderen en daarna versturen.",
                                    isCorrect: false,
                                    feedback:
                                        "Dat lost het probleem niet op. De hele inhoud moet gecontroleerd worden.",
                                },
                            ],
                            correctFeedback:
                                "Precies. AI helpt met formuleren, maar bronnen geven onderbouwing.",
                            incorrectFeedback:
                                "Denk aan de vijf checks: inhoud en bron komen voor toon en snelheid.",
                        },
                    ],
                },
            ],
        },
    ],
} satisfies {
    id: string;
    title: string;
    subtitle: string;
    languageLevel: string;
    intro: string;
    promise: string;
    modules: Ai101Module[];
};

export type Ai101Content = typeof ai101Content;

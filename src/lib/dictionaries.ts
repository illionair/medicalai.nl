export type Locale = "nl" | "en";

export const dictionary = {
    en: {
        nav: {
            hub: "Hub",
            publications: "Publications",
            topics: "Topics",
            authors: "Authors",
            guidelines: "Guidelines",
            subscribe: "Subscribe",
            about: "About",
            contact: "Contact",
            login: "Login",
        },
        hero: {
            title_prefix: "Medical",
            title_highlight: "AI",
            description: "Everything the healthcare professional needs to know about AI",
            read_latest: "Discover",
            about_us: "Our Mission",
            contact: "Contact",
        },
        about: {
            title: "About Medical AI",
            intro: "Medical-AI.nl is an independent knowledge platform that supports healthcare professionals in understanding, assessing, and responsibly applying artificial intelligence in healthcare. The rise of AI models in diagnostics, triage, decision support, and process optimization requires clear, reliable, and clinically relevant information.",
            mission: "We analyze AI models, scientific publications, and technical documentation, and translate these into insights usable in practice. We focus on questions central to healthcare professionals, such as:",
            questions: [
                "What is the clinical added value of an AI model?",
                "How was the study conducted and how reliable are the results?",
                "Which limitations are relevant for my patient population?",
                "What is known about bias, safety, regulations, and privacy?",
                "What does integration into existing care processes look like?"
            ],
            principles_title: "Our approach is based on three principles:",
            principles: [
                {
                    title: "Transparency",
                    desc: "We explicitly describe the underlying evidence, relevant guidelines (such as MDR), validation studies, and known limitations."
                },
                {
                    title: "Objectivity",
                    desc: "We have no commercial interests in specific vendors or technologies. Our content is focused on facts, clinical applicability, and scientific substantiation."
                },
                {
                    title: "Accessibility",
                    desc: "We translate complex AI technology into understandable, clinically usable information, so healthcare professionals can make informed decisions."
                }
            ],
            goal: "The goal of Medical-AI.nl is to provide a clear, current, and independent overview of relevant AI developments in healthcare. We aim to contribute to the responsible use of AI systems and a better understanding of their possibilities, risks, and preconditions."
        },
        footer: {
            about_summary: "Independent knowledge platform for responsible AI in healthcare.",
            quick_links: "Quick Links",
            legal: "© 2026 Medical AI. All rights reserved.",
            privacy: "Privacy Policy",
            terms: "Terms of Service"
        },
        privacy: {
            title: "Privacy Policy",
            last_updated: "Last updated: December 3, 2025",
            intro: "Medical-AI.nl respects your privacy. This policy describes how we handle data.",
            sections: [
                {
                    heading: "1. Data Collection",
                    content: "We do not collect personal data from visitors unless you voluntarily provide it (e.g., via a contact form). We use minimal cookies for website functionality."
                },
                {
                    heading: "2. Usage",
                    content: "Any data provided is used solely for communication purposes and is never shared with third parties without consent."
                },
                {
                    heading: "3. Your Rights",
                    content: "You have the right to access, correct, or delete any personal data we hold about you. Contact us for requests."
                }
            ]
        },
        terms: {
            title: "Terms of Service",
            last_updated: "Last updated: December 3, 2025",
            intro: "By using Medical-AI.nl, you agree to these terms. Please read them carefully.",
            sections: [
                {
                    heading: "1. Disclaimer of Liability",
                    content: "The content on Medical-AI.nl is for informational and educational purposes only. It does not constitute medical advice, diagnosis, or treatment. While we strive for accuracy, we make no warranties regarding the completeness, reliability, or accuracy of the information. Medical-AI.nl and its authors are not liable for any decisions made or actions taken based on the information provided on this site. Users must always critically evaluate the information and consult official guidelines and qualified professionals."
                },
                {
                    heading: "2. Intellectual Property",
                    content: "All content on this website, including text, graphics, and logos, is the property of Medical-AI.nl unless otherwise stated. Unauthorized use or reproduction is prohibited."
                },
                {
                    heading: "3. External Links",
                    content: "This website may contain links to external sites. We are not responsible for the content or practices of these third-party websites."
                }
            ]
        },
        blog: {
            latest_research: "Latest Research",
            latest_desc: "Explore the most recent breakthroughs in medical artificial intelligence, summarized for clinical relevance.",
            no_blogs: "No blogs published yet.",
        },
        hub: {
            eyebrow: "Knowledge Center",
            title: "Educational Hub",
            subtitle: "Advance your clinical expertise with curated research, intelligent insights, and upcoming seminars.",
            latest_research: "Latest Research",
            view_all: "View archive",
            featured_title: "Featured articles",
            featured_description: "Start with the newest clinically relevant publications and summaries.",
            coming_soon_title: "AI 101 for Clinicians",
            coming_soon_description: "A comprehensive masterclass demystifying machine-learning applications in daily clinical practice.",
            coming_soon_label: "Coming soon",
            elearning_title: "AI 101 for Clinicians",
            elearning_body: "A comprehensive masterclass demystifying machine-learning applications in daily clinical practice.",
            notify_me: "Notify Me",
            categories_title: "Browse by category",
            categories_description: "Explore the core themes that shape responsible AI adoption in healthcare.",
            topics_title: "Topics",
            no_articles: "No articles published yet.",
            no_blogs: "No blogs published yet.",
            read_more: "Read article",
            articles_count: (n: number) => `${n} ${n === 1 ? "article" : "articles"}`,
        },
        topics: {
            topic: "Topic",
        }
    },
    nl: {
        nav: {
            hub: "Hub",
            publications: "Publicaties",
            topics: "Onderwerpen",
            authors: "Auteurs",
            guidelines: "Richtlijnen",
            subscribe: "Abonneren",
            about: "Over Ons",
            contact: "Contact",
            login: "Inloggen",
        },
        hero: {
            title_prefix: "Medical",
            title_highlight: "AI",
            description: "Alles wat de zorgprofessional moet weten over AI",
            read_latest: "Ontdek",
            about_us: "Onze missie",
            contact: "Contact",
        },
        about: {
            title: "Over Medical AI",
            intro: "Medical-AI.nl is een onafhankelijk kennisplatform dat zorgprofessionals ondersteunt bij het begrijpen, beoordelen en verantwoord toepassen van kunstmatige intelligentie in de zorg. De opkomst van AI-modellen in diagnostiek, triage, besluitondersteuning en procesoptimalisatie vraagt om duidelijke, betrouwbare en klinisch relevante informatie.",
            mission: "Wij analyseren AI-modellen, wetenschappelijke publicaties en technische documentatie, en vertalen deze naar inzichten die bruikbaar zijn in de praktijk. Daarbij richten wij ons op vragen die voor zorgprofessionals centraal staan, zoals:",
            questions: [
                "Wat is de klinische meerwaarde van een AI-model?",
                "Hoe is de studie uitgevoerd en hoe betrouwbaar zijn de resultaten?",
                "Welke beperkingen zijn relevant voor mijn patiëntpopulatie?",
                "Wat is er bekend over bias, veiligheid, regelgeving en privacy?",
                "Hoe ziet integratie in bestaande zorgprocessen eruit?"
            ],
            principles_title: "Onze aanpak is gebaseerd op drie principes:",
            principles: [
                {
                    title: "Transparantie",
                    desc: "Wij beschrijven expliciet de onderliggende evidence, relevante richtlijnen (zoals MDR), validatiestudies en bekende beperkingen."
                },
                {
                    title: "Objectiviteit",
                    desc: "Wij hebben geen commerciële belangen bij specifieke leveranciers of technologieën. Onze inhoud is gericht op feiten, klinische toepasbaarheid en wetenschappelijke onderbouwing."
                },
                {
                    title: "Toegankelijkheid",
                    desc: "Wij vertalen complexe AI-techniek naar begrijpelijke, klinisch bruikbare informatie, zodat zorgprofessionals weloverwogen besluiten kunnen nemen."
                }
            ],
            goal: "Het doel van Medical-AI.nl is om een helder, actueel en onafhankelijk overzicht te bieden van relevante AI-ontwikkelingen in de zorg. Daarmee willen wij bijdragen aan verantwoord gebruik van AI-systemen en een beter begrip van hun mogelijkheden, risico’s en randvoorwaarden."
        },
        footer: {
            about_summary: "Onafhankelijk kennisplatform voor verantwoorde AI in de zorg.",
            quick_links: "Snelle Links",
            legal: "© 2026 Medical AI. Alle rechten voorbehouden.",
            privacy: "Privacybeleid",
            terms: "Algemene Voorwaarden"
        },
        privacy: {
            title: "Privacybeleid",
            last_updated: "Laatst bijgewerkt: 3 december 2025",
            intro: "Medical-AI.nl respecteert uw privacy. Dit beleid beschrijft hoe wij omgaan met gegevens.",
            sections: [
                {
                    heading: "1. Gegevensverzameling",
                    content: "Wij verzamelen geen persoonlijke gegevens van bezoekers tenzij u deze vrijwillig verstrekt (bijv. via een contactformulier). Wij gebruiken minimale cookies voor de functionaliteit van de website."
                },
                {
                    heading: "2. Gebruik",
                    content: "Eventueel verstrekte gegevens worden uitsluitend gebruikt voor communicatiedoeleinden en worden nooit zonder toestemming met derden gedeeld."
                },
                {
                    heading: "3. Uw Rechten",
                    content: "U heeft het recht om inzage te vragen in de persoonsgegevens die wij van u hebben, deze te corrigeren of te laten verwijderen. Neem contact met ons op voor verzoeken."
                }
            ]
        },
        terms: {
            title: "Algemene Voorwaarden",
            last_updated: "Laatst bijgewerkt: 3 december 2025",
            intro: "Door gebruik te maken van Medical-AI.nl gaat u akkoord met deze voorwaarden. Lees deze zorgvuldig door.",
            sections: [
                {
                    heading: "1. Disclaimer van Aansprakelijkheid",
                    content: "De inhoud op Medical-AI.nl is uitsluitend bedoeld voor informatieve en educatieve doeleinden. Het vormt geen medisch advies, diagnose of behandeling. Hoewel wij streven naar nauwkeurigheid, geven wij geen garanties met betrekking tot de volledigheid, betrouwbaarheid of juistheid van de informatie. Medical-AI.nl en haar auteurs zijn niet aansprakelijk voor beslissingen die worden genomen of acties die worden ondernomen op basis van de informatie op deze site. Gebruikers dienen de informatie altijd kritisch te evalueren en officiële richtlijnen en gekwalificeerde professionals te raadplegen."
                },
                {
                    heading: "2. Intellectueel Eigendom",
                    content: "Alle inhoud op deze website, inclusief tekst, afbeeldingen en logo's, is eigendom van Medical-AI.nl tenzij anders vermeld. Ongeautoriseerd gebruik of reproductie is verboden."
                },
                {
                    heading: "3. Externe Links",
                    content: "Deze website kan links bevatten naar externe sites. Wij zijn niet verantwoordelijk voor de inhoud of praktijken van deze websites van derden."
                }
            ]
        },
        blog: {
            latest_research: "Nieuwste Onderzoek",
            latest_desc: "Ontdek de meest recente doorbraken in medische kunstmatige intelligentie, samengevat voor klinische relevantie.",
            no_blogs: "Nog geen blogs gepubliceerd.",
        },
        hub: {
            eyebrow: "Knowledge Center",
            title: "Educational Hub",
            subtitle: "Verdiep je klinische expertise met curated research, slimme inzichten en aankomende sessies.",
            latest_research: "Laatste Research",
            view_all: "Bekijk archief",
            featured_title: "Uitgelichte artikelen",
            featured_description: "Begin met de nieuwste klinisch relevante publicaties en samenvattingen.",
            coming_soon_title: "AI 101 voor Clinici",
            coming_soon_description: "Een uitgebreide masterclass die machine-learning toepassingen in de dagelijkse klinische praktijk demystifieert.",
            coming_soon_label: "Binnenkort",
            elearning_title: "AI 101 voor Clinici",
            elearning_body: "Een uitgebreide masterclass die machine-learning toepassingen in de dagelijkse klinische praktijk demystifieert.",
            notify_me: "Houd mij op de hoogte",
            categories_title: "Bekijk per categorie",
            categories_description: "Verken de kernthema's voor verantwoorde toepassing van AI in de zorg.",
            topics_title: "Onderwerpen",
            no_articles: "Nog geen artikelen gepubliceerd.",
            no_blogs: "Nog geen blogs gepubliceerd.",
            read_more: "Lees artikel",
            articles_count: (n: number) => `${n} ${n === 1 ? "artikel" : "artikelen"}`,
        },
        topics: {
            topic: "Onderwerp",
        }
    }
};

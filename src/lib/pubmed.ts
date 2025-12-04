import { parseStringPromise } from 'xml2js';

const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

export interface PubMedArticle {
    pubmedId: string;
    title: string;
    abstract: string;
    authors: string;
    journal: string;
    pubDate: string;
    url: string;
}

export async function fetchRecentArticles(term: string = 'artificial intelligence medicine', limit: number = 10): Promise<PubMedArticle[]> {
    try {
        // 1. Search for IDs
        const searchUrl = `${BASE_URL}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmode=json&retmax=${limit}&sort=date`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        const ids = searchData.esearchresult.idlist;
        if (!ids || ids.length === 0) return [];

        // 2. Fetch details
        const fetchUrl = `${BASE_URL}/efetch.fcgi?db=pubmed&id=${ids.join(',')}&retmode=xml`;
        const fetchRes = await fetch(fetchUrl);
        const xmlText = await fetchRes.text();

        const result = await parseStringPromise(xmlText);

        const articles: PubMedArticle[] = [];

        const pubmedArticles = result.PubmedArticleSet.PubmedArticle;

        // Helper to extract text recursively from XML objects
        const extractText = (obj: any): string => {
            if (!obj) return '';
            if (typeof obj === 'string') return obj;
            if (Array.isArray(obj)) return obj.map(extractText).join('');
            if (typeof obj === 'object') {
                if (obj._) return obj._; // Text content often in "_" property
                // If it has children like "sup", "i", etc., we need to join them
                return Object.values(obj).map(extractText).join('');
            }
            return String(obj);
        };

        for (const article of pubmedArticles) {
            try {
                const medline = article.MedlineCitation[0];
                const articleData = medline.Article[0];

                const pmid = medline.PMID[0]._;
                const rawTitle = articleData.ArticleTitle[0];
                const title = extractText(rawTitle);

                const rawAbstract = articleData.Abstract ? articleData.Abstract[0].AbstractText[0] : 'No abstract available.';
                const abstract = extractText(rawAbstract);

                // Authors
                let authorsStr = 'Unknown';
                if (articleData.AuthorList && articleData.AuthorList[0].Author) {
                    const authors = articleData.AuthorList[0].Author.map((a: any) => {
                        return `${a.LastName?.[0] || ''} ${a.Initials?.[0] || ''}`.trim();
                    });
                    authorsStr = authors.slice(0, 3).join(', ') + (authors.length > 3 ? ' et al.' : '');
                }

                // Journal
                const journal = articleData.Journal[0].Title[0];

                // Date
                const pubDateObj = articleData.Journal[0].JournalIssue[0].PubDate[0];
                const pubDate = `${pubDateObj.Year?.[0] || ''} ${pubDateObj.Month?.[0] || ''}`.trim();

                articles.push({
                    pubmedId: pmid,
                    title: title,
                    abstract: typeof abstract === 'string' ? abstract : 'Abstract format complex.',
                    authors: authorsStr,
                    journal: journal,
                    pubDate: pubDate,
                    url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
                });
            } catch (e) {
                console.error("Error parsing article", e);
            }
        }

        return articles;
    } catch (error) {
        console.error("Error fetching from PubMed:", error);
        return [];
    }
}

export async function fetchArticleByDoi(doi: string): Promise<PubMedArticle | null> {
    try {
        // Search by DOI
        const searchUrl = `${BASE_URL}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(doi)}&retmode=json`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        const ids = searchData.esearchresult.idlist;
        if (!ids || ids.length === 0) return null;

        // Fetch details for the found ID
        const id = ids[0];
        const fetchUrl = `${BASE_URL}/efetch.fcgi?db=pubmed&id=${id}&retmode=xml`;
        const fetchRes = await fetch(fetchUrl);
        const xmlText = await fetchRes.text();

        const result = await parseStringPromise(xmlText);
        const pubmedArticle = result.PubmedArticleSet.PubmedArticle[0];

        // Helper to extract text (reused logic, simplified for single item)
        const extractText = (obj: any): string => {
            if (!obj) return '';
            if (typeof obj === 'string') return obj;
            if (Array.isArray(obj)) return obj.map(extractText).join('');
            if (typeof obj === 'object') {
                if (obj._) return obj._;
                return Object.values(obj).map(extractText).join('');
            }
            return String(obj);
        };

        const medline = pubmedArticle.MedlineCitation[0];
        const articleData = medline.Article[0];

        const pmid = medline.PMID[0]._;
        const title = extractText(articleData.ArticleTitle[0]);
        const abstract = articleData.Abstract ? extractText(articleData.Abstract[0].AbstractText[0]) : 'No abstract available.';

        let authorsStr = 'Unknown';
        if (articleData.AuthorList && articleData.AuthorList[0].Author) {
            const authors = articleData.AuthorList[0].Author.map((a: any) => {
                return `${a.LastName?.[0] || ''} ${a.Initials?.[0] || ''}`.trim();
            });
            authorsStr = authors.slice(0, 3).join(', ') + (authors.length > 3 ? ' et al.' : '');
        }

        const journal = articleData.Journal[0].Title[0];
        const pubDateObj = articleData.Journal[0].JournalIssue[0].PubDate[0];
        const pubDate = `${pubDateObj.Year?.[0] || ''} ${pubDateObj.Month?.[0] || ''}`.trim();

        return {
            pubmedId: pmid,
            title: title,
            abstract: typeof abstract === 'string' ? abstract : 'Abstract format complex.',
            authors: authorsStr,
            journal: journal,
            pubDate: pubDate,
            url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
        };

    } catch (error) {
        console.error("Error fetching DOI from PubMed:", error);
        return null;
    }
}

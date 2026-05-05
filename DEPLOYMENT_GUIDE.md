# Deployment Guide: Medical AI Platform

Je hebt een prachtige Next.js applicatie gebouwd. Om deze live te zetten op jouw Strato domein, is de beste en modernste route om **Vercel** te gebruiken voor de hosting. Vercel is gemaakt door de makers van Next.js en zorgt voor de snelste en veiligste hosting.

Hier is het stappenplan om jouw app live te krijgen en te koppelen aan Strato.

## Stap 1: Database Configuratie (Belangrijk!)
De applicatie gebruikt nu **PostgreSQL** via Prisma. Gebruik lokaal en in productie een Postgres database; een SQLite `file:./dev.db` URL werkt niet meer met het huidige schema.

**Actie**:
1.  Zet je code op **GitHub** (als je dat nog niet hebt gedaan).
2.  Ga naar [Vercel.com](https://vercel.com) en maak een account aan.
3.  Importeer je GitHub project.
4.  Tijdens de setup bij Vercel, voeg een **Storage** (Postgres) database toe.
5.  Vercel geeft je nieuwe `.env` variabelen.

## Stap 2: Environment Variables
Het huidige `prisma/schema.prisma` verwacht deze variabelen:

```prisma
// prisma/schema.prisma

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Zet `DATABASE_URL` op de pooled Postgres URL en `DIRECT_URL` op de directe/non-pooled Postgres URL. Lokaal mag `DIRECT_URL` dezelfde waarde hebben als `DATABASE_URL`.

Daarna moet je eenmalig `npx prisma migrate deploy` draaien in de Vercel console (of via je build command).

## Stap 3: Koppelen aan Strato
Zodra je app live staat op Vercel (bijv. `medical-ai.vercel.app`), kun je je eigen domein koppelen.

1.  Ga in Vercel naar **Settings** > **Domains**.
2.  Voer je domeinnaam in (bijv. `jouwdomein.nl`).
3.  Vercel geeft je nu **DNS Records** die je moet instellen bij Strato.

### Instellingen bij Strato:
1.  Log in op **Strato.nl**.
2.  Ga naar **Domeinbeheer** > **DNS instellingen**.
3.  **A-Record**: Wijzig het IP-adres naar het IP dat Vercel geeft (vaak `76.76.21.21`).
4.  **CNAME (voor www)**: Voeg een CNAME record toe voor `www` dat wijst naar `cname.vercel-dns.com`.

*Let op: Het kan tot 24 uur duren voordat DNS wijzigingen wereldwijd actief zijn, maar vaak werkt het binnen een uur.*

## Alternatief: VPS Hosting
Als je een **VPS** (Virtual Private Server) hebt bij Strato (een eigen server waar je op kunt inloggen met SSH), dan kun je de app daar draaien met de huidige SQLite database.
*   Dit is **technisch complexer**: Je moet zelf Node.js installeren, Nginx configureren, SSL regelen, en updates beheren.
*   **Advies**: Voor een Next.js app is Vercel veel makkelijker en sneller.

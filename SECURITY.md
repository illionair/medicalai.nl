# Security

## Secrets

Do not commit real API keys, database URLs, auth secrets, tokens, or passwords.

Use `.env` locally and configure production secrets in the hosting provider. `.env*` is ignored, while `.env.example` is safe to commit.

Before pushing, run:

```bash
npm run security:scan
```

## Required Production Environment

- `DATABASE_URL`
- `AUTH_SECRET`
- `SITE_ACCESS_CODE`
- `ADMIN_EMAILS`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

Never prefix secrets with `NEXT_PUBLIC_`. Only public, non-sensitive values may use that prefix.

## Access Model

- The site gate should use a server-side access code and an httpOnly cookie.
- Admin access should be limited to authenticated admin email addresses.
- Comments or community content should be moderated before publication.

## Remaining Production Hardening

- Replace in-memory rate limiting with Redis or another shared store for multi-instance deployments.
- Use a managed Postgres database with backups.
- Verify the sending domain with SPF, DKIM, and DMARC.
- Review privacy/terms text before public launch.

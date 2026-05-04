# Graph Report - medical-ai  (2026-05-05)

## Corpus Check
- 97 files · ~186,239 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 274 nodes · 382 edges · 13 communities detected
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 77 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]

## God Nodes (most connected - your core abstractions)
1. `requireAdmin()` - 26 edges
2. `useLanguage()` - 20 edges
3. `rateLimit()` - 14 edges
4. `getPublishedBlogs()` - 10 edges
5. `getCurrentUser()` - 9 edges
6. `sendContactEmail()` - 8 edges
7. `getStaticArticles()` - 8 edges
8. `requestMagicLink()` - 7 edges
9. `logBlogLoadFailure()` - 7 edges
10. `getCategoryCounts()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `getPendingComments()` --calls--> `requireAdmin()`  [INFERRED]
  src\app\_actions\comments.ts → src\lib\user-auth.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [INFERRED]
  src\app\admin\layout.tsx → src\lib\user-auth.ts
- `GET()` --calls--> `verifyMagicLinkToken()`  [INFERRED]
  src\app\auth\verify\route.ts → src\lib\user-auth.ts
- `handleSubmit()` --calls--> `sendContactEmail()`  [INFERRED]
  src\app\contact\page.tsx → src\app\_actions\contact.ts
- `handleSubmit()` --calls--> `requestMagicLink()`  [INFERRED]
  src\app\login\page.tsx → src\app\_actions\auth.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (30): createManualArticle(), deleteArticle(), fetchAndSaveArticles(), fetchAndSaveDoi(), getArticlesByStatus(), createAiPromptBlogPost(), createEmptyBlogPost(), deleteBlogPost() (+22 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (13): Footer(), Hero(), LanguageProvider(), useLanguage(), CategoryGrid(), getHubCopy(), normalizeCounts(), ComingSoonCard() (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (15): handleSubmit(), verifySiteAccess(), contactRecipient(), escapeHtml(), resendReady(), sendContactEmail(), smtpReady(), handleSubmit() (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.28
Nodes (13): Home(), TopicPage(), HubPage(), getBlogById(), getBlogsForTopic(), getCategoryCounts(), getPublishedBlogs(), getPublishedBlogsByCategory() (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (14): logoutUser(), requestMagicLink(), buildMagicLink(), escapeHtml(), resendReady(), sendMagicLinkEmail(), smtpReady(), clearUserSession() (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.21
Nodes (10): approveComment(), createComment(), getPendingComments(), rejectComment(), toggleLike(), getTrustThreshold(), resolveCommentStatus(), shouldGrantTrust() (+2 more)

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (7): assertEnv(), getAdminEmails(), getRequiredEnv(), isAdminEmail(), normalizeSiteUrl(), resolveSiteUrl(), isStaticArticleId()

### Community 7 - "Community 7"
Cohesion: 0.26
Nodes (8): cleanMarkdown(), escapeXml(), extractSummary(), makeCoverImage(), paletteFor(), readArticle(), staticArticleMatchesTopic(), wrapWords()

### Community 9 - "Community 9"
Cohesion: 0.22
Nodes (2): AucPlayground(), rocPath()

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (7): buildPrompt(), buildPromptFromTopic(), generateBlogPost(), generateBlogPostFromPrompt(), getClient(), getModel(), listAvailableModels()

### Community 11 - "Community 11"
Cohesion: 0.5
Nodes (2): createOpenEvidencePost(), createTenMinChecklistPost()

### Community 12 - "Community 12"
Cohesion: 0.5
Nodes (2): handleCreate(), handleSelect()

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (2): getFocusableItems(), handleKeyDown()

## Knowledge Gaps
- **Thin community `Community 9`** (10 nodes): `AucPlayground()`, `formatNumber()`, `MetricCard()`, `pct()`, `ratio()`, `rocPath()`, `Shell()`, `InteractiveSlot()`, `ArticleInteractives.tsx`, `InteractiveSlot.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (5 nodes): `createOpenEvidencePost()`, `createTenMinChecklistPost()`, `SeedPage()`, `actions.ts`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (5 nodes): `handleClickOutside()`, `handleCreate()`, `handleRemove()`, `handleSelect()`, `MultiSelect.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (5 nodes): `getFocusableItems()`, `handleKeyDown()`, `MS()`, `toggleLanguage()`, `Navbar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireAdmin()` connect `Community 0` to `Community 4`, `Community 5`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `getStaticArticleById()` connect `Community 3` to `Community 0`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `rateLimit()` connect `Community 2` to `Community 4`, `Community 5`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Are the 19 inferred relationships involving `requireAdmin()` (e.g. with `AdminLayout()` and `fetchAndSaveArticles()`) actually correct?**
  _`requireAdmin()` has 19 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `useLanguage()` (e.g. with `PrivacyPage()` and `TermsPage()`) actually correct?**
  _`useLanguage()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `rateLimit()` (e.g. with `GET()` and `verifySiteAccess()`) actually correct?**
  _`rateLimit()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `getPublishedBlogs()` (e.g. with `Home()` and `mergeWithStaticArticles()`) actually correct?**
  _`getPublishedBlogs()` has 4 INFERRED edges - model-reasoned connections that need verification._
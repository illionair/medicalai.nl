# Graph Report - medical-ai  (2026-05-05)

## Corpus Check
- 106 files · ~194,710 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 275 nodes · 362 edges · 11 communities detected
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]

## God Nodes (most connected - your core abstractions)
1. `requireAdmin()` - 26 edges
2. `rateLimit()` - 14 edges
3. `useLanguage()` - 10 edges
4. `getCurrentUser()` - 9 edges
5. `sendContactEmail()` - 8 edges
6. `getPublishedBlogs()` - 8 edges
7. `getStaticArticles()` - 8 edges
8. `requestMagicLink()` - 7 edges
9. `logBlogLoadFailure()` - 7 edges
10. `getStaticArticleById()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `unpublishBlogPost()` --calls--> `requireAdmin()`  [INFERRED]
  src\app\_actions\blog.ts → src\lib\user-auth.ts
- `createEmptyBlogPost()` --calls--> `requireAdmin()`  [INFERRED]
  src\app\_actions\blog.ts → src\lib\user-auth.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [INFERRED]
  src\app\admin\layout.tsx → src\lib\user-auth.ts
- `GET()` --calls--> `verifyMagicLinkToken()`  [INFERRED]
  src\app\auth\verify\route.ts → src\lib\user-auth.ts
- `handleSubmit()` --calls--> `sendContactEmail()`  [INFERRED]
  src\app\contact\page.tsx → src\app\_actions\contact.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (28): createAiPromptBlogPost(), createEmptyBlogPost(), deleteBlogPost(), generateBlogs(), getBlogPost(), getDraftBlogs(), getPublishedBlogsAdmin(), publishBlogPost() (+20 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (19): createManualArticle(), deleteArticle(), fetchAndSaveArticles(), fetchAndSaveDoi(), getArticlesByStatus(), approveComment(), createComment(), getPendingComments() (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (15): handleSubmit(), verifySiteAccess(), contactRecipient(), escapeHtml(), resendReady(), sendContactEmail(), smtpReady(), handleSubmit() (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.22
Nodes (14): logoutUser(), requestMagicLink(), buildMagicLink(), escapeHtml(), resendReady(), sendMagicLinkEmail(), smtpReady(), clearUserSession() (+6 more)

### Community 4 - "Community 4"
Cohesion: 0.15
Nodes (7): AucPlayground(), formatDecimal(), formatNumber(), ratio(), thresholdStats(), InteractiveSlot(), resolveWidget()

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (5): Hero(), LanguageProvider(), useLanguage(), PrivacyPage(), TermsPage()

### Community 6 - "Community 6"
Cohesion: 0.32
Nodes (12): Home(), TopicPage(), getBlogById(), getBlogsForTopic(), getCategoryCounts(), getPublishedBlogs(), getPublishedBlogsByCategory(), getPublishedBlogsByTag() (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (7): assertEnv(), getAdminEmails(), getRequiredEnv(), isAdminEmail(), normalizeSiteUrl(), resolveSiteUrl(), isStaticArticleId()

### Community 8 - "Community 8"
Cohesion: 0.26
Nodes (8): cleanMarkdown(), escapeXml(), extractSummary(), makeCoverImage(), paletteFor(), readArticle(), staticArticleMatchesTopic(), wrapWords()

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (2): createOpenEvidencePost(), createTenMinChecklistPost()

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (2): handleCreate(), handleSelect()

## Knowledge Gaps
- **Thin community `Community 9`** (5 nodes): `createOpenEvidencePost()`, `createTenMinChecklistPost()`, `SeedPage()`, `actions.ts`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (5 nodes): `handleClickOutside()`, `handleCreate()`, `handleRemove()`, `handleSelect()`, `MultiSelect.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireAdmin()` connect `Community 1` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `rateLimit()` connect `Community 2` to `Community 1`, `Community 3`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `getStaticArticleById()` connect `Community 6` to `Community 0`, `Community 8`, `Community 7`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Are the 19 inferred relationships involving `requireAdmin()` (e.g. with `AdminLayout()` and `fetchAndSaveArticles()`) actually correct?**
  _`requireAdmin()` has 19 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `rateLimit()` (e.g. with `GET()` and `verifySiteAccess()`) actually correct?**
  _`rateLimit()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `useLanguage()` (e.g. with `PrivacyPage()` and `TermsPage()`) actually correct?**
  _`useLanguage()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `getCurrentUser()` (e.g. with `createComment()` and `toggleLike()`) actually correct?**
  _`getCurrentUser()` has 3 INFERRED edges - model-reasoned connections that need verification._
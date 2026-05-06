# Graph Report - medical-ai  (2026-05-06)

## Corpus Check
- 118 files · ~217,509 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 331 nodes · 466 edges · 11 communities detected
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `requireAdmin()` - 28 edges
2. `rateLimit()` - 14 edges
3. `motifFor()` - 14 edges
4. `useLanguage()` - 10 edges
5. `hasPostgresDatabaseConfig()` - 9 edges
6. `getCurrentUser()` - 9 edges
7. `escapeXml()` - 9 edges
8. `wrapWords()` - 9 edges
9. `requestMagicLink()` - 8 edges
10. `sendContactEmail()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `getPendingComments()` --calls--> `requireAdmin()`  [INFERRED]
  src\app\_actions\comments.ts → src\lib\user-auth.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [INFERRED]
  src\app\admin\layout.tsx → src\lib\user-auth.ts
- `GET()` --calls--> `rateLimit()`  [INFERRED]
  src\app\auth\verify\route.ts → src\lib\rate-limit.ts
- `handleSubmit()` --calls--> `sendContactEmail()`  [INFERRED]
  src\app\contact\page.tsx → src\app\_actions\contact.ts
- `handleSubmit()` --calls--> `requestMagicLink()`  [INFERRED]
  src\app\login\page.tsx → src\app\_actions\auth.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (42): createManualArticle(), deleteArticle(), fetchAndSaveArticles(), fetchAndSaveDoi(), getArticlesByStatus(), articleToDraftContent(), createAiPromptBlogPost(), createEditableCopyFromStaticArticle() (+34 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (24): BlogCard(), baseMotif(), calibrationMotif(), checklistMotif(), clinicalUtilityMotif(), defaultCover(), deploymentMotif(), llmMotif() (+16 more)

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (25): logoutUser(), requestMagicLink(), getGuidelineBlogs(), assertEnv(), getAdminEmails(), getRequiredEnv(), hasPostgresDatabaseConfig(), isAdminEmail() (+17 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (10): areaUnderCurve(), aucForPoints(), AucPlayground(), formatDecimal(), formatNumber(), ratio(), rocPath(), thresholdStats() (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.18
Nodes (13): handleSubmit(), verifySiteAccess(), contactRecipient(), escapeHtml(), resendReady(), sendContactEmail(), smtpReady(), handleSubmit() (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.18
Nodes (11): cleanMarkdown(), escapeXml(), extractSummary(), hasInteractiveTag(), isStaticArticleId(), makeCoverImage(), paletteFor(), parseFrontmatter() (+3 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (5): Hero(), LanguageProvider(), useLanguage(), PrivacyPage(), TermsPage()

### Community 7 - "Community 7"
Cohesion: 0.33
Nodes (11): Home(), TopicPage(), getBlogById(), getBlogsForTopic(), getCategoryCounts(), getPublishedBlogs(), getPublishedBlogsByCategory(), getPublishedBlogsByTag() (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.21
Nodes (10): approveComment(), createComment(), getPendingComments(), rejectComment(), toggleLike(), getTrustThreshold(), resolveCommentStatus(), shouldGrantTrust() (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (2): createOpenEvidencePost(), createTenMinChecklistPost()

### Community 11 - "Community 11"
Cohesion: 0.5
Nodes (2): handleCreate(), handleSelect()

## Knowledge Gaps
- **Thin community `Community 10`** (5 nodes): `createOpenEvidencePost()`, `createTenMinChecklistPost()`, `SeedPage()`, `actions.ts`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (5 nodes): `handleClickOutside()`, `handleCreate()`, `handleRemove()`, `handleSelect()`, `MultiSelect.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireAdmin()` connect `Community 0` to `Community 8`, `Community 2`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `getCover()` connect `Community 1` to `Community 5`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `readArticle()` connect `Community 5` to `Community 1`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Are the 21 inferred relationships involving `requireAdmin()` (e.g. with `AdminLayout()` and `fetchAndSaveArticles()`) actually correct?**
  _`requireAdmin()` has 21 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `rateLimit()` (e.g. with `GET()` and `verifySiteAccess()`) actually correct?**
  _`rateLimit()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `useLanguage()` (e.g. with `PrivacyPage()` and `TermsPage()`) actually correct?**
  _`useLanguage()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `hasPostgresDatabaseConfig()` (e.g. with `GET()` and `getGuidelineBlogs()`) actually correct?**
  _`hasPostgresDatabaseConfig()` has 3 INFERRED edges - model-reasoned connections that need verification._
# Graph Report - medical-ai  (2026-05-03)

## Corpus Check
- 89 files · ~92,470 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 214 nodes · 283 edges · 10 communities detected
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 61 edges (avg confidence: 0.8)
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

## God Nodes (most connected - your core abstractions)
1. `requireAdmin()` - 26 edges
2. `rateLimit()` - 14 edges
3. `useLanguage()` - 13 edges
4. `getCurrentUser()` - 9 edges
5. `sendContactEmail()` - 8 edges
6. `requestMagicLink()` - 7 edges
7. `generateBlogPost()` - 6 edges
8. `generateBlogPostFromPrompt()` - 6 edges
9. `logBlogLoadFailure()` - 6 edges
10. `resolveSiteUrl()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `getPendingComments()` --calls--> `requireAdmin()`  [INFERRED]
  src\app\_actions\comments.ts → src\lib\user-auth.ts
- `Home()` --calls--> `getPublishedBlogs()`  [INFERRED]
  src\app\page.tsx → src\lib\blog.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [INFERRED]
  src\app\admin\layout.tsx → src\lib\user-auth.ts
- `GET()` --calls--> `rateLimit()`  [INFERRED]
  src\app\auth\verify\route.ts → src\lib\rate-limit.ts
- `handleSubmit()` --calls--> `sendContactEmail()`  [INFERRED]
  src\app\contact\page.tsx → src\app\_actions\contact.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (30): createManualArticle(), deleteArticle(), fetchAndSaveArticles(), fetchAndSaveDoi(), getArticlesByStatus(), createAiPromptBlogPost(), createEmptyBlogPost(), deleteBlogPost() (+22 more)

### Community 1 - "Community 1"
Cohesion: 0.18
Nodes (16): logoutUser(), requestMagicLink(), buildMagicLink(), escapeHtml(), resendReady(), sendMagicLinkEmail(), smtpReady(), clearUserSession() (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (6): Footer(), Hero(), LanguageProvider(), useLanguage(), PrivacyPage(), TermsPage()

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (13): handleSubmit(), verifySiteAccess(), contactRecipient(), escapeHtml(), resendReady(), sendContactEmail(), smtpReady(), handleSubmit() (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (8): toggleLike(), assertEnv(), getAdminEmails(), getRequiredEnv(), isAdminEmail(), normalizeSiteUrl(), resolveSiteUrl(), getCurrentUser()

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (8): Home(), TopicPage(), getBlogById(), getBlogsForTopic(), getPublishedBlogs(), getPublishedBlogsByCategory(), getPublishedBlogsByTag(), logBlogLoadFailure()

### Community 6 - "Community 6"
Cohesion: 0.26
Nodes (8): approveComment(), createComment(), getPendingComments(), rejectComment(), getTrustThreshold(), resolveCommentStatus(), shouldGrantTrust(), async()

### Community 7 - "Community 7"
Cohesion: 0.5
Nodes (7): buildPrompt(), buildPromptFromTopic(), generateBlogPost(), generateBlogPostFromPrompt(), getClient(), getModel(), listAvailableModels()

### Community 8 - "Community 8"
Cohesion: 0.5
Nodes (2): handleCreate(), handleSelect()

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (1): createOpenEvidencePost()

## Knowledge Gaps
- **Thin community `Community 8`** (5 nodes): `handleClickOutside()`, `handleCreate()`, `handleRemove()`, `handleSelect()`, `MultiSelect.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (4 nodes): `createOpenEvidencePost()`, `SeedPage()`, `actions.ts`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireAdmin()` connect `Community 0` to `Community 1`, `Community 4`, `Community 6`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `rateLimit()` connect `Community 3` to `Community 1`, `Community 6`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `getCurrentUser()` connect `Community 4` to `Community 0`, `Community 1`, `Community 6`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 19 inferred relationships involving `requireAdmin()` (e.g. with `AdminLayout()` and `fetchAndSaveArticles()`) actually correct?**
  _`requireAdmin()` has 19 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `rateLimit()` (e.g. with `GET()` and `verifySiteAccess()`) actually correct?**
  _`rateLimit()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `useLanguage()` (e.g. with `PrivacyPage()` and `TermsPage()`) actually correct?**
  _`useLanguage()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `getCurrentUser()` (e.g. with `createComment()` and `toggleLike()`) actually correct?**
  _`getCurrentUser()` has 3 INFERRED edges - model-reasoned connections that need verification._
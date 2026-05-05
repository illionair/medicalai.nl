// Backwards-compat barrel. Server-action implementations live in src/app/_actions/.
// New code should import directly from @/app/_actions/<domain>.
export {
    verifySiteAccess,
    requestMagicLink,
    logoutUser,
} from "./_actions/auth";
export {
    fetchAndSaveArticles,
    fetchAndSaveDoi,
    getArticlesByStatus,
    deleteArticle,
    createManualArticle,
} from "./_actions/articles";
export {
    generateBlogs,
    getDraftBlogs,
    getPublishedBlogsAdmin,
    getBlogPost,
    updateBlogPost,
    publishBlogPost,
    unpublishBlogPost,
    deleteBlogPost,
    createEmptyBlogPost,
    createAiPromptBlogPost,
    getOrCreateBlogPostForArticle,
    openBlogPostEditor,
} from "./_actions/blog";
export { getTags, createTag } from "./_actions/tags";
export {
    createComment,
    getPendingComments,
    approveComment,
    rejectComment,
} from "./_actions/comments";
export { toggleLike } from "./_actions/likes";
export { sendContactEmail } from "./_actions/contact";

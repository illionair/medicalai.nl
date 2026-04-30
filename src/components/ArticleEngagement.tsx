import Link from "next/link";
import { Heart, LogIn, MessageCircle, Send } from "lucide-react";
import { createComment, toggleLike } from "@/app/actions";

type EngagementUser = {
    id: string;
    name: string;
    email: string;
};

type EngagementComment = {
    id: string;
    content: string;
    createdAt: Date;
    user: {
        name: string;
    };
};

type ArticleEngagementProps = {
    blogPostId: string;
    currentUser: EngagementUser | null;
    likedByCurrentUser: boolean;
    likeCount: number;
    comments: EngagementComment[];
};

export default function ArticleEngagement({
    blogPostId,
    currentUser,
    likedByCurrentUser,
    likeCount,
    comments,
}: ArticleEngagementProps) {
    const commentAction = createComment.bind(null, blogPostId);
    const likeAction = toggleLike.bind(null, blogPostId);

    return (
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-brand-dark">Community</h2>
                    <p className="text-sm text-slate-500">Like dit artikel of deel je ervaring met collega's.</p>
                </div>

                {currentUser ? (
                    <form action={likeAction}>
                        <button
                            type="submit"
                            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition-colors ${likedByCurrentUser
                                ? "border-rose-200 bg-rose-50 text-rose-600"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-rose-200 hover:text-rose-600"
                                }`}
                        >
                            <Heart size={18} fill={likedByCurrentUser ? "currentColor" : "none"} />
                            {likeCount}
                        </button>
                    </form>
                ) : (
                    <Link
                        href={`/login?next=/blog/${blogPostId}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-2 text-sm font-bold text-white hover:opacity-90"
                    >
                        <LogIn size={18} />
                        Login om te reageren
                    </Link>
                )}
            </div>

            {currentUser ? (
                <form action={commentAction} className="mt-6 space-y-3">
                    <label className="text-sm font-bold text-slate-700" htmlFor="comment">
                        Reageer als {currentUser.name}
                    </label>
                    <textarea
                        id="comment"
                        name="content"
                        rows={4}
                        maxLength={1200}
                        placeholder="Deel je ervaring, nuance of vraag..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-brand-secondary focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-4 py-2 text-sm font-bold text-white hover:bg-brand-primary"
                    >
                        <Send size={16} />
                        Plaats reactie
                    </button>
                </form>
            ) : (
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                    Je kunt reacties lezen zonder account. Inloggen is alleen nodig om zelf te liken of te reageren.
                </div>
            )}

            <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <MessageCircle size={18} />
                    {comments.length} reactie{comments.length === 1 ? "" : "s"}
                </div>

                {comments.length === 0 ? (
                    <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                        Nog geen reacties. Wees de eerste die een ervaring deelt.
                    </p>
                ) : (
                    comments.map((comment) => (
                        <article key={comment.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <p className="font-bold text-slate-800">{comment.user.name}</p>
                                <time className="text-xs text-slate-400">
                                    {new Date(comment.createdAt).toLocaleDateString("nl-NL")}
                                </time>
                            </div>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{comment.content}</p>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

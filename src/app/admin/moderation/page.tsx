import Link from "next/link";
import { approveComment, getPendingComments, rejectComment } from "@/app/actions";

export default async function ModerationPage() {
    const pending = await getPendingComments();

    return (
        <main className="container section-padding">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Comment moderatie</h1>
                    <p className="text-sm text-slate-500">
                        {pending.length} reactie{pending.length === 1 ? "" : "s"} wachten op goedkeuring.
                    </p>
                </div>
                <Link href="/admin" className="text-sm font-semibold text-brand-secondary hover:underline">
                    ← Terug naar admin
                </Link>
            </div>

            {pending.length === 0 ? (
                <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center">
                    <p className="text-slate-400">Geen reacties in de wachtrij.</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {pending.map((comment) => (
                        <li key={comment.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-xs text-slate-500">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-slate-800">{comment.user.name}</span>
                                    <span>·</span>
                                    <span>{comment.user.email}</span>
                                </div>
                                <time>{new Date(comment.createdAt).toLocaleString("nl-NL")}</time>
                            </div>
                            <p className="mb-4 whitespace-pre-wrap text-sm text-slate-700">{comment.content}</p>
                            <div className="mb-4 text-xs text-slate-500">
                                Op:{" "}
                                <Link
                                    href={`/blog/${comment.blogPost.id}`}
                                    className="font-semibold text-brand-secondary hover:underline"
                                >
                                    {comment.blogPost.title}
                                </Link>
                            </div>
                            <div className="flex gap-2">
                                <form
                                    action={async () => {
                                        "use server";
                                        await approveComment(comment.id);
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700"
                                    >
                                        Goedkeuren
                                    </button>
                                </form>
                                <form
                                    action={async () => {
                                        "use server";
                                        await rejectComment(comment.id);
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-rose-300 hover:text-rose-600"
                                    >
                                        Afwijzen
                                    </button>
                                </form>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

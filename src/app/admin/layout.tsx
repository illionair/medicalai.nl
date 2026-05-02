import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/user-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const admin = await requireAdmin();
    if (!admin) redirect("/login?next=/admin");

    return children;
}

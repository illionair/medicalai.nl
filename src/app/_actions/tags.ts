"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/user-auth";

export async function getTags() {
    return await prisma.tag.findMany({ orderBy: { name: "asc" } });
}

export async function createTag(name: string) {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    return await prisma.tag.create({ data: { name } });
}

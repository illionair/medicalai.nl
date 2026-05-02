import { expect, test } from "@playwright/test";

test("site access page renders the gate form", async ({ page }) => {
    await page.goto("/access");

    await expect(page.getByRole("heading", { name: "Restricted Access" })).toBeVisible();
    await expect(page.getByPlaceholder("ENTER PROTOCOL CODE")).toBeVisible();
});

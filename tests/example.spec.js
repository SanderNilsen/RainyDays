import { test, expect } from "@playwright/test";

test("homepage should show the clothing link", async ({ page }) => {
  await page.goto("https://classy-duckanoo-15bd80.netlify.app");

  // Wait for the new page to load and check its content
  await expect(page.getByRole("link", { name: "clothing" })).toBeVisible();
});
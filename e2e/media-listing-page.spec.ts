import { test, expect } from "@playwright/test";

test.describe("Media Listing Page", () => {
  test("User should be able to view the media listing pae and return home", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await page
      .locator("div")
      .filter({ hasText: /^MoviesView all$/ })
      .getByTestId("button")
      .click();
    await expect(page).toHaveTitle("Media Listing");
    await expect(page).toHaveURL(/media-listing/);
    await expect(page.locator(".section-heading__header")).toHaveText("Movies trending this week");

    // Return to Home page via Back Button
    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL("https://my-mdb.co.uk/");
  });
});

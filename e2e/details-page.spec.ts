import { test, expect } from "@playwright/test";

test.describe("Details Page", () => {
  test("User should be able to get to the details page", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");

    await page.locator(".card > button").first().click();

    await expect(page.getByTestId("section-heading").first()).toBeVisible();

    // Movie page with Video enabled
    const element = page.getByTestId("details-view-video");
    if (await element.isVisible()) {
      await expect(element).toBeVisible();
      await expect(page.getByTestId("video-player")).toBeVisible();
    }
  });
});

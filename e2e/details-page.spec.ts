import { test, expect } from "@playwright/test";

test.describe("Details Page", () => {
  test("User should be able to get to the details page", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await page.locator(".card > button").first().click();

    await expect(page).toHaveURL(/details/);
    await expect(page.getByTestId("section-heading").first()).toBeVisible();
    await expect(page.getByTestId("video-player")).toBeVisible();
  });

  test("User should be able to navigate to the Cast and Crew section", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await page.locator(".card > button").first().click();
    await page.getByRole("button", { name: "Cast and Crew" }).click();

    await expect(page.getByTestId("tabs")).toBeVisible();
  });
});

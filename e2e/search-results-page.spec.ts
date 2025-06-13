import { test, expect } from "@playwright/test";

test.describe("Search results page", () => {
  test("User can search for a TV programme", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await page.getByTestId("search-form-input").fill("Breaking Bad");
    await page.getByTestId("search-form-input").press("Enter");

    await expect(page).toHaveTitle("Search Results");
    await expect(page).toHaveURL("https://my-mdb.co.uk/search-results?query=Breaking%20Bad&filterByType=multi&page=1");
    await expect(page.getByTestId("resources")).toBeVisible();

    await page.locator(".button.button--icon.search__form-clear").first().click();

    await expect(page.locator(".search-results__no-results-title")).toBeVisible();
  });

  test("User can clear the search field", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await page.getByTestId("search-form-input").fill("Breaking Bad");
    await page.locator(".button.button--icon.search__form-clear").first().click();

    await expect(page.getByTestId("search-form-input")).toHaveValue("");
  });

  test("User can choose a filter before a search", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await page.locator(".select__indicator").click();
    await page.getByRole("option", { name: "Film" }).click();
    await page.getByTestId("search-form-input").click();
    await page.getByTestId("search-form-input").fill("Accountant");
    await page.getByTestId("search-form-input").press("Enter");
    await expect(page).toHaveTitle("Search Results");

    await expect(page.getByRole("heading", { name: /Films for/ })).toBeVisible();
  });

  test("User can filter results of current search results", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await page.getByTestId("search-form-input").click();
    await page.getByTestId("search-form-input").fill("Accountant");
    await page.getByTestId("search-form-input").press("Enter");
    await expect(page).toHaveTitle("Search Results");

    await expect(page.getByRole("heading", { name: /results for/ })).toBeVisible();

    await page.locator(".select__indicator").click();
    await page.getByRole("option", { name: "Film" }).click();

    await expect(page.getByRole("heading", { name: /Films for/ })).toBeVisible();
  });
});

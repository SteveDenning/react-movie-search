import { test, expect } from "@playwright/test";
import { login } from "./helpers/login";

test.describe("Home Page (Logged out)", () => {
  test("Page has correct contents", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await expect(page).toHaveTitle(/My Movie Database/);
    await expect(page).toHaveURL("https://my-mdb.co.uk/");
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Trending this week" })).toBeVisible();
    expect(await page.locator("header").textContent()).toContain("My Movie Database");
  });

  test("User is prompted to log in when clicking favourite button", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await page.locator(".card > button:nth-child(3)").first().click();

    await expect(page.getByTestId("modal")).toBeVisible();
    await expect(page.locator(".add-to-favorites__login-message")).toContainText("You must login to use this feature");

    await page.getByTestId("modal").locator("div").nth(3).click();
    await page.getByTestId("modal-close-button").click();
    await expect(page.getByTestId("modal")).not.toBeVisible();
  });

  test("User can search for a TV programme then clear the search field", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await page.getByTestId("search-form-input").fill("Breaking Bad");
    await page.getByTestId("search-form-input").press("Enter");

    await expect(page).toHaveTitle("Search Results");
    await expect(page).toHaveURL("https://my-mdb.co.uk/search-results?query=Breaking%20Bad&filterByType=multi&page=1");
    await expect(page.getByTestId("resources")).toBeVisible();

    await page.locator(".button.button--icon.search__form-clear").first().click();

    await expect(page.locator(".search-results__no-results-title")).toBeVisible();
  });
});

test.describe("Home Page (Logged in)", () => {
  test("User can login to My MDB", async ({ page }) => {
    await page.goto("https://my-mdb.co.uk/");
    await login(page);
    // Assertions
    await expect(page).toHaveTitle(/My Movie Database/);
    await expect(page.locator(".login__user--logged-in")).toBeVisible();
  });
});

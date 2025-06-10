import { test, expect } from "@playwright/test";
import { login } from "./helpers/login";

test.describe("Favourites Page", () => {
  test("User should be able to get to the page", async ({ page }) => {
    // Login and navigate to Favourites page
    await page.goto("https://my-mdb.co.uk/");
    await login(page);
    await page.getByTestId("login").click();
    await page.getByRole("button", { name: "Favourites" }).click();

    await expect(page).toHaveTitle("Favourites");
    await expect(page).toHaveURL("https://my-mdb.co.uk/favorites");
    await expect(page.getByText("You currently have no favourite movies")).toBeVisible();
  });
});

// test.describe("Favourites Page - With Favourites", () => {
//   test("User should be able to add/remove favourites", async ({ page }) => {
//     await page.goto("https://my-mdb.co.uk/");
//     await login(page);

//     await page.locator("div:nth-child(2) > div > .carousel__item > .card > button:nth-child(3)").first().click();
//     await page.locator("div:nth-child(2) > div > .carousel__item > .card > button:nth-child(4)").first().click();
//     await page.getByTestId("login").click();
//     await page.getByRole("button", { name: "Favourites" }).click();

//     await expect(page).toHaveTitle("Favourites");
//   });
// });

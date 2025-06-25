import { test, expect } from "@playwright/test";
import { login } from "./helpers/login";

test.describe("Favourites Page", () => {
  test("User should be able to get to the page", async ({ page }) => {
    await login(page);
    await page.getByTestId("login").click();
    await page.getByRole("button", { name: "Favourites" }).click();

    await expect(page).toHaveTitle("Favourites");
    await expect(page).toHaveURL("https://my-mdb.co.uk/favorites");
    await expect(page.getByTestId("tabs")).toBeVisible();
    await expect(page.getByText("You currently have no favourite movies")).toBeVisible();
  });
});

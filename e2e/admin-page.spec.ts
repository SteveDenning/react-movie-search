import { test, expect } from "@playwright/test";

// Helpers
import { login } from "./helpers/login";

test("Should be able to log in and access Admin area and toggle a users membership", async ({ page }) => {
  await login(page);

  await expect(page).toHaveTitle(/My Movie Database/);
  await expect(page.locator(".login__user--logged-in")).toBeVisible();

  await page.getByTestId("login").click();
  await page.getByRole("button", { name: "Admin" }).click();

  await expect(page.getByTestId("admin")).toBeVisible();
  await expect(page).toHaveTitle(/Admin Area/);
  await expect(page).toHaveURL("https://my-mdb.co.uk/admin");

  await page.getByRole("row", { name: "admin-mmdb" }).locator("span").click();
});

// helpers/login.ts
import { Page } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("https://my-mdb.co.uk/");
  await page.getByTestId("login").click();
  await page.getByTestId("navigation").getByTestId("navigation-action-login").click();
  await page.locator("#main").getByRole("link", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("admin-mmdb");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Approve" }).click();
}

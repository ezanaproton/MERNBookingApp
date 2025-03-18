import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5174"

test.beforeEach(async({page})=>{
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In"}).click();

  await expect(page.getByRole('heading', {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign In Successful!")).toBeVisible();
});

test('should allow the user to add a hotel', async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await expect(page.getByRole('heading', {name: "Add Hotel"})).toBeVisible();

  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page.locator("[name=description]").fill("Lorem ipsum dolor sit amet");
  await page.locator("[name=pricePerNight]").fill("999");
  await page.selectOption("[name=starRating]", '5');

  await page.getByText("Golf Resort").click();

  await page.getByLabel("Free WiFi").click();
  await page.getByLabel("Parking").click();

  await page.locator("[name=adultCount]").fill("3");
  await page.locator("[name=childCount]").fill("2");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ])

  await page.getByRole("button", {name: "Save"}).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test('should display hotels', async ({ page }) => {

  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByRole("heading", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("heading", {name: "Dublin Getaways"})).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue malesuada")).toBeVisible();
  await expect(page.getByText("Dublin, Ireland")).toBeVisible();
  await expect(page.getByText("Golf Resort")).toBeVisible();
  await expect(page.getByText("999 per night")).toBeVisible();
  await expect(page.getByText("3 adults, 2 children")).toBeVisible();
  await expect(page.getByText("5 star rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details"})).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel"})).toBeVisible();
})
import { test, expect } from '@playwright/test';

test('User logs in, adds product to cart, verifies it, and logs out', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://www.saucedemo.com/');

  // Login with valid user name and password
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Verify login
  await expect(page.locator('.title')).toHaveText('Products');

  // Select a product
  const productName = 'Sauce Labs Onesie';
  await page.click('text=Sauce Labs Onesie');
  await page.click('button:has-text("Add to cart")');

  // Go to cart
  await page.click('.shopping_cart_link');

  // Verify product name in cart
  const cartItem = page.locator('.inventory_item_name');
  await expect(cartItem).toHaveText(productName);

  // Logout
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  // Verify back on login page
  await expect(page.locator('#login-button')).toBeVisible();
});

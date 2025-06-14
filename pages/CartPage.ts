import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async getCartProductNames(): Promise<string[]> {
    // Wait for the cart table to be visible
    await this.page.waitForSelector('#cart_info_table');
    
    // Get all product names from the cart table
    const items = this.page.locator('#cart_info_table tbody tr');
    const count = await items.count();
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      const name = await items.nth(i).locator('.cart_description h4 a').textContent();
      if (name) {
        // Normalize spaces in the product name
        const normalizedName = name.replace(/\s+/g, ' ').trim();
        names.push(normalizedName);
      }
    }

    return names;
  }

  async validateCartItems(expectedProducts: string[]) {
    const cartProducts = await this.getCartProductNames();
    
    // Log the products for debugging
    console.log('Expected products:', expectedProducts);
    console.log('Actual cart products:', cartProducts);

    // Validate the number of items
    expect(cartProducts.length).toBe(expectedProducts.length);

    // Validate each product is in the cart
    for (const expectedProduct of expectedProducts) {
      expect(cartProducts).toContain(expectedProduct);
    }
  }

  async proceedToCheckout() {
    // Verify we're on the cart page before proceeding
    await expect(this.page).toHaveURL('/view_cart');

    // Click checkout button
    await this.page.locator('.check_out').click();
    
    // Verify navigation to checkout page
    await expect(this.page).toHaveURL('/checkout');
    
    // Scroll to bottom of page to make Place Order button visible
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Click Place Order button
    await this.page.locator('.check_out').click();

    await expect(this.page).toHaveURL('/payment');
  }
}

import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle('Automation Exercise');
  }

  async searchProduct(productName: string) {
    // Wait for search input to be visible
    const searchInput = this.page.locator('#search_product');
    await searchInput.waitFor({ state: 'visible' });
    
    // Fill the search input
    await searchInput.fill(productName);
    
    // Click search button
    await this.page.locator('#submit_search').click();
  }

  async clickProducts() {
    await this.page.getByRole('link', { name: 'Products' }).click();
    await expect(this.page).toHaveURL(/products/);
  }
}

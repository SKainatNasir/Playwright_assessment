import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async validateSearchResult(productName: string) {
    const results = this.page.locator('.productinfo p');
    const count = await results.count();

    if (count === 0) {
      throw new Error('No products found in search result.');
    }

    await expect(results).toContainText([productName]);
  }

  async addProductToCart(index: number): Promise<string> {
    const product = this.page.locator('.product-image-wrapper').nth(index);
    await product.hover();

    const productName = await product.locator('.productinfo p').first().textContent();
    const cleanName = productName
      ?.replace('Best clothing retailers', '')
      .replace(/\s+/g, ' ')
      .trim() || '';

    const addToCartBtn = product.locator('.overlay-content >> text=Add to cart');
    await addToCartBtn.click();

    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    return cleanName;
  }

  async viewCart() {
    await expect(this.page).toHaveURL('/products');

    const cartLink = this.page.getByRole('link', { name: 'Cart' });
    await cartLink.waitFor({ state: 'visible', timeout: 10000 });
    
    await cartLink.click();
    
    await expect(this.page).toHaveURL('/view_cart');
    
    await expect(this.page.locator('#cart_info_table')).toBeVisible();
  }
}

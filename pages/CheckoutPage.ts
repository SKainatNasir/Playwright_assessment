import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async simulateCheckout() {
    await expect(this.page).toHaveURL(/\/login/); // As it redirects to login for checkout
  }
}

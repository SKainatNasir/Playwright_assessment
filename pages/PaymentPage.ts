import { Page, expect } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  async fillPaymentDetails(name: string, card: string, cvcCode: string, month: string, year: string) {
    await this.page.locator('[data-qa="name-on-card"]').fill(name);
    await this.page.locator('[data-qa="card-number"]').fill(card);
    await this.page.locator('[data-qa="cvc"]').fill(cvcCode);
    await this.page.locator('[data-qa="expiry-month"]').fill(month);
    await this.page.locator('[data-qa="expiry-year"]').fill(year);
  
    await this.page.locator('[data-qa="pay-button"]').click();
  }
  

  async completePayment() {
    // Verify order confirmation
    await expect(this.page.locator('[data-qa="order-placed"]')).toBeVisible();
  
    // Click Continue button
    await this.page.locator('[data-qa="continue-button"]').click();

    // Verify navigation to home page
    await expect(this.page).toHaveURL('/');
  }
} 
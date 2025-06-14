import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

   async clickLoginHeaderLink() {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(this.page).toHaveURL(/login/);
  }
  async login(email: string, password: string) {
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-button"]').click();
    await expect(this.page.getByText(/Logged in as/i)).toBeVisible();
  }
}

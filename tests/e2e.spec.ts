import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { PaymentPage } from '../pages/PaymentPage';
import { testData } from '../config/testData';

test('E2E: Login, add products to cart, checkout and payment', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const home = new HomePage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const payment = new PaymentPage(page);

  // Navigate to home and login
  await home.goto();
  await loginPage.clickLoginHeaderLink();
  await loginPage.login(testData.login.email, testData.login.password);

  // Go to products page
  await home.clickProducts();

  // Add multiple products by index and store their names
  const product1Name = await products.addProductToCart(0);
  const product2Name = await products.addProductToCart(1);
  const product3Name = await products.addProductToCart(2);

  // Store expected product names
  const expectedProducts = [product1Name, product2Name, product3Name].filter(name => name !== '');

  // View cart
  await products.viewCart();

  // Validate cart items
  await cart.validateCartItems(expectedProducts);

  // Proceed to checkout
  await cart.proceedToCheckout();

  // Fill payment details and complete payment
  await payment.fillPaymentDetails(
    testData.payment.name,
    testData.payment.cardNumber,
    testData.payment.cvc,
    testData.payment.expiryMonth,
    testData.payment.expiryYear
  );
  await payment.completePayment();
});

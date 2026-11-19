import test from 'node:test';
import assert from 'node:assert/strict';
import { OXVA_PRODUCTS } from '../data/oxvaCatalog';
import {
  addItemToCart,
  calculateCartTotals,
  filterOxvaProducts,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
  updateCartItemQuantity,
  validateCheckoutForm,
  verifySecurityCode,
} from './storeLogic';

test('filterOxvaProducts filters by category and search query', () => {
  const xlimOnly = filterOxvaProducts(OXVA_PRODUCTS, 'xlim', '');
  assert.equal(xlimOnly.every((p) => p.category === 'xlim'), true);
  assert.equal(xlimOnly.length >= 2, true);

  const proMatch = filterOxvaProducts(OXVA_PRODUCTS, 'all', 'VPRIME');
  assert.equal(proMatch.length, 1);
  assert.equal(proMatch[0].id, 'vprime');

  const noMatch = filterOxvaProducts(OXVA_PRODUCTS, 'cartridges', 'vprime');
  assert.equal(noMatch.length, 0);
});

test('cart addition, merging, quantity updates, and shipping threshold math', () => {
  let cart = addItemToCart([], {
    productId: 'xlim-pro-2',
    name: 'OXVA XLIM Pro 2',
    image: '/img.jpg',
    colorName: 'Black Carbon',
    colorHex: '#1E1E22',
    podResistance: '0.6Ω Top Fill',
    unitPrice: 34.9,
    quantity: 1,
  });

  // Adding same variant increments quantity
  cart = addItemToCart(cart, {
    productId: 'xlim-pro-2',
    name: 'OXVA XLIM Pro 2',
    image: '/img.jpg',
    colorName: 'Black Carbon',
    colorHex: '#1E1E22',
    podResistance: '0.6Ω Top Fill',
    unitPrice: 34.9,
    quantity: 1,
  });

  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);

  let totals = calculateCartTotals(cart);
  assert.equal(totals.itemCount, 2);
  assert.equal(totals.subtotal, 69.8);
  assert.equal(totals.qualifiesForFreeShipping, true);
  assert.equal(totals.shippingFee, 0);
  assert.equal(totals.total, 69.8);

  // Decrement below free shipping threshold
  cart = updateCartItemQuantity(cart, cart[0].key, -1);
  totals = calculateCartTotals(cart);
  assert.equal(totals.subtotal, 34.9);
  assert.equal(totals.qualifiesForFreeShipping, false);
  assert.equal(totals.shippingFee, STANDARD_SHIPPING_FEE);
  assert.equal(totals.total, Number((34.9 + STANDARD_SHIPPING_FEE).toFixed(2)));
  assert.equal(
    totals.remainingForFreeShipping,
    Number((FREE_SHIPPING_THRESHOLD - 34.9).toFixed(2))
  );

  // Decrement to 0 removes item
  cart = updateCartItemQuantity(cart, cart[0].key, -1);
  assert.equal(cart.length, 0);
});

test('validateCheckoutForm rejects empty/invalid fields and accepts valid input', () => {
  const invalid = validateCheckoutForm({
    fullName: 'A',
    phone: '123',
    address: 'Home',
    postalCode: '1',
    paymentMethod: 'cod',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.address);
  assert.ok(invalid.errors.postalCode);

  const valid = validateCheckoutForm({
    fullName: 'Mubashir Memon',
    phone: '+92 300 1234567',
    address: 'Plot 14, Clifton Block 5, Karachi',
    postalCode: '75600',
    paymentMethod: 'cod',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('verifySecurityCode verifies genuine OXVA codes and flags invalid ones', () => {
  const validKnown = verifySecurityCode('oxva-8842-xlim-9910');
  assert.equal(validKnown.status, 'authentic');
  assert.equal(validKnown.model, 'OXVA XLIM Pro 2 (Black Carbon)');

  const invalid = verifySecurityCode('FAKE-1234');
  assert.equal(invalid.status, 'invalid');
});

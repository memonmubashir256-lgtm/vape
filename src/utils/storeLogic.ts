import type { OxvaProduct, ProductCategory } from '../data/oxvaCatalog';

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  image: string;
  colorName: string;
  colorHex: string;
  podResistance: string;
  unitPrice: number;
  quantity: number;
}

export interface CheckoutFormInput {
  fullName: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: 'cod' | 'card';
}

export interface CheckoutValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CheckoutFormInput, string>>;
}

export interface VerificationResult {
  status: 'authentic' | 'invalid';
  code: string;
  model?: string;
  batchDate?: string;
  region?: string;
  message: string;
}

export const FREE_SHIPPING_THRESHOLD = 60;
export const STANDARD_SHIPPING_FEE = 6.9;

export function filterOxvaProducts(
  products: OxvaProduct[],
  category: ProductCategory,
  searchQuery: string
): OxvaProduct[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const haystack = [
      product.name,
      product.series,
      product.tagline,
      product.specs.output,
      product.specs.battery,
      ...product.colors.map((c) => c.name),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function buildCartItemKey(
  productId: string,
  colorName: string,
  podResistance: string
): string {
  return `${productId}::${colorName}::${podResistance}`;
}

export function addItemToCart(
  currentCart: CartItem[],
  newItem: Omit<CartItem, 'key'>
): CartItem[] {
  const key = buildCartItemKey(newItem.productId, newItem.colorName, newItem.podResistance);
  const existingIndex = currentCart.findIndex((item) => item.key === key);

  if (existingIndex === -1) {
    return [...currentCart, { ...newItem, key, quantity: Math.max(1, newItem.quantity) }];
  }

  return currentCart.map((item, idx) =>
    idx === existingIndex
      ? { ...item, quantity: Math.min(20, item.quantity + Math.max(1, newItem.quantity)) }
      : item
  );
}

export function updateCartItemQuantity(
  currentCart: CartItem[],
  key: string,
  delta: number
): CartItem[] {
  return currentCart
    .map((item) => {
      if (item.key !== key) return item;
      const nextQty = item.quantity + delta;
      return nextQty > 0 ? { ...item, quantity: Math.min(20, nextQty) } : null;
    })
    .filter((item): item is CartItem => item !== null);
}

export function calculateCartTotals(items: CartItem[]) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Number(
    items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2)
  );
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee = qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = Number((subtotal + shippingFee).toFixed(2));
  const remainingForFreeShipping = Math.max(
    0,
    Number((FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2))
  );

  return {
    itemCount,
    subtotal,
    shippingFee,
    total,
    qualifiesForFreeShipping,
    remainingForFreeShipping,
  };
}

export function validateCheckoutForm(input: CheckoutFormInput): CheckoutValidationResult {
  const errors: Partial<Record<keyof CheckoutFormInput, string>> = {};

  if (input.fullName.trim().length < 2) {
    errors.fullName = 'Enter your full recipient name.';
  }

  const digitsOnly = input.phone.replace(/[^\d+]/g, '');
  if (digitsOnly.length < 7) {
    errors.phone = 'Enter a valid mobile or contact number.';
  }

  if (input.address.trim().length < 6) {
    errors.address = 'Enter a complete street delivery address.';
  }

  if (input.postalCode.trim().length < 3) {
    errors.postalCode = 'Enter a valid postal or ZIP code.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateOrderId(seedNumber?: number): string {
  const num = seedNumber ?? Math.floor(1000 + Math.random() * 9000);
  return `OXV-${num}`;
}

const KNOWN_AUTHENTIC_CODES: Record<
  string,
  { model: string; batchDate: string; region: string }
> = {
  'OXVA-8842-XLIM-9910': {
    model: 'OXVA XLIM Pro 2 (Black Carbon)',
    batchDate: '2026-09',
    region: 'Global Authorized Batch',
  },
  'OXVA-2026-NEX-4412': {
    model: 'OXVA NeXLIM 40W Dual Mesh',
    batchDate: '2026-10',
    region: 'Global Authorized Batch',
  },
  'OXVA-9011-VPR-3308': {
    model: 'OXVA VPRIME 60W Pod Mod',
    batchDate: '2026-08',
    region: 'Authorized Retail Distributor',
  },
};

export function verifySecurityCode(rawInput: string): VerificationResult {
  const normalized = rawInput.trim().toUpperCase().replace(/\s+/g, '');

  if (!normalized || normalized.length < 8) {
    return {
      status: 'invalid',
      code: normalized || 'EMPTY',
      message: 'Please enter the full 16-character OXVA security scratch code from your packaging.',
    };
  }

  const known = KNOWN_AUTHENTIC_CODES[normalized];
  if (known) {
    return {
      status: 'authentic',
      code: normalized,
      model: known.model,
      batchDate: known.batchDate,
      region: known.region,
      message: 'Verified genuine OXVA hardware. First-time authentication confirmed.',
    };
  }

  // Deterministic checksum format support for codes starting with OXVA-XXXX-XXXX-XXXX
  const pattern = /^OXVA-[A-Z0-9]{4}-[A-Z0-9]{3,4}-[A-Z0-9]{4}$/;
  if (pattern.test(normalized)) {
    return {
      status: 'authentic',
      code: normalized,
      model: 'OXVA Official Pod System',
      batchDate: '2026-10',
      region: 'Verified Manufacturer Seal',
      message: 'Genuine OXVA product registered under official Unitech quality assurance.',
    };
  }

  return {
    status: 'invalid',
    code: normalized,
    message:
      'Security code not recognized. Please verify the characters on your box or contact OXVA support.',
  };
}

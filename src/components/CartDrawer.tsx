import { useState, type FormEvent } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  calculateCartTotals,
  FREE_SHIPPING_THRESHOLD,
  generateOrderId,
  validateCheckoutForm,
  type CartItem,
  type CheckoutFormInput,
} from '../utils/storeLogic';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onClearCart: () => void;
}

const INITIAL_FORM: CheckoutFormInput = {
  fullName: '',
  phone: '',
  address: '',
  postalCode: '',
  paymentMethod: 'cod',
};

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [form, setForm] = useState<CheckoutFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormInput, string>>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    itemCount: number;
    paymentMethod: 'cod' | 'card';
    customerName: string;
  } | null>(null);

  if (!isOpen) return null;

  const totals = calculateCartTotals(items);
  const shippingProgress = Math.min(
    100,
    Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setConfirmedOrder({
      orderId: generateOrderId(),
      total: totals.total,
      itemCount: totals.itemCount,
      paymentMethod: form.paymentMethod,
      customerName: form.fullName.trim(),
    });
    onClearCart();
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setForm(INITIAL_FORM);
      setConfirmedOrder(null);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="OXVA Shopping Bag"
    >
      <div className="w-full max-w-md bg-[#121216] border-l border-white/10 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#F97316]" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-white">
              {step === 'bag' && `Your Bag (${totals.itemCount})`}
              {step === 'checkout' && 'Delivery & Payment'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close shopping bag"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 3: Order Confirmed Receipt */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="rounded-xl bg-[#09090B] border border-emerald-500/30 p-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" aria-hidden="true" />
              <h3 className="font-display text-xl font-bold text-white">
                Order #{confirmedOrder.orderId} Confirmed
              </h3>
              <p className="mt-1 text-sm text-zinc-300">
                Preparing Shipment for {confirmedOrder.customerName}
              </p>

              <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Items Ordered</span>
                  <span className="font-mono-tabular">{confirmedOrder.itemCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Payment Terms</span>
                  <span>
                    {confirmedOrder.paymentMethod === 'cod'
                      ? 'Cash on Delivery (COD)'
                      : 'Card Pre-Authorization'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/[0.06]">
                  <span>Total Amount</span>
                  <span className="font-mono-tabular">${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseDrawer}
              className="mt-6 w-full rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-zinc-950 font-semibold text-sm py-3 transition-colors"
            >
              Continue Exploring OXVA
            </button>
          </div>
        )}

        {/* Step 1: Bag Items */}
        {step === 'bag' && (
          <>
            {items.length > 0 && (
              <div className="px-6 py-3 bg-[#09090B] border-b border-white/[0.08]">
                <div className="flex items-center justify-between text-xs text-zinc-300 mb-1.5">
                  <span>
                    {totals.qualifiesForFreeShipping
                      ? 'Free Express Shipping Unlocked'
                      : `Add $${totals.remainingForFreeShipping.toFixed(2)} for free shipping`}
                  </span>
                  <span className="font-mono-tabular">${FREE_SHIPPING_THRESHOLD}+</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#F97316] transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="w-10 h-10 text-zinc-600 mb-3" aria-hidden="true" />
                  <p className="font-display text-base font-semibold text-white">
                    Your shopping bag is empty
                  </p>
                  <p className="mt-1 text-xs text-zinc-400 max-w-xs">
                    Select an OXVA pod kit or Unitech cartridge pack to get started.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-4 rounded-xl bg-[#09090B] border border-white/[0.08] p-3.5"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#18181B] shrink-0">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.key, -item.quantity)}
                          aria-label={`Remove ${item.name} from bag`}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span className="truncate">{item.colorName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular shrink-0">{item.podResistance}</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-md border border-white/10 bg-[#121216]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, -1)}
                            aria-label={`Decrease quantity for ${item.name}`}
                            className="p-1.5 text-zinc-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-mono-tabular text-xs text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, 1)}
                            aria-label={`Increase quantity for ${item.name}`}
                            className="p-1.5 text-zinc-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono-tabular text-sm font-semibold text-white">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/[0.08] bg-[#09090B] space-y-3">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono-tabular text-zinc-200">
                    ${totals.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Shipping</span>
                  <span className="font-mono-tabular text-zinc-200">
                    {totals.shippingFee === 0 ? 'FREE' : `$${totals.shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-white/[0.08]">
                  <span>Total</span>
                  <span className="font-mono-tabular">${totals.total.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="mt-2 w-full rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-zinc-950 font-semibold text-sm py-3 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Checkout Validation Form */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 p-6 space-y-4">
              <div>
                <label htmlFor="checkout-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Recipient full name"
                  className="w-full rounded-lg bg-[#09090B] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F97316]"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full rounded-lg bg-[#09090B] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F97316]"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Delivery Address
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="House, Street, Sector / Area"
                  className="w-full rounded-lg bg-[#09090B] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F97316]"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-400">{errors.address}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-postal" className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Postal / ZIP Code
                </label>
                <input
                  id="checkout-postal"
                  type="text"
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  placeholder="75600"
                  className="w-full rounded-lg bg-[#09090B] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F97316]"
                />
                {errors.postalCode && (
                  <p className="mt-1 text-xs text-red-400">{errors.postalCode}</p>
                )}
              </div>

              <div>
                <span className="block text-xs font-medium text-zinc-300 mb-2">Payment Method</span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: 'cod' })}
                    aria-pressed={form.paymentMethod === 'cod'}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-medium text-left transition-colors ${
                      form.paymentMethod === 'cod'
                        ? 'border-[#F97316] bg-[#F97316]/10 text-white'
                        : 'border-white/10 bg-[#09090B] text-zinc-400'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: 'card' })}
                    aria-pressed={form.paymentMethod === 'card'}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-medium text-left transition-colors ${
                      form.paymentMethod === 'card'
                        ? 'border-[#F97316] bg-[#F97316]/10 text-white'
                        : 'border-white/10 bg-[#09090B] text-zinc-400'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/[0.08] bg-[#09090B] space-y-3">
              <div className="flex justify-between text-sm font-semibold text-white">
                <span>Order Total</span>
                <span className="font-mono-tabular">${totals.total.toFixed(2)}</span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="rounded-lg border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-zinc-200 text-sm font-medium px-4 py-3 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-zinc-950 font-semibold text-sm py-3 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

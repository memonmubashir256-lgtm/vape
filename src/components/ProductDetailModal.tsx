import { useEffect, useState } from 'react';
import { Minus, Plus, X, Check } from 'lucide-react';
import type { OxvaProduct } from '../data/oxvaCatalog';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: OxvaProduct | null;
  initialColorName?: string;
  onClose: () => void;
  onAddToBag: (payload: {
    product: OxvaProduct;
    colorName: string;
    colorHex: string;
    podResistance: string;
    quantity: number;
  }) => void;
}

export function ProductDetailModal({
  product,
  initialColorName,
  onClose,
  onAddToBag,
}: ProductDetailModalProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedPodIdx, setSelectedPodIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;
    const matchIdx = initialColorName
      ? product.colors.findIndex((c) => c.name === initialColorName)
      : 0;
    setSelectedColorIdx(matchIdx >= 0 ? matchIdx : 0);
    setSelectedPodIdx(0);
    setQuantity(1);
  }, [product, initialColorName]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activeColor = product.colors[selectedColorIdx] ?? product.colors[0];
  const activePod = product.podOptions[selectedPodIdx] ?? product.podOptions[0];

  const handleSubmit = () => {
    onAddToBag({
      product,
      colorName: activeColor.name,
      colorHex: activeColor.hex,
      podResistance: activePod.resistance,
      quantity,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
    >
      <div className="relative w-full max-w-4xl rounded-xl bg-[#121216] border border-white/10 shadow-2xl overflow-hidden my-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product configurator"
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#09090B]/80 border border-white/15 text-zinc-300 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Sticky Visual & Specs */}
          <div className="lg:col-span-6 bg-[#18181B] p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08]">
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#09090B] border border-white/[0.06]">
              <ResilientImage
                src={product.image}
                alt={product.name}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Key Hardware Specs */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-[#121216] border border-white/[0.06] px-3 py-2.5">
                <span className="text-zinc-400 block">Output Power</span>
                <span className="font-mono-tabular text-white font-medium mt-0.5 block">
                  {product.specs.output}
                </span>
              </div>
              <div className="rounded-lg bg-[#121216] border border-white/[0.06] px-3 py-2.5">
                <span className="text-zinc-400 block">Battery</span>
                <span className="font-mono-tabular text-white font-medium mt-0.5 block">
                  {product.specs.battery}
                </span>
              </div>
              <div className="rounded-lg bg-[#121216] border border-white/[0.06] px-3 py-2.5">
                <span className="text-zinc-400 block">Charging</span>
                <span className="font-mono-tabular text-white font-medium mt-0.5 block">
                  {product.specs.charging}
                </span>
              </div>
              <div className="rounded-lg bg-[#121216] border border-white/[0.06] px-3 py-2.5">
                <span className="text-zinc-400 block">Airflow</span>
                <span className="font-mono-tabular text-white font-medium mt-0.5 block">
                  {product.specs.airflow}
                </span>
              </div>
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="uppercase tracking-wider text-[#F97316]">{product.series}</span>
                <span aria-hidden="true">·</span>
                <span>{product.specs.weight}</span>
              </div>

              <div className="mt-2 flex items-baseline justify-between gap-4">
                <h2 id="pdp-modal-title" className="font-display text-2xl font-bold text-white">
                  {product.name}
                </h2>
                <span className="font-mono-tabular text-xl font-bold text-white shrink-0">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{product.description}</p>

              {/* Colorway Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-zinc-400">Select Finish</span>
                  <span className="text-white font-medium">
                    {activeColor.name} · {activeColor.finish}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color, idx) => {
                    const active = idx === selectedColorIdx;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColorIdx(idx)}
                        aria-label={`Finish ${color.name}`}
                        aria-pressed={active}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium border transition-colors ${
                          active
                            ? 'border-[#F97316] bg-[#F97316]/10 text-white'
                            : 'border-white/10 bg-[#09090B] text-zinc-300 hover:border-white/25'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/25 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="whitespace-nowrap">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pod Resistance Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-zinc-400">Primary Cartridge Resistance</span>
                  <span className="text-zinc-300 font-mono-tabular">{activePod.range}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.podOptions.map((pod, idx) => {
                    const active = idx === selectedPodIdx;
                    return (
                      <button
                        key={pod.resistance}
                        type="button"
                        onClick={() => setSelectedPodIdx(idx)}
                        aria-pressed={active}
                        className={`rounded-lg px-3 py-2 text-left border transition-colors ${
                          active
                            ? 'border-[#F97316] bg-[#F97316]/10 text-white'
                            : 'border-white/10 bg-[#09090B] text-zinc-300 hover:border-white/25'
                        }`}
                      >
                        <div className="font-mono-tabular text-xs font-semibold">
                          {pod.resistance}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{pod.style}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* What's in the box */}
              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <p className="text-xs font-medium text-zinc-400 mb-2">Included in Package</p>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {product.inBox.map((line) => (
                    <li key={line} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F97316] shrink-0" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity & Add to Bag CTA */}
            <div className="mt-7 pt-5 border-t border-white/[0.08] flex items-center gap-3">
              <div className="inline-flex items-center rounded-lg border border-white/15 bg-[#09090B]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-zinc-300 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-9 text-center font-mono-tabular text-sm font-medium text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="p-2.5 text-zinc-300 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-zinc-950 font-semibold text-sm py-3 px-5 transition-colors whitespace-nowrap"
              >
                Add to Bag · ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

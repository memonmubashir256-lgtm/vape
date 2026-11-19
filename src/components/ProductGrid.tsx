import { Search, SlidersHorizontal } from 'lucide-react';
import type { OxvaProduct, ProductCategory } from '../data/oxvaCatalog';
import { ResilientImage } from './ResilientImage';

interface ProductGridProps {
  products: OxvaProduct[];
  selectedCategory: ProductCategory;
  searchQuery: string;
  onCategoryChange: (category: ProductCategory) => void;
  onSearchChange: (query: string) => void;
  onSelectProduct: (product: OxvaProduct) => void;
  onQuickAdd: (product: OxvaProduct) => void;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Hardware' },
  { id: 'xlim', label: 'XLIM Series' },
  { id: 'pod-mods', label: 'Pod Mods' },
  { id: 'cartridges', label: 'Cartridges' },
];

export function ProductGrid({
  products,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onSelectProduct,
  onQuickAdd,
}: ProductGridProps) {
  return (
    <section id="collection" className="mx-auto max-w-[1280px] px-4 sm:px-8 py-14 sm:py-16">
      {/* Section Header & Filter Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div>
          <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#F97316]">
            Official Hardware Catalog
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Pod Systems &amp; Top-Fill Cartridges
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 min-w-0 max-w-full">
          {/* Interactive Category Tabs */}
          <div
            role="tablist"
            aria-label="Filter OXVA products by category"
            className="inline-flex max-w-full items-center gap-1 p-1 rounded-lg bg-[#121216] border border-white/[0.08] overflow-x-auto"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#F97316] text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-0 sm:min-w-[220px]">
            <Search
              className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="oxva-product-search" className="sr-only">
              Search OXVA devices
            </label>
            <input
              id="oxva-product-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search XLIM, VPRIME, 40W..."
              className="w-full rounded-lg bg-[#121216] border border-white/[0.08] pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F97316]"
            />
          </div>
        </div>
      </div>

      {/* Empty Search / Filter State */}
      {products.length === 0 ? (
        <div className="mt-10 rounded-xl bg-[#121216] border border-white/[0.08] p-12 text-center">
          <SlidersHorizontal className="w-8 h-8 text-zinc-500 mx-auto mb-3" aria-hidden="true" />
          <h3 className="font-display text-lg font-semibold text-white">No matching OXVA devices</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Try clearing your search query or switching back to All Hardware.
          </p>
          <button
            type="button"
            onClick={() => {
              onCategoryChange('all');
              onSearchChange('');
            }}
            className="mt-5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium px-4 py-2 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* Uniform 3-Column Storefront Grid */
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col rounded-xl bg-[#121216] border border-white/[0.08] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/20"
            >
              {/* Product Image (4:3 uniform aspect) */}
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                aria-label={`View details for ${product.name}`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#18181B] text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#F97316]"
              >
                <ResilientImage
                  src={product.image}
                  alt={product.name}
                  fallbackTitle={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>

              {/* Card Body — Identical Field Order */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                {/* Clean unboxed metadata with typographic separators */}
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="uppercase tracking-wider text-zinc-300">{product.series}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{product.specs.output}</span>
                  {product.statusLabel && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#F97316] font-medium">{product.statusLabel}</span>
                    </>
                  )}
                </div>

                <div className="mt-2 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-white leading-snug">
                    {product.name}
                  </h3>
                  <span className="font-mono-tabular text-base font-semibold text-white shrink-0">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex-1">
                  {product.tagline}
                </p>

                {/* Colorway dots + Specs summary */}
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5" aria-label="Available finishes">
                    {product.colors.map((color) => (
                      <span
                        key={color.name}
                        title={color.name}
                        className="w-3.5 h-3.5 rounded-full border border-white/25"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                  <span className="font-mono-tabular text-xs text-zinc-400">
                    {product.specs.battery} · {product.specs.capacity}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="rounded-lg border border-white/15 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.07] text-zinc-200 text-xs font-medium py-2.5 px-3 transition-colors whitespace-nowrap"
                  >
                    Configure
                  </button>
                  <button
                    type="button"
                    onClick={() => onQuickAdd(product)}
                    className="rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-zinc-950 text-xs font-semibold py-2.5 px-3 transition-colors whitespace-nowrap"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

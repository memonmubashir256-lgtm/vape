import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { OXVA_HERO_IMAGE, type OxvaProduct } from '../data/oxvaCatalog';
import { ResilientImage } from './ResilientImage';

interface HeroShowcaseProps {
  flagship: OxvaProduct;
  onConfigureFlagship: (initialColorName?: string) => void;
}

export function HeroShowcase({ flagship, onConfigureFlagship }: HeroShowcaseProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const activeColor = flagship.colors[selectedColorIdx] ?? flagship.colors[0];

  return (
    <section id="top" className="relative w-full border-b border-white/[0.08] bg-[#09090B]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-10 sm:py-14 lg:py-16">
        {/* Split-screen flagship hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-5 min-w-0 flex flex-col justify-center">
            <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#F97316] mb-3">
              Leading with Innovation and Best Flavors
            </p>
            <h1
              className="font-display font-bold tracking-tight text-white leading-[1.08]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', textWrap: 'balance' }}
            >
              OXVA XLIM Pro 2
            </h1>
            <p className="mt-4 text-base text-zinc-300 leading-relaxed max-w-lg">
              Precision 30W Prosleek chassis with a 1300mAh high-density battery, 0.56-inch HD
              color screen, and 2A Type-C fast charge built for X-treme flavor.
            </p>

            {/* Interactive colorway preview selector */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2.5">
                <span>Finish</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-200 font-medium">{activeColor.name}</span>
                <span aria-hidden="true">·</span>
                <span>{activeColor.finish}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {flagship.colors.map((color, idx) => {
                  const isActive = idx === selectedColorIdx;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColorIdx(idx)}
                      aria-label={`Select finish ${color.name}`}
                      aria-pressed={isActive}
                      className={`w-8 h-8 rounded-full transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] ${
                        isActive
                          ? 'ring-2 ring-[#F97316] ring-offset-2 ring-offset-[#09090B] scale-105'
                          : 'ring-1 ring-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onConfigureFlagship(activeColor.name)}
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-zinc-950 font-semibold text-sm px-6 py-3 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
              >
                <span>Configure XLIM Pro 2</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href="#collection"
                className="inline-flex items-center rounded-lg border border-white/15 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.06] text-zinc-200 font-medium text-sm px-5 py-3 transition-colors whitespace-nowrap shrink-0"
              >
                Explore Full Lineup
              </a>
            </div>
          </div>

          {/* Dominant 16:9 Flagship Photography */}
          <div className="lg:col-span-7 min-w-0">
            <div className="relative w-full h-full aspect-[16/9] lg:min-h-[380px] lg:aspect-auto rounded-xl overflow-hidden border border-white/[0.08] bg-[#121216]">
              <ResilientImage
                src={OXVA_HERO_IMAGE}
                alt="OXVA XLIM Pro 2 brushed titanium and carbon fiber pod system"
                fallbackTitle="OXVA XLIM Pro 2 Flagship Pod System"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent pointer-events-none"
              />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-zinc-200">
                <span className="font-medium">{activeColor.name} Edition</span>
                <span className="font-mono-tabular text-zinc-300">
                  ${flagship.price.toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column flagship hardware strip below hero split */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 border-t border-white/[0.08] pt-7">
          <div className="rounded-lg bg-[#121216] border border-white/[0.06] px-4 py-3.5 min-w-0">
            <p className="text-xs text-zinc-400">Max Power Output</p>
            <p className="mt-1 font-mono-tabular text-base sm:text-lg font-semibold text-white">30W Prosleek</p>
          </div>
          <div className="rounded-lg bg-[#121216] border border-white/[0.06] px-4 py-3.5 min-w-0">
            <p className="text-xs text-zinc-400">Battery Endurance</p>
            <p className="mt-1 font-mono-tabular text-base sm:text-lg font-semibold text-white">1300mAh · 4 Days</p>
          </div>
          <div className="rounded-lg bg-[#121216] border border-white/[0.06] px-4 py-3.5 min-w-0">
            <p className="text-xs text-zinc-400">2A Fast Charging</p>
            <p className="mt-1 font-mono-tabular text-base sm:text-lg font-semibold text-white">80% in 25 Min</p>
          </div>
          <div className="rounded-lg bg-[#121216] border border-white/[0.06] px-4 py-3.5 min-w-0">
            <p className="text-xs text-zinc-400">Display Interface</p>
            <p className="mt-1 font-mono-tabular text-base sm:text-lg font-semibold text-white">0.56" HD Color</p>
          </div>
        </div>
      </div>
    </section>
  );
}

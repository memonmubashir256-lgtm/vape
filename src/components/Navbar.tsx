import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface NavbarProps {
  bagCount: number;
  onOpenBag: () => void;
  onNavigateCategory: (category: 'xlim' | 'pod-mods' | 'cartridges') => void;
}

export function Navbar({ bagCount, onOpenBag, onNavigateCategory }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCollectionJump = (category: 'xlim' | 'pod-mods' | 'cartridges') => {
    onNavigateCategory(category);
    setMobileOpen(false);
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090B]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-[0.22em] text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]"
        >
          OXVA
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              handleCollectionJump('xlim');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#F97316]"
          >
            XLIM Series
          </a>
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              handleCollectionJump('pod-mods');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#F97316]"
          >
            Pod Mods
          </a>
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              handleCollectionJump('cartridges');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#F97316]"
          >
            Cartridges
          </a>
          <a
            href="#unitech"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#F97316]"
          >
            Unitech
          </a>
          <a
            href="#verify"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#F97316]"
          >
            Verify
          </a>
        </nav>

        {/* Zone 3: 1 primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open shopping bag, ${bagCount} items`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-zinc-950 font-semibold text-xs sm:text-sm px-4 py-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Bag</span>
            <span className="font-mono-tabular">({bagCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-zinc-200 hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-white/[0.08] bg-[#09090B] px-4 py-4 flex flex-col gap-2"
        >
          <button
            type="button"
            onClick={() => handleCollectionJump('xlim')}
            className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/5"
          >
            XLIM Series
          </button>
          <button
            type="button"
            onClick={() => handleCollectionJump('pod-mods')}
            className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/5"
          >
            Pod Mods
          </button>
          <button
            type="button"
            onClick={() => handleCollectionJump('cartridges')}
            className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/5"
          >
            Cartridges
          </button>
          <a
            href="#unitech"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/5"
          >
            Unitech Engineering
          </a>
          <a
            href="#verify"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/5"
          >
            Product Verification
          </a>
        </nav>
      )}
    </header>
  );
}

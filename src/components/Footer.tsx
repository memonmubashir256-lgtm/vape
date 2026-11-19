export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#09090B]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/[0.08]">
          <div className="md:col-span-5">
            <span className="font-display text-xl font-bold tracking-[0.22em] text-white">
              OXVA
            </span>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-sm">
              Founded in 2019 by Justin Lai, OXVA is committed to leading with innovation and
              delivering the most reliable pod systems in vaping.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Hardware Lines
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  XLIM Pro 2 &amp; XLIM GO
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  NeXLIM Dual Mesh
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  VPRIME 60W DTL
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Top-Fill Cartridges
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Support &amp; Compliance
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#verify" className="hover:text-white transition-colors">
                  Security Code Authentication
                </a>
              </li>
              <li>
                <a href="#unitech" className="hover:text-white transition-colors">
                  Unitech Coil Engineering
                </a>
              </li>
              <li>
                <span>Customer Care: support@oxva.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            WARNING: Products featured on this storefront are intended for adult smokers 21+ only.
          </p>
          <p className="shrink-0">© 2026 OXVA Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

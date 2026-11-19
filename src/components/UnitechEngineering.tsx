import type { OxvaProduct } from '../data/oxvaCatalog';

interface UnitechEngineeringProps {
  products: OxvaProduct[];
  onSelectProduct: (product: OxvaProduct) => void;
}

export function UnitechEngineering({ products, onSelectProduct }: UnitechEngineeringProps) {
  const comparedDevices = products.filter((p) =>
    ['xlim-pro-2', 'xlim-go', 'nexlim', 'vprime'].includes(p.id)
  );

  return (
    <section
      id="unitech"
      className="border-t border-white/[0.08] bg-[#0D0D10]"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Engineering Pillars */}
          <div className="lg:col-span-5 min-w-0">
            <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#F97316]">
              Unitech Architecture
            </p>
            <h2
              className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Built for X-treme flavor and zero-leak endurance.
            </h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Every OXVA pod platform pairs high-density cells with precision Unitech mesh coils
              calibrated for consistent vaporization from the first puff to the last drop.
            </p>

            <div className="mt-8 space-y-6 border-t border-white/[0.08] pt-6">
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  01. Dual-Mesh Unitech Heating
                </h3>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                  Uniform heat distribution doubles flavor clarity and extends cartridge longevity
                  across both Eco and Boost output modes.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  02. Five-Layer Anti-Leak Seal
                </h3>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                  Top-fill silicone ports and reinforced cotton barriers isolate condensation from
                  internal airflow sensors.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  03. Intelligent Ohm Matching
                </h3>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                  Automatic coil detection locks safe wattage ceilings for 0.2Ω DTL, 0.6Ω RDL, and
                  1.2Ω Nic Salt cartridges.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hardware Comparison Table */}
          <div className="lg:col-span-7 min-w-0">
            <div className="rounded-xl bg-[#121216] border border-white/[0.08] overflow-hidden">
              <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-white">
                  Pod System Specification Matrix
                </h3>
                <span className="text-xs text-zinc-400">Official 2026 Lineup</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-xs text-zinc-400">
                      <th className="py-3.5 px-5 font-medium">Device</th>
                      <th className="py-3.5 px-4 font-medium">Output</th>
                      <th className="py-3.5 px-4 font-medium">Battery</th>
                      <th className="py-3.5 px-4 font-medium">Pod Size</th>
                      <th className="py-3.5 px-5 font-medium text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {comparedDevices.map((device) => (
                      <tr
                        key={device.id}
                        className="hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="py-4 px-5">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(device)}
                            className="font-medium text-white hover:text-[#F97316] transition-colors text-left"
                          >
                            {device.name.replace('OXVA ', '')}
                          </button>
                          <div className="text-xs text-zinc-500">{device.specs.screen}</div>
                        </td>
                        <td className="py-4 px-4 font-mono-tabular text-zinc-200">
                          {device.specs.output}
                        </td>
                        <td className="py-4 px-4 font-mono-tabular text-zinc-200">
                          {device.specs.battery}
                        </td>
                        <td className="py-4 px-4 font-mono-tabular text-zinc-300">
                          {device.specs.capacity}
                        </td>
                        <td className="py-4 px-5 font-mono-tabular font-semibold text-white text-right">
                          ${device.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

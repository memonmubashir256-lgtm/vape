import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import { verifySecurityCode, type VerificationResult } from '../utils/storeLogic';

const SAMPLE_CODES = [
  'OXVA-8842-XLIM-9910',
  'OXVA-2026-NEX-4412',
  'OXVA-9011-VPR-3308',
];

export function AuthenticityVerifier() {
  const [codeInput, setCodeInput] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    setResult(verifySecurityCode(codeInput));
  };

  const handleSampleClick = (sample: string) => {
    setCodeInput(sample);
    setResult(verifySecurityCode(sample));
  };

  return (
    <section id="verify" className="border-t border-white/[0.08] bg-[#09090B]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-14 sm:py-16">
        <div className="rounded-xl bg-[#121216] border border-white/[0.08] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium tracking-[0.1em] uppercase text-[#F97316]">
                <Shield className="w-4 h-4" aria-hidden="true" />
                <span>Product Authentication</span>
              </div>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Verify Your Genuine OXVA Device
              </h2>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xl">
                Scratch the holographic security label on your OXVA hardware or cartridge box and
                enter the 16-character serial code below to confirm factory authenticity.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span>Try sample code:</span>
                {SAMPLE_CODES.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => handleSampleClick(sample)}
                    className="font-mono-tabular text-zinc-300 hover:text-[#F97316] underline underline-offset-4 transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 min-w-0">
              <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="oxva-security-code" className="sr-only">
                  Enter OXVA security code
                </label>
                <input
                  id="oxva-security-code"
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="e.g. OXVA-8842-XLIM-9910"
                  className="flex-1 rounded-lg bg-[#09090B] border border-white/15 px-4 py-3 font-mono-tabular text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F97316]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-zinc-950 font-semibold text-sm px-6 py-3 transition-colors whitespace-nowrap shrink-0"
                >
                  Verify Code
                </button>
              </form>

              {result && (
                <div
                  role="status"
                  className={`mt-4 rounded-lg border p-4 ${
                    result.status === 'authentic'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
                      : 'bg-red-500/10 border-red-500/30 text-red-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.status === 'authentic' ? (
                      <CheckCircle2
                        className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <AlertTriangle
                        className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                    <div className="text-sm">
                      <p className="font-semibold">
                        {result.status === 'authentic'
                          ? 'Authentic OXVA Product Confirmed'
                          : 'Verification Failed'}
                      </p>
                      <p className="mt-1 text-xs opacity-90">{result.message}</p>
                      {result.status === 'authentic' && result.model && (
                        <div className="mt-2 pt-2 border-t border-emerald-500/20 flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono-tabular text-emerald-200">
                          <span>Model: {result.model}</span>
                          <span>Batch: {result.batchDate}</span>
                          <span>{result.region}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

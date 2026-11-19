import { ShieldCheck } from 'lucide-react';

interface AgeGateModalProps {
  onConfirm: () => void;
  onDecline: () => void;
  declined: boolean;
}

export function AgeGateModal({ onConfirm, onDecline, declined }: AgeGateModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="w-full max-w-md rounded-xl bg-[#121216] border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <span className="font-display text-xl font-bold tracking-[0.18em] text-white">
            OXVA
          </span>
          <span className="font-mono-tabular text-xs text-zinc-400">21+ Verification</span>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 id="age-gate-title" className="font-display text-xl font-semibold text-white">
              Are you of legal smoking age?
            </h2>
            <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
              OXVA products are intended exclusively for adult smokers and vapers aged 21 or older.
              Please confirm your age to enter the official storefront.
            </p>
          </div>
        </div>

        {declined && (
          <div
            role="alert"
            className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-xs text-red-200"
          >
            Access restricted. You must be 21 years or older to view OXVA pod systems and hardware.
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-zinc-950 font-semibold text-sm py-2.5 px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] whitespace-nowrap"
          >
            I am 21 or older
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="flex-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-medium text-sm py-2.5 px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
          >
            Under 21
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { DollarSign, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

export default function Header({ onOpenCab }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-dark-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-finops-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-finops-500/25 border border-finops-400/30">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                Agent<span className="text-finops-400">FinOps</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-finops-500/20 text-finops-300 border border-finops-500/30">
                Cost Governor
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Autonomous Agent Token Budgeting & Spend Tracking Gateway
            </p>
          </div>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900 border border-finops-500/30 text-xs font-mono text-finops-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Gateway Proxy: gateway.agentfinops.dev (Active &lt;2ms)</span>
          </div>

          <button
            onClick={onOpenCab}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-finops-600 via-emerald-600 to-teal-600 text-white shadow-md shadow-finops-500/25 hover:shadow-finops-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all border border-finops-400/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Join Founding CAB (70% Off)</span>
          </button>
        </div>
      </div>
    </header>
  );
}

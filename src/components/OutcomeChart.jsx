import React, { useState } from 'react';
import { TrendingUp, DollarSign, Zap, ShieldAlert, Clock, Server, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * OutcomeChart for AgentFinOps (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares $15,000/mo cloud cost consulting retainers & runaway AI loops ($6 layer)
 * with Autonomous Real-Time Token Budgeting & Spend Tracking Gateway ($1 software layer).
 */
export default function OutcomeChart({
  serviceName = "Autonomous Agent FinOps & Hard Token Budgeting Proxy",
  defaultMonthlySpend = 14000,
  onCtaClick
}) {
  const [currentSpend, setCurrentSpend] = useState(defaultMonthlySpend);

  // Legacy runaway risk + FinOps consultant: $3,500/mo retainer + 35% average token waste from un-routed prompts & runaway retry loops
  const legacyServicesCost = currentSpend + 3500;
  // AgentFinOps software fee: $49/mo flat + model routing savings (cuts 42% of LLM bill via Claude Haiku/GPT-4o mini dynamic fallback)
  const autoSoftwareCost = Math.round(currentSpend * 0.58) + 49;
  const netValueReclaimed = legacyServicesCost - autoSoftwareCost;
  const savingsPercent = Math.round(((legacyServicesCost - autoSoftwareCost) / legacyServicesCost) * 100);

  const maxCost = Math.max(legacyServicesCost, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((autoSoftwareCost / maxCost) * 100), 5);

  return (
    <div className="relative rounded-2xl border border-emerald-500/30 bg-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden my-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-900 border-emerald-500/40 text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs $15,000/mo Cloud FinOps Retainers ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Agent Token Economics: <span className="text-emerald-400">{savingsPercent}% Cloud Spend Reclaimed</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Julien Bek Thesis: Displacing expensive cloud audit consultants and surprise $50,000 runaway LLM loop bills with automated hard-cap edge proxies.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 border border-emerald-500/30 rounded-xl p-3">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">Net Monthly Savings</div>
            <div className="text-lg font-black text-emerald-400 font-mono">
              +${netValueReclaimed.toLocaleString()}/mo
            </div>
          </div>
        </div>
      </div>

      {/* Slider Control */}
      <div className="my-6 bg-slate-900/60 rounded-xl p-4 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Monthly Raw LLM / Foundation Model Invoice ($):</span>
          </label>
          <span className="text-base font-bold text-emerald-400 font-mono bg-emerald-500/10 px-3 py-0.5 rounded-lg border border-emerald-500/20">
            ${currentSpend.toLocaleString()}/mo
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="50000"
          step="500"
          value={currentSpend}
          onChange={(e) => setCurrentSpend(parseInt(e.target.value))}
          className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer h-2"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>$1,000 Startup</span>
          <span>$25,000 Production Fleet</span>
          <span>$50,000+ Enterprise Scaling</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Legacy Manual Services ($6) */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Un-Governed Direct API Keys</h4>
                <p className="text-xs text-rose-300/70">Manual Audits & Runaway Risk</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-rose-400 bg-rose-500/10 px-2 py-1 rounded">
              The $6 Service Layer
            </span>
          </div>

          <div className="space-y-3 mb-6 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">• Raw Model Invoices (No Routing):</span>
              <span className="font-mono text-rose-400 font-bold">${currentSpend.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• FinOps Consultant Retainer:</span>
              <span className="font-mono text-rose-400 font-bold">$3,500/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Runaway Recursive Loop Liability:</span>
              <span className="font-mono text-rose-400 font-bold">Uncapped ($50k+)</span>
            </div>
            <div className="border-t border-rose-500/20 pt-2 flex justify-between font-bold text-sm">
              <span className="text-white">Total Cloud Bill:</span>
              <span className="font-mono text-rose-400">${legacyServicesCost.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Bar visualization */}
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-rose-500/30">
            <div
              className="bg-gradient-to-r from-rose-600 to-rose-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${legacyBarHeight}%` }}
            />
          </div>
        </div>

        {/* AgentFinOps Software Layer ($1) */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-5 relative overflow-hidden shadow-lg shadow-emerald-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">AgentFinOps Governed Proxy</h4>
                <p className="text-xs text-emerald-300/80">Sub-3ms Dynamic Model Routing</p>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
              The $1 Software Layer
            </span>
          </div>

          <div className="space-y-3 mb-6 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">• Dynamic Model Fallback Arbitrage:</span>
              <span className="font-mono text-emerald-400 font-bold">-42% token cost</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Hard Dollar Velocity Cutoffs:</span>
              <span className="font-mono text-emerald-400 font-bold">Immediate 402 cut</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">• Governed Bill + Platform Fee:</span>
              <span className="font-mono text-emerald-400 font-bold">${autoSoftwareCost.toLocaleString()}/mo</span>
            </div>
            <div className="border-t border-emerald-500/20 pt-2 flex justify-between font-bold text-sm">
              <span className="text-white">Software Price:</span>
              <span className="font-mono text-emerald-400">${autoSoftwareCost.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Bar visualization */}
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-emerald-500/30">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${autoBarHeight}%` }}
            />
          </div>
        </div>
      </div>

      {/* Larry Ellison Economic Guarantee Box */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>The Ellison SLA: Zero Overrun Guarantee</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">100% Hard Cap</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              If any agent exceeds its allocated dollar limit through our proxy gateway, AgentFinOps reimburses 100% of the excess invoice directly.
            </p>
          </div>
        </div>

        <button
          onClick={onCtaClick}
          className="whitespace-nowrap px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
        >
          Deploy Edge Proxy Free
        </button>
      </div>
    </div>
  );
}

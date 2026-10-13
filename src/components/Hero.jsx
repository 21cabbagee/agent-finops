import React from 'react';
import { DollarSign, ShieldAlert, Zap, TrendingUp, Sparkles, Server, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function Hero({ onOpenCab, onScrollToSimulator }) {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-finops-600/20 via-emerald-500/15 to-teal-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* SEO Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900/90 border border-finops-500/30 text-finops-300 text-xs font-semibold mb-6 shadow-sm shadow-finops-500/10">
            <span className="flex h-2 w-2 rounded-full bg-finops-400 animate-ping" />
            <span className="tracking-wide">Autonomous Agent FinOps & Token Cost Governor</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-mono text-[11px]">&lt;3ms Edge Proxy</span>
          </div>

          {/* Exact Specification H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.15]">
            Agent FinOps: <span className="text-transparent bg-clip-text bg-gradient-to-r from-finops-400 via-emerald-300 to-teal-300">Real-Time Token Budgeting</span> & Spend Tracking for AI Agents
          </h1>

          {/* Core Value Proposition Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Drop-in proxy gateway that attributes token spend per agent in real time, alerts when velocity spikes, and hard-cuts rogue loops before they cost you $100.
          </p>

          {/* Key Metrics / Value Highlights */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-dark-900/70 border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-finops-400 mb-1">
                <Server className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">&lt;3ms Latency</span>
              </div>
              <p className="text-xs text-slate-400">Zero SDK rewrite: single baseURL swap</p>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-900/70 border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">Hard Dollar Caps</span>
              </div>
              <p className="text-xs text-slate-400">Auto-rejects with HTTP 402/429 at limit</p>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-900/70 border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-teal-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">Velocity Spike Sentinel</span>
              </div>
              <p className="text-xs text-slate-400">Instant kill-switch if &gt;$10/5min burn</p>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-900/70 border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">$474M TAM</span>
              </div>
              <p className="text-xs text-slate-400">500k+ builders bleeding uncapped LLM spend</p>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenCab}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-finops-500 via-emerald-500 to-teal-500 text-slate-950 hover:text-black shadow-lg shadow-finops-500/25 hover:shadow-finops-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-sans"
            >
              <Sparkles className="w-4 h-4 text-emerald-950" />
              <span>Join Founding CAB — 70% Lifetime Off ($24/mo)</span>
            </button>

            <button
              onClick={onScrollToSimulator}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-dark-900/90 border border-finops-500/30 text-white hover:bg-dark-850 hover:border-finops-400/50 transition-all flex items-center justify-center gap-2"
            >
              <Server className="w-4 h-4 text-finops-400" />
              <span>Launch Reverse Proxy Simulator</span>
            </button>
          </div>

          {/* Social Proof Bar */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-finops-400" />
              Supports OpenAI, Anthropic, Gemini, Groq, Ollama
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-finops-400" />
              LangChain, CrewAI, AutoGen Compatible
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CabModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [monthlySpend, setMonthlySpend] = useState('$500 - $2,500/mo');
  const [framework, setFramework] = useState('CrewAI / LangChain');
  const [agentCount, setAgentCount] = useState('5 - 15 agents');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Confetti fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-finops-500/40 bg-dark-950 p-6 sm:p-8 shadow-2xl shadow-finops-500/20 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-finops-500/20 border border-finops-500/30 text-finops-300 text-xs font-mono font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                FOUNDING COHORT • 10 SEATS ONLY
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              Join Customer Advisory Board (CAB)
            </h3>

            {/* Verbatim Pitch Script */}
            <div className="mt-3 p-3.5 rounded-xl bg-dark-900 border border-white/10 text-xs text-slate-300 leading-relaxed font-sans italic">
              "We are assembling a 10-member Customer Advisory Board (CAB) for AgentFinOps to solve this exact bottleneck. We are offering a 70% lifetime platform discount ($24/mo instead of $79/mo) and dedicated onboarding for our first cohort."
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 font-sans">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs font-mono focus:border-finops-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Company / Team</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Autonomous"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs font-mono focus:border-finops-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Estimated LLM Spend</label>
                  <select
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs font-mono focus:border-finops-400 outline-none"
                  >
                    <option value="<$500/mo">&lt; $500 / mo</option>
                    <option value="$500 - $2,500/mo">$500 - $2,500 / mo</option>
                    <option value="$2,500 - $10,000/mo">$2,500 - $10,000 / mo</option>
                    <option value=">$10,000/mo">&gt; $10,000 / mo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Agent Framework</label>
                  <select
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs font-mono focus:border-finops-400 outline-none"
                  >
                    <option value="CrewAI / LangChain">CrewAI / LangChain</option>
                    <option value="AutoGen / Semantic Kernel">AutoGen / Semantic Kernel</option>
                    <option value="Custom In-House Python/TS">Custom In-House Python/TS</option>
                    <option value="LlamaIndex Multi-Agent">LlamaIndex Multi-Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Active Agents</label>
                  <select
                    value={agentCount}
                    onChange={(e) => setAgentCount(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs font-mono focus:border-finops-400 outline-none"
                  >
                    <option value="1 - 4 agents">1 - 4 agents</option>
                    <option value="5 - 15 agents">5 - 15 agents</option>
                    <option value="15+ agents">15+ agents</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-finops-500 via-emerald-500 to-teal-500 hover:from-finops-400 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-finops-500/25 transition-all"
                >
                  <span>Claim 70% Lifetime Seat ($24/mo)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500">
                Guaranteed 14-day risk-free trial • Direct Slack channel with founders
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Welcome to Founding CAB!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto mb-4">
              Your seat has been reserved at <span className="font-mono text-emerald-400 font-bold">$24/mo lifetime</span>. Dedicated onboarding link and proxy API key sent to <span className="font-mono text-white">{email}</span>.
            </p>
            <div className="p-3 rounded-xl bg-dark-900 border border-white/10 text-xs font-mono text-finops-300 mb-6">
              Assigned Seat: Founding Member #04 of 10
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

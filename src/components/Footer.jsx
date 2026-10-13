import React from 'react';
import { DollarSign, Shield, Terminal, Globe, Heart } from 'lucide-react';

export default function Footer({ onOpenCab }) {
  return (
    <footer className="border-t border-white/10 bg-dark-950/90 pt-12 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-finops-500/20 border border-finops-500/40 flex items-center justify-center text-finops-400">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">
                Agent<span className="text-finops-400">FinOps</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              Autonomous agent token budgeting & spend tracking gateway. Forward LLM calls through our edge proxy to eliminate runaway billing loops, attribute spend per agent, and enforce hard dollar limits.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Canonical URL: <span className="text-finops-300">/tools/agent-finops-token-spend-governor</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3">
              Edge Proxy Stack
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li><a href="#proxy-simulator" className="hover:text-finops-300 transition-colors">gateway.agentfinops.dev/v1</a></li>
              <li><span className="text-slate-500">Cloudflare Workers / Hono</span></li>
              <li><span className="text-slate-500">Upstash Redis Token Counters</span></li>
              <li><span className="text-slate-500">Sub-3ms Roundtrip Latency</span></li>
              <li><span className="text-slate-500">HTTP 402/429 Hard Cutoffs</span></li>
            </ul>
          </div>

          {/* SEO Matrix */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3">
              Target Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-white transition-colors cursor-default">ai agent finops spend tracker</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">llm api cost governor and budget cap</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">track token cost per agent crewai</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">prevent openai runaway billing proxy</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} AgentFinOps. All rights reserved. Zero-risk 12-hour MVP architecture.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCab}
              className="text-finops-400 hover:text-finops-300 font-semibold"
            >
              Founding Customer Advisory Board (CAB)
            </button>
            <span>•</span>
            <span className="text-slate-600">Built for Autonomous Agent Builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { AlertOctagon, ShieldCheck, Flame, X, ArrowRight, PauseCircle, CheckCircle2 } from 'lucide-react';

export default function VelocitySpikeAlertBanner({ alert, onHaltAgent, onDismiss }) {
  const [halted, setHalted] = useState(true);

  if (!alert) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="relative overflow-hidden rounded-2xl border border-red-500/40 bg-gradient-to-r from-red-950/60 via-dark-900/90 to-dark-950/90 p-4 sm:p-5 shadow-xl shadow-red-950/30 backdrop-blur-md">
        {/* Animated Warning Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          {/* Alert Icon & Copy */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-0.5 text-red-400 animate-pulse">
              <Flame className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-red-500/30 text-red-300 border border-red-500/40">
                  CRITICAL VELOCITY SPIKE DETECTED
                </span>
                <span className="text-xs text-red-400/80 font-mono">
                  Triggered at {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-100">
                Agent <span className="font-mono text-red-300 font-bold">{alert.agentName}</span> burned{' '}
                <span className="font-mono text-white font-bold bg-red-500/20 px-1 rounded">{alert.spikeAmount}</span> in{' '}
                <span className="font-mono text-slate-200">{alert.timeWindow}</span>{' '}
                (exceeded safety threshold of {alert.threshold}).
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {alert.savedLossEst}
                </span>
                <span>•</span>
                <span className="text-slate-400">Model: {alert.model}</span>
                <span>•</span>
                <span className="text-slate-400">Proxy Action: Gateway returned HTTP 429 Throttle</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
            {halted ? (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Rogue Loop Halted (Throttled)</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setHalted(true);
                  if (onHaltAgent) onHaltAgent(alert.agentName);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all"
              >
                <PauseCircle className="w-4 h-4" />
                <span>Emergency Halt Loop</span>
              </button>
            )}

            <button
              onClick={onDismiss}
              className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
              title="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

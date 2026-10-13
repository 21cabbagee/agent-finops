import React, { useState } from 'react';
import { DollarSign, ShieldAlert, Tag, Edit3, Check, X, Plus, AlertCircle, CheckCircle2, TrendingUp, Play } from 'lucide-react';

export default function AgentSpendLeaderboard({ agents, onUpdateCap, onSimulateCall, onAddAgent }) {
  const [editingId, setEditingId] = useState(null);
  const [editCapValue, setEditCapValue] = useState('');
  const [filterTag, setFilterTag] = useState('ALL');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentModel, setNewAgentModel] = useState('GPT-4o');
  const [newAgentCap, setNewAgentCap] = useState('25.00');
  const [newAgentClient, setNewAgentClient] = useState('enterprise_client');

  const totalDailySpend = agents.reduce((acc, a) => acc + a.dailySpend, 0);
  const totalDailyCaps = agents.reduce((acc, a) => acc + a.dailyCap, 0);
  const cappedAgentsCount = agents.filter(a => a.dailySpend >= a.dailyCap).length;

  const handleStartEdit = (agent) => {
    setEditingId(agent.id);
    setEditCapValue(agent.dailyCap.toFixed(2));
  };

  const handleSaveEdit = (agentId) => {
    const val = parseFloat(editCapValue);
    if (!isNaN(val) && val > 0) {
      onUpdateCap(agentId, val);
    }
    setEditingId(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;
    onAddAgent({
      id: `agent-${Date.now()}`,
      name: newAgentName.trim(),
      model: newAgentModel,
      dailySpend: 0.00,
      dailyCap: parseFloat(newAgentCap) || 30.00,
      tokensToday: '0',
      status: 'HEALTHY',
      velocityRate: '$0.00 / hr',
      clientTag: newAgentClient.trim() || 'default_ops',
      lastCall: 'Never',
      activeCalls: 0
    });
    setNewAgentName('');
    setShowAddForm(false);
  };

  const filteredAgents = filterTag === 'ALL'
    ? agents
    : agents.filter(a => a.clientTag === filterTag);

  const uniqueTags = ['ALL', ...new Set(agents.map(a => a.clientTag))];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-finops-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Real-Time Per-Agent Attribution & Hard Dollar Caps</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Agent Spend & Budget Governor Matrix
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Aggregated sub-second token telemetry indexed by <code className="text-finops-300 font-mono">x-agent-id</code> and <code className="text-finops-300 font-mono">x-client-id</code>.
          </p>
        </div>

        {/* Global Summary Stats */}
        <div className="flex items-center gap-3 bg-dark-900/90 border border-white/10 rounded-2xl p-3 shrink-0">
          <div className="px-3 border-r border-white/10">
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-mono">Total Spend Today</span>
            <span className="text-lg font-bold font-mono text-emerald-400">${totalDailySpend.toFixed(2)}</span>
          </div>
          <div className="px-3 border-r border-white/10">
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-mono">Total Allocated Caps</span>
            <span className="text-lg font-bold font-mono text-slate-200">${totalDailyCaps.toFixed(2)}</span>
          </div>
          <div className="px-3">
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-mono">Throttled / Capped</span>
            <span className={`text-lg font-bold font-mono ${cappedAgentsCount > 0 ? 'text-red-400' : 'text-slate-400'}`}>
              {cappedAgentsCount} agents
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Add Agent */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {/* Client Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 mr-1 font-mono">Client Filter:</span>
          {uniqueTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                filterTag === tag
                  ? 'bg-finops-500/20 text-finops-300 border border-finops-500/40 font-bold'
                  : 'bg-dark-900/60 text-slate-400 border border-white/5 hover:text-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Add Agent Trigger */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-900 border border-finops-500/30 text-finops-300 hover:bg-dark-850 hover:text-finops-200 text-xs font-semibold transition-all ml-auto"
        >
          {showAddForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{showAddForm ? 'Cancel' : 'Register New Agent'}</span>
        </button>
      </div>

      {/* New Agent Quick Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="mb-6 p-4 rounded-2xl bg-dark-900 border border-finops-500/40 grid grid-cols-1 sm:grid-cols-4 gap-3 animate-fadeIn">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Agent Name (x-agent-id)</label>
            <input
              type="text"
              required
              placeholder="e.g. DocReviewer_v1"
              value={newAgentName}
              onChange={(e) => setNewAgentName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-white/10 text-white text-xs font-mono focus:border-finops-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Model Assigned</label>
            <select
              value={newAgentModel}
              onChange={(e) => setNewAgentModel(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-white/10 text-white text-xs font-mono focus:border-finops-400 outline-none"
            >
              <option value="GPT-4o">GPT-4o ($5.00/1M tokens)</option>
              <option value="GPT-4o-mini">GPT-4o-mini ($0.15/1M tokens)</option>
              <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet ($3.00/1M tokens)</option>
              <option value="Llama 3.3 70B">Llama 3.3 70B ($0.59/1M tokens)</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Daily Cap ($ USD)</label>
            <input
              type="number"
              step="1"
              required
              value={newAgentCap}
              onChange={(e) => setNewAgentCap(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-dark-950 border border-white/10 text-white text-xs font-mono focus:border-finops-400 outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-1.5 rounded-lg bg-finops-500 hover:bg-finops-400 text-dark-950 font-bold text-xs transition-all shadow-md"
            >
              Register & Enforce Cap
            </button>
          </div>
        </form>
      )}

      {/* Agents Table / Matrix */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-dark-900/60 backdrop-blur-md shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-dark-950/70 text-slate-400 font-mono">
              <th className="py-3.5 px-4 font-semibold">Agent Identifier</th>
              <th className="py-3.5 px-4 font-semibold">Client / Tag</th>
              <th className="py-3.5 px-4 font-semibold">Model</th>
              <th className="py-3.5 px-4 font-semibold">Daily Spend vs. Hard Cap</th>
              <th className="py-3.5 px-4 font-semibold">Burn Velocity</th>
              <th className="py-3.5 px-4 font-semibold">Governor Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {filteredAgents.map((agent) => {
              const percent = Math.min(100, Math.round((agent.dailySpend / agent.dailyCap) * 100));
              const isCapped = agent.dailySpend >= agent.dailyCap;
              const isWarning = !isCapped && percent >= 80;

              return (
                <tr key={agent.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Name & Tokens */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-white font-mono flex items-center gap-1.5">
                      <span>{agent.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {agent.tokensToday} tokens today • Last: {agent.lastCall}
                    </div>
                  </td>

                  {/* Client Tag */}
                  <td className="py-4 px-4 font-mono">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 text-[11px]">
                      {agent.clientTag}
                    </span>
                  </td>

                  {/* Model */}
                  <td className="py-4 px-4 text-slate-300 font-mono">
                    {agent.model}
                  </td>

                  {/* Spend vs Cap Progress */}
                  <td className="py-4 px-4 min-w-[200px]">
                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                      <span className={isCapped ? 'text-red-400 font-bold' : 'text-emerald-400 font-semibold'}>
                        ${agent.dailySpend.toFixed(2)}
                      </span>
                      <span className="text-slate-400">
                        Cap:{' '}
                        {editingId === agent.id ? (
                          <span className="inline-flex items-center gap-1">
                            <input
                              type="number"
                              step="1"
                              value={editCapValue}
                              onChange={(e) => setEditCapValue(e.target.value)}
                              className="w-16 px-1.5 py-0.5 rounded bg-dark-950 border border-finops-400 text-white text-xs font-mono outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveEdit(agent.id)}
                              className="p-1 rounded hover:bg-emerald-500/20 text-emerald-400"
                              title="Save Cap"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 rounded hover:bg-red-500/20 text-red-400"
                              title="Cancel"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ) : (
                          <span
                            onClick={() => handleStartEdit(agent)}
                            className="text-slate-200 hover:text-finops-300 cursor-pointer underline decoration-dotted"
                            title="Click to edit cap"
                          >
                            ${agent.dailyCap.toFixed(2)}
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-dark-950 overflow-hidden border border-white/5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCapped
                            ? 'bg-red-500'
                            : isWarning
                            ? 'bg-amber-400'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-0.5 font-mono">
                      <span>{percent}% consumed</span>
                      <span>{100 - percent > 0 ? `$${(agent.dailyCap - agent.dailySpend).toFixed(2)} remaining` : 'LIMIT HIT'}</span>
                    </div>
                  </td>

                  {/* Velocity Rate */}
                  <td className="py-4 px-4 font-mono">
                    <span className={`text-[11px] ${agent.velocityRate.includes('SPIKE') ? 'text-red-400 font-bold' : 'text-slate-300'}`}>
                      {agent.velocityRate}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 font-mono">
                    {isCapped ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[11px] font-bold">
                        <AlertCircle className="w-3 h-3" />
                        HTTP 402/429 CAPPED
                      </span>
                    ) : isWarning ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                        <AlertCircle className="w-3 h-3" />
                        80%+ WARN
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        HEALTHY
                      </span>
                    )}
                  </td>

                  {/* Quick Action */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSimulateCall(agent)}
                        className="px-2.5 py-1 rounded-lg bg-dark-850 hover:bg-dark-800 border border-white/10 text-white font-mono text-[11px] flex items-center gap-1 transition-all"
                        title="Simulate call via Edge Gateway"
                      >
                        <Play className="w-3 h-3 text-finops-400" />
                        <span>Simulate Call</span>
                      </button>
                      <button
                        onClick={() => handleStartEdit(agent)}
                        className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
                        title="Adjust Budget Cap"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

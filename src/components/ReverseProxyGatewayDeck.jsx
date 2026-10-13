import React, { useState } from 'react';
import { Terminal, Server, ShieldCheck, AlertOctagon, CheckCircle2, Copy, Check, Play, RefreshCw, Zap } from 'lucide-react';

export default function ReverseProxyGatewayDeck({ agents, onExecuteSimulatedCall }) {
  const [activeTab, setActiveTab] = useState('python');
  const [copied, setCopied] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0]?.id || 'agent-research-bot');
  const [tokenBatchSize, setTokenBatchSize] = useState(3500);
  const [simulating, setSimulating] = useState(false);
  const [simLog, setSimLog] = useState(null);

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pythonSnippet = `from openai import OpenAI
import os

# Point standard SDK to AgentFinOps Edge Proxy (Zero code change)
client = OpenAI(
    base_url="https://gateway.agentfinops.dev/v1",
    api_key=os.environ.get("OPENAI_API_KEY"),
    default_headers={
        "x-agent-id": "${selectedAgent?.name || 'ResearchBot_v3'}",
        "x-client-id": "${selectedAgent?.clientTag || 'acme_corp'}",
        "x-daily-cap-usd": "${selectedAgent?.dailyCap?.toFixed(2) || '50.00'}"
    }
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Synthesize market metrics..."}]
)
print(response.choices[0].message.content)`;

  const tsSnippet = `import OpenAI from 'openai';

// Drop-in reverse proxy URL — sub-3ms edge latency
const openai = new OpenAI({
  baseURL: 'https://gateway.agentfinops.dev/v1',
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    'x-agent-id': '${selectedAgent?.name || 'ResearchBot_v3'}',
    'x-client-id': '${selectedAgent?.clientTag || 'acme_corp'}',
    'x-daily-cap-usd': '${selectedAgent?.dailyCap?.toFixed(2) || '50.00'}'
  }
});

const res = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Execute task pipeline' }]
});`;

  const curlSnippet = `curl https://gateway.agentfinops.dev/v1/chat/completions \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "x-agent-id: ${selectedAgent?.name || 'ResearchBot_v3'}" \\
  -H "x-client-id: ${selectedAgent?.clientTag || 'acme_corp'}" \\
  -H "x-daily-cap-usd: ${selectedAgent?.dailyCap?.toFixed(2) || '50.00'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Run deep extraction"}]
  }'`;

  const currentCode = activeTab === 'python' ? pythonSnippet : activeTab === 'ts' ? tsSnippet : curlSnippet;

  const handleRunSimulation = () => {
    setSimulating(true);

    setTimeout(() => {
      setSimulating(false);
      // Cost calculation approximation based on model
      let ratePer1k = 0.005; // $5 per 1M -> $0.005 per 1k
      if (selectedAgent.model.includes('mini')) ratePer1k = 0.0003;
      if (selectedAgent.model.includes('Claude')) ratePer1k = 0.003;
      if (selectedAgent.model.includes('Llama')) ratePer1k = 0.0006;

      const callCost = parseFloat(((tokenBatchSize / 1000) * ratePer1k).toFixed(4));
      const projectedSpend = selectedAgent.dailySpend + callCost;
      const isOverCap = projectedSpend >= selectedAgent.dailyCap;

      const timestamp = new Date().toISOString();
      const latencyMs = (1.4 + Math.random() * 1.2).toFixed(2);

      let logPayload;
      if (isOverCap) {
        logPayload = {
          status: 402,
          statusText: 'Payment Required (HARD CAP EXCEEDED)',
          latency: `${latencyMs}ms`,
          agent: selectedAgent.name,
          client: selectedAgent.clientTag,
          tokens: tokenBatchSize,
          cost: `$${callCost.toFixed(4)}`,
          projectedSpend: `$${projectedSpend.toFixed(2)}`,
          dailyCap: `$${selectedAgent.dailyCap.toFixed(2)}`,
          response: {
            error: {
              code: "AGENT_DAILY_CAP_EXCEEDED",
              message: `Hard dollar budget cap ($${selectedAgent.dailyCap.toFixed(2)}) reached for agent '${selectedAgent.name}'. Request halted by AgentFinOps proxy to prevent runaway invoice bleed.`,
              action: "HTTP 402 halt triggered. No provider tokens billed."
            }
          }
        };
      } else {
        logPayload = {
          status: 200,
          statusText: 'OK (Forwarded to Provider)',
          latency: `${latencyMs}ms`,
          agent: selectedAgent.name,
          client: selectedAgent.clientTag,
          tokens: tokenBatchSize,
          cost: `$${callCost.toFixed(4)}`,
          newTotalSpend: `$${projectedSpend.toFixed(2)}`,
          dailyCap: `$${selectedAgent.dailyCap.toFixed(2)}`,
          response: {
            id: `chatcmpl-${Math.random().toString(36).substring(2, 9)}`,
            model: selectedAgent.model,
            usage: {
              prompt_tokens: Math.round(tokenBatchSize * 0.7),
              completion_tokens: Math.round(tokenBatchSize * 0.3),
              total_tokens: tokenBatchSize
            },
            finops_headers: {
              "x-agent-cost-attributed": `$${callCost.toFixed(4)}`,
              "x-agent-budget-remaining": `$${(selectedAgent.dailyCap - projectedSpend).toFixed(2)}`
            }
          }
        };
        // Update parent state
        if (onExecuteSimulatedCall) {
          onExecuteSimulatedCall(selectedAgent.id, callCost, tokenBatchSize);
        }
      }

      setSimLog(logPayload);
    }, 600);
  };

  return (
    <section id="proxy-simulator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-finops-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Server className="w-3.5 h-3.5" />
          <span>Feature 1 & 3: Drop-In Edge Gateway & Zero-Latency Interception</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Edge Reverse Proxy Gateway Simulator
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Swap your SDK <code className="text-finops-300 font-mono">baseURL</code> to <code className="text-finops-300 font-mono">https://gateway.agentfinops.dev/v1</code>. Every prompt and tool call is evaluated against your budget policy in sub-3ms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Code Integration Snippets */}
        <div className="lg:col-span-6 flex flex-col rounded-2xl border border-white/10 bg-dark-900/80 backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Tabs bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-dark-950/80 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-slate-400">Integration:</span>
              <button
                onClick={() => setActiveTab('python')}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  activeTab === 'python'
                    ? 'bg-finops-500/20 text-finops-300 border border-finops-500/30 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Python SDK
              </button>
              <button
                onClick={() => setActiveTab('ts')}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  activeTab === 'ts'
                    ? 'bg-finops-500/20 text-finops-300 border border-finops-500/30 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                TypeScript / Node
              </button>
              <button
                onClick={() => setActiveTab('curl')}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  activeTab === 'curl'
                    ? 'bg-finops-500/20 text-finops-300 border border-finops-500/30 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                cURL
              </button>
            </div>

            <button
              onClick={() => handleCopyCode(currentCode)}
              className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white bg-dark-850 px-2 py-1 rounded border border-white/5"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Code Viewer */}
          <div className="p-4 bg-dark-950/90 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed flex-1">
            <pre>
              <code>{currentCode}</code>
            </pre>
          </div>

          {/* Footer note */}
          <div className="p-3 border-t border-white/5 bg-dark-900/40 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
              Overhead &lt;2.4ms measured at Cloudflare edge
            </span>
            <span className="text-slate-500">Supports streaming (SSE) chunks</span>
          </div>
        </div>

        {/* Right Column: Live Interactive Execution Sandbox */}
        <div className="lg:col-span-6 flex flex-col rounded-2xl border border-white/10 bg-dark-900/80 backdrop-blur-md overflow-hidden shadow-2xl">
          {/* Top Config Header */}
          <div className="border-b border-white/10 bg-dark-950/80 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-finops-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Interactive Gateway Test Runner
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Live Simulation Mode</span>
          </div>

          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            {/* Control Inputs */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Agent Selector */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Target Agent</label>
                  <select
                    value={selectedAgentId}
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs font-mono focus:border-finops-400 outline-none"
                  >
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} (${a.dailySpend.toFixed(2)} / ${a.dailyCap.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Token Volume Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1">
                    <span>Simulated Tokens</span>
                    <span className="text-finops-300 font-bold">{tokenBatchSize.toLocaleString()} tokens</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="15000"
                    step="500"
                    value={tokenBatchSize}
                    onChange={(e) => setTokenBatchSize(Number(e.target.value))}
                    className="w-full accent-finops-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Status summary of selected agent */}
              <div className="p-3 rounded-xl bg-dark-950/80 border border-white/5 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-400">Current Spend: </span>
                  <span className="text-emerald-400 font-bold">${selectedAgent.dailySpend.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-slate-400">Daily Cap: </span>
                  <span className="text-slate-200 font-bold">${selectedAgent.dailyCap.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-slate-400">Status: </span>
                  <span className={selectedAgent.dailySpend >= selectedAgent.dailyCap ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                    {selectedAgent.dailySpend >= selectedAgent.dailyCap ? 'CAPPED' : 'ACTIVE'}
                  </span>
                </div>
              </div>

              {/* Execute Action */}
              <button
                onClick={handleRunSimulation}
                disabled={simulating}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-finops-500 to-emerald-600 hover:from-finops-400 hover:to-emerald-500 text-dark-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg shadow-finops-500/20"
              >
                {simulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Routing Request Through gateway.agentfinops.dev...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Send Request Through Gateway ({selectedAgent.name})</span>
                  </>
                )}
              </button>
            </div>

            {/* Response Console Output */}
            <div className="mt-4 rounded-xl border border-white/10 bg-dark-950 p-3.5 font-mono text-xs overflow-x-auto min-h-[160px] flex flex-col justify-center">
              {simLog ? (
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <span className={`font-bold flex items-center gap-1.5 ${simLog.status === 200 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {simLog.status === 200 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertOctagon className="w-3.5 h-3.5" />}
                      HTTP {simLog.status} {simLog.statusText}
                    </span>
                    <span className="text-slate-400 text-[11px]">Latency: {simLog.latency}</span>
                  </div>
                  <pre className="text-[11px] text-slate-300 leading-tight">
                    {JSON.stringify(simLog.response, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="text-center text-slate-500 py-6">
                  <Server className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                  <p>Click "Send Request Through Gateway" to execute real-time proxy budget check.</p>
                  <p className="text-[10px] text-slate-600 mt-1">Simulates sub-3ms edge inspection and hard dollar cap rejection.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

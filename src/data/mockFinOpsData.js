export const INITIAL_FINOPS_AGENTS = [
  {
    id: "agent-research-bot",
    name: "ResearchBot_v3",
    model: "Claude 3.5 Sonnet",
    dailySpend: 48.20,
    dailyCap: 50.00,
    tokensToday: "6,410,000",
    status: "WARNING_NEAR_CAP",
    velocityRate: "$2.10 / hr",
    clientTag: "acme_corp",
    lastCall: "12s ago",
    activeCalls: 2
  },
  {
    id: "agent-recursive-scraper",
    name: "RecursiveScraper_v2",
    model: "GPT-4o-mini",
    dailySpend: 62.40,
    dailyCap: 60.00,
    tokensToday: "8,920,000",
    status: "CAPPED_THROTTLED",
    velocityRate: "$14.20 / 4min (SPIKE TRIGGER)",
    clientTag: "internal_ops",
    lastCall: "Blocked 1m ago",
    activeCalls: 0
  },
  {
    id: "agent-sales-outreach",
    name: "SalesOutreach_v1",
    model: "GPT-4o",
    dailySpend: 18.40,
    dailyCap: 40.00,
    tokensToday: "2,150,000",
    status: "HEALTHY",
    velocityRate: "$0.80 / hr",
    clientTag: "growth_team",
    lastCall: "45s ago",
    activeCalls: 1
  },
  {
    id: "agent-code-assistant",
    name: "CodeAssistant_v1",
    model: "Llama 3.3 70B",
    dailySpend: 11.20,
    dailyCap: 50.00,
    tokensToday: "1,720,000",
    status: "HEALTHY",
    velocityRate: "$0.45 / hr",
    clientTag: "engineering",
    lastCall: "3m ago",
    activeCalls: 0
  }
];

export const INITIAL_VELOCITY_ALERTS = [
  {
    id: "alert-spike-scraper",
    agentName: "RecursiveScraper_v2",
    model: "GPT-4o-mini",
    spikeAmount: "$14.20",
    timeWindow: "4 minutes",
    threshold: "$10.00 / 5 minutes",
    status: "THROTTLED_ENFORCED",
    headline: "Velocity Spike Alert: RecursiveScraper_v2 burned $14.20 in 4 minutes (> $10/5min threshold). Infinite retry loop halted.",
    timestamp: "2026-10-13T23:36:12Z",
    savedLossEst: "$180+ saved in runaway token bleed"
  }
];

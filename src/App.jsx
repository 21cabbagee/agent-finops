import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VelocitySpikeAlertBanner from './components/VelocitySpikeAlertBanner';
import AgentSpendLeaderboard from './components/AgentSpendLeaderboard';
import ReverseProxyGatewayDeck from './components/ReverseProxyGatewayDeck';
import OutcomeChart from './components/OutcomeChart';
import CabModal from './components/CabModal';
import Footer from './components/Footer';
import { INITIAL_FINOPS_AGENTS, INITIAL_VELOCITY_ALERTS } from './data/mockFinOpsData';

export default function App() {
  const [agents, setAgents] = useState(INITIAL_FINOPS_AGENTS);
  const [velocityAlert, setVelocityAlert] = useState(INITIAL_VELOCITY_ALERTS[0]);
  const [isCabOpen, setIsCabOpen] = useState(false);

  // Update budget cap for an agent
  const handleUpdateCap = (agentId, newCap) => {
    setAgents(prev =>
      prev.map(agent => {
        if (agent.id === agentId) {
          const isCapped = agent.dailySpend >= newCap;
          const isWarning = !isCapped && (agent.dailySpend / newCap) >= 0.8;
          return {
            ...agent,
            dailyCap: newCap,
            status: isCapped ? 'CAPPED_THROTTLED' : isWarning ? 'WARNING_NEAR_CAP' : 'HEALTHY'
          };
        }
        return agent;
      })
    );
  };

  // Add new agent
  const handleAddAgent = (newAgent) => {
    setAgents(prev => [newAgent, ...prev]);
  };

  // Execute simulated call through gateway
  const handleSimulatedCall = (agentId, callCost, tokens) => {
    setAgents(prev =>
      prev.map(agent => {
        if (agent.id === agentId) {
          const updatedSpend = parseFloat((agent.dailySpend + callCost).toFixed(2));
          const currentTokensNum = parseInt(agent.tokensToday.replace(/,/g, ''), 10) || 0;
          const updatedTokens = (currentTokensNum + tokens).toLocaleString();
          const isCapped = updatedSpend >= agent.dailyCap;
          const isWarning = !isCapped && (updatedSpend / agent.dailyCap) >= 0.8;

          return {
            ...agent,
            dailySpend: updatedSpend,
            tokensToday: updatedTokens,
            lastCall: 'Just now (<1s)',
            status: isCapped ? 'CAPPED_THROTTLED' : isWarning ? 'WARNING_NEAR_CAP' : 'HEALTHY'
          };
        }
        return agent;
      })
    );
  };

  // Halt agent loop from velocity spike banner
  const handleHaltAgent = (agentName) => {
    setAgents(prev =>
      prev.map(agent => {
        if (agent.name === agentName) {
          return {
            ...agent,
            status: 'CAPPED_THROTTLED',
            activeCalls: 0,
            lastCall: 'Halted by Governor'
          };
        }
        return agent;
      })
    );
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('proxy-simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-finops-500 selection:text-dark-950">
      {/* Sticky Header */}
      <Header onOpenCab={() => setIsCabOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with exact SEO H1 */}
        <Hero
          onOpenCab={() => setIsCabOpen(true)}
          onScrollToSimulator={scrollToSimulator}
        />

        {/* Julien Bek $1:$6 Economic Engine / Larry Ellison SLA Proof */}
        <OutcomeChart onCtaClick={() => setIsCabOpen(true)} />

        {/* Feature 4: Real-Time Velocity Spike Alerts */}
        <VelocitySpikeAlertBanner
          alert={velocityAlert}
          onHaltAgent={handleHaltAgent}
          onDismiss={() => setVelocityAlert(null)}
        />

        {/* Feature 2 & 3: Per-Agent Cost Attribution & Hard Dollar Budget Caps */}
        <AgentSpendLeaderboard
          agents={agents}
          onUpdateCap={handleUpdateCap}
          onSimulateCall={(agent) => {
            scrollToSimulator();
          }}
          onAddAgent={handleAddAgent}
        />

        {/* Feature 1: Edge Reverse Proxy Gateway Integration Deck & Simulator */}
        <ReverseProxyGatewayDeck
          agents={agents}
          onExecuteSimulatedCall={handleSimulatedCall}
        />
      </main>

      {/* Footer with SEO Keywords & Canonical Slug */}
      <Footer onOpenCab={() => setIsCabOpen(true)} />

      {/* Customer Advisory Board (CAB) Modal with 70% Lifetime Discount */}
      <CabModal
        isOpen={isCabOpen}
        onClose={() => setIsCabOpen(false)}
      />
    </div>
  );
}

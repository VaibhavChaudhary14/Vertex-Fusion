'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Wifi, ShieldAlert, Database, Lock, AlertTriangle, Zap, Server, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- MOCK AUTHENTICATION (Replaces Firebase for Demo Stability) ---
// This prevents "invalid-api-key" errors while maintaining the auth flow UI
const useMockAuth = () => {
  const [user, setUser] = useState<{ uid: string } | null>(null);
  
  useEffect(() => {
    // Simulate checking local storage for a session
    const storedUser = localStorage.getItem('vertex_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // For demo purposes, auto-login to show the dashboard immediately
      // Remove this else block if you want to force the login screen first
      const demoUser = { uid: 'demo-operator' };
      localStorage.setItem('vertex_user', JSON.stringify(demoUser));
      setUser(demoUser);
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem('vertex_user');
    setUser(null);
    // Force reload to trigger guard
    window.location.href = '/';
  };

  return { user, signOut };
};

// --- INLINED COMPONENT: GridTopology ---
const GridTopology = () => {
  return (
    <div className="w-full h-full bg-black/40 rounded-lg overflow-hidden border border-white/10 relative flex items-center justify-center p-4">
      <svg viewBox="0 0 800 400" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Connections */}
        <line x1="200" y1="100" x2="200" y2="300" stroke="#333" strokeWidth="2" />
        <line x1="200" y1="100" x2="400" y2="100" stroke="#333" strokeWidth="2" />
        <line x1="400" y1="100" x2="600" y2="200" stroke="#333" strokeWidth="2" />
        <line x1="200" y1="300" x2="400" y2="300" stroke="#333" strokeWidth="2" />
        <line x1="400" y1="300" x2="600" y2="200" stroke="#333" strokeWidth="2" />
        {/* Cyber Links */}
        <line x1="200" y1="100" x2="300" y2="50" stroke="#00f3ff" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
        <line x1="600" y1="200" x2="700" y2="200" stroke="#00f3ff" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
        {/* Nodes - Generators */}
        <g transform="translate(200, 100)">
          <circle r="20" fill="#1a1a1a" stroke="#bc13fe" strokeWidth="2" filter="url(#glow)" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">G1</text>
        </g>
        <g transform="translate(200, 300)">
          <circle r="20" fill="#1a1a1a" stroke="#bc13fe" strokeWidth="2" filter="url(#glow)" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">G2</text>
        </g>
        {/* Nodes - Substations */}
        <g transform="translate(400, 100)">
          <rect x="-15" y="-15" width="30" height="30" fill="#1a1a1a" stroke="#666" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#ccc" fontSize="10" fontFamily="monospace">S1</text>
        </g>
        <g transform="translate(400, 300)">
          <rect x="-15" y="-15" width="30" height="30" fill="#1a1a1a" stroke="#666" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#ccc" fontSize="10" fontFamily="monospace">S2</text>
        </g>
        <g transform="translate(600, 200)">
          <rect x="-15" y="-15" width="30" height="30" fill="#1a1a1a" stroke="#666" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#ccc" fontSize="10" fontFamily="monospace">S3</text>
        </g>
        {/* Nodes - Cyber Routers */}
        <g transform="translate(300, 50)">
          <polygon points="0,-15 13,8 -13,8" fill="#000" stroke="#00f3ff" strokeWidth="2" filter="url(#glow)" />
          <text x="0" y="25" textAnchor="middle" fill="#00f3ff" fontSize="8" fontFamily="monospace">R1</text>
        </g>
        <g transform="translate(700, 200)">
          <polygon points="0,-15 13,8 -13,8" fill="#000" stroke="#00f3ff" strokeWidth="2" filter="url(#glow)" />
          <text x="0" y="25" textAnchor="middle" fill="#00f3ff" fontSize="8" fontFamily="monospace">R2</text>
        </g>
      </svg>
      <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-pink"></div> Physical Node
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-neon-cyan"></div> Cyber Node
        </div>
      </div>
    </div>
  );
};

// Mock Data Generators for "Live" Feel
const generateData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: i,
      voltage: 230 + Math.random() * 10 - 5,
      frequency: 60 + Math.random() * 0.5 - 0.25,
      packetSize: Math.floor(Math.random() * 500) + 100,
    });
  }
  return data;
};

export default function Dashboard() {
  const [data, setData] = useState(generateData());
  const [threatLevel, setThreatLevel] = useState("LOW");
  const [activeAlerts, setActiveAlerts] = useState<string[]>([]);
  const [observability, setObservability] = useState("FULL"); 
  const router = useRouter();
  const { user, signOut } = useMockAuth(); // Use our mock auth

  // Authentication Guard
  useEffect(() => {
    // Give a small delay for hydration before kicking out
    const timer = setTimeout(() => {
       if (!user && typeof window !== 'undefined' && !localStorage.getItem('vertex_user')) {
         router.push('/'); 
       }
    }, 500);
    return () => clearTimeout(timer);
  }, [user, router]);

  // Simulate Real-time Data Stream & Attack Injection
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newPoint = {
          time: prev[prev.length - 1].time + 1,
          voltage: 230 + Math.random() * 10 - 5 + (threatLevel === "CRITICAL" ? Math.random() * 50 : 0), // Voltage sag during attack
          frequency: 60 + Math.random() * 0.5 - 0.25,
          packetSize: Math.floor(Math.random() * 500) + 100 + (threatLevel === "CRITICAL" ? 2000 : 0), // DDoS/Ransomware traffic spike
        };
        return [...prev.slice(1), newPoint];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [threatLevel]);

  // Simulate Attack Scenario
  const injectAttack = (type: string) => {
    setThreatLevel("CRITICAL");
    setActiveAlerts(prev => [type, ...prev]);
    setTimeout(() => setThreatLevel("LOW"), 5000); // Attack subsides
  };

  // Prevent flashing unauthenticated content
  if (!user && typeof window !== 'undefined' && !localStorage.getItem('vertex_user')) {
      return <div className="min-h-screen bg-[#050b14] flex items-center justify-center text-neon-cyan font-mono">ACCESSING SECURE TERMINAL...</div>;
  }

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 hidden md:flex">
        <div className="flex items-center gap-2 text-xl font-bold text-neon-cyan">
          <Zap size={24} /> VERTEX
        </div>
        
        <nav className="space-y-4 font-mono text-sm">
          <div className="text-slate-500 text-xs mb-2">MONITORING</div>
          <button className="flex items-center gap-3 text-white bg-white/5 p-2 w-full rounded hover:bg-neon-cyan/20">
            <Activity size={16} /> Live Metrics
          </button>
          <button className="flex items-center gap-3 text-slate-400 p-2 w-full hover:text-white">
            <Wifi size={16} /> Cyber Traffic
          </button>
          
          <div className="text-slate-500 text-xs mb-2 mt-6">CONTROLS</div>
          <button 
            onClick={() => setObservability(prev => prev === "FULL" ? "PARTIAL" : "FULL")}
            className="flex items-center gap-3 text-slate-400 p-2 w-full hover:text-white"
          >
            <Database size={16} /> Mode: <span className={observability === "FULL" ? "text-green-400" : "text-yellow-400"}>{observability}</span>
          </button>
        </nav>

        <div className="mt-auto">
          <button onClick={signOut} className="text-xs text-red-400 hover:text-red-300">TERMINATE SESSION</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">MISSION CONTROL</h1>
            <p className="text-xs text-slate-500 font-mono">IEEE 14-BUS SYSTEM // REAL-TIME FUSION ENGINE</p>
          </div>
          
          <div className={`px-4 py-2 border ${threatLevel === 'CRITICAL' ? 'border-red-500 bg-red-500/10 text-red-500 animate-pulse' : 'border-green-500 bg-green-500/10 text-green-500'} font-mono font-bold rounded`}>
            STATUS: {threatLevel}
          </div>
        </header>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-4 border-l-4 border-neon-blue">
            <div className="text-slate-400 text-xs font-mono mb-1">GRID FREQUENCY</div>
            <div className="text-2xl font-bold text-white">{data[data.length-1].frequency.toFixed(2)} Hz</div>
          </div>
          <div className="glass-panel p-4 border-l-4 border-neon-pink">
            <div className="text-slate-400 text-xs font-mono mb-1">BUS VOLTAGE (AVG)</div>
            <div className="text-2xl font-bold text-white">{data[data.length-1].voltage.toFixed(1)} kV</div>
          </div>
          <div className="glass-panel p-4 border-l-4 border-neon-cyan">
            <div className="text-slate-400 text-xs font-mono mb-1">PACKET THROUGHPUT</div>
            <div className="text-2xl font-bold text-white">{data[data.length-1].packetSize} MB/s</div>
          </div>
          <div className="glass-panel p-4 border-l-4 border-red-500">
            <div className="text-slate-400 text-xs font-mono mb-1">THREAT PROBABILITY</div>
            <div className="text-2xl font-bold text-white">{(threatLevel === "CRITICAL" ? 98.4 : 2.1)}%</div>
          </div>
        </div>

        {/* Main Grid: Topology & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left: Topology (2 cols) */}
          <div className="lg:col-span-2 glass-panel p-1 min-h-[400px] flex flex-col">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><Server size={16} /> GRID TOPOLOGY (GNN MAP)</h3>
              <span className="text-xs font-mono text-neon-cyan">LIVE UPDATE</span>
            </div>
            <div className="flex-1 bg-black/20">
              <GridTopology />
            </div>
          </div>

          {/* Right: Attack Controls & Alerts (1 col) */}
          <div className="space-y-6">
            {/* Attack Simulator */}
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><ShieldAlert size={18} className="text-red-500"/> THREAT SIMULATION</h3>
              <div className="space-y-3">
                <button onClick={() => injectAttack("RANSOMWARE DETECTED")} className="w-full py-3 bg-red-500/10 border border-red-500/50 hover:bg-red-500 hover:text-black transition-all text-xs font-bold font-mono">
                  INJECT RANSOMWARE (RW)
                </button>
                <button onClick={() => injectAttack("FDI ATTACK DETECTED")} className="w-full py-3 bg-orange-500/10 border border-orange-500/50 hover:bg-orange-500 hover:text-black transition-all text-xs font-bold font-mono">
                  INJECT FDI (SENSOR SPOOF)
                </button>
                <button onClick={() => injectAttack("REVERSE SHELL ACTIVE")} className="w-full py-3 bg-yellow-500/10 border border-yellow-500/50 hover:bg-yellow-500 hover:text-black transition-all text-xs font-bold font-mono">
                  OPEN REVERSE SHELL
                </button>
              </div>
            </div>

            {/* Alert Feed */}
            <div className="glass-panel p-4 h-[300px] overflow-y-auto">
              <h3 className="text-xs font-bold font-mono text-slate-400 mb-4">SYSTEM LOGS</h3>
              {activeAlerts.length === 0 ? (
                <div className="text-green-500 text-xs font-mono">SYSTEM SECURE. NO ANOMALIES.</div>
              ) : (
                activeAlerts.map((alert, i) => (
                  <div key={i} className="mb-2 p-2 bg-red-500/20 border-l-2 border-red-500 text-xs font-mono text-red-200">
                    <span className="font-bold">[{new Date().toLocaleTimeString()}]</span> {alert}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom: Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-6">
            <h3 className="font-bold mb-4 text-neon-pink">PHYSICAL LAYER: VOLTAGE STABILITY</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[220, 240]} stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #bc13fe' }} />
                  <Line type="monotone" dataKey="voltage" stroke="#bc13fe" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-bold mb-4 text-neon-cyan">CYBER LAYER: NETWORK TRAFFIC</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" hide />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #00f3ff' }} />
                  <Area type="monotone" dataKey="packetSize" stroke="#00f3ff" fill="#00f3ff" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
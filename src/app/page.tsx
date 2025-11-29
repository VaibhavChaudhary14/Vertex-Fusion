<<<<<<< HEAD
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // If user is already authenticated, send them to Mission Control
  if (session?.user?.email) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 relative">
      {/* Gradient + glow background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
        <div className="absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 bg-neon-cyan/20 blur-3xl opacity-40" />
        <div className="absolute -bottom-40 right-10 h-72 w-72 bg-neon-pink/30 blur-3xl opacity-40" />
      </div>

      {/* Floating side nav (right) */}
      <aside className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 text-[10px] font-mono">
        <a
          href="#hero"
          className="group flex items-center gap-2 text-slate-500 hover:text-neon-cyan"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-neon-cyan transition-colors" />
          <span className="hidden lg:inline">Hero</span>
        </a>
        <a
          href="#features"
          className="group flex items-center gap-2 text-slate-500 hover:text-neon-cyan"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-neon-cyan transition-colors" />
          <span className="hidden lg:inline">Features</span>
        </a>
        <a
          href="#research"
          className="group flex items-center gap-2 text-slate-500 hover:text-neon-cyan"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-neon-cyan transition-colors" />
          <span className="hidden lg:inline">Research</span>
        </a>
        <a
          href="#pricing"
          className="group flex items-center gap-2 text-slate-500 hover:text-neon-cyan"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-neon-cyan transition-colors" />
          <span className="hidden lg:inline">Pricing</span>
        </a>
      </aside>

      {/* Navbar */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-neon-cyan/60 bg-black/60 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
              <span className="text-xs font-bold text-neon-cyan">VF</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                Vertex Fusion
              </span>
              <span className="text-[10px] font-mono uppercase text-slate-500">
                Cyber-Physical IDS
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <Link
              href="#features"
              className="hidden md:inline hover:text-neon-cyan transition-colors"
            >
              Features
            </Link>
            <Link
              href="#research"
              className="hidden md:inline hover:text-neon-cyan transition-colors"
            >
              Research
            </Link>
            <Link
              href="#pricing"
              className="hidden md:inline hover:text-neon-cyan transition-colors"
            >
              Pricing
            </Link>
            <div className="h-4 w-px bg-white/15 hidden md:block" />
            <Link
              href="/sign-in"
              className="hover:text-neon-cyan transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-neon-cyan px-3 py-1 text-[11px] font-semibold text-black shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:bg-cyan-300 transition-colors"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-center"
      >
        <div className="md:w-1/2 space-y-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neon-cyan/80">
            Smart Grid · GNN · Intrusion Detection
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-50">
            Turn <span className="text-neon-cyan">cyber-physical chaos</span>{" "}
            into a live, explainable{" "}
            <span className="text-neon-pink">GNN-powered IDS</span>.
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Vertex Fusion ingests cyber traffic and power system telemetry,
            runs Graph Neural Network inference, and highlights compromised
            buses and routers in real time – exactly like your research paper,
            but packaged as a scalable SaaS console.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/sign-up"
              className="rounded-full bg-neon-cyan px-4 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:bg-cyan-300 transition-colors"
            >
              Launch Mission Control
            </Link>
            <Link
              href="/sign-in"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-mono text-slate-200 hover:border-neon-cyan/60 hover:text-neon-cyan transition-colors"
            >
              I already have credentials
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 pt-4 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>Live GNN inference API</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
              <span>IEEE 14-bus topology visualizer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-pink" />
              <span>Project-scoped simulations per org</span>
            </div>
          </div>
        </div>

        {/* Right side "console" preview */}
        <div className="md:w-1/2">
          <div className="relative rounded-3xl border border-white/10 bg-black/60 p-4 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
            <div className="mb-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </span>
                /mission-control
              </span>
              <span className="text-neon-cyan">LIVE · GNN</span>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/80 to-slate-950/80 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono text-slate-400">
                    THREAT STATUS
                  </p>
                  <p className="text-lg font-semibold text-slate-50">
                    MALICIOUS TRAFFIC DETECTED
                  </p>
                </div>
                <div className="rounded-full border border-red-500/70 bg-red-500/10 px-3 py-1 text-[10px] font-mono text-red-300">
                  P = 0.97
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono text-slate-300">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <p className="text-slate-400 mb-1">Top compromised</p>
                  <ul className="space-y-1">
                    <li>
                      <span className="text-neon-pink">Bus-3</span> · FDI
                    </li>
                    <li>
                      <span className="text-neon-cyan">Router-R1</span> · RW
                    </li>
                    <li>
                      <span className="text-yellow-300">HMI-1</span> · Shell
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <p className="text-slate-400 mb-1">Last simulation</p>
                  <p>IEEE-14 / RANSOMWARE</p>
                  <p className="text-[10px] text-slate-500">
                    3.2s · 7 nodes flagged
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/60 p-3 text-[10px] font-mono text-slate-300 h-24 overflow-hidden">
                <p className="text-slate-500 mb-1">SYSTEM LOG</p>
                <p>[00:00:01] Ingesting PCAP + PMU stream...</p>
                <p>[00:00:02] Building fused CP-graph (14 buses, 5 routers)</p>
                <p className="text-neon-cyan">
                  [00:00:03] GNN verdict: MALICIOUS (P=0.97)
                </p>
                <p className="text-red-400">
                  [00:00:03] Isolating Bus-3, Router-R1...
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
              <span>Backed by Chebyshev GNN-based IDS research.</span>
              <Link
                href="#research"
                className="text-neon-cyan hover:text-cyan-300"
              >
                View research mapping →
              </Link>
=======
'use client';

import { useState, useEffect } from 'react';
// import Link from 'next/link'; // Removed to prevent build error
import AuthModal from './components/auth-modal'; // Changed to relative path
import { ArrowRight, Shield, Cpu, Activity, Zap } from 'lucide-react';

export default function LandingPage() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative font-sans">
      {/* Background Visuals */}
      <div className="scanlines"></div>
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 z-0"></div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />

      {/* Navigation */}
      <nav className="fixed w-full z-40 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
            <Zap className="text-neon-cyan" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-pink">
              VERTEX FUSION
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-mono tracking-widest text-slate-300">
            <a href="#features" className="hover:text-neon-cyan transition-colors">MODULES</a>
            <a href="#research" className="hover:text-neon-cyan transition-colors">RESEARCH</a>
            <a href="https://github.com/vaibhavchaudhary14/Vertex-Fusion" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors">DOCS</a>
          </div>
          <button 
            onClick={() => setAuthOpen(true)}
            className="border border-neon-cyan/50 text-neon-cyan px-6 py-2 text-sm font-mono hover:bg-neon-cyan hover:text-black transition-all"
          >
            ACCESS TERMINAL
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 mb-6 border border-neon-pink/50 text-neon-pink text-xs font-mono tracking-[0.2em]">
              SYSTEM ONLINE // V2.5.0
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              SECURE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-cyan animate-pulse">
                SMART GRID
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Next-Generation Cyber-Physical Intrusion Detection System (IDS) powered by Graph Neural Networks. 
              Fusing network logs and physical sensor data to detect <span className="text-white">Ransomware</span>, 
              <span className="text-white"> FDI</span>, and <span className="text-white">Blackouts</span> in real-time.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setAuthOpen(true)}
                className="bg-neon-cyan text-black px-8 py-4 font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all clip-path-polygon"
              >
                INITIALIZE DEMO
              </button>
              <a href="https://ieeexplore.ieee.org/document/example" target="_blank" rel="noopener noreferrer" className="border border-slate-600 px-8 py-4 font-mono text-slate-300 hover:border-white transition-all flex items-center gap-2">
                READ PAPER <ArrowRight size={16} />
              </a>
            </div>
          </div>
          
          {/* Abstract 3D Visualization Placeholder */}
          <div className="relative h-[500px] w-full glass-panel flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-20"></div>
            {/* Simulated Grid Animation */}
            <div className="grid grid-cols-6 gap-4 opacity-30 transform perspective-1000 rotate-x-12 animate-pulse">
               {[...Array(24)].map((_, i) => (
                 <div key={i} className="w-16 h-16 border border-neon-cyan rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-neon-pink rounded-full"></div>
                 </div>
               ))}
            </div>
            <div className="absolute z-30 text-center">
              <p className="text-neon-cyan font-mono text-sm mb-2">LIVE TOPOLOGY DETECTED</p>
              <div className="text-4xl font-bold text-white">IEEE 14-BUS</div>
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Features */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-4 pb-20 pt-6 space-y-6"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500">
          Why Vertex Fusion
        </p>
        <div className="grid gap-6 md:grid-cols-3 text-sm">
          <div className="glass-panel border border-white/10 rounded-2xl p-4 bg-white/5">
            <p className="text-xs font-mono text-neon-cyan mb-1">
              01 · Cyber-Physical Fusion
            </p>
            <p className="text-slate-300">
              Stream PCAP + power system measurements into a single graph for
              joint reasoning, instead of treating OT and IT in isolation.
            </p>
          </div>
          <div className="glass-panel border border-white/10 rounded-2xl p-4 bg-white/5">
            <p className="text-xs font-mono text-neon-pink mb-1">
              02 · GNN-Powered Detection
            </p>
            <p className="text-slate-300">
              Use a Chebyshev Graph Neural Network (ChebConv) to detect FDI,
              ransomware, reverse shells and more on top of your smart grid
              topology.
            </p>
          </div>
          <div className="glass-panel border border-white/10 rounded-2xl p-4 bg-white/5">
            <p className="text-xs font-mono text-neon-cyan mb-1">
              03 · SaaS Native
            </p>
            <p className="text-slate-300">
              Multi-tenant orgs, projects per grid, simulation history, and a
              clean API surface ready to plug into SCADA labs or research
              clusters.
            </p>
=======
      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 bg-black/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">CYBER-PHYSICAL CAPABILITIES</h2>
            <div className="w-24 h-1 bg-neon-pink mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="text-neon-cyan" size={32} />,
                title: "Multi-Modal Fusion",
                desc: "Correlates cyber logs (IP, TCP) with physical metrics (Voltage, Phase) for 99.8% detection accuracy."
              },
              {
                icon: <Cpu className="text-neon-pink" size={32} />,
                title: "Chebyshev GNNs",
                desc: "Uses Graph Neural Networks to learn spatial dependencies across complex grid topologies."
              },
              {
                icon: <Shield className="text-neon-blue" size={32} />,
                title: "Partial Observability",
                desc: "Maintains robustness even when 65% of grid sensors are offline or compromised."
              }
            ].map((feature, i) => (
              <div key={i} className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300">
                <div className="mb-6 p-4 bg-white/5 inline-block rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Research – give it its own vertical space */}
      <section
        id="research"
        className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10 min-h-[45vh] flex flex-col justify-center"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-3">
          Research Mapping
        </p>
        <p className="text-xs text-slate-400 max-w-2xl mb-4">
          Vertex Fusion is aligned directly with your cyber-physical IDS
          research. Each attack scenario (FDI, ransomware, reverse shell),
          each metric (voltage, frequency, packet statistics), and each
          topology element (buses, routers, HMIs) maps cleanly back to your
          experimental setup.
        </p>
        <ul className="text-xs text-slate-300 space-y-1">
          <li>• Visualize the IEEE 14-bus grid with cyber overlay.</li>
          <li>• Trigger attacks and see GNN predictions in real time.</li>
          <li>• Store simulation runs for papers, demos, and defenses.</li>
        </ul>
      </section>

      {/* Pricing – clearly separate section */}
      <section
        id="pricing"
        className="mx-auto max-w-6xl px-4 pb-16 pt-12 border-t border-white/10 min-h-[50vh]"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-4">
          Early Access Pricing
        </p>
        <div className="grid gap-6 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-mono text-slate-400 mb-1">Researcher</p>
            <p className="text-lg font-semibold mb-2">Free</p>
            <p className="text-xs text-slate-400 mb-3">
              For personal research and demos.
            </p>
            <ul className="text-xs text-slate-300 space-y-1 mb-3">
              <li>• 1 organization</li>
              <li>• Up to 3 projects</li>
              <li>• 200 simulations / month</li>
            </ul>
            <Link
              href="/sign-up"
              className="text-[11px] font-mono text-neon-cyan hover:text-cyan-300"
            >
              Get started →
            </Link>
          </div>
          <div className="rounded-2xl border border-neon-cyan/70 bg-black/70 p-4 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
            <p className="text-xs font-mono text-neon-cyan mb-1">Lab / Team</p>
            <p className="text-lg font-semibold mb-2">Contact</p>
            <p className="text-xs text-slate-400 mb-3">
              For universities, cyber ranges, and SCADA labs.
            </p>
            <ul className="text-xs text-slate-300 space-y-1 mb-3">
              <li>• Multiple org workspaces</li>
              <li>• Unlimited projects</li>
              <li>• Priority GNN inference cluster</li>
            </ul>
            <p className="text-[11px] text-slate-500">
              Wire this to a real contact form or mailto later.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-mono text-slate-400 mb-1">Custom</p>
            <p className="text-lg font-semibold mb-2">Enterprise</p>
            <p className="text-xs text-slate-400 mb-3">
              For utilities and critical infrastructure operators.
            </p>
            <ul className="text-xs text-slate-300 space-y-1 mb-3">
              <li>• Air-gapped deployments</li>
              <li>• Custom grid models</li>
              <li>• On-prem GNN training</li>
            </ul>
            <p className="text-[11px] text-slate-500">
              You can later hook this tier into billing.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col md:flex-row items-center justify-between px-4 py-4 gap-2 text-[11px] text-slate-500">
          <span>
            © {new Date().getFullYear()} Vertex Fusion · Smart Grid IDS
          </span>
          <span className="text-slate-600">
            Built for cyber-physical security research.
          </span>
        </div>
      </footer>
    </main>
  );
}
=======
      <footer className="relative z-10 border-t border-white/10 py-12 text-center text-slate-500 text-sm font-mono">
        <p>© 2025 VERTEX FUSION. Based on IEEE Research by Sweeten et al.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">Paper</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </footer>
    </div>
  );
}
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd

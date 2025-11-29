<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from "react";
=======
'use client';

import React, { useState, useEffect } from 'react';
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
<<<<<<< HEAD
} from "recharts";
=======
} from 'recharts';
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
import {
  Activity,
  Wifi,
  ShieldAlert,
  Database,
  Zap,
  Server,
<<<<<<< HEAD
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

// -------- Types --------

type NodeRiskType = {
  node_id: string;
  node_type?: string;
  risk: number;
};

type PlanType = "RESEARCHER" | "LAB" | "ENTERPRISE";

type DashboardClientProps = {
  userEmail: string;
  orgName: string;
  projectName: string;
  projectId: string;
  projects: { id: string; name: string }[];
  plan: PlanType;
  monthlySimulationLimit: number | null;
  monthlySimulationCount: number;
  initialSimulations: {
    id: string;
    name: string;
    gridType: string;
    attackType: string;
    status: string;
    createdAt: string;
    resultSummary?: {
      detection_probability?: number;
      predicted_label?: string;
      node_risks?: NodeRiskType[];
    };
  }[];
};

// -------- Helper functions --------

=======
} from 'lucide-react';

// remove prisma and mock auth imports here – this is pure client/UI

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

>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
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

<<<<<<< HEAD
function formatPlanLabel(plan: PlanType): string {
  if (plan === "LAB") return "Lab / Team";
  if (plan === "ENTERPRISE") return "Enterprise";
  return "Researcher";
}

// -------- Topology component --------

type GridTopologyProps = {
  nodeRisks: NodeRiskType[];
};

const GridTopology = ({ nodeRisks }: GridTopologyProps) => {
  const riskMap = new Map<string, number>();
  nodeRisks.forEach((n) => riskMap.set(n.node_id, n.risk));

  const getStrokeForNode = (id: string, fallback: string) => {
    const r = riskMap.get(id);
    if (r === undefined) return fallback;
    if (r > 0.75) return "#f97373"; // high risk - red
    if (r > 0.4) return "#facc15"; // medium - yellow
    return "#22c55e"; // low but flagged - green
  };

  const getGlowId = (_id: string) => "glow";

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
        <line
          x1="200"
          y1="100"
          x2="200"
          y2="300"
          stroke="#333"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="100"
          x2="400"
          y2="100"
          stroke="#333"
          strokeWidth="2"
        />
        <line
          x1="400"
          y1="100"
          x2="600"
          y2="200"
          stroke="#333"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="300"
          x2="400"
          y2="300"
          stroke="#333"
          strokeWidth="2"
        />
        <line
          x1="400"
          y1="300"
          x2="600"
          y2="200"
          stroke="#333"
          strokeWidth="2"
        />

        {/* Cyber Links */}
        <line
          x1="200"
          y1="100"
          x2="300"
          y2="50"
          stroke="#00f3ff"
          strokeWidth="1"
          strokeDasharray="5,5"
          opacity="0.5"
        />
        <line
          x1="600"
          y1="200"
          x2="700"
          y2="200"
          stroke="#00f3ff"
          strokeWidth="1"
          strokeDasharray="5,5"
          opacity="0.5"
        />

        {/* Nodes - Generators */}
        <g transform="translate(200, 100)">
          <circle
            r="20"
            fill="#1a1a1a"
            stroke={getStrokeForNode("G1", "#bc13fe")}
            strokeWidth="2"
            filter={`url(#${getGlowId("G1")})`}
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontFamily="monospace"
          >
            G1
          </text>
        </g>
        <g transform="translate(200, 300)">
          <circle
            r="20"
            fill="#1a1a1a"
            stroke={getStrokeForNode("G2", "#bc13fe")}
            strokeWidth="2"
            filter={`url(#${getGlowId("G2")})`}
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontFamily="monospace"
          >
            G2
          </text>
        </g>

        {/* Nodes - Substations */}
        <g transform="translate(400, 100)">
          <rect
            x="-15"
            y="-15"
            width="30"
            height="30"
            fill="#1a1a1a"
            stroke={getStrokeForNode("S1", "#666")}
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="#ccc"
            fontSize="10"
            fontFamily="monospace"
          >
            S1
          </text>
        </g>
        <g transform="translate(400, 300)">
          <rect
            x="-15"
            y="-15"
            width="30"
            height="30"
            fill="#1a1a1a"
            stroke={getStrokeForNode("S2", "#666")}
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="#ccc"
            fontSize="10"
            fontFamily="monospace"
          >
            S2
          </text>
        </g>
        <g transform="translate(600, 200)">
          <rect
            x="-15"
            y="-15"
            width="30"
            height="30"
            fill="#1a1a1a"
            stroke={getStrokeForNode("S3", "#666")}
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="#ccc"
            fontSize="10"
            fontFamily="monospace"
          >
            S3
          </text>
        </g>

        {/* Nodes - Cyber Routers */}
        <g transform="translate(300, 50)">
          <polygon
            points="0,-15 13,8 -13,8"
            fill="#000"
            stroke={getStrokeForNode("R1", "#00f3ff")}
            strokeWidth="2"
            filter={`url(#${getGlowId("R1")})`}
          />
          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="#00f3ff"
            fontSize="8"
            fontFamily="monospace"
          >
            R1
          </text>
        </g>
        <g transform="translate(700, 200)">
          <polygon
            points="0,-15 13,8 -13,8"
            fill="#000"
            stroke={getStrokeForNode("R2", "#00f3ff")}
            strokeWidth="2"
            filter={`url(#${getGlowId("R2")})`}
          />
          <text
            x="0"
            y="25"
            textAnchor="middle"
            fill="#00f3ff"
            fontSize="8"
            fontFamily="monospace"
          >
            R2
          </text>
        </g>
      </svg>

      <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-500 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" /> Low Risk
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400" /> Medium
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" /> High
        </div>
      </div>
    </div>
  );
};

// -------- Main dashboard client --------
=======
type DashboardClientProps = {
    userEmail: string;
    orgName: string;
    projectName: string;
    projectId: string;
    initialSimulations: {
      id: string;
      name: string;
      gridType: string;
      attackType: string;
      status: string;
      createdAt: string;
    }[];
  };
  
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd

export function DashboardClient({
  userEmail,
  orgName,
  projectName,
<<<<<<< HEAD
  projectId,
  projects,
  plan,
  monthlySimulationLimit,
  monthlySimulationCount,
  initialSimulations,
}: DashboardClientProps) {
  const router = useRouter();

  const [data, setData] = useState(generateData());
  const [threatLevel, setThreatLevel] = useState<"LOW" | "CRITICAL">("LOW");
  const [activeAlerts, setActiveAlerts] = useState<string[]>([]);
  const [observability, setObservability] = useState<"FULL" | "PARTIAL">(
    "FULL"
  );

  const [simulations, setSimulations] = useState(initialSimulations);
  const [creatingSim, setCreatingSim] = useState(false);

  const [lastNodeRisks, setLastNodeRisks] = useState<NodeRiskType[]>(() => {
    const latest = initialSimulations[0];
    return latest?.resultSummary?.node_risks ?? [];
  });

  const [lastDetectionProb, setLastDetectionProb] = useState<number | null>(
    () => {
      const latest = initialSimulations[0];
      return latest?.resultSummary?.detection_probability ?? null;
    }
  );

  const [lastLabel, setLastLabel] = useState<string | null>(() => {
    const latest = initialSimulations[0];
    return latest?.resultSummary?.predicted_label ?? null;
  });

  const [creatingProject, setCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [projectError, setProjectError] = useState<string | null>(null);

  // Simulate real-time CP data stream
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
=======
  simulations,
}: DashboardClientProps) {
  const [data, setData] = useState(generateData());
  const [simulations, setSimulations] = useState(initialSimulations);
  const [creatingSim, setCreatingSim] = useState(false);
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'CRITICAL'>('LOW');
  const [activeAlerts, setActiveAlerts] = useState<string[]>([]);
  const [observability, setObservability] = useState<'FULL' | 'PARTIAL'>('FULL');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
        const last = prev[prev.length - 1];
        const newPoint = {
          time: last.time + 1,
          voltage:
            230 +
            Math.random() * 10 -
            5 +
<<<<<<< HEAD
            (threatLevel === "CRITICAL" ? Math.random() * 50 : 0),
=======
            (threatLevel === 'CRITICAL' ? Math.random() * 50 : 0),
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
          frequency: 60 + Math.random() * 0.5 - 0.25,
          packetSize:
            Math.floor(Math.random() * 500) +
            100 +
<<<<<<< HEAD
            (threatLevel === "CRITICAL" ? 2000 : 0),
=======
            (threatLevel === 'CRITICAL' ? 2000 : 0),
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
        };
        return [...prev.slice(1), newPoint];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [threatLevel]);

<<<<<<< HEAD
  // -------- Project handlers --------

  function handleProjectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    if (!id) return;
    router.push(`/dashboard?projectId=${id}`);
  }

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    setProjectError(null);
    setCreatingProject(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProjectName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setProjectError(
          data.error ||
            "Failed to create project (maybe you hit your plan limit?)"
        );
      } else {
        setNewProjectName("");
        router.push(`/dashboard?projectId=${data.id}`);
      }
    } catch (err) {
      console.error(err);
      setProjectError("Network error while creating project");
    } finally {
      setCreatingProject(false);
    }
  }

  // -------- Attack / Simulation handler --------

  const injectAttack = async (
    type: "RANSOMWARE" | "FDI" | "REVERSE_SHELL"
  ) => {
    setThreatLevel("CRITICAL");
    setActiveAlerts((prev) => [`${type} ATTACK TRIGGERED`, ...prev]);
=======
  const injectAttack = async (type: "RANSOMWARE" | "FDI" | "REVERSE_SHELL") => {
    setThreatLevel("CRITICAL");
    setActiveAlerts(prev => [`${type} ATTACK TRIGGERED`, ...prev]);
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
    setCreatingSim(true);

    try {
      const res = await fetch("/api/simulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          attackType:
            type === "RANSOMWARE"
              ? "RANSOMWARE"
              : type === "FDI"
              ? "FDI"
              : "REVERSE_SHELL",
          gridType: "IEEE-14",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
<<<<<<< HEAD
        setActiveAlerts((prev) => [
=======
        setActiveAlerts(prev => [
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
          `SIMULATION ERROR: ${data.error || "Unknown error"}`,
          ...prev,
        ]);
      } else {
<<<<<<< HEAD
        setSimulations((prev) => [
=======
        setSimulations(prev => [
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
          {
            id: data.id,
            name: data.name,
            gridType: data.gridType,
            attackType: data.attackType,
            status: data.status,
            createdAt: data.createdAt,
<<<<<<< HEAD
            resultSummary: data.resultSummary,
          },
          ...prev,
        ]);

        if (data.resultSummary) {
          setLastNodeRisks(data.resultSummary.node_risks || []);
          setLastDetectionProb(
            data.resultSummary.detection_probability ?? null
          );
          setLastLabel(data.resultSummary.predicted_label ?? null);

          setActiveAlerts((prev) => [
            `GNN VERDICT: ${data.resultSummary.predicted_label} (P=${Math.round(
              (data.resultSummary.detection_probability ?? 0) * 100
            )}%)`,
            ...prev,
          ]);
        } else {
          setActiveAlerts((prev) => [
            `SIMULATION STORED: ${data.name}`,
            ...prev,
          ]);
        }
      }
    } catch (err) {
      console.error(err);
      setActiveAlerts((prev) => [
=======
          },
          ...prev,
        ]);
        setActiveAlerts(prev => [
          `SIMULATION STORED: ${data.name}`,
          ...prev,
        ]);
      }
    } catch (err) {
      console.error(err);
      setActiveAlerts(prev => [
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
        "SIMULATION ERROR: Network issue",
        ...prev,
      ]);
    } finally {
      setCreatingSim(false);
      setTimeout(() => setThreatLevel("LOW"), 5000);
    }
  };

<<<<<<< HEAD
  const planLabel = formatPlanLabel(plan);
  const usageText =
    monthlySimulationLimit === null
      ? `${monthlySimulationCount} simulations this month`
      : `${monthlySimulationCount} / ${monthlySimulationLimit} sims this month`;

  const usagePercent =
    monthlySimulationLimit === null || monthlySimulationLimit === 0
      ? 0
      : Math.min(
          100,
          Math.round((monthlySimulationCount / monthlySimulationLimit) * 100)
        );

  // -------- JSX --------

=======
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
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
            onClick={() =>
<<<<<<< HEAD
              setObservability((prev) =>
                prev === "FULL" ? "PARTIAL" : "FULL"
              )
            }
            className="flex items-center gap-3 text-slate-400 p-2 w-full hover:text-white"
          >
            <Database size={16} /> Mode:{" "}
            <span
              className={
                observability === "FULL" ? "text-green-400" : "text-yellow-400"
=======
              setObservability(prev => (prev === 'FULL' ? 'PARTIAL' : 'FULL'))
            }
            className="flex items-center gap-3 text-slate-400 p-2 w-full hover:text-white"
          >
            <Database size={16} /> Mode:{' '}
            <span
              className={
                observability === 'FULL' ? 'text-green-400' : 'text-yellow-400'
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
              }
            >
              {observability}
            </span>
          </button>
        </nav>

<<<<<<< HEAD
        <div className="mt-auto text-xs text-slate-500 space-y-1">
          <div className="truncate">{userEmail}</div>
          <button
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="text-red-400 hover:text-red-300"
          >
            TERMINATE SESSION
          </button>
=======
        <div className="mt-auto text-xs text-slate-500">
          <div>{userEmail}</div>
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
<<<<<<< HEAD
        {/* Header with project selector + plan/usage */}
        <header className="flex justify-between items-center mb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">MISSION CONTROL</h1>
            <p className="text-xs text-slate-500 font-mono mb-2">{orgName}</p>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase text-slate-500 font-mono">
                Project:
              </span>
              <select
                className="bg-black/40 border border-white/15 rounded-md px-2 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-neon-cyan"
                value={projectId}
                onChange={handleProjectChange}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setCreatingProject(true);
                  setProjectError(null);
                }}
                className="text-[10px] px-2 py-1 rounded-md border border-neon-cyan/60 text-neon-cyan hover:bg-neon-cyan/10 font-mono"
              >
                + New
              </button>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded-full border border-white/15 bg-black/40">
                Plan:{" "}
                <span className="text-neon-cyan font-semibold">
                  {planLabel}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span>{usageText}</span>
                {monthlySimulationLimit !== null && (
                  <span className="flex h-1.5 w-16 overflow-hidden rounded-full bg-slate-800">
                    <span
                      className="bg-neon-cyan"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </span>
                )}
              </span>
            </div>
=======
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">MISSION CONTROL</h1>
            <p className="text-xs text-slate-500 font-mono">
              {orgName} // {projectName}
            </p>
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
          </div>

          <div
            className={`px-4 py-2 border ${
<<<<<<< HEAD
              threatLevel === "CRITICAL"
                ? "border-red-500 bg-red-500/10 text-red-500 animate-pulse"
                : "border-green-500 bg-green-500/10 text-green-500"
=======
              threatLevel === 'CRITICAL'
                ? 'border-red-500 bg-red-500/10 text-red-500 animate-pulse'
                : 'border-green-500 bg-green-500/10 text-green-500'
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
            } font-mono font-bold rounded`}
          >
            STATUS: {threatLevel}
          </div>
        </header>

<<<<<<< HEAD
        {/* Optional GNN verdict card */}
        {lastDetectionProb !== null && (
          <div className="glass-panel p-4 mb-8 border border-neon-cyan/60">
            <div className="text-xs font-mono text-slate-400 mb-1">
              GNN INTRUSION VERDICT
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-bold">
                  {lastLabel ?? "UNKNOWN"}
                </div>
                <div className="text-xs text-slate-400">
                  Detection probability:{" "}
                  {Math.round(lastDetectionProb * 100)}%
                </div>
              </div>
              <div className="text-xs text-slate-500 max-w-xs">
                Latest Graph Neural Network inference on fused cyber-physical
                features. Nodes in the topology are colored by relative risk.
              </div>
            </div>
          </div>
        )}

=======
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-4 border-l-4 border-neon-blue">
            <div className="text-slate-400 text-xs font-mono mb-1">
              GRID FREQUENCY
            </div>
            <div className="text-2xl font-bold text-white">
              {data[data.length - 1].frequency.toFixed(2)} Hz
            </div>
          </div>
          <div className="glass-panel p-4 border-l-4 border-neon-pink">
            <div className="text-slate-400 text-xs font-mono mb-1">
              BUS VOLTAGE (AVG)
            </div>
            <div className="text-2xl font-bold text-white">
              {data[data.length - 1].voltage.toFixed(1)} kV
            </div>
          </div>
          <div className="glass-panel p-4 border-l-4 border-neon-cyan">
            <div className="text-slate-400 text-xs font-mono mb-1">
              PACKET THROUGHPUT
            </div>
            <div className="text-2xl font-bold text-white">
              {data[data.length - 1].packetSize} MB/s
            </div>
          </div>
          <div className="glass-panel p-4 border-l-4 border-red-500">
            <div className="text-slate-400 text-xs font-mono mb-1">
              THREAT PROBABILITY
            </div>
            <div className="text-2xl font-bold text-white">
<<<<<<< HEAD
              {threatLevel === "CRITICAL" ? "98.4" : "2.1"}%
=======
              {threatLevel === 'CRITICAL' ? '98.4' : '2.1'}%
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Main Grid: Topology & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Topology */}
=======
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
          <div className="lg:col-span-2 glass-panel p-1 min-h-[400px] flex flex-col">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Server size={16} /> GRID TOPOLOGY (GNN MAP)
              </h3>
              <span className="text-xs font-mono text-neon-cyan">
                LIVE UPDATE
              </span>
            </div>
            <div className="flex-1 bg-black/20">
<<<<<<< HEAD
              <GridTopology nodeRisks={lastNodeRisks} />
            </div>
          </div>

          {/* Right: Attack Simulator + Logs */}
          <div className="space-y-6">
            {/* Attack Simulator */}
=======
              <GridTopology />
            </div>
          </div>

          <div className="space-y-6">
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-500" /> THREAT
                SIMULATION
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => injectAttack("RANSOMWARE")}
                  className="w-full py-3 bg-red-500/10 border border-red-500/50 hover:bg-red-500 hover:text-black transition-all text-xs font-bold font-mono"
<<<<<<< HEAD
                  disabled={creatingSim}
                >
                  {creatingSim ? "RUNNING..." : "INJECT RANSOMWARE (RW)"}
                </button>
                <button
                  onClick={() => injectAttack("FDI")}
                  className="w-full py-3 bg-orange-500/10 border border-orange-500/50 hover:bg-orange-500 hover:text-black transition-all text-xs font-bold font-mono"
                  disabled={creatingSim}
                >
                  {creatingSim ? "RUNNING..." : "INJECT FDI (SENSOR SPOOF)"}
                </button>
                <button
                  onClick={() => injectAttack("REVERSE_SHELL")}
                  className="w-full py-3 bg-yellow-500/10 border border-yellow-500/50 hover:bg-yellow-500 hover:text-black transition-all text-xs font-bold font-mono"
                  disabled={creatingSim}
                >
                  {creatingSim ? "RUNNING..." : "OPEN REVERSE SHELL"}
                </button>
              </div>
            </div>

            {/* Alert Feed */}
=======
                    >
                   {creatingSim ? "RUNNING..." : "INJECT RANSOMWARE (RW)"}
                </button>

                <button
                   onClick={() => injectAttack("FDI")}
                   className="w-full py-3 bg-orange-500/10 border border-orange-500/50 hover:bg-orange-500 hover:text-black transition-all text-xs font-bold font-mono"
                   >
                  {creatingSim ? "RUNNING..." : "INJECT FDI (SENSOR SPOOF)"}
                </button>

            <button
              onClick={() => injectAttack("REVERSE_SHELL")}
             className="w-full py-3 bg-yellow-500/10 border border-yellow-500/50 hover:bg-yellow-500 hover:text-black transition-all text-xs font-bold font-mono"
             >
             {creatingSim ? "RUNNING..." : "OPEN REVERSE SHELL"}
            </button>

                
              </div>
            </div>

>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
            <div className="glass-panel p-4 h-[300px] overflow-y-auto">
              <h3 className="text-xs font-bold font-mono text-slate-400 mb-4">
                SYSTEM LOGS
              </h3>
              {activeAlerts.length === 0 ? (
                <div className="text-green-500 text-xs font-mono">
                  SYSTEM SECURE. NO ANOMALIES.
                </div>
              ) : (
                activeAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className="mb-2 p-2 bg-red-500/20 border-l-2 border-red-500 text-xs font-mono text-red-200"
                  >
                    <span className="font-bold">
                      [{new Date().toLocaleTimeString()}]
<<<<<<< HEAD
                    </span>{" "}
=======
                    </span>{' '}
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
                    {alert}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Recent Simulations */}
        <div className="glass-panel p-4 mb-8">
          <h3 className="font-bold mb-3 text-xs font-mono text-slate-400">
            RECENT SIMULATIONS
          </h3>
          {simulations.length === 0 ? (
            <p className="text-xs text-slate-500">
              No simulations yet. Trigger an attack scenario to create one.
            </p>
          ) : (
            <ul className="space-y-2 text-xs font-mono">
              {simulations.map((sim) => (
                <li
                  key={sim.id}
                  className="flex items-center justify-between border border-white/10 rounded-lg px-3 py-2"
                >
                  <div>
                    <p className="font-semibold text-white">{sim.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {sim.gridType} · {sim.attackType} · {sim.status}
                      {sim.resultSummary?.detection_probability !==
                        undefined && (
                        <>
                          {" "}
                          · P=
                          {Math.round(
                            (sim.resultSummary.detection_probability ?? 0) * 100
                          )}
                          %
                        </>
                      )}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {new Date(sim.createdAt).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

=======
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
        {/* Bottom charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-6">
            <h3 className="font-bold mb-4 text-neon-pink">
              PHYSICAL LAYER: VOLTAGE STABILITY
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[220, 240]} stroke="#666" />
                  <Tooltip
                    contentStyle={{
<<<<<<< HEAD
                      backgroundColor: "#000",
                      border: "1px solid #bc13fe",
=======
                      backgroundColor: '#000',
                      border: '1px solid #bc13fe',
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="voltage"
                    stroke="#bc13fe"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-bold mb-4 text-neon-cyan">
              CYBER LAYER: NETWORK TRAFFIC
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" hide />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
<<<<<<< HEAD
                      backgroundColor: "#000",
                      border: "1px solid #00f3ff",
=======
                      backgroundColor: '#000',
                      border: '1px solid #00f3ff',
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="packetSize"
                    stroke="#00f3ff"
                    fill="#00f3ff"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
<<<<<<< HEAD

      {/* New Project Modal */}
      {creatingProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-full max-w-sm bg-[#050b14] border border-white/15 rounded-2xl p-6">
            <h2 className="text-sm font-bold mb-2">Create new project</h2>
            <p className="text-xs text-slate-400 mb-4">
              Spin up a separate smart-grid simulation space under{" "}
              <span className="font-mono text-neon-cyan">{orgName}</span>.
            </p>

            {projectError && (
              <p className="text-xs text-red-400 mb-2">{projectError}</p>
            )}

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Project name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-white/15 bg-black/40 px-2 py-1 text-xs focus:outline-none focus:border-neon-cyan"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. IEEE-14 FDI Experiments"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCreatingProject(false);
                    setNewProjectName("");
                    setProjectError(null);
                  }}
                  className="text-[11px] px-3 py-1 rounded-md border border-white/15 text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-[11px] px-3 py-1 rounded-md bg-neon-cyan text-black font-mono hover:bg-cyan-300 disabled:opacity-60"
                  disabled={!newProjectName.trim()}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
=======
    </div>
  );
}
        {/* Simulations list */}
        <div className="glass-panel p-4 mb-8">
          <h3 className="font-bold mb-3 text-xs font-mono text-slate-400">
            RECENT SIMULATIONS
          </h3>
          {simulations.length === 0 ? (
            <p className="text-xs text-slate-500">
              No simulations yet. Trigger an attack scenario to create one.
            </p>
          ) : (
            <ul className="space-y-2 text-xs font-mono">
              {simulations.map((sim) => (
                <li
                  key={sim.id}
                  className="flex items-center justify-between border border-white/10 rounded-lg px-3 py-2"
                >
                  <div>
                    <p className="font-semibold text-white">{sim.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {sim.gridType} · {sim.attackType} · {sim.status}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {new Date(sim.createdAt).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd

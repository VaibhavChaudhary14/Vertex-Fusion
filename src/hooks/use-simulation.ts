'use client';

import { useState, useEffect } from 'react';

// --- Types based on Research Paper Methodologies ---
export type SystemState = 'NORMAL' | 'UNDER_ATTACK' | 'RECOVERING';
export type AttackType = 'NONE' | 'FDI' | 'RANSOMWARE' | 'REVERSE_SHELL' | 'BRUTE_FORCE';

export interface CyberPhysicalMetric {
  timestamp: string;
  // Physical Layer (IEEE 14-Bus)
  voltage: number;      // RMS Voltage (kV) - Nominal ~230kV
  frequency: number;    // Grid Frequency (Hz) - Nominal 60Hz
  activePower: number;  // Active Power (MW)
  // Cyber Layer (SCADA Network)
  packetSize: number;   // Network Packet Size (Bytes)
  protocol: string;     // TCP, UDP, MODBUS, DNP3
  trafficRate: number;  // Packets per second
  // Detection Engine
  gnnConfidence: number; // Probability of attack (0-1) from GNN
}

export function useSimulation() {
  const [status, setStatus] = useState<SystemState>('NORMAL');
  const [currentAttack, setCurrentAttack] = useState<AttackType>('NONE');
  const [metrics, setMetrics] = useState<CyberPhysicalMetric[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // Initialize buffer
  useEffect(() => {
    const initialData = Array.from({ length: 30 }).map(() => generateDataPoint('NONE'));
    setMetrics(initialData);
  }, []);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    setLogs(prev => [`[${time}] ${message}`, ...prev].slice(0, 50));
  };

  const injectAttack = (type: AttackType) => {
    if (status === 'UNDER_ATTACK') return;
    
    setStatus('UNDER_ATTACK');
    setCurrentAttack(type);
    
    // Log messages based on attack descriptions in the paper
    let logMsg = "";
    switch(type) {
      case 'FDI': 
        logMsg = "⚠ ALERT: False Data Injection detected on Bus 4. Mismatched state estimation."; 
        break;
      case 'RANSOMWARE': 
        logMsg = "⚠ CRITICAL: High entropy data stream detected in PLC-2. Possible Ransomware encryption."; 
        break;
      case 'REVERSE_SHELL': 
        logMsg = "⚠ WARN: Anomalous outbound connection on Port 4444 (Reverse Shell signature)."; 
        break;
      case 'BRUTE_FORCE': 
        logMsg = "⚠ WARN: Multiple failed authentication attempts on HMI Gateway."; 
        break;
    }
    addLog(logMsg);

    // Auto-recover simulation after 12 seconds
    setTimeout(() => {
      setStatus('RECOVERING');
      addLog("🛡️ DEFENSE: GNN Model isolated compromised nodes. Re-routing topology...");
      setTimeout(() => {
        setStatus('NORMAL');
        setCurrentAttack('NONE');
        addLog("✅ SYSTEM: Normal operation restored. Observability 100%.");
      }, 4000);
    }, 12000);
  };

  // Real-time Data Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newPoint = generateDataPoint(currentAttack);
        const newData = [...prev.slice(1), newPoint];
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentAttack]);

  return {
    status,
    currentAttack,
    metrics,
    logs,
    injectAttack
  };
}

// --- Generator Logic ---
function generateDataPoint(attack: AttackType): CyberPhysicalMetric {
  const now = new Date();
  
  // 1. Establish Baselines (Normal Operation for IEEE 14-Bus)
  let v = 230;    // kV
  let f = 60.0;   // Hz
  let p = 150;    // MW
  let pkt = 64;   // Bytes (Standard Modbus command)
  let rate = 10;  // packets/sec
  let proto = 'MODBUS';
  let conf = 0.01; // GNN Confidence (Low = Safe)

  // 2. Add Natural Gaussian Noise
  v += (Math.random() - 0.5) * 1.5;
  f += (Math.random() - 0.5) * 0.02;
  p += (Math.random() - 0.5) * 5;
  pkt += Math.floor(Math.random() * 20);

  // 3. Apply Attack Effects (Based on Paper Findings)
  switch (attack) {
    case 'FDI':
      // FDI alters physical readings significantly, cyber traffic often looks normal or slightly elevated
      v = v * (1 + (Math.random() * 0.12) + 0.05); // Voltage swell
      p = p * 0.6; // False power reading
      conf = 0.98; // High GNN confidence
      break;

    case 'RANSOMWARE':
      // Ransomware creates massive cyber noise (encryption), physical stays steady until failure
      pkt = 1024 + (Math.random() * 4000); // Giant packets
      rate = 500 + (Math.random() * 200); // High traffic rate
      proto = 'SMB/TCP'; // File transfer protocol
      conf = 0.99;
      break;

    case 'REVERSE_SHELL':
      // Stealthy cyber connection, physical normal
      proto = 'HTTP/TCP'; // Tunneling over HTTP
      pkt = 300 + (Math.random() * 50);
      conf = 0.85;
      break;

    case 'BRUTE_FORCE':
      // High rate of small packets (login attempts)
      pkt = 128;
      rate = 150 + (Math.random() * 50);
      proto = 'SSH/AUTH';
      conf = 0.75;
      break;
  }

  return {
    timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    voltage: v,
    frequency: f,
    activePower: p,
    packetSize: pkt,
    protocol: proto,
    trafficRate: rate,
    gnnConfidence: conf
  };
}
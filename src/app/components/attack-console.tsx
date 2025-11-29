'use client';

import { ShieldAlert, Zap, Lock, Terminal, Activity, ServerCrash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AttackType, SystemState } from '@/hooks/use-simulation';

interface AttackConsoleProps {
  onAttack: (type: AttackType) => void;
  status: SystemState;
}

export default function AttackConsole({ onAttack, status }: AttackConsoleProps) {
  const isNormal = status === 'NORMAL';

  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-md h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-neon-pink">
          <ShieldAlert className="w-5 h-5" /> Threat Injection
        </CardTitle>
        <CardDescription className="text-slate-400 font-mono text-xs">
          Select an adversarial vector to test the GNN-IDS response.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 flex-1">
        
        <Button 
          variant="outline" 
          className="h-auto py-4 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-100 justify-start group relative overflow-hidden"
          onClick={() => onAttack('RANSOMWARE')}
          disabled={!isNormal}
        >
          <div className="absolute inset-0 bg-red-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform" />
          <Lock className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-bold text-xs tracking-wider">RANSOMWARE</div>
            <div className="text-[10px] text-slate-500 font-mono">Crypto-locking PLC logic</div>
          </div>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto py-4 border-orange-500/20 text-orange-400 hover:bg-orange-500/10 hover:text-orange-100 justify-start group relative overflow-hidden"
          onClick={() => onAttack('FDI')}
          disabled={!isNormal}
        >
          <div className="absolute inset-0 bg-orange-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform" />
          <Activity className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-bold text-xs tracking-wider">FALSE DATA INJECTION</div>
            <div className="text-[10px] text-slate-500 font-mono">Sensor spoofing (Voltage/Power)</div>
          </div>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto py-4 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-100 justify-start group relative overflow-hidden"
          onClick={() => onAttack('REVERSE_SHELL')}
          disabled={!isNormal}
        >
          <div className="absolute inset-0 bg-yellow-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform" />
          <Terminal className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-bold text-xs tracking-wider">REVERSE SHELL</div>
            <div className="text-[10px] text-slate-500 font-mono">Unauthorized remote access</div>
          </div>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto py-4 border-purple-500/20 text-purple-400 hover:bg-purple-500/10 hover:text-purple-100 justify-start group relative overflow-hidden"
          onClick={() => onAttack('BRUTE_FORCE')}
          disabled={!isNormal}
        >
          <div className="absolute inset-0 bg-purple-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform" />
          <ServerCrash className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-bold text-xs tracking-wider">BRUTE FORCE</div>
            <div className="text-[10px] text-slate-500 font-mono">HMI Credential stuffing</div>
          </div>
        </Button>

        {status === 'UNDER_ATTACK' && (
          <div className="mt-auto p-4 bg-red-950/40 border border-red-500/50 rounded-md animate-pulse flex items-center justify-center">
            <p className="text-red-500 text-xs font-mono font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 animate-spin" />
              ATTACK IN PROGRESS
            </p>
          </div>
        )}
        
        {status === 'RECOVERING' && (
          <div className="mt-auto p-4 bg-green-950/40 border border-green-500/50 rounded-md flex items-center justify-center">
            <p className="text-green-400 text-xs font-mono font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              ISOLATING THREAT...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
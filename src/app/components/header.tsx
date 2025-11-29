"use client";

import { Badge } from "@/components/ui/badge";
import { Shield, Bot, Zap, BrainCircuit } from "lucide-react";
import type { Classification } from "@/lib/types";

type HeaderProps = {
  securityScore: number;
  classification: Classification;
  confidence: number;
};

const Header = ({
  securityScore,
  classification,
  confidence,
}: HeaderProps) => {
  const getStatusColor = () => {
    if (classification === 'Malicious') return 'bg-destructive text-destructive-foreground';
    if (classification === 'Benign' && securityScore < 99) return 'bg-yellow-500 text-black';
    return 'bg-green-500 text-black';
  };
  
  const getClassificationBadgeVariant = () => {
    switch (classification) {
      case 'Malicious': return 'destructive';
      case 'Benign': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-border/50 bg-background/95 backdrop-blur-sm z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <BrainCircuit className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-primary font-headline tracking-wider">
          CyberGrid Sentinel
        </h1>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Badge variant={getClassificationBadgeVariant()} className="text-sm px-3 py-1">
            <Zap className="w-4 h-4 mr-2" />
            System Status: {classification}
          </Badge>
        </div>
        <div className="flex items-center gap-2" title="GNN Security Score">
            <Shield className={`w-5 h-5 ${classification === 'Malicious' ? 'text-destructive' : 'text-primary'}`} />
            <span className="font-mono text-lg">{securityScore.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2" title="Detection Confidence">
            <Bot className="w-5 h-5 text-muted-foreground" />
            <span className="font-mono text-lg">{(confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <div className={`absolute inset-0 rounded-full ${getStatusColor()} animate-ping`}></div>
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${getStatusColor()} font-bold text-xs`}>
              {classification === 'Malicious' ? 'CRIT' : securityScore < 99 ? 'WARN' : 'SAFE'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { SystemNode, PhysicalNodeDetails, CyberNodeDetails } from "@/lib/types";
import { Zap, Router, HardDrive, ShieldCheck, ShieldOff } from "lucide-react";

type NodeInspectorProps = {
  node: SystemNode | null;
  isOpen: boolean;
  onClose: () => void;
};

const PhysicalDetails = ({ details }: { details: PhysicalNodeDetails }) => (
  <div className="grid grid-cols-2 gap-4 text-sm mt-4">
    <div className="font-semibold text-muted-foreground">Component Type</div><div className="capitalize">{details.type}</div>
    <div className="font-semibold text-muted-foreground">RMS Voltage</div><div>{details.voltage.toFixed(4)} p.u.</div>
    <div className="font-semibold text-muted-foreground">Phase Angle</div><div>{details.angle.toFixed(2)}°</div>
    <div className="font-semibold text-muted-foreground">Active Power (P)</div><div>{details.activePower.toFixed(2)} MW</div>
    <div className="font-semibold text-muted-foreground">Reactive Power (Q)</div><div>{details.reactivePower.toFixed(2)} MVar</div>
  </div>
);

const CyberDetails = ({ details }: { details: CyberNodeDetails }) => (
  <div className="grid grid-cols-2 gap-4 text-sm mt-4">
    <div className="font-semibold text-muted-foreground">Device Type</div><div className="capitalize">{details.type}</div>
    <div className="font-semibold text-muted-foreground">IP Address</div><div className="font-code">{details.ipAddress}</div>
     <div className="font-semibold text-muted-foreground">Firmware</div><div className="font-code">{details.firmwareVersion || 'N/A'}</div>
    <div className="font-semibold text-muted-foreground">Device Status</div>
    <div>
        <Badge variant={details.status === 'Online' ? 'secondary' : 'destructive'}>
            {details.status}
        </Badge>
    </div>
  </div>
);

const NodeInspector = ({ node, isOpen, onClose }: NodeInspectorProps) => {
  if (!node) return null;

  const isPhysical = node.layer === 'physical';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-popover/80 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {isPhysical ? <Zap className="text-primary"/> : <Router className="text-primary"/>}
            {node.label}
          </DialogTitle>
          <DialogDescription>
            Live telemetry for node {node.id}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex gap-4 items-center">
            <Badge className="capitalize">{node.layer} Layer</Badge>
            {node.isUnderAttack ? (
                <Badge variant="destructive" className="animate-pulse">
                    <ShieldOff className="mr-2 h-4 w-4" /> Under Attack
                </Badge>
            ) : (
                <Badge variant="secondary">
                    <ShieldCheck className="mr-2 h-4 w-4" /> Nominal State
                </Badge>
            )}
            {node.details.isCritical && <Badge variant="outline" className="border-accent text-accent">Critical Asset</Badge>}
          </div>

          {isPhysical ? (
            <PhysicalDetails details={node.details as PhysicalNodeDetails} />
          ) : (
            <CyberDetails details={node.details as CyberNodeDetails} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeInspector;

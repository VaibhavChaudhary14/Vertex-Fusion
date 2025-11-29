"use client";

import { useEffect, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { SystemState, SystemNode as SystemNodeType, EdgeType } from '@/lib/types';
import { Zap, Router } from 'lucide-react';
import { cn } from '@/lib/utils';

// Custom node component
const CustomNode = ({ data }: { data: { label: string; layer: 'physical' | 'cyber'; isUnderAttack: boolean } }) => {
  const isPhysical = data.layer === 'physical';
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border-2 p-2 shadow-lg backdrop-blur-sm",
        data.isUnderAttack
          ? "border-accent bg-accent/30 text-white"
          : isPhysical
          ? "border-primary bg-primary/20 text-primary-foreground"
          : "border-green-400 bg-green-900/30 text-green-300"
      )}
    >
      {isPhysical ? <Zap className="h-4 w-4" /> : <Router className="h-4 w-4" />}
      <div className="text-xs font-medium">{data.label}</div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const getEdgeColor = (type: EdgeType) => {
  switch (type) {
    case 'physical_line':
      return '#7DF9FF'; // Electric Blue for physical lines
    case 'cyber_link':
      return '#34D399'; // Green for cyber links
    case 'cyber_physical_coupling':
      return '#94A3B8'; // Slate gray for coupling links
    default:
      return '#7DF9FF';
  }
}

interface ReactFlowGraphProps {
  systemState: SystemState;
  onNodeClick: (nodeId: string) => void;
  isPartialObservability: boolean;
}

const ReactFlowGraph = ({ systemState, onNodeClick, isPartialObservability }: ReactFlowGraphProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const initialNodes = useMemo(() => {
    return systemState.nodes.map((node: SystemNodeType) => ({
      id: node.id,
      type: 'custom',
      position: { x: node.position.x * 120, y: node.position.y * (node.layer === 'physical' ? 80 : -80) + 300},
      data: {
        label: node.label,
        layer: node.layer,
        isUnderAttack: node.isUnderAttack,
        isCritical: node.details.isCritical
      },
    }));
  }, [systemState.nodes]);

  const initialEdges = useMemo(() => {
    return systemState.edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: edge.isUnderAttack,
      style: {
        strokeWidth: 2,
        stroke: edge.isUnderAttack ? '#FFA500' : getEdgeColor(edge.type),
      },
    }));
  }, [systemState.edges]);


  useEffect(() => {
    const isVisible = (nodeId: string) => {
        if (!isPartialObservability) return true;
        const node = systemState.nodes.find(n => n.id === nodeId);
        return node?.details.isCritical ?? false;
    }

    const transformedNodes = initialNodes.map(n => ({...n, hidden: !isVisible(n.id)}));
    const transformedEdges = initialEdges.map(e => ({...e, hidden: !isVisible(e.source) || !isVisible(e.target)}));
    
    setNodes(transformedNodes);
    setEdges(transformedEdges);

  }, [systemState, isPartialObservability, setNodes, setEdges, initialNodes, initialEdges]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => onNodeClick(node.id)}
        fitView
        nodeTypes={nodeTypes}
        className="dark"
      >
        <Controls showInteractive={false} />
        <Background gap={24} />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowGraph;

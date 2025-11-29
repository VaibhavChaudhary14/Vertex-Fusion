'use client';

import React from 'react';

// Simplified SVG Topology Component
// Removes dependency on external libraries to ensure build stability
export default function GridTopology() {
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
        
        {/* Cyber Links (Dashed) */}
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
}
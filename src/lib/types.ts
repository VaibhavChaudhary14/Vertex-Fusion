export type PhysicalNodeType = 'generator' | 'load' | 'substation' | 'bus';
export type CyberNodeType = 'router' | 'control_center' | 'hmi' | 'plc';

export type PhysicalNodeDetails = {
  type: PhysicalNodeType;
  voltage: number; // in p.u.
  angle: number; // in degrees
  activePower: number; // in MW
  reactivePower: number; // in MVar
  isCritical: boolean;
};

export type CyberNodeDetails = {
  type: CyberNodeType;
  ipAddress: string;
  status: 'Online' | 'Offline' | 'Compromised';
  isCritical: boolean;
  firmwareVersion?: string;
};

export type SystemNode = {
  id: string;
  label: string;
  layer: 'physical' | 'cyber';
  details: PhysicalNodeDetails | CyberNodeDetails;
  isUnderAttack: boolean;
  position: { x: number; y: number; z: number };
};

export type EdgeType = 'physical_line' | 'cyber_link' | 'cyber_physical_coupling';

export type SystemEdge = {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  weight?: number;
  isUnderAttack: boolean;
};

export type SystemState = {
  nodes: SystemNode[];
  edges: SystemEdge[];
};

export type AttackType = 'FDI' | 'RW' | 'BF' | 'RS' | 'BD' | 'CF' | null;

export const AttackDetails: Record<NonNullable<AttackType>, { name: string; description: string }> = {
  FDI: { name: 'False Data Injection', description: 'Manipulates sensor readings (e.g., voltage, current) to trick the grid\'s state estimator, leading to potentially damaging operational decisions.' },
  RW: { name: 'Ransomware', description: 'Encrypts critical cyber assets like HMIs or data servers, blinding operators and disrupting control until a ransom is paid. A common Industrial Control Systems (ICS) threat.' },
  BF: { name: 'Brute Force', description: 'Systematically attempts to guess credentials for a protected asset (e.g., an HMI or engineering workstation) to gain unauthorized remote access.' },
  RS: { name: 'Reverse Shell', description: 'Establishes a persistent, outbound shell connection from a compromised internal device (like a PLC) to an external attacker-controlled server, bypassing firewalls.' },
  BD: { name: 'Backdoor', description: 'Installs a hidden mechanism on a device that provides persistent, unauthorized access, allowing for long-term espionage or future attacks.' },
  CF: { name: 'Cascading Failure', description: 'An attack that targets a critical node to trigger a domino effect, causing sequential failures of other elements across the power grid, leading to widespread outages.' },
};


export type NetworkLog = {
  id: string;
  timestamp: number;
  sourceIp: string;
  destIp: string;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  status: 'Benign' | 'Malicious';
};

export type TelemetryDataPoint = {
  time: number;
  voltage: number;
  frequency: number;
};

export type HistoricalData = {
  voltage: { time: number; value: number }[];
  frequency: { time: number; value: number }[];
  securityScore: { time: number; value: number }[];
};

export type Classification = 'Benign' | 'Malicious' | 'Detecting...';

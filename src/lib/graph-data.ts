import type { SystemState } from './types';

// This data structure is now aligned with the JSON schema for topology configuration.
export const initialGraphData: SystemState = {
  nodes: [
    // Physical Layer
    { id: 'P1', label: 'Bus 1 (Gen)', layer: 'physical', isUnderAttack: false, details: { type: 'generator', voltage: 1.06, angle: 0, activePower: 232.4, reactivePower: -16.9, isCritical: true }, position: { x: -6, y: 2, z: 0 } },
    { id: 'P2', label: 'Bus 2 (Gen)', layer: 'physical', isUnderAttack: false, details: { type: 'generator', voltage: 1.045, angle: -4.98, activePower: 40.0, reactivePower: 42.4, isCritical: true }, position: { x: -4, y: 2, z: 4 } },
    { id: 'P3', label: 'Bus 3', layer: 'physical', isUnderAttack: false, details: { type: 'bus', voltage: 1.01, angle: -12.72, activePower: 0, reactivePower: 0, isCritical: false }, position: { x: -4, y: 2, z: -4 } },
    { id: 'P4', label: 'Bus 4', layer: 'physical', isUnderAttack: false, details: { type: 'bus', voltage: 1.019, angle: -10.33, activePower: 0, reactivePower: 0, isCritical: false }, position: { x: 0, y: 2, z: 5 } },
    { id: 'P5', label: 'Bus 5', layer: 'physical', isUnderAttack: false, details: { type: 'bus', voltage: 1.02, angle: -8.78, activePower: 0, reactivePower: 0, isCritical: false }, position: { x: 0, y: 2, z: -5 } },
    { id: 'P6', label: 'Bus 6 (Sub)', layer: 'physical', isUnderAttack: false, details: { type: 'substation', voltage: 1.07, angle: -14.22, activePower: 12.2, reactivePower: 17.5, isCritical: true }, position: { x: 4, y: 2, z: 4 } },
    { id: 'P7', label: 'Bus 7', layer: 'physical', isUnderAttack: false, details: { type: 'load', voltage: 1.062, angle: -13.37, activePower: 0, reactivePower: 0, isCritical: false }, position: { x: 4, y: 2, z: 0 } },
    { id: 'P8', label: 'Bus 8 (Sub)', layer: 'physical', isUnderAttack: false, details: { type: 'substation', voltage: 1.09, angle: -13.37, activePower: 0, reactivePower: 17.3, isCritical: true }, position: { x: 4, y: 2, z: -4 } },
    // Cyber Layer
    { id: 'C1', label: 'Router 1', layer: 'cyber', isUnderAttack: false, details: { type: 'router', ipAddress: '192.168.1.1', status: 'Online', isCritical: true, firmwareVersion: 'v2.1.3' }, position: { x: -6, y: -2, z: 0 } },
    { id: 'C2', label: 'PLC 2', layer: 'cyber', isUnderAttack: false, details: { type: 'plc', ipAddress: '192.168.1.2', status: 'Online', isCritical: true, firmwareVersion: 'v1.8.0' }, position: { x: -4, y: -2, z: 4 } },
    { id: 'C3', label: 'PLC 3', layer: 'cyber', isUnderAttack: false, details: { type: 'plc', ipAddress: '192.168.1.3', status: 'Online', isCritical: false, firmwareVersion: 'v1.7.5' }, position: { x: -4, y: -2, z: -4 } },
    { id: 'C4', label: 'Router 4', layer: 'cyber', isUnderAttack: false, details: { type: 'router', ipAddress: '192.168.1.4', status: 'Online', isCritical: false, firmwareVersion: 'v2.1.3' }, position: { x: 0, y: -2, z: 5 } },
    { id: 'C5', label: 'PLC 5', layer: 'cyber', isUnderAttack: false, details: { type: 'plc', ipAddress: '192.168.1.5', status: 'Online', isCritical: false, firmwareVersion: 'v1.8.0' }, position: { x: 0, y: -2, z: -5 } },
    { id: 'C6', label: 'HMI 6', layer: 'cyber', isUnderAttack: false, details: { type: 'hmi', ipAddress: '192.168.1.6', status: 'Online', isCritical: true, firmwareVersion: 'v3.2.1' }, position: { x: 4, y: -2, z: 4 } },
    { id: 'C7', label: 'Ctrl Center 7', layer: 'cyber', isUnderAttack: false, details: { type: 'control_center', ipAddress: '192.168.1.7', status: 'Online', isCritical: true, firmwareVersion: 'N/A' }, position: { x: 4, y: -2, z: 0 } },
    { id: 'C8', label: 'PLC 8', layer: 'cyber', isUnderAttack: false, details: { type: 'plc', ipAddress: '192.168.1.8', status: 'Online', isCritical: true, firmwareVersion: 'v1.7.5' }, position: { x: 4, y: -2, z: -4 } },
  ],
  edges: [
    // Physical Transmission Lines
    { id: 'E1-P1-P2', source: 'P1', target: 'P2', type: 'physical_line', isUnderAttack: false, weight: 0.8 },
    { id: 'E2-P1-P5', source: 'P1', target: 'P5', type: 'physical_line', isUnderAttack: false, weight: 0.9 },
    { id: 'E3-P2-P3', source: 'P2', target: 'P3', type: 'physical_line', isUnderAttack: false, weight: 1.0 },
    { id: 'E4-P2-P4', source: 'P2', target: 'P4', type: 'physical_line', isUnderAttack: false, weight: 0.7 },
    { id: 'E5-P2-P5', source: 'P2', target: 'P5', type: 'physical_line', isUnderAttack: false, weight: 0.8 },
    { id: 'E6-P3-P4', source: 'P3', target: 'P4', type: 'physical_line', isUnderAttack: false, weight: 1.0 },
    { id: 'E7-P4-P5', source: 'P4', target: 'P5', type: 'physical_line', isUnderAttack: false, weight: 1.2 },
    { id: 'E8-P4-P7', source: 'P4', target: 'P7', type: 'physical_line', isUnderAttack: false, weight: 0.6 },
    { id: 'E9-P6-P7', source: 'P6', target: 'P7', type: 'physical_line', isUnderAttack: false, weight: 0.9 },
    { id: 'E10-P7-P8', source: 'P7', target: 'P8', type: 'physical_line', isUnderAttack: false, weight: 1.1 },

    // Cyber Communication Links
    { id: 'E11-C1-C2', source: 'C1', target: 'C2', type: 'cyber_link', isUnderAttack: false, weight: 1.0 },
    { id: 'E12-C1-C3', source: 'C1', target: 'C3', type: 'cyber_link', isUnderAttack: false, weight: 1.0 },
    { id: 'E13-C1-C4', source: 'C1', target: 'C4', type: 'cyber_link', isUnderAttack: false, weight: 1.0 },
    { id: 'E14-C2-C4', source: 'C2', target: 'C4', type: 'cyber_link', isUnderAttack: false, weight: 1.0 },
    { id: 'E15-C2-C6', source: 'C2', target: 'C6', type: 'cyber_link', isUnderAttack: false, weight: 1.0 },
    { id: 'E16-C3-C5', source: 'C3', target: 'C5', type: 'cyber_link', isUnderAttack: false, weight: 1.0 },
    { id: 'E17-C4-C7', source: 'C4', target: 'C7', type: 'cyber_link', isUnderAttack: false, weight: 1.0 },
    { id: 'E18-C6-C7', source: 'C6', target: 'C7', type: 'cyber_link', isUnderAttack: false, weight: 1.0 },
    { id: 'E19-C7-C8', source: 'C7', target: 'C8', type: 'cyber_link', isUnderAttack: false, weight: 1.0 },

    // Cyber-Physical Coupling
    { id: 'E20-P1-C1', source: 'P1', target: 'C1', type: 'cyber_physical_coupling', isUnderAttack: false, weight: 1.0 },
    { id: 'E21-P2-C2', source: 'P2', target: 'C2', type: 'cyber_physical_coupling', isUnderAttack: false, weight: 1.0 },
    { id: 'E22-P3-C3', source: 'P3', target: 'C3', type: 'cyber_physical_coupling', isUnderAttack: false, weight: 1.0 },
    { id: 'E23-P4-C4', source: 'P4', target: 'C4', type: 'cyber_physical_coupling', isUnderAttack: false, weight: 1.0 },
    { id: 'E24-P5-C5', source: 'P5', target: 'C5', type: 'cyber_physical_coupling', isUnderAttack: false, weight: 1.0 },
    { id: 'E25-P6-C6', source: 'P6', target: 'C6', type: 'cyber_physical_coupling', isUnderAttack: false, weight: 1.0 },
    { id: 'E26-P7-C7', source: 'P7', target: 'C7', type: 'cyber_physical_coupling', isUnderAttack: false, weight: 1.0 },
    { id: 'E27-P8-C8', source: 'P8', target: 'C8', type: 'cyber_physical_coupling', isUnderAttack: false, weight: 1.0 },
  ],
};

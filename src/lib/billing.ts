// src/lib/billing.ts

export type PlanType = "RESEARCHER" | "LAB" | "ENTERPRISE";

type PlanLimits = {
  maxProjects: number | null;       // null = unlimited
  monthlySimulations: number | null;
};

const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  RESEARCHER: {
    maxProjects: 3,
    monthlySimulations: 200,
  },
  LAB: {
    maxProjects: 20,
    monthlySimulations: 5000,
  },
  ENTERPRISE: {
    maxProjects: null,
    monthlySimulations: null,
  },
};

export function getPlanLimits(plan: PlanType): PlanLimits {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.RESEARCHER;
}

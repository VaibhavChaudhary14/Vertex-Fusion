<<<<<<< HEAD
// src/app/api/simulations/route.ts (only the POST part)
=======
// src/app/api/simulations/route.ts
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
<<<<<<< HEAD
import { getPlanLimits, PlanType } from "@/lib/billing";
=======
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd

const createSimulationSchema = z.object({
  projectId: z.string(),
  attackType: z.enum(["FDI", "RANSOMWARE", "REVERSE_SHELL", "BRUTE_FORCE", "NONE"]),
  gridType: z.string().default("IEEE-14"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createSimulationSchema.parse(body);

    // Make sure project belongs to this user (as owner)
    const project = await prisma.project.findFirst({
      where: {
        id: parsed.projectId,
        owner: {
          email: session.user.email,
        },
      },
<<<<<<< HEAD
      include: {
        organization: true,
      },
=======
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

<<<<<<< HEAD
    const org = project.organization;
    const plan = (org.plan ?? "RESEARCHER") as PlanType;
    const limits = getPlanLimits(plan);

    // ---- PLAN LIMIT CHECK: monthly simulations per org ----
    if (limits.monthlySimulations !== null) {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0);

      const simCountThisMonth = await prisma.simulation.count({
        where: {
          project: {
            organizationId: org.id,
          },
          createdAt: {
            gte: startOfMonth,
          },
        },
      });

      if (simCountThisMonth >= limits.monthlySimulations) {
        return NextResponse.json(
          {
            error: "Monthly simulation limit reached for current plan",
            plan,
            monthlySimulations: limits.monthlySimulations,
          },
          { status: 403 }
        );
      }
    }

    // --- Call Python FastAPI backend ---
    const gnnApiUrl = process.env.GNN_API_URL;

    if (!gnnApiUrl) {
      return NextResponse.json(
        { error: "GNN_API_URL is not configured" },
        { status: 500 }
      );
    }

    const gnnRes = await fetch(`${gnnApiUrl}/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id: project.id,
        attack_type: parsed.attackType,
        grid_type: parsed.gridType,
        cp_features: null,
      }),
    });

    if (!gnnRes.ok) {
      const errText = await gnnRes.text();
      console.error("GNN backend error:", errText);
      return NextResponse.json(
        { error: "GNN backend error", details: errText },
        { status: 502 }
      );
    }

    const gnnData = await gnnRes.json();

    const status =
      gnnData.predicted_label === "MALICIOUS" ? "SUCCESS" : "SUCCESS";
=======
    // Here we could call a real Python GNN API.
    // For now, we'll stub a fake "inference" result:
    const fakeDetectionProbability =
      parsed.attackType === "NONE" ? 0.01 : 0.95;

    const fakeResultSummary = {
      attackType: parsed.attackType,
      gridType: parsed.gridType,
      detectionProbability: fakeDetectionProbability,
      affectedNodes:
        parsed.attackType === "FDI"
          ? ["Bus-3", "Bus-5"]
          : parsed.attackType === "RANSOMWARE"
          ? ["Router-R1", "HMI-1"]
          : ["Bus-2"],
      timestamp: new Date().toISOString(),
    };
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd

    const sim = await prisma.simulation.create({
      data: {
        projectId: project.id,
        name: `Simulation – ${parsed.attackType} – ${new Date().toLocaleString()}`,
        gridType: parsed.gridType,
        attackType: parsed.attackType,
<<<<<<< HEAD
        status,
=======
        status: "SUCCESS", // or "PENDING" then update later if real async
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
        inputConfig: {
          attackType: parsed.attackType,
          gridType: parsed.gridType,
        },
<<<<<<< HEAD
        resultSummary: gnnData,
=======
        resultSummary: fakeResultSummary,
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
      },
    });

    return NextResponse.json(
      {
        id: sim.id,
        name: sim.name,
        attackType: sim.attackType,
        gridType: sim.gridType,
        status: sim.status,
        createdAt: sim.createdAt.toISOString(),
        resultSummary: sim.resultSummary,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Simulation POST error:", err);

    if (err?.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input", details: err.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
<<<<<<< HEAD
=======

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Missing projectId" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        owner: {
          email: session.user.email,
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    const sims = await prisma.simulation.findMany({
      where: { projectId: project.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      sims.map((s) => ({
        id: s.id,
        name: s.name,
        attackType: s.attackType,
        gridType: s.gridType,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
        resultSummary: s.resultSummary,
      })),
      { status: 200 }
    );
  } catch (err) {
    console.error("Simulation GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd

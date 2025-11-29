// src/app/api/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { getPlanLimits, PlanType } from "@/lib/billing";

const createProjectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      memberships: {
        include: {
          organization: {
            include: {
              projects: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ projects: [] }, { status: 200 });
  }

  const org = user.memberships[0]?.organization;
  if (!org) {
    return NextResponse.json({ projects: [] }, { status: 200 });
  }

  return NextResponse.json(
    {
      projects: org.projects.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
      })),
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createProjectSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        memberships: {
          include: { organization: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const org = user.memberships[0]?.organization;
    if (!org) {
      return NextResponse.json(
        { error: "No organization found for user" },
        { status: 400 }
      );
    }

    // ---- PLAN LIMIT CHECK: projects per org ----
    const plan = (org.plan ?? "RESEARCHER") as PlanType;
    const limits = getPlanLimits(plan);

    if (limits.maxProjects !== null) {
      const projectCount = await prisma.project.count({
        where: { organizationId: org.id },
      });

      if (projectCount >= limits.maxProjects) {
        return NextResponse.json(
          {
            error: "Project limit reached for current plan",
            plan,
            maxProjects: limits.maxProjects,
          },
          { status: 403 }
        );
      }
    }

    const project = await prisma.project.create({
      data: {
        name: parsed.name,
        description: parsed.description ?? null,
        organizationId: org.id,
        ownerId: user.id,
      },
    });

    return NextResponse.json(
      {
        id: project.id,
        name: project.name,
        description: project.description,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Create project error:", err);
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

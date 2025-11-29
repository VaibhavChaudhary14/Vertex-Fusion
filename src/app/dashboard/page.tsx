<<<<<<< HEAD
// src/app/dashboard/page.tsx
=======
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth-session";
import { DashboardClient } from "./DashboardClient";
<<<<<<< HEAD
import { getPlanLimits, PlanType } from "@/lib/billing";

type DashboardPageProps = {
  searchParams?: {
    projectId?: string;
  };
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
=======

export default async function DashboardPage() {
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
  const session = await getCurrentSession();

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const email = session.user.email;

<<<<<<< HEAD
  // Load user + memberships + projects
=======
  // 1) Load or create the user
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
  let user = await prisma.user.findUnique({
    where: { email },
    include: {
      memberships: {
        include: {
<<<<<<< HEAD
          organization: {
            include: {
              projects: true,
            },
          },
=======
          organization: true,
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
        },
      },
      ownedProjects: true,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: session.user.name ?? null,
      },
      include: {
        memberships: {
<<<<<<< HEAD
          include: {
            organization: {
              include: {
                projects: true,
              },
            },
          },
=======
          include: { organization: true },
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
        },
        ownedProjects: true,
      },
    });
  }

<<<<<<< HEAD
  // Ensure organization
  let membership = user.memberships[0];
  let organization = membership?.organization;

  if (!organization) {
    organization = await prisma.organization.create({
=======
  // 2) Ensure the user has an organization
  let organization =
    user.memberships[0]?.organization ??
    (await prisma.organization.create({
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
      data: {
        name: user.name ? `${user.name}'s Workspace` : "My Workspace",
        slug: `org-${user.id.slice(0, 8)}`,
        members: {
          create: {
            userId: user.id,
            role: "OWNER",
          },
        },
      },
<<<<<<< HEAD
      include: {
        projects: true,
      },
    });
  }

  // Ensure at least one project
  let projects = organization.projects;
  if (!projects || projects.length === 0) {
    const created = await prisma.project.create({
=======
    }));

  // 3) Ensure there is at least one project
  let project = await prisma.project.findFirst({
    where: { organizationId: organization.id },
  });

  if (!project) {
    project = await prisma.project.create({
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
      data: {
        name: "Default Smart Grid Project",
        description:
          "Initial project created automatically for your Vertex Fusion workspace.",
        organizationId: organization.id,
        ownerId: user.id,
      },
    });
<<<<<<< HEAD

    projects = [created];
  }

  // Pick current project based on URL param if valid
  const requestedProjectId = searchParams?.projectId;
  const project =
    projects.find((p) => p.id === requestedProjectId) ?? projects[0];

  // Load simulations for this project
=======
  }

  // 4) Load simulations
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
  const simulations = await prisma.simulation.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: "desc" },
  });

<<<<<<< HEAD
  // ---- Plan + usage computation ----
  const plan = (organization.plan ?? "RESEARCHER") as PlanType;
  const limits = getPlanLimits(plan);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);

  const monthlySimulationCount = await prisma.simulation.count({
    where: {
      project: {
        organizationId: organization.id,
      },
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

=======
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
  return (
    <DashboardClient
      userEmail={email}
      orgName={organization.name}
      projectName={project.name}
      projectId={project.id}
<<<<<<< HEAD
      projects={projects.map((p) => ({
        id: p.id,
        name: p.name,
      }))}
      plan={plan}
      monthlySimulationLimit={limits.monthlySimulations}
      monthlySimulationCount={monthlySimulationCount}
=======
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
      initialSimulations={simulations.map((s) => ({
        id: s.id,
        name: s.name,
        attackType: s.attackType,
        gridType: s.gridType,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
<<<<<<< HEAD
        resultSummary: s.resultSummary as any,
=======
>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd
      }))}
    />
  );
}
<<<<<<< HEAD
=======

>>>>>>> 1c5187f46b2fcb733c4dd32ea6296f1881a706fd

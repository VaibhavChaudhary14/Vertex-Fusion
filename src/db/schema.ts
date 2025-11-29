import {
    pgTable,
    serial,
    text,
    timestamp,
    uuid,
    boolean,
    integer,
  } from "drizzle-orm/pg-core";
  import { relations } from "drizzle-orm";
  
  // USERS
  export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // WORKSPACES (teams / orgs)
  export const workspaces = pgTable("workspaces", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(), // e.g. vertex-labs
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // MEMBERSHIPS (user ↔ workspace)
  export const memberships = pgTable("memberships", {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    role: text("role").notNull().default("member"), // "owner" | "admin" | "member"
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  // PROJECTS / SIMULATIONS
  export const projects = pgTable("projects", {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    // e.g. "ieee-14", "ieee-30"
    topology: text("topology").default("ieee-14").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // ATTACK RUNS / EVENTS LOG
  export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    // e.g. "FDI", "RANSOMWARE", "BF", "RS", "BD"
    attackType: text("attack_type").notNull(),
    // optional: output from GNN
    gnnScore: integer("gnn_score"), // 0–100 risk score
    payload: text("payload"), // JSON string of telemetry snapshot
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  // RELATIONS (for type-safe joins later)
  export const usersRelations = relations(users, ({ many }) => ({
    memberships: many(memberships),
    workspaces: many(workspaces),
  }));
  
  export const workspacesRelations = relations(workspaces, ({ many, one }) => ({
    memberships: many(memberships),
    projects: many(projects),
    owner: one(users, {
      fields: [workspaces.ownerId],
      references: [users.id],
    }),
  }));
  
  export const projectsRelations = relations(projects, ({ many, one }) => ({
    workspace: one(workspaces, {
      fields: [projects.workspaceId],
      references: [workspaces.id],
    }),
    events: many(events),
  }));
  
  export const membershipsRelations = relations(memberships, ({ one }) => ({
    user: one(users, {
      fields: [memberships.userId],
      references: [users.id],
    }),
    workspace: one(workspaces, {
      fields: [memberships.workspaceId],
      references: [workspaces.id],
    }),
  }));
  
  export const eventsRelations = relations(events, ({ one }) => ({
    project: one(projects, {
      fields: [events.projectId],
      references: [projects.id],
    }),
  }));
  
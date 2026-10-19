import { getStore } from "@netlify/blobs";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const pass = process.env.TEAM_PASSWORD;
  if (!pass) return json({ error: "TEAM_PASSWORD environment variable is not set" }, 500);
  if (req.headers.get("x-team-password") !== pass) return json({ error: "unauthorised" }, 401);

  const store = getStore({ name: "resource-planner", consistency: "strong" });
  const current = (await store.get("plan", { type: "json" })) || { plan: null, version: 0 };

  if (req.method === "GET") return json(current);

  if (req.method === "PUT") {
    const body = await req.json().catch(() => null);
    const plan = body && body.plan;
    if (!plan || !Array.isArray(plan.people) || !Array.isArray(plan.workstreams)) return json({ error: "bad request" }, 400);
    if ((body.baseVersion || 0) !== current.version) return json(current, 409);
    const next = { plan, version: current.version + 1, savedAt: new Date().toISOString() };
    await store.setJSON("plan", next);
    await store.setJSON("backup-" + next.savedAt.slice(0, 10), next);
    return json({ version: next.version, savedAt: next.savedAt });
  }

  return json({ error: "method not allowed" }, 405);
};

export const config = { path: "/api/plan" };

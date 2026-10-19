# Kia Kotahi Ako Resource Planner — Netlify deploy

## What's here
- site/index.html — the planner (single self-contained file)
- site/seed.json — the starting plan, loaded once the first time anyone signs in
- netlify/functions/plan.mjs — saves and loads the shared plan (Netlify Blobs), checks the team password
- netlify.toml, package.json — Netlify config

## Deploy (GitHub — recommended)
1. Put the contents of this folder in a new GitHub repository.
2. Netlify → Add new site → Import an existing project → pick the repo. Leave build settings as detected.
3. Site configuration → Environment variables → add TEAM_PASSWORD with your chosen password.
4. Deploys → Trigger deploy. Open the site and sign in.

## Deploy (Netlify CLI, no GitHub)
1. Install Node.js, then in this folder run: npm install, then npx netlify-cli deploy --prod
2. Add TEAM_PASSWORD under Environment variables as above, then redeploy.

Note: dragging the folder onto Netlify Drop deploys the page only, not the save function — use one of the options above.

## Day to day
- Everyone signs in with the one team password; it's remembered on that device until Sign out.
- Each kaimahi's tab has its own link, e.g. https://your-site.netlify.app/#kaimahi=Sarah
- Changes save automatically and other open copies refresh within about 30 seconds.
- A daily backup is kept in the "resource-planner" blob store (Netlify → Blobs) as backup-YYYY-MM-DD.
- To change the password, edit TEAM_PASSWORD and redeploy; everyone will be asked to sign in again.

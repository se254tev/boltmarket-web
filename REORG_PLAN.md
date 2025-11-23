# Reorganization Plan

This file explains the proposed reorganization and provides PowerShell commands to perform the move locally.

Goal
- Move frontend files into `web/`
- Move backend files into `server/` (rename `backend/` → `server/`)
- Keep `sql/`, `public/`, and top-level docs at repo root

Notes
- I created `web/package.json` and `server/package.json` (copied from the current manifests).
- The repository root `package.json` was updated to be monorepo-friendly and includes workspace-aware scripts.

PowerShell move commands (run from repository root):

```powershell
# Create target folders (already created by this commit but safe to run)
New-Item -ItemType Directory -Force -Path web
New-Item -ItemType Directory -Force -Path server

# Move frontend files into `web/`
Move-Item -Force index.html web\
Move-Item -Force vite.config.js web\
Move-Item -Force postcss.config.js web\
Move-Item -Force tailwind.config.js web\
Move-Item -Force package.json web\
Move-Item -Force src web\
Move-Item -Force public web\

# Move backend folder to `server/` (if it exists)
if (Test-Path backend) { Move-Item -Force backend\* server\ } 

# If there are files left in root that belong to web, move them as needed.

# Install dependencies for both workspaces
npm install
npm --prefix web install
npm --prefix server install

# After move: run build and start checks
npm --prefix web run build
npm --prefix server run dev
```

After running the above, update any CI or Vercel configuration to point to the new `web` build output (if applicable).

If you want me to apply the moves in-repo (I can create moved files and delete originals), tell me and I'll run the scripted edits here. Otherwise run the `move-files.ps1` script included in this repo to perform the same actions.

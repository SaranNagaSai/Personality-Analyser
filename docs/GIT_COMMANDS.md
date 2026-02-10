# Git Commands Guide for Updating Your Repository

## Quick Reference for Pushing Code Changes

### Your Repository Information
- **Repository URL**: https://github.com/SaranNagaSai/Personality-Analyser.git
- **Branch**: main

---

## Standard Workflow to Push Changes

### 1. Check Current Status
```bash
git status
```
This shows which files have been modified, added, or deleted.

### 2. Stage All Changes
```bash
git add .
```
This stages all modified files for commit. The `.` means "all files in current directory and subdirectories".

**Alternative - Stage Specific Files:**
```bash
git add backend/server.js
git add frontend/css/style.css
```

### 3. Commit Changes
```bash
git commit -m "Your commit message here"
```

**Good Commit Message Examples:**
- `"feat: Add MongoDB integration"`
- `"fix: Resolve login authentication bug"`
- `"style: Update UI with colorful design"`
- `"docs: Update README with setup instructions"`

### 4. Push to GitHub
```bash
git push origin main
```
This uploads your committed changes to GitHub.

---

## Complete Command Sequence (Copy & Paste)

```bash
# Navigate to project directory
cd c:\Users\saran\OneDrive\Documents\Personality-Analyser

# Check what changed
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Your descriptive message here"

# Push to GitHub
git push origin main
```

---

## Common Scenarios

### Scenario 1: Update Only Specific Files
```bash
git add backend/server.js frontend/dashboard.html
git commit -m "Update server and dashboard"
git push origin main
```

### Scenario 2: Check Remote Repository
```bash
git remote -v
```

### Scenario 3: Pull Latest Changes from GitHub
```bash
git pull origin main
```
Use this before starting work to get the latest code.

### Scenario 4: View Commit History
```bash
git log --oneline
```

### Scenario 5: Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

---

## Workflow for Daily Development

```bash
# 1. Start of day - Get latest code
git pull origin main

# 2. Make your code changes...

# 3. Check what you changed
git status

# 4. Stage, commit, and push
git add .
git commit -m "Describe what you changed"
git push origin main
```

---

## Troubleshooting

### Problem: "Your branch is behind 'origin/main'"
**Solution:**
```bash
git pull origin main
git push origin main
```

### Problem: Merge conflicts
**Solution:**
1. Open conflicting files
2. Resolve conflicts manually
3. Then:
```bash
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Problem: Accidentally committed wrong files
**Solution:**
```bash
git reset --soft HEAD~1  # Undo last commit
git status               # Check files
git add <correct-files>  # Stage only what you want
git commit -m "Correct commit message"
git push origin main
```

---

## Best Practices

1. **Commit Often**: Make small, focused commits rather than large ones
2. **Descriptive Messages**: Write clear commit messages explaining what changed
3. **Pull Before Push**: Always pull latest changes before pushing
4. **Check Status**: Use `git status` frequently to see what's changed
5. **Don't Commit node_modules**: Add to `.gitignore` (already done in your project)

---

## .gitignore Reminder

Your project should have a `.gitignore` file containing:
```
node_modules/
.env
*.log
.DS_Store
```

This prevents unnecessary files from being committed.

---

## Quick Commands Cheat Sheet

| Command | Description |
|---------|-------------|
| `git status` | Check current changes |
| `git add .` | Stage all changes |
| `git add <file>` | Stage specific file |
| `git commit -m "msg"` | Commit staged changes |
| `git push origin main` | Push to GitHub |
| `git pull origin main` | Get latest from GitHub |
| `git log --oneline` | View commit history |
| `git diff` | See unstaged changes |
| `git branch` | List branches |

---

## Your Recent Push

✅ **Successfully pushed to GitHub!**

**Commit Message:** "feat: Add MongoDB integration, enhanced dashboard with personalized resources, and stunning UI redesign"

**Files Updated:**
- Backend: MongoDB configuration, models, and API endpoints
- Frontend: Enhanced dashboard with personality resources
- UI: Stunning colorful design with animations

**Repository:** https://github.com/SaranNagaSai/Personality-Analyser

You can now view your updated code on GitHub!

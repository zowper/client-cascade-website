# Client Cascade Website - AI Developer Guide (AGENTS.md)

**ATTENTION ALL AI ASSISTANTS:** This document defines the absolute protocols, system directives, and design requirements for all AI-assisted development in the `client-cascade-website` project. You must strictly adhere to every instruction defined below.

---

## 1. 🚀 Git & Verification Workflow

- **Always Verify Changes:** Before declaring any task complete, you must verify that the changes function correctly and look visually correct.
- **Immediate Push to Main:** Once changes are verified as good, you must immediately stage, commit, and push the changes to the GitHub `main` branch. **Do not ask the user for permission to push to main.**
- **SSH remote for push:** If the repository defaults to HTTPS remote and throws credential prompt issues during push, update the remote URL to SSH (`git@github.com:zowper/client-cascade-website.git`) to utilize the authenticated key.

---

## 2. 🎨 Landing Page Mandates (`/earlybird`)

These directives are extracted from the core design intent for the Client Cascade waitlist landing page:

- **Expert Marketing & Design:** The landing page at `ClientCascade.com/earlybird` must be exceptionally beautiful, compelling, professional, functional, and premium-tier.
- **Desktop & Mobile Responsiveness:** It is extremely important that the landing page works flawlessly and looks stunning on both desktop and mobile devices.
- **Beautiful Calls to Action (CTAs):**
  - Incorporate eye-catching, high-conversion CTAs.
  - Distribute them in multiple places using different forms where they fit best.
  - *Note:* Do not worry about backend integration/functionality yet; focus on layout, aesthetics, and user experience.
- **Quarantine Mode (Strict Isolation):**
  - Do not include any links to the existing website.
  - Do not include navigation from the existing site.
  - The user should be quarantined to this page until they fill out a Call to Action (which doesn't need to do anything yet).
- **Creative Freedom (Visual Theme):**
  - The page does not need to follow the same design theme as the existing Client Cascade site. Use modern, premium, high-impact aesthetics.

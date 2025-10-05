# Deployment Notes

1. Commit and push to GitHub: `git push origin main`.
2. In Vercel, import the repository and select the `lawlink-landing` project folder.
3. Use the default Next.js preset; set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` once the analytics domain is ready.
4. Enable Preview Deployments for pull requests to validate changes before merging.
5. Configure the production domain (e.g., `lawlink.ai`) and add a redirect from `www`.

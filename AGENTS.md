# AGENTS.md

Vue 3 + TypeScript + Vite academy frontend for Scarlett Cordova and “Quema Grasa, Construye Músculo.”

## Tooling

- Use `pnpm`; `pnpm build` runs `vue-tsc -b` before `vite build`. There are no test or lint scripts.
- `pnpm-workspace.yaml` must allow `esbuild` and `@parcel/watcher`; pnpm 11 otherwise blocks installs/builds.
- Both `vite.config.ts` and `vite.config.js` exist. Treat the TypeScript file as authoritative.

## Architecture

- `src/router/index.ts` owns route SEO and guards; `/app/**` uses `DashboardLayout`, while public/auth routes use `TheNav` and `TheFooter` through `App.vue`.
- `src/services/httpBase.ts` consumes `VITE_API_BASE_URL` and defaults to `http://localhost:8100/api`.
- Pinia auth state is localStorage-backed in `src/stores/user.ts`; dashboard content is currently seeded client-side in `src/stores/dashboard.ts`.

## Brand And Assets

- Canonical palette values live in `src/styles/colorVariables.module.scss`. Legacy `$lpb-*` variable names remain for compatibility but represent Scarlett's red, black, cream, and lime palette.
- Vite injects `@use "@/styles/index.scss" as *;` into every SCSS block; do not add redundant imports.
- Use only Cloudinary cloud `kyt3rjjz`, folder `scarlett/quema-grasa-construye-musculo`. Keep URL construction in `src/config/site.ts`, `src/composables/useCloudinary.ts`, or shared store helpers.
- `src/config/site.ts` centralizes public URLs and brand copy. Set `VITE_SITE_URL`, `VITE_FUNNEL_URL`, and `VITE_INSTAGRAM_URL` per deployment instead of hardcoding domains.

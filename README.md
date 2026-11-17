# Parlier Roofing Co. — React + Tailwind CSS

The frontend now follows the utility-first styling pattern used in the supplied `src.zip` reference project.

## Frontend styling
- React components use Tailwind utility classes directly in `className`.
- No separate component/page stylesheet is used.
- `client/src/index.css` is only the Tailwind v4 entry point plus small global defaults and theme tokens, following the supplied reference project's `src/index.css` pattern.
- Tailwind is integrated through `@tailwindcss/vite`.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

The Express/PostgreSQL server and lead form endpoint are retained from the supplied project.

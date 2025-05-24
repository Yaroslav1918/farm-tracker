This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
farm-tracker
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20250503075503_init
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  ├─ farm-1.png
│  ├─ farm-10.jpg
│  ├─ farm-2.png
│  ├─ farm-3.png
│  ├─ farm-4.png
│  ├─ farm-5.jpg
│  ├─ farm-6.jpg
│  ├─ farm-7.jpg
│  ├─ farm-8.jpg
│  ├─ farm-9.jpg
│  └─ pig.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ about
│  │  │  └─ page.tsx
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  ├─ signin
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ signup
│  │  │  │     └─ route.ts
│  │  │  └─ sessions
│  │  │     ├─ start
│  │  │     │  └─ route.ts
│  │  │     └─ stop
│  │  │        └─ route.ts
│  │  ├─ auth
│  │  │  └─ confirm
│  │  │     └─ route.ts
│  │  ├─ error
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ gallery
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  ├─ actions.ts
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ private
│  │  │  └─ page.tsx
│  │  ├─ reports
│  │  │  └─ page.tsx
│  │  ├─ signup
│  │  │  └─ page.tsx
│  │  └─ timer
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ About.tsx
│  │  ├─ AuthContext.tsx
│  │  ├─ AuthForm.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Gallery.tsx
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ SessionTable.tsx
│  │  ├─ TaskSelector.tsx
│  │  └─ Timer.tsx
│  ├─ generated
│  │  └─ prisma
│  │     ├─ client.d.ts
│  │     ├─ client.js
│  │     ├─ default.d.ts
│  │     ├─ default.js
│  │     ├─ edge.d.ts
│  │     ├─ edge.js
│  │     ├─ index-browser.js
│  │     ├─ index.d.ts
│  │     ├─ index.js
│  │     ├─ package.json
│  │     ├─ query_engine-windows.dll.node
│  │     ├─ runtime
│  │     │  ├─ edge-esm.js
│  │     │  ├─ edge.js
│  │     │  ├─ index-browser.d.ts
│  │     │  ├─ index-browser.js
│  │     │  ├─ library.d.ts
│  │     │  ├─ library.js
│  │     │  ├─ react-native.js
│  │     │  └─ wasm.js
│  │     ├─ schema.prisma
│  │     ├─ wasm.d.ts
│  │     └─ wasm.js
│  ├─ lib
│  │  ├─ auth.ts
│  │  ├─ axiosInstance.ts
│  │  ├─ prisma.ts
│  │  └─ supabase
│  │     ├─ middleware.ts
│  │     └─ server.ts
│  ├─ middleware.ts
│  ├─ styles
│  │  └─ globals.css
│  └─ types
│     ├─ auth.ts
│     ├─ authContext.ts
│     └─ user.ts
├─ tailwind.config.js
└─ tsconfig.json

```
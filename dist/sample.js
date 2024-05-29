"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitignoreContent = void 0;
exports.gitignoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# database
/prisma/db.sqlite
/prisma/db.sqlite-journal

# next.js
/.next/
/out/
next-env.d.ts

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env
.env*.local

# vercel
.vercel

# local env files
.env*.local
.env

# typescript
*.tsbuildinfo
next-env.d.ts
`;

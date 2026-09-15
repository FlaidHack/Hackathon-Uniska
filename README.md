# Katalyst

Business decision-support app untuk UMKM. Transaction → Insight → Simulation → Recommendation.

---

## Cara Jalankan

```bash
npm install
npx prisma generate
```

Isi `.env` (copy dari `.env.example`):

```
DATABASE_URL=<connection string dari Neon>
NEXTAUTH_SECRET=<hasil dari: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
GROQ_API_KEY=<dari console.groq.com, opsional dulu>
```

Jalankan migration + seed:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Run dev server:

```bash
npm run dev
```

Login dengan salah satu akun dummy (password sama-sama `password`):

| Role  | Email            |
|-------|------------------|
| Owner | owner@test.com   |
| Staff | staff@test.com   |

---

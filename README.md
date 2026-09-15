# Katalyst

Business decision-support app untuk UMKM. Transaction → Insight → Simulation → Recommendation.

Ini **setup/scaffolding prototype**. Halaman sudah jalan dengan UI dasar (Tailwind polos, belum
di-desain), auth sudah jalan, database schema sudah final. **Business logic (analytics engine,
simulation engine, data fetching di tiap halaman) belum diimplementasikan** — itu next step.

---

## Cara Jalanin (Pertama Kali)

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

## Struktur Project

```
app/
  login/                  - halaman login (SUDAH jalan)
  dashboard/              - Owner only, UI skeleton (BELUM ada data)
  products/               - Owner+Staff, UI skeleton (BELUM ada data)
  products/[id]/          - detail produk, UI skeleton
  transactions/           - Owner+Staff, UI skeleton
  simulator/              - Owner only, UI skeleton
  settings/               - Owner only, UI skeleton
  api/auth/[...nextauth]/ - NextAuth config (SUDAH jalan)

components/
  Sidebar.tsx             - nav berbeda per role (SUDAH jalan)
  ui/                     - Button, Input, Card, Badge, Table (plain Tailwind, bukan shadcn)

lib/
  db.ts                   - Prisma client singleton (SUDAH jalan)
  utils.ts                - formatRupiah, formatPercent, cn()
  analytics.ts            - BELUM ADA, lihat "Next Steps"
  simulation.ts           - BELUM ADA, lihat "Next Steps"

prisma/
  schema.prisma           - schema final (jangan diubah struktur field tanpa diskusi)
  seed.ts                 - generate ~270 transaksi dummy across 8 produk
```

---

## Next Steps (Belum Dikerjakan)

Dikerjakan terpisah karena butuh ketelitian ekstra pada perhitungan bisnis:

1. **`lib/analytics.ts`** — revenue, profit, margin, top products, business insights.
   Ada 3 acceptance test case yang harus dicocokkan persis sebelum dianggap selesai.
2. **`lib/simulation.ts`** — what-if engine (ubah harga/diskon/cost → dampak ke profit).
   Juga ada acceptance test case.
3. Wire kedua engine di atas ke halaman `/dashboard` dan `/simulator` (ganti placeholder `—`
   dengan data asli).
4. API routes untuk create transaction (`/api/transactions`) dan create product (`/api/products`).
5. Copilot (bisa mulai dari preset button yang manggil fungsi di atas, belum perlu full LLM loop).

**Jangan mulai kerjain nomor 1-2 sebelum baca spec engine yang sudah ada** — di situ ada definisi
insight rules dan angka acceptance test yang harus dicocokkan, supaya semua developer menghasilkan
angka yang sama persis.

---

## Kredensial Dev (Hardcoded — JANGAN dipakai di production)

Login saat ini pakai email/password hardcoded di
`app/api/auth/[...nextauth]/route.ts` (`owner@test.com` / `staff@test.com`, password `password`
untuk keduanya). Ini sengaja disederhanakan untuk kecepatan development. Ganti ke password hashing
asli sebelum dipakai di luar testing internal.

---

## Git History

Repo ini sudah di-`git init` dengan commit bertahap per fitur (`git log --oneline` untuk lihat).
Lanjutkan pola ini — 1 commit per fitur/task, bukan 1 commit besar di akhir hari. Ini bikin gampang
tahu siapa ngerjain apa dan gampang di-revert kalau ada yang break.

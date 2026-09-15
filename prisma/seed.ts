import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

const PRODUCTS: { name: string; cost: number; sell: number; txCount: number }[] = [
  // txCount = jumlah transaksi dummy yang dibuat untuk produk ini (atur popularitas)
  { name: "Kopi Susu Gula Aren", cost: 6000, sell: 10000, txCount: 60 },
  { name: "Kopi Hitam", cost: 4000, sell: 8000, txCount: 25 },
  { name: "Es Teh Manis", cost: 2000, sell: 5000, txCount: 40 },
  { name: "Roti Bakar Coklat", cost: 7000, sell: 9000, txCount: 55 }, // laris, margin rendah -> insight target
  { name: "Nasi Goreng", cost: 8000, sell: 15000, txCount: 30 },
  { name: "Matcha Latte", cost: 6000, sell: 18000, txCount: 8 }, // margin tinggi, demand rendah -> insight target
  { name: "Croissant", cost: 6000, sell: 12000, txCount: 20 },
  { name: "Americano", cost: 3000, sell: 7000, txCount: 35 },
];

function randomDateWithinDays(days: number): Date {
  const now = Date.now();
  const past = now - Math.random() * days * 24 * 60 * 60 * 1000;
  return new Date(past);
}

function randomQty(): number {
  return 1 + Math.floor(Math.random() * 3); // 1-3
}

async function main() {
  console.log("Seeding Katalyst dummy data...");

  const defaultPasswordHash = await bcrypt.hash("password", 10);

  const business = await db.business.create({
    data: { name: "Kedai Kopi Nusantara" },
  });

  const owner = await db.user.upsert({
    where: { email: "owner@test.com" },
    update: { role: "OWNER", businessId: business.id, password: defaultPasswordHash },
    create: {
      email: "owner@test.com",
      name: "Owner Demo",
      role: "OWNER",
      businessId: business.id,
      password: defaultPasswordHash,
    },
  });

  const staff = await db.user.upsert({
    where: { email: "staff@test.com" },
    update: { role: "STAFF", businessId: business.id, password: defaultPasswordHash },
    create: {
      email: "staff@test.com",
      name: "Budi (Staff)",
      role: "STAFF",
      businessId: business.id,
      password: defaultPasswordHash,
    },
  });

  for (const p of PRODUCTS) {
    const product = await db.product.create({
      data: {
        businessId: business.id,
        name: p.name,
        costPrice: p.cost,
        sellingPrice: p.sell,
      },
    });

    for (let i = 0; i < p.txCount; i++) {
      const userId = Math.random() < 0.7 ? staff.id : owner.id;
      const createdAt = randomDateWithinDays(90);

      await db.transaction.create({
        data: {
          businessId: business.id,
          userId,
          createdAt,
          items: {
            create: {
              productId: product.id,
              quantity: randomQty(),
              priceAtSale: product.sellingPrice,
              costAtSale: product.costPrice,
            },
          },
        },
      });
    }
    console.log(`  - ${p.name}: ${p.txCount} transaksi dibuat`);
  }

  console.log("Seed selesai.");
  console.log(`Login sebagai Owner: owner@test.com / password`);
  console.log(`Login sebagai Staff: staff@test.com / password`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

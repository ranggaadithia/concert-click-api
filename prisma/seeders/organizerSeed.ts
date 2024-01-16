import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const organizerData: Prisma.OrganizerCreateInput[] = [
  {
    name: "Blue Valley Citiezens",
    email: "admin@bluevalleycity.com",
    password: "password",
    phone: "1234567890",
  },
  {
    name: "Red Valley Citiezens",
    email: "hi@redvalleycity.com",
    password: "password",
  }
];

async function main() { 
  console.log(`Start seeding ...`);
  for (const o of organizerData) {
    const organizer = await prisma.organizer.create({
      data: o,
    });
    console.log(`Created organizer with id: ${organizer.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
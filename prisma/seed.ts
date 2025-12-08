import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  const demoEmail = "demo@lawlink.com";
  const demoPassword = "demo123456";

  // Check if demo user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (existingUser) {
    console.log("✅ Demo lawyer account already exists. Skipping creation.");
    return;
  }

  // Hash password
  const passwordHash = await bcrypt.hash(demoPassword, 10);

  // Create demo lawyer user and profile
  const user = await prisma.user.create({
    data: {
      email: demoEmail,
      passwordHash,
      role: "LAWYER",
      lawyerProfile: {
        create: {
          fullName: "Dr. Sarah Johnson",
          overview:
            "Experienced corporate lawyer specializing in mergers and acquisitions, contract negotiations, and regulatory compliance. With over 10 years of practice, I've successfully represented numerous clients in complex business transactions.",
          location: "Berlin, Germany",
          practiceArea: "Corporate",
          yearsExperience: 10,
          languages: ["English", "German", "French"],
          website: "https://example.com",
          phone: "+49 30 12345678",
          isPublic: true,
          isApproved: true,
          practiceAreas: {
            create: [
              {
                name: "Mergers & Acquisitions",
                caseCount: 45,
              },
              {
                name: "Contract Law",
                caseCount: 120,
              },
              {
                name: "Corporate Governance",
                caseCount: 35,
              },
              {
                name: "Regulatory Compliance",
                caseCount: 28,
              },
            ],
          },
        },
      },
    },
  });

  console.log("✅ Demo lawyer account created successfully!");
  console.log(`   Email: ${demoEmail}`);
  console.log(`   Password: ${demoPassword}`);
  console.log(`   User ID: ${user.id}`);
  console.log("\n📝 You can now login at http://localhost:3000/login");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


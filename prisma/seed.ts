import { PrismaClient, UserRole, DocumentType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding demo data...");

  const password = await bcrypt.hash("Demo1234!", 12);

  // Demo lawyer 1
  const lawyer1 = await prisma.user.upsert({
    where: { email: "demo@lawlink.com" },
    update: {},
    create: {
      email: "demo@lawlink.com",
      passwordHash: password,
      role: UserRole.LAWYER,
    },
  });

  await prisma.lawyerProfile.upsert({
    where: { userId: lawyer1.id },
    update: {},
    create: {
      userId: lawyer1.id,
      fullName: "Anna Müller",
      overview:
        "Spezialisiert auf Arbeitsrecht und Kündigungsschutz mit über 12 Jahren Berufserfahrung. Ich helfe Arbeitnehmern und Arbeitgebern, faire Lösungen zu finden.",
      location: "Berlin, Deutschland",
      practiceArea: "Arbeitsrecht",
      yearsExperience: 12,
      languages: ["de", "en"],
      isPublic: true,
      isApproved: true,
      practiceAreas: {
        create: [
          { name: "Arbeitsrecht", caseCount: 142 },
          { name: "Kündigungsschutz", caseCount: 89 },
          { name: "Arbeitsverträge", caseCount: 67 },
        ],
      },
    },
  });

  // Demo lawyer 2
  const lawyer2 = await prisma.user.upsert({
    where: { email: "thomas.becker@lawlink-demo.de" },
    update: {},
    create: {
      email: "thomas.becker@lawlink-demo.de",
      passwordHash: password,
      role: UserRole.LAWYER,
    },
  });

  await prisma.lawyerProfile.upsert({
    where: { userId: lawyer2.id },
    update: {},
    create: {
      userId: lawyer2.id,
      fullName: "Thomas Becker",
      overview:
        "Rechtsanwalt für Mietrecht und Immobilienrecht in München. 9 Jahre Erfahrung in der Beratung von Mietern und Vermietern.",
      location: "München, Deutschland",
      practiceArea: "Mietrecht",
      yearsExperience: 9,
      languages: ["de"],
      isPublic: true,
      isApproved: true,
      practiceAreas: {
        create: [
          { name: "Mietrecht", caseCount: 98 },
          { name: "Immobilienrecht", caseCount: 54 },
        ],
      },
    },
  });

  // Demo lawyer 3
  const lawyer3 = await prisma.user.upsert({
    where: { email: "sarah.khan@lawlink-demo.de" },
    update: {},
    create: {
      email: "sarah.khan@lawlink-demo.de",
      passwordHash: password,
      role: UserRole.LAWYER,
    },
  });

  await prisma.lawyerProfile.upsert({
    where: { userId: lawyer3.id },
    update: {},
    create: {
      userId: lawyer3.id,
      fullName: "Sarah Khan",
      overview:
        "Familienrecht, Scheidung und Sorgerecht. Einfühlsame und erfahrene Beratung in schwierigen Lebenssituationen.",
      location: "Hamburg, Deutschland",
      practiceArea: "Familienrecht",
      yearsExperience: 6,
      languages: ["de", "en", "ur"],
      isPublic: true,
      isApproved: true,
      practiceAreas: {
        create: [
          { name: "Familienrecht", caseCount: 73 },
          { name: "Scheidungsrecht", caseCount: 61 },
        ],
      },
    },
  });

  // Demo client
  const client = await prisma.user.upsert({
    where: { email: "max.mustermann@example.de" },
    update: {},
    create: {
      email: "max.mustermann@example.de",
      passwordHash: password,
      role: UserRole.CLIENT,
    },
  });

  await prisma.clientProfile.upsert({
    where: { userId: client.id },
    update: {},
    create: {
      userId: client.id,
      name: "Max Mustermann",
      location: "Frankfurt, Deutschland",
      preferredArea: "Arbeitsrecht",
      language: "de",
    },
  });

  console.log("✅ Demo data seeded successfully");
  console.log("");
  console.log("Demo accounts (all use password: Demo1234!):");
  console.log("  Lawyer:  demo@lawlink.com");
  console.log("  Lawyer:  thomas.becker@lawlink-demo.de");
  console.log("  Lawyer:  sarah.khan@lawlink-demo.de");
  console.log("  Client:  max.mustermann@example.de");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Validates the DATABASE_URL connection string format
 * @returns true if valid, false otherwise
 */
function isValidDatabaseUrl(): boolean {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || typeof databaseUrl !== 'string' || databaseUrl.trim() === '') {
    return false;
  }

  // Check if it starts with postgresql://
  if (!databaseUrl.startsWith('postgresql://')) {
    return false;
  }

  // Parse the connection string to validate structure
  try {
    const url = new URL(databaseUrl);
    
    // Check if port is present and valid
    if (!url.port) {
      return false;
    }

    // Validate port is numeric
    const portNumber = parseInt(url.port, 10);
    if (isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
      return false;
    }

    // Check if database name is present
    const databaseName = url.pathname.slice(1); // Remove leading slash
    if (!databaseName) {
      return false;
    }

    // Check if host is present
    if (!url.hostname) {
      return false;
    }

    return true;
  } catch (error: any) {
    // URL parsing failed
    return false;
  }
}

// Check if database is available
export const isDatabaseAvailable = isValidDatabaseUrl();

// Only create PrismaClient if DATABASE_URL is valid
export const prisma: PrismaClient | null = isDatabaseAvailable
  ? (globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    }))
  : null;

if (isDatabaseAvailable && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma as PrismaClient;
}

// Log status in development
if (process.env.NODE_ENV === "development") {
  if (!isDatabaseAvailable) {
    console.log('\n⚠️  Database not configured - running in demo mode\n');
  } else {
    console.log('\n✅ Database connection available\n');
  }
}


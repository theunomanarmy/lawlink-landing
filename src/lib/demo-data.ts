import { readFileSync } from "fs";
import { join } from "path";

export type PracticeArea = {
  id: string;
  name: string;
  caseCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Document = {
  id: string;
  fileUrl: string;
  fileType: string;
  title: string;
  description: string | null;
  isPublic: boolean;
  uploadedAt: Date;
};

export type LawyerProfile = {
  id: string;
  userId: string;
  fullName: string;
  overview: string | null;
  location: string | null;
  practiceArea: string | null;
  profilePhotoUrl: string | null;
  yearsExperience: number | null;
  languages: string[];
  website: string | null;
  phone: string | null;
  isPublic: boolean;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  practiceAreas: PracticeArea[];
  documents: Document[];
};

type DemoLawyer = {
  id: string;
  name: string;
  specialty: string;
  years: number;
  location: string;
  languages: string[];
  verified: boolean;
  cases_anonymized: number;
  portfolio: Array<{
    title: string;
    summary: string;
    outcome: string;
    year: number;
  }>;
};

function loadDemoData(): LawyerProfile[] {
  try {
    const filePath = join(process.cwd(), "public", "demo-lawyers.json");
    const fileContent = readFileSync(filePath, "utf-8");
    const demoLawyers: DemoLawyer[] = JSON.parse(fileContent);

    return demoLawyers.map((lawyer) => {
      const practiceAreas: PracticeArea[] = [
        {
          id: `${lawyer.id}-practice-${lawyer.specialty.toLowerCase()}`,
          name: lawyer.specialty,
          caseCount: lawyer.cases_anonymized,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const documents: Document[] = lawyer.portfolio.map((item, index) => ({
        id: `${lawyer.id}-doc-${index}`,
        fileUrl: `#`,
        fileType: "OTHER",
        title: item.title,
        description: `${item.summary}\n\nOutcome: ${item.outcome}`,
        isPublic: true,
        uploadedAt: new Date(item.year, 0, 1),
      }));

      const overview = lawyer.portfolio
        .map((item) => `${item.title}: ${item.summary}`)
        .join("\n\n");

      return {
        id: lawyer.id,
        userId: `${lawyer.id}-user`,
        fullName: lawyer.name,
        overview,
        location: lawyer.location,
        practiceArea: lawyer.specialty,
        profilePhotoUrl: null,
        yearsExperience: lawyer.years,
        languages: lawyer.languages,
        website: null,
        phone: null,
        isPublic: true,
        isApproved: lawyer.verified,
        createdAt: new Date(),
        updatedAt: new Date(),
        practiceAreas,
        documents,
      };
    });
  } catch (error) {
    console.error("Failed to load demo data:", error);
    return [];
  }
}

let cachedData: LawyerProfile[] | null = null;

function getDemoData(): LawyerProfile[] {
  if (!cachedData) {
    cachedData = loadDemoData();
  }
  return cachedData;
}

function matchesSearch(lawyer: LawyerProfile, search: string): boolean {
  if (!search) return true;
  const lowerSearch = search.toLowerCase();
  return (
    lawyer.fullName.toLowerCase().includes(lowerSearch) ||
    (lawyer.overview?.toLowerCase().includes(lowerSearch) ?? false) ||
    (lawyer.practiceArea?.toLowerCase().includes(lowerSearch) ?? false)
  );
}

function matchesLocation(lawyer: LawyerProfile, location: string): boolean {
  if (!location) return true;
  return lawyer.location?.toLowerCase().includes(location.toLowerCase()) ?? false;
}

function matchesPracticeArea(lawyer: LawyerProfile, practiceArea: string): boolean {
  if (!practiceArea) return true;
  return lawyer.practiceArea?.toLowerCase().includes(practiceArea.toLowerCase()) ?? false;
}

export const demoData = {
  lawyerProfile: {
    async findMany(options?: {
      where?: {
        isPublic?: boolean;
        isApproved?: boolean;
        location?: { contains?: string; mode?: string };
        practiceArea?: { contains?: string; mode?: string };
        OR?: Array<{
          fullName?: { contains?: string; mode?: string };
          overview?: { contains?: string; mode?: string };
          practiceArea?: { contains?: string; mode?: string };
        }>;
      };
      include?: {
        practiceAreas?: boolean;
        documents?: { where?: { isPublic?: boolean } };
      };
      skip?: number;
      take?: number;
      orderBy?: { createdAt?: "asc" | "desc" };
    }): Promise<LawyerProfile[]> {
      let lawyers = getDemoData();
      if (options?.where) {
        const where = options.where;
        if (where.isPublic !== undefined) lawyers = lawyers.filter((l) => l.isPublic === where.isPublic);
        if (where.isApproved !== undefined) lawyers = lawyers.filter((l) => l.isApproved === where.isApproved);
        if (where.location?.contains) lawyers = lawyers.filter((l) => matchesLocation(l, where.location!.contains!));
        if (where.practiceArea?.contains) lawyers = lawyers.filter((l) => matchesPracticeArea(l, where.practiceArea!.contains!));
        if (where.OR) {
          lawyers = lawyers.filter((lawyer) =>
            where.OR!.some((or) => {
              if (or.fullName?.contains) return matchesSearch(lawyer, or.fullName.contains);
              if (or.overview?.contains) return matchesSearch(lawyer, or.overview.contains);
              if (or.practiceArea?.contains) return matchesSearch(lawyer, or.practiceArea.contains);
              return false;
            })
          );
        }
      }
      if (options?.include?.documents?.where?.isPublic !== undefined) {
        lawyers = lawyers.map((lawyer) => ({
          ...lawyer,
          documents: lawyer.documents.filter((d) => d.isPublic === options.include!.documents!.where!.isPublic),
        }));
      }
      if (options?.orderBy?.createdAt) {
        lawyers.sort((a, b) => options.orderBy!.createdAt === "desc" ? b.createdAt.getTime() - a.createdAt.getTime() : a.createdAt.getTime() - b.createdAt.getTime());
      }
      if (options?.skip) lawyers = lawyers.slice(options.skip);
      if (options?.take) lawyers = lawyers.slice(0, options.take);
      return lawyers;
    },

    async findUnique(options: {
      where: { id: string };
      include?: {
        practiceAreas?: boolean;
        documents?: { where?: { isPublic?: boolean }; orderBy?: { uploadedAt?: "asc" | "desc" } };
      };
    }): Promise<LawyerProfile | null> {
      const lawyers = getDemoData();
      let lawyer = lawyers.find((l) => l.id === options.where.id) || null;
      if (!lawyer) return null;
      lawyer = { ...lawyer };
      if (options.include?.documents) {
        let documents = [...lawyer.documents];
        if (options.include.documents.where?.isPublic !== undefined) {
          documents = documents.filter((d) => d.isPublic === options.include!.documents!.where!.isPublic);
        }
        if (options.include.documents.orderBy?.uploadedAt) {
          documents.sort((a, b) => options.include!.documents!.orderBy!.uploadedAt === "desc" ? b.uploadedAt.getTime() - a.uploadedAt.getTime() : a.uploadedAt.getTime() - b.uploadedAt.getTime());
        }
        lawyer.documents = documents;
      }
      return lawyer;
    },

    async count(options?: { where?: { isPublic?: boolean; isApproved?: boolean } }): Promise<number> {
      const lawyers = await this.findMany({ where: options?.where });
      return lawyers.length;
    },
  },
};

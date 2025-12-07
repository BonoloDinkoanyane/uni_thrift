import { db } from "@/lib/db";

export async function getUniversities() {
  return await db.university.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

export async function getCampuses(universityId: number) {
  return await db.campus.findMany({
    where: { universityId },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

import Register from "./RegisterForm";
import { getUniversities } from "../utils/uniSelector";
import { requireUser } from "../utils/hooks/hooks";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  // Require authentication
  const session = await requireUser();

  // Check if user has already completed onboarding
  const user = await db.user.findUnique({
    where: { userId: session.userId },
    select: { onboardingComplete: true }
  });

  // If onboarding is already complete, redirect to profile
  if (user?.onboardingComplete) {
    redirect("/profile");
  }

  const universities = await getUniversities();  // server-side fetch

  return (
    <Register universities={universities} />
  );
}
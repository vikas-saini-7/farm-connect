import { redirect } from "next/navigation";
import { getProfileBySession } from "@/lib/getProfileBySession";
import Header from "@/components/onboarding/Header";

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfileBySession();

  if (!profile) {
    redirect("/login");
  }

  if (profile.isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}

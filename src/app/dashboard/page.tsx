// "use client"; // ✅ Required to make this a Client Component

// import { useSession } from "next-auth/react";

// const Dashboard = () => {
//   const { data: session, status } = useSession();

//   if (status === "loading") return <div>Loading...</div>;
//   if (!session) return <div>You are not logged in.</div>;

//   return (
//     <div className="text-white p-4">
//       <h2 className="text-xl mb-2">Welcome!</h2>
//       <p>Your user ID is:</p>
//       <div className="bg-gray-800 p-2 mt-2 rounded text-green-400">
//         {session.user?.id}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }
  // useEffect(() => {
    console.log(session);
  // });

  return (
    <div className="text-white p-4 max-w-4xl mx-auto">
      dashboard
    </div>
  );
}
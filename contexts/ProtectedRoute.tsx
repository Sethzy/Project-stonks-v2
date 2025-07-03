"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

// The PUBLIC_ROUTES are now managed in middleware.ts.
// This component's primary role is to show a loading state
// during the initial auth check and prevent rendering children
// until the check is complete.

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  // The middleware now handles all redirects.
  // This component will just show a loading state until the user
  // state is confirmed, preventing a flash of un-styled/incorrect content.
  useEffect(() => {
    // This effect is useful for debugging auth state changes.
    // console.log(`Path: ${pathname}, Loading: ${isLoading}, User: ${!!user}`);
  }, [pathname, isLoading, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col space-y-4 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <div>Loading at lightspeed ⚡️</div>
      </div>
    );
  }

  // The middleware ensures that by the time we get here, the user's
  // access to the route is already validated. So, we can safely render the children.
  return <>{children}</>;
}

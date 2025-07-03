"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter, usePathname } from 'next/navigation';

// List of public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/", // Add landing page
  "/login",
  "/signup",
  "/verify-email",
  "/reset-password",
  "/update-password",
];

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Reset redirect flag when pathname changes
    setHasRedirected(false);
  }, [pathname]);

  useEffect(() => {
    // Only run redirect logic once per route and when auth is loaded
    if (
      !isLoading &&
      !user &&
      !PUBLIC_ROUTES.includes(pathname) &&
      !hasRedirected
    ) {
      setHasRedirected(true);

      // Use Next.js router instead of window.location for better UX
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirectUrl);
    }
  }, [user, isLoading, pathname, router, hasRedirected]);

  // Show loading state only if actually loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col space-y-4 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <div>Loading at lightspeed ⚡️</div>
      </div>
    );
  }

  // Only render children if we're on a public route or user is authenticated
  if (PUBLIC_ROUTES.includes(pathname) || user) {
    return <>{children}</>;
  }

  // Show loading while redirect is happening
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4 mx-auto"></div>
        <div>Redirecting to login...</div>
      </div>
    </div>
  );
}

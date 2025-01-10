"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/dashboard/dashboard_comp/search";
import { Sidebar } from "@/components/dashboard/dashboard_comp/sidebarDashboard";
import { RecruitmentTable } from "@/components/dashboard/dashboard_comp/dashboardTable";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push("/"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Optional: Add a loader while checking authentication
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Recruitments</h1>
            <div className="w-[400px]">
              <SearchBar />
            </div>
          </div>
          <Link href="/new_job">
            <Button>New recruitment</Button>
          </Link>
        </div>
        <RecruitmentTable />
      </main>
    </div>
  );
}

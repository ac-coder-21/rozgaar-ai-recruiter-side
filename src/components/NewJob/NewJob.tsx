"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/NewJob/NewJobComp/nav";
import { JobForm } from "@/components/NewJob/NewJobComp/job-form";
import Lottie from "react-lottie";
import animationData from "@/assets/lottie/recruitment.json";

export default function NewJobPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push("/"); // Redirect to the home page if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Optional: Add a loader while checking authentication
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <JobForm />
          <div className="w-full flex justify-center">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ProgressBar } from "./indiJobComp/ProgressBar"
import { StatsCards } from "./indiJobComp/StatsCard"
import { Timeline } from "./indiJobComp/TimeLine"

export const jobDetails = {
  company: "Google",
  role: "Software Engineer",
  hiringManager: "John Smith",
  recruiter: "Emily Wang",
  location: "Mountain View, CA",
  startDate: "Aug 1, 2023",
  endDate: "Nov 1, 2023",
  targetCandidates: 50,
  source: "LinkedIn",
  progress: 50,
  currentInterviews: 25,
  stats: [
    { label: "Total candidates", value: 80 },
    { label: "Total interviews", value: 30 },
    { label: "Total offers", value: 15 },
    { label: "Total hires", value: 8 },
  ],
  timeline: [
    { id: 1, title: "Job posted on LinkedIn", date: "Jun 1, 2023", icon: "post" },
    { id: 2, title: "Received 80 applications", date: "Jun 15, 2023", icon: "applications" },
    { id: 3, title: "Interviewed 30 candidates", date: "Jul 1, 2023", icon: "interviews" },
  ],
}

export default function JobDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/recruitments">Recruitments</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/companies/google">{jobDetails.company}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{jobDetails.role}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <h1 className="mb-8 text-3xl font-bold">
          {jobDetails.company} - {jobDetails.role}
        </h1>

        <div className="space-y-8">
          <section className="rounded-lg border bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold">Recruitment details</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="mt-1">{jobDetails.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hiring manager</p>
                <p className="mt-1">{jobDetails.hiringManager}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Recruiter</p>
                <p className="mt-1">{jobDetails.recruiter}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="mt-1">{jobDetails.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start date</p>
                <p className="mt-1">{jobDetails.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">End date</p>
                <p className="mt-1">{jobDetails.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Target candidates</p>
                <p className="mt-1">{jobDetails.targetCandidates}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Source</p>
                <p className="mt-1">{jobDetails.source}</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold">Recruitment progress</h2>
            <ProgressBar 
              progress={jobDetails.progress}
              total={jobDetails.targetCandidates}
              current={jobDetails.currentInterviews}
            />
          </section>

          <section className="rounded-lg border bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold">Recruitment insights</h2>
            <StatsCards stats={jobDetails.stats} />
          </section>

          <section className="rounded-lg border bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold">Recruitment notes</h2>
            <Timeline events={jobDetails.timeline} />
          </section>
        </div>
      </div>
    </div>
  )
}


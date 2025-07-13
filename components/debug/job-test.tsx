// components/debug/job-test.tsx
import { render, screen } from "@testing-library/react"
import Job from "../../components/job"
import type { Job as JobType } from "../../types"
import { it, expect } from "@jest/globals"

it("renders a job component", () => {
  const job: JobType = {
    id: "1",
    companyName: "Test Company",
    title: "Test Title",
    description: "Test Description",
    location: "Test Location",
    postedDate: "2023-10-26",
    salary: "$100,000",
    tags: ["test", "react"],
    companyLogo: "test.jpg",
  }

  render(<Job job={job} />)

  // Check if the job title is rendered
  const titleElement = screen.getByText("Test Title")
  expect(titleElement).toBeInTheDocument()

  // Check if the company name is rendered
  const companyElement = screen.getByText("Test Company")
  expect(companyElement).toBeInTheDocument()

  // Check if the location is rendered
  const locationElement = screen.getByText("Test Location")
  expect(locationElement).toBeInTheDocument()
})

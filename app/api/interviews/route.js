import { NextResponse } from "next/server";
// MOCK APPLICATIONS (simulated JOIN data)
// ---------------------------
const mockApplications = [
  { id: 1, company_name: "Google", position_title: "SWE Intern" },
  { id: 2, company_name: "Amazon", position_title: "Data Analyst Intern" },
];
// MOCK INTERVIEW DATA
// ---------------------------
let mockInterviews = [
  {
    id: 1,
    application_id: 1,
    date: "2025-06-01",
    location: "Virtual",
    completed: false,
  },
];

let nextId = 2;
// GET ALL INTERVIEWS (WITH JOIN)
// ---------------------------
export async function GET() {
  try {
    const joined = mockInterviews.map((i) => {
      const app = mockApplications.find((a) => a.id === i.application_id);

      return {
        ...i,
        application: app || null,
      };
    });

    return NextResponse.json(joined);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
// POST NEW INTERVIEW
// ---------------------------
export async function POST(request) {
  try {
    const body = await request.json();
    const { application_id, date, location } = body;

    // Required fields
    if (!application_id || !date || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate application exists
    const appExists = mockApplications.some((a) => a.id === application_id);
    if (!appExists) {
      return NextResponse.json(
        { error: "Application does not exist" },
        { status: 400 }
      );
    }

    // Validate future date
    const interviewDate = new Date(date);
    if (interviewDate < new Date()) {
      return NextResponse.json(
        { error: "Interview date must be in the future" },
        { status: 400 }
      );
    }

    const newInterview = {
      id: nextId++,
      application_id,
      date,
      location,
      completed: false,
    };

    mockInterviews.push(newInterview);

    return NextResponse.json(newInterview, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}//DELETE
export async function DELETE(request, { params }) {
  const id = Number(params.id);

  let interview = mockInterviews.find(i => i.id === id);
  if (!interview) {
    return NextResponse.json(
      { error: "Interview not found" },
      { status: 404 }
    );
  }

  mockInterviews = mockInterviews.filter(i => i.id !== id);

  return NextResponse.json({ message: "Interview deleted" });
}

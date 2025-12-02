import { NextResponse } from "next/server";

const mockApplications = [
  { id: 1, company_name: "Google", position_title: "SWE Intern" },
  { id: 2, company_name: "Amazon", position_title: "Data Analyst Intern" },
];

let mockInterviews = [
  {
    id: 1,
    application_id: 1,
    date: "2025-06-01",
    location: "Virtual",
    completed: false,
  },
];

// GET /api/interviews/:id
export async function GET(request, { params }) {
  const id = Number(params.id);

  const interview = mockInterviews.find(i => i.id === id);
  if (!interview) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  const app = mockApplications.find(a => a.id === interview.application_id);

  return NextResponse.json({ ...interview, application: app || null });
}

// PUT /api/interviews/:id
export async function PUT(request, { params }) {
  const id = Number(params.id);
  const body = await request.json();

  let interview = mockInterviews.find(i => i.id === id);
  if (!interview) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  interview = { ...interview, ...body };

  mockInterviews = mockInterviews.map(i => (i.id === id ? interview : i));

  return NextResponse.json({ message: "Interview updated", interview });
}

// PATCH /api/interviews/:id
export async function PATCH(request, { params }) {
  const id = Number(params.id);

  let interview = mockInterviews.find(i => i.id === id);
  if (!interview) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  interview.completed = true;

  mockInterviews = mockInterviews.map(i => (i.id === id ? interview : i));

  return NextResponse.json({ message: "Interview marked as completed", interview });
}

// DELETE /api/interviews/:id
export async function DELETE(request, { params }) {
  const id = Number(params.id);

  let exists = mockInterviews.some(i => i.id === id);
  if (!exists) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  mockInterviews = mockInterviews.filter(i => i.id !== id);

  return NextResponse.json({ message: "Interview deleted" });
}

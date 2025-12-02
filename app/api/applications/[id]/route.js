import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const params = await context.params;
    const id = params.id;
    const [rows] = await pool.query(
      "SELECT * FROM Applications WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }

}

export async function PUT(request, { params }) {
  try {
    const params = await context.params;
    const id = params.id;
    const body = await request.json();

    const {
      company_name,
      position_title,
      application_date,
      status,
      location,
      salary_range,
      notes,
    } = body;

    if (!company_name || !position_title || !status) {
      return NextResponse.json(
        { error: "company_name, position_title, and status are required" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `
        UPDATE Applications
        SET company_name=?, position_title=?, application_date=?, status=?, location=?, salary_range=?, notes=?
        WHERE id = ?
      `,
      [
        company_name,
        position_title,
        application_date,
        status,
        location,
        salary_range,
        notes,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Application updated successfully" });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;

    return NextResponse.json({
      message: `Mock delete successful for application ${id}`
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}



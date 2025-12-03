//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Applications API - Individual application operations

import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// GET single application
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const [rows] = await pool.query(
      'SELECT * FROM Applications WHERE application_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}

// UPDATE application
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const [result] = await pool.query(
      `UPDATE Applications 
       SET company_name = ?, 
           position_title = ?, 
           application_status = ?,
           location = ?,
           salary_range = ?,
           job_url = ?,
           notes = ?
       WHERE application_id = ?`,
      [
        body.company_name,
        body.position_title,
        body.application_status,
        body.location,
        body.salary_range,
        body.job_url,
        body.notes,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Application updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE application
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const [result] = await pool.query(
      'DELETE FROM Applications WHERE application_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
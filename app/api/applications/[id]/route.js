//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Single Application API - GET, PUT, DELETE by ID

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET single application by ID
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

// PUT update application by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      company_name,
      position_title,
      job_description,
      location,
      salary_range,
      application_status,
      application_date,
      job_url,
      notes
    } = body;
    
    const [result] = await pool.query(
      `UPDATE Applications SET 
       company_name = ?, 
       position_title = ?, 
       job_description = ?,
       location = ?,
       salary_range = ?,
       application_status = ?,
       application_date = ?,
       job_url = ?,
       notes = ?
       WHERE application_id = ?`,
      [
        company_name,
        position_title,
        job_description,
        location,
        salary_range,
        application_status,
        application_date,
        job_url,
        notes,
        id
      ]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Application updated successfully' 
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE application by ID
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
    
    return NextResponse.json({ 
      message: 'Application deleted successfully' 
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
//*** Sid
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Single Interview API - GET, PUT, DELETE by ID

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET single interview by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const [rows] = await pool.query(
      `SELECT 
        i.*,
        a.company_name,
        a.position_title
       FROM Interviews i
       JOIN Applications a ON i.application_id = a.application_id
       WHERE i.interview_id = ?`,
      [id]
    );
    
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview' },
      { status: 500 }
    );
  }
}

// PUT update interview by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      interview_type,
      interview_date,
      location,
      interviewer_name,
      interviewer_email,
      notes,
      outcome
    } = body;
    
    const [result] = await pool.query(
      `UPDATE Interviews SET 
       interview_type = ?,
       interview_date = ?,
       location = ?,
       interviewer_name = ?,
       interviewer_email = ?,
       notes = ?,
       outcome = ?
       WHERE interview_id = ?`,
      [
        interview_type,
        interview_date,
        location,
        interviewer_name,
        interviewer_email,
        notes,
        outcome,
        id
      ]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Interview updated successfully' 
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update interview' },
      { status: 500 }
    );
  }
}

// DELETE interview by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const [result] = await pool.query(
      'DELETE FROM Interviews WHERE interview_id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Interview deleted successfully' 
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete interview' },
      { status: 500 }
    );
  }
}
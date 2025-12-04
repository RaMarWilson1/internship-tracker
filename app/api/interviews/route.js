//*** Sid
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Interviews API Route - GET all and POST new interview

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all interviews with application details
export async function GET(request) {
  try {
    const [rows] = await pool.query(
      `SELECT 
        i.*,
        a.company_name,
        a.position_title
       FROM Interviews i
       JOIN Applications a ON i.application_id = a.application_id
       ORDER BY i.interview_date DESC`
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interviews', details: error.message },
      { status: 500 }
    );
  }
}

// POST new interview
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      application_id,
      interview_type,
      interview_date,
      location,
      interviewer_name,
      interviewer_email,
      notes,
      outcome
    } = body;
    
    // Validate required fields
    if (!application_id || !interview_type || !interview_date) {
      return NextResponse.json(
        { error: 'Missing required fields: application_id, interview_type, interview_date' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      `INSERT INTO Interviews 
       (application_id, interview_type, interview_date, location, 
        interviewer_name, interviewer_email, notes, outcome) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        application_id,
        interview_type,
        interview_date,
        location || null,
        interviewer_name || null,
        interviewer_email || null,
        notes || null,
        outcome || 'Pending'
      ]
    );
    
    return NextResponse.json({
      message: 'Interview added successfully',
      interview_id: result.insertId
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add interview', details: error.message },
      { status: 500 }
    );
  }
}
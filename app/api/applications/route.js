//*** RaMar Wilson
//*** Database Systems - Final Project
//*** November 4, 2024
//*** Applications API Route - Handles GET and POST for applications

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all applications
export async function GET(request) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM Applications ORDER BY application_date DESC'
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST new application
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      company_name, 
      position_title, 
      application_date, 
      status,
      location,
      salary_range,
      job_url,
      notes 
    } = body;
    
    // Validate required fields
    if (!company_name || !position_title || !application_date) {
      return NextResponse.json(
        { error: 'Missing required fields: company_name, position_title, application_date' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      `INSERT INTO Applications 
       (user_id, company_name, position_title, application_date, status, location, salary_range, job_url, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [1, company_name, position_title, application_date, status || 'Applied', location, salary_range, job_url, notes]
    );
    
    return NextResponse.json({
      message: 'Application added successfully',
      id: result.insertId
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    
    // Handle duplicate entry error
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'You have already applied to this position at this company' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to add application' },
      { status: 500 }
    );
  }
}
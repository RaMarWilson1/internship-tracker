//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Applications API Route - GET all and POST new application

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all applications
export async function GET(request) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Applications 
       ORDER BY application_date DESC`
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications', details: error.message },
      { status: 500 }
    );
  }
}

// POST new application
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      user_id,
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
    
    // Validate required fields
    if (!user_id || !company_name || !position_title || !application_date) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id, company_name, position_title, application_date' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      `INSERT INTO Applications 
       (user_id, company_name, position_title, job_description, location, salary_range, 
        application_status, application_date, job_url, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        company_name, 
        position_title, 
        job_description || null,
        location || null,
        salary_range || null,
        application_status || 'Applied',
        application_date,
        job_url || null,
        notes || null
      ]
    );
    
    return NextResponse.json({
      message: 'Application added successfully',
      application_id: result.insertId
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add application', details: error.message },
      { status: 500 }
    );
  }
}
//*** Sid
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Reminders API Route - GET all and POST new reminder

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all reminders with application details
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter'); // 'overdue', 'upcoming', 'completed'
    
    let query = `
      SELECT 
        r.*,
        a.company_name,
        a.position_title
       FROM Reminders r
       JOIN Applications a ON r.application_id = a.application_id
    `;
    
    // Add filters based on query parameter
    if (filter === 'overdue') {
      query += ` WHERE r.reminder_date < NOW() AND r.is_completed = FALSE`;
    } else if (filter === 'upcoming') {
      query += ` WHERE r.reminder_date >= NOW() AND r.is_completed = FALSE`;
    } else if (filter === 'completed') {
      query += ` WHERE r.is_completed = TRUE`;
    }
    
    query += ` ORDER BY r.reminder_date ASC`;
    
    const [rows] = await pool.query(query);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reminders', details: error.message },
      { status: 500 }
    );
  }
}

// POST new reminder
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      application_id,
      reminder_date,
      reminder_type,
      description
    } = body;
    
    // Validate required fields
    if (!application_id || !reminder_date || !reminder_type || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: application_id, reminder_date, reminder_type, description' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      `INSERT INTO Reminders 
       (application_id, reminder_date, reminder_type, description, is_completed) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        application_id,
        reminder_date,
        reminder_type,
        description,
        false
      ]
    );
    
    return NextResponse.json({
      message: 'Reminder added successfully',
      reminder_id: result.insertId
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add reminder', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH to mark reminder as completed
export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Reminder ID is required' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      'UPDATE Reminders SET is_completed = TRUE WHERE reminder_id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Reminder not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Reminder marked as completed' 
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update reminder' },
      { status: 500 }
    );
  }
}

// DELETE reminder by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Reminder ID is required' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      'DELETE FROM Reminders WHERE reminder_id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Reminder not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Reminder deleted successfully' 
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete reminder' },
      { status: 500 }
    );
  }
}
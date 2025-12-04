//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Applications API - Individual application operations (GET, PUT, DELETE)

import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// GET single application
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
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

// UPDATE application (handles both full updates and partial updates)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Build dynamic UPDATE query based on provided fields
    const updates = [];
    const values = [];

    if (body.company_name !== undefined) {
      updates.push('company_name = ?');
      values.push(body.company_name);
    }
    if (body.position_title !== undefined) {
      updates.push('position_title = ?');
      values.push(body.position_title);
    }
    if (body.application_status !== undefined) {
      updates.push('application_status = ?');
      values.push(body.application_status);
    }
    if (body.application_date !== undefined) {
      updates.push('application_date = ?');
      values.push(body.application_date);
    }
    if (body.location !== undefined) {
      updates.push('location = ?');
      values.push(body.location);
    }
    if (body.salary_range !== undefined) {
      updates.push('salary_range = ?');
      values.push(body.salary_range);
    }
    if (body.job_description !== undefined) {
      updates.push('job_description = ?');
      values.push(body.job_description);
    }
    if (body.job_url !== undefined) {
      updates.push('job_url = ?');
      values.push(body.job_url);
    }
    if (body.notes !== undefined) {
      updates.push('notes = ?');
      values.push(body.notes);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Add updated_at timestamp
    updates.push('updated_at = NOW()');
    
    // Add id to the end
    values.push(id);

    const query = `UPDATE Applications SET ${updates.join(', ')} WHERE application_id = ?`;
    
    console.log('Update query:', query);
    console.log('Update values:', values);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Application updated successfully',
      id 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update application: ' + error.message },
      { status: 500 }
    );
  }
}

// PATCH - for simple status updates only
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.application_status) {
      return NextResponse.json(
        { error: 'application_status is required' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      'UPDATE Applications SET application_status = ?, updated_at = NOW() WHERE application_id = ?',
      [body.application_status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Status updated successfully',
      id 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update status: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE application
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    console.log('Deleting application with ID:', id);

    const [result] = await pool.query(
      'DELETE FROM Applications WHERE application_id = ?',
      [id]
    );

    console.log('Delete result:', result);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Application deleted successfully',
      id 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete application: ' + error.message },
      { status: 500 }
    );
  }
}
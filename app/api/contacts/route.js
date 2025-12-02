
//*** Sid
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Contacts API Route - GET all and POST new contact

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all contacts with application details
export async function GET(request) {
  try {
    const [rows] = await pool.query(
      `SELECT 
        c.*,
        a.company_name,
        a.position_title
       FROM Contacts c
       JOIN Applications a ON c.application_id = a.application_id
       ORDER BY c.created_at DESC`
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts', details: error.message },
      { status: 500 }
    );
  }
}

// POST new contact
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      application_id,
      contact_name,
      contact_title,
      contact_email,
      contact_phone,
      linkedin_url,
      notes
    } = body;
    
    // Validate required fields
    if (!application_id || !contact_name) {
      return NextResponse.json(
        { error: 'Missing required fields: application_id, contact_name' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      `INSERT INTO Contacts 
       (application_id, contact_name, contact_title, contact_email, 
        contact_phone, linkedin_url, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        application_id,
        contact_name,
        contact_title || null,
        contact_email || null,
        contact_phone || null,
        linkedin_url || null,
        notes || null
      ]
    );
    
    return NextResponse.json({
      message: 'Contact added successfully',
      contact_id: result.insertId
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add contact', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE contact by ID (query parameter)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }
    
    const [result] = await pool.query(
      'DELETE FROM Contacts WHERE contact_id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Contact deleted successfully' 
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
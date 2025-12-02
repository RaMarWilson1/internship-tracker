//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Gmail email parsing endpoint - scans for application confirmations

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/email/callback'
);

export async function POST(request) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    // Set credentials
    oauth2Client.setCredentials({
      access_token: accessToken
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Search for job application related emails
    const query = 'subject:(application OR applied OR "thank you for applying") after:2024/10/01';
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 20
    });

    if (!response.data.messages || response.data.messages.length === 0) {
      return NextResponse.json({
        message: 'No application emails found',
        applications: []
      });
    }

    // Fetch full details for each message
    const applications = [];
    
    for (const message of response.data.messages.slice(0, 10)) { // Limit to 10 for performance
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full'
      });

      // Extract email details
      const headers = msg.data.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || '';
      const from = headers.find(h => h.name === 'From')?.value || '';
      const date = headers.find(h => h.name === 'Date')?.value || '';

      // Get email body
      let body = '';
      if (msg.data.payload.body.data) {
        body = Buffer.from(msg.data.payload.body.data, 'base64').toString();
      } else if (msg.data.payload.parts) {
        const textPart = msg.data.payload.parts.find(part => part.mimeType === 'text/plain');
        if (textPart && textPart.body.data) {
          body = Buffer.from(textPart.body.data, 'base64').toString();
        }
      }

      // Parse company name from email address
      let companyName = '';
      const emailMatch = from.match(/@([^>]+)/);
      if (emailMatch) {
        companyName = emailMatch[1].split('.')[0];
        // Capitalize first letter
        companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
      }

      // Try to extract position from subject
      let position = '';
      const positionPatterns = [
        /position[:\s]+([^\n]+)/i,
        /role[:\s]+([^\n]+)/i,
        /applying for[:\s]+([^\n]+)/i,
        /application for[:\s]+([^\n]+)/i
      ];
      
      for (const pattern of positionPatterns) {
        const match = subject.match(pattern) || body.match(pattern);
        if (match) {
          position = match[1].trim().split(/[,\n]/)[0];
          break;
        }
      }

      // Parse date
      const applicationDate = new Date(date).toISOString().split('T')[0];

      // Only add if we found company and position
      if (companyName && (position || subject)) {
        applications.push({
          emailId: message.id,
          companyName: companyName,
          positionTitle: position || subject.substring(0, 100),
          applicationDate: applicationDate,
          source: 'Email',
          notes: `Imported from email: ${from}`,
          emailSubject: subject,
          status: 'Applied'
        });
      }
    }

    return NextResponse.json({
      message: `Found ${applications.length} potential applications`,
      applications
    });

  } catch (error) {
    console.error('Email parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to parse emails', details: error.message },
      { status: 500 }
    );
  }
}
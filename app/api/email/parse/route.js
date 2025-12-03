//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Gmail Email Parser - Extracts application data from emails

import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    // Get token from cookie (set by callback)
    const cookieStore = cookies();
    const accessToken = cookieStore.get('gmail_token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated. Please connect Gmail first.' },
        { status: 401 }
      );
    }

    // Set up OAuth2 client with the token
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: accessToken
    });

    // Initialize Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Search for application-related emails
    const query = 'subject:(application OR applied OR "thank you for applying") newer_than:6m';
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 20
    });

    const messages = response.data.messages || [];

    if (messages.length === 0) {
      return NextResponse.json({
        applications: [],
        message: 'No application emails found in the last 6 months'
      });
    }

    // Fetch and parse each message
    const applications = [];
    
    for (const message of messages.slice(0, 10)) { // Limit to 10 for performance
      try {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        });

        const headers = msg.data.payload.headers;
        const subject = headers.find(h => h.name === 'Subject')?.value || '';
        const from = headers.find(h => h.name === 'From')?.value || '';
        const date = headers.find(h => h.name === 'Date')?.value || '';

        // Extract body
        let body = '';
        if (msg.data.payload.body.data) {
          body = Buffer.from(msg.data.payload.body.data, 'base64').toString('utf-8');
        } else if (msg.data.payload.parts) {
          const textPart = msg.data.payload.parts.find(part => part.mimeType === 'text/plain');
          if (textPart && textPart.body.data) {
            body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
          }
        }

        // Parse application data from email
        const parsed = parseApplicationEmail(subject, body, from, date);
        
        if (parsed) {
          applications.push(parsed);
        }
      } catch (err) {
        console.error('Error parsing message:', err);
        // Continue with next message
      }
    }

    return NextResponse.json({
      applications,
      count: applications.length
    });

  } catch (error) {
    console.error('Gmail parse error:', error);
    
    // Handle specific error cases
    if (error.code === 401) {
      return NextResponse.json(
        { error: 'Gmail authentication expired. Please reconnect.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to parse emails: ' + error.message },
      { status: 500 }
    );
  }
}

// Helper function to parse application data from email
function parseApplicationEmail(subject, body, from, dateString) {
  try {
    // Extract company name from sender or subject
    let companyName = '';
    
    // Try to extract from sender email
    const fromMatch = from.match(/[@\s]([A-Za-z0-9]+)\.[com|org|net]/i);
    if (fromMatch) {
      companyName = fromMatch[1].charAt(0).toUpperCase() + fromMatch[1].slice(1);
    }
    
    // Or from subject line
    if (!companyName) {
      const subjectMatch = subject.match(/(?:from|at|with|@)\s+([A-Z][A-Za-z\s]+?)(?:\s+[-–—]|\s+for|\s+application|$)/);
      if (subjectMatch) {
        companyName = subjectMatch[1].trim();
      }
    }

    // Fallback to a generic extraction
    if (!companyName) {
      companyName = from.split('@')[0].split('<')[0].trim() || 'Unknown Company';
    }

    // Extract position title from subject or body
    let positionTitle = 'Position Not Specified';
    
    // Common patterns in subject lines
    const titlePatterns = [
      /(?:for|as|position:|role:)\s+([A-Z][A-Za-z\s]+?)(?:\s+at|\s+application|\s+[-–—]|$)/i,
      /([A-Z][A-Za-z\s]+?)\s+(?:position|role|internship|job)/i,
      /(Software Engineer|Data Scientist|Product Manager|Developer|Analyst|Intern)/i
    ];

    for (const pattern of titlePatterns) {
      const match = subject.match(pattern);
      if (match) {
        positionTitle = match[1].trim();
        break;
      }
    }

    // Parse date
    const applicationDate = new Date(dateString).toISOString().split('T')[0];

    // Determine status
    let status = 'Applied';
    const lowerSubject = subject.toLowerCase();
    const lowerBody = body.toLowerCase();
    
    if (lowerSubject.includes('interview') || lowerBody.includes('interview')) {
      status = 'Interview';
    } else if (lowerSubject.includes('offer') || lowerBody.includes('offer')) {
      status = 'Offer';
    } else if (lowerSubject.includes('reject') || lowerBody.includes('unfortunately')) {
      status = 'Rejected';
    }

    return {
      companyName,
      positionTitle,
      applicationDate,
      status,
      notes: `Imported from email: ${subject.substring(0, 100)}`
    };
  } catch (error) {
    console.error('Error in parseApplicationEmail:', error);
    return null;
  }
}
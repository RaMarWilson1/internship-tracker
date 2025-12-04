//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Gmail Email Parser - Extracts application data from emails

import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('gmail_token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated. Please connect Gmail first.' },
        { status: 401 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: accessToken
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Broader search query to catch more applications
    const query = 'subject:(application OR applied OR "thank you for applying" OR "application received" OR "application submitted" OR position OR job OR internship OR career OR hiring) newer_than:12m';
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 50 // Increased from 20
    });

    const messages = response.data.messages || [];

    if (messages.length === 0) {
      return NextResponse.json({
        applications: [],
        message: 'No application emails found in the last 12 months'
      });
    }

    const applications = [];
    
    // Process more emails - increased from 10 to 30
    for (const message of messages.slice(0, 30)) {
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

        // Extract body with better handling
        let body = '';
        if (msg.data.payload.body?.data) {
          body = Buffer.from(msg.data.payload.body.data, 'base64').toString('utf-8');
        } else if (msg.data.payload.parts) {
          for (const part of msg.data.payload.parts) {
            if (part.mimeType === 'text/plain' && part.body?.data) {
              body += Buffer.from(part.body.data, 'base64').toString('utf-8');
            } else if (part.parts) {
              // Handle nested parts
              for (const subpart of part.parts) {
                if (subpart.mimeType === 'text/plain' && subpart.body?.data) {
                  body += Buffer.from(subpart.body.data, 'base64').toString('utf-8');
                }
              }
            }
          }
        }

        const parsed = parseApplicationEmail(subject, body, from, date);
        
        if (parsed) {
          applications.push(parsed);
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    }

    return NextResponse.json({
      applications,
      count: applications.length
    });

  } catch (error) {
    console.error('Gmail parse error:', error);
    
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

function parseApplicationEmail(subject, body, from, dateString) {
  try {
    let companyName = '';
    
    // Enhanced company extraction
    // 1. Try common email patterns
    const emailDomainMatch = from.match(/@([a-z0-9-]+)\.(com|org|io|net)/i);
    if (emailDomainMatch) {
      const domain = emailDomainMatch[1];
      // Capitalize and clean up
      companyName = domain
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // 2. Look for company name in subject
    const subjectCompanyPatterns = [
      /(?:at|@|from)\s+([A-Z][A-Za-z0-9\s&.]+?)(?:\s+[-–—]|\s+for|\s+application|\s+team|$)/,
      /([A-Z][A-Za-z0-9\s&.]+?)\s+(?:application|team|careers|hiring|jobs)/i,
      /Thank you for (?:your )?(?:application|applying) (?:to|at) ([A-Z][A-Za-z0-9\s&.]+)/i
    ];
    
    for (const pattern of subjectCompanyPatterns) {
      const match = subject.match(pattern);
      if (match && match[1].length > 2) {
        companyName = match[1].trim();
        break;
      }
    }

    // 3. Look in email body
    if (!companyName || companyName.length < 3) {
      const bodyCompanyPatterns = [
        /(?:team at|working at|join|careers at)\s+([A-Z][A-Za-z0-9\s&.]+)/,
        /([A-Z][A-Za-z0-9\s&.]+?)\s+(?:is excited|is pleased|team)/
      ];
      
      for (const pattern of bodyCompanyPatterns) {
        const match = body.match(pattern);
        if (match && match[1].length > 2) {
          companyName = match[1].trim();
          break;
        }
      }
    }

    // Clean up company name
    if (companyName) {
      companyName = companyName
        .replace(/\s+(inc|llc|ltd|corporation|corp)\.?$/i, '')
        .trim();
    } else {
      companyName = 'Unknown Company';
    }

    // Enhanced position extraction
    let positionTitle = 'Position Not Specified';
    
    const titlePatterns = [
      /(?:for the|for our|for a)\s+([A-Z][A-Za-z\s-]+?)\s+(?:position|role|opening)/i,
      /(?:position:|role:|as a|as an)\s+([A-Z][A-Za-z\s-]+?)(?:\s+at|\s+application|\s+[-–—]|$)/i,
      /([A-Z][A-Za-z\s-]+?)\s+(?:Internship|Intern\b)/i,
      /(Software Engineer|Data Scientist|Product Manager|Full Stack Developer|Frontend Developer|Backend Developer|DevOps Engineer|Data Analyst|Business Analyst|Marketing|Sales)/i
    ];

    for (const pattern of titlePatterns) {
      const match = subject.match(pattern) || body.match(pattern);
      if (match && match[1]) {
        positionTitle = match[1].trim();
        break;
      }
    }

    // Parse date
    const applicationDate = new Date(dateString).toISOString().split('T')[0];

    // Determine status with better detection
    let status = 'Applied';
    const lowerText = (subject + ' ' + body).toLowerCase();
    
    if (lowerText.includes('offer') || lowerText.includes('congratulations')) {
      status = 'Offer';
    } else if (lowerText.includes('interview') || lowerText.includes('schedule a call')) {
      status = 'Interview';
    } else if (lowerText.includes('reject') || lowerText.includes('unfortunately') || lowerText.includes('not moving forward')) {
      status = 'Rejected';
    }

    // Extract location if possible
    let location = '';
    const locationMatch = body.match(/(?:location|based in|office in)\s*:?\s*([A-Z][a-z]+(?:,?\s+[A-Z]{2})?)/);
    if (locationMatch) {
      location = locationMatch[1];
    }

    return {
      companyName: companyName.substring(0, 100),
      positionTitle: positionTitle.substring(0, 100),
      applicationDate,
      status,
      location,
      notes: `Imported from email: "${subject.substring(0, 80)}"`
    };
  } catch (error) {
    console.error('Error in parseApplicationEmail:', error);
    return null;
  }
}
//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Gmail OAuth connection endpoint

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/email/callback'
);

// Scopes for Gmail API - read-only access
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly'
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'connect') {
      // Generate auth URL
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
      });

      return NextResponse.json({ 
        authUrl 
      });
    }

    if (action === 'callback') {
      // Handle OAuth callback
      const code = searchParams.get('code');
      
      if (!code) {
        return NextResponse.json(
          { error: 'No authorization code provided' },
          { status: 400 }
        );
      }

      // Exchange code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Store tokens in session or database
      // For now, return them to client (in production, store securely)
      return NextResponse.json({
        message: 'Connected successfully',
        tokens: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date: tokens.expiry_date
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid action parameter' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Gmail OAuth error:', error);
    return NextResponse.json(
      { error: 'Failed to connect Gmail', details: error.message },
      { status: 500 }
    );
  }
}
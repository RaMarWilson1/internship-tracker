//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Gmail OAuth Callback Handler

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // If user denied access
    if (error) {
      return NextResponse.redirect(
        new URL('/email?error=access_denied', request.url)
      );
    }

    // If no code, something went wrong
    if (!code) {
      return NextResponse.redirect(
        new URL('/email?error=no_code', request.url)
      );
    }

    // Exchange code for tokens
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    
    // In a production app, you'd store these tokens in a database
    // For now, we'll redirect back with a success message
    // and the token will be used in the session

    // Create response with redirect
    const response = NextResponse.redirect(
      new URL('/email?connected=true', request.url)
    );

    // Store access token in cookie for the session
    response.cookies.set('gmail_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 // 1 hour
    });

    return response;

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/email?error=auth_failed', request.url)
    );
  }
}
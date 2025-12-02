//*** Sid
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Analytics API Route - Complex SQL queries for dashboard statistics

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') || 1; // Default to user 1 for now
    
    // Query 1: Total applications count
    const [totalApps] = await pool.query(
      'SELECT COUNT(*) as total FROM Applications WHERE user_id = ?',
      [userId]
    );
    
    // Query 2: Applications by status (GROUP BY)
    const [appsByStatus] = await pool.query(
      `SELECT application_status, COUNT(*) as count 
       FROM Applications 
       WHERE user_id = ?
       GROUP BY application_status`,
      [userId]
    );
    
    // Query 3: Success rate calculation
    const [successRate] = await pool.query(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN application_status IN ('Offer', 'Accepted') THEN 1 ELSE 0 END) as offers,
        ROUND(
          (SUM(CASE WHEN application_status IN ('Offer', 'Accepted') THEN 1 ELSE 0 END) / COUNT(*)) * 100, 
          2
        ) as success_percentage
       FROM Applications 
       WHERE user_id = ?`,
      [userId]
    );
    
    // Query 4: Upcoming interviews count
    const [upcomingInterviews] = await pool.query(
      `SELECT COUNT(*) as upcoming
       FROM Interviews i
       JOIN Applications a ON i.application_id = a.application_id
       WHERE a.user_id = ? 
       AND i.interview_date >= NOW()
       AND i.outcome = 'Pending'`,
      [userId]
    );
    
    // Query 5: Applications by month (trend data)
    const [appsByMonth] = await pool.query(
      `SELECT 
        DATE_FORMAT(application_date, '%Y-%m') as month,
        COUNT(*) as count
       FROM Applications
       WHERE user_id = ?
       GROUP BY DATE_FORMAT(application_date, '%Y-%m')
       ORDER BY month DESC
       LIMIT 6`,
      [userId]
    );
    
    // Query 6: Top companies applied to
    const [topCompanies] = await pool.query(
      `SELECT company_name, COUNT(*) as application_count
       FROM Applications
       WHERE user_id = ?
       GROUP BY company_name
       ORDER BY application_count DESC
       LIMIT 10`,
      [userId]
    );
    
    // Query 7: Interview conversion rate
    const [interviewConversion] = await pool.query(
      `SELECT 
        COUNT(DISTINCT a.application_id) as total_apps,
        COUNT(DISTINCT i.application_id) as apps_with_interviews,
        ROUND(
          (COUNT(DISTINCT i.application_id) / COUNT(DISTINCT a.application_id)) * 100,
          2
        ) as interview_rate
       FROM Applications a
       LEFT JOIN Interviews i ON a.application_id = i.application_id
       WHERE a.user_id = ?`,
      [userId]
    );
    
    // Query 8: Average response time (days from application to first interview)
    const [avgResponseTime] = await pool.query(
      `SELECT 
        ROUND(AVG(DATEDIFF(i.interview_date, a.application_date)), 1) as avg_days
       FROM Applications a
       JOIN Interviews i ON a.application_id = i.application_id
       WHERE a.user_id = ?
       AND i.interview_date >= a.application_date`,
      [userId]
    );
    
    // Combine all analytics data
    const analytics = {
      totalApplications: totalApps[0].total,
      applicationsByStatus: appsByStatus,
      successRate: successRate[0],
      upcomingInterviews: upcomingInterviews[0].upcoming,
      applicationsByMonth: appsByMonth,
      topCompanies: topCompanies,
      interviewConversion: interviewConversion[0],
      avgResponseTime: avgResponseTime[0].avg_days || 0
    };
    
    return NextResponse.json(analytics);
    
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics', details: error.message },
      { status: 500 }
    );
  }
}
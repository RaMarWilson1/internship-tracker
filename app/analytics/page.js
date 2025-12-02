//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Analytics Page - Dashboard with statistics and insights

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/analytics?user_id=1');
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      setError('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Applied': '#3B82F6',
      'Interview': '#8B5CF6',
      'Offer': '#10B981',
      'Accepted': '#059669',
      'Rejected': '#EF4444',
      'Withdrawn': '#6B7280'
    };
    return colors[status] || '#6B7280';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Insights into your application process</p>
            </div>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            ✗ {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        ) : analytics ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Applications</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalApplications}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Success Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {analytics.successRate.success_percentage || 0}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {analytics.successRate.offers} offers
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Interview Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {analytics.interviewConversion.interview_rate || 0}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {analytics.interviewConversion.apps_with_interviews} of {analytics.interviewConversion.total_apps}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Avg Response Time</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {analytics.avgResponseTime || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">days</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Applications by Status</h2>
                <div className="space-y-4">
                  {analytics.applicationsByStatus.map(item => (
                    <div key={item.application_status}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">{item.application_status}</span>
                        <span className="text-gray-900 font-bold">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${(item.count / analytics.totalApplications) * 100}%`,
                            backgroundColor: getStatusColor(item.application_status)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Top Companies</h2>
                <div className="space-y-3">
                  {analytics.topCompanies.slice(0, 5).map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="font-medium text-gray-900">{company.company_name}</span>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {company.application_count} {company.application_count === 1 ? 'app' : 'apps'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Application Trends (Last 6 Months)</h2>
              <div className="space-y-3">
                {analytics.applicationsByMonth.reverse().map(item => (
                  <div key={item.month} className="flex items-center">
                    <div className="w-24 text-sm text-gray-600 font-medium">{item.month}</div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div
                          className="bg-blue-500 h-8 rounded-r transition-all flex items-center justify-end pr-3"
                          style={{ width: `${(item.count / Math.max(...analytics.applicationsByMonth.map(m => m.count))) * 100}%` }}
                        >
                          <span className="text-white font-medium text-sm">{item.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No analytics data available</p>
          </div>
        )}
      </main>
    </div>
  );
}
//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Email Import Page - Gmail integration for auto-importing applications

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EmailPage() {
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [parsedApps, setParsedApps] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check if we just connected via OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('connected') === 'true') {
      setConnected(true);
      setSuccessMessage('Gmail connected successfully!');
      // Clean up URL
      window.history.replaceState({}, '', '/email');
    }
    if (params.get('error')) {
      setError('Failed to connect Gmail. Please try again.');
      window.history.replaceState({}, '', '/email');
    }
  }, []);

  const handleConnectGmail = async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await fetch('/api/email/connect?action=connect');
      const data = await res.json();
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (err) {
      setError('Failed to connect to Gmail');
    } finally {
      setLoading(false);
    }
  };

  const handleScanEmails = async () => {
    try {
      setScanning(true);
      setError('');
      
      // Try to get token from cookie (set by callback)
      const res = await fetch('/api/email/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Include cookies
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to scan emails');
      }
      
      setParsedApps(data.applications || []);
      setSuccessMessage(`Found ${data.applications?.length || 0} potential applications!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  const toggleSelectApp = (index) => {
    setSelectedApps(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleImportSelected = async () => {
    try {
      setLoading(true);
      setError('');
      
      const appsToImport = parsedApps.filter((_, index) => selectedApps.includes(index));
      
      for (const app of appsToImport) {
        await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 1,
            company_name: app.companyName,
            position_title: app.positionTitle,
            application_date: app.applicationDate,
            application_status: app.status,
            notes: app.notes
          })
        });
      }
      
      setSuccessMessage(`Successfully imported ${appsToImport.length} applications!`);
      setParsedApps([]);
      setSelectedApps([]);
      
      setTimeout(() => router.push('/applications'), 2000);
    } catch (err) {
      setError('Failed to import applications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            ✓ {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            ✗ {error}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">How It Works</h2>
          <ol className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">1</span>
              <span>Connect your Gmail account securely via Google OAuth</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">2</span>
              <span>We scan your recent emails for application confirmations</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">3</span>
              <span>Review and select which applications to import</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">4</span>
              <span>Import them with one click!</span>
            </li>
          </ol>
        </div>

        {!connected && parsedApps.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Gmail</h3>
              <p className="text-gray-600 mb-6">
                Securely connect your Gmail to automatically find and import application confirmations
              </p>
            </div>
            
            <button
              onClick={handleConnectGmail}
              disabled={loading}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-medium text-lg disabled:opacity-50 inline-flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                  Connect Gmail Account
                </>
              )}
            </button>

            <p className="text-sm text-gray-500 mt-4">
              We only request read-only access to your emails. We never store or share your data.
            </p>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Or try it in demo mode:</p>
              <button
                onClick={() => {
                  setConnected(true);
                  sessionStorage.setItem('gmail_token', 'demo_token');
                }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Use Demo Mode
              </button>
            </div>
          </div>
        )}

        {connected && parsedApps.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Gmail Connected! ✓</h3>
            <p className="text-gray-600 mb-6">
              Now let's scan your recent emails for application confirmations
            </p>
            
            <button
              onClick={handleScanEmails}
              disabled={scanning}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
            >
              {scanning ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Scanning emails...
                </>
              ) : (
                'Scan for Applications'
              )}
            </button>
          </div>
        )}

        {parsedApps.length > 0 && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Found Applications</h3>
                  <p className="text-gray-600 mt-1">Review and select which ones to import</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Selected: {selectedApps.length} of {parsedApps.length}</p>
                  <button
                    onClick={() => setSelectedApps(parsedApps.map((_, i) => i))}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Select All
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {parsedApps.map((app, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    selectedApps.includes(index)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleSelectApp(index)}
                >
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={selectedApps.includes(index)}
                      onChange={() => {}}
                      className="mt-1 mr-4 h-5 w-5 text-blue-600"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900">{app.companyName}</h4>
                      <p className="text-gray-700">{app.positionTitle}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Applied: {new Date(app.applicationDate).toLocaleDateString()}
                      </p>
                      {app.notes && (
                        <p className="text-sm text-gray-500 mt-2 italic">{app.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <button
                onClick={() => {
                  setParsedApps([]);
                  setSelectedApps([]);
                }}
                className="text-gray-600 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSelected}
                disabled={selectedApps.length === 0 || loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
              >
                {loading ? 'Importing...' : `Import ${selectedApps.length} Selected`}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
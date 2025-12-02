//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Interviews Page - Schedule and manage interviews

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    application_id: '',
    interview_type: 'Phone Screen',
    interview_date: '',
    location: '',
    interviewer_name: '',
    interviewer_email: '',
    notes: '',
    outcome: 'Pending'
  });

  useEffect(() => {
    fetchInterviews();
    fetchApplications();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/interviews');
      const data = await res.json();
      setInterviews(data);
    } catch (err) {
      setError('Failed to fetch interviews');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error('Failed to fetch applications');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add interview');
      }

      setSuccessMessage('Interview scheduled!');
      setShowAddForm(false);
      resetForm();
      fetchInterviews();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this interview?')) return;

    try {
      const res = await fetch(`/api/interviews/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete interview');
      }

      setSuccessMessage('Interview deleted!');
      fetchInterviews();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      application_id: '',
      interview_type: 'Phone Screen',
      interview_date: '',
      location: '',
      interviewer_name: '',
      interviewer_email: '',
      notes: '',
      outcome: 'Pending'
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      'Phone Screen': 'bg-blue-100 text-blue-800',
      'Technical': 'bg-purple-100 text-purple-800',
      'Behavioral': 'bg-green-100 text-green-800',
      'Panel': 'bg-yellow-100 text-yellow-800',
      'Final': 'bg-red-100 text-red-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getOutcomeColor = (outcome) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Passed': 'bg-green-100 text-green-800',
      'Failed': 'bg-red-100 text-red-800',
      'Cancelled': 'bg-gray-100 text-gray-800'
    };
    return colors[outcome] || 'bg-gray-100 text-gray-800';
  };

  const upcomingInterviews = interviews.filter(i => new Date(i.interview_date) >= new Date() && i.outcome === 'Pending');
  const pastInterviews = interviews.filter(i => new Date(i.interview_date) < new Date() || i.outcome !== 'Pending');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
              <p className="text-gray-600 mt-1">Manage your interview schedule</p>
            </div>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {!showAddForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              + Schedule Interview
            </button>
          </div>
        )}

        {showAddForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">Schedule New Interview</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application *
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.application_id}
                    onChange={(e) => setFormData({...formData, application_id: e.target.value})}
                    required
                  >
                    <option value="">Select application...</option>
                    {applications.map(app => (
                      <option key={app.application_id} value={app.application_id}>
                        {app.company_name} - {app.position_title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interview Type *
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.interview_type}
                    onChange={(e) => setFormData({...formData, interview_type: e.target.value})}
                  >
                    <option>Phone Screen</option>
                    <option>Technical</option>
                    <option>Behavioral</option>
                    <option>Panel</option>
                    <option>Final</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interview Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.interview_date}
                    onChange={(e) => setFormData({...formData, interview_date: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Zoom, Office address, etc."
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interviewer Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.interviewer_name}
                    onChange={(e) => setFormData({...formData, interviewer_name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interviewer Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={formData.interviewer_email}
                    onChange={(e) => setFormData({...formData, interviewer_email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows="3"
                  placeholder="Preparation notes, topics to cover, etc."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Schedule Interview
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); resetForm(); }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Upcoming Interviews ({upcomingInterviews.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : upcomingInterviews.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No upcoming interviews scheduled</p>
          ) : (
            <div className="space-y-4">
              {upcomingInterviews.map(interview => (
                <div key={interview.interview_id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {interview.company_name} - {interview.position_title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-600">
                          <span className="font-medium">Date:</span>{' '}
                          {new Date(interview.interview_date).toLocaleString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </p>
                        {interview.location && (
                          <p className="text-gray-600">
                            <span className="font-medium">Location:</span> {interview.location}
                          </p>
                        )}
                        {interview.interviewer_name && (
                          <p className="text-gray-600">
                            <span className="font-medium">Interviewer:</span> {interview.interviewer_name}
                          </p>
                        )}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(interview.interview_type)}`}>
                          {interview.interview_type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(interview.interview_id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {pastInterviews.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Past Interviews ({pastInterviews.length})
            </h2>
            <div className="space-y-4">
              {pastInterviews.map(interview => (
                <div key={interview.interview_id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {interview.company_name} - {interview.position_title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {new Date(interview.interview_date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(interview.interview_type)}`}>
                          {interview.interview_type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getOutcomeColor(interview.outcome)}`}>
                          {interview.outcome}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(interview.interview_id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
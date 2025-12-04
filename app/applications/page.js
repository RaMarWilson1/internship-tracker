//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Applications Page - Full list with edit, delete, status change

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/applications');
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      setError('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(app => app.application_status === statusFilter);
    }

    setFilteredApps(filtered);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete');

      setSuccessMessage('Application deleted successfully!');
      fetchApplications();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete application');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
  try {
    const res = await fetch(`/api/applications/${id}`, {
      method: 'PATCH',  // Changed from PUT to PATCH
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        application_status: newStatus
      })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update');
    }

    setSuccessMessage('Status updated successfully!');
    fetchApplications();
    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (err) {
    setError(err.message || 'Failed to update status');
    setTimeout(() => setError(''), 3000);
  }
};

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Interview': 'bg-purple-100 text-purple-800',
      'Offer': 'bg-green-100 text-green-800',
      'Accepted': 'bg-green-200 text-green-900',
      'Rejected': 'bg-red-100 text-red-800',
      'Withdrawn': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black-900">Applications</h1>
          <p className="text-black-600 mt-1">Manage your internship applications</p>
        </div>

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

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
          <div className="flex gap-4">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Search by company or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>
            <Link
              href="/add"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add New
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">
            All Applications ({filteredApps.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No applications found</p>
              <Link href="/add" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Add Your First Application
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-4 font-semibold">Company</th>
                    <th className="text-left p-4 font-semibold">Position</th>
                    <th className="text-left p-4 font-semibold">Location</th>
                    <th className="text-left p-4 font-semibold">Applied</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map(app => (
                    <tr key={app.application_id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{app.company_name}</td>
                      <td className="p-4">{app.position_title}</td>
                      <td className="p-4">{app.location || 'N/A'}</td>
                      <td className="p-4">
                        {new Date(app.application_date).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <select
                          value={app.application_status}
                          onChange={(e) => handleStatusChange(app.application_id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${getStatusColor(app.application_status)}`}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Withdrawn">Withdrawn</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(app.application_id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
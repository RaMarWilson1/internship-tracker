//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2024
//*** Status Badge Component

'use client';

export default function StatusBadge({ status }) {
  const colors = {
    'Applied': 'bg-blue-100 text-blue-800',
    'Interview': 'bg-purple-100 text-purple-800',
    'Offer': 'bg-green-100 text-green-800',
    'Accepted': 'bg-green-200 text-green-900',
    'Rejected': 'bg-red-100 text-red-800',
    'Withdrawn': 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
}
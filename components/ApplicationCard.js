//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2025
//*** Application Card Component

'use client';

export default function ApplicationCard({ application, onEdit, onDelete }) {
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{application.company_name}</h3>
          <p className="text-gray-700">{application.position_title}</p>
          <p className="text-sm text-gray-600 mt-1">
            {application.location || 'Location not specified'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Applied: {new Date(application.application_date).toLocaleDateString()}
          </p>
          <div className="mt-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.application_status)}`}>
              {application.application_status}
            </span>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          {onEdit && (
            <button
              onClick={() => onEdit(application)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(application.application_id)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
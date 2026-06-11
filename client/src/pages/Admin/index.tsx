import React from 'react';
import { Shield, PlusCircle, Users, Settings } from 'lucide-react';

export default function Admin() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm">Manage users, adjust lesson settings, and add course materials.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm text-left hover:bg-indigo-50/50 transition-colors flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Create New Lesson</h3>
            <p className="text-sm text-gray-500">Publish fresh content modules directly to students.</p>
          </div>
        </button>

        <button className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm text-left hover:bg-indigo-50/50 transition-colors flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">User Management</h3>
            <p className="text-sm text-gray-500">Track registration history, progress analytics, and permissions.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
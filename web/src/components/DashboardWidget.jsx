import React from 'react';

function DashboardWidget({ icon, label, value }) {
  return (
    <div className="card card-base p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl">{icon}</div>
          <div>
            <p className="text-sm text-dark-600">{label}</p>
            <p className="text-2xl font-bold text-dark-900">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardWidget;

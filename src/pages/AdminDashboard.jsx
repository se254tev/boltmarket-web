import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Users, Package, CheckCircle } from 'lucide-react';
import { adminAPI } from '../services/api';

/**
 * Admin Dashboard - Content moderation, dispute resolution, and analytics
 * Only accessible to admin users
 */
export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [reportsResp, disputesResp, statsResp] = await Promise.all([
        adminAPI.getReports(),
        adminAPI.getDisputes(),
        adminAPI.getStats(),
      ]);

      setReports(reportsResp.data || []);
      setDisputes(disputesResp.data || []);
      setStats(statsResp.data?.[0] || {});
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-safe py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-2 mb-2">Admin Dashboard</h1>
        <p className="text-body-lg text-dark-600 dark:text-dark-300">
          Manage content, resolve disputes, and view analytics
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 border-b border-dark-200 dark:border-dark-700 overflow-x-auto">
        {['dashboard', 'moderation', 'disputes', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-dark-500 dark:text-dark-400'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <DashboardOverview stats={stats} reports={reports} disputes={disputes} />
      )}
      {activeTab === 'moderation' && (
        <ModerationPanel reports={reports} onReportsChange={setReports} />
      )}
      {activeTab === 'disputes' && (
        <DisputeResolutionPanel disputes={disputes} onDisputesChange={setDisputes} />
      )}
      {activeTab === 'analytics' && (
        <AnalyticsPanel stats={stats} />
      )}
    </div>
  );
};

/**
 * Dashboard Overview
 */
const DashboardOverview = ({ stats, reports, disputes }) => {
  const pendingReports = reports.filter((r) => r.status === 'pending').length;
  const openDisputes = disputes.filter((d) => d.status === 'open').length;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Package}
          label="Total Listings"
          value={stats?.total_listings || 0}
        />
        <StatCard
          icon={Users}
          label="Active Users"
          value={stats?.active_users || 0}
        />
        <StatCard
          icon={AlertCircle}
          label="Pending Reports"
          value={pendingReports}
          highlight={pendingReports > 0}
        />
        <StatCard
          icon={AlertCircle}
          label="Open Disputes"
          value={openDisputes}
          highlight={openDisputes > 0}
        />
      </div>

      {/* Recent Activity */}
      <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
        <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
          Recent Content Reports
        </h3>
        {reports.length === 0 ? (
          <p className="text-dark-500 dark:text-dark-400">No reports</p>
        ) : (
          <div className="space-y-3">
            {reports.slice(0, 5).map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 bg-dark-50 dark:bg-dark-700 rounded"
              >
                <div>
                  <p className="text-sm font-medium text-dark-900 dark:text-white">
                    {report.reason}
                  </p>
                  <p className="text-xs text-dark-500 dark:text-dark-400">
                    Reported {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  report.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Stat Card Component
 */
const StatCard = ({ icon: Icon, label, value, highlight }) => {
  return (
    <div className={`card card-base dark:bg-dark-800 dark:border-dark-700 ${
      highlight ? 'border-red-200 dark:border-red-800' : ''
    }`}>
      <Icon className={`w-8 h-8 mb-2 ${
        highlight ? 'text-red-500' : 'text-primary-500'
      }`} />
      <p className="text-xs text-dark-500 dark:text-dark-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-dark-900 dark:text-white">
        {value.toLocaleString()}
      </p>
    </div>
  );
};

/**
 * Content Moderation Panel
 */
const ModerationPanel = ({ reports, onReportsChange }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleModerate = async (reportId, action, reason) => {
    setIsProcessing(true);
    try {
      const { data } = await adminAPI.updateReport(reportId, { status: 'resolved', action, reason });
      
      // Update report list
      onReportsChange((prev) =>
        prev.map((r) => (r.id === reportId ? data : r))
      );
      
      setSelectedReport(null);
      alert('Report processed successfully');
    } catch (error) {
      alert('Error processing report');
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingReports = reports.filter((r) => r.status === 'pending');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Report List */}
      <div className="lg:col-span-1">
        <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
          <h3 className="font-bold text-dark-900 dark:text-white mb-4">
            Reports ({pendingReports.length} pending)
          </h3>
          <div className="space-y-2">
            {pendingReports.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`w-full text-left p-3 rounded border transition-colors ${
                  selectedReport?.id === report.id
                    ? 'bg-primary-100 dark:bg-primary-900 border-primary-500'
                    : 'border-dark-200 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-700'
                }`}
              >
                <p className="text-sm font-medium text-dark-900 dark:text-white truncate">
                  {report.reason}
                </p>
                <p className="text-xs text-dark-500 dark:text-dark-400">
                  by {report.reporter_id?.slice(0, 8)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Report Details */}
      {selectedReport ? (
        <div className="lg:col-span-2">
          <ReportDetailView
            report={selectedReport}
            onModerate={handleModerate}
            isProcessing={isProcessing}
          />
        </div>
      ) : (
        <div className="lg:col-span-2 card card-base dark:bg-dark-800 dark:border-dark-700 flex items-center justify-center h-96">
          <p className="text-dark-500 dark:text-dark-400">
            Select a report to review
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Report Detail View Component
 */
const ReportDetailView = ({ report, onModerate, isProcessing }) => {
  const [moderationReason, setModerationReason] = useState('');

  return (
    <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
      <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
        Report Details
      </h3>

      <div className="space-y-4 mb-6">
        <DetailItem label="Reason" value={report.reason} />
        <DetailItem label="Reporter" value={report.reporter_id?.slice(0, 8)} />
        <DetailItem label="Content Type" value={report.content_type || 'N/A'} />
        <DetailItem label="Date" value={new Date(report.created_at).toLocaleDateString()} />
        <div>
          <p className="text-sm font-medium text-dark-900 dark:text-white mb-2">
            Description
          </p>
          <p className="text-sm text-dark-600 dark:text-dark-300 bg-dark-50 dark:bg-dark-700 p-3 rounded">
            {report.description}
          </p>
        </div>
      </div>

      {/* Moderation Actions */}
      <div className="border-t border-dark-200 dark:border-dark-700 pt-4">
        <p className="text-sm font-medium text-dark-900 dark:text-white mb-3">
          Moderation Action
        </p>
        <textarea
          value={moderationReason}
          onChange={(e) => setModerationReason(e.target.value)}
          placeholder="Provide moderation reason..."
          rows={3}
          className="input dark:bg-dark-800 dark:text-white dark:border-dark-600 mb-3"
        />
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onModerate(report.id, 'approve', moderationReason)}
            disabled={isProcessing}
            className="btn btn-secondary disabled:opacity-50"
          >
            Approve
          </button>
          <button
            onClick={() => onModerate(report.id, 'remove', moderationReason)}
            disabled={isProcessing}
            className="btn btn-primary disabled:opacity-50"
          >
            Remove Content
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Detail Item Component
 */
const DetailItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs text-dark-500 dark:text-dark-400 mb-1">{label}</p>
      <p className="text-sm text-dark-900 dark:text-white font-medium">{value}</p>
    </div>
  );
};

/**
 * Dispute Resolution Panel
 */
const DisputeResolutionPanel = ({ disputes, onDisputesChange }) => {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resolution, setResolution] = useState('');

  const handleResolveDispute = async (disputeId, resolutionText) => {
    setIsProcessing(true);
    try {
      const { data } = await adminAPI.resolveDispute(disputeId, { status: 'resolved', resolution: resolutionText });
      
      onDisputesChange((prev) =>
        prev.map((d) => (d.id === disputeId ? data : d))
      );
      
      setSelectedDispute(null);
      setResolution('');
      alert('Dispute resolved successfully');
    } catch (error) {
      alert('Error resolving dispute');
    } finally {
      setIsProcessing(false);
    }
  };

  const openDisputes = disputes.filter((d) => d.status === 'open');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
          <h3 className="font-bold text-dark-900 dark:text-white mb-4">
            Disputes ({openDisputes.length} open)
          </h3>
          <div className="space-y-2">
            {openDisputes.map((dispute) => (
              <button
                key={dispute.id}
                onClick={() => setSelectedDispute(dispute)}
                className={`w-full text-left p-3 rounded border transition-colors ${
                  selectedDispute?.id === dispute.id
                    ? 'bg-primary-100 dark:bg-primary-900 border-primary-500'
                    : 'border-dark-200 dark:border-dark-700'
                }`}
              >
                <p className="text-sm font-medium text-dark-900 dark:text-white">
                  Escrow {dispute.escrow_id?.slice(0, 8)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedDispute && (
        <div className="lg:col-span-2">
          <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
            <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
              Dispute Resolution
            </h3>

            <div className="space-y-4 mb-6">
              <DetailItem
                label="Initiator"
                value={selectedDispute.initiator_id?.slice(0, 8)}
              />
              <DetailItem
                label="Defendant"
                value={selectedDispute.defendant_id?.slice(0, 8)}
              />
              <DetailItem
                label="Reason"
                value={selectedDispute.reason}
              />
            </div>

            <textarea
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="Provide resolution..."
              rows={4}
              className="input dark:bg-dark-800 dark:text-white dark:border-dark-600 mb-4"
            />

            <button
              onClick={() =>
                handleResolveDispute(selectedDispute.id, resolution)
              }
              disabled={isProcessing || !resolution}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {isProcessing ? 'Resolving...' : 'Resolve Dispute'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Analytics Panel
 */
const AnalyticsPanel = ({ stats }) => {
  const latestStats = stats?.[0] || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Key Metrics */}
      <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
        <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
          Platform Metrics
        </h3>
        <div className="space-y-3">
          <AnalyticsRow
            label="Total Users"
            value={latestStats.total_users || 0}
          />
          <AnalyticsRow
            label="Total Transactions"
            value={latestStats.total_transactions || 0}
          />
          <AnalyticsRow
            label="Total Volume"
            value={`KES ${(latestStats.total_volume || 0).toLocaleString()}`}
          />
          <AnalyticsRow
            label="Active Listings"
            value={latestStats.active_listings || 0}
          />
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
        <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
          Growth Indicators
        </h3>
        <div className="space-y-3">
          <AnalyticsRow
            label="New Users (30d)"
            value={latestStats.new_users_30d || 0}
          />
          <AnalyticsRow
            label="Avg Rating"
            value={(latestStats.avg_rating || 0).toFixed(2)}
          />
          <AnalyticsRow
            label="Dispute Rate"
            value={`${(latestStats.dispute_rate || 0).toFixed(2)}%`}
          />
          <AnalyticsRow
            label="Completion Rate"
            value={`${(latestStats.completion_rate || 0).toFixed(2)}%`}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Analytics Row Component
 */
const AnalyticsRow = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-dark-50 dark:hover:bg-dark-700 rounded transition-colors">
      <span className="text-sm text-dark-600 dark:text-dark-300">{label}</span>
      <span className="font-bold text-dark-900 dark:text-white">{value}</span>
    </div>
  );
};

export default AdminDashboard;

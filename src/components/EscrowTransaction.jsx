import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Truck, Package, Clock } from 'lucide-react';
import escrowService from '../services/escrow';

/**
 * Escrow Transaction Component
 * Displays transaction status and allows buyers/sellers to update status
 */
export const EscrowTransaction = ({ escrowId, userRole }) => {
  const [escrow, setEscrow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEscrow();
  }, [escrowId]);

  const loadEscrow = async () => {
    try {
      setIsLoading(true);
      const data = await escrowService.getEscrowDetails(escrowId);
      setEscrow(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading escrow:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      let result;
      
      if (newStatus === 'goods_shipped') {
        result = await escrowService.confirmGoodsShipped(escrowId);
      } else if (newStatus === 'goods_received') {
        result = await escrowService.confirmGoodsReceived(escrowId);
      } else if (newStatus === 'completed') {
        result = await escrowService.releaseEscrow(escrowId);
      } else if (newStatus === 'refunded') {
        result = await escrowService.refundEscrow(escrowId, 'Requested by buyer');
      }

      setEscrow(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading escrow details...</div>;
  }

  if (!escrow) {
    return <div className="text-center py-8 text-red-600">Escrow not found</div>;
  }

  const statusColor = {
    pending: 'bg-yellow-50 border-yellow-200',
    payment_received: 'bg-blue-50 border-blue-200',
    goods_shipped: 'bg-purple-50 border-purple-200',
    goods_received: 'bg-cyan-50 border-cyan-200',
    completed: 'bg-green-50 border-green-200',
    disputed: 'bg-red-50 border-red-200',
    refunded: 'bg-orange-50 border-orange-200',
  };

  const statusIcon = {
    pending: Clock,
    payment_received: CheckCircle2,
    goods_shipped: Truck,
    goods_received: Package,
    completed: CheckCircle2,
    disputed: AlertCircle,
    refunded: AlertCircle,
  };

  const StatusIcon = statusIcon[escrow.status] || CheckCircle2;

  return (
    <div className="card card-base dark:bg-dark-800 dark:border-dark-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-dark-900 dark:text-white">
          Transaction #{escrow.id?.slice(0, 8)}
        </h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusColor[escrow.status] || statusColor.pending}`}>
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-medium capitalize">
            {escrow.status?.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-dark-500 dark:text-dark-400 mb-1">Amount</p>
          <p className="text-lg font-bold text-dark-900 dark:text-white">
            {escrow.currency} {escrow.amount?.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-dark-500 dark:text-dark-400 mb-1">Created</p>
          <p className="text-sm text-dark-900 dark:text-white">
            {new Date(escrow.created_at).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-dark-500 dark:text-dark-400 mb-1">Estimated Completion</p>
          <p className="text-sm text-dark-900 dark:text-white">
            {new Date(escrow.estimated_completion).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-dark-500 dark:text-dark-400 mb-1">Fee (2.5%)</p>
          <p className="text-sm text-dark-900 dark:text-white">
            {escrow.currency} {(escrow.amount * 0.025).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-6 space-y-3">
        <TimelineStep
          title="Payment Received"
          completed={['payment_received', 'goods_shipped', 'goods_received', 'completed'].includes(escrow.status)}
          current={escrow.status === 'payment_received'}
        />
        <TimelineStep
          title="Goods Shipped"
          completed={['goods_shipped', 'goods_received', 'completed'].includes(escrow.status)}
          current={escrow.status === 'goods_shipped'}
        />
        <TimelineStep
          title="Goods Received"
          completed={['goods_received', 'completed'].includes(escrow.status)}
          current={escrow.status === 'goods_received'}
        />
        <TimelineStep
          title="Transaction Completed"
          completed={escrow.status === 'completed'}
          current={false}
        />
      </div>

      {/* Actions */}
      <div className="border-t border-dark-200 dark:border-dark-700 pt-4">
        <p className="text-sm font-medium text-dark-900 dark:text-white mb-3">
          {userRole === 'seller'
            ? 'Seller Actions'
            : 'Buyer Actions'}
        </p>
        
        <div className="space-y-2">
          {userRole === 'seller' && escrow.status === 'payment_received' && (
            <button
              onClick={() => handleStatusUpdate('goods_shipped')}
              disabled={isUpdating}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {isUpdating ? 'Updating...' : 'Confirm Goods Shipped'}
            </button>
          )}

          {userRole === 'buyer' && escrow.status === 'goods_shipped' && (
            <button
              onClick={() => handleStatusUpdate('goods_received')}
              disabled={isUpdating}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {isUpdating ? 'Updating...' : 'Confirm Goods Received'}
            </button>
          )}

          {escrow.status === 'goods_received' && (
            <button
              onClick={() => handleStatusUpdate('completed')}
              disabled={isUpdating}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {isUpdating ? 'Updating...' : 'Release Payment to Seller'}
            </button>
          )}

          {['pending', 'payment_received', 'goods_shipped'].includes(escrow.status) && (
            <button
              onClick={() => {
                if (confirm('Are you sure? This will initiate a dispute.')) {
                  handleStatusUpdate('disputed');
                }
              }}
              disabled={isUpdating}
              className="btn btn-secondary w-full disabled:opacity-50"
            >
              Dispute Transaction
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded text-red-700 dark:text-red-200 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

/**
 * Timeline Step Component
 */
const TimelineStep = ({ title, completed, current }) => {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            completed
              ? 'bg-green-500 border-green-500'
              : current
              ? 'border-primary-500 bg-primary-50'
              : 'border-dark-300 dark:border-dark-600'
          }`}
        >
          {completed && (
            <CheckCircle2 className="w-4 h-4 text-white" />
          )}
        </div>
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${
          completed || current
            ? 'text-dark-900 dark:text-white'
            : 'text-dark-500 dark:text-dark-400'
        }`}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default EscrowTransaction;

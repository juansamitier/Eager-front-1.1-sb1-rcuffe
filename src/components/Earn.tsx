import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp, Loader2 } from 'lucide-react';
import { useLRTTokenBalance } from '../hooks/useLRTTokenBalance';
import { useApproveLRTToken } from '../hooks/useApproveLRTToken';
import { useDepositLRTToken } from '../hooks/useDepositLRTToken';
import { useCheckLRTTVaultAllowance } from '../hooks/useCheckLRTTVaultAllowance';
import { useRedeemLRTTVault } from '../hooks/useRedeemLRTTVault';
import { useLRTVaultBalance } from '../hooks/useLRTVaultBalance';
import toast from 'react-hot-toast';

export default function Earn() {
  const [isDepositing, setIsDepositing] = useState(true);
  const [amount, setAmount] = useState<string>('');
  const [hasAllowance, setHasAllowance] = useState(false);

  // Get LRT token balance and hooks
  const { amount: tokenBalance, isLoading: isLoadingBalance } = useLRTTokenBalance();
  const { amount: allowance, isLoading: isAllowanceLoading, refetch: refetchAllowance } = useCheckLRTTVaultAllowance();
  const { handleApprove, isLoading: isApproveLoading } = useApproveLRTToken();
  const { handleDeposit, isLoading: isDepositLoading } = useDepositLRTToken();

  // Add new hooks for withdraw functionality
  const { handleRedeem, isLoading: isRedeemLoading } = useRedeemLRTTVault();
  const { amount: vaultBalance, refetch: refetchVaultBalance } = useLRTVaultBalance();

  // Validate amount against balance
  const isValidAmount = amount && 
    parseFloat(amount) > 0 && 
    parseFloat(amount) <= (isDepositing ? parseFloat(tokenBalance) : parseFloat(vaultBalance));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive numbers
    if (value === '' || parseFloat(value) >= 0) {
      setAmount(value);
    }
  };

  useEffect(() => {
    const checkAllowance = async () => {
      if (amount && allowance) {
        const hasEnoughAllowance = parseFloat(allowance) >= parseFloat(amount);
        setHasAllowance(hasEnoughAllowance);
      }
    };

    checkAllowance();
  }, [amount, allowance]);

  const onApprove = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    try {
      const success = await handleApprove(amount);
      if (success) {
        await refetchAllowance();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await refetchAllowance();
        setHasAllowance(true);
        toast.success('Successfully approved eETH!', {
          duration: 4000,
          position: 'bottom-right',
          style: {
            background: '#1a2e44',
            color: '#fff',
            border: '1px solid rgba(56, 114, 224, 0.2)',
          },
        });
      }
    } catch (error) {
      console.error('Approval failed:', error);
      toast.error('Failed to approve eETH. Please try again.', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: '#1a2e44',
          color: '#fff',
          border: '1px solid rgba(224, 56, 56, 0.2)',
        },
      });
    }
  };

  const onDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0 || !hasAllowance) return;
    
    try {
      const success = await handleDeposit(amount);
      if (success) {
        setAmount('');
        setHasAllowance(false);
        toast.success(`Successfully deposited ${amount} eETH!`, {
          duration: 4000,
          position: 'bottom-right',
          style: {
            background: '#1a2e44',
            color: '#fff',
            border: '1px solid rgba(56, 114, 224, 0.2)',
          },
        });
      } else {
        throw new Error('Deposit failed');
      }
    } catch (error) {
      console.error('Deposit failed:', error);
      toast.error('Failed to deposit eETH. Please try again.', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: '#1a2e44',
          color: '#fff',
          border: '1px solid rgba(224, 56, 56, 0.2)',
        },
      });
    }
  };

  const onRedeem = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    try {
      const success = await handleRedeem(amount);
      if (success) {
        setAmount('');
        // Refetch balances after successful redemption
        await refetchVaultBalance();
        // Wait and refetch again to ensure updated balance
        await new Promise(resolve => setTimeout(resolve, 2000));
        await refetchVaultBalance();
        
        toast.success(`Successfully withdrawn ${amount} eETH!`, {
          duration: 4000,
          position: 'bottom-right',
          style: {
            background: '#1a2e44',
            color: '#fff',
            border: '1px solid rgba(56, 114, 224, 0.2)',
          },
        });
      } else {
        throw new Error('Withdrawal failed');
      }
    } catch (error) {
      console.error('Withdrawal failed:', error);
      toast.error('Failed to withdraw eETH. Please try again.', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: '#1a2e44',
          color: '#fff',
          border: '1px solid rgba(224, 56, 56, 0.2)',
        },
      });
    }
  };

  return (
    <div className="bg-blue-900/20 backdrop-blur-md rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Yield Portal</h2>
        <button
          onClick={() => setIsDepositing(!isDepositing)}
          className="flex items-center space-x-2 text-blue-300/80 hover:text-blue-200 transition-colors"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Switch to {isDepositing ? 'Withdraw' : 'Deposit'}</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-800/30 to-blue-700/30 rounded-lg mb-6">
          <div>
            <p className="text-blue-200/80 text-sm">Current APY</p>
            <p className="text-2xl font-bold text-white">12.5%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-400" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-blue-200/80">Amount</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="any"
              placeholder="0.0"
              value={amount}
              onChange={handleAmountChange}
              className="w-full bg-blue-800/20 border border-blue-700/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-600/50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/80">eETH</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-800/30 to-blue-700/30 rounded-lg p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-200/80">Your balance</span>
            <span className="text-white">
              {isLoadingBalance ? 'Loading...' : `${tokenBalance} eETH`}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-200/80">Current Collateralization Level</span>
            <span className="text-white">75%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-200/80">Estimated earnings</span>
            <span className="text-white">0.0 USD / day</span>
          </div>
        </div>

        {isDepositing ? (
          <div className="space-y-4">
            {!hasAllowance && (
              <button
                onClick={onApprove}
                disabled={isApproveLoading || !isValidAmount || isAllowanceLoading}
                className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center
                  ${isApproveLoading || !isValidAmount || isAllowanceLoading
                    ? 'bg-blue-800/30 text-blue-300/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  }
                `}
              >
                {(isApproveLoading || isAllowanceLoading) ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {isApproveLoading ? 'Approving...' : 'Checking allowance...'}
                  </>
                ) : (
                  'Approve eETH'
                )}
              </button>
            )}
            
            <button
              onClick={onDeposit}
              disabled={!hasAllowance || isDepositLoading || !isValidAmount}
              className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center
                ${!hasAllowance || isDepositLoading || !isValidAmount
                  ? 'bg-blue-800/30 text-blue-300/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}
            >
              {isDepositLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Depositing...
                </>
              ) : (
                'Deposit eETH'
              )}
            </button>
          </div>
        ) : (
          <button 
            onClick={onRedeem}
            disabled={!isValidAmount || isRedeemLoading}
            className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center
              ${!isValidAmount || isRedeemLoading
                ? 'bg-blue-800/30 text-blue-300/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
              }`}
          >
            {isRedeemLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Withdrawing...
              </>
            ) : parseFloat(amount) > parseFloat(vaultBalance) ? (
              'Insufficient balance'
            ) : (
              'Withdraw eETH'
            )}
          </button>
        )}

        {!isDepositing && (
          <div className="mt-4 text-sm text-blue-200/80 text-center">
            Available to withdraw: {vaultBalance} eETH
          </div>
        )}
      </div>
    </div>
  );
}
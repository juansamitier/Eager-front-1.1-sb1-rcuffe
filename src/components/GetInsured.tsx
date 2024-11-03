import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { useApproveUSDe } from '../hooks/useApproveUSDe';
import { useDepositUSDe } from '../hooks/useDepositUSDe';
import { useRedeemEUSDe } from '../hooks/useRedeemEUSDe';
import { useCheckAllowance } from "../hooks/useCheckAllowance";
import { useEUSDeBalance } from '../hooks/useEUSDeBalance';
import toast from 'react-hot-toast';

export default function GetInsured() {

  const [isMinting, setIsMinting] = useState(true);
  const [amount, setAmount] = useState<string>('');
  const [hasAllowance, setHasAllowance] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const { amount: allowance, isLoading: isAllowanceLoading, refetch: refetchAllowance } = useCheckAllowance();
  const { handleApprove, isLoading: isApproveLoading } = useApproveUSDe();
  const { handleDeposit, isLoading: isDepositLoading } = useDepositUSDe();
  const { handleRedeem, isLoading: isRedeemLoading } = useRedeemEUSDe();
  const { amount: eusdeBalance, refetch: refetchBalance } = useEUSDeBalance();

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
    
    setIsApproving(true);
    try {
      const success = await handleApprove(amount);
      if (success) {
        await refetchAllowance();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await refetchAllowance();
        setHasAllowance(true);
      }
    } catch (error) {
      console.error('Approval failed:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const onMint = async () => {
    if (!amount || parseFloat(amount) <= 0 || !hasAllowance) return;
    
    try {
      await handleDeposit(amount);
      setAmount('');
      setHasAllowance(false);
      
      // Add multiple refetch attempts with delays
      await refetchBalance();
      // Wait 2 seconds and refetch again
      await new Promise(resolve => setTimeout(resolve, 2000));
      await refetchBalance();
      // Wait 2 more seconds and refetch one last time
      await new Promise(resolve => setTimeout(resolve, 2000));
      await refetchBalance();

      toast.success(`Successfully minted ${amount} esUSDe!`, {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: '#1a2e44',
          color: '#fff',
          border: '1px solid rgba(56, 114, 224, 0.2)',
        },
      });
    } catch (error) {
      console.error('Minting failed:', error);
      toast.error('Failed to mint esUSDe. Please try again.', {
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
        
        // Add multiple refetch attempts with delays
        await refetchBalance();
        // Wait 2 seconds and refetch again
        await new Promise(resolve => setTimeout(resolve, 2000));
        await refetchBalance();
        // Wait 2 more seconds and refetch one last time
        await new Promise(resolve => setTimeout(resolve, 2000));
        await refetchBalance();

        toast.success(`Successfully redeemed ${amount} sUSDe!`, {
          duration: 4000,
          position: 'bottom-right',
          style: {
            background: '#1a2e44',
            color: '#fff',
            border: '1px solid rgba(56, 114, 224, 0.2)',
          },
        });
      } else {
        throw new Error('Redemption failed');
      }
    } catch (error) {
      console.error('Redemption failed:', error);
      toast.error('Failed to redeem sUSDe. Please try again.', {
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

  const isValidAmount = amount && parseFloat(amount) > 0;

  const hasInsufficientBalance = !isMinting && parseFloat(amount) > parseFloat(eusdeBalance);

  return (
    <div className="bg-blue-900/20 backdrop-blur-md rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Insurance Portal</h2>
        <button
          onClick={() => setIsMinting(!isMinting)}
          className="flex items-center space-x-2 text-blue-300/80 hover:text-blue-200 transition-colors"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Switch to {isMinting ? 'Redeem' : 'Mint'}</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-800/30 to-blue-700/30 rounded-lg mb-6">
          <div>
            <p className="text-blue-200/80 text-sm">Current APY</p>
            <p className="text-2xl font-bold text-white">8.5%</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-blue-200/80">Amount</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="any"
              placeholder="0"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (parseFloat(value) < 0) return;
                setAmount(value);
              }}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              className="w-full bg-blue-800/20 border border-blue-700/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-600/50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/80">
              {isMinting ? 'sUSDe' : 'esUSDe'}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-800/30 to-blue-700/30 rounded-lg p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-200/80">You will receive</span>
            <span className="text-white">
              {isValidAmount ? amount : '0'} {isMinting ? 'esUSDe' : 'sUSDe'}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-200/80">Exchange rate</span>
            <span className="text-white">1 sUSDe = 1 esUSDe</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-200/80">Current Collateralization Level</span>
            <span className="text-white">75%</span>
          </div>
        </div>

        {isMinting ? (
          <div className="space-y-4">
            {!hasAllowance && (
              <button
                onClick={onApprove}
                disabled={isApproveLoading || !isValidAmount || isAllowanceLoading || isApproving}
                className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center
                  ${isApproveLoading || !isValidAmount || isAllowanceLoading || isApproving
                    ? 'bg-blue-800/30 text-blue-300/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  }
                `}
              >
                {(isApproveLoading || isAllowanceLoading || isApproving) ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {isApproveLoading || isApproving ? 'Approving...' : 'Checking allowance...'}
                  </>
                ) : (
                  'Approve sUSDe'
                )}
              </button>
            )}
            
            <button
              onClick={onMint}
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
                  Minting...
                </>
              ) : (
                'Mint esUSDe'
              )}
            </button>
          </div>
        ) : (
          <button 
            onClick={onRedeem}
            className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center
              ${!isValidAmount || isRedeemLoading || hasInsufficientBalance
                ? 'bg-blue-800/30 text-blue-300/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
              }`}
            disabled={!isValidAmount || isRedeemLoading || hasInsufficientBalance}
          >
            {isRedeemLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Redeeming...
              </>
            ) : hasInsufficientBalance ? (
              'Insufficient esUSDe balance'
            ) : (
              'Redeem esUSDe'
            )}
          </button>
        )}

        <p className="text-sm text-blue-200/80 italic text-center">
          Disclaimer: esUSDe does not guarantee 100% collateralization at all times, that depends on the market behavior. Please check "Current collateralization level"
        </p>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp, Loader2 } from 'lucide-react';

export default function Earn() {
  const [isDepositing, setIsDepositing] = useState(true);
  const [amount, setAmount] = useState<string>('');
  const [hasAllowance, setHasAllowance] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock function to check allowance - replace with actual contract call
  const checkAllowance = async () => {
    // Simulate contract call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return false;
  };

  useEffect(() => {
    const fetchAllowance = async () => {
      const allowance = await checkAllowance();
      setHasAllowance(allowance);
    };

    if (amount && parseFloat(amount) > 0) {
      fetchAllowance();
    }
  }, [amount]);

  const handleApprove = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsApproving(true);
    try {
      // Simulate approval transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      setHasAllowance(true);
    } catch (error) {
      console.error('Approval failed:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0 || !hasAllowance) return;
    
    setIsProcessing(true);
    try {
      // Simulate deposit transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isValidAmount = amount && parseFloat(amount) > 0;

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
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-blue-800/20 border border-blue-700/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-600/50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/80">eETH</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-800/30 to-blue-700/30 rounded-lg p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-200/80">Your balance</span>
            <span className="text-white">0.0 eETH</span>
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
                onClick={handleApprove}
                disabled={isApproving || !isValidAmount}
                className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center
                  ${isApproving || !isValidAmount
                    ? 'bg-blue-800/30 text-blue-300/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  }
                `}
              >
                {isApproving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Approving...
                  </>
                ) : (
                  'Approve eETH'
                )}
              </button>
            )}
            
            <button
              onClick={handleDeposit}
              disabled={!hasAllowance || isProcessing || !isValidAmount}
              className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center
                ${!hasAllowance || isProcessing || !isValidAmount
                  ? 'bg-blue-800/30 text-blue-300/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}
            >
              {isProcessing ? (
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
            className={`w-full py-4 rounded-lg font-medium transition-all
              ${!isValidAmount
                ? 'bg-blue-800/30 text-blue-300/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
              }`}
            disabled={!isValidAmount}
          >
            Withdraw eETH
          </button>
        )}
      </div>
    </div>
  );
}
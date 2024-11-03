import React, { useState, useEffect } from 'react';
import { SparklesIcon } from 'lucide-react';

interface Asset {
  name: string;
  apr: number;
  restakeAsset: string;
  isEthBased?: boolean;
}

const assets: Asset[] = [
  { name: 'sUSDe', apr: 13, restakeAsset: 'eEth', isEthBased: false },
  { name: 'USDS', apr: 6.6, restakeAsset: 'ezEth', isEthBased: false },
  { name: 'SUPEROETH', apr: 10, restakeAsset: 'eUSD', isEthBased: true },
  { name: 'eUSD', apr: 13, restakeAsset: 'eEth', isEthBased: false },
  { name: 'ezEth', apr: 7.7, restakeAsset: 'eUSD', isEthBased: true },
  { name: 'CAP', apr: 14, restakeAsset: 'eEth', isEthBased: false },
];

export default function RewardCalculator() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);
  const [depositAmount, setDepositAmount] = useState<number>(1000);
  const [restakeAmount, setRestakeAmount] = useState<number>(1000);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch ETH price:', error);
        setEthPrice(3500); // Fallback price
        setLoading(false);
      }
    };

    fetchEthPrice();
  }, []);

  const isStablecoin = (assetName: string) => 
    ['sUSDe', 'USDS', 'eUSD'].includes(assetName);

  const calculateYieldRedirected = () => {
    const assetValue = selectedAsset.isEthBased 
      ? depositAmount * ethPrice 
      : depositAmount;
    
    const annualYield = assetValue * (selectedAsset.apr / 100);
    const redirectedYield = annualYield * 0.2; // 20% redirected
    
    const operatorFee = redirectedYield * 0.02; // 2% operator fee
    const protocolFee = redirectedYield * 0.01; // 1% protocol fee
    const netYield = redirectedYield - operatorFee - protocolFee;
    
    const restakeValue = assets.find(a => a.name === selectedAsset.restakeAsset)?.isEthBased
      ? restakeAmount * ethPrice
      : restakeAmount;
    
    const aor = (netYield / restakeValue) * 100;

    // Calculate collateralization level based on USD values
    const collateralizationLevel = (assetValue / restakeValue) * 100;

    return {
      redirectedYield,
      operatorFee,
      protocolFee,
      netYield,
      aor,
      collateralizationLevel
    };
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  const results = calculateYieldRedirected();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h2 className="text-xl font-semibold mb-6">Reward Calculator</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm text-purple-200">Select Asset</label>
          <div className="relative">
            <select
              value={selectedAsset.name}
              onChange={(e) => setSelectedAsset(assets.find(a => a.name === e.target.value) || assets[0])}
              className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500"
            >
              {assets.map((asset) => (
                <option key={asset.name} value={asset.name}>
                  {asset.name}
                </option>
              ))}
            </select>
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <div className="group relative">
                <SparklesIcon className="w-5 h-5 text-yellow-400" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-sm bg-black/90 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Extra points when depositing this asset
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm italic text-purple-300">
            Underlying APR: {selectedAsset.apr}%
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-purple-200">Total Deposits</label>
          <p className="text-xs italic text-purple-300 mb-2">This is the asset you want to get insurance on</p>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
            className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-purple-200">
            Restaked Amount ({selectedAsset.restakeAsset})
          </label>
          <input
            type="number"
            value={restakeAmount}
            onChange={(e) => setRestakeAmount(Number(e.target.value))}
            className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="bg-gradient-to-r from-purple-800/20 to-pink-800/20 rounded-lg p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-purple-200">Current Collateralization Level</span>
            <span className="text-white">{results.collateralizationLevel.toFixed(2)}%</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-purple-200">Total Yield Redirected</span>
            <span className="text-white">
              ${results.redirectedYield.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-purple-200">APR Restakers</span>
            <span className="text-white">{results.aor.toFixed(2)}%</span>
          </div>

          <div className="text-sm italic text-purple-300 space-y-1">
            <p>Operator Fee: ${results.operatorFee.toFixed(2)} (2%)</p>
            <p>Protocol Fee: ${results.protocolFee.toFixed(2)} (1%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
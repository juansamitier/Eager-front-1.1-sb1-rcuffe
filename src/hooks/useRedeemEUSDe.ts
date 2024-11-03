import { useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import ethenaEagerContracts from '../contracts/ethenaEagerToken';

export function useRedeemEUSDe() {
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();


  const handleRedeem = async (amountToRedeem: string): Promise<boolean> => {
    if (!address) return false;
    setIsLoading(true);
    const parsedAmount = parseUnits(amountToRedeem, 18);
    try {
      await writeContractAsync({
        address: ethenaEagerContracts.eagerToken.address,
        abi: ethenaEagerContracts.eagerToken.abi,
        functionName: 'redeem',
        args: [parsedAmount, address, address],
      });
      return true;
    } catch (error) {
      console.error('Failed to redeem:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRedeem, isLoading };
}
import { useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import ethenaEagerContracts from '../contracts/ethenaEagerToken';

export function useDepositUSDe() {
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();


  const handleDeposit = async (amountToDeposit: string): Promise<boolean> => {
    if (!address) return false;
    setIsLoading(true);
    const parsedAmount = parseUnits(amountToDeposit, 18);
    try {
      await writeContractAsync({
        address: ethenaEagerContracts.eagerToken.address,
        abi: ethenaEagerContracts.eagerToken.abi,
        functionName: 'deposit',
        args: [parsedAmount, address],
      });
      return true;
    } catch (error) {
      console.error('Failed to deposit:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDeposit, isLoading };
}
import { useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import ethenaEagerContracts from '../contracts/ethenaEagerToken';

export function useApproveUSDe() {
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();

  const handleApprove = async (amountToDeposit: string): Promise<boolean> => {
    if (!address) return false;

    setIsLoading(true);
    const parsedAmount = parseUnits(amountToDeposit, 18);

    try {
      await writeContractAsync({
        address: ethenaEagerContracts.ethenaPrimitive.address,
        abi: ethenaEagerContracts.ethenaPrimitive.abi,
        functionName: 'approve',
        args: [ethenaEagerContracts.eagerToken.address, parsedAmount],
      });
      return true;
    } catch (error) {
      console.error('Failed to approve:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  return { handleApprove, isLoading };
}
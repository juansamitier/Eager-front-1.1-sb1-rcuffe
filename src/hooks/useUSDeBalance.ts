import { useAccount, useReadContract } from 'wagmi';
import ethenaEagerContracts from '../contracts/ethenaEagerToken';

export function useUSDeBalance() {
  const { address } = useAccount();

  const { data, error, isLoading } = useReadContract({
    address: ethenaEagerContracts.ethenaPrimitive.address,
    abi: ethenaEagerContracts.ethenaPrimitive.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const formattedAmount = data ? (Number(data) / 1e18).toFixed(2) : '0';

  return { 
    amount: formattedAmount, 
    isLoading, 
    isError: !!error
  };
}
import { useAccount, useReadContract } from 'wagmi';
import ethenaEagerContracts from '../contracts/ethenaEagerToken';

export function useEUSDeBalance() {
  const { address } = useAccount();

  const { data, error, isLoading, refetch } = useReadContract({
    address: ethenaEagerContracts.eagerToken.address,
    abi: ethenaEagerContracts.eagerToken.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const formattedAmount = data ? (Number(data) / 1e18).toFixed(2) : '0';

  return { 
    amount: formattedAmount, 
    isLoading, 
    isError: !!error,
    refetch
  };
}
import { useAccount, useReadContract } from 'wagmi';
import ethenaEagerContracts from '../contracts/ethenaEagerToken';

export function useLRTTokenBalance() {
  const { address } = useAccount();

  const { data, error, isLoading } = useReadContract({
    address: ethenaEagerContracts.lrtToken.address,
    abi: ethenaEagerContracts.lrtToken.abi,
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
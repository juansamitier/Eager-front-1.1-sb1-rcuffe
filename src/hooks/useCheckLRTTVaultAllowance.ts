import { useAccount, useReadContract } from 'wagmi';
import ethenaEagerContracts from '../contracts/ethenaEagerToken';

export function useCheckLRTTVaultAllowance() {
  const { address } = useAccount();

  if (!address) return { amount: '0', isLoading: false, isError: false, refetch: () => Promise.resolve() };

  const { data, error, isLoading, refetch } = useReadContract({
    address: ethenaEagerContracts.lrtToken.address,
    abi: ethenaEagerContracts.lrtToken.abi,
    functionName: 'allowance',
    args: [address, ethenaEagerContracts.lrtVault.address],
  });

  const formattedAmount = data ? (Number(data) / 1e18).toFixed(2) : '0';

  return {
    amount: formattedAmount,
    isLoading,
    isError: !!error,
    refetch: async () => {
      await refetch();
      return Promise.resolve();
    },
  };
}
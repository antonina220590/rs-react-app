import { vi } from 'vitest';

export const mockPush = vi.fn();

export const useSearchParams = () => {
  return {
    get: () => {
      return '1';
    },
  };
};
export const useRouter = () => ({
  push: mockPush,
});

export const usePathname = () => {
  return '/';
};

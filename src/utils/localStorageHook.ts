import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const useSearchQuery = (): [string, (value: string) => void] => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(
    typeof window !== 'undefined'
      ? localStorage.getItem('searchQuery') || ''
      : ''
  );

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const { search = '' } = new URL(url, 'http://example.com');
      setSearchQuery(new URLSearchParams(search).get('search') || '');
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchQuery', searchQuery);
    }
  }, [searchQuery]);

  const updateSearch = (value: string) => {
    setSearchQuery(value);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search: value, page: '1' },
      },
      undefined,
      { shallow: true }
    );
  };

  return [searchQuery, updateSearch];
};

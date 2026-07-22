import '@/styles/global.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { keepPreviousData, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getApiError } from '@/common/utils';

const showApiError = (error: any) => {
  const data = getApiError(error);

  if (data.validations.length > 0) {
    data.validations.forEach((item: string) => console.error(item));
    return;
  }

  if (data.message) {
    console.error(data.message);
    return;
  }

  console.error(error?.message || 'Something went wrong. Please try again.');
};

const onQueryError = (error: any, query: any) => {
  if (query.options.meta?.customErrorHandling) return;
  showApiError(error);
};

const onMutationError = (error: any, _variables: any, _context: any, mutation: any) => {
  if (mutation.options.meta?.customErrorHandling) return;

  if (['ECONNABORTED', 'ERR_NETWORK'].includes(error?.code)) {
    if (!navigator.onLine) {
      console.error("You're offline. Check your internet connection.");
      return;
    }

    console.error("Can't reach the server right now.");
    return;
  }

  showApiError(error);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData
    }
  },

  mutationCache: new MutationCache({
    onError: onMutationError
  }),
  queryCache: new QueryCache({
    onError: onQueryError
  })
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);

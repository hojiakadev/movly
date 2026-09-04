import 'antd/dist/reset.css';
import '@/styles/global.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { Theme } from '@/layouts';
import { ThemeProvider } from '@/common/providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Theme>
    </ThemeProvider>
  </React.StrictMode>
);

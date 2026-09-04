import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Main from '@/layouts/Main';

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  return (
    <React.Fragment>
      <Main>
        <Outlet />
      </Main>
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}

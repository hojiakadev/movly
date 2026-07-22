import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import getRoutesData from './router';

function App() {
  const routes = getRoutesData();

  const router = useMemo(() => {
    return createBrowserRouter(routes);
  }, [routes]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

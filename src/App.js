import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from "./lazyLoad/routes";

import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div data-testid="app">
          <MainNavigation />
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {routes.map(({ path, element: Element }) => (
                  <Route key={path} path={path} element={<Element />}></Route>
                ))}
              </Routes>
            </Suspense>
          </Layout>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

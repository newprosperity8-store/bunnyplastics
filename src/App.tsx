import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';

const Home = lazy(() => import('./pages/Home'));
const ProductsHub = lazy(() => import('./pages/ProductsHub'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Distributors = lazy(() => import('./pages/Distributors'));
const About = lazy(() => import('./pages/About'));

const PageLoader = () => (
  <div className="w-full min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductsHub />
          </Suspense>
        ),
      },
      {
        path: 'products/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'distributors',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Distributors />
          </Suspense>
        ),
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

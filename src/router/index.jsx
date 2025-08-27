import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../App'; // Assuming App.jsx is the layout
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/product/:id', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductCatalog from './views/ProductCatalog.jsx';
import { NotFound } from './views/NotFound.jsx';
import { ProductDetails } from './views/ProductDetails.jsx';
import { ProductAdminPanel } from './views/ProductAdminPanel.jsx';
import { CartPanel } from './views/CartPanel.jsx';
import LoginPage from './views/LoginPage.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import './styles/index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProductCatalog />,
		errorElement: <NotFound />,
	},
	{
		path: '/product/:productId',
		element: <ProductDetails />,
	},
	{
		path: '/admin',
		element: <ProtectedRoute />,
		children: [
			{
				path: 'caro',
				element: <ProductAdminPanel />,
			},
		],
	},
	{
		path: '/cart',
		element: <CartPanel />,
	},
	{
		path: '/login',
		element: <LoginPage />
	}
]);

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />,
);

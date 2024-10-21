import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App.jsx';
import { NotFound } from './views/NotFound.jsx';
import { ProductDetails } from './views/ProductDetails.jsx';
import { ProductAdminPanel } from './views/ProductAdminPanel.jsx';
import './styles/index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
	},
	{
		path: '/product/:productId',
		element: <ProductDetails />,
	},
	{
		path: '/admin/caro',
		element: <ProductAdminPanel />,
	},
]);

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />,
);

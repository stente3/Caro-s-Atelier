import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { CartProduct } from '../components/CartProduct';
import useCartStore from '../stores/cartStore';

const CartPanel = () => {
  const { cart, totalPrice } = useCartStore();
  const navigate = useNavigate();

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart]);

  return (
    <>
      <Nav />
      <div className='bg-white pt-14'>
        <h1 className='mb-10 text-center text-2xl font-bold'>Carrito de compras</h1>
        <div className='m-3 max-w-5xl justify-center items-center x-6 md:flex md:space-x-6 md:mx-auto xl:px-0 '>
          <div className='rounded-lg md:w-2/3 md:max-h-96 md:overflow-y-auto'>
            {cart.map((product, index) => (
              <CartProduct
                key={index}
                img={product.imagen}
                talla={product.talla}
                nombre={product.nombre}
                precio={product.precio}
                cantidad={product.cantidad}
                id={product.id}
              />
            ))}
          </div>
          <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-sm md:mt-0 md:w-1/3'>
            <div className='flex justify-between'>
              <p className='text-lg font-bold'>Total</p>
              <div>
                <p className='mb-1 text-lg font-bold'>
                  ${totalPrice} <span>COP</span>
                </p>
              </div>
            </div>
            <button className='mt-6 w-full rounded-md bg-[#25D366] py-1.5 font-medium text-blue-50 hover:bg-blue-600'>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { CartPanel };


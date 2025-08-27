import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { selectGrandTotal } from '../store/cartSlice';

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const grandTotal = useSelector(selectGrandTotal);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <div className="w-full md:w-1/3 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-4">
            <span>Grand Total</span>
            <span className="font-bold">${grandTotal.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="w-full text-center bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors block"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
export default CartPage;
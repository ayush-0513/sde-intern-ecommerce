import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGrandTotal, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const grandTotal = useSelector(selectGrandTotal);
  
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState({});
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would send this data to a server
      console.log('Order placed:', { ...formData, items: cartItems, total: grandTotal });
      dispatch(clearCart());
      setIsOrderPlaced(true);
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isOrderPlaced) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Order Placed Successfully!</h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }
  
  if (cartItems.length === 0 && !isOrderPlaced) {
      return (
          <div className="text-center py-10">
              <h1 className="text-2xl font-bold mb-4">Your cart is empty.</h1>
              <p>You cannot proceed to checkout without items.</p>
              <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
                  Go Shopping
              </Link>
          </div>
      );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input type="text" name="name" onChange={handleChange} className="w-full border rounded-md p-2 mt-1" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input type="email" name="email" onChange={handleChange} className="w-full border rounded-md p-2 mt-1" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block font-medium">Address</label>
            <textarea name="address" onChange={handleChange} className="w-full border rounded-md p-2 mt-1"></textarea>
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700">
            Place Order
          </button>
        </form>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.title} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
export default CheckoutPage;
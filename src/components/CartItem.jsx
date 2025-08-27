import { useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../store/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem({ id: item.id }));
  };

  return (
    <div className="flex items-center border-b py-4">
      <img src={item.image} alt={item.title} className="w-20 h-20 object-contain mr-4" />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <select
          value={item.quantity}
          onChange={handleQuantityChange}
          className="border rounded-md px-2 py-1"
        >
          {[...Array(10).keys()].map(n => (
            <option key={n + 1} value={n + 1}>{n + 1}</option>
          ))}
        </select>
        <p className="font-bold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
        <button onClick={handleRemove} className="ml-4 text-red-500 hover:text-red-700">
          Remove
        </button>
      </div>
    </div>
  );
}
export default CartItem;
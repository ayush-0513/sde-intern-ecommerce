import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { fetchProducts } from '../store/productsSlice'; // To handle direct navigation

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  // Fetch products if not already in state (e.g., direct page load)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  
  const product = products.find((p) => p.id === parseInt(id));

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
    alert('Item added to cart!');
  };

  if (status === 'loading' || !product) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center items-center p-8 bg-white rounded-lg border">
        <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-500 capitalize mb-4">{product.category}</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500">{'⭐'.repeat(Math.round(product.rating.rate))}</span>
          <span className="text-gray-600 ml-2">({product.rating.count} reviews)</span>
        </div>
        <p className="text-gray-700 text-lg mb-6">{product.description}</p>
        <p className="text-4xl font-extrabold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-4">
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border rounded-md px-3 py-2"
          >
            {[...Array(5).keys()].map(n => <option key={n + 1} value={n + 1}>{n + 1}</option>)}
          </select>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductDetailPage;
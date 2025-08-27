import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="h-64 flex items-center justify-center p-4 bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.title}
          </h3>
          <p className="text-xl font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}
export default ProductCard;
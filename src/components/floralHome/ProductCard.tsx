import { FC } from "react";

interface ProductCardProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  description: string;
  rating: number;
  image: string;
}

const ProductCard: FC<ProductCardProps> = ({
  title,
  price,
  category,
  quantity,
  description,
  rating,
  image,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <p className="mt-2 text-gray-900">${price.toFixed(2)}</p>
      <p className="mt-2 text-gray-600">Category: {category}</p>
      <p className="mt-2 text-gray-600">In Stock: {quantity}</p>
      <p className="mt-2 text-yellow-500">Rating: {rating}</p>
      <div className="flex gap-2">
        <button className="px-6 py-3 mt-4 bg-lime-600 hover:bg-lime-500 text-white rounded-md transition duration-300">
          Add to Cart
        </button>
        <button className="px-6 py-3 mt-4 bg-white border border-lime-600 hover:text-lime-500 text-black rounded-md transition duration-300">
          Product Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/redux/api/api";

interface ProductDetailsProps {}

const ProductDetails: FC<ProductDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductByIdQuery(id);

  if (isProductsLoading) return <div>Loading...</div>;
  if (isProductsError || !product) return <div>Error loading product</div>;

  const { title, price, category, quantity, description, rating, image } =
    product.data;

  return (
    <div className="p-10 border rounded-lg shadow-md">
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
      </div>
    </div>
  );
};

export default ProductDetails;

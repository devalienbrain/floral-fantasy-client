import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useUpdateProductMutation } from "@/redux/api/api";
import toast, { Toaster } from "react-hot-toast";

interface ProductDetailsProps {}

const ProductDetails: FC<ProductDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductByIdQuery(id);

  const [updateProduct] = useUpdateProductMutation();

  if (isProductsLoading) return <div>Loading...</div>;
  if (isProductsError || !product) return <div>Error loading product</div>;

  const {
    _id,
    title,
    price,
    category,
    quantity,
    description,
    rating,
    image,
    addedToCart,
  } = product.data;

  const productAddedToCart = async () => {
    try {
      await updateProduct({ id: _id, data: { addedToCart: true } });
      toast("Product added to cart successfully!")
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  return (
    <div className="p-10 border rounded-lg shadow-md">
      <Toaster/>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-contain rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <p className="mt-2 text-gray-900">${price.toFixed(2)}</p>
      <p className="mt-2 text-gray-600">Category: {category}</p>
      <p className="mt-2 text-gray-600">In Stock: {quantity}</p>
      <p className="mt-2 text-yellow-500">Rating: {rating}</p>
      <div className="flex gap-2">
        <button
          onClick={() => productAddedToCart()}
          className="px-6 py-3 mt-4 bg-lime-600 hover:bg-lime-500 text-white rounded-md transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

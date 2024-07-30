// import { FC } from "react";
// import { Link } from "react-router-dom";
// import { useUpdateProductMutation } from "@/redux/api/api";
// import toast from "react-hot-toast";

// interface ProductCardProps {
//   _id: string;
//   title: string;
//   price: number;
//   category: string;
//   quantity: number;
//   description: string;
//   rating: number;
//   image: string;
// }

// const ProductCard: FC<ProductCardProps> = ({
//   _id,
//   title,
//   price,
//   category,
//   quantity,
//   description,
//   rating,
//   image,
// }) => {
//   const [updateProduct] = useUpdateProductMutation();
//   const productAddedToCart = async () => {
//     try {
//       await updateProduct({ id: _id, data: { addedToCart: true } });
//       toast("Product added to cart successfully!");
//     } catch (error) {
//       console.error("Failed to update product", error);
//     }
//   };
//   return (
//     <>
//       <div className="card shadow-xl border">
//         <figure>
//           <img src={image} alt="Image" />
//         </figure>
//         <div className="card-body">
//           <h1>$ {price}</h1>
//           <h2 className="card-title">
//             {title}
//             <div className="badge badge-secondary">{category}</div>
//           </h2>
//           <div>
//             <Link
//               to={`/products/${_id}`}
//               className="text-blue-500 hover:underline"
//             >
//               {_id}
//             </Link>
//           </div>
//           <p className="text-left">{description}</p>
//           <div className="flex justify-between items-center">
//             <Link to={`/products/${_id}`}>
//               <button className="px-6 py-3 mt-4 border border-lime-500 hover:bg-lime-500 hover:text-white rounded-md transition duration-300">
//                 View details
//               </button>
//             </Link>
//             <button
//               onClick={() => productAddedToCart()}
//               className="px-6 py-3 mt-4 bg-lime-600 hover:bg-lime-500 text-white rounded-md transition duration-300"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;


import { FC } from "react";
import { Link } from "react-router-dom";
import { useUpdateProductMutation } from "@/redux/api/api";
import toast from "react-hot-toast";

interface ProductCardProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  description: string;
  rating: number;
  image: string;
  cartQuantity?: number; // Add cartQuantity to props
}

const ProductCard: FC<ProductCardProps> = ({
  _id,
  title,
  price,
  category,
  quantity,
  description,
  rating,
  image,
  cartQuantity = 0, // Default to 0 if undefined
}) => {
  const [updateProduct] = useUpdateProductMutation();

  const productAddedToCart = async () => {
    try {
      const newCartQuantity = cartQuantity + 1; // Increase quantity
      await updateProduct({
        id: _id,
        data: { addedToCart: true, cartQuantity: newCartQuantity },
      });
      toast("Product added to cart successfully!");
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  return (
    <div className="card shadow-xl border">
      <figure>
        <img src={image} alt="Image" />
      </figure>
      <div className="card-body">
        <h1>$ {price}</h1>
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{category}</div>
        </h2>
        <div>
          <Link
            to={`/products/${_id}`}
            className="text-blue-500 hover:underline"
          >
            {_id}
          </Link>
        </div>
        <p className="text-left">{description}</p>
        <div className="flex justify-between items-center">
          <Link to={`/products/${_id}`}>
            <button className="px-6 py-3 mt-4 border border-lime-500 hover:bg-lime-500 hover:text-white rounded-md transition duration-300">
              View details
            </button>
          </Link>
          <button
            onClick={productAddedToCart}
            className="px-6 py-3 mt-4 bg-lime-600 hover:bg-lime-500 text-white rounded-md transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

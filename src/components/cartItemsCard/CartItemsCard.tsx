import { FC } from "react";
import { Link } from "react-router-dom";

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

const CartItemsCard: FC<ProductCardProps> = ({
  _id,
  title,
  price,
  category,
  image,
}) => {
  return (
    <tr className="bg-white text-black w-full rounded-xl py-10">
      <td>1</td>
      <td>
        <div className="font-bold">{title}</div>
        <div>
          <Link
            to={`/products/${_id}`}
            className="text-blue-500 hover:underline"
          >
            {_id}
          </Link>
        </div>
      </td>
      <td className="font-bold">{category}</td>

      <td>
        <div className="mask mask-squircle h-24 w-24">
          <img src={image} alt="Image" />
        </div>
      </td>

      <td className="font-bold">{price} $</td>
      <td>
        <div className="flex justify-center">
          <button className="px-6 py-3 mt-4 border border-red-600 hover:bg-red-600 hover:text-white rounded-md transition duration-300">
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CartItemsCard;

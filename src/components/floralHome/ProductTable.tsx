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

const ProductTable: FC<ProductCardProps> = ({
  _id,
  title,
  price,
  category,
  quantity,
  description,
  rating,
  image,
}) => {
  return (
    <tr>
      <td>
        <div className="mask mask-squircle h-24 w-24">
          <img src={image} alt="Image" />
        </div>
      </td>
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
      <td>{price} $</td>
      <td className="font-bold">{category}</td>
      <td>
        <div className="flex justify-center">
          <button className="px-6 py-3 hover:text-lime-500 transition duration-300">
            Update
          </button>

          <button className="px-6 py-3 hover:text-red-600 transition duration-300">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductTable;

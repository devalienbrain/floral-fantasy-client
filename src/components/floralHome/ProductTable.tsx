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
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
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
  onEdit,
  onDelete,
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
      <td className="flex justify-center gap-2">
        <button onClick={() => onEdit(_id)} className="btn btn-warning">
          Edit
        </button>
        <button onClick={() => onDelete(_id)} className="btn btn-error">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductTable;

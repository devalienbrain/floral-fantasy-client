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

const ProductCard: FC<ProductCardProps> = ({
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
    <>
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
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <div className="flex gap-2">
              <Link to={`/products/${_id}`}>
                <button className="px-6 py-3 mt-4 border border-lime-500 hover:bg-lime-500 hover:text-white rounded-md transition duration-300">
                  View details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

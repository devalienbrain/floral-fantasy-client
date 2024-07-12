import { FC } from 'react';

interface CategoryFilterProps {
  category: string;
  setCategory: (category: string) => void;
  categories: Array<{ name: string }>;
}

const CategoryFilter: FC<CategoryFilterProps> = ({ category, setCategory, categories }) => {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="form-select mt-1 block w-full"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.name} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;

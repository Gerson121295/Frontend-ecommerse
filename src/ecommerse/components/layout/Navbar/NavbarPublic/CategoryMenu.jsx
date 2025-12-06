
import { Link } from "react-router-dom";

export const CategoryMenu = ({ categories, mobile }) => {
  return (
    <ul className={`dropdown-menu custom-dropdown shadow ${mobile ? 'w-100' : ''}`}>
      {categories.map((category) => (
        <li key={category.id}>
            <Link 
                className="dropdown-item"
                to={`/categories/${category.id}`}
            >
                {category.nombreCategoria}
            </Link>
        </li>
      ))}
    </ul>
  );
};



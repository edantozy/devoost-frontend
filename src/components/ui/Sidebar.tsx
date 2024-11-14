import {
  faBox,
  faShoppingCart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@redux/store";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const { isMenuOpen } = useAppSelector((state) => state.ui);

  return (
    <aside
      className={`z-50 bg-cyan-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
    >
      <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-cyan-100 ml-4">
        Devoost App
      </p>
      <nav>
        <Link
          to="/app/orders"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-sky-600"
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="inline-block mr-2"
          />
          Órdenes
        </Link>
        <Link
          to="/app/products"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-sky-600"
        >
          <FontAwesomeIcon icon={faBox} className="inline-block mr-2" />
          Productos
        </Link>
        <Link
          to="/app/clients"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-sky-600"
        >
          <FontAwesomeIcon icon={faUsers} className="inline-block mr-2" />
          Clientes
        </Link>
      </nav>
    </aside>
  );
};

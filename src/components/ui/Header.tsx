import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleMenu } from "@redux/slices/uiSlice";
import { useAppDispatch } from "@redux/store";
import { logout } from "@redux/thunks/authThunks";

export const Header = () => {
  const dispatch = useAppDispatch();

  const handleMenuClick = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="border-b border-b-gray-300">
      <div className="min-h-14 max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-end items-center">
        <button
          className="text-red-600 font-semibold mr-5 md:mr-0"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
        <button onClick={handleMenuClick} className="md:hidden">
          <FontAwesomeIcon icon={faBars} className="text-gray-900" />
        </button>
      </div>
    </header>
  );
};

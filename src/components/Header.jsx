import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const queryClient = useQueryClient();
  function handleLogout() {
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
  }
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="flex justify-center items-center align-element sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello,{user.username}</p>
            <button
              onClick={handleLogout}
              className="btn btn-xs btn-outline btn-primary"
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link">
              Sign In /GUEST
            </Link>
            <Link to="/register" className="link ml-3">
              Create an account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;

// client/src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import axios from 'axios';
import Container from './Container';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import SearchBox from './Searchbox.jsx'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for user dropdown
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await axios.post('/api/auth/logout');
      dispatch(logout());
      setIsUserMenuOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Logo / Main Nav */}
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center text-xl font-bold">
              MyEcom
            </Link>
          </div>

          {/* Right-side links (Cart, User, Login) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Add SearchBox Here */}
              <div className="mr-4">
                <SearchBox />
              </div>

              {/* Inside your Navigation Links area */}

<Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium">
  Home
</Link>

<Link to="/shop" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium">
  Shop
</Link>
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white">
              <FaShoppingCart className="h-6 w-6" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* ADMIN LINKS - Show only if user is admin */}
            {userInfo && userInfo.isAdmin && (
              <div className='flex space-x-4'>
                <Link to="/admin/userlist" className="text-gray-300 hover:text-white">
                  Users
                </Link>
                <Link to="/admin/productlist" className="text-gray-300 hover:text-white">
                  Products
                </Link>
                <Link to="/admin/orderlist" className="text-gray-300 hover:text-white">
                  Orders
                </Link>
              </div>
            )}

            {userInfo ? (
              // User Dropdown (Logged In)
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white"
                >
                  <FaUser className="h-6 w-6" />
                  <span>{userInfo.name.split(' ')[0]}</span>
                </button>
                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg text-black">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Sign In Link (Logged Out)
              <Link to="/login" className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white">
                <FaUser className="h-6 w-6" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile-only Cart (to show it next to the hamburger) */}
          <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white">
              <FaShoppingCart className="h-6 w-6" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Panel (Hidden on desktop) */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* ADMIN LINKS FOR MOBILE */}
              {userInfo && userInfo.isAdmin && (
                <>
                  <Link
                    to="/admin/userlist"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin: Users
                  </Link>
                  <Link
                    to="/admin/productlist"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin: Products
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin: Orders
                  </Link>
                </>
              )}

              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Header;
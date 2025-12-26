// client/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import axios from 'axios';
import Container from '../components/Container';
import { FaTimes } from 'react-icons/fa';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null); // Success/Error message

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      // 1. Fill form with current user info
      setName(userInfo.name);
      setEmail(userInfo.email);

      // 2. Fetch user's orders
      const fetchOrders = async () => {
        try {
          const { data } = await axios.get('/api/orders/myorders');
          setOrders(data);
          setLoadingOrders(false);
        } catch (err) {
          console.error(err);
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const res = await axios.put('/api/users/profile', {
          name,
          email,
          password,
        });
        // Update Redux state with new user info
        dispatch(setCredentials(res.data));
        setMessage('Profile Updated Successfully');
      } catch (err) {
        setMessage(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 ">
        {/* Left Column: User Details Form */}
        <div className="md:col-span-3 border rounded-xl p-5  ">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          {message && (
            <div className={`p-3 rounded mb-4 ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </form>
        </div>

        {/* Right Column: Order History */}
        <div className="md:col-span-3 border rounded-xl p-5">
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>
          {loadingOrders ? (
            <p>Loading Orders...</p>
          ) : orders.length === 0 ? (
            <p>You have no orders.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">ID</th>
                    <th className="py-2 px-4 border-b text-left">DATE</th>
                    <th className="py-2 px-4 border-b text-left">TOTAL</th>
                    <th className="py-2 px-4 border-b text-left">PAID</th>
                    <th className="py-2 px-4 border-b text-left">DELIVERED</th>
                    <th className="py-2 px-4 border-b text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{order._id}</td>
                      <td className="py-2 px-4 border-b">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">${order.totalPrice}</td>
                      <td className="py-2 px-4 border-b">
                        {order.isPaid ? (
                          <span className="text-green-600 font-semibold">{order.paidAt.substring(0, 10)}</span>
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {order.isDelivered ? (
                          <span className="text-green-600 font-semibold">{order.deliveredAt.substring(0, 10)}</span>
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Link to={`/order/${order._id}`} className="text-indigo-600 hover:underline">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
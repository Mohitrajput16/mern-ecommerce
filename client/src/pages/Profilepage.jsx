// client/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // <-- Import this
import axios from 'axios';
import Container from '../components/Container';
import { toast } from 'react-toastify';
import { setCredentials } from '../store/authSlice'; // Adjust path if needed

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orders, setOrders] = useState([]); // State for orders
  const [loadingOrders, setLoadingOrders] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      fetchMyOrders(); // Call the fetch function
    }
  }, [userInfo, navigate]);

  // --- FUNCTION TO FETCH ORDERS WITH TOKEN ---
  const fetchMyOrders = async () => {
    try {
      setLoadingOrders(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // <--- CRITICAL FIX
        },
      };

      const { data } = await axios.get('/api/orders/myorders', config);
      setOrders(data);
      setLoadingOrders(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
      setLoadingOrders(false);
    }
  };
  // -------------------------------------------

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`, // Token needed for update too
          },
        };
        const res = await axios.put(
          '/api/users/profile',
          { name, email, password },
          config
        );
        dispatch(setCredentials({ ...res.data }));
        toast.success('Profile Updated');
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
        {/* Column 1: User Profile Form */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
            >
              Update
            </button>
          </form>
        </div>

        {/* Column 2: My Orders List */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>
          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
             <div className="bg-blue-50 text-blue-700 p-4 rounded">
               You have no orders yet.
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DELIVERED</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.totalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.isPaid ? (
                          <span className="text-green-600 font-bold">{order.paidAt.substring(0, 10)}</span>
                        ) : (
                          <span className="text-red-600 font-bold">Not Paid</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.isDelivered ? (
                          <span className="text-green-600 font-bold">{order.deliveredAt.substring(0, 10)}</span>
                        ) : (
                          <span className="text-red-600 font-bold">Not Delivered</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/order/${order._id}`} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded">
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
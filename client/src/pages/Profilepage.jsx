import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Container from '../components/Container';
import { setCredentials } from '../store/authSlice'; // Adjust path if needed

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  // State for Orders
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  // 1. Check if user is logged in
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo]);

  // 2. Fetch User's Orders
  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        // <--- 3. Create Config with Token
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        // <--- 4. Pass config to the GET request
        const { data } = await axios.get('/api/orders/myorders', config);
        
        setOrders(data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };

    if (userInfo) {
      fetchMyOrders();
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.put(
          '/api/users/profile',
          { name, email, password },
          config
        );
        dispatch(setCredentials({ ...data, token: userInfo.token }));
        setMessage('Profile Updated Successfully');
      } catch (err) {
        setMessage(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">

        {/* LEFT COL: User Profile Form */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          {message && <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">{message}</div>}

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full border rounded p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full border rounded p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full border rounded p-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </div>
            <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded w-full hover:bg-gray-700">
              Update
            </button>
          </form>
        </div>

        {/* RIGHT COL: My Orders Table */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>

          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : ordersError ? (
            <p className="text-red-500">{ordersError}</p>
          ) : orders.length === 0 ? (
            <div className="bg-gray-100 p-4 rounded text-center">
              You have no orders yet. <Link to="/shop" className="text-indigo-600 underline">Go Shop!</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-2 px-4 text-left">ID</th>
                    <th className="py-2 px-4 text-left">DATE</th>
                    <th className="py-2 px-4 text-left">TOTAL</th>
                    <th className="py-2 px-4 text-left">PAID</th>
                    <th className="py-2 px-4 text-left">DELIVERED</th>
                    <th className="py-2 px-4 text-left">DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{order._id.substring(0, 10)}...</td>
                      <td className="py-2 px-4">{order.createdAt.substring(0, 10)}</td>
                      <td className="py-2 px-4">${order.totalPrice}</td>
                      <td className="py-2 px-4">
                        {order.isPaid ? (
                          <span className="text-green-600 font-bold">
                            Paid {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="text-red-600">Not Paid</span>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {order.isDelivered ? (
                          <span className="text-green-600 font-bold">
                            Delivered {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="text-red-600">Not Delivered</span>
                        )}
                        {/* Inside the table mapping */}
                        <td className="py-2 px-4">
                          {order.isCancelled ? (
                            <span className="text-red-600 font-bold">Cancelled</span>
                          ) : order.isDelivered ? (
                            <span className="text-green-600">Delivered</span>
                          ) : (
                            <span className="text-yellow-600">Processing</span>
                          )}
                        </td>
                      </td>
                      <td className="py-2 px-4">
                        <Link to={`/order/${order._id}`} className="text-indigo-600 hover:underline">
                          View
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
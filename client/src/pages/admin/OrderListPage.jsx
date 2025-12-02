import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Container from '../../components/Container';
import { FaTimes } from 'react-icons/fa';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get('/api/orders');
          setOrders(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  if (loading) return <Container><p>Loading...</p></Container>;
  if (error) return <Container><p className="text-red-500">{error}</p></Container>;

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">USER</th>
              <th className="py-3 px-4 text-left">DATE</th>
              <th className="py-3 px-4 text-left">TOTAL</th>
              <th className="py-3 px-4 text-left">PAID</th>
              <th className="py-3 px-4 text-left">DELIVERED</th>
              <th className="py-3 px-4 text-left">DETAILS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{order._id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{order.user && order.user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">${order.totalPrice}</td>
                <td className="py-3 px-4 text-sm">
                  {order.isPaid ? (
                    <span className="text-green-600 font-semibold">{order.paidAt.substring(0, 10)}</span>
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </td>
                <td className="py-3 px-4 text-sm">
                  {order.isDelivered ? (
                    <span className="text-green-600 font-semibold">{order.deliveredAt.substring(0, 10)}</span>
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </td>
                <td className="py-3 px-4 text-sm">
                  <Link to={`/order/${order._id}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded text-xs font-semibold">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default OrderListPage;
// client/src/pages/admin/UserListPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Container from '../../components/Container';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchUsers();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/users');
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        fetchUsers(); // Refresh the list
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  if (loading) return <Container><p>Loading...</p></Container>;
  if (error) return <Container><p className="text-red-500">{error}</p></Container>;

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">NAME</th>
              <th className="py-3 px-4 text-left">EMAIL</th>
              <th className="py-3 px-4 text-left">ADMIN</th>
              <th className="py-3 px-4 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{user._id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <a href={`mailto:${user.email}`} className="text-indigo-600 hover:underline">
                    {user.email}
                  </a>
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500 inline" />
                  ) : (
                    <FaTimes className="text-red-500 inline" />
                  )}
                </td>
                <td className="py-3 px-4 text-sm">
                  <button
                    onClick={() => deleteHandler(user._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default UserListPage;
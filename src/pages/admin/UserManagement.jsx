

import React, { useEffect, useState } from "react";
import { useFetchData } from "6pp";
import AdminLayout from "../../components/layout/AdminLayout";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";

const UserManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "dashboard-users"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      <div className="p-6 bg-gradient-to-t from-[#50ff73] to-[#ffffff] h-full">
        <h1 className="text-3xl font-bold mb-4 uppercase text-left text-gray-800">All Users</h1>

        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="animate-pulse text-lg font-semibold">Loading Users...</div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-transparent rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase">Avatar</th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase">Username</th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase">Friends</th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase">Groups</th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-gray-200">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={row.avatar}
                        alt={row.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.friends}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.groups}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;

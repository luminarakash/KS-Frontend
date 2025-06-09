import { useFetchData } from "6pp";
import { Avatar, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
    renderCell: (params) => (
      params.row.groupChat === "Yes" ? (
        <span className="text-green-600 font-semibold">Yes</span>
      ) : (
        <span className="text-red-600 font-semibold">No</span>
      )
    ),
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/chats`,
    "dashboard-chats"
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
        data.chats.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((img) => transformImage(img, 50)),
          members: i.members.map((m) => transformImage(m.avatar, 50)),
          creator: {
            name: i.creator.name,
            avatar: transformImage(i.creator.avatar, 50),
          },
          groupChat: i.groupChat ? "Yes" : "No",  // Yahan boolean ko Yes/No string me convert kiya
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <div className="w-full h-screen animate-pulse rounded-lg" />
      ) : (
        <div className="p-6 bg-gradient-to-t from-[#50ff73] to-[#fafcfa] h-full rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-3xl font-bold mb-6">All Chats</h2>
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 border-b border-gray-300 font-semibold text-sm text-gray-700"
                  >
                    {col.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {columns.map((col, j) => (
                    <td
                      key={j}
                      className="px-4 py-3 border-b border-gray-200 text-sm text-gray-800"
                    >
                      {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default ChatManagement;


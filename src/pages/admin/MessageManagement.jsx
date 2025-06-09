import { useFetchData } from "6pp";
import React, { useEffect, useState } from "react";
import moment from "moment";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachment from "../../components/shared/RenderAttachment";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { fileFormat, transformImage } from "../../lib/features";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "attachments",
    headerName: "Attachments",
    width: 200,
    renderCell: (row) => {
      const { attachments } = row;
      if (!attachments || attachments.length === 0) return "No Attachments";

      return (
        <div className="flex flex-wrap gap-2">
          {attachments.map((att, idx) => {
            const url = att.url;
            const file = fileFormat(url);
            return (
              <a
                key={idx}
                href={url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline"
              >
                {RenderAttachment(file, url)}
              </a>
            );
          })}
        </div>
      );
    },
  },
  { field: "content", headerName: "Content", width: 400 },
  {
    field: "sender",
    headerName: "Sent By",
    width: 200,
    renderCell: (row) => (
      <div className="flex items-center space-x-4">
        <img
          src={row.sender.avatar}
          alt={row.sender.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-700">{row.sender.name}</span>
      </div>
    ),
  },
  { field: "chat", headerName: "Chat", width: 220 },
  {
    field: "groupChat",
    headerName: "Group Chat",
    width: 100,
    renderCell: (row) => (
      <span
        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full
          ${
            row.groupChat
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
      >
        {row.groupChat ? "Yes" : "No"}
      </span>
    ),
  },
  { field: "createdAt", headerName: "Time", width: 250 },
];

const MessageManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/messages`,
    "dashboard-messages"
  );

  useErrors([{ isError: error, error }]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.messages.map((msg) => ({
          ...msg,
          id: msg._id,
          sender: {
            name: msg.sender.name,
            avatar: transformImage(msg.sender.avatar, 50),
          },
          createdAt: moment(msg.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [data]);

  if (loading)
    return (
      <AdminLayout>
        <div className="animate-pulse h-[80vh] flex items-center justify-center">
          <div className="space-y-4 w-full max-w-7xl px-4">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-12 bg-gray-300 rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      {/* Wrapper div jahan se tu background change kar sakta hai */}
      <div className="max-w-full h-full overflow-x-auto p-6 rounded-lg shadow-lg bg-gradient-to-l from-[#50ff73] to-[#cdfcca]">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Messages</h2>
        <table className="min-w-full border border-gray-800 table-auto bg-transparent rounded-md">
          <thead className="bg-gray-300">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{ width: col.width }}
                  className="border-b border-gray-400 px-4 py-3 text-left text-gray-700 font-semibold bg-transparent text-sm"
                >
                  {col.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-gray-500 py-8"
                >
                  No messages found.
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={rowIndex % 2 === 0 ? "bg-transparent" : "bg-transparent"}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ width: col.width }}
                      className="border-b border-gray-400 px-4 py-3 text-gray-800 text-sm align-top"
                    >
                      {col.renderCell ? col.renderCell(row) : row[col.field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default MessageManagement;

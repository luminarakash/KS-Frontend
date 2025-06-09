

import { useFetchData } from "6pp";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { matBlack } from "../../constants/color";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );

  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const Appbar = (
    <div className="bg-gradient-to-l from-[#50ff73] to-[#cdfcca] p-3 my-8 rounded-xl shadow">
      <div className="flex items-center gap-4">
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>
        <div className="flex-grow" />
        <p className="hidden lg:block text-black/70 text-center">
          {moment().format("dddd, D MMMM YYYY")}
        </p>
        <NotificationsIcon />
      </div>
    </div>
  );

  const Widgets = (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-8 my-8">
      <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon />} />
      <Widget title={"Chats"} value={stats?.totalChatsCount} Icon={<GroupIcon />} />
      <Widget title={"Messages"} value={stats?.messagesCount} Icon={<MessageIcon />} />
    </div>
  );

  return (
    <AdminLayout>
      {loading ? (
        <div className="h-screen animate-pulse bg-amber-300" />
      ) : (
        <main className="bg-gradient-to-t from-[#50ff73] to-[#e2fde2] px-4 py-6">
          {Appbar}

          <div className="flex flex-col lg:flex-row flex-wrap justify-center items-stretch gap-8">
            <div className="bg-gradient-to-t from-[#50ff73] to-[#fafcfa] p-8 rounded-xl shadow w-full max-w-2xl">
              <h2 className="text-2xl font-semibold my-8">Last Messages</h2>
              <LineChart value={stats?.messagesChart || []} />
            </div>

            <div className="bg-gradient-to-b from-[#50ff73] to-[#fafcfa] p-4 rounded-xl shadow w-full sm:w-1/2 max-w-sm flex justify-center items-center relative">
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}
              />
              <div className="absolute inset-0 flex justify-center items-center gap-2">
                <GroupIcon />
                <p>Vs</p>
                <PersonIcon />
              </div>
            </div>
          </div>

          {Widgets}
        </main>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <div className="bg-gradient-to-t from-[#50ff73] to-[#fafcfa] p-8 my-8 rounded-2xl shadow w-80">
    <div className="flex flex-col items-center gap-4">
      <div
        className="text-black/70 rounded-full border-[5px]"
        style={{
          borderColor: matBlack,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </div>
      <div className="flex items-center gap-4">
        {Icon}
        <p>{title}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;


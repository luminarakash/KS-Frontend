import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import logo from "../../assets/bg4.jpg";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import StarImg from "../../assets/Starai.svg";
import { Link } from "react-router-dom";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex-grow h-16 sticky">
        <div className="bg-gradient-to-l from-[#50ff73] to-[#fafcfa] static">
        
          <Toolbar>
            <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center">
             <img src={logo} alt="Logo" className=" size-16 text-primary rounded-full" />
            </div>
            <a href="/" className="block w-fit">
              <h1 className="text-4xl pl-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600 hover:underline">
                Kisan Samwad
              </h1>
            </a>


            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box className="flex flex-row items-center gap-1">
              
              <Link to="/ai">
                <div className=" p-1 items-center hover:bg-gradient-to-r from-[#5b2dff]/1 to-[#fe2dd1]/12 rounded-[5px] w-fit">
                    <span className="p-1 items-center flex flex-row font-semibold text-[14px] bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-[#4d2dff] to-[#fc2bcb]">
                      <img src={StarImg} className="pr-1 h-3"/>
                      AI Support
                    </span>
                </div>
              </Link>
              <Link to="/agriStore">
                <div className=" p-1 items-center hover:bg-[#4a4a4b]/8 rounded-md w-fit">
                    <span className="p-1 items-center flex flex-row font-semibold text-[14px] ">
                      {/* <img src={StarImg} className="pr-1 h-3"/> */}
                      Agri Store
                    </span>
                </div>
              </Link>
              <Link to="/govtScheme">
                <div className=" p-1 items-center hover:bg-[#4a4a4b]/8 rounded-md w-fit">
                    <span className="p-1 items-center flex flex-row font-semibold text-[14px] ">
                      {/* <img src={StarImg} className="pr-1 h-3"/> */}
                      Govt Scheme
                    </span>
                </div>
              </Link>

              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </div>
      </div>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;

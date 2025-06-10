import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box className="bg-gradient-to-b from-[#50ff73] to-[#fafcfa] h-full">
      <Typography p={"2rem"} variant="h2" textAlign={"center"}>
        Select a friend to Chat
      </Typography>
      <img
          src="/src/assets/Hello.png"
          alt="EImage"
          className="fixed left-1/2 top-1/2 pt-48 -translate-x-1/2 -translate-y-1/2 z-0 w-screen h-screen p-10 object-contain pointer-events-none opacity-70"
        />
    </Box>
  );
};

export default AppLayout()(Home);

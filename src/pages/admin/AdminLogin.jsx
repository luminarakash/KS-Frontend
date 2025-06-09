import { useInputValidation } from "6pp";
import { Link } from "react-router-dom";
import BGImg from "../../assets/bg.png";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { bgGradient } from "../../constants/color";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import { Bolt } from "@mui/icons-material";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${BGImg})` }}
        >
      <Container
      className="bg-gradient-to-b from-[#ffffff] to-[#84ff73] rounded-lg"
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className=""
          elevation={3} 
          sx={{
            padding: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <Typography variant="h3" className="">Admin Login</Typography>
          <form 
            style={{
              width: "100%",
              marginTop: "1rem", 
              
            }}
            
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              sx={{
                marginTop: "2rem",
              }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className="w-full text-2xl bg-gradient-to-r from-[#7D22FF] to-[#d005fe] hover:underline cursor-pointer"
            >
              Login
            </Button>
            <Link to="/login">
              <div className="pt-6 text-center font-medium text-[14px] text-transparent bg-clip-text bg-gradient-to-r from-[#2bf74d] to-[#0202fd]">
                User?
              </div>
             </Link>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;

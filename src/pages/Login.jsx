import { useFileHandler, useInputValidation } from "6pp";
import { Link } from "react-router-dom";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { bgGradient } from "../constants/color";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";
import BGImg from "../assets/bg.png";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${BGImg})` }}
    >
      <div className="bg-gradient-to-b from-[#ffffff] to-[#84ff73] shadow-lg rounded-lg p-8 w-full max-w-sm">
        {isLogin ? (
          <>
            <h2 className="text-4xl font-semibold text-center mb-8">Login</h2>
            <form className="space-y-12" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full px-4 py-2 border border-gray-400 rounded"
                value={username.value}
                onChange={username.changeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border border-gray-400 rounded"
                value={password.value}
                onChange={password.changeHandler}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#7D22FF] to-[#d005fe] text-white py-2 rounded transition cursor-pointer"
              >Login
              </button>
              <div className="text-center my-2 text-gray-500">OR</div>
              <button
                type="button"
                disabled={isLoading}
                onClick={toggleLogin}
                className="w-full text-blue-600 hover:underline cursor-pointer"
              >
                Sign Up Instead
                <Link to="/admin">
                  <div className="pt-2 text-right font-medium text-[14px] text-transparent bg-clip-text bg-gradient-to-r from-[#4cf75d] to-[#00000b]">
                    Admin?
                  </div>
                </Link>
              </button>
              
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSignUp}>
              <Stack className="relative w-40 mx-auto p-1">
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={avatar.preview}
                />

                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      bgcolor: "rgba(0,0,0,0.7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>

              {avatar.error && (
                <Typography
                  m={"1rem auto"}
                  width={"fit-content"}
                  display={"block"}
                  color="error"
                  variant="caption"
                >
                  {avatar.error}
                </Typography>
              )}

              <input
                type="text"
                placeholder="Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={name.value}
                onChange={name.changeHandler}
              />
              <input
                type="text"
                placeholder="Bio"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <p className="text-red-500 text-sm">{username.error}</p>
              )}
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={password.value}
                onChange={password.changeHandler}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#7D22FF] to-[#d005fe]  text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
              <div className="text-center my-2 text-gray-500">OR</div>
              <button
                type="button"
                disabled={isLoading}
                onClick={toggleLogin}
                className="w-full text-blue-600 hover:underline"
              >
                Login Instead
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;



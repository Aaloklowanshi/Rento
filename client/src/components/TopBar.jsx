import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useRecoilState, useRecoilValue} from "recoil";
import { searchedValueAtom, userState } from "../store/atoms/user";

const Appbar = () => {

  const [userdata, setUserdata] = useState({});
    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/login/sucess", { withCredentials: true });

            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
      getUser()
  }, [])

  const logout = ()=>{
    window.open("http://localhost:8000/logout","_self")
}

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const isUser = useRecoilValue(userState);
  const [searchedValue, setSearchedValue] = useRecoilState(searchedValueAtom);

  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };


  return (
    <AppBar position="static" sx={{ backgroundColor: "#181b38" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
        onClick={()=>{navigate('/')}}
        >
          Rento
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Button className="Plus-sign"
            onClick={()=>{
              navigate('/createproperty');
            }}
            >
              plus sign
              {/* <img src="" alt="" /> */}
            </Button>
            <IconButton size="large" onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="       Search"
              inputProps={{ "aria-label": "search" }}
              sx={{
                ml: 1,
                border: "1px solid white",
                borderRadius: "10px",
                alignContent: "center",
                overflow: "hidden",
                transition: "width 0.3s ease-in-out",
              }}
              onChange={(e)=>{setSearchedValue(e.target.value)}}
            />
          </div>

          {console.log(searchedValue)}

          {isUser ? (
            <>
            <Button color="inherit" sx={{ ml: 2 }}
            onClick={()=>{
              navigate('/profile')
            }}
            >
              Profile
            </Button>

            <Button color="inherit" sx={{ ml: 2 }}
          >
              logout
            </Button>
            </>
          ) : (
            <>
              <Button color="inherit" sx={{ ml: 2 }} onClick={handleLoginClick}>
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ ml: 2 }}
                onClick={handleSignupClick}
              >
                Signup
              </Button>
            </>
          )}

          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;

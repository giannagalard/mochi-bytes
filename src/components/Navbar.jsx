import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { searchData } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import logo from "../Assets/logo.png";
import { Menu } from ".";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#FF7892", 0.6),
  "&:hover": {
    backgroundColor: alpha("#FF7892", 0.8),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const onSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        await searchData(search).then((result) =>
          navigate("/search", { state: result })
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: "#FFDAE1" }} position="static">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Avatar
              component={Link}
              to="/recipes"
              src={logo}
              variant="rounded"
              sx={{
                width: { sm: "270px", md: "250px", lg: "300px" },
                height: { sm: "60px", md: "60px", lg: "60px" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Menu text="Recipes" />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onKeyDown={onSearch}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

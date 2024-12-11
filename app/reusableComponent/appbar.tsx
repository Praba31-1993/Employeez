import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "/assets/img/search.svg";
import SearchBar from "./searchbar";
import digitalIcon from "/assets/img/digitallogo.svg";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import questionIcon from "/assets/img/question.svg";
import DropdownComponent from "./dropdown";
import { Colors } from "../reusableComponent/styles";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useRouter } from "next/navigation";
import Logout from "./logout";
import ImageComponent from "./image";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
];

export default function NavbarComponent() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const router = useRouter();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogOut = () => {
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    localStorage.removeItem("rememberedUserId");
    localStorage.removeItem("rememberedUserPassword");
    localStorage.removeItem("pin"); // Assuming you stored the sidebar pin state in localStorage

    sessionStorage.clear();

    router.push("/login");
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem>
        <Logout />
      </MenuItem>
    </Menu>
  );
  const useColors = Colors();
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {/* <Image src={digitalIcon} alt="" /> */}
        <ImageComponent user={"/assets/img/lock.png"} />
      </MenuItem>
      <MenuItem>
        <DropdownComponent />
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <div className="d-flex" style={{ position: "relative" }}>
            <NotificationsNoneOutlinedIcon sx={{ color: useColors.themeRed }} />
            <div
              className="notificationround"
              style={{
                position: "absolute",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: useColors.themeRed,
                right: "14%",
                top: "10%",
                border: "1px solid white",
              }}
            ></div>
          </div>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Avatar src="" alt="Remy Sharp" />
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            background: "transparent",
            marginTop: "10px",
            width: "100%",
            boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
            "& .MuiToolbar-root": {
              padding: "0 50px 0 20px",
            },
          }}
        >
          <Toolbar>
            {/* Conditionally render SearchBar and SearchIcon */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <SearchBar list={top100Films} />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <Image src={digitalIcon} alt="" /> */}
              <ImageComponent user={"/assets/img/lock.png"} />

              <DropdownComponent />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {/* <Image src={questionIcon} alt="" /> */}
                <ImageComponent user={"/assets/img/lock.png"} />
              </Box>

              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                {/* <Image src={SearchIcon} alt="" /> */}
                <ImageComponent user={"/assets/img/lock.png"} />
              </Box>

              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <div className="d-flex" style={{ position: "relative" }}>
                  <NotificationsNoneOutlinedIcon
                    sx={{ color: useColors.themeRed }}
                  />
                  <div
                    className="notificationround"
                    style={{
                      position: "absolute",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: useColors.themeRed,
                      right: "14%",
                      top: "10%",
                      border: "1px solid white",
                    }}
                  ></div>
                </div>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar src="" alt="Remy Sharp" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}

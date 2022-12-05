import logo from "../../../../assets/other/logo2.png";
import React, { useState } from "react";
import "../../../../styles/LandingStyles/LandingNavbar.scss";
import { Grid, AppBar, Button, Toolbar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
// import logo from '../../../../assets/logo-navbar.png'
function LandingNavbar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="">
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" className="landingNavbar">
            <Toolbar>
              <div className="landingNavbarLogoBox">
                <img src={logo} alt="logo" className="landingNavbarLogo" />
              </div>
              <div className="landingNavbarLarge">
                {location.pathname === "/" ? (
                  <>
                    <a className="navigatingLink" href="/">
                      <Button size="medium" className="landingNavbarUsecase">
                        Use cases
                      </Button>
                    </a>
                    <a className="navigatingLink" href="/faq">
                      <Button size="small" className="landingNavbarFAQs">
                       FAQs
                      </Button>
                    </a>
                    <a className="navigatingLink" href="/signup">
                      <Button size="medium" className="landingNavbarItems">
                        Sign up
                      </Button>
                    </a>
                    <a className="navigatingLink" href="/signin">
                      <Button size="medium" className="landingNavbarItems">
                        Sign in
                      </Button>
                    </a>
                  </>
                ) : (
                  <>
                    <a className="navigatingLink" href="/">
                      <Button size="large" className="landingNavbarItems">
                        Home
                      </Button>
                    </a>
                  </>
                )}
              </div>

              <div className="landingNavbarSmall">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon className="landingNavbarMenuIcon" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  className="smallLandingNavbar"
                >
                  {location.pathname === "/" ? (
                    <>
                      <a className="navigatingLink" href="/">
                        <MenuItem
                          className="landingSmallNavbarItems"
                          onClick={handleClose}
                        >
                          Use cases
                        </MenuItem>
                      </a>
                      <a className="navigatingLink" href="/">
                        <MenuItem
                          className="landingSmallNavbarItems"
                          onClick={handleClose}
                        >
                          FAQs
                        </MenuItem>
                      </a>
                      <a className="navigatingLink" href="/signup">
                        <MenuItem
                          className="landingSmallNavbarItems"
                          onClick={handleClose}
                        >
                          Sign Up
                        </MenuItem>
                      </a>
                      <a className="navigatingLink" href="/signin">
                        <MenuItem
                          className="landingSmallNavbarItems"
                          onClick={handleClose}
                        >
                          Sign In
                        </MenuItem>
                      </a>
                    </>
                  ) : (
                    <a className="navigatingLink" href="/">
                      <MenuItem
                        className="landingSmallNavbarItems"
                        onClick={handleClose}
                      >
                        Home
                      </MenuItem>
                    </a>
                  )}
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingNavbar;

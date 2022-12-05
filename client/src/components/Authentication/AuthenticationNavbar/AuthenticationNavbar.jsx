
import React, { useState } from "react";
import "../../../styles/AuthenticationStyles/AuthenticationNavbar.scss";
import { Grid, AppBar, Button, Toolbar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/logos/cbutelogo.png";
function AuthenticationNavbar() {
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
                    <AppBar position="static" className="authenticationNavbar">
                        <Toolbar>
                            <div className="authenticationNavbarLogoBox">
                                <img src={logo} alt="logo" className="authenticationNavbarLogo" />
                            </div>
                            <div className="authenticationNavbarLarge">

                                <>
                                    {
                                        location.pathname !== '/' && (
                                            <a className="navigatingLink" href="/">
                                                <Button size="small" className="authenticationNavbarUsecase">
                                                    Home
                                                </Button>
                                            </a>
                                        )
                                    }
                                    <a href='/' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname === '/useCases' && "dashboardNavbarItemsActive"}`}>
                                      Use Cases
                                    </Button></a>
                                    <a href='/faq' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname === '/faq' && "dashboardNavbarItemsActive"}`}>
                                       FAQ's
                                    </Button></a>
                                    <a href='/getStarted' className='navigatingLink'><Button size="large" className={`dashboardNavbarItems ${location.pathname === '/getStarted' && "dashboardNavbarItemsActive"}`}>
                                      Get Started
                                    </Button></a>
                                </>
                            </div>

                            <div className="authenticationNavbarSmall">
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? "basic-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                >
                                    <MenuIcon className="authenticationNavbarMenuIcon" />
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                    className="smallAuthenticationNavbar"
                                >

                                    <>
                                        {
                                            location.pathname !== '/' && (
                                                <a className="navigatingLink" href="/">
                                                    <MenuItem
                                                        className="authenticationSmallNavbarItems"
                                                        onClick={handleClose}
                                                    >
                                                        Home
                                                    </MenuItem>
                                                </a>
                                            )
                                        }

                                    </>

                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        </div>
    );
}

export default AuthenticationNavbar;
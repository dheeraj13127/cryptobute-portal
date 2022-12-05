import React from "react";
import { Grid, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../../styles/LandingStyles/LandingFooter.scss";
import logo from "../../../../assets/logos/cbutelogo.png";
function LandingFooter() {
  return (
    <div className="landingFooterContainer">
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div className="boxes">
          <div className="demo">
            <img
              src={logo}
              alt="tipogram-logo"
              className="landingFooterImage"
            />
            <Typography variant="body1" className="landingFooterInfo">
              An authentic and secured <br />
              crowdfunding platform
            </Typography>
          </div>
          <div className="landingFooterIconsBox">
            <a
              href="https://github.com/dheeraj13127"
              target="_blank"
              rel="noreferrer"
              className="footerLink"
            >
              <GithubIcon className="landingFooterIcon" />
            </a>
            <a
              href="https://www.instagram.com/dheeraj_msdian/"
              rel="noreferrer"
              target="_blank"
              className="footerLink"
            >
              <InstagramIcon className="landingFooterIcon" />
            </a>
         
            <a
              href="https://www.linkedin.com/in/dheerajs7/"
              target="_blank"
              rel="noreferrer"
              className="footerLink"
            >
              <LinkedInIcon className="landingFooterIcon" />
            </a>
          </div>
          </div>
        </Grid>
        {/* <Grid item xs={2} sm={2} md={2} lg={2} textAlign="center">
          <Typography variant="h6" className="landingFooterCompany">
            About Us
          </Typography>
          <a href="/" className="navigatingLink">
            <Typography variant="body1" className="landingFooterAboutUs">
              Who are we?
            </Typography>
          </a>
        </Grid> */}
        <Grid item xs={12} sm={12} md={4} lg={4} textAlign="center">
          <Typography variant="h6" className="landingFooterCompany">
            Pages
          </Typography>
          <div className="landingFooterPagesBox">
            <a href="/" className="navigatingLink">
              <Typography variant="body1" className="landingFooterPages">
                Home
              </Typography>
            </a>
            <a href="/faq" className="navigatingLink">
              <Typography variant="body1" className="landingFooterPages">
                FAQ's
              </Typography>
            </a>
            <a href="/" className="navigatingLink">
              <Typography variant="body1" className="landingFooterPages">
                Terms of use
              </Typography>
            </a>
            <a href="/who-are-we" className="navigatingLink">
              <Typography variant="body1" className="landingFooterPages">
                Who are we?
              </Typography>
            </a>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} textAlign="center">
          <Typography variant="h6" className="landingFooterCompany">
            Contact us?
          </Typography>
          <div className="landingFooterPagesBox">
            <div className="landingFooterMail">
              <MailIcon
                className="landingFooterMailIcon"
                sx={{ color: "white" }}
              />
              <Typography variant="body1" className="landingFooterPages contactUs">
                cryptobute@gmail.com
              </Typography>
            </div>
            {/* <div className="landingFooterMail">
              <LocationOnIcon className="landingFooterLocationIcon" />
              <Typography variant="body1" className="landingFooterPages contactUs">
                Lalit Ashok,Kumarakrupa Rd <br /> High Grounds, Seshadripuram
                <br />
                Bengaluru, Karnataka 560001
              </Typography>
            </div> */}
          </div>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography variant="body1" className="landingFootercopyright">
            © Cryptobute 2022
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingFooter;

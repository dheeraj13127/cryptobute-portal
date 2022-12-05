import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import "../../../../styles/LandingStyles/HeroSection.scss";
import heroSection from "../../../../assets/other/heroSection.png";
function HeroSection() {
  return (
    <div>
      <Grid container className="heroSectionContainer">
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className="heroSectionImgBoxSmall"
        >
          <div className="">
            <img
              src={heroSection}
              alt="heroSectionMainImgSmall"
              className="heroSectionMainImgSmall"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <div>
            <div>
              <Typography variant="h4" className="heroSectionHeading">
                Looking for an authentic{" "}
                <span className="heroSectionSpan"> crowdfunding </span>platform
                ?
              </Typography>
            </div>
            <div>
              <Typography variant="h5" className="heroSectionSubHeading">
                Kudos ! You have landed on the right spot. <br></br>We at{" "}
                <span className="heroSectionSpan">Cryptobute </span> make sure
                that we fulfill <br></br>all your needs with highly secured
                process.
              </Typography>
            </div>
            <div className="heroSectionButtons">
              <a href="/getStarted" className="naviagtingLink">
              <Button size="large" className="heroSectionStartedButton">
                Get Started
              </Button>
              </a>
              
              
            </div>
          </div>
        </Grid>
        {/* <Grid item xs={12} md={1} lg={1}></Grid> */}
        <Grid item xs={12} md={6} lg={6}>
          <div className="heroSectionImageBox">
            <img
              src={heroSection}
              alt="heroSection"
              className="heroSectionImage"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default HeroSection;

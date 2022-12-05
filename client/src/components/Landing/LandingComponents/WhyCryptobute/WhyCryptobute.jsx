import React from "react";
import { Typography, Grid } from "@mui/material";
import "../../../../styles/LandingStyles/WhyCryptobute.scss";
import { whyCryptoBute } from "./WhyCryptoButeData";
function WhyCryptobute() {
  return (
    <div className="whyCryptoButeParentContainer">
      <Grid container className="whyCryptoButeContainer">
        <Grid md={3} lg={3}></Grid>
        <Grid item xs={12} md={6} lg={6}>
          <div className="whyCryptoButeSubHeading">
            <Typography variant="h6">Use Cases</Typography>
          </div>
          <div className="whyCryptoButeHeading">
            <Typography variant="h4" className={"whyCryptoTextContent"}>
              Why <span className="whyCryptoButeHeadingSpan">Cryptobute?</span>
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container className="whyCryptoButeCardParentContainer" spacing={0}>
        {whyCryptoBute.map((data, index) => (
          <Grid
            key={index}
            item
            xs={12}
            md={5}
            lg={5}
            className="whyCryptoButeCardContainer"
          >
            <div className="whyCryptoButeCardContent">
              <div className="whyCryptoButeImageContainer">
                <img src={data.url} alt="lock" className="whyCryptoButeImage"/>
              </div>
              <div>
                <Typography variant="h5" className={"whyCryptoTextContent whyCryptoTextHeading"}>{data.heading}</Typography>
              </div>
              <div style={{marginTop:"15px"}}>
                <Typography variant="body1" className={"whyCryptoTextContent"}>{data.content}</Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default WhyCryptobute;

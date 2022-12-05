import { Grid, Typography } from "@mui/material";
import React from "react";
import "../../../../styles/LandingStyles/IntegratedTechnologies.scss";
import { integratedTechnologies } from "./IntegratedTechnologiesData";
function IntegratedTechnologies() {
  return (
    <div>
      <Grid container className="integratedTechnologiesContainer">
        <Grid item xs={12}>
          <Typography variant="h4" className="integratedTechnologiesContainerHeading">
            Integrated with the top
            <span className="integratedTechnologiesContainerSpan"> technologies </span>
          </Typography>
        </Grid>
        {integratedTechnologies.map((img, index) => (
          <Grid
            key={index}
            item
            xs={6}
            sm={6}
            md={6}
            lg={3}
            className="integratedTechnologiesImageBox"
          >
            <img src={img.url} alt="tech-stack" className={`integratedTechnologiesImage ${img.classname}`} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default IntegratedTechnologies;
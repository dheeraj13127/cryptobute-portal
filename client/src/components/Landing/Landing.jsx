import React from "react";
import "../../styles/LandingStyles/Landing.scss";
import {
  LandingNavbar,
  HeroSection,
  IntegratedTechnologies,
  CryptobuteWorks,
  WhyCryptobute,
  LandingFooter,
} from ".";

function Landing() {
  return (
    <>
      <LandingNavbar />

      <HeroSection />
      <IntegratedTechnologies />
      <CryptobuteWorks />
      <WhyCryptobute />
      <LandingFooter />
    </>
  );
}

export default Landing;

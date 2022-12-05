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
import AuthenticationNavbar from "../Authentication/AuthenticationNavbar/AuthenticationNavbar";

function Landing() {
  return (
    <>
      {/* <LandingNavbar /> */}
      <AuthenticationNavbar/>
      <HeroSection />
      <IntegratedTechnologies />
      <CryptobuteWorks />
      <WhyCryptobute />
      <LandingFooter />
    </>
  );
}

export default Landing;

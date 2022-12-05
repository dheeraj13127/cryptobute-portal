import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import Navbar from "../Landing/LandingComponents/LandingNavbar/LandingNavbar";
import LandingFooter from "../Landing/LandingComponents/LandingFooter/LandingFooter"
import "../../styles/Faq/Faq.scss";
import { Grid } from "@mui/material";
import AuthenticationNavbar from "../Authentication/AuthenticationNavbar/AuthenticationNavbar";
const data = {
  title: "FAQ",
  rows: [
    {
      title: "What is Medi-Fund?",
      content: `Medi-Fund is a decentralised crowdfunding platform in the medical domain that allows users to raise funds for their medical treatments in a safe and secure manner`,
    },
    {
      title: "How do I know if the campaign is genuine/authentic?",
      content:
        "The contributors agree that the campaign is authentic or not, even though we do validate the user's legitimacy.",
    },
    {
      title: "How do I pay/recieve funds?",
      content: `You would require a web3 wallet to pay/recieve funds?`,
    },
    {
      title: "How do I know if the donated amount is not misused?",
      content: `This is where Medi-Fund ensures that the amount is not misused as the documents are transparent and only the amount agreed by the contributors is sent `,
    },
  ],
};

const styles = {
  bgColor: "white",
  titleTextColor: "black",
  rowTitleColor: "#6C97A9",
  // rowContentColor: 'grey',
  // arrowColor: "red",
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};
const Faqs = () => {
  return (
    <div className="">
      <AuthenticationNavbar/>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Grid item xs={10} md={10} lg={10} className="faq">
          <Faq data={data} styles={styles} config={config} />
        </Grid>
      </Grid>
      <LandingFooter/>
    </div>
  );
};

export default Faqs;

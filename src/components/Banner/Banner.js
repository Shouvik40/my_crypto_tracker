import React from "react";
import style from "./Banner.module.css";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import Carousel from "./Carousel";
const Banner = () => {
  return (
    <>
      <div className={style.banner}>
        <Container className={style.bannerContent}>
          <div className={style.tagline}>
            <Typography
              variant="h3"
              style={{ fontWeight: "bold", marginBottom: 15, color: "gold" }}
            >
              Crypto Tracker
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ color: "darkgrey", textTransform: "capitalize" }}
            >
              Get all the Info regarding your favorite Crypto Currency
            </Typography>
          </div>
          <Carousel />
        </Container>
      </div>
    </>
  );
};

export default Banner;

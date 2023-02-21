import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../utilities/api";

import parse from "html-react-parser";
// import CoinInfo from "../components/CoinInfo";

import { LinearProgress, makeStyles, Typography } from "@mui/material";

import style from "./CoinPage.module.css";
import { numberWithCommas } from "../components/CoinsTable/CoinsTable";
import CoinInfo from "../components/CoinInfo/CoinInfo";
const CoinPage = () => {
  const [coin, setCoin] = useState();
  const { id } = useParams();
  const { currency, symbol } = CryptoState();
  useEffect(() => {
    fetch(SingleCoin(id), {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCoin(res);
        // console.log(res);
      });
  }, [currency]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <>
      <div className={style.container}>
        <div className={style.sidebar}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={style.heading}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={style.description}>
            {parse(coin?.description.en.split(". ")[0].replace(/\s+/g, " "))}.
          </Typography>
          <div className={style.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={style.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {coin?.market_cap_rank.toLocaleString("en-US")}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={style.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {coin?.market_data.current_price[
                  currency.toLowerCase()
                ].toLocaleString("en-US")}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={style.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>
          </div>
        </div>
        <CoinInfo coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;

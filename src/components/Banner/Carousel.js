import React, { useState, useEffect } from "react";
import style from "./Banner.module.css";
import { TrendingCoins } from "../../utilities/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const getTrendingData = () => {
    fetch(TrendingCoins(currency), {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTrending(res);
        // console.log(res);
      });
  };

  useEffect(() => {
    getTrendingData();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={style.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: "10" }}
        />
        <span>
          {coin?.symbol}
          &nbsp;{" "}
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  function numberWithCommas(x) {
    //   console.log(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    return Number(x).toLocaleString("en-US");
  }
  return (
    <>
      <div className={style.carousel}>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      </div>
    </>
  );
};

export default Carousel;

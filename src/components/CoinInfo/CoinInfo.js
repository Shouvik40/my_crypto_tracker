import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { HistoricalChart } from "../../utilities/api";
import { CryptoState } from "../../CryptoContext";
import { red } from "@mui/material/colors";

import style from "./CoinInfo.module.css";
const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const { currency } = CryptoState();
  useEffect(() => {
    fetch(HistoricalChart(coin.id, days, currency), {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setHistoricalData(res.prices);
      });
  }, [days, currency]);

  let arr = [];
  useEffect(() => {
    for (let ind = 0; ind < 289; ind++) {
      arr.push(ind);
    }
  }, [historicalData]);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: arr,
      datasets: [
        {
          label: "First Dataset",
          data: historicalData,
          fill: false,
          borderColor: "#EEBC1D",
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [historicalData]);
  return (
    <>
      <div className={style.container}>
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default CoinInfo;

import React, { useState, useEffect } from "react";
import { CryptoState } from "../../CryptoContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CoinList } from "../../utilities/api";
import { useNavigate } from "react-router-dom";

import style from "./CoinsTable.module.css";
import { margin } from "@mui/system";
import Pagination from "../Pagination";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();
  const [coins, setcoins] = useState([]);
  const [coinsFilter, setCoinsFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mouseIn, setMouseIn] = useState(false);
  const [searchCoin, setSearchCoin] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(CoinList(currency), {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setcoins(res);
        setCoinsFilter(res);
      });
  }, [currency]);
  function tableRowClicked(data) {
    // console.log(data);
    navigate(`/coins/${data}`);
  }
  // console.log(searchCoin);
  const searchInputChangeHandler = (e) => {
    let x = coins.filter((c) =>
      c.id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCoinsFilter(x);
  };
  return (
    <>
      <div className={style.tableContainer}>
        <h3>Cryptocurrency Price By Market Cap</h3>

        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Your Currency..."
          onChange={(e) => searchInputChangeHandler(e)}
        />
        <table class={style.table}>
          <thead>
            <tr>
              <th style={{ width: "40px" }} className={style.header}>
                Coin
              </th>
              <th>Price</th>
              <th>24h Price Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coinsFilter.slice(page, page + 10).map((c, i) => (
              <tr onClick={() => tableRowClicked(c.id)}>
                <td data-label="Coin">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // backgroundColor: "red",
                      width: "140px",
                    }}
                  >
                    <div>
                      <img src={c.image} alt="" width={30} />
                    </div>
                    <div
                      style={{
                        marginLeft: "6px",
                        textAlign: "left",
                      }}
                    >
                      <p style={{ margin: "0px" }}> {c.name}</p>
                      <h4 style={{ margin: "0px", color: "gold" }}>
                        {c.symbol.toUpperCase()}
                      </h4>
                    </div>
                  </div>
                </td>
                <td data-label="Price">{symbol + " " + c.current_price}</td>
                <td data-label="24h Price Change">
                  {c.price_change_percentage_24h + " " + "%"}
                </td>
                <td data-label="Market Cap">
                  {symbol + " " + c.market_cap.toLocaleString("en-US")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination coins={coins} page={page} setPage={setPage} />
      </div>
    </>
  );
};

export default CoinsTable;

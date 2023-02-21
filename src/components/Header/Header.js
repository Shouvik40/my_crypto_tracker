import React from "react";
import {
  AppBar,
  createTheme,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";

//
//
//
const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();
  // console.log(currency);
  // console.log(currency);
  return (
    <>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} className={style.title}>
              Crypto Tracker
            </Typography>
            <select
              name="currTracker"
              id="currTracker"
              className={style.select}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;

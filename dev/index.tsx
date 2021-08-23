/**
 * OrderBookApp
 * @author Adrian Błasiak <grano22@outlook.com>
 * @description Aplikacja pozwalająca pobierać wyciąg w czasie rzeczywistym z rynku kryptowalut
 * @version 1.0.0
 */
import ReactDOM from "react-dom";
import React from 'react';
import { Dashboard } from "./components/dashboard";
import "./styles/main.scss";

ReactDOM.render(<Dashboard/>, document.getElementById("root"));
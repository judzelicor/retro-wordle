import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Application from "./Application";

import store from "./redux/store";

const app = document.getElementById("app");
const root = ReactDOM.createRoot(app);

root.render(
    <Provider store={ store }>
        <Router>
            <Application />
        </Router>
    </Provider>
);
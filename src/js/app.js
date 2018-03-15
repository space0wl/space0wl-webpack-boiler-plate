import React from "react";
import ReactDom from "react-dom";

import App from "./views/App";

function render(Component){
    ReactDom.render(
        <Component />,
        document.getElementById("app-root")
    );
}

render(App);
import React from "react";
import { hot } from "react-hot-loader";

// No need for lifecycle events at the moment for the App container, so it may be a stateless function. State will be managed by Redux.
const App = () => {
    return (
        <div>
            <h1 className="center">space0wl React</h1>
        </div>
    );
}

export default hot(module)(App);
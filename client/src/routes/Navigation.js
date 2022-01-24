import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";


export default function Navigation({logout}) {
  return (
    <>
      <Router>
        <Routes>
          {map(routes, (route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={<route.component logout={logout}/>}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}


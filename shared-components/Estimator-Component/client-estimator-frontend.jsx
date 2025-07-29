/*import React from "react";
import { createRoot } from "react-dom/client";
import EstimatorApp from "./EstimatorApp";

const rootEl = document.getElementById("estimator-root");

fetch("/wp-json/cost-estimator/v1/config")
  .then((res) => res.json())
  .then((config) => {
    const root = createRoot(rootEl);
    root.render(<EstimatorApp config={config} />);
  });

  */
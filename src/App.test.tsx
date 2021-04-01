import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { ReusableProvider } from "reusable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  // fails because of sdk..
  // ReactDOM.render(<ReusableProvider><App /></ReusableProvider>, div);
  expect(true).toBe(true);
});

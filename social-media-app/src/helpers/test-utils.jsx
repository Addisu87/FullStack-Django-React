import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import store from "../redux/store";
import { Provider } from "react-redux";

function render(ui, { ...renderOptions } = {}) {
  const Wrapper = ({ children }) => (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };

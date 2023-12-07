import React from "react";
import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import ErrorBoundary from "./ErrorBoundary";

const render = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => (
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );

  return {
    // Dummy user function for testing
    user: userEvent.setup(),

    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
};

export * from "@testing-library/react";
export { render };

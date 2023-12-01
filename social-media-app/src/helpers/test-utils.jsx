import React from "react";
import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

function render(ui, { ...renderOptions } = {}) {
  const Wrapper = ({ children }) => (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );

  return {
    // Dummy user function for testing
    user: userEvent.setup(),

    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}

export * from "@testing-library/react";
export { render };

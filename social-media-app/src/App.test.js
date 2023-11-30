import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Welcome to the Addgram! link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the Addgram!/i);
  expect(linkElement).toBeInTheDocument();
});

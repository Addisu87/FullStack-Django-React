import { render, screen } from "./helpers/test-utils";
import App from "./App";

test("renders Welcome to Addgram text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Addgram!/i);
  expect(linkElement).toBeInTheDocument();
});

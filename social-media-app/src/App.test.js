import { render, screen, waitFor } from "./helpers/test-utils";
import App from "./App";

test("renders Welcome to the Addgram! text", async () => {
  render(<App />);
  await waitFor(() => {
    const linkElement = screen.getByText(/Welcome to the Addgram!/i);
    expect(linkElement).toBeInTheDocument();
  });
});

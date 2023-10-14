import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import Error503 from "./pages/Error503";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Registration />} />

      <Route path="*" element={<NotFound />} />
      <Route path="/503" element={<Error503 />} />
    </Routes>
  );
}

export default App;

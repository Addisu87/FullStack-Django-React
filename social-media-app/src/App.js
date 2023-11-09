import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import Error503 from "./pages/Error503";
import UpdatePost from "./components/posts/UpdatePost";

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
      <Route path="/update-post/" element={<UpdatePost />} />

      <Route path="*" element={<NotFound />} />
      <Route path="/503" element={<Error503 />} />
    </Routes>
  );
}

export default App;

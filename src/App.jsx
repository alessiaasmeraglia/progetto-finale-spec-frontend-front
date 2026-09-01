import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import ShoesPage from "./pages/ShoesPage";
import ShoeDetailsPage from "./pages/ShoeDetailsPage";
import ComparePage from "./pages/ComparePage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoes" element={<ShoesPage />} />
        <Route path="/shoes/:id" element={<ShoeDetailsPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
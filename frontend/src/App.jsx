import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateItemPage from "./pages/CreateItemPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateItemPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/edit/:id" element={<CreateItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;